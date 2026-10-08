import { ShieldCheck } from 'lucide-react';
import type { DayIntegrityResponse } from '@itp/types';
import { getIntegrityBand } from '../../lib/Integrityband';
import styles from './DayIntegrityBadge.module.css';

type DayIntegrityBadgeProps = {
  integrity: DayIntegrityResponse | null;
  isLoading: boolean;
  hasError: boolean;
};

const EXPLANATION = 'Based on recorded workspace activity and integrity-related events.';

export default function DayIntegrityBadge({
  integrity,
  isLoading,
  hasError,
}: DayIntegrityBadgeProps) {
  if (isLoading) {
    return (
      <div className={styles.badge} role="status" aria-busy="true" title={EXPLANATION}>
        <ShieldCheck size={16} strokeWidth={2} className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>Integrity</span>
        <span className={styles.muted}>Loading...</span>
      </div>
    );
  }

  if (hasError || !integrity) {
    return (
      <div className={styles.badge} role="alert" title={EXPLANATION}>
        <ShieldCheck size={16} strokeWidth={2} className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>Integrity</span>
        <span className={styles.muted}>Unavailable</span>
      </div>
    );
  }

  const { score } = integrity;
  const band = getIntegrityBand(score); // null = neutral (no score yet)

  return (
    <div
      className={`${styles.badge} ${band ? styles[band] : ''}`}
      title={EXPLANATION}
      aria-label={
        score === null ? `Integrity score not available yet` : `Integrity score ${score} out of 100`
      }
    >
      <ShieldCheck size={16} strokeWidth={2} className={styles.icon} aria-hidden="true" />
      <span className={styles.label}>Integrity</span>
      {score === null ? (
        <span className={styles.score}>100</span>
      ) : (
        <span className={styles.score}>
          {score}
          <span className={styles.max}>/100</span>
        </span>
      )}
    </div>
  );
}
