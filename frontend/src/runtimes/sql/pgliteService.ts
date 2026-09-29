import type { PGlite, Results } from '@electric-sql/pglite';
import { splitStatements, statementLabel } from './splitStatements';
import type { SqlError, SqlRunResult, SqlStatementResult } from './sqlTypes';

export type SqlDatabase = {
  run(text: string): Promise<SqlRunResult>;
  close(): Promise<void>;
};

const MAX_ROWS = 500;
/** Commands whose row count means "rows changed" (shown as "3 rows affected") */
const ROW_COUNT_COMMANDS = ['INSERT', 'UPDATE', 'DELETE', 'MERGE', 'COPY'];

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function toSqlError(error: unknown): SqlError {
  const details = (error ?? {}) as { code?: unknown; position?: unknown };
  const position = Number(details.position);
  return {
    message: errorMessage(error),
    sqlState: typeof details.code === 'string' ? details.code : null,
    position: Number.isInteger(position) && position > 0 ? position : null,
  };
}

/** A value from PGlite → the text a result table shows. null stays null (SQL NULL). */
export function toDisplayText(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value.toISOString();
  if (value instanceof Uint8Array) {
    return `\\x${Array.from(value, (byte) => byte.toString(16).padStart(2, '0')).join('')}`;
  }
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value);
  }
  // jsonb, arrays and other objects; JSON.stringify gives undefined only for odd values
  return JSON.stringify(value) ?? typeof value;
}

function toStatementResult(result: Results, label: string): SqlStatementResult {
  const columns = result.fields.map((field) => field.name);
  // rowMode 'array': one array per row, in column order, so two columns named "a" both show.
  const rows = (result.rows as unknown[][]).slice(0, MAX_ROWS).map((row) => row.map(toDisplayText));
  const command = (result.command ?? label.split(' ')[0]).toUpperCase();

  return {
    label,
    // `affectedRows` adds up across a multi-statement run; `rowCount` is this statement's own.
    rowCount:
      columns.length === 0 && ROW_COUNT_COMMANDS.includes(command)
        ? (result.rowCount ?? result.affectedRows ?? null)
        : null,
    columns,
    rows,
    truncated: result.rows.length > MAX_ROWS,
  };
}

/** One label per result: from our own splitter when the counts match, else PGlite's command tag. */
function labelsFor(text: string, results: Results[]): string[] {
  const statements = splitStatements(text);
  if (statements.length === results.length) return statements.map(statementLabel);
  return results.map((result, index) => result.command ?? `Statement ${index + 1}`);
}

async function runSql(db: PGlite, text: string): Promise<SqlRunResult> {
  const startedAt = performance.now();
  const duration = () => Math.round(performance.now() - startedAt);
  try {
    // A multi-statement string runs as one implicit transaction: if one statement fails,
    // nothing from the run is kept ("Nothing from this run was saved").
    const results = await db.exec(text, { rowMode: 'array' });
    const labels = labelsFor(text, results);
    return {
      ok: true,
      results: results.map((result, index) => toStatementResult(result, labels[index])),
      durationMs: duration(),
    };
  } catch (error) {
    return { ok: false, error: toSqlError(error), durationMs: duration() };
  }
}

/** Starts a fresh in-memory Postgres and runs `setupSql` (if any). Loads PGlite on first use. */
export async function createSqlDatabase(setupSql: string | null): Promise<SqlDatabase> {
  // Dynamic import: the ~3 MB engine is only downloaded when a SQL task opens.
  const { PGlite } = await import('@electric-sql/pglite');
  const db = await PGlite.create();

  try {
    // Asked for by the ticket. It does not interrupt a running query: PGlite runs on the page's
    // own thread (see REST_NOTES.md, FE-09). Kept so a future Web Worker version gets it for free.
    await db.exec("SET statement_timeout = '5s'");
    if (setupSql) await db.exec(setupSql);
  } catch (error) {
    await db.close();
    throw new Error(`The task's setup SQL failed: ${errorMessage(error)}`);
  }

  return {
    run: (text) => runSql(db, text),
    close: () => db.close(),
  };
}
