import type { ActivityTimeDay } from '@itp/types';
import { todayKey } from './platformDate';

/** A year of weeks, like GitHub's contribution graph. */
export const HEATMAP_WEEKS = 52;
/**
 * Days to request from GET /activity/time: enough to fill every cell (at most 51 * 7 + 6 days
 * back). The API allows 365.
 */
export const HEATMAP_DAYS = HEATMAP_WEEKS * 7;

export type HeatmapLevel = 0 | 1 | 2 | 3 | 4;

/** Trainees are expected on the platform for at least 8 hours a day. */
export const DAILY_MINIMUM_SECONDS = 8 * 60 * 60;

/**
 * Where each colour level starts, in seconds of active time (2 h, 4 h, 8 h).
 * Level 0 is no activity, level 1 is anything up to the first floor, and level 4 means the
 * daily minimum was met. Change the levels here only; the CSS has one class per level
 * (.level0 to .level4).
 */
export const HEATMAP_LEVEL_FLOORS_SECONDS = [
  DAILY_MINIMUM_SECONDS / 4,
  DAILY_MINIMUM_SECONDS / 2,
  DAILY_MINIMUM_SECONDS,
] as const;

export type HeatmapCell = {
  date: string; // 'YYYY-MM-DD' (Asia/Kolkata)
  activeSeconds: number;
  codingSeconds: number;
  level: HeatmapLevel;
  isFuture: boolean;
};

export type HeatmapSummary = {
  activeDays: number;
  totalSeconds: number;
  longestStreak: number;
};

const DAY_MS = 86_400_000;
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Calendar days are handled as UTC midnights of their 'YYYY-MM-DD' key, so the browser's own
// timezone never moves a day. The keys themselves already are IST days.
function keyToMs(key: string): number {
  const [year, month, day] = key.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}

function msToKey(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/** Monday = 0 ... Sunday = 6 */
function weekdayIndex(ms: number): number {
  return (new Date(ms).getUTCDay() + 6) % 7;
}

export const MIN_ACTIVE_SECONDS = 60;

/** 0 = no activity, 1 to 4 = increasing active time (see HEATMAP_LEVEL_FLOORS_SECONDS). */
export function levelFor(seconds: number): HeatmapLevel {
  if (seconds <= MIN_ACTIVE_SECONDS) return 0;
  let level = 1;
  for (const floor of HEATMAP_LEVEL_FLOORS_SECONDS) {
    if (seconds >= floor) level += 1;
  }
  return level as HeatmapLevel;
}

/**
 * HEATMAP_WEEKS columns of 7 days (Monday to Sunday), oldest week first. The last column is the
 * week of `today`; its days after today are returned with isFuture = true (the grid skips them).
 * Days missing from `days` count as 0.
 */
export function buildHeatmapWeeks(
  days: ActivityTimeDay[],
  today: string = todayKey()
): HeatmapCell[][] {
  const byDate = new Map<string, { active: number; coding: number }>();
  for (const day of days) {
    const known = byDate.get(day.date);
    byDate.set(day.date, {
      active: (known?.active ?? 0) + day.activeSeconds,
      coding: (known?.coding ?? 0) + day.codingSeconds,
    });
  }

  const todayMs = keyToMs(today);
  const thisMonday = todayMs - weekdayIndex(todayMs) * DAY_MS;
  const firstMonday = thisMonday - (HEATMAP_WEEKS - 1) * 7 * DAY_MS;

  return Array.from({ length: HEATMAP_WEEKS }, (_, week) =>
    Array.from({ length: 7 }, (_, day): HeatmapCell => {
      const ms = firstMonday + (week * 7 + day) * DAY_MS;
      const date = msToKey(ms);
      const isFuture = ms > todayMs;
      const found = isFuture ? undefined : byDate.get(date);
      const activeSeconds = found?.active ?? 0;

      return {
        date,
        activeSeconds,
        codingSeconds: found?.coding ?? 0,
        level: levelFor(activeSeconds),
        isFuture,
      };
    })
  );
}

/**
 * Numbers for the line above the grid. They are taken from the cells that are drawn, so the line
 * always matches the grid (the API can return a few days that are older than the first column).
 */
export function heatmapSummary(cells: HeatmapCell[]): HeatmapSummary {
  let activeDays = 0;
  let totalSeconds = 0;
  let longestStreak = 0;
  let streak = 0;

  // Cells are in date order and have no gaps, so a streak is a run of active cells.
  for (const cell of cells) {
    if (cell.isFuture) continue;
    totalSeconds += cell.activeSeconds;
    if (cell.activeSeconds > 0) {
      activeDays += 1;
      streak += 1;
      longestStreak = Math.max(longestStreak, streak);
    } else {
      streak = 0;
    }
  }

  return { activeDays, totalSeconds, longestStreak };
}

/** Month names for the top of the grid, at the first column of each month. */
export function monthLabels(weeks: HeatmapCell[][]): { weekIndex: number; label: string }[] {
  const labels: { weekIndex: number; label: string }[] = [];
  let previousMonth = -1;

  weeks.forEach((week, weekIndex) => {
    const month = new Date(keyToMs(week[0].date)).getUTCMonth();
    if (month !== previousMonth) {
      labels.push({ weekIndex, label: MONTHS[month] });
      previousMonth = month;
    }
  });

  // A first label right next to the second would overlap it.
  if (labels.length > 1 && labels[1].weekIndex - labels[0].weekIndex < 3) labels.shift();
  return labels;
}

/** "1h 45m", "30m", "<1m" */
export function formatActivityDuration(seconds: number): string {
  if (seconds > 0 && seconds < 60) return '<1m';
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

/** "Tue 6 Oct · 1h 45m active · 1h 10m coding": the tooltip and the aria-label of a square. */
export function describeCell(cell: HeatmapCell): string {
  const ms = keyToMs(cell.date);
  const date = new Date(ms);
  const label = `${WEEKDAYS[weekdayIndex(ms)]} ${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`;

  if (cell.activeSeconds <= 0) return `${label} · No activity`;
  return `${label} · ${formatActivityDuration(cell.activeSeconds)} active · ${formatActivityDuration(cell.codingSeconds)} coding`;
}

export const HEATMAP_WEEKDAY_LABELS: { row: number; label: string }[] = [
  { row: 0, label: 'Mon' },
  { row: 2, label: 'Wed' },
  { row: 4, label: 'Fri' },
];
