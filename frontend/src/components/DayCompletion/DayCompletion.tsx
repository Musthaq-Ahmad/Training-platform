import styles from './DayCompletion.module.css';

type DayCompletionProps = {
  completedTasks: number;
  totalTasks: number;
  isCompleted: boolean;
  isSubmitting: boolean;
  onComplete: () => void | Promise<void>;
};

export default function DayCompletion({
  completedTasks,
  totalTasks,
  isCompleted,
  isSubmitting,
  onComplete,
}: DayCompletionProps) {
  const hasIncompleteTasks = completedTasks < totalTasks;

  let buttonLabel = 'SUBMIT DAY';
  if (isCompleted) buttonLabel = 'Day completed';
  else if (isSubmitting) buttonLabel = 'Submitting...';

  return (
    <section className={styles.dayCompletion}>
      <div className={styles.dayCompletionContent}>
        <div className={styles.dayCompletionHeader}>
          <h2 className={styles.dayCompletionTitle}>Day Completion Verification</h2>

          {!isCompleted && hasIncompleteTasks && (
            <span className={styles.statusBadge}>
              Tasks incomplete ({completedTasks}/{totalTasks})
            </span>
          )}
        </div>

        <p className={styles.dayCompletionDescription}>
          Clicking &quot;Submit Day&quot; verifies checklist items and task completions to mark
          current day complete and unlock next day.
        </p>
      </div>

      <button
        type="button"
        className={styles.dayCompletionButton}
        onClick={() => void onComplete()}
        disabled={isCompleted || hasIncompleteTasks || isSubmitting}
        aria-busy={isSubmitting}
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
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{buttonLabel}</span>
      </button>
    </section>
  );
}
