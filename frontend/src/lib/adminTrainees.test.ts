import { describe, expect, it } from 'vitest';
import type { AdminTraineeSummary } from '@itp/types';
import { summarizeCohort } from './adminTrainees';

function trainee(overrides: Partial<AdminTraineeSummary> = {}): AdminTraineeSummary {
  return {
    id: 't-1',
    name: 'Trainee',
    email: 'trainee@vonnue.com',
    daysCompleted: 0,
    totalDays: 54,
    currentDay: { id: 'html-day-01', courseTitle: 'HTML', dayNumber: 1, title: 'Structure' },
    todayActiveSeconds: 0,
    totalActiveSeconds: 0,
    totalCodingSeconds: 0,
    lastActiveDate: null,
    latestWpm: null,
    flagsLast7Days: 0,
    averageScore: 85,
    daysScored: 23,
    ...overrides,
  };
}

describe('summarizeCohort', () => {
  it('returns zeros for an empty list (no division by zero)', () => {
    expect(summarizeCohort([])).toEqual({
      traineeCount: 0,
      finishedCount: 0,
      averageProgressPercent: 0,
      averageDaysCompleted: 0,
      totalDays: 0,
      activeTodayCount: 0,
      flagsThisWeek: 0,
      flaggedTraineeCount: 0,
    });
  });

  it('summarises a mixed cohort', () => {
    const summary = summarizeCohort([
      trainee({ id: 'a', daysCompleted: 27, todayActiveSeconds: 900, flagsLast7Days: 0 }),
      trainee({ id: 'b', daysCompleted: 0, todayActiveSeconds: 0, flagsLast7Days: 3 }),
      trainee({
        id: 'c',
        daysCompleted: 54,
        currentDay: null,
        todayActiveSeconds: 60,
        flagsLast7Days: 2,
      }),
    ]);

    expect(summary).toEqual({
      traineeCount: 3,
      finishedCount: 1,
      averageProgressPercent: 50, // (50 + 0 + 100) / 3
      averageDaysCompleted: 27, // (27 + 0 + 54) / 3
      totalDays: 54,
      activeTodayCount: 2,
      flagsThisWeek: 5,
      flaggedTraineeCount: 2,
    });
  });

  it('rounds average progress to a whole number and average days to one decimal', () => {
    const summary = summarizeCohort([
      trainee({ daysCompleted: 7 }),
      trainee({ daysCompleted: 8 }),
      trainee({ daysCompleted: 7 }),
    ]);

    expect(summary.averageDaysCompleted).toBe(7.3); // 22 / 3 = 7.333
    expect(summary.averageProgressPercent).toBe(14); // 7.333 / 54 = 13.58%
  });

  it('does not count a trainee with zero seconds today as active', () => {
    const summary = summarizeCohort([
      trainee({ todayActiveSeconds: 0 }),
      trainee({ todayActiveSeconds: 1 }),
    ]);

    expect(summary.activeTodayCount).toBe(1);
  });

  it('uses each trainee’s own curriculum length and never exceeds 100%', () => {
    const summary = summarizeCohort([
      trainee({ daysCompleted: 10, totalDays: 10 }),
      trainee({ daysCompleted: 12, totalDays: 10 }), // bad data: more days than the curriculum
    ]);

    expect(summary.averageProgressPercent).toBe(100);
  });

  it('treats a curriculum of 0 days as 0% instead of failing', () => {
    expect(summarizeCohort([trainee({ totalDays: 0 })]).averageProgressPercent).toBe(0);
  });

  it('does not change the list it is given', () => {
    const list = [trainee({ id: 'b' }), trainee({ id: 'a' })];
    const copy = structuredClone(list);

    summarizeCohort(list);

    expect(list).toEqual(copy);
  });
});
