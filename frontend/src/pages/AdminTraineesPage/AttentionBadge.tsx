import styles from './AttentionBadge.module.css';

type AttentionBadgeProps = {
  /** From `needsAttention`. Nothing is shown when the list is empty. */
  reasons: string[];
};

function WarningIcon() {
  return (
    <svg
      className={styles.icon}
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 1.5a1 1 0 0 1 .87.5l6 10.5A1 1 0 0 1 14 14H2a1 1 0 0 1-.87-1.5L7.13 2A1 1 0 0 1 8 1.5Zm-.75 4.75v3.5h1.5v-3.5h-1.5Zm0 4.75v1.5h1.5V11h-1.5Z" />
    </svg>
  );
}

/** One quiet line under the email: a warning icon and every reason; the tooltip lists them all. */
export default function AttentionBadge({ reasons }: AttentionBadgeProps) {
  if (reasons.length === 0) return null;

  return (
    <span className={styles.note} title={reasons.join(', ')}>
      <WarningIcon />
      <span>{reasons.join(' · ')}</span>
    </span>
  );
}
