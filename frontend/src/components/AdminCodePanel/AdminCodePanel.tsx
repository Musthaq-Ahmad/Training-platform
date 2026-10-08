import { lazy, Suspense, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { AdminTaskCode } from '@itp/types';
import type { ApiError } from '../../api/errors';
import { TASK_STATUS_LABELS } from '../../lib/adminLabels';
import { formatIstDateTime } from '../../lib/formatDateTime';
import LoaderOverlay from '../Common/LoadingState';
import { ErrorState } from '../Common/ErrorState';
import styles from './AdminCodePanel.module.css';

// Monaco is heavy; load it only when an admin actually opens some code.
const ReadOnlyCodeViewer = lazy(() => import('../ReadOnlyCodeViewer'));

type AdminCodePanelProps = {
  traineeId: string;
  taskTitle: string;
  code: AdminTaskCode | null;
  isLoading: boolean;
  error: ApiError | null;
  onRetry: () => void;
  onClose: () => void;
};

export default function AdminCodePanel({
  traineeId,
  taskTitle,
  code,
  isLoading,
  error,
  onRetry,
  onClose,
}: AdminCodePanelProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the panel when it opens, so keyboard users land on the code they asked for.
  useEffect(() => {
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: 'nearest' });
  }, []);

  return (
    <section className={styles.panel} aria-labelledby="admin-code-heading">
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h3 id="admin-code-heading" ref={headingRef} tabIndex={-1} className={styles.title}>
            {taskTitle}
          </h3>

          {code && (
            <p className={styles.meta}>
              <span>{TASK_STATUS_LABELS[code.status]}</span>
              {code.codeUpdatedAt && <span>Saved {formatIstDateTime(code.codeUpdatedAt)}</span>}
              {code.lastSubmittedAt && (
                <span>Submitted {formatIstDateTime(code.lastSubmittedAt)}</span>
              )}
            </p>
          )}
        </div>

        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close code viewer"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </header>

      {code?.isStarterCode && (
        <p className={styles.starter} role="note">
          Starter code: this trainee hasn&rsquo;t saved any work on this task.
        </p>
      )}

      <div className={styles.body}>
        {isLoading && <LoaderOverlay label="Loading code…" />}

        {error && (
          <ErrorState
            title="Unable to load code"
            message={error.message}
            onRetry={error.code === 'NOT_FOUND' ? undefined : onRetry}
          />
        )}

        {code && (
          <Suspense fallback={<LoaderOverlay label="Opening viewer…" />}>
            <ReadOnlyCodeViewer
              key={code.taskId}
              files={code.files}
              scope={`${traineeId}/${code.taskId}`}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
}
