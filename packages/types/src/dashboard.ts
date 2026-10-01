export type DayStatus = 'LOCKED' | 'UNLOCKED' | 'COMPLETED';

export type DaySummary = {
  id: string;
  courseId: string;
  dayNumber: number;
  title: string;
  description: string; // curriculum_day.description, shown on the current-lesson card
  status: DayStatus;
};

/** GET /api/courses/:courseId/days */
export type CourseDaysResponse = DaySummary[];

export type NextDay = DaySummary & {
  courseTotalDays: number; // number of curriculum_day rows in this day's course
};

export type TimeTotals = {
  activeSeconds: number;
  codingSeconds: number;
  readingSeconds: number;
};

export type TypingSummaryResponse = {
  latest: { wpm: number; accuracy: number; takenAt: string } | null;
  todayAverageWpm: number | null;
  trend: { date: string; averageWpm: number }[];
};

/** GET /api/dashboard */
export type DashboardResponse = {
  nextDay: NextDay | null; // computed by the backend; null = everything completed
  totalDaysCompleteOverall: number;
  totalDaysOverall: number;
  today: TimeTotals; // activity_log rows where date = today
  total: TimeTotals; // sum of all activity_log rows
  typing: TypingSummaryResponse; // from typing_test_result
};
