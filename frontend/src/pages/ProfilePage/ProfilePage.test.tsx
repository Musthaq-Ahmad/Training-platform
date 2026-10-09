import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'; // changed: + beforeEach
import { MemoryRouter } from 'react-router';
import type { CourseCertificate, ProfileData } from '@itp/types'; // changed: + CourseCertificate

import ProfilePage from './ProfilePage';
import { getProfile } from '../../api/profile';
import { useEarnedCertificates } from '../../hooks/useEarnedCerificates'; // new

vi.mock('../../context/Useauth', () => ({
  useAuth: () => ({
    user: {
      id: 'user-1',
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
    },
    status: 'authenticated',
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('../../api/profile', () => ({
  getProfile: vi.fn(),
}));

// new: the certificates row has its own tests; here it is a plain list of data
vi.mock('../../hooks/useEarnedCerificates', () => ({
  useEarnedCertificates: vi.fn(),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function renderProfilePage() {
  return render(
    <MemoryRouter>
      <ProfilePage />
    </MemoryRouter>
  );
}

describe('ProfilePage', () => {
  // new: by default the trainee has earned no certificates
  beforeEach(() => {
    vi.mocked(useEarnedCertificates).mockReturnValue([]);
  });

  const profile: ProfileData = {
    trainee: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@vonnue.com',
      track: 'JavaScript',
      currentDay: 6,
      totalDays: 12,
    },
    total: {
      activeSeconds: 153000,
      codingSeconds: 51300,
    },
    typing: {
      latestWpm: 74,
      latestAccuracy: 98.4,
    },
    dailyActivity: [
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
    ],
  };

  // new
  const certificates: CourseCertificate[] = [
    {
      courseId: 'html',
      courseTitle: 'HTML',
      traineeName: 'Rahul Sharma',
      daysCompleted: 5,
      completedAt: '2026-10-05T10:00:00.000Z',
      certificateId: 'VK-HTML000000',
    },
    {
      courseId: 'css',
      courseTitle: 'CSS',
      traineeName: 'Rahul Sharma',
      daysCompleted: 5,
      completedAt: '2026-10-06T09:00:00.000Z',
      certificateId: 'VK-CSS0000000',
    },
  ];

  it('renders the loading state while the profile is loading', () => {
    vi.mocked(getProfile).mockImplementation(() => new Promise<ProfileData>(() => {}));

    renderProfilePage();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders the profile after loading successfully', async () => {
    vi.mocked(getProfile).mockResolvedValue(profile);

    renderProfilePage();

    expect(await screen.findByText('rahul.sharma@vonnue.com')).toBeInTheDocument();

    const main = screen.getByRole('main');

    expect(within(main).getByRole('heading', { name: 'Rahul Sharma' })).toBeInTheDocument();
    expect(within(main).getByText('RS')).toBeInTheDocument();
    expect(within(main).getByText('JavaScript')).toBeInTheDocument();
    expect(within(main).getByText('Day 6 of 12')).toBeInTheDocument();
    expect(within(main).getByRole('progressbar', { name: 'JavaScript progress' })).toHaveAttribute(
      'aria-valuenow',
      '6'
    );
  });

  it('renders the stats from the profile data', async () => {
    vi.mocked(getProfile).mockResolvedValue(profile);

    renderProfilePage();

    const stats = await screen.findByRole('region', {
      name: 'Training statistics',
    });

    expect(within(stats).getByText('TOTAL TIME')).toBeInTheDocument();
    expect(within(stats).getByText('ACTIVE CODING')).toBeInTheDocument();
    expect(within(stats).getByText('READING & LESSONS')).toBeInTheDocument();

    // Total time: activeSeconds = 42h 30m
    const totalCard = within(stats).getByText('TOTAL TIME').parentElement!;
    expect(within(totalCard).getByText('42h 30m')).toBeInTheDocument();

    // Active coding: codingSeconds = 14h 15m
    const codingCard = within(stats).getByText('ACTIVE CODING').parentElement!;
    expect(within(codingCard).getByText('14h 15m')).toBeInTheDocument();

    // Reading: activeSeconds - codingSeconds = 28h 15m
    const readingCard = within(stats).getByText('READING & LESSONS').parentElement!;
    expect(within(readingCard).getByText('28h 15m')).toBeInTheDocument();

    expect(within(stats).getByText('74 WPM')).toBeInTheDocument();
    expect(within(stats).getByText('98.4% accuracy')).toBeInTheDocument();
  });

  it('renders the daily activity from the profile data', async () => {
    vi.mocked(getProfile).mockResolvedValue(profile);

    renderProfilePage();

    expect(await screen.findByText('Oct 14 (Today)')).toBeInTheDocument();
    expect(screen.getByText('Oct 13')).toBeInTheDocument();
    expect(screen.getByText('4h 10m')).toBeInTheDocument();
    expect(screen.getByText('3h 45m')).toBeInTheDocument();

    expect(screen.getAllByText('74 WPM')).toHaveLength(2);
    expect(screen.getByText('72 WPM')).toBeInTheDocument();
  });

  // new
  it('lists the earned certificates, each linking to its page', async () => {
    vi.mocked(getProfile).mockResolvedValue(profile);
    vi.mocked(useEarnedCertificates).mockReturnValue(certificates);

    renderProfilePage();

    const section = await screen.findByRole('region', { name: 'Certificates' });
    const html = within(section).getByRole('link', { name: /HTML/ });
    const css = within(section).getByRole('link', { name: /CSS/ });

    expect(html).toHaveAttribute('href', '/certificates/html');
    expect(html).toHaveTextContent('5 October 2026');
    expect(css).toHaveAttribute('href', '/certificates/css');
    expect(css).toHaveTextContent('6 October 2026');
  });

  // new
  it('hides the Certificates row when there are none', async () => {
    vi.mocked(getProfile).mockResolvedValue(profile);

    renderProfilePage();

    await screen.findByText('rahul.sharma@vonnue.com');
    expect(screen.queryByRole('region', { name: 'Certificates' })).not.toBeInTheDocument();
  });

  it('renders an error state when loading the profile fails', async () => {
    vi.mocked(getProfile).mockRejectedValue(new Error('Failed to load profile'));

    renderProfilePage();

    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('calls getProfile once when the page loads', async () => {
    vi.mocked(getProfile).mockResolvedValue(profile);

    renderProfilePage();

    await waitFor(() => {
      expect(getProfile).toHaveBeenCalledTimes(1);
    });
  });
});
