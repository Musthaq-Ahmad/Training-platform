import { useCallback, useRef, useState } from 'react';
import type { SqlDatabase } from './pgliteService';
import { splitStatements, statementLabel } from './splitStatements';
import { sqlErrorLocation } from './sqlPosition';
import type { SqlRunResult } from './sqlTypes';

export type SqlRun = {
  id: number;
  at: Date;
  ranSelection: boolean;
  result: SqlRunResult | null; // null when it couldn't run at all
  runError: string | null; // e.g. "Nothing to run.", "The database isn't ready."
  location: { line: number; column: number } | null;
  hadOpenTransaction: boolean; // BEGIN without COMMIT/ROLLBACK in the text
  /** Statements in the text that ran (comments ignored); > 1 means an error kept nothing */
  statementCount: number;
};

type RunInput = {
  fileText: string;
  text: string;
  selectionStartOffset: number;
  ranSelection: boolean;
};

const MAX_HISTORY = 20;
const OPENS_TRANSACTION = ['BEGIN', 'START TRANSACTION'];
const CLOSES_TRANSACTION = ['COMMIT', 'ROLLBACK', 'END', 'ABORT'];

/** BEGIN (or START TRANSACTION) with no COMMIT/ROLLBACK after it, comments ignored */
function leavesTransactionOpen(statements: string[]): boolean {
  let isOpen = false;
  for (const statement of statements) {
    const label = statementLabel(statement);
    const first = label.split(' ')[0];
    if (OPENS_TRANSACTION.includes(label) || first === 'BEGIN') isOpen = true;
    else if (CLOSES_TRANSACTION.includes(first)) isOpen = false;
  }
  return isOpen;
}

export function useSqlRunner(db: SqlDatabase | null): {
  lastRun: SqlRun | null;
  history: SqlRun[]; // newest first, at most 20
  isRunning: boolean;
  run: (input: RunInput) => Promise<void>;
} {
  const [history, setHistory] = useState<SqlRun[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const nextIdRef = useRef(1);

  const run = useCallback(
    async ({ fileText, text, selectionStartOffset, ranSelection }: RunInput) => {
      const statements = splitStatements(text);
      const record = (fields: Partial<SqlRun>) => {
        const entry: SqlRun = {
          id: nextIdRef.current++,
          at: new Date(),
          ranSelection,
          result: null,
          runError: null,
          location: null,
          hadOpenTransaction: false,
          statementCount: statements.length,
          ...fields,
        };
        setHistory((current) => [entry, ...current].slice(0, MAX_HISTORY));
      };

      if (text.trim() === '') {
        record({ runError: 'Nothing to run.' });
        return;
      }
      if (!db) {
        record({ runError: "The database isn't ready." });
        return;
      }

      setIsRunning(true);
      let result: SqlRunResult;
      try {
        // The untrimmed text runs, so Postgres positions line up with selectionStartOffset.
        result = await db.run(text);
      } finally {
        setIsRunning(false);
      }

      record({
        result,
        location:
          !result.ok && result.error.position !== null
            ? sqlErrorLocation(fileText, selectionStartOffset, result.error.position)
            : null,
        hadOpenTransaction: leavesTransactionOpen(statements),
      });
    },
    [db]
  );

  return { lastRun: history[0] ?? null, history, isRunning, run };
}
