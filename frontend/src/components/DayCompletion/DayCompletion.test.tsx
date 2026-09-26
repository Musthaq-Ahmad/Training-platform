import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DayCompletion from './DayCompletion';

afterEach(() => {
  cleanup();
});

describe('DayCompletion', () => {
  it('renders the completion heading', () => {
    render(
      <DayCompletion completedTasks={2} totalTasks={3} isCompleted={false} onComplete={vi.fn()} />
    );

    expect(
      screen.getByRole('heading', {
        name: 'Day Completion Verification',
      })
    ).toBeInTheDocument();
  });

  it('renders the completion description', () => {
    render(
      <DayCompletion completedTasks={2} totalTasks={3} isCompleted={false} onComplete={vi.fn()} />
    );

    expect(screen.getByText(/verifies checklist items and task completions/i)).toBeInTheDocument();
  });

  it('shows the checklist incomplete badge when tasks are incomplete', () => {
    render(
      <DayCompletion completedTasks={1} totalTasks={3} isCompleted={false} onComplete={vi.fn()} />
    );

    expect(screen.getByText('Checklist Incomplete')).toBeInTheDocument();
  });

  it('does not show the incomplete badge when all tasks are completed', () => {
    render(
      <DayCompletion completedTasks={3} totalTasks={3} isCompleted={false} onComplete={vi.fn()} />
    );

    expect(screen.queryByText('Checklist Incomplete')).not.toBeInTheDocument();
  });

  it('disables the submit button when the checklist is incomplete', () => {
    render(
      <DayCompletion completedTasks={1} totalTasks={3} isCompleted={false} onComplete={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: /submit day/i })).toBeDisabled();
  });

  it('enables the submit button when all tasks are completed and the day is not submitted', () => {
    render(
      <DayCompletion completedTasks={3} totalTasks={3} isCompleted={false} onComplete={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: /submit day/i })).toBeEnabled();
  });

  it('calls onComplete when the submit button is clicked', () => {
    const onComplete = vi.fn();

    render(
      <DayCompletion
        completedTasks={3}
        totalTasks={3}
        isCompleted={false}
        onComplete={onComplete}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /submit day/i }));

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('shows DAY SUBMITTED when the day is completed', () => {
    render(
      <DayCompletion completedTasks={3} totalTasks={3} isCompleted={true} onComplete={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: 'DAY SUBMITTED' })).toBeInTheDocument();
  });

  it('disables the button when the day is already completed', () => {
    render(
      <DayCompletion completedTasks={3} totalTasks={3} isCompleted={true} onComplete={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: 'DAY SUBMITTED' })).toBeDisabled();
  });

  it('does not show the incomplete badge when the day is already completed', () => {
    render(
      <DayCompletion completedTasks={1} totalTasks={3} isCompleted={true} onComplete={vi.fn()} />
    );

    expect(screen.queryByText('Checklist Incomplete')).not.toBeInTheDocument();
  });
});
