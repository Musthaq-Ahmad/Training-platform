import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import DayCompletion from './DayCompletion';

type Overrides = Partial<React.ComponentProps<typeof DayCompletion>>;

function setup(overrides: Overrides = {}) {
  const onComplete = vi.fn();

  render(
    <DayCompletion
      completedTasks={3}
      totalTasks={3}
      isCompleted={false}
      isSubmitting={false}
      onComplete={onComplete}
      {...overrides}
    />
  );

  const button: HTMLButtonElement = screen.getByRole('button');

  return { onComplete, button };
}

describe('DayCompletion', () => {
  it('calls onComplete when all required tasks are done', () => {
    const { onComplete, button } = setup();

    expect(button.disabled).toBe(false);
    fireEvent.click(button);

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('disables the button and shows a badge while tasks are incomplete', () => {
    const { button } = setup({ completedTasks: 1, totalTasks: 3 });

    expect(button.disabled).toBe(true);
    expect(screen.getByText(/tasks incomplete \(1\/3\)/i)).toBeTruthy();
  });

  it('disables the button and shows "Submitting..." while submitting', () => {
    const { button } = setup({ isSubmitting: true });

    expect(button.disabled).toBe(true);
    expect(screen.getByText('Submitting...')).toBeTruthy();
  });

  it('shows "Day completed" and a disabled button once completed', () => {
    const { button } = setup({ isCompleted: true });

    expect(button.disabled).toBe(true);
    expect(screen.getByText('Day completed')).toBeTruthy();
    expect(screen.queryByText(/tasks incomplete/i)).toBeNull();
  });
});
