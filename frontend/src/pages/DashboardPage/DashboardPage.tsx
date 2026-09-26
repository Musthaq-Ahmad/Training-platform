import { useEffect, useState } from 'react';
import type { DashboardResponse, DaySummary } from '@itp/types';
import { getDashboard } from '../../api/dashboard';
import { CURRICULUM_COURSES } from '../../constants/courses';
import Header from '../../components/Header';
import CurrentLessonCard from '../../components/CurrentLessonCard';
import TrackTabs from '../../components/TrackTabs';
import ScheduleGrid from '../../components/ScheduleGrid';
import StatsRow from '../../components/StatsRow';
import styles from './DashboardPage.module.css';

const DEFAULT_COURSE_ID = 'course-html';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  useEffect(() => {
    getDashboard()
      .then((data) => {
        setDashboard(data);
        // New trainee (no currentDay yet) starts on HTML, not whatever
        // currentCourseId the API happened to send.
        setActiveCourseId(data.currentDay ? data.currentCourseId : DEFAULT_COURSE_ID);
      })
      .catch((err: Error) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p className={styles.status}>Loading...</p>;
  if (error) return <p className={styles.status}>{error.message}</p>;
  if (!dashboard) return null;

  const activeTrack =
    CURRICULUM_COURSES.find((t) => t.id === activeCourseId) ?? CURRICULUM_COURSES[0];
  const activeCourseData = dashboard.courses.find((c) => c.id === activeTrack.id);
  const activeDays = activeCourseData?.days ?? [];

  // For a brand-new trainee, dashboard.currentDay is null — fall back to
  // HTML Day 1 so the current-lesson card always has something to show.
  const htmlCourse = dashboard.courses.find((c) => c.id === DEFAULT_COURSE_ID);
  const htmlDayOne: DaySummary | undefined = htmlCourse?.days.find((d) => d.dayNumber === 1);
  const displayedDay = dashboard.currentDay ?? htmlDayOne ?? null;

  const displayedDayCourse = displayedDay
    ? dashboard.courses.find((c) => c.id === displayedDay.courseId)
    : undefined;
  const displayedDayTrackLabel =
    CURRICULUM_COURSES.find((t) => t.id === displayedDay?.courseId)?.label ?? '';

  return (
    <>
      <Header />

      <div className={styles.page}>
        {displayedDay && (
          <CurrentLessonCard
            courseTitle={displayedDayTrackLabel}
            dayNumber={displayedDay.dayNumber}
            totalDays={displayedDayCourse?.days.length ?? 0}
            lessonTitle={displayedDay.title}
            description={displayedDay.description ?? ''}
            onContinue={() => {
              console.log('continue clicked');
            }}
          />
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
          <ScheduleGrid
            title={`${activeTrack.label} Module — Schedule`}
            days={activeDays}
            currentDayId={displayedDay?.id ?? null}
            onSelectDay={(dayId) => {
              console.log('day selected', dayId);
            }}
          />
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
