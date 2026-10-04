import styles from './DaySummary.module.css';
import { HiOutlineBookOpen } from 'react-icons/hi2';

interface DaySummaryProps {
  courseTitle: string;
  dayNumber: number;
  totalDays: number;
  title: string;
  description: string;
  summary?: string;
  onReferences: () => void;
}

export default function DaySummary({
  courseTitle,
  dayNumber,
  totalDays,
  title,
  description,
  summary = '',
  onReferences,
}: DaySummaryProps) {
  return (
    <section className={styles.daySummary}>
      {/* 1. Left container for all titles and text */}
      <div className={styles.daySummaryContent}>
        <span className={styles.daySummaryLabel}>
          {courseTitle.toUpperCase()} - DAY {String(dayNumber).padStart(2, '0')} OF{' '}
          {String(totalDays).padStart(2, '0')}
        </span>

        <h1 className={styles.daySummaryTitle}>{title}</h1>

        <p className={styles.daySummaryDescription}>{description}</p>

        <div className={styles.daySummaryActions}>
          <button
            type="button"
            className={`${styles.daySummaryButton} ${styles.daySummaryButtonSecondary}`}
            onClick={onReferences}
          >
            <HiOutlineBookOpen />
            <div>References</div>
          </button>
        </div>
      </div>

      <aside className={styles.dayGoal}>
        <span className={styles.dayGoalLabel}>BY THE END OF THE DAY</span>
        <p className={styles.dayGoalText}>{summary}</p>
      </aside>
    </section>
  );
}
