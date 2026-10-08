import type { AdminTraineeSummary } from '@itp/types';

/** Default order of the mentor's trainee list: by name, A to Z, ignoring case. */
export function sortTraineesByName(trainees: AdminTraineeSummary[]): AdminTraineeSummary[] {
  return [...trainees].sort(
    (a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }) ||
      a.email.localeCompare(b.email)
  );
}

/** "CSS · Day 3 — Flexbox", or "Finished" when the trainee has no day left (currentDay is null). */
export function formatCurrentDay(day: AdminTraineeSummary['currentDay']): string {
  if (!day) return 'Finished';
  return `${day.courseTitle} · Day ${day.dayNumber} — ${day.title}`;
}

/** The backend sends an IST calendar day ("2026-10-06"), or null if the trainee never logged time. */
export function formatLastActive(date: string | null): string {
  return date ?? 'Never';
}

/** Share of the curriculum completed, 0 to 100. */
export function progressPercent(daysCompleted: number, totalDays: number): number {
  if (totalDays <= 0) return 0;
  return Math.min(100, Math.max(0, (daysCompleted / totalDays) * 100));
}

/** Numbers for the cohort summary cards on /admin. All counts, never negative. */
export type CohortSummary = {
  traineeCount: number;
  finishedCount: number; // currentDay === null
  averageProgressPercent: number; // 0–100, whole number
  averageDaysCompleted: number; // one decimal place
  totalDays: number; // curriculum length, from the first row
  activeTodayCount: number; // todayActiveSeconds > 0
  flagsThisWeek: number; // sum of flagsLast7Days
  flaggedTraineeCount: number; // rows with flagsLast7Days > 0
};

const EMPTY_SUMMARY: CohortSummary = {
  traineeCount: 0,
  finishedCount: 0,
  averageProgressPercent: 0,
  averageDaysCompleted: 0,
  totalDays: 0,
  activeTodayCount: 0,
  flagsThisWeek: 0,
  flaggedTraineeCount: 0,
};

/** Cohort totals and averages, computed from the trainee list the page already loaded. */
export function summarizeCohort(trainees: AdminTraineeSummary[]): CohortSummary {
  const count = trainees.length;
  if (count === 0) return EMPTY_SUMMARY;

  let progressSum = 0;
  let daysSum = 0;
  let finishedCount = 0;
  let activeTodayCount = 0;
  let flagsThisWeek = 0;
  let flaggedTraineeCount = 0;

  for (const trainee of trainees) {
    progressSum += progressPercent(trainee.daysCompleted, trainee.totalDays);
    daysSum += trainee.daysCompleted;
    if (trainee.currentDay === null) finishedCount += 1;
    if (trainee.todayActiveSeconds > 0) activeTodayCount += 1;
    flagsThisWeek += trainee.flagsLast7Days;
    if (trainee.flagsLast7Days > 0) flaggedTraineeCount += 1;
  }

  return {
    traineeCount: count,
    finishedCount,
    averageProgressPercent: Math.round(progressSum / count),
    averageDaysCompleted: Math.round((daysSum / count) * 10) / 10,
    totalDays: trainees[0].totalDays,
    activeTodayCount,
    flagsThisWeek,
    flaggedTraineeCount,
  };
}
