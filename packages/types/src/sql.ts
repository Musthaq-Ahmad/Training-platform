/** POST /api/sql/execute */
export type SqlExecuteRequest = {
  taskId: string;
  query: string; // one or more statements, run in order
};

/** One result per statement that ran */
export type SqlStatementResult = {
  command: string; // 'SELECT', 'INSERT', 'CREATE', 'BEGIN', ...
  rowCount: number | null;
  columns: string[];
  rows: (string | null)[][]; // every value already turned into display text; null = SQL NULL
  truncated: boolean; // true when the server cut rows off after 500
};

/**
 * A SQL error is the trainee's result, not a failed API call,
 * so it comes back as 200 with ok: false (not as an ApiError).
 */
export type SqlExecuteResponse =
  | { ok: true; results: SqlStatementResult[]; durationMs: number }
  | {
      ok: false;
      error: {
        message: string; // e.g. 'relation "tickets" does not exist'
        sqlState: string | null; // Postgres error code, e.g. '42P01'; '57014' = stopped by timeout
        position: number | null; // 1-based character offset in `query`, when Postgres gives one
      };
      results: SqlStatementResult[]; // always [] today: Postgres rolls back the whole run when a statement fails
      durationMs: number;
    };

/** GET /api/sql/database — the trainee's own Postgres. Creates it on first call. */
export type TraineeDatabaseResponse =
  | { status: 'provisioning' }
  | { status: 'ready'; connectionString: string }
  | { status: 'failed'; message: string };

/** POST /api/sql/database/reset → 200 with a TraineeDatabaseResponse (usually 'ready' at once) */
