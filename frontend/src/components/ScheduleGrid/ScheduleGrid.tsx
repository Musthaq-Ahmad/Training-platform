import type { DaySummary } from '@itp/types';
import styles from './ScheduleGrid.module.css';

type ScheduleGridProps = {
  title: string; // e.g. "JavaScript Module — Schedule"
  days: DaySummary[];
  currentDayId: string | null;
  onSelectDay: (dayId: string) => void;
};

export default function ScheduleGrid({
  title,
  days,
  currentDayId,
  onSelectDay,
}: ScheduleGridProps) {
  return (
    <div>
      <p className={styles.heading}>{title}</p>
      <div className={styles.grid}>
        {days.map((day) => {
          const isCurrent = day.id === currentDayId;
          const isLocked = day.status === 'LOCKED';

          const cellClassName = [
            styles.cell,
            isCurrent ? styles.cellCurrent : '',
            isLocked ? styles.cellLocked : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={day.id}
              className={cellClassName}
              disabled={isLocked}
              onClick={() => onSelectDay(day.id)}
            >
              {String(day.dayNumber).padStart(2, '0')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
