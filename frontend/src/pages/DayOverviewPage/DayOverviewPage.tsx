import { useState } from 'react';
import { useParams } from 'react-router';
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

export default function DayOverviewPage() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isJournalSaved, setIsJournalSaved] = useState(false);

  const isSavingJournal = false;

  const { dayId } = useParams();

  let formattedKey = dayId;

  if (dayId && !dayId.startsWith('day-')) {
    formattedKey = `day-${dayId.padStart(2, '0')}`;
  }

  const day = formattedKey ? mockDayContents[formattedKey] : undefined;

  // Handle invalid day ID
  if (!day) {
    return <p>Day not found.</p>;
  }

  // Handle locked day
  if (day.isLocked) {
    return <p>This day is locked.</p>;
  }

  // Count completed required tasks
  const completedTasks = day.tasks.filter(
    (task) => task.status === 'completed' && !task.isStretchGoal
  ).length;

  const requiredTasks = day.tasks.filter((task) => !task.isStretchGoal).length;

  return (
    <>
      <Header />

      <main className={styles.dayOverview}>
        <DayBreadcrumb courseTitle="CSS" dayNumber={day.dayNumber} />

        <DaySummary
          dayNumber={day.dayNumber}
          totalDays={day.totalDays}
          title={day.title}
          description={day.subtitle}
          completedTasks={completedTasks}
          totalTasks={requiredTasks}
          onReferences={() => console.log('References clicked')}
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
        tasks={day.tasks}
        onClose={() => setIsTaskModalOpen(false)}
        onSelectTask={(task) => {
          setIsTaskModalOpen(false);
          console.log('Selected task:', task.id);
        }}
      />
    </>
  );
}
