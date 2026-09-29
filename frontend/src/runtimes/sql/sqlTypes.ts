// Frontend only: SQL runs in the browser on PGlite (FE-09), so nothing here crosses the API.

/** One result per statement that ran */
export type SqlStatementResult = {
  label: string; // 'SELECT', 'INSERT', 'CREATE TABLE', 'EXPLAIN', … (best effort)
  rowCount: number | null; // affected rows for INSERT/UPDATE/DELETE
  columns: string[];
  rows: (string | null)[][]; // display text; null = SQL NULL
  truncated: boolean; // true when cut off after 500 rows
};

export type SqlError = {
  message: string;
  sqlState: string | null; // e.g. '42P01'
  position: number | null; // 1-based character offset into the text that ran
};

export type SqlRunResult =
  | { ok: true; results: SqlStatementResult[]; durationMs: number }
  | { ok: false; error: SqlError; durationMs: number };
