import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBlockedPasteReporter } from './useBlockedPasteReporter';

const { mockShow, mockLogFlagEvent } = vi.hoisted(() => ({
  mockShow: vi.fn(),
  mockLogFlagEvent: vi.fn(),
}));

vi.mock('../../../components/Toast', () => ({
  useToast: () => ({ show: mockShow }),
}));

vi.mock('../../../api/activity', () => ({
  logFlagEvent: mockLogFlagEvent,
}));

describe('useBlockedPasteReporter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(0);
    mockLogFlagEvent.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('throttles two calls 500ms apart to one toast and one log', () => {
    const { result } = renderHook(() => useBlockedPasteReporter('t1', 'editor'));

    result.current();
    vi.setSystemTime(500);
    result.current();

    expect(mockShow).toHaveBeenCalledTimes(1);
    expect(mockShow).toHaveBeenCalledWith({
      message: 'Pasting is turned off in the workspace.',
      variant: 'warning',
      durationMs: 3000,
    });
    expect(mockLogFlagEvent).toHaveBeenCalledTimes(1);
    expect(mockLogFlagEvent).toHaveBeenCalledWith('t1', {
      type: 'PASTE_BLOCKED',
      context: { source: 'editor' },
    });
  });

  it('reports again after 2.1s', () => {
    const { result } = renderHook(() => useBlockedPasteReporter('t1', 'editor'));

    result.current();
    vi.setSystemTime(2100);
    result.current();

    expect(mockShow).toHaveBeenCalledTimes(2);
    expect(mockLogFlagEvent).toHaveBeenCalledTimes(2);
  });

  it('does not throw when logFlagEvent rejects', async () => {
    mockLogFlagEvent.mockRejectedValue(new Error('network'));
    const { result } = renderHook(() => useBlockedPasteReporter('t1', 'editor'));

    expect(() => result.current()).not.toThrow();
    await Promise.resolve();
    await Promise.resolve();
  });
});
