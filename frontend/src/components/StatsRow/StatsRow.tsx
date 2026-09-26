import { formatDurationHM } from '../../lib/formatTime.ts';
import styles from './StatsRow.module.css';

type StatsRowProps = {
  totalActiveSeconds: number;
  totalCodingSeconds: number;
  latestWpm: number | null;
  onTakeTypingTest: () => void;
};

export default function StatsRow({
  totalActiveSeconds,
  totalCodingSeconds,
  latestWpm,
  onTakeTypingTest,
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

      <button className={styles.typingTestButton} onClick={onTakeTypingTest}>
        Take a typing test
      </button>
    </div>
  );
}
