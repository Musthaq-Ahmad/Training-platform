import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { DayTask, DayContent, DayCurrentStatus } from '@itp/types';
import {
  getDayContent,
  getDayTasks,
  getDayStatus,
  getDayJournal,
  saveJournal,
  completeDay,
} from '../../api/days';
import DaySummary from '../../components/DaySummary/DaySummary';
import LearningObjectives from '../../components/LearningObjectives/LearningObjectives';
import SelfCheckChecklist from '../../components/SelfCheckChecklist';
import DailyJournal from '../../components/DailyJournal';
import DayCompletion from '../../components/DayCompletion/DayCompletion';
import Header from '../../components/Header';
import DayBreadcrumb from '../../components/DayBreadcrumb/DayBreadcrumb';
import styles from './DayOverviewPage.module.css';
import StateMessage from '../../components/StateMessage';
import { ApiError } from '../../api/errors';
import Loader from '../../components/Common/LoadingState';

type LoadResult =
  | {
      dayId: string;
      day: DayContent;
      tasks: DayTask[];
      status: DayCurrentStatus;
      journalResponse: string;
    }
  | { dayId: string; error: ApiError };

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

function DayTasks({
  courseTitle,
  dayNumber,
  tasks,
  completedTasks,
  requiredTasks,
  onSelectTask,
}: {
  courseTitle: string;
  dayNumber: number;
  tasks: DayTask[];
  completedTasks: number;
  requiredTasks: number;
  onSelectTask: (task: DayTask) => void;
}) {
  return (
    <section className={styles.tasks} aria-labelledby="day-tasks-title">
      <header className={styles.tasksHeader}>
        <div>
          <div className={styles.tasksEyebrow}>
            <span className={styles.tasksCourse}>
              {courseTitle.toUpperCase()}-DAY {String(dayNumber).padStart(2, '0')}
            </span>
            <span>
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>
          <h2 id="day-tasks-title" className={styles.tasksTitle}>
            Day Tasks
          </h2>
          <p className={styles.tasksDescription}>Select a task to open its workspace.</p>
        </div>
        <p className={styles.tasksProgress}>
          {completedTasks} of {requiredTasks} completed
        </p>
      </header>

      {tasks.length === 0 ? (
        <p className={styles.emptyTasks}>No tasks are available for this day.</p>
      ) : (
        <div className={styles.taskList}>
          {tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              className={`${styles.taskItem} ${task.isStretchGoal ? styles.stretchTaskItem : ''}`}
              onClick={() => onSelectTask(task)}
            >
              <span className={styles.taskNumber}>
                {String(task.sequenceOrder).padStart(2, '0')}
              </span>
              <span className={styles.taskInfo}>
                <span className={styles.taskTitle}>{task.title}</span>
                <span className={styles.taskMeta}>
                  <span className={`${styles.taskStatus} ${styles[task.status]}`}>
                    {task.status === 'in_progress'
                      ? 'In progress'
                      : task.status === 'completed'
                        ? 'Completed'
                        : 'Not started'}
                  </span>
                  {task.isStretchGoal && <span className={styles.stretchBadge}>Stretch goal</span>}
                </span>
              </span>
              <span className={styles.taskArrow} aria-hidden="true">
                <ArrowRight size={20} strokeWidth={2} />
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * `key={dayId}` remounts the content when the day changes, so saved/error/submitting
 * state from one day can never leak into another.
 */
export default function DayOverviewPage() {
  const { dayId } = useParams();
  return <DayOverviewContent key={dayId} />;
}

function DayOverviewContent() {
  const [isJournalSaved, setIsJournalSaved] = useState(false);
  const [isSavingJournal, setIsSavingJournal] = useState(false);
  const [isCompletingDay, setIsCompletingDay] = useState(false);
  const [result, setResult] = useState<LoadResult | null>(null);
  const [journalError, setJournalError] = useState<string | null>(null);
  const [completionError, setCompletionError] = useState<string | null>(null);

  // dayId is an opaque string. Never parse or build it here.
  const { dayId } = useParams();
  const navigate = useNavigate();

  const shouldLoad = Boolean(dayId);

  // Hooks must run before any early return.
  useEffect(() => {
    if (!dayId) return;
    let isCancelled = false; // ignore late responses after navigating away

    Promise.all([
      getDayContent(dayId),
      getDayTasks(dayId),
      getDayStatus(dayId),
      // A journal failure is not fatal: the page still renders with an empty journal.
      getDayJournal(dayId).catch(() => ({ responseText: null })),
    ])
      .then(([day, tasks, status, journal]) => {
        if (!isCancelled) {
          setResult({ dayId, day, tasks, status, journalResponse: journal.responseText ?? '' });
        }
      })
      .catch((error: ApiError) => {
        if (!isCancelled) setResult({ dayId, error });
      });

    return () => {
      isCancelled = true;
    };
  }, [dayId, shouldLoad]);

  // Only trust a result that belongs to the current dayId.
  const current = result && result.dayId === dayId ? result : null;
  const error = current && 'error' in current ? current.error : null;
  const tasks = current && 'tasks' in current ? current.tasks : [];
  const status = current && 'status' in current ? current.status : null;
  const journalResponse = current && 'journalResponse' in current ? current.journalResponse : '';
  const isLoading = shouldLoad && current === null;
  const day = current && 'day' in current ? current.day : undefined;

  if (!dayId || error?.code === 'NOT_FOUND') {
    return (
      <>
        <Header />
        <main className={styles.dayOverview}>
          <StateMessage
            icon="🔍"
            title="Day not found"
            description="We couldn't find the day you're looking for. It may have been moved, or the link you followed is incorrect."
            actionLabel="Back to Dashboard"
            actionHref="/"
          />
        </main>
      </>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (status?.isLocked || error?.code === 'DAY_LOCKED') {
    return (
      <>
        <Header />
        <main className={styles.dayOverview}>
          <StateMessage
            icon="🔒"
            title="This day is locked"
            description="Finish the previous day to unlock this one and keep going."
            actionLabel="Back to Dashboard"
            actionHref="/"
          />
        </main>
      </>
    );
  }

  if (error || !status || !day) {
    return (
      <>
        <Header />
        <main className={styles.dayOverview}>
          <StateMessage
            icon="⚠️"
            title="Couldn't load this day"
            description="Something went wrong while loading your progress. Please try again."
            actionLabel="Back to Dashboard"
            actionHref="/"
          />
        </main>
      </>
    );
  }

  const completedTasks = tasks.filter(
    (task) => task.status === 'completed' && !task.isStretchGoal
  ).length;
  const requiredTasks = tasks.filter((task) => !task.isStretchGoal).length;

  async function handleSaveJournal(responseText: string) {
    if (!day) return;
    setJournalError(null);
    setIsSavingJournal(true);
    setIsJournalSaved(false);

    try {
      await saveJournal(day.dayId, responseText);
      setIsJournalSaved(true);
    } catch (err) {
      setJournalError(getErrorMessage(err, 'Failed to save journal response.'));
    } finally {
      setIsSavingJournal(false);
    }
  }

  async function handleCompleteDay() {
    if (!day) return;
    setCompletionError(null);
    setIsCompletingDay(true);

    try {
      // The server decides whether the day can be completed (rule 2).
      const updatedStatus = await completeDay(day.dayId);

      setResult((previous) => {
        if (!previous || 'error' in previous) return previous;
        return { ...previous, status: updatedStatus };
      });
    } catch (err) {
      setCompletionError(getErrorMessage(err, 'Failed to complete the day.'));
    } finally {
      setIsCompletingDay(false);
    }
  }

  return (
    <>
      <Header />

      <main className={styles.dayOverview}>
        <DayBreadcrumb dayNumber={day.dayNumber} />

        <DaySummary
          courseTitle={day.courseTitle}
          dayNumber={day.dayNumber}
          totalDays={day.totalDays}
          title={day.title}
          description={day.subtitle}
          summary={day.lessonSummary}
          onReferences={() => void navigate(`/days/${day.dayId}/references`)}
        />

        <div className={styles.grid}>
          <div className={styles.left}>
            <DayTasks
              courseTitle={day.courseTitle}
              dayNumber={day.dayNumber}
              tasks={tasks}
              completedTasks={completedTasks}
              requiredTasks={requiredTasks}
              onSelectTask={(task) => void navigate(`/tasks/${task.id}`)}
            />
            <LearningObjectives objectives={day.learningObjectives} />
          </div>

          <div className={styles.right}>
            <SelfCheckChecklist items={day.selfCheckItems} />

            <DailyJournal
              prompts={day.journalPrompt ? [day.journalPrompt] : []}
              initialResponse={journalResponse}
              isSaving={isSavingJournal}
              isSaved={isJournalSaved}
              onSave={(responseText) => void handleSaveJournal(responseText)}
            />
            {journalError && (
              <p className={styles.error} role="alert">
                {journalError}
              </p>
            )}
          </div>
        </div>

        <DayCompletion
          completedTasks={completedTasks}
          totalTasks={requiredTasks}
          isCompleted={status.isCompleted}
          isSubmitting={isCompletingDay}
          onComplete={handleCompleteDay}
        />
        {completionError && (
          <p className={styles.error} role="alert">
            {completionError}
          </p>
        )}
      </main>
    </>
  );
}
