import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SessionTimer from './SessionTimer';

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(document, 'hasFocus').mockReturnValue(true);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('SessionTimer', () => {
  it('shows the elapsed time and names it for screen readers', () => {
    render(<SessionTimer />);

    const timer = screen.getByRole('timer');
    expect(timer).toHaveTextContent('0:00');
    expect(timer).toHaveAccessibleName('Time on this task: 0 seconds');

    act(() => {
      vi.advanceTimersByTime(754_000);
    });

    expect(timer).toHaveTextContent('12:34');
    expect(timer).toHaveAccessibleName('Time on this task: 12 minutes 34 seconds');
  });

  it('starts again from 0:00 when its key changes', () => {
    const { rerender } = render(<SessionTimer key="task-1" />);
    act(() => {
      vi.advanceTimersByTime(90_000);
    });
    expect(screen.getByRole('timer')).toHaveTextContent('1:30');

    rerender(<SessionTimer key="task-2" />);

    expect(screen.getByRole('timer')).toHaveTextContent('0:00');
  });
});
