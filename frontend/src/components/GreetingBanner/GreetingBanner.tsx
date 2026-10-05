import { WELCOME_MESSAGE } from '../../constants/greeting';
import styles from './GreetingBanner.module.css';

export type GreetingBannerProps = {
  name?: string | null;
  completedDays: number;
  totalDays: number;
  completionPercent: number;
};

export default function GreetingBanner({
  name,
  completedDays,
  totalDays,
  completionPercent,
}: GreetingBannerProps) {
  const firstName = name?.trim().split(/\s+/)[0];
  const message = firstName ? `${WELCOME_MESSAGE}, ${firstName}!` : WELCOME_MESSAGE;

  return (
    <div className={styles.banner} role="status" aria-live="polite">
      <p className={styles.message}>
        {message}
        {firstName && (
          <>
            {' '}
            <span aria-hidden="true">👋</span>
          </>
        )}
      </p>
      <div className={styles.completion}>
        <div className={styles.completionText}>
          <span className={styles.completionLabel}>Curriculum Completion</span>
          <span className={styles.completionValue}>
            {completedDays} / {totalDays} days ({completionPercent}%)
          </span>
        </div>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-label="Curriculum completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={completionPercent}
        >
          <span className={styles.progressFill} style={{ width: `${completionPercent}%` }} />
        </div>
      </div>
    </div>
  );
}
