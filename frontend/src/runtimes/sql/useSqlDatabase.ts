import { useCallback, useEffect, useRef, useState } from 'react';
import { createSqlDatabase, type SqlDatabase } from './pgliteService';

export type SqlDatabaseState =
  | { status: 'starting' }
  | { status: 'ready'; db: SqlDatabase }
  | { status: 'failed'; message: string };

type Settled = Exclude<SqlDatabaseState, { status: 'starting' }>;

/**
 * One Postgres per task. With a `storageName` its tables are saved in this browser, so they are
 * still there after a refresh or a later visit. Without one it is in memory, per visit.
 * `reset` deletes the saved copy and starts again from the setup SQL. `retry` starts again as is.
 */
export function useSqlDatabase(
  setupSql: string | null,
  storageName: string | null = null
): SqlDatabaseState & {
  reset: () => Promise<void>;
  retry: () => void;
} {
  // Each start gets a number. The state is only "settled" for the start that produced it, so
  // after reset() the hook reports 'starting' again without a setState inside the effect body
  // (same pattern as useTaskData's requestKey).
  const [generation, setGeneration] = useState(0);
  const [settled, setSettled] = useState<{ generation: number; state: Settled } | null>(null);
  const waitingForStartRef = useRef<Array<() => void>>([]);
  // Set by reset(), read once by the next start, so only a reset deletes the saved tables.
  const isFreshStartRef = useRef(false);

  useEffect(() => {
    let isCancelled = false;
    let started: SqlDatabase | null = null;

    const finish = (state: Settled) => {
      setSettled({ generation, state });
      for (const resolve of waitingForStartRef.current.splice(0)) resolve();
    };

    const fresh = isFreshStartRef.current;
    isFreshStartRef.current = false;

    createSqlDatabase(setupSql, { storageName, fresh })
      .then((db) => {
        if (isCancelled) {
          void db.close(); // unmounted or reset while starting
          return;
        }
        started = db;
        finish({ status: 'ready', db });
      })
      .catch((error: unknown) => {
        if (isCancelled) return;
        const message = error instanceof Error ? error.message : String(error);
        finish({ status: 'failed', message: `Couldn't start the database: ${message}` });
      });

    return () => {
      isCancelled = true;
      if (started) void started.close();
    };
  }, [setupSql, storageName, generation]);

  const restart = useCallback(() => setGeneration((current) => current + 1), []);

  const reset = useCallback(
    () =>
      new Promise<void>((resolve) => {
        waitingForStartRef.current.push(resolve);
        isFreshStartRef.current = true;
        restart(); // the effect's cleanup closes the old database, then a new one starts
      }),
    [restart]
  );

  const state: SqlDatabaseState =
    settled && settled.generation === generation ? settled.state : { status: 'starting' };

  return { ...state, reset, retry: restart };
}
