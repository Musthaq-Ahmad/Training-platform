import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { createSqlDatabase, type SqlDatabase } from './pgliteService';
import { useSqlDatabase } from './useSqlDatabase';

vi.mock('./pgliteService', () => ({ createSqlDatabase: vi.fn() }));

/** Typed by inference (not as SqlDatabase), so `db.close` is a plain vi.fn the test can check. */
function fakeDb() {
  return { run: vi.fn(), close: vi.fn(() => Promise.resolve()) } satisfies SqlDatabase;
}

beforeEach(() => {
  vi.mocked(createSqlDatabase).mockReset();
});

describe('useSqlDatabase', () => {
  it('goes starting → ready, passing the setup SQL', async () => {
    const db = fakeDb();
    vi.mocked(createSqlDatabase).mockResolvedValue(db);

    const { result } = renderHook(() => useSqlDatabase('create table t (id int);'));
    expect(result.current.status).toBe('starting');

    await waitFor(() => expect(result.current.status).toBe('ready'));
    expect(result.current.status === 'ready' && result.current.db).toBe(db);
    expect(createSqlDatabase).toHaveBeenCalledWith('create table t (id int);');
  });

  it('reports failed with the message when starting rejects', async () => {
    vi.mocked(createSqlDatabase).mockRejectedValue(new Error('wasm blocked'));

    const { result } = renderHook(() => useSqlDatabase(null));

    await waitFor(() => expect(result.current.status).toBe('failed'));
    expect(result.current.status === 'failed' && result.current.message).toBe(
      "Couldn't start the database: wasm blocked"
    );
  });

  it('retry starts again after a failure', async () => {
    const db = fakeDb();
    vi.mocked(createSqlDatabase).mockRejectedValueOnce(new Error('offline')).mockResolvedValue(db);
    const { result } = renderHook(() => useSqlDatabase(null));
    await waitFor(() => expect(result.current.status).toBe('failed'));

    act(() => result.current.retry());
    expect(result.current.status).toBe('starting');

    await waitFor(() => expect(result.current.status).toBe('ready'));
    expect(createSqlDatabase).toHaveBeenCalledTimes(2);
  });

  it('reset closes the old database and creates a new one', async () => {
    const first = fakeDb();
    const second = fakeDb();
    vi.mocked(createSqlDatabase).mockResolvedValueOnce(first).mockResolvedValueOnce(second);
    const { result } = renderHook(() => useSqlDatabase(null));
    await waitFor(() => expect(result.current.status).toBe('ready'));

    let resetDone = false;
    act(() => {
      void result.current.reset().then(() => {
        resetDone = true;
      });
    });
    expect(result.current.status).toBe('starting');
    expect(first.close).toHaveBeenCalledTimes(1);

    await waitFor(() => expect(result.current.status).toBe('ready'));
    expect(result.current.status === 'ready' && result.current.db).toBe(second);
    await waitFor(() => expect(resetDone).toBe(true));
  });

  it('closes the database on unmount', async () => {
    const db = fakeDb();
    vi.mocked(createSqlDatabase).mockResolvedValue(db);
    const { result, unmount } = renderHook(() => useSqlDatabase(null));
    await waitFor(() => expect(result.current.status).toBe('ready'));

    unmount();
    expect(db.close).toHaveBeenCalledTimes(1);
  });

  it('closes a database that finishes starting after unmount', async () => {
    const db = fakeDb();
    let finishStart: (value: SqlDatabase) => void = () => {};
    vi.mocked(createSqlDatabase).mockReturnValue(
      new Promise((resolve) => {
        finishStart = resolve;
      })
    );
    const { unmount } = renderHook(() => useSqlDatabase(null));

    unmount();
    await act(async () => {
      finishStart(db);
      await Promise.resolve();
    });
    expect(db.close).toHaveBeenCalledTimes(1);
  });
});
