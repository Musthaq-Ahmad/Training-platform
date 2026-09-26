import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ScheduleGrid from './ScheduleGrid';
import type { DaySummary } from '@itp/types';

const mockDays: DaySummary[] = [
  {
    id: 'day-1',
    courseId: 'course-1',
    dayNumber: 1,
    title: 'Introduction to JavaScript',
    status: 'COMPLETED',
  },
  {
    id: 'day-2',
    courseId: 'course-1',
    dayNumber: 2,
    title: 'JavaScript Variables',
    status: 'UNLOCKED',
  },
  {
    id: 'day-3',
    courseId: 'course-1',
    dayNumber: 3,
    title: 'JavaScript Functions',
    status: 'LOCKED',
  },
  {
    id: 'day-10',
    courseId: 'course-1',
    dayNumber: 10,
    title: 'Advanced JavaScript',
    status: 'UNLOCKED',
  },
];

describe('ScheduleGrid', () => {
  it('renders the schedule title', () => {
    render(
      <ScheduleGrid
        title="JavaScript Module — Schedule"
        days={mockDays}
        currentDayId="day-2"
        onSelectDay={vi.fn()}
      />
    );

    expect(screen.getByText('JavaScript Module — Schedule')).toBeInTheDocument();
  });

  it('renders all days with two-digit day numbers', () => {
    render(
      <ScheduleGrid
        title="JavaScript Module — Schedule"
        days={mockDays}
        currentDayId="day-2"
        onSelectDay={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: '01' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '02' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '03' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
  });

  it('marks the current day with the current class', () => {
    render(
      <ScheduleGrid
        title="JavaScript Module — Schedule"
        days={mockDays}
        currentDayId="day-2"
        onSelectDay={vi.fn()}
      />
    );

    const currentDay = screen.getByRole('button', { name: '02' });

    expect(currentDay.className).toContain('cellCurrent');
  });

  it('does not mark other days as current', () => {
    render(
      <ScheduleGrid
        title="JavaScript Module — Schedule"
        days={mockDays}
        currentDayId="day-2"
        onSelectDay={vi.fn()}
      />
    );

    const day1 = screen.getByRole('button', { name: '01' });
    const day3 = screen.getByRole('button', { name: '03' });

    expect(day1.className).not.toContain('cellCurrent');
    expect(day3.className).not.toContain('cellCurrent');
  });

  it('marks locked days with the locked class', () => {
    render(
      <ScheduleGrid
        title="JavaScript Module — Schedule"
        days={mockDays}
        currentDayId="day-2"
        onSelectDay={vi.fn()}
      />
    );

    const lockedDay = screen.getByRole('button', { name: '03' });

    expect(lockedDay.className).toContain('cellLocked');
  });

  it('disables locked days', () => {
    render(
      <ScheduleGrid
        title="JavaScript Module — Schedule"
        days={mockDays}
        currentDayId="day-2"
        onSelectDay={vi.fn()}
      />
    );

    const lockedDay = screen.getByRole('button', { name: '03' });

    expect(lockedDay).toBeDisabled();
  });

  it('does not disable unlocked or completed days', () => {
    render(
      <ScheduleGrid
        title="JavaScript Module — Schedule"
        days={mockDays}
        currentDayId="day-2"
        onSelectDay={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: '01' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: '02' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: '10' })).not.toBeDisabled();
  });

  it('calls onSelectDay with the correct day id when a day is clicked', async () => {
    const user = userEvent.setup();
    const onSelectDay = vi.fn();

    render(
      <ScheduleGrid
        title="JavaScript Module — Schedule"
        days={mockDays}
        currentDayId="day-2"
        onSelectDay={onSelectDay}
      />
    );

    await user.click(screen.getByRole('button', { name: '01' }));

    expect(onSelectDay).toHaveBeenCalledTimes(1);
    expect(onSelectDay).toHaveBeenCalledWith('day-1');
  });

  it('does not call onSelectDay when a locked day is clicked', async () => {
    const user = userEvent.setup();
    const onSelectDay = vi.fn();

    render(
      <ScheduleGrid
        title="JavaScript Module — Schedule"
        days={mockDays}
        currentDayId="day-2"
        onSelectDay={onSelectDay}
      />
    );

    await user.click(screen.getByRole('button', { name: '03' }));

    expect(onSelectDay).not.toHaveBeenCalled();
  });

  it('renders correctly when there are no days', () => {
    render(
      <ScheduleGrid
        title="JavaScript Module — Schedule"
        days={[]}
        currentDayId={null}
        onSelectDay={vi.fn()}
      />
    );

    expect(screen.getByText('JavaScript Module — Schedule')).toBeInTheDocument();

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
