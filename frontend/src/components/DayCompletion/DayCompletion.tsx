import styles from './DayCompletion.module.css';

interface DayCompletionProps {
  completedTasks: number;
  totalTasks: number;
  isCompleted: boolean;
  onComplete: () => void;
}

export default function DayCompletion({
  completedTasks,
  totalTasks,
  isCompleted,
  onComplete,
}: DayCompletionProps) {
  const isChecklistIncomplete = completedTasks < totalTasks;

  return (
    <section className={styles.dayCompletion}>
      <div className={styles.dayCompletionContent}>
        <div className={styles.dayCompletionHeader}>
          <h2 className={styles.dayCompletionTitle}>Day Completion Verification</h2>

          {!isCompleted && isChecklistIncomplete && (
            <span className={styles.statusBadge}>Checklist Incomplete</span>
          )}
        </div>

        <p className={styles.dayCompletionDescription}>
          Clicking &quot;Submit Day&quot; verifies checklist items and task completions to mark Day
          01 complete and unlock Day 02.
        </p>
      </div>

      <button
        type="button"
        className={styles.dayCompletionButton}
        onClick={onComplete}
        disabled={isCompleted || isChecklistIncomplete}
      >
        <svg
          className={styles.buttonIcon}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{isCompleted ? 'DAY SUBMITTED' : 'SUBMIT DAY'}</span>
      </button>
    </section>
  );
}
