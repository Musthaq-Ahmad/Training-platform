import { useEffect } from 'react';
import type { DayTask } from '@itp/types';
import styles from './TaskModal.module.css';

type TaskModalProps = {
  isOpen: boolean;
  dayNumber: number;
  tasks: DayTask[];
  onClose: () => void;
  onSelectTask: (task: DayTask) => void;
};

export default function TaskModal({
  isOpen,
  dayNumber,
  tasks,
  onClose,
  onSelectTask,
}: TaskModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Global keypress hook listener for Escape key actions
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function getStatusLabel(status: DayTask['status']) {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In progress';
      case 'not_started':
        return 'Not started';
    }
  }

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <p className={styles.eyebrow}>CSS · DAY {String(dayNumber).padStart(2, '0')}</p>

            <h2 id="task-modal-title" className={styles.title}>
              Day Tasks
            </h2>

            <p className={styles.subtitle}>Select a task to open its workspace.</p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close tasks modal"
          >
            &times;
          </button>
        </header>

        <div className={styles.taskList}>
          {tasks.length === 0 ? (
            <p className={styles.emptyMessage}>No tasks are available for this day.</p>
          ) : (
            tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                className={styles.taskItem}
                onClick={() => onSelectTask(task)}
              >
                <span className={styles.taskNumber}>
                  {String(task.sequenceOrder).padStart(2, '0')}
                </span>

                <span className={styles.taskInfo}>
                  <span className={styles.taskTitle}>{task.title}</span>

                  <span className={styles.taskMeta}>
                    <span className={`${styles.status} ${styles[task.status]}`}>
                      {getStatusLabel(task.status)}
                    </span>

                    {task.isStretchGoal && (
                      <span className={styles.stretchBadge}>Stretch goal</span>
                    )}
                  </span>
                </span>

                <span className={styles.arrow} aria-hidden="true">
                  &rarr;
                </span>
              </button>
            ))
          )}
        </div>

        <footer className={styles.footer}>
          <span className={styles.taskCount}>
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </footer>
      </section>
    </div>
  );
}
