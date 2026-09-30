import type { PGlite, Results } from '@electric-sql/pglite';
import { splitStatements, statementLabel } from './splitStatements';
import type { SqlError, SqlRunResult, SqlStatementResult } from './sqlTypes';

export type SqlDatabase = {
  run(text: string): Promise<SqlRunResult>;
  close(): Promise<void>;
  /** true when the tables are kept in this browser (IndexedDB) and survive a refresh */
  isPersistent: boolean;
};

export type CreateSqlDatabaseOptions = {
  /**
   * Where to keep the tables. A name means "save them in this browser's IndexedDB under this name".
   * null or missing means an in-memory database that disappears with the page.
   */
  storageName?: string | null;
  /** Delete whatever is stored under `storageName` first (Reset) */
  fresh?: boolean;
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

const META_SCHEMA = 'itp_meta';
/** How long to wait for another tab (or the database this tab just closed) to let go of a stored database */
const LOCK_WAIT_MS = 4000;
const STATEMENT_TIMEOUT_SQL = "SET statement_timeout = '5s'";

/** A short fingerprint of the setup SQL. When it changes, the stored database is out of date. */
export function setupFingerprint(setupSql: string | null): string {
  let hash = 2166136261; // FNV-1a, 32 bit: not secure, only for spotting a change
  for (const char of setupSql ?? '') {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function isStorageAvailable(): boolean {
  return (
    typeof indexedDB !== 'undefined' && typeof navigator !== 'undefined' && 'locks' in navigator
  );
}

/**
 * Two tabs writing to the same stored database would corrupt it, so a Web Lock is held while one is
 * open. Returns a function that gives the lock back, or null if the lock could not be had in time.
 */
async function acquireStorageLock(name: string): Promise<(() => void) | null> {
  return new Promise((resolve) => {
    let release: () => void = () => {};
    const held = new Promise<void>((done) => {
      release = done;
    });
    navigator.locks
      .request(`itp-sql:${name}`, { signal: AbortSignal.timeout(LOCK_WAIT_MS) }, () => {
        resolve(release);
        return held; // the lock is kept until release() runs
      })
      .catch(() => resolve(null)); // timed out: someone else has it
  });
}

function deleteIndexedDb(name: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(name);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error ?? new Error(`Couldn't delete ${name}`));
    // onblocked is not an error: the delete finishes as soon as the other connection closes.
  });
}

/** Deletes the stored copy of `storageName`. PGlite adds its own prefix to the IndexedDB name. */
async function deleteStoredDatabase(storageName: string): Promise<void> {
  const known = await indexedDB.databases();
  const matches = known
    .map((entry) => entry.name)
    .filter(
      (name): name is string => name === storageName || name?.endsWith(`/${storageName}`) === true
    );
  await Promise.all(matches.map(deleteIndexedDb));
}

async function readStoredFingerprint(db: PGlite): Promise<string | null> {
  const exists = await db.query<{ found: boolean }>(
    `select to_regclass('${META_SCHEMA}.setup') is not null as found`
  );
  if (!exists.rows[0]?.found) return null;
  const stored = await db.query<{ fingerprint: string }>(
    `select fingerprint from ${META_SCHEMA}.setup limit 1`
  );
  return stored.rows[0]?.fingerprint ?? null;
}

/** Runs the setup SQL and records its fingerprint in one transaction: both happen or neither does. */
async function runSetup(db: PGlite, setupSql: string | null, fingerprint: string): Promise<void> {
  await db.transaction(async (tx) => {
    if (setupSql) await tx.exec(setupSql);
    await tx.exec(
      `create schema ${META_SCHEMA}; create table ${META_SCHEMA}.setup (fingerprint text not null)`
    );
    await tx.query(`insert into ${META_SCHEMA}.setup (fingerprint) values ($1)`, [fingerprint]);
  });
}

function toSqlDatabase(db: PGlite, isPersistent: boolean, release: () => void): SqlDatabase {
  return {
    run: (text) => runSql(db, text),
    isPersistent,
    close: async () => {
      try {
        await db.close();
      } finally {
        release();
      }
    },
  };
}

/** Opens (or creates) the database saved under `storageName`. Throws if the setup SQL fails. */
async function openStored(
  storageName: string,
  setupSql: string | null,
  fresh: boolean,
  release: () => void
): Promise<SqlDatabase> {
  const { PGlite } = await import('@electric-sql/pglite');
  const fingerprint = setupFingerprint(setupSql);
  if (fresh) await deleteStoredDatabase(storageName);

  let db = await PGlite.create(`idb://${storageName}`);
  let stored = await readStoredFingerprint(db);

  if (stored !== null && stored !== fingerprint) {
    // The task's setup SQL changed since this database was made: start again from the new setup.
    await db.close();
    await deleteStoredDatabase(storageName);
    db = await PGlite.create(`idb://${storageName}`);
    stored = null;
  }

  try {
    await db.exec(STATEMENT_TIMEOUT_SQL);
    if (stored === null) await runSetup(db, setupSql, fingerprint);
  } catch (error) {
    await db.close();
    await deleteStoredDatabase(storageName); // don't keep a half-made database
    throw new Error(`The task's setup SQL failed: ${errorMessage(error)}`);
  }

  return toSqlDatabase(db, true, release);
}

async function openInMemory(setupSql: string | null): Promise<SqlDatabase> {
  // Dynamic import: the ~3 MB engine is only downloaded when a SQL task opens.
  const { PGlite } = await import('@electric-sql/pglite');
  const db = await PGlite.create();

  try {
    // Asked for by the ticket. It does not interrupt a running query: PGlite runs on the page's
    // own thread (see REST_NOTES.md, FE-09). Kept so a future Web Worker version gets it for free.
    await db.exec(STATEMENT_TIMEOUT_SQL);
    if (setupSql) await db.exec(setupSql);
  } catch (error) {
    await db.close();
    throw new Error(`The task's setup SQL failed: ${errorMessage(error)}`);
  }

  return toSqlDatabase(db, false, () => {});
}

/**
 * Starts Postgres and runs `setupSql` (if any).
 *
 * With a `storageName` the tables are saved in this browser's IndexedDB, so they survive a refresh.
 * It quietly falls back to an in-memory database (`isPersistent: false`) when storage can't be used:
 * no IndexedDB or Web Locks, the same database open in another tab, or the browser refused to open it.
 */
export async function createSqlDatabase(
  setupSql: string | null,
  options: CreateSqlDatabaseOptions = {}
): Promise<SqlDatabase> {
  const { storageName = null, fresh = false } = options;
  if (!storageName || !isStorageAvailable()) return openInMemory(setupSql);

  const release = await acquireStorageLock(storageName);
  if (!release) return openInMemory(setupSql);

  try {
    return await openStored(storageName, setupSql, fresh, release);
  } catch (error) {
    release();
    // A broken setup is the trainee's task to fix. Anything else (blocked storage) falls back.
    if (error instanceof Error && error.message.startsWith("The task's setup SQL failed"))
      throw error;
    return openInMemory(setupSql);
  }
}
