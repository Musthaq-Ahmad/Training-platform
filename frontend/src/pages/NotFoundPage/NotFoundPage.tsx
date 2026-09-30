import { useNavigate } from 'react-router';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles.code} aria-hidden="true">
          <span className={styles.number}>404</span>
          <span className={styles.rule} />
        </div>

        <div className={styles.text}>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.description}>
            The page you’re looking for doesn’t exist or may have been moved.
          </p>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={() => void navigate('/')}>
            Go to Dashboard
          </button>

          <button type="button" className={styles.secondary} onClick={() => void navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
