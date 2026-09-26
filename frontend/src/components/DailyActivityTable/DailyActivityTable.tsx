import { type ProfileDay } from '@itp/types';
import styles from './DailyActivityTable.module.css';

type DailyActivityTableProps = {
  days: ProfileDay[];
};

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}h ${String(minutes).padStart(2, '0')}m`;
}

export default function DailyActivityTable({ days }: DailyActivityTableProps) {
  const maximumTime = Math.max(...days.map((day) => day.timeSpentSeconds));

  return (
    <section className={styles.activity} aria-label="Daily training activity">
      <div className={styles.header}>
        <span>DATE</span>
        <span>TIME SPENT</span>
        <span>TYPING SPEED</span>
      </div>

      <div>
        {days.map((day) => {
          const width = maximumTime > 0 ? (day.timeSpentSeconds / maximumTime) * 100 : 0;

          return (
            <div key={day.date} className={`${styles.row} ${day.isToday ? styles.rowToday : ''}`}>
              <div className={styles.date}>
                {day.date}
                {day.isToday ? ' (Today)' : ''}
              </div>

              <div className={styles.time}>
                <div className={styles.bar}>
                  <div className={styles.barFill} style={{ width: `${width}%` }} />
                </div>

                <span>{formatDuration(day.timeSpentSeconds)}</span>
              </div>

              <div className={styles.wpm}>
                {day.typingWpm !== null ? `${day.typingWpm} WPM` : '—'}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
