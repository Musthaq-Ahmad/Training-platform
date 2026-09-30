import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import type { DashboardResponse, DaySummary } from '@itp/types';
import { getDashboard } from '../../api/dashboard';
import { getCourseDays } from '../../api/courses';
import { CURRICULUM_COURSES } from '../../constants/courses';
import Header from '../../components/Header';
import CurrentLessonCard from '../../components/CurrentLessonCard';
import TrackTabs from '../../components/TrackTabs';
import ScheduleGrid from '../../components/ScheduleGrid';
import StatsRow from '../../components/StatsRow';
import LoaderOverlay from '../../components/Common/LoadingState';
import { ErrorState } from '../../components/Common/ErrorState';
import styles from './DashboardPage.module.css';

const DEFAULT_COURSE_ID = 'html';

export default function DashboardPage() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  // Days of each course, loaded the first time its tab is opened
  const [daysByCourse, setDaysByCourse] = useState<Record<string, DaySummary[]>>({});
  const [daysErrors, setDaysErrors] = useState<Record<string, Error>>({});
  const requestedCourses = useRef(new Set<string>());
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    void getDashboard()
      .then((data) => {
        if (cancelled) return;
        setDashboard(data);
        setActiveCourseId(data.nextDay?.courseId ?? DEFAULT_COURSE_ID);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('Something went wrong'));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true; // ignore the response if the page unmounts or retries
    };
  }, [attempt]);

  useEffect(() => {
    if (!activeCourseId || requestedCourses.current.has(activeCourseId)) return;
    requestedCourses.current.add(activeCourseId);

    getCourseDays(activeCourseId)
      .then((days) => setDaysByCourse((prev) => ({ ...prev, [activeCourseId]: days })))
      .catch((err: Error) => setDaysErrors((prev) => ({ ...prev, [activeCourseId]: err })));
  }, [activeCourseId]);

  // Runs from a click, so setting state here is fine
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setAttempt((n) => n + 1);
  };

  if (isLoading) return <LoaderOverlay fullPage />;
  if (error) {
    return (
      <ErrorState
        fullPage
        title="Unable to load the dashboard"
        message={error.message}
        onRetry={handleRetry}
      />
    );
  }

  if (!dashboard) return null;

  const activeTrack =
    CURRICULUM_COURSES.find((t) => t.id === activeCourseId) ?? CURRICULUM_COURSES[0];
  const activeDays = daysByCourse[activeTrack.id];
  const daysError = daysErrors[activeTrack.id];

  const displayedDay = dashboard.nextDay;
  const displayedDayTrackLabel =
    CURRICULUM_COURSES.find((t) => t.id === displayedDay?.courseId)?.label ?? '';

  // Locked days are ignored. The backend still returns DAY_LOCKED for direct URLs.
  function openDay(day: DaySummary | null | undefined) {
    if (!day || day.status === 'LOCKED') return;
    void navigate(`/days/${day.id}`);
  }

  return (
    <>
      <Header />

      <div className={styles.page}>
        {displayedDay ? (
          <CurrentLessonCard
            courseTitle={displayedDayTrackLabel}
            dayNumber={displayedDay.dayNumber}
            totalDays={displayedDay.courseTotalDays}
            lessonTitle={displayedDay.title}
            description={displayedDay.description}
            onContinue={() => openDay(displayedDay)}
          />
        ) : (
          <p className={styles.status}>You&apos;ve completed every course. Great work!</p>
        )}

        <section className={styles.section}>
          <div className={styles.trackHeader}>
            <p className={styles.sectionLabel}>Curriculum Track</p>
            <p className={styles.overallProgress}>
              {dashboard.totalDaysCompleteOverall} of {dashboard.totalDaysOverall} days complete
              overall
            </p>
          </div>
          <TrackTabs
            tracks={CURRICULUM_COURSES}
            activeTrackId={activeTrack.id}
            onSelect={setActiveCourseId}
          />
        </section>

        <section className={styles.section}>
          {daysError ? (
            <p className={styles.status}>{daysError.message}</p>
          ) : !activeDays ? (
            <p className={styles.status}>Loading days...</p>
          ) : (
            <ScheduleGrid
              title={`${activeTrack.label} Module — Schedule`}
              days={activeDays}
              currentDayId={displayedDay?.id ?? null}
              onSelectDay={(dayId) => openDay(activeDays.find((d) => d.id === dayId))}
            />
          )}
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <StatsRow
            totalActiveSeconds={dashboard.total.activeSeconds}
            totalCodingSeconds={dashboard.total.codingSeconds}
            latestWpm={dashboard.typing.latest?.wpm ?? null}
            onTakeTypingTest={() => {
              console.log('take typing test clicked');
            }}
          />
        </section>
      </div>
    </>
  );
}
