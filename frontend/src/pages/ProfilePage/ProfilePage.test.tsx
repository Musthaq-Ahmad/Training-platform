import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ProfileData } from '@itp/types';

import ProfilePage from './ProfilePage';
import { getProfile } from '../../api/profile';

vi.mock('../../api/profile', () => ({
  getProfile: vi.fn(),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('ProfilePage', () => {
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
      readingSeconds: 51300,
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

  it('renders the loading state while the profile is loading', () => {
    vi.mocked(getProfile).mockImplementation(() => new Promise<ProfileData>(() => {}));

    render(<ProfilePage />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders the profile after loading successfully', async () => {
    vi.mocked(getProfile).mockResolvedValue(profile);

    render(<ProfilePage />);

    expect(await screen.findByText('rahul.sharma@vonnue.com')).toBeInTheDocument();

    const main = screen.getByRole('main');

    expect(within(main).getByText('Rahul Sharma')).toBeInTheDocument();

    expect(within(main).getByText('JavaScript, Day 6 of 12')).toBeInTheDocument();
  });

  it('renders the stats from the profile data', async () => {
    vi.mocked(getProfile).mockResolvedValue(profile);

    render(<ProfilePage />);

    const stats = await screen.findByRole('region', {
      name: 'Training statistics',
    });

    expect(stats).toHaveTextContent('42h 30m');
    expect(stats).toHaveTextContent('14h 15m');
    expect(stats).toHaveTextContent('74 WPM');
    expect(stats).toHaveTextContent('98.4% accuracy');
  });

  it('renders the daily activity from the profile data', async () => {
    vi.mocked(getProfile).mockResolvedValue(profile);

    render(<ProfilePage />);

    expect(await screen.findByText('Oct 14 (Today)')).toBeInTheDocument();

    expect(screen.getByText('Oct 13')).toBeInTheDocument();

    expect(screen.getByText('4h 10m')).toBeInTheDocument();
    expect(screen.getByText('3h 45m')).toBeInTheDocument();

    expect(screen.getAllByText('74 WPM')).toHaveLength(2);
    expect(screen.getByText('72 WPM')).toBeInTheDocument();
  });

  it('renders an error/empty state when loading the profile fails', async () => {
    vi.mocked(getProfile).mockRejectedValue(new Error('Failed to load profile'));

    render(<ProfilePage />);

    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('calls getProfile once when the page loads', async () => {
    vi.mocked(getProfile).mockResolvedValue(profile);

    render(<ProfilePage />);

    await waitFor(() => {
      expect(getProfile).toHaveBeenCalledTimes(1);
    });
  });
});
