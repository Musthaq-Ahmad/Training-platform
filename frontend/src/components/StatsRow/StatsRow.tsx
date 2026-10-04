import { formatDurationHM } from '../../lib/formatTime.ts';
import styles from './StatsRow.module.css';

type StatsRowProps = {
  totalActiveSeconds: number;
  totalCodingSeconds: number;
  latestWpm: number | null;
};

export default function StatsRow({
  totalActiveSeconds,
  totalCodingSeconds,
  latestWpm,
}: StatsRowProps) {
  return (
    <div>
      <div className={styles.row}>
        <div className={styles.stat}>
          <p className={styles.label}>Total Time in Platform</p>
          <p className={styles.value}>{formatDurationHM(totalActiveSeconds)}</p>
        </div>

        <div className={styles.stat}>
          <p className={styles.label}>Active Coding Time</p>
          <p className={styles.value}>{formatDurationHM(totalCodingSeconds)}</p>
        </div>

        <div className={styles.stat}>
          <p className={styles.label}>Typing Speed (Most Recent)</p>
          <p className={styles.value}>{latestWpm !== null ? `${latestWpm} WPM` : '—'}</p>
        </div>
      </div>
    </div>
  );
}
