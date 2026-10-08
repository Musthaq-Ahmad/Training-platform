import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { AdminTaskRow, AdminTraineeDetail } from '@itp/types';
import AdminTaskList from './AdminTaskList';

const courses: AdminTraineeDetail['courses'] = [
  {
    id: 'html',
    title: 'HTML',
    days: [
      { id: 'html-1', dayNumber: 1, title: 'Structure', status: 'COMPLETED', completedAt: null },
      { id: 'html-2', dayNumber: 2, title: 'Forms', status: 'UNLOCKED', completedAt: null },
      { id: 'html-3', dayNumber: 3, title: 'Media', status: 'LOCKED', completedAt: null },
    ],
  },
];

const tasks: AdminTaskRow[] = [
  {
    taskId: 't1',
    title: 'Profile page',
    dayId: 'html-1',
    isStretchGoal: false,
    status: 'completed',
    codeUpdatedAt: '2026-10-01T10:00:00.000Z',
    lastSubmittedAt: '2026-10-01T12:12:00.000Z',
  },
  {
    taskId: 't2',
    title: 'Semantic article',
    dayId: 'html-2',
    isStretchGoal: true,
    status: 'in_progress',
    codeUpdatedAt: '2026-10-02T12:12:00.000Z',
    lastSubmittedAt: null,
  },
];

describe('AdminTaskList', () => {
  it('groups tasks by day and leaves out days that have no tasks', () => {
    render(
      <AdminTaskList tasks={tasks} courses={courses} selectedTaskId={null} onViewCode={vi.fn()} />
    );

    expect(screen.getByText('Day 1 · Structure')).toBeInTheDocument();
    expect(screen.getByText('Day 2 · Forms')).toBeInTheDocument();
    expect(screen.queryByText('Day 3 · Media')).not.toBeInTheDocument();
    expect(screen.getByText('1/1 done')).toBeInTheDocument();
    expect(screen.getByText('0/1 done')).toBeInTheDocument();
  });

  it('shows status, submission and stretch state', () => {
    render(
      <AdminTaskList tasks={tasks} courses={courses} selectedTaskId={null} onViewCode={vi.fn()} />
    );

    expect(screen.getByText('Submitted 01 Oct 2026, 17:42')).toBeInTheDocument();
    expect(screen.getByText('Saved 02 Oct 2026, 17:42')).toBeInTheDocument();
    expect(screen.getByText('Stretch')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.queryByText('Not started')).not.toBeInTheDocument();
  });

  it('opens a day that is in progress and leaves finished days closed', () => {
    render(
      <AdminTaskList tasks={tasks} courses={courses} selectedTaskId={null} onViewCode={vi.fn()} />
    );

    const inProgress = screen.getByText('Day 2 · Forms').closest('details');
    const finished = screen.getByText('Day 1 · Structure').closest('details');

    expect(inProgress).toHaveAttribute('open');
    expect(finished).not.toHaveAttribute('open');
  });

  it('asks to view code for the task that was clicked', async () => {
    const user = userEvent.setup();
    const onViewCode = vi.fn();
    render(
      <AdminTaskList tasks={tasks} courses={courses} selectedTaskId="t2" onViewCode={onViewCode} />
    );

    await user.click(screen.getByRole('button', { name: 'View code for Profile page' }));

    expect(onViewCode).toHaveBeenCalledWith('t1');
    expect(screen.getByRole('button', { name: 'View code for Semantic article' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'View code for Profile page' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('has an empty state', () => {
    render(
      <AdminTaskList tasks={[]} courses={courses} selectedTaskId={null} onViewCode={vi.fn()} />
    );

    expect(screen.getByText('No completed or in-progress tasks yet.')).toBeInTheDocument();
  });
});
