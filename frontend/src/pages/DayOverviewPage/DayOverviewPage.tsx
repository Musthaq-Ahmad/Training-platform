import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { DayTask, DayContent, DayCurrentStatus } from '@itp/types';
import { getDayTasks, getDayStatus, getDayJournal } from '../../api/days';
import { mockDayContents } from '../../api/dayOverview';
import DaySummary from '../../components/DaySummary/DaySummary';
import LessonSummary from '../../components/LessonSummary/LessonSummary';
import LearningObjectives from '../../components/LearningObjectives/LearningObjectives';
import SelfCheckChecklist from '../../components/SelfCheckChecklist';
import DailyJournal from '../../components/DailyJournal';
import DayCompletion from '../../components/DayCompletion/DayCompletion';
import Header from '../../components/Header';
import DayBreadcrumb from '../../components/DayBreadcrumb/DayBreadcrumb';
import TaskModal from '../../components/TaskModal';
import styles from './DayOverviewPage.module.css';
import StateMessage from '../../components/StateMessage';
import { ApiError } from '../../api/errors';
import Loader from '../../components/Common/LoadingState';

type LoadResult =
  | { dayId: string; tasks: DayTask[]; status: DayCurrentStatus; journalResponse: string }
  | { dayId: string; error: ApiError };

export default function DayOverviewPage() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isJournalSaved, setIsJournalSaved] = useState(false);
  const [result, setResult] = useState<LoadResult | null>(null);
  const isSavingJournal = false;

  // dayId is an opaque string. Never parse or build it here.
  const { dayId } = useParams();
  const navigate = useNavigate();

  // Static curriculum content. TODO: replace with an API call when a day endpoint exists.
  const day: DayContent | undefined = dayId ? mockDayContents[dayId] : undefined;
  const shouldLoad = Boolean(dayId && day);

  // Hooks must run before any early return.
  useEffect(() => {
    if (!dayId || !shouldLoad) return;
    let isCancelled = false; // ignore late responses after navigating away

    Promise.all([
      getDayTasks(dayId),
      getDayStatus(dayId),
      // A journal failure is not fatal: the page still renders with an empty journal.
      getDayJournal(dayId).catch(() => ({ responseText: null })),
    ])
      .then(([tasks, status, journal]) => {
        if (!isCancelled) {
          setResult({ dayId, tasks, status, journalResponse: journal.responseText ?? '' });
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

  if (!day || error?.code === 'NOT_FOUND') {
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
    return (
      <>
        {/* <Header />
        <main className={styles.dayOverview}>
          <p>Loading...</p>
        </main> */}
        <Loader />
      </>
    );
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

  if (error || !status) {
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

  return (
    <>
      <Header />

      <main className={styles.dayOverview}>
        <DayBreadcrumb courseTitle={day.courseTitle} dayNumber={day.dayNumber} />

        <DaySummary
          courseTitle={day.courseTitle}
          dayNumber={day.dayNumber}
          totalDays={day.totalDays}
          title={day.title}
          description={day.subtitle}
          completedTasks={completedTasks}
          totalTasks={requiredTasks}
          onReferences={() => void navigate(`/days/${day.dayId}/references`)}
          onTasks={() => setIsTaskModalOpen(true)}
        />

        <div className={styles.grid}>
          <div className={styles.left}>
            <LessonSummary summary={day.lessonSummary} />
            <LearningObjectives objectives={day.learningObjectives} />
          </div>

          <div className={styles.right}>
            <SelfCheckChecklist items={day.selfCheckItems} />

            <DailyJournal
              prompt={day.journalPrompt}
              initialResponse={journalResponse}
              isSaving={isSavingJournal}
              isSaved={isJournalSaved}
              onSave={(responseText) => {
                console.log('Journal response:', responseText);
                setIsJournalSaved(true);
              }}
            />
          </div>
        </div>

        <DayCompletion
          completedTasks={completedTasks}
          totalTasks={requiredTasks}
          isCompleted={status.isCompleted}
          onComplete={() => {
            console.log('Submit Day clicked');
          }}
        />
      </main>

      <TaskModal
        isOpen={isTaskModalOpen}
        dayNumber={day.dayNumber}
        tasks={tasks}
        onClose={() => setIsTaskModalOpen(false)}
        onSelectTask={(task) => {
          setIsTaskModalOpen(false);
          console.log('Selected task:', task.id);
        }}
      />
    </>
  );
}
