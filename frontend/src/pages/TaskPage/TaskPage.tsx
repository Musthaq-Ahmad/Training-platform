import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useTaskData } from './hooks/useTaskData';
import TaskPageSkeleton from '../../components/TaskPageSkeleton';
import styles from './TaskPage.module.css';

export default function TaskPage() {
  const { taskId } = useParams();
  const data = useTaskData(taskId);

  useEffect(() => {
    if (data.status !== 'success') return;
    const previousTitle = document.title;
    document.title = `${data.task.title} · Task ${data.task.sequenceOrder}`;
    return () => {
      document.title = previousTitle;
    };
  }, [data]);

  if (data.status === 'loading') {
    return <TaskPageSkeleton />;
  }

  if (data.status === 'error') {
    if (data.error.code === 'NOT_FOUND') {
      return (
        <div className={styles.messageScreen} role="alert">
          <div className={styles.messageCard}>
            <div className={styles.messageIcon} aria-hidden="true">
              404
            </div>

            <h1 className={styles.messageTitle}>Task not found</h1>

            <p className={styles.messageText}>
              The task you&apos;re looking for doesn&apos;t exist or is no longer available.
            </p>

            <Link className={styles.messageLink} to="/dashboard">
              Back to dashboard
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.messageScreen} role="alert">
        <div className={styles.messageCard}>
          <div className={`${styles.messageIcon} ${styles.messageIconError}`} aria-hidden="true">
            !
          </div>

          <h1 className={styles.messageTitle}>Something went wrong</h1>

          <p className={styles.messageText}>{data.error.message}</p>

          <button className={styles.messageAction} onClick={data.reload}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // success — TK-2 replaces this stub with
  // <WorkspaceProvider task={data.task} code={data.code}><TaskWorkspace /></WorkspaceProvider>
  return (
    <div className={styles.page}>
      <div className={styles.stubToolbar}>{data.task.title}</div>
    </div>
  );
}
