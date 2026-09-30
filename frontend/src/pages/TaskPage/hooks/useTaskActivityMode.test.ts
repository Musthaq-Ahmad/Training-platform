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

  const setup = (isInstructionsVisible: boolean) =>
    renderHook(
      (props: { visible: boolean }) =>
        useTaskActivityMode({ isInstructionsVisible: props.visible }),
      {
        initialProps: { visible: isInstructionsVisible },
      }
    );

  it('reads while the instructions are on screen and nothing was typed', () => {
    const { result } = setup(true);
    expect(result.current.mode).toBe('reading');
  });

  it('switches to coding when work is marked', () => {
    const { result } = setup(true);
    act(() => result.current.markWork());
    expect(result.current.mode).toBe('coding');
  });

  it('returns to reading once the trainee has not worked for over a minute', () => {
    const { result } = setup(true);
    act(() => result.current.markWork());

    // The check runs every 5 s, so allow a little over the 60 s window
    act(() => {
      vi.advanceTimersByTime(66_000);
    });
    expect(result.current.mode).toBe('reading');
  });

  it('reports none when the instructions are hidden and there is no recent work', () => {
    const { result, rerender } = setup(true);
    rerender({ visible: false });
    expect(result.current.mode).toBe('none');
  });

  it('keeps reporting coding with the instructions hidden while working', () => {
    const { result, rerender } = setup(false);
    act(() => result.current.markWork());
    rerender({ visible: false });
    expect(result.current.mode).toBe('coding');
  });
});
