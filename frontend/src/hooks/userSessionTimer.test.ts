import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useSessionTimer } from './useSessionTimer';

let visibility: DocumentVisibilityState = 'visible';

function setVisibility(state: DocumentVisibilityState) {
  visibility = state;
  act(() => {
    document.dispatchEvent(new Event('visibilitychange'));
  });
}

function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  visibility = 'visible';
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => visibility,
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  // Drop the override so jsdom's own property is used again.
  delete (document as { visibilityState?: unknown }).visibilityState;
});

describe('useSessionTimer', () => {
  it('starts at 0', () => {
    const { result } = renderHook(() => useSessionTimer());
    expect(result.current).toBe(0);
  });

  it('counts whole seconds while the page is visible', () => {
    const { result } = renderHook(() => useSessionTimer());

    advance(1000);
    expect(result.current).toBe(1);

    advance(64_000);
    expect(result.current).toBe(65);
  });

  it('pauses while the tab is hidden and resumes from the same value', () => {
    const { result } = renderHook(() => useSessionTimer());
    advance(10_000);

    setVisibility('hidden');
    advance(30_000);
    expect(result.current).toBe(10);

    setVisibility('visible');
    advance(5000);
    expect(result.current).toBe(15);
  });

  it('does not count when it mounts in a hidden tab', () => {
    visibility = 'hidden';
    const { result } = renderHook(() => useSessionTimer());

    advance(20_000);
    expect(result.current).toBe(0);

    setVisibility('visible');
    advance(3000);
    expect(result.current).toBe(3);
  });

  it('stops its interval and listener on unmount', () => {
    const clearSpy = vi.spyOn(window, 'clearInterval');
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() => useSessionTimer());

    unmount();

    expect(clearSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });
});
