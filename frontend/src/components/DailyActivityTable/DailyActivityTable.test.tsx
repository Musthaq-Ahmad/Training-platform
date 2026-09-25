import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { ProfileDay } from '@itp/types';

import DailyActivityTable from './DailyActivityTable';

afterEach(() => {
  cleanup();
});

describe('DailyActivityTable', () => {
  const days: ProfileDay[] = [
    {
      date: 'Oct 14',
      timeSpentSeconds: 15000,
      typingWpm: 74,
      isToday: true,
    },
    {
      date: 'Oct 13',
      timeSpentSeconds: 13500,
      typingWpm: 72,
      isToday: false,
    },
    {
      date: 'Oct 12',
      timeSpentSeconds: 16200,
      typingWpm: null,
      isToday: false,
    },
  ];

  it('renders the activity section', () => {
    render(<DailyActivityTable days={days} />);

    expect(
      screen.getByRole('region', {
        name: 'Daily training activity',
      })
    ).toBeInTheDocument();
  });

  it('renders all activity dates', () => {
    render(<DailyActivityTable days={days} />);

    expect(screen.getByText('Oct 14 (Today)')).toBeInTheDocument();
    expect(screen.getByText('Oct 13')).toBeInTheDocument();
    expect(screen.getByText('Oct 12')).toBeInTheDocument();
  });

  it('renders formatted time spent', () => {
    render(<DailyActivityTable days={days} />);

    expect(screen.getByText('4h 10m')).toBeInTheDocument();
    expect(screen.getByText('3h 45m')).toBeInTheDocument();
    expect(screen.getByText('4h 30m')).toBeInTheDocument();
  });

  it('renders typing speed when available', () => {
    render(<DailyActivityTable days={days} />);

    expect(screen.getByText('74 WPM')).toBeInTheDocument();
    expect(screen.getByText('72 WPM')).toBeInTheDocument();
  });

  it('renders a dash when typing speed is unavailable', () => {
    render(<DailyActivityTable days={days} />);

    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('marks today correctly', () => {
    render(<DailyActivityTable days={days} />);

    expect(screen.getByText('Oct 14 (Today)')).toBeInTheDocument();
    expect(screen.queryByText('Oct 13 (Today)')).not.toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<DailyActivityTable days={days} />);

    expect(screen.getByText('DATE')).toBeInTheDocument();
    expect(screen.getByText('TIME SPENT')).toBeInTheDocument();
    expect(screen.getByText('TYPING SPEED')).toBeInTheDocument();
  });

  it('renders correctly when there are no days', () => {
    render(<DailyActivityTable days={[]} />);

    expect(
      screen.getByRole('region', {
        name: 'Daily training activity',
      })
    ).toBeInTheDocument();

    expect(screen.getByText('DATE')).toBeInTheDocument();
    expect(screen.queryByText(/Today/)).not.toBeInTheDocument();
  });

  it('handles days with zero time spent', () => {
    const zeroTimeDays: ProfileDay[] = [
      {
        date: 'Oct 14',
        timeSpentSeconds: 0,
        typingWpm: null,
        isToday: true,
      },
    ];

    render(<DailyActivityTable days={zeroTimeDays} />);

    expect(screen.getByText('0h 00m')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
