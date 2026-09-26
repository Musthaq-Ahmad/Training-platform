import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import DashboardPage from './DashboardPage';
import { getDashboard } from '../../api/dashboard';
import type { DashboardResponse } from '@itp/types';

vi.mock('../../api/dashboard', () => ({
  getDashboard: vi.fn(),
}));

vi.mock('../../components/Header', () => ({
  default: () => <header>Header</header>,
}));

vi.mock('../../components/CurrentLessonCard', () => ({
  default: ({
    courseTitle,
    dayNumber,
    totalDays,
    lessonTitle,
    description,
    onContinue,
  }: {
    courseTitle: string;
    dayNumber: number;
    totalDays: number;
    lessonTitle: string;
    description: string;
    onContinue: () => void;
  }) => (
    <div>
      <h2>{lessonTitle}</h2>
      <p>{courseTitle}</p>
      <p>
        Day {dayNumber} of {totalDays}
      </p>
      <p>{description}</p>
      <button onClick={onContinue}>Continue</button>
    </div>
  ),
}));

vi.mock('../../components/TrackTabs', () => ({
  default: ({
    tracks,
    activeTrackId,
    onSelect,
  }: {
    tracks: { id: string; label: string }[];
    activeTrackId: string;
    onSelect: (id: string) => void;
  }) => (
    <div role="tablist">
      {tracks.map((track) => (
        <button
          key={track.id}
          role="tab"
          aria-selected={track.id === activeTrackId}
          onClick={() => onSelect(track.id)}
        >
          {track.label}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('../../components/ScheduleGrid', () => ({
  default: ({
    title,
    days,
  }: {
    title: string;
    days: {
      id: string;
      dayNumber: number;
      title: string;
    }[];
  }) => (
    <div>
      <h2>{title}</h2>

      {days.map((day) => (
        <button key={day.id}>{String(day.dayNumber).padStart(2, '0')}</button>
      ))}
    </div>
  ),
}));

vi.mock('../../components/StatsRow', () => ({
  default: ({
    totalActiveSeconds,
    totalCodingSeconds,
    latestWpm,
    onTakeTypingTest,
  }: {
    totalActiveSeconds: number;
    totalCodingSeconds: number;
    latestWpm: number | null;
    onTakeTypingTest: () => void;
  }) => (
    <div>
      <p>Total active: {totalActiveSeconds}</p>
      <p>Total coding: {totalCodingSeconds}</p>
      <p>Latest WPM: {latestWpm ?? '—'}</p>

      <button onClick={onTakeTypingTest}>Take a typing test</button>
    </div>
  ),
}));

const mockDashboard: DashboardResponse = {
  currentDay: {
    id: 'day-js-06',
    courseId: 'course-js',
    dayNumber: 6,
    title: 'Closures and Higher-Order Functions',
    description:
      'Implement memoized function wrappers and partial application utilities with strict scope isolation.',
    status: 'UNLOCKED',
  },

  currentCourseId: 'course-js',

  courses: [
    {
      id: 'course-html',
      title: 'HTML',
      days: [
        {
          id: 'course-html-day-1',
          courseId: 'course-html',
          dayNumber: 1,
          title: 'HTML lesson 1',
          status: 'COMPLETED',
        },
        {
          id: 'course-html-day-2',
          courseId: 'course-html',
          dayNumber: 2,
          title: 'HTML lesson 2',
          status: 'COMPLETED',
        },
      ],
    },

    {
      id: 'course-css',
      title: 'CSS',
      days: [
        {
          id: 'course-css-day-1',
          courseId: 'course-css',
          dayNumber: 1,
          title: 'CSS lesson 1',
          status: 'COMPLETED',
        },
      ],
    },

    {
      id: 'course-js',
      title: 'JavaScript',
      days: [
        {
          id: 'course-js-day-1',
          courseId: 'course-js',
          dayNumber: 1,
          title: 'JS lesson 1',
          status: 'COMPLETED',
        },
        {
          id: 'course-js-day-2',
          courseId: 'course-js',
          dayNumber: 2,
          title: 'JS lesson 2',
          status: 'COMPLETED',
        },
        {
          id: 'course-js-day-3',
          courseId: 'course-js',
          dayNumber: 3,
          title: 'JS lesson 3',
          status: 'COMPLETED',
        },
        {
          id: 'course-js-day-4',
          courseId: 'course-js',
          dayNumber: 4,
          title: 'JS lesson 4',
          status: 'COMPLETED',
        },
        {
          id: 'course-js-day-5',
          courseId: 'course-js',
          dayNumber: 5,
          title: 'JS lesson 5',
          status: 'COMPLETED',
        },
        {
          id: 'day-js-06',
          courseId: 'course-js',
          dayNumber: 6,
          title: 'Closures and Higher-Order Functions',
          description:
            'Implement memoized function wrappers and partial application utilities with strict scope isolation.',
          status: 'UNLOCKED',
        },
        {
          id: 'course-js-day-7',
          courseId: 'course-js',
          dayNumber: 7,
          title: 'JS lesson 7',
          status: 'LOCKED',
        },
      ],
    },

    {
      id: 'course-ts',
      title: 'TypeScript',
      days: [
        {
          id: 'course-ts-day-1',
          courseId: 'course-ts',
          dayNumber: 1,
          title: 'TypeScript lesson 1',
          status: 'LOCKED',
        },
      ],
    },

    {
      id: 'course-node',
      title: 'Node.js',
      days: [
        {
          id: 'course-node-day-1',
          courseId: 'course-node',
          dayNumber: 1,
          title: 'Node.js Introduction',
          status: 'UNLOCKED',
        },
        {
          id: 'course-node-day-2',
          courseId: 'course-node',
          dayNumber: 2,
          title: 'Node.js Modules',
          status: 'LOCKED',
        },
      ],
    },

    {
      id: 'course-postgresql',
      title: 'PostgreSQL',
      days: [
        {
          id: 'course-postgresql-day-1',
          courseId: 'course-postgresql',
          dayNumber: 1,
          title: 'PostgreSQL lesson 1',
          status: 'LOCKED',
        },
      ],
    },

    {
      id: 'course-prisma',
      title: 'Prisma',
      days: [
        {
          id: 'course-prisma-day-1',
          courseId: 'course-prisma',
          dayNumber: 1,
          title: 'Prisma lesson 1',
          status: 'LOCKED',
        },
      ],
    },

    {
      id: 'course-react',
      title: 'React',
      days: [
        {
          id: 'course-react-day-1',
          courseId: 'course-react',
          dayNumber: 1,
          title: 'React lesson 1',
          status: 'LOCKED',
        },
      ],
    },
  ],

  totalDaysCompleteOverall: 17,
  totalDaysOverall: 60,

  today: {
    activeSeconds: 5400,
    codingSeconds: 3600,
    readingSeconds: 1800,
  },

  total: {
    activeSeconds: 153000,
    codingSeconds: 101700,
    readingSeconds: 51300,
  },

  typing: {
    latest: {
      wpm: 74,
      accuracy: 96,
      takenAt: '2026-09-26T09:00:00Z',
    },
    todayAverageWpm: 71,
    trend: [
      {
        date: '2026-09-20',
        averageWpm: 65,
      },
      {
        date: '2026-09-21',
        averageWpm: 68,
      },
      {
        date: '2026-09-22',
        averageWpm: 70,
      },
    ],
  },
};

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows the loading state while dashboard data is loading', () => {
    vi.mocked(getDashboard).mockReturnValue(new Promise(() => {}));

    render(<DashboardPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows the error message when dashboard loading fails', async () => {
    vi.mocked(getDashboard).mockRejectedValue(new Error('Failed to load dashboard'));

    render(<DashboardPage />);

    expect(await screen.findByText('Failed to load dashboard')).toBeInTheDocument();
  });

  it('renders the header', async () => {
    vi.mocked(getDashboard).mockResolvedValue(mockDashboard);

    render(<DashboardPage />);

    expect(await screen.findByText('Header')).toBeInTheDocument();
  });

  it('renders the current lesson information', async () => {
    vi.mocked(getDashboard).mockResolvedValue(mockDashboard);

    render(<DashboardPage />);

    expect(await screen.findByText('Closures and Higher-Order Functions')).toBeInTheDocument();

    expect(
      screen.getByText(
        'Implement memoized function wrappers and partial application utilities with strict scope isolation.'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('Day 6 of 7')).toBeInTheDocument();
  });

  it('renders the overall progress', async () => {
    vi.mocked(getDashboard).mockResolvedValue(mockDashboard);

    render(<DashboardPage />);

    expect(await screen.findByText('17 of 60 days complete overall')).toBeInTheDocument();
  });

  it('renders the JavaScript schedule by default', async () => {
    vi.mocked(getDashboard).mockResolvedValue(mockDashboard);

    render(<DashboardPage />);

    expect(await screen.findByText('JavaScript Module — Schedule')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '01' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '06' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '07' })).toBeInTheDocument();
  });

  it('changes the schedule when another track is selected', async () => {
    const user = userEvent.setup();

    vi.mocked(getDashboard).mockResolvedValue(mockDashboard);

    render(<DashboardPage />);

    expect(await screen.findByText('JavaScript Module — Schedule')).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Node.js' }));

    expect(screen.getByText('Node.js Module — Schedule')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '01' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '02' })).toBeInTheDocument();
  });

  it('marks the selected track as active', async () => {
    const user = userEvent.setup();

    vi.mocked(getDashboard).mockResolvedValue(mockDashboard);

    render(<DashboardPage />);

    await screen.findByText('JavaScript Module — Schedule');

    const javascriptTab = screen.getByRole('tab', {
      name: 'JavaScript',
    });

    const nodeTab = screen.getByRole('tab', {
      name: 'Node.js',
    });

    expect(javascriptTab).toHaveAttribute('aria-selected', 'true');
    expect(nodeTab).toHaveAttribute('aria-selected', 'false');

    await user.click(nodeTab);

    expect(javascriptTab).toHaveAttribute('aria-selected', 'false');
    expect(nodeTab).toHaveAttribute('aria-selected', 'true');
  });

  it('keeps the current lesson based on the actual current day when switching tracks', async () => {
    const user = userEvent.setup();

    vi.mocked(getDashboard).mockResolvedValue(mockDashboard);

    render(<DashboardPage />);

    expect(await screen.findByText('Closures and Higher-Order Functions')).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Node.js' }));

    expect(screen.getByText('Closures and Higher-Order Functions')).toBeInTheDocument();
  });

  it('renders the statistics data', async () => {
    vi.mocked(getDashboard).mockResolvedValue(mockDashboard);

    render(<DashboardPage />);

    expect(await screen.findByText('Total active: 153000')).toBeInTheDocument();

    expect(screen.getByText('Total coding: 101700')).toBeInTheDocument();

    expect(screen.getByText('Latest WPM: 74')).toBeInTheDocument();
  });

  it('renders the typing test button', async () => {
    vi.mocked(getDashboard).mockResolvedValue(mockDashboard);

    render(<DashboardPage />);

    expect(
      await screen.findByRole('button', {
        name: /take a typing test/i,
      })
    ).toBeInTheDocument();
  });

  it('calls getDashboard once when the page loads', async () => {
    vi.mocked(getDashboard).mockResolvedValue(mockDashboard);

    render(<DashboardPage />);

    await screen.findByText('JavaScript Module — Schedule');

    expect(getDashboard).toHaveBeenCalledTimes(1);
  });

  it('falls back to HTML Day 1 for a new trainee', async () => {
    const newTraineeDashboard: DashboardResponse = {
      ...mockDashboard,
      currentDay: null,
    };

    vi.mocked(getDashboard).mockResolvedValue(newTraineeDashboard);

    render(<DashboardPage />);

    expect(await screen.findByText('HTML lesson 1')).toBeInTheDocument();

    expect(screen.getByText('Day 1 of 2')).toBeInTheDocument();

    expect(screen.getByText('HTML Module — Schedule')).toBeInTheDocument();
  });

  it('starts with HTML track when currentDay is null', async () => {
    const newTraineeDashboard: DashboardResponse = {
      ...mockDashboard,
      currentDay: null,
    };

    vi.mocked(getDashboard).mockResolvedValue(newTraineeDashboard);

    render(<DashboardPage />);

    await screen.findByText('HTML Module — Schedule');

    expect(screen.getByRole('tab', { name: 'HTML' })).toHaveAttribute('aria-selected', 'true');
  });
});
