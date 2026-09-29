import styles from './Loader.module.css';
export interface LoaderOverlayProps {
  /** Main text under the spinner. */
  label?: string;
  /** Optional smaller text under the label. */
  description?: string;
  /** Cover the whole screen. When false, covers the nearest positioned parent. */
  fullPage?: boolean;
  className?: string;
}

export default function LoaderOverlay({
  label = 'Loading…',
  description,
  fullPage = false,
  className,
}: LoaderOverlayProps) {
  const classes = [styles.overlay, fullPage ? styles.fullPage : styles.contained, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.box}>
        <div className={styles.spinner} aria-hidden="true" />
        <p className={styles.label}>{label}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
}
