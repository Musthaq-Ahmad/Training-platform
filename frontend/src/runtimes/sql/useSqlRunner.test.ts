import { describe, it, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type { SqlDatabase } from './pgliteService';
import type { SqlRunResult } from './sqlTypes';
import { useSqlRunner } from './useSqlRunner';

const okResult: SqlRunResult = {
  ok: true,
  durationMs: 4,
  results: [{ label: 'SELECT', rowCount: null, columns: ['a'], rows: [['1']], truncated: false }],
};

/** Typed by inference (not as SqlDatabase), so `db.run` is a plain vi.fn the test can check. */
function fakeDb(result: SqlRunResult = okResult) {
  return {
    run: vi.fn(() => Promise.resolve(result)),
    close: vi.fn(() => Promise.resolve()),
    isPersistent: false,
  } satisfies SqlDatabase;
}

function input(text: string, overrides: { fileText?: string; offset?: number } = {}) {
  return {
    fileText: overrides.fileText ?? text,
    text,
    selectionStartOffset: overrides.offset ?? 0,
    ranSelection: overrides.offset !== undefined,
  };
}

describe('useSqlRunner', () => {
  it('records "Nothing to run." for empty text and does not call db.run', async () => {
    const db = fakeDb();
    const { result } = renderHook(() => useSqlRunner(db));

    await act(() => result.current.run(input('  \n ')));

    expect(db.run).not.toHaveBeenCalled();
    expect(result.current.lastRun).toMatchObject({ runError: 'Nothing to run.', result: null });
  });

  it('records "The database isn\'t ready." without a db', async () => {
    const { result } = renderHook(() => useSqlRunner(null));

    await act(() => result.current.run(input('select 1')));

    expect(result.current.lastRun?.runError).toBe("The database isn't ready.");
  });

  it('stores an ok result in lastRun and history', async () => {
    const db = fakeDb();
    const { result } = renderHook(() => useSqlRunner(db));

    await act(() => result.current.run(input('select 1 as a;')));

    expect(db.run).toHaveBeenCalledWith('select 1 as a;');
    expect(result.current.lastRun).toMatchObject({
      result: okResult,
      runError: null,
      location: null,
      ranSelection: false,
      statementCount: 1,
    });
    expect(result.current.history).toHaveLength(1);
    expect(result.current.isRunning).toBe(false);
  });

  it('turns an error position into a line and column in the whole file', async () => {
    const fileText = 'select 1;\n\nselect * from tickets;';
    const selectionStart = fileText.indexOf('select *');
    const db = fakeDb({
      ok: false,
      durationMs: 1,
      error: { message: 'relation "tickets" does not exist', sqlState: '42P01', position: 10 },
    });
    const { result } = renderHook(() => useSqlRunner(db));

    await act(() =>
      result.current.run(input('select * from tickets;', { fileText, offset: selectionStart }))
    );

    expect(result.current.lastRun?.location).toEqual({ line: 3, column: 10 });
    expect(result.current.lastRun?.ranSelection).toBe(true);
  });

  it('sets hadOpenTransaction for BEGIN without COMMIT, ignoring comments', async () => {
    const db = fakeDb();
    const { result } = renderHook(() => useSqlRunner(db));

    await act(() => result.current.run(input('begin; update t set a = 1; -- commit;')));
    expect(result.current.lastRun?.hadOpenTransaction).toBe(true);

    await act(() => result.current.run(input('BEGIN; update t set a = 1; COMMIT;')));
    expect(result.current.lastRun?.hadOpenTransaction).toBe(false);

    await act(() => result.current.run(input('start transaction; delete from t; rollback')));
    expect(result.current.lastRun?.hadOpenTransaction).toBe(false);
  });

  it('keeps the newest 20 runs, newest first', async () => {
    const db = fakeDb();
    const { result } = renderHook(() => useSqlRunner(db));

    for (let i = 0; i < 25; i += 1) {
      await act(() => result.current.run(input(`select ${i}`)));
    }

    expect(result.current.history).toHaveLength(20);
    expect(result.current.history[0].id).toBeGreaterThan(result.current.history[19].id);
    expect(result.current.lastRun).toBe(result.current.history[0]);
  });
});
