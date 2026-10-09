import { type ProfileData } from '@itp/types';
import { HEATMAP_DAYS } from '../../lib/activityHeatmap';
import { buildMockActivityTime, mockDateKey } from './activity';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-10-09" -> "Oct 09", the label the real profile API sends. */
function dayLabel(dateKey: string): string {
  const [, month, day] = dateKey.split('-');
  return `${MONTHS[Number(month) - 1]} ${day}`;
}

/**
 * The mock profile is built from the same generated activity as GET /activity/time, so the
 * total, the 7-day table and the heatmap on the profile page always agree.
 */
export function buildMockProfile(): ProfileData {
  const activity = buildMockActivityTime(HEATMAP_DAYS);
  const byDate = new Map(activity.map((day) => [day.date, day]));

  return {
    trainee: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@vonnue.com',
      track: 'JavaScript',
      currentDay: 6,
      totalDays: 12,
    },

    total: {
      activeSeconds: activity.reduce((sum, day) => sum + day.activeSeconds, 0),
      codingSeconds: activity.reduce((sum, day) => sum + day.codingSeconds, 0),
    },

    typing: {
      latestWpm: 74,
      latestAccuracy: 98.4,
    },

    // Newest first, today included (a day with no activity shows 0h 00m and no WPM).
    dailyActivity: Array.from({ length: 7 }, (_, daysAgo) => {
      const date = mockDateKey(daysAgo);
      const timeSpentSeconds = byDate.get(date)?.activeSeconds ?? 0;

      return {
        date: dayLabel(date),
        timeSpentSeconds,
        typingWpm: timeSpentSeconds > 0 ? 74 - daysAgo : null,
        isToday: daysAgo === 0,
      };
    }),
  };
}

export const mockProfile: ProfileData = buildMockProfile();
