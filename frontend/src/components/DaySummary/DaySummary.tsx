import styles from './DaySummary.module.css';
import { HiOutlineBookOpen } from 'react-icons/hi2';
interface DaySummaryProps {
  dayNumber: number;
  totalDays: number;
  title: string;
  description: string;
  completedTasks: number;
  totalTasks: number;
  onReferences: () => void;
  onTasks: () => void;
}

export default function DaySummary({
  dayNumber,
  totalDays,
  title,
  description,
  completedTasks,
  totalTasks,
  onReferences,
  onTasks,
}: DaySummaryProps) {
  return (
    <section className={styles.daySummary}>
      {/* 1. Left container for all titles and text */}
      <div className={styles.daySummaryContent}>
        <span className={styles.daySummaryLabel}>
          CSS - DAY {String(dayNumber).padStart(2, '0')} OF {totalDays}
        </span>

        <h1 className={styles.daySummaryTitle}>{title}</h1>

        <p className={styles.daySummaryDescription}>{description}</p>
      </div>

      {/* 2. Right container for actions (placed parallel to text) */}
      <div className={styles.daySummaryActions}>
        <button
          type="button"
          className={`${styles.daySummaryButton} ${styles.daySummaryButtonSecondary}`}
          onClick={onReferences}
        >
          <HiOutlineBookOpen />
          <div>References</div>
        </button>

        <button
          type="button"
          className={`${styles.daySummaryButton} ${styles.daySummaryButtonPrimary}`}
          onClick={onTasks}
        >
          Tasks ({completedTasks}/{totalTasks + 1}) →
        </button>
      </div>
    </section>
  );
}
