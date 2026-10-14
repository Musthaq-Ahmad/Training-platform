import type { ActivityTimeDay } from '@itp/types';
import { todayKey } from '../../lib/platformDate';

const DAY_MS = 86_400_000;
/** The mock trainee joined this many days ago; the months before that stay empty. */
const MOCK_TRAINEE_DAYS = 210;

/** Repeatable "random" number from 0 to 99, so the mock data looks the same on every reload. */
function noise(n: number, salt = 0): number {
  let x = Math.imul(n + 1, 374761393) ^ Math.imul(salt + 1, 668265263);
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  return ((x ^ (x >>> 16)) >>> 0) % 100;
}

function toMs(key: string): number {
  const [year, month, day] = key.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}

/** The date `daysAgo` days before `today`, as 'YYYY-MM-DD'. */
export function mockDateKey(daysAgo: number, today: string = todayKey()): string {
  return new Date(toMs(today) - daysAgo * DAY_MS).toISOString().slice(0, 10);
}

/**
 * GET /activity/time in mock mode: up to `days` days of generated activity, newest first, only
 * days with activity (like the real API). The mock trainee is expected on the platform 8 hours a day:
 * most weekdays are 8 h or more, some fall short, a few are missed, and weekends are mostly off.
 * The mock profile (total and the last 7 days) is built from this, so the pages agree.
 */
export function buildMockActivityTime(days: number, today: string = todayKey()): ActivityTimeDay[] {
  const result: ActivityTimeDay[] = [];

  for (let i = 0; i < Math.min(days, MOCK_TRAINEE_DAYS); i += 1) {
    const date = mockDateKey(i, today);
    const weekday = new Date(toMs(date)).getUTCDay();
    const isWeekend = weekday === 0 || weekday === 6;
    const kind = noise(i);
    const detail = noise(i, 1);

    let activeSeconds: number;
    if (isWeekend) {
      if (kind < 82) continue; // weekend off
      activeSeconds = 3600 + detail * 72; // 1 to 4 h
    } else if (kind < 8) {
      continue; // missed day
    } else if (kind < 28) {
      activeSeconds = 7200 + detail * 108; // 2 to 5 h: well short
    } else if (kind < 52) {
      activeSeconds = 18000 + detail * 106; // 5 to 7.9 h: a bit short
    } else {
      activeSeconds = 28800 + detail * 110; // 8 to 11 h: minimum met
    }

    result.push({
      date,
      activeSeconds,
      codingSeconds: Math.round(activeSeconds * (0.45 + noise(i, 2) / 400)),
    });
  }

  return result;
}
