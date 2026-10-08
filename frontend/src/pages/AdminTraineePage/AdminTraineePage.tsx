import { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, UserX } from 'lucide-react';
import { getAdminFlags, getAdminTaskCode, getAdminTrainee } from '../../api/admin';
import AdminHeader from '../../components/AdminHeader';
import AdminCodePanel from '../../components/AdminCodePanel';
import AdminDayGrid from '../../components/AdminDayGrid';
import AdminFlagTable from '../../components/AdminFlagTable';
import AdminJournalList from '../../components/AdminJournalList';
import AdminTaskList from '../../components/AdminTaskList';
import DailyActivityTable from '../../components/DailyActivityTable';
import LoaderOverlay from '../../components/Common/LoadingState';
import { ErrorState } from '../../components/Common/ErrorState';
import ProfileHeader from '../../components/ProfileHeader';
import StateMessage from '../../components/StateMessage';
import StatsSummary from '../../components/StatsSummary';
import { useAdminResource } from './hooks/useAdminResource';
import styles from './AdminTraineePage.module.css';

type TabId = 'tasks' | 'journal' | 'flags';

export default function AdminTraineePage() {
  const { traineeId = '' } = useParams();

  // Keyed by trainee, so opening another trainee starts with a clean page.
  return <TraineeDetail key={traineeId} traineeId={traineeId} />;
}

function BackLink() {
  return (
    <Link to="/admin" className={styles.back}>
      <ArrowLeft size={16} aria-hidden="true" />
      Back to trainees
    </Link>
  );
}

function TraineeDetail({ traineeId }: { traineeId: string }) {
  const [activeTab, setActiveTab] = useState<TabId>('tasks');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const loadDetail = useMemo(
    () => (traineeId ? () => getAdminTrainee(traineeId) : null),
    [traineeId]
  );
  const loadFlags = useMemo(() => (traineeId ? () => getAdminFlags(traineeId) : null), [traineeId]);
  const loadCode = useMemo(
    () => (traineeId && selectedTaskId ? () => getAdminTaskCode(traineeId, selectedTaskId) : null),
    [traineeId, selectedTaskId]
  );

  // The flags load beside the detail, so a failure there doesn't hide the rest of the page.
  const detail = useAdminResource(loadDetail);
  const flags = useAdminResource(loadFlags);
  const code = useAdminResource(loadCode);

  const handleCloseCode = useCallback(() => setSelectedTaskId(null), []);

  const dayLabels = useMemo(() => {
    const labels = new Map<string, string>();
    for (const course of detail.data?.courses ?? []) {
      for (const day of course.days) {
        labels.set(day.id, `${course.title} · Day ${day.dayNumber}`);
      }
    }
    return labels;
  }, [detail.data]);

  if (detail.isLoading) {
    return (
      <>
        <AdminHeader />
        <main className={`${styles.page} ${styles.state}`}>
          <LoaderOverlay label="Loading trainee…" />
        </main>
      </>
    );
  }

  if (!detail.data) {
    const error = detail.error;
    // The id is wrong (400) or nobody has it (404): the same message to the admin.
    const isNotFound =
      !traineeId || error?.code === 'NOT_FOUND' || error?.code === 'VALIDATION_FAILED';

    return (
      <>
        <AdminHeader />
        <main className={styles.page}>
          {isNotFound ? (
            <StateMessage
              icon={<UserX size={24} />}
              title="Trainee not found"
              description="This trainee doesn't exist, or the link is wrong."
              actionLabel="Back to trainees"
              actionHref="/admin"
            />
          ) : (
            <>
              <BackLink />
              <ErrorState
                title={
                  error?.code === 'FORBIDDEN' ? 'Admin access required' : 'Unable to load trainee'
                }
                message={error?.message ?? ''}
                onRetry={error?.code === 'FORBIDDEN' ? undefined : detail.retry}
              />
            </>
          )}
        </main>
      </>
    );
  }

  const { profile, courses, journal } = detail.data;
  // Only work the trainee has started matters for review; the day grid already shows the rest.
  const tasks = detail.data.tasks.filter((task) => task.status !== 'not_started');
  const selectedTask = tasks.find((task) => task.taskId === selectedTaskId);

  const tabs: { id: TabId; label: string }[] = [
    { id: 'tasks', label: `Tasks (${tasks.length})` },
    { id: 'journal', label: `Journal (${journal.length})` },
    {
      id: 'flags',
      label: `Flags (${flags.data ? flags.data.filter((flag) => flag.reviewPriority !== 'LOW').length : '…'})`,
    },
  ];

  return (
    <>
      <AdminHeader />
      <main className={styles.page}>
        <BackLink />

        <ProfileHeader trainee={profile.trainee} />

        <section className={styles.card} aria-label="Progress and activity">
          <StatsSummary total={profile.total} typing={profile.typing} />
          <DailyActivityTable days={profile.dailyActivity} />
        </section>

        <AdminDayGrid courses={courses} />

        <div className={styles.tabs} role="tablist" aria-label="Trainee details">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className={styles.panel}
        >
          {activeTab === 'tasks' && (
            <>
              {selectedTaskId && (
                <AdminCodePanel
                  traineeId={traineeId}
                  taskTitle={selectedTask?.title ?? 'Task code'}
                  code={code.data}
                  isLoading={code.isLoading}
                  error={code.error}
                  onRetry={code.retry}
                  onClose={handleCloseCode}
                />
              )}
              <AdminTaskList
                tasks={tasks}
                courses={courses}
                selectedTaskId={selectedTaskId}
                onViewCode={setSelectedTaskId}
              />
            </>
          )}

          {activeTab === 'journal' && <AdminJournalList entries={journal} />}

          {activeTab === 'flags' && (
            <>
              {flags.isLoading && (
                <div className={styles.state}>
                  <LoaderOverlay label="Loading flags…" />
                </div>
              )}
              {flags.error && (
                <ErrorState
                  title="Unable to load flags"
                  message={flags.error.message}
                  onRetry={flags.retry}
                />
              )}
              {flags.data && <AdminFlagTable flags={flags.data} dayLabels={dayLabels} />}
            </>
          )}
        </div>
      </main>
    </>
  );
}
