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
