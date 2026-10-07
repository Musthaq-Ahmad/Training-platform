// frontend/src/pages/JournalPage/components/JournalMessage/JournalMessage.tsx
import Icon, { type IconName } from '../Icon';
import styles from './JournalMessage.module.css';

type Variant = 'empty' | 'error' | 'noResults';

type JournalMessageProps = {
  variant: Variant;
  description?: string; // overrides the default text
  onAction?: () => void;
};

const CONTENT: Record<
  Variant,
  {
    icon: IconName;
    title: string;
    description: string;
    actionLabel?: string;
    actionIcon?: IconName;
  }
> = {
  empty: {
    icon: 'book',
    title: 'No journal entries yet',
    description: 'Your daily reflections will appear here as you work through each day.',
  },
  error: {
    icon: 'cloudOff',
    title: 'Unable to load your journal',
    description: 'Something went wrong. Please try again.',
    actionLabel: 'Retry',
    actionIcon: 'refresh',
  },
  noResults: {
    icon: 'search',
    title: 'No reflections found',
    description: 'Nothing matched your search. Try a different keyword.',
    actionLabel: 'Clear search',
  },
};

export default function JournalMessage({ variant, description, onAction }: JournalMessageProps) {
  const content = CONTENT[variant];

  return (
    <div className={styles.box} role={variant === 'error' ? 'alert' : undefined}>
      <div className={styles.iconTile}>
        <Icon name={content.icon} size={28} />
      </div>
      <h2 className={styles.title}>{content.title}</h2>
      <p className={styles.description}>{description ?? content.description}</p>

      {content.actionLabel && onAction && (
        <button type="button" className={styles.action} onClick={onAction}>
          {content.actionIcon && <Icon name={content.actionIcon} size={16} />}
          {content.actionLabel}
        </button>
      )}
    </div>
  );
}
