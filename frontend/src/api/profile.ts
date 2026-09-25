// api/dashboard.ts

import { type ProfileData } from '@itp/types';

//mock data for now should delete when integrated with backend
const profileData: ProfileData = {
  trainee: {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@vonnue.com',
    track: 'JavaScript',
    currentDay: 6,
    totalDays: 12,
  },

  total: {
    activeSeconds: 28 * 60 * 60 + 15 * 60,
    readingSeconds: 14 * 60 * 60 + 15 * 60,
  },

  typing: {
    latestWpm: 74,
    latestAccuracy: 98.4,
  },

  dailyActivity: [
    {
      date: 'Oct 14',
      timeSpentSeconds: 4 * 60 * 60 + 10 * 60,
      typingWpm: 74,
      isToday: true,
    },
    {
      date: 'Oct 13',
      timeSpentSeconds: 3 * 60 * 60 + 45 * 60,
      typingWpm: 72,
      isToday: false,
    },
    {
      date: 'Oct 12',
      timeSpentSeconds: 4 * 60 * 60 + 30 * 60,
      typingWpm: 70,
      isToday: false,
    },
    {
      date: 'Oct 11',
      timeSpentSeconds: 3 * 60 * 60 + 20 * 60,
      typingWpm: 71,
      isToday: false,
    },
    {
      date: 'Oct 10',
      timeSpentSeconds: 4 * 60 * 60 + 5 * 60,
      typingWpm: 68,
      isToday: false,
    },
    {
      date: 'Oct 09',
      timeSpentSeconds: 3 * 60 * 60 + 50 * 60,
      typingWpm: 67,
      isToday: false,
    },
    {
      date: 'Oct 08',
      timeSpentSeconds: 4 * 60 * 60 + 15 * 60,
      typingWpm: 66,
      isToday: false,
    },
  ],
};

export async function getProfile(): Promise<ProfileData> {
  return Promise.resolve(profileData);
}
