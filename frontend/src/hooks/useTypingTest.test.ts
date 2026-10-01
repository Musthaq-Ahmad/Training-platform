import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTypingTest } from './useTypingTest';
import { buildPassage } from '../lib/typingStats';

vi.mock('../lib/typingStats', async () => {
  const actual = await vi.importActual<typeof import('../lib/typingStats')>('../lib/typingStats');
  return { ...actual, buildPassage: vi.fn(() => 'abc def') };
});
describe('useTypingTest', () => {
  beforeEach(() => {
    vi.useFakeTimers();
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
      vi.advanceTimersByTime(10_000);
    });
    expect(result.current.secondsLeft).toBe(20);
  });

  it('does not count down before typing starts', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => {
      vi.advanceTimersByTime(10_000);
    });

    expect(result.current.secondsLeft).toBe(30);
    expect(result.current.status).toBe('idle');
  });

  it('finishes once when the time runs out and reports the stats', () => {
    const onFinish = vi.fn();
    const { result } = renderHook(() => useTypingTest(30, onFinish));

    act(() => result.current.handleInput('a'));
    act(() => {
      vi.advanceTimersByTime(35_000);
    });

    expect(result.current.status).toBe('finished');
    expect(result.current.secondsLeft).toBe(0);
    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledWith(
      expect.objectContaining({ accuracy: 100, durationSeconds: 30 })
    );
  });

  it('finishes early when the whole passage is typed', () => {
    const onFinish = vi.fn();
    const { result } = renderHook(() => useTypingTest(30, onFinish));

    act(() => result.current.handleInput('abc def'));

    expect(result.current.status).toBe('finished');
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('ignores input after the test has finished', () => {
    const onFinish = vi.fn();
    const { result } = renderHook(() => useTypingTest(30, onFinish));

    act(() => result.current.handleInput('abc def'));
    act(() => result.current.handleInput('abc dex'));

    expect(result.current.typed).toBe('abc def');
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('never types past the end of the passage', () => {
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

  it('restarts when Escape is pressed', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => result.current.handleInput('ab'));
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(result.current.status).toBe('idle');
    expect(result.current.typed).toBe('');
  });
  it('starts with punctuation and numbers off', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    expect(result.current.options).toEqual({ punctuation: false, numbers: false });
  });

  it('builds new text with the option turned on and resets the test', () => {
    const { result } = renderHook(() => useTypingTest(30, vi.fn()));

    act(() => result.current.handleInput('ab'));
    act(() => result.current.toggleOption('punctuation'));

    expect(result.current.options).toEqual({ punctuation: true, numbers: false });
    expect(result.current.typed).toBe('');
    expect(result.current.status).toBe('idle');
    expect(buildPassage).toHaveBeenLastCalledWith(30, { punctuation: true, numbers: false });
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

    expect(buildPassage).toHaveBeenLastCalledWith(60, { punctuation: false, numbers: true });
  });
});
