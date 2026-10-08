import { useEffect, useState } from 'react';
import type { AdminTraineeSummary } from '@itp/types';
import { getAdminTrainees } from '../../api/admin';
import { sortTraineesByName } from '../../lib/adminTrainees';
import AdminHeader from '../../components/AdminHeader';
import LoaderOverlay from '../../components/Common/LoadingState';
import { ErrorState } from '../../components/Common/ErrorState';
import TraineeTable from './TraineeTable';
import styles from './AdminTraineesPage.module.css';
import CohortSummary from '../../components/CohortSummary';

function UsersIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 18 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6.5" cy="4.5" r="2.75" />
      <path d="M1 14.5c.4-2.5 2.5-4 5.5-4s5.1 1.5 5.5 4" />
      <path d="M12 2.2a2.75 2.75 0 0 1 0 5.2M13.5 10.7c1.9.4 3 1.6 3.4 3.8" />
    </svg>
  );
}

/** /admin: read-only overview of every trainee, one row each, sorted by name. */
export default function AdminTraineesPage() {
  const [trainees, setTrainees] = useState<AdminTraineeSummary[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // Ignore a response that arrives after the mentor left the page or retried.
    let isCancelled = false;

    getAdminTrainees()
      .then((data) => {
        if (!isCancelled) setTrainees(sortTraineesByName(data));
      })
      .catch((caught: unknown) => {
        if (!isCancelled) {
          setError(caught instanceof Error ? caught : new Error('Something went wrong.'));
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [attempt]);

  const handleRetry = () => {
    setError(null);
    setAttempt((n) => n + 1);
  };

  if (error) {
    return (
      <>
        <AdminHeader />
        <main className={styles.page}>
          <ErrorState
            fullPage
            title="Unable to load trainees"
            message={error.message}
            onRetry={handleRetry}
          />
        </main>
      </>
    );
  }

  if (!trainees) {
    return (
      <>
        <AdminHeader />
        <main className={styles.page}>
          <LoaderOverlay label="Loading trainees…" />
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader />
      <main className={styles.page}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Trainees</h1>
          <p className={styles.subtitle}>
            {trainees.length} {trainees.length === 1 ? 'trainee' : 'trainees'}
          </p>
        </div>

        {trainees.length > 0 && <CohortSummary trainees={trainees} />}

        <section className={styles.card} aria-label="Trainee overview">
          {trainees.length === 0 ? (
            <div className={styles.empty} role="status">
              <div className={styles.emptyIcon} aria-hidden="true">
                <UsersIcon />
              </div>
              <h2 className={styles.emptyTitle}>No trainees yet</h2>
              <p className={styles.emptyText}>
                Trainees appear here once they are added to the program.
              </p>
            </div>
          ) : (
            <TraineeTable trainees={trainees} />
          )}
        </section>
      </main>
    </>
  );
}
