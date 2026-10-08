import { Check, Lock, Play } from 'lucide-react';
import type { AdminTraineeDetail, DayStatus } from '@itp/types';
import { DAY_STATUS_LABELS } from '../../lib/adminLabels';
import styles from './AdminDayGrid.module.css';

type AdminDayGridProps = {
  courses: AdminTraineeDetail['courses'];
};

const STATUS_CLASS: Record<DayStatus, string> = {
  COMPLETED: styles.completed,
  UNLOCKED: styles.current,
  LOCKED: styles.locked,
};

function StatusIcon({ status }: { status: DayStatus }) {
  if (status === 'COMPLETED') return <Check size={12} aria-hidden="true" />;
  if (status === 'UNLOCKED') return <Play size={12} aria-hidden="true" />;
  return <Lock size={12} aria-hidden="true" />;
}

/** Every course with one cell per day. The status is written out, not only coloured. */
export default function AdminDayGrid({ courses }: AdminDayGridProps) {
  return (
    <section className={styles.grid} aria-label="Course and day progress">
      {courses.map((course) => {
        const completed = course.days.filter((day) => day.status === 'COMPLETED').length;

        return (
          <div key={course.id} className={styles.course}>
            <div className={styles.courseHeader}>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              <span className={styles.courseCount}>
                {completed}/{course.days.length} days
              </span>
            </div>

            {course.days.length > 0 && (
              <ol className={styles.days}>
                {course.days.map((day) => (
                  <li
                    key={day.id}
                    className={`${styles.day} ${STATUS_CLASS[day.status]}`}
                    title={`Day ${day.dayNumber}: ${day.title} (${DAY_STATUS_LABELS[day.status]})`}
                  >
                    <StatusIcon status={day.status} />
                    <span className={styles.dayNumber}>Day {day.dayNumber}</span>
                    <span className={styles.srOnly}>
                      {day.title}, {DAY_STATUS_LABELS[day.status]}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        );
      })}
    </section>
  );
}
