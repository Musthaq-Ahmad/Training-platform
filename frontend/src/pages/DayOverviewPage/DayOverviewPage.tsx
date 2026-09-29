import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { DayTask, DayContent } from '@itp/types';
import { getDayTasks, getDayContent } from '../../api/days';
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

type LoadResult =
  { dayId: string; day: DayContent; tasks: DayTask[] } | { dayId: string; error: ApiError };

export default function DayOverviewPage() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isJournalSaved, setIsJournalSaved] = useState(false);
  const [result, setResult] = useState<LoadResult | null>(null);
  const isSavingJournal = false;

  // dayId is an opaque string. Never parse or build it here.
  const { dayId } = useParams();
  const navigate = useNavigate();

  // Hooks must run before any early return.
  useEffect(() => {
    if (!dayId) return;
    let isCancelled = false; // ignore late responses after navigating away

    Promise.all([getDayContent(dayId), getDayTasks(dayId)])
      .then(([day, tasks]) => {
        if (!isCancelled) setResult({ dayId, day, tasks });
      })
      .catch((error: ApiError) => {
        if (!isCancelled) setResult({ dayId, error });
      });

    return () => {
      isCancelled = true;
    };
  }, [dayId]);

  // Only trust a result that belongs to the current dayId; otherwise we're loading.
  const current = result && result.dayId === dayId ? result : null;
  const isLoading = Boolean(dayId) && current === null;
  const error = current && 'error' in current ? current.error : null;
  const day = current && 'day' in current ? current.day : null;
  const tasks = current && 'tasks' in current ? current.tasks : [];

  if (isLoading) {
    return (
      <>
        <Header />
        <main className={styles.dayOverview}>
          <p>Loading...</p>
        </main>
      </>
    );
  }

  if (error?.code === 'NOT_FOUND' || (!error && !day)) {
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

  if (error?.code === 'DAY_LOCKED') {
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

  if (!day) return null;

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
              initialResponse={day.journalResponse}
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
          isCompleted={day.isCompleted}
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
