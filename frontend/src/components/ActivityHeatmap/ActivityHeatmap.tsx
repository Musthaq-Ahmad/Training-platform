import { useMemo, useState } from 'react';
import type { ActivityTimeDay } from '@itp/types';
import {
  HEATMAP_WEEKDAY_LABELS,
  HEATMAP_WEEKS,
  buildHeatmapWeeks,
  describeCell,
  monthLabels,
  type HeatmapLevel,
} from '../../lib/activityHeatmap';
import { todayKey } from '../../lib/platformDate';
import styles from './ActivityHeatmap.module.css';

type ActivityHeatmapProps = {
  /** The days GET /activity/time returned. Days that are missing count as 0. */
  days: ActivityTimeDay[];
  /** 'YYYY-MM-DD' in IST. Only for tests; defaults to today. */
  today?: string;
};

// Drawing units (px at normal size).
const CELL = 12;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 30; // room for the Mon / Wed / Fri labels
const TOP = 20; // room for the month labels
const RIGHT = 24; // room for a month label above the last column
const WIDTH = LEFT + HEATMAP_WEEKS * STEP - GAP + RIGHT;
const HEIGHT = TOP + 7 * STEP - GAP;
/** The grid grows a little to fill a wide card, but never more than this. */
const MAX_SCALE = 1.2;

const LEVELS: HeatmapLevel[] = [0, 1, 2, 3, 4];
const LEVEL_CLASS: Record<HeatmapLevel, string> = {
  0: styles.level0,
  1: styles.level1,
  2: styles.level2,
  3: styles.level3,
  4: styles.level4,
};

export default function ActivityHeatmap({ days, today }: ActivityHeatmapProps) {
  const [focused, setFocused] = useState<{ week: number; day: number } | null>(null);

  const weeks = useMemo(() => buildHeatmapWeeks(days, today ?? todayKey()), [days, today]);
  const months = useMemo(() => monthLabels(weeks), [weeks]);

  const tooltipCell = focused ? weeks[focused.week][focused.day] : null;
  // Near the edges the tooltip grows inward, so it never runs past the card.
  const tooltipShift = focused
    ? focused.week < 4
      ? '0%'
      : focused.week > HEATMAP_WEEKS - 5
        ? '-100%'
        : '-50%'
    : '-50%';

  return (
    <div className={styles.heatmap}>
      <div className={styles.scroll}>
        <div className={styles.canvas} style={{ maxWidth: WIDTH * MAX_SCALE }}>
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="group"
            aria-label="Daily active time over the last year"
          >
            {months.map(({ weekIndex, label }) => (
              <text
                key={`${label}-${weekIndex}`}
                className={styles.axisLabel}
                x={LEFT + weekIndex * STEP}
                y={TOP - 8}
                aria-hidden="true"
              >
                {label}
              </text>
            ))}

            {HEATMAP_WEEKDAY_LABELS.map(({ row, label }) => (
              <text
                key={label}
                className={styles.axisLabel}
                x={0}
                y={TOP + row * STEP + CELL - 2}
                aria-hidden="true"
              >
                {label}
              </text>
            ))}

            {weeks.map((week, weekIndex) =>
              week.map((cell, dayIndex) => {
                if (cell.isFuture) return null;

                return (
                  <rect
                    key={cell.date}
                    className={`${styles.cell} ${LEVEL_CLASS[cell.level]}`}
                    x={LEFT + weekIndex * STEP}
                    y={TOP + dayIndex * STEP}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    role="img"
                    aria-label={describeCell(cell)}
                    tabIndex={0}
                    onMouseEnter={() => setFocused({ week: weekIndex, day: dayIndex })}
                    onMouseLeave={() => setFocused(null)}
                    onFocus={() => setFocused({ week: weekIndex, day: dayIndex })}
                    onBlur={() => setFocused(null)}
                  />
                );
              })
            )}
          </svg>

          {focused && tooltipCell && (
            <div
              className={styles.tooltip}
              role="tooltip"
              style={{
                // Percentages, because the SVG (and so the canvas) scales with the card.
                left: `${((LEFT + focused.week * STEP + CELL / 2) / WIDTH) * 100}%`,
                top: `${((TOP + focused.day * STEP - 6) / HEIGHT) * 100}%`,
                transform: `translate(${tooltipShift}, -100%)`,
              }}
            >
              {describeCell(tooltipCell)}
            </div>
          )}
        </div>
      </div>

      <div className={styles.legend} style={{ maxWidth: WIDTH * MAX_SCALE }} aria-hidden="true">
        <span>Less</span>
        <svg width={LEVELS.length * STEP - GAP} height={CELL}>
          {LEVELS.map((level, index) => (
            <rect
              key={level}
              className={LEVEL_CLASS[level]}
              x={index * STEP}
              y={0}
              width={CELL}
              height={CELL}
              rx={2}
            />
          ))}
        </svg>
        <span>More</span>
      </div>
    </div>
  );
}
