import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DayCompletion from './DayCompletion';

describe('DayCompletion', () => {
  const defaultProps = {
    completedTasks: 2,
    totalTasks: 2,
    isCompleted: false,
    onComplete: vi.fn(),
  };

  it('renders the heading and description', () => {
    render(<DayCompletion {...defaultProps} />);

    expect(
      screen.getByRole('heading', { name: /day completion verification/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/clicking "submit day" verifies checklist items/i)).toBeInTheDocument();
  });

  it('shows the Submit Day button when the day is not completed', () => {
    render(<DayCompletion {...defaultProps} />);

    expect(screen.getByRole('button', { name: /submit day/i })).toBeInTheDocument();
  });

  it('enables the button when all tasks are completed and the day is not completed', () => {
    render(<DayCompletion {...defaultProps} />);

    expect(screen.getByRole('button', { name: /submit day/i })).toBeEnabled();
  });

  it('disables the button when the checklist is incomplete', () => {
    render(<DayCompletion {...defaultProps} completedTasks={1} totalTasks={2} />);

    expect(screen.getByRole('button', { name: /submit day/i })).toBeDisabled();
  });

  it('shows the Checklist Incomplete badge when tasks are incomplete', () => {
    render(<DayCompletion {...defaultProps} completedTasks={1} totalTasks={2} />);

    expect(screen.getByText('Checklist Incomplete')).toBeInTheDocument();
  });

  it('does not show the Checklist Incomplete badge when all tasks are completed', () => {
    render(<DayCompletion {...defaultProps} />);

    expect(screen.queryByText('Checklist Incomplete')).not.toBeInTheDocument();
  });

  it('shows Day completed and disables the button when the day is already completed', () => {
    render(<DayCompletion {...defaultProps} isCompleted={true} />);

    const button = screen.getByRole('button', {
      name: /day completed/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('does not show the Checklist Incomplete badge when the day is already completed', () => {
    render(
      <DayCompletion {...defaultProps} completedTasks={1} totalTasks={2} isCompleted={true} />
    );

    expect(screen.queryByText('Checklist Incomplete')).not.toBeInTheDocument();
  });

  it('calls onComplete when the Submit Day button is clicked', () => {
    const onComplete = vi.fn();

    render(<DayCompletion {...defaultProps} onComplete={onComplete} />);

    fireEvent.click(screen.getByRole('button', { name: /submit day/i }));

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('does not call onComplete when the button is disabled', () => {
    const onComplete = vi.fn();

    render(
      <DayCompletion {...defaultProps} completedTasks={1} totalTasks={2} onComplete={onComplete} />
    );

    fireEvent.click(screen.getByRole('button', { name: /submit day/i }));

    expect(onComplete).not.toHaveBeenCalled();
  });
});
