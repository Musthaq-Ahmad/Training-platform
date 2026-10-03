import type { TypingSummaryResponse } from './typingTest';

export type NextDay = DaySummary & {
  courseTotalDays: number; // number of curriculum_day rows in this day's course
};

/** Seconds from activity_log. activeSeconds is all platform time and includes codingSeconds. */
export type TimeTotals = {
  activeSeconds: number;
  codingSeconds: number;
};

/** GET /api/dashboard */
export type DashboardResponse = {
  nextDay: NextDay | null; // computed by the backend; null = everything completed
  totalDaysCompleteOverall: number;
  totalDaysOverall: number;
  today: TimeTotals; // the activity_log row for today (Asia/Kolkata)
  total: TimeTotals; // sum of all activity_log rows
  typing: TypingSummaryResponse; // from typing_test_result; the trend covers the last 30 days
};
export type DayStatus = 'LOCKED' | 'UNLOCKED' | 'COMPLETED';

export type DaySummary = {
  id: string;
  courseId: string;
  dayNumber: number;
  title: string;
  description: string; // curriculum_day.subtitle, shown on the current-lesson card
  status: DayStatus;
};

/** GET /api/courses/:courseId/days */
export type CourseDaysResponse = DaySummary[];
