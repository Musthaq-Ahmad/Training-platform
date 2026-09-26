export type DayStatus = 'LOCKED' | 'UNLOCKED' | 'COMPLETED';

export type DaySummary = {
  id: string;
  courseId: string;
  dayNumber: number;
  title: string;
  description?: string; // short blurb shown on the dashboard's current-lesson card
  status: DayStatus;
};

export type CourseSummary = {
  id: string;
  title: string;
  days: DaySummary[];
};

export type TypingSummaryResponse = {
  latest: { wpm: number; accuracy: number; takenAt: string } | null;
  todayAverageWpm: number | null;
  trend: { date: string; averageWpm: number }[];
};

/** GET /api/dashboard */
export type DashboardResponse = {
  currentDay: DaySummary | null;
  currentCourseId: string;
  courses: CourseSummary[];
  totalDaysCompleteOverall: number;
  totalDaysOverall: number;
  today: { activeSeconds: number; codingSeconds: number; readingSeconds: number };
  total: { activeSeconds: number; codingSeconds: number; readingSeconds: number };
  typing: TypingSummaryResponse;
};
