import type { ReactNode } from 'react';
import { Link } from 'react-router';
import styles from './StateMessage.module.css';

type StateMessageProps = {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function StateMessage({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: StateMessageProps) {
  return (
    <div className={styles.stateMessage} role="status">
      <div className={styles.iconWrapper} aria-hidden="true">
        {icon}
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>

      {actionLabel && actionHref && (
        <Link to={actionHref} className={styles.action}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
