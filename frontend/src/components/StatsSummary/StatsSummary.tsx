import { type ProfileData } from '@itp/types';
import styles from './StatsSummary.module.css';
import { formatDurationHM } from '../../lib/formatTime';

type StatsSummaryProps = {
  total: ProfileData['total'];
  typing: ProfileData['typing'];
};

// function formatDuration(seconds: number): string {
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);

//   return `${hours}h ${String(minutes).padStart(2, '0')}m`;
// }

export default function StatsSummary({ total, typing }: StatsSummaryProps) {
  const totalSeconds = total.activeSeconds + total.readingSeconds;

  return (
    <section className={styles.summary} aria-label="Training statistics">
      <div className={styles.item}>
        <span className={styles.label}>TOTAL TIME</span>

        <strong className={styles.value}>{formatDurationHM(totalSeconds)}</strong>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>ACTIVE CODING</span>

        <strong className={styles.value}>{formatDurationHM(total.activeSeconds)}</strong>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>READING &amp; LESSONS</span>

        <strong className={styles.value}>{formatDurationHM(total.readingSeconds)}</strong>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>TYPING SPEED (MOST RECENT)</span>

        <strong className={styles.value}>
          {typing.latestWpm !== null ? `${typing.latestWpm} WPM` : '—'}
        </strong>

        {typing.latestAccuracy !== null && (
          <span className={styles.accuracy}>{typing.latestAccuracy.toFixed(1)}% accuracy</span>
        )}
      </div>
    </section>
  );
}
