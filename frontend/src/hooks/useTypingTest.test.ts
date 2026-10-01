import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTypingTest } from './useTypingTest';
import { buildPassage } from '../lib/typingStats';

vi.mock('../lib/typingStats', async () => {
  const actual = await vi.importActual<typeof import('../lib/typingStats')>('../lib/typingStats');

  return {
    ...actual,
    buildPassage: vi.fn(() => 'abc def'),
  };
});

describe('useTypingTest', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts idle with the full time left', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    expect(result.current.status).toBe('idle');
    expect(result.current.secondsLeft).toBe(30);
    expect(result.current.typed).toBe('');
    expect(result.current.passage).toBe('abc def');
  });

  it('starts the countdown on the first key press', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => result.current.handleInput('a'));

    expect(result.current.status).toBe('running');

    act(() => {
      vi.advanceTimersByTime(4_000);
      result.current.handleInput('ab');

      vi.advanceTimersByTime(4_000);
      result.current.handleInput('abc');
    });

    expect(result.current.secondsLeft).toBe(22);
  });

  it('does not count down before typing starts', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => {
      vi.advanceTimersByTime(10_000);
    });

    expect(result.current.secondsLeft).toBe(30);
    expect(result.current.status).toBe('idle');
  });

  it('finishes when the time runs out and reports the stats', () => {
    const onFinish = vi.fn();
    const { result } = renderHook(() => useTypingTest(5, onFinish));

    act(() => result.current.handleInput('a'));

    act(() => {
      vi.advanceTimersByTime(1_000);
      result.current.handleInput('ab');

      vi.advanceTimersByTime(1_000);
      result.current.handleInput('abc');

      vi.advanceTimersByTime(1_000);
      result.current.handleInput('abcd');

      vi.advanceTimersByTime(1_000);
      result.current.handleInput('abcde');

      vi.advanceTimersByTime(1_000);
    });

    expect(result.current.status).toBe('finished');
    expect(result.current.secondsLeft).toBe(0);
    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledWith(
      expect.objectContaining({
        durationSeconds: 5,
      })
    );
  });

  it('extends the passage when the trainee reaches the available text', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => result.current.handleInput('abc def'));

    expect(result.current.status).toBe('running');
    expect(result.current.typed).toBe('abc def');
    expect(result.current.passage).toContain('abc def abc def');
  });

  it('does not finish when the available passage is completed', () => {
    const onFinish = vi.fn();
    const { result } = renderHook(() => useTypingTest(30, onFinish));

    act(() => result.current.handleInput('abc def'));

    expect(result.current.status).toBe('running');
    expect(onFinish).not.toHaveBeenCalled();
  });

  it('ignores input after the test has finished', () => {
    const onFinish = vi.fn();
    const { result } = renderHook(() => useTypingTest(5, onFinish));

    act(() => result.current.handleInput('a'));

    act(() => {
      vi.advanceTimersByTime(5_000);
    });

    expect(result.current.status).toBe('finished');

    act(() => result.current.handleInput('abc def'));

    expect(result.current.status).toBe('finished');
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('never types past the end of the passage before it is extended', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => result.current.handleInput('abc def and more'));

    expect(result.current.typed).toBe('abc def');
  });

  it('restarts with a new duration', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => result.current.handleInput('ab'));

    act(() => result.current.restart(60));

    expect(result.current.status).toBe('idle');
    expect(result.current.typed).toBe('');
    expect(result.current.durationSeconds).toBe(60);
    expect(result.current.secondsLeft).toBe(60);
  });

  it('restarts when Enter is pressed', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => result.current.handleInput('ab'));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    expect(result.current.status).toBe('idle');
    expect(result.current.typed).toBe('');
  });

  it('does not restart when Escape is pressed', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => result.current.handleInput('ab'));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(result.current.status).toBe('running');
    expect(result.current.typed).toBe('ab');
  });

  it('starts with punctuation and numbers off', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    expect(result.current.options).toEqual({
      punctuation: false,
      numbers: false,
    });
  });

  it('builds new text with the option turned on and resets the test', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => result.current.handleInput('ab'));

    act(() => result.current.toggleOption('punctuation'));

    expect(result.current.options).toEqual({
      punctuation: true,
      numbers: false,
    });

    expect(result.current.typed).toBe('');
    expect(result.current.status).toBe('idle');

    expect(buildPassage).toHaveBeenLastCalledWith(30, {
      punctuation: true,
      numbers: false,
    });
  });

  it('turns an option off again when it is toggled twice', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => result.current.toggleOption('numbers'));
    act(() => result.current.toggleOption('numbers'));

    expect(result.current.options.numbers).toBe(false);
  });

  it('keeps the chosen options when the test is restarted', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => result.current.toggleOption('numbers'));

    act(() => result.current.restart(60));

    expect(buildPassage).toHaveBeenLastCalledWith(60, {
      punctuation: false,
      numbers: true,
    });
  });

  it('pauses after 5 seconds of inactivity', async () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => {
      result.current.handleInput('a');
    });

    expect(result.current.status).toBe('running');
    expect(result.current.isPaused).toBe(false);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5_200);
    });

    expect(result.current.isPaused).toBe(true);
    expect(result.current.status).toBe('running');
  });

  it('resumes when any key is pressed after inactivity', async () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => {
      result.current.handleInput('a');
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5_200);
    });

    expect(result.current.isPaused).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    });

    expect(result.current.isPaused).toBe(false);
    expect(result.current.status).toBe('running');
  });

  it('does not count paused time toward the test duration', async () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => {
      result.current.handleInput('a');
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5_200);
    });

    expect(result.current.isPaused).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    });

    expect(result.current.isPaused).toBe(false);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5_000);
    });

    expect(result.current.status).toBe('running');
    expect(result.current.isPaused).toBe(false);
  });

  it('does not type the key used to resume a paused test', async () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => {
      result.current.handleInput('a');
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5_200);
    });

    expect(result.current.isPaused).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x' }));
    });

    expect(result.current.isPaused).toBe(false);
    expect(result.current.typed).toBe('a');
  });
});
