import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTaskActivityMode } from './useTaskActivityMode';

describe('useTaskActivityMode', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T10:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const setup = () => renderHook(() => useTaskActivityMode());

  it('starts with none when no work has been marked', () => {
    const { result } = setup();

    expect(result.current.mode).toBe('none');
  });

  it('switches to coding when work is marked', () => {
    const { result } = setup();

    act(() => {
      result.current.markWork();
    });

    expect(result.current.mode).toBe('coding');
  });

  it('remains coding while within the work window', () => {
    const { result } = setup();

    act(() => {
      result.current.markWork();
    });

    act(() => {
      vi.advanceTimersByTime(59_000);
    });

    expect(result.current.mode).toBe('coding');
  });

  it('returns to none after the trainee has not worked for over a minute', () => {
    const { result } = setup();

    act(() => {
      result.current.markWork();
    });

    act(() => {
      vi.advanceTimersByTime(66_000);
    });

    expect(result.current.mode).toBe('none');
  });

  it('resets the work window when work is marked again', () => {
    const { result } = setup();

    act(() => {
      result.current.markWork();
    });

    act(() => {
      vi.advanceTimersByTime(50_000);
    });

    act(() => {
      result.current.markWork();
    });

    act(() => {
      vi.advanceTimersByTime(50_000);
    });

    expect(result.current.mode).toBe('coding');
  });
});
