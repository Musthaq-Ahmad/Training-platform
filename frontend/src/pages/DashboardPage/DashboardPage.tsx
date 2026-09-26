import { useEffect, useState } from 'react';
import type { DashboardResponse } from '@itp/types';
import { getDashboard } from '../../api/dashboard';
import { CURRICULUM_COURSES } from '../../constants/courses';
import Header from '../../components/Header';
import CurrentLessonCard from '../../components/CurrentLessonCard';
import TrackTabs from '../../components/TrackTabs';
import ScheduleGrid from '../../components/ScheduleGrid';
import StatsRow from '../../components/StatsRow';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  useEffect(() => {
    getDashboard()
      .then((data) => {
        setDashboard(data);
        setActiveCourseId(data.currentCourseId);
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

  // The current-lesson card always reflects the trainee's actual in-progress
  // day/course — independent of whichever track tab is selected below.
  const currentDayCourse = dashboard.currentDay
    ? dashboard.courses.find((c) => c.id === dashboard.currentDay!.courseId)
    : undefined;
  const currentDayTrackLabel =
    CURRICULUM_COURSES.find((t) => t.id === dashboard.currentDay?.courseId)?.label ?? '';

  return (
    <>
      <Header />

      <div className={styles.page}>
        {dashboard.currentDay && (
          <CurrentLessonCard
            courseTitle={currentDayTrackLabel}
            dayNumber={dashboard.currentDay.dayNumber}
            totalDays={currentDayCourse?.days.length ?? 0}
            lessonTitle={dashboard.currentDay.title}
            description={dashboard.currentDay.description ?? ''}
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
            currentDayId={dashboard.currentDay?.id ?? null}
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
