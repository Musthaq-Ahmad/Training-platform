import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useState } from 'react';
import { renderHook, act } from '@testing-library/react';
import type { TaskFile } from '@itp/types';
import { useAutosave } from './useAutosave';
import { ApiError } from '../../../api/errors';

async function flushMicrotasks() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

/**
 * Mirrors how a real caller tracks dirty state: `isDirty` is true only while
 * the live content differs from what was last successfully saved, and
 * `onSaved` moves "saved" to match what was actually sent — exactly like
 * TaskWorkspace comparing `state.files` against `state.savedFiles`.
 */
function useHarness(options: {
  save: (files: TaskFile[]) => Promise<void>;
  validate?: (files: TaskFile[]) => string | null;
}) {
  const [content, setContent] = useState('a');
  const [savedContent, setSavedContent] = useState('a');
  const isDirty = content !== savedContent;

  const autosave = useAutosave({
    isDirty,
    changeKey: content,
    getSnapshot: () => [{ path: 'a.txt', content }],
    save: options.save,
    onSaved: (files) => setSavedContent(files[0].content),
    validate: options.validate,
  });

  return { ...autosave, edit: setContent, isDirty };
}

describe('useAutosave', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('saves 2s after one edit, not at 1.9s', async () => {
    const save = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useHarness({ save }));

    act(() => result.current.edit('b'));

    act(() => {
      vi.advanceTimersByTime(1900);
    });
    expect(save).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(100);
      await flushMicrotasks();
    });
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith([{ path: 'a.txt', content: 'b' }]);
    expect(result.current.state.status).toBe('saved');
  });

  it('an edit every 1s for 12s still saves by 8s (max-wait)', async () => {
    const save = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useHarness({ save }));

    for (let second = 1; second <= 8; second += 1) {
      act(() => result.current.edit(`v${second}`));
      await act(async () => {
        vi.advanceTimersByTime(1000);
        await flushMicrotasks();
      });
    }

    expect(save).toHaveBeenCalledTimes(1);
  });

  it('an edit during an in-flight save produces exactly one follow-up save, with the newer files', async () => {
    let resolveSave: (() => void) | undefined;
    const save = vi.fn().mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveSave = resolve;
        })
    );
    const { result } = renderHook(() => useHarness({ save }));

    act(() => result.current.edit('b'));
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenLastCalledWith([{ path: 'a.txt', content: 'b' }]);

    // A new edit while the first save is still in flight.
    act(() => result.current.edit('c'));
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    // Still just one call: the second debounce fired while a save was in
    // flight, so it's queued as "save again", not a second concurrent call.
    expect(save).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveSave?.();
      await flushMicrotasks();
    });

    expect(save).toHaveBeenCalledTimes(2);
    expect(save).toHaveBeenLastCalledWith([{ path: 'a.txt', content: 'c' }]);
  });

  it('NETWORK_ERROR goes offline, and an online event saves again', async () => {
    const save = vi
      .fn()
      .mockRejectedValueOnce(new ApiError(0, 'NETWORK_ERROR', "Can't reach the server."))
      .mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useHarness({ save }));

    act(() => result.current.edit('b'));
    await act(async () => {
      vi.advanceTimersByTime(2000);
      await flushMicrotasks();
    });

    expect(result.current.state.status).toBe('offline');

    await act(async () => {
      window.dispatchEvent(new Event('online'));
      await flushMicrotasks();
    });

    expect(save).toHaveBeenCalledTimes(2);
    expect(result.current.state.status).toBe('saved');
  });

  it('a generic error retries once after 5s, and retry() saves at once', async () => {
    const save = vi
      .fn()
      .mockRejectedValueOnce(new ApiError(500, 'INTERNAL_ERROR', 'Boom'))
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new ApiError(500, 'INTERNAL_ERROR', 'Boom again'))
      .mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useHarness({ save }));

    act(() => result.current.edit('b'));
    await act(async () => {
      vi.advanceTimersByTime(2000);
      await flushMicrotasks();
    });
    expect(result.current.state.status).toBe('error');
    expect(save).toHaveBeenCalledTimes(1);

    await act(async () => {
      vi.advanceTimersByTime(5000);
      await flushMicrotasks();
    });
    expect(save).toHaveBeenCalledTimes(2);
    expect(result.current.state.status).toBe('saved');

    // A further edit, whose save rejects again; only retry() should trigger
    // another attempt (no second automatic retry).
    act(() => result.current.edit('c'));
    await act(async () => {
      vi.advanceTimersByTime(2000);
      await flushMicrotasks();
    });
    expect(save).toHaveBeenCalledTimes(3);
    expect(result.current.state.status).toBe('error');

    await act(async () => {
      vi.advanceTimersByTime(4999);
      await flushMicrotasks();
    });
    expect(save).toHaveBeenCalledTimes(3);

    await act(async () => {
      result.current.retry();
      await flushMicrotasks();
    });
    expect(save).toHaveBeenCalledTimes(4);
    expect(result.current.state.status).toBe('saved');
  });

  it('VALIDATION_FAILED is blocked with no automatic retry', async () => {
    const save = vi.fn().mockRejectedValue(new ApiError(400, 'VALIDATION_FAILED', 'Bad file.'));
    const { result } = renderHook(() => useHarness({ save }));

    act(() => result.current.edit('b'));
    await act(async () => {
      vi.advanceTimersByTime(2000);
      await flushMicrotasks();
    });

    expect(result.current.state.status).toBe('blocked');
    expect(result.current.state.message).toBe('Bad file.');
    expect(save).toHaveBeenCalledTimes(1);

    await act(async () => {
      vi.advanceTimersByTime(10_000);
      await flushMicrotasks();
    });
    expect(save).toHaveBeenCalledTimes(1);
  });

  it('a validate() message blocks the save before it is ever called', async () => {
    const save = vi.fn().mockResolvedValue(undefined);
    const validate = vi.fn().mockReturnValue('a.txt is too large to save.');
    const { result } = renderHook(() => useHarness({ save, validate }));

    act(() => result.current.edit('b'));
    await act(async () => {
      vi.advanceTimersByTime(2000);
      await flushMicrotasks();
    });

    expect(save).not.toHaveBeenCalled();
    expect(result.current.state.status).toBe('blocked');
    expect(result.current.state.message).toBe('a.txt is too large to save.');
  });

  describe('flush()', () => {
    it('resolves true and makes no request when clean', async () => {
      const save = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => useHarness({ save }));

      let resolved: boolean | undefined;
      await act(async () => {
        resolved = await result.current.flush();
      });

      expect(resolved).toBe(true);
      expect(save).not.toHaveBeenCalled();
    });

    it('saves and resolves true when dirty', async () => {
      const save = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => useHarness({ save }));
      act(() => result.current.edit('b'));

      let resolved: boolean | undefined;
      await act(async () => {
        resolved = await result.current.flush();
      });

      expect(save).toHaveBeenCalledTimes(1);
      expect(resolved).toBe(true);
    });

    it('resolves false after a failure', async () => {
      const save = vi.fn().mockRejectedValue(new ApiError(500, 'INTERNAL_ERROR', 'Boom'));
      const { result } = renderHook(() => useHarness({ save }));
      act(() => result.current.edit('b'));

      let resolved: boolean | undefined;
      await act(async () => {
        resolved = await result.current.flush();
      });

      expect(resolved).toBe(false);
    });
  });

  it('flushes on visibilitychange to hidden', async () => {
    const save = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useHarness({ save }));
    act(() => result.current.edit('b'));

    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    await act(async () => {
      document.dispatchEvent(new Event('visibilitychange'));
      await flushMicrotasks();
    });

    expect(save).toHaveBeenCalledTimes(1);
  });

  it('saves once more on unmount while dirty', () => {
    const save = vi.fn().mockResolvedValue(undefined);
    const { result, unmount } = renderHook(() => useHarness({ save }));
    act(() => result.current.edit('b'));

    unmount();

    expect(save).toHaveBeenCalledTimes(1);
  });

  it('does not save on unmount when validate() blocks the files', () => {
    const save = vi.fn().mockResolvedValue(undefined);
    const validate = vi.fn().mockReturnValue('a.txt is too large to save.');
    const { result, unmount } = renderHook(() => useHarness({ save, validate }));
    act(() => result.current.edit('b'));

    unmount();

    expect(save).not.toHaveBeenCalled();
  });

  it('a save under 300ms never shows saving', async () => {
    const save = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useHarness({ save }));
    act(() => result.current.edit('b'));

    await act(async () => {
      vi.advanceTimersByTime(2000);
      await flushMicrotasks();
    });

    expect(result.current.state.status).not.toBe('saving');
    expect(result.current.state.status).toBe('saved');
  });
});
