import type { AdminTraineeSummary } from '@itp/types';
import { progressPercent } from './adminTrainees';

/** The ways a mentor can order the trainee list. Add a new option here and in `COMPARATORS`. */
export const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'progress', label: 'Progress' },
  { value: 'lastActive', label: 'Last active' },
  { value: 'integrity', label: 'Integrity score' },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]['value'];

export const DEFAULT_SORT: SortKey = 'name';

/** Reads `?sort=` from the URL; anything unknown (or missing) falls back to the default. */
export function parseSortKey(value: string | null): SortKey {
  return SORT_OPTIONS.find((option) => option.value === value)?.value ?? DEFAULT_SORT;
}

type Comparator = (a: AdminTraineeSummary, b: AdminTraineeSummary) => number;

const byName: Comparator = (a, b) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }) ||
  a.email.localeCompare(b.email);

/**
 * Each option answers "who should a mentor look at first?":
 * - progress: least progress first
 * - lastActive: longest ago first ("never" counts as the longest)
 * Ties always fall back to name, so the order is stable.
 */
const COMPARATORS: Record<SortKey, Comparator> = {
  name: byName,
  progress: (a, b) =>
    progressPercent(a.daysCompleted, a.totalDays) - progressPercent(b.daysCompleted, b.totalDays) ||
    byName(a, b),
  lastActive: (a, b) => {
    // "YYYY-MM-DD" strings sort in date order, so no Date parsing is needed.
    if (a.lastActiveDate === b.lastActiveDate) return byName(a, b);
    if (a.lastActiveDate === null) return -1;
    if (b.lastActiveDate === null) return 1;
    return a.lastActiveDate.localeCompare(b.lastActiveDate) || byName(a, b);
  },
  integrity: (a, b) => {
    if (a.averageScore === b.averageScore) return byName(a, b);
    if (a.averageScore === null) return 1;
    if (b.averageScore === null) return -1;
    return a.averageScore - b.averageScore || byName(a, b);
  },
};

/** Trainees whose name or email contains the text, ignoring case. Empty text keeps everyone. */
export function filterTrainees(
  trainees: AdminTraineeSummary[],
  query: string
): AdminTraineeSummary[] {
  const text = query.trim().toLowerCase();
  if (!text) return trainees;
  return trainees.filter(
    (t) => t.name.toLowerCase().includes(text) || t.email.toLowerCase().includes(text)
  );
}

/** A sorted copy; the list it is given is not changed. */
export function sortTrainees(
  trainees: AdminTraineeSummary[],
  sort: SortKey
): AdminTraineeSummary[] {
  return [...trainees].sort(COMPARATORS[sort]);
}
