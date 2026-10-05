import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GREETING_SESSION_KEY } from '../constants/greeting';
import { useGreeting } from './useGreeting';

describe('useGreeting', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows the greeting and marks it as shown for this session', () => {
    const { result } = renderHook(() => useGreeting());

    expect(result.current.isVisible).toBe(true);
    expect(window.sessionStorage.getItem(GREETING_SESSION_KEY)).toBe('true');
  });

  it('does not show it again after the dashboard unmounts and mounts', () => {
    const firstVisit = renderHook(() => useGreeting());
    expect(firstVisit.result.current.isVisible).toBe(true);

    firstVisit.unmount();
    const returnVisit = renderHook(() => useGreeting());

    expect(returnVisit.result.current.isVisible).toBe(false);
  });

  it('still shows the greeting if sessionStorage is unavailable', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });

    const { result } = renderHook(() => useGreeting());

    expect(result.current.isVisible).toBe(true);
    getItem.mockRestore();
    setItem.mockRestore();
  });

  it('keeps the greeting hidden when the session key already exists', () => {
    window.sessionStorage.setItem(GREETING_SESSION_KEY, 'true');

    const { result } = renderHook(() => useGreeting());

    expect(result.current.isVisible).toBe(false);
  });
});
