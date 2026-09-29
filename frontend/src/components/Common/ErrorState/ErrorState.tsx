import { useId } from 'react';
import styles from './ErrorState.module.css';

export interface ErrorStateProps {
  /** Short heading. */
  title?: string;
  /** Supporting text. Pass an empty string to hide it. */
  message?: string;
  /** Retry handler. The retry button is only rendered when this is passed. */
  onRetry?: () => void | Promise<void>;
  /** Text of the retry button. */
  retryLabel?: string;
  /** Use when the whole page cannot be shown. Default: contained in a section. */
  fullPage?: boolean;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = "We couldn't load this content. Please try again.",
  onRetry,
  retryLabel = 'Try again',
  fullPage = false,
  className,
}: ErrorStateProps) {
  const id = useId();
  const titleId = `${id}-title`;
  const messageId = `${id}-message`;
  const Heading = fullPage ? 'h1' : 'h2';

  const classes = [styles.root, fullPage ? styles.fullPage : styles.contained, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="alert"
      aria-labelledby={titleId}
      aria-describedby={message ? messageId : undefined}
      data-layout={fullPage ? 'fullPage' : 'contained'}
      className={classes}
    >
      <div className={styles.icon} aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5v5.5" />
          <path d="M12 16.5h.01" />
        </svg>
      </div>

      <div className={styles.text}>
        <Heading id={titleId} className={styles.title}>
          {title}
        </Heading>
        {message && (
          <p id={messageId} className={styles.message}>
            {message}
          </p>
        )}
      </div>

      {onRetry && (
        <button type="button" className={styles.button} onClick={() => void onRetry()}>
          {retryLabel}
        </button>
      )}
    </div>
  );
}
