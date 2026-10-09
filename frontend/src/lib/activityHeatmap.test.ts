import { describe, expect, it } from 'vitest';
import {
  HEATMAP_WEEKS,
  buildHeatmapWeeks,
  describeCell,
  formatActivityDuration,
  levelFor,
  monthLabels,
} from './activityHeatmap';
import { todayKey } from './platformDate';

// Thursday 8 Oct 2026. The grid starts on Monday 13 Oct 2025 (52 weeks).
const TODAY = '2026-10-08';

describe('levelFor', () => {
  it.each([
    [0, 0],
    [1, 0], // under 1 minute is 0
    [7199, 1], // just under 2 h
    [7200, 2], // 2 h
    [14399, 2],
    [14400, 3], // 4 h
    [28799, 3], // just under the 8 h daily minimum
    [28800, 4], // 8 h: minimum met
    [40000, 4],
  ])('%i seconds is level %i', (seconds, level) => {
    expect(levelFor(seconds)).toBe(level);
  });
});

describe('buildHeatmapWeeks', () => {
  it('returns 52 weeks of 7 days, Monday first, ending with the week of today', () => {
    const weeks = buildHeatmapWeeks([], TODAY);

    expect(weeks).toHaveLength(HEATMAP_WEEKS);
    expect(weeks.every((week) => week.length === 7)).toBe(true);
    expect(weeks[0][0].date).toBe('2025-10-13');
    expect(weeks[HEATMAP_WEEKS - 1][0].date).toBe('2026-10-05');
  });

  it('puts today in the last column and marks the days after it as future', () => {
    const lastWeek = buildHeatmapWeeks([], TODAY)[HEATMAP_WEEKS - 1];

    expect(lastWeek[3].date).toBe(TODAY);
    expect(lastWeek[3].isFuture).toBe(false);
    expect(lastWeek.slice(4).every((cell) => cell.isFuture)).toBe(true);
    expect(lastWeek.slice(0, 4).every((cell) => !cell.isFuture)).toBe(true);
  });

  it('fills days without a row with 0', () => {
    const cells = buildHeatmapWeeks(
      [{ date: '2026-10-06', activeSeconds: 6300, codingSeconds: 4200 }],
      TODAY
    ).flat();

    const tuesday = cells.find((cell) => cell.date === '2026-10-06');
    const monday = cells.find((cell) => cell.date === '2026-10-05');
    expect(tuesday).toMatchObject({ activeSeconds: 6300, codingSeconds: 4200, level: 1 });
    expect(monday).toMatchObject({ activeSeconds: 0, codingSeconds: 0, level: 0 });
  });

  it('ignores days outside the grid', () => {
    const cells = buildHeatmapWeeks(
      [{ date: '2025-01-01', activeSeconds: 5000, codingSeconds: 0 }],
      TODAY
    ).flat();
    expect(cells.some((cell) => cell.activeSeconds > 0)).toBe(false);
  });

  it('follows IST: 00:30 IST on 8 Oct is 8 Oct, not the day before', () => {
    // 2026-10-07T19:00Z is 00:30 on 8 Oct in India.
    const today = todayKey(new Date('2026-10-07T19:00:00Z'));
    const lastWeek = buildHeatmapWeeks([], today)[HEATMAP_WEEKS - 1];

    expect(today).toBe('2026-10-08');
    expect(lastWeek.filter((cell) => !cell.isFuture).at(-1)?.date).toBe('2026-10-08');
  });

  it('puts a Sunday as today at the bottom of the last column', () => {
    const lastWeek = buildHeatmapWeeks([], '2026-10-11')[HEATMAP_WEEKS - 1];
    expect(lastWeek[6].date).toBe('2026-10-11');
    expect(lastWeek.some((cell) => cell.isFuture)).toBe(false);
  });
});

describe('monthLabels', () => {
  it('labels the first column of each month across the whole year', () => {
    const labels = monthLabels(buildHeatmapWeeks([], TODAY));
    expect(labels.map((l) => l.label)).toEqual([
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
    ]);
    expect(labels.at(-1)?.weekIndex).toBe(HEATMAP_WEEKS - 1);
  });

  it('drops a first label that would sit right on top of the second', () => {
    // Monday 20 Jul is in July but 3 Aug is only 2 columns later in a 12-week grid.
    const labels = monthLabels(buildHeatmapWeeks([], TODAY).slice(-12));
    expect(labels.map((l) => l.label)).toEqual(['Aug', 'Sep', 'Oct']);
  });
});

describe('describeCell', () => {
  it('writes the date, active time and coding time', () => {
    const cell = buildHeatmapWeeks(
      [{ date: '2026-10-06', activeSeconds: 6300, codingSeconds: 4200 }],
      TODAY
    )
      .flat()
      .find((c) => c.date === '2026-10-06')!;

    expect(describeCell(cell)).toBe('Tue 6 Oct · 1h 45m active · 1h 10m coding');
  });

  it('says there was no activity for an empty day', () => {
    const cell = buildHeatmapWeeks([], TODAY)[HEATMAP_WEEKS - 1][0];
    expect(describeCell(cell)).toBe('Mon 5 Oct · No activity');
  });
});

describe('formatActivityDuration', () => {
  it.each([
    [0, '0m'],
    [30, '<1m'],
    [1800, '30m'],
    [3600, '1h 0m'],
    [6300, '1h 45m'],
  ])('%i seconds is %s', (seconds, text) => {
    expect(formatActivityDuration(seconds)).toBe(text);
  });
});
