import { Link } from 'react-router';
import styles from './DayBreadcrumb.module.css';

interface DayBreadcrumbProps {
  courseTitle: string;
  dayNumber: number;
}

export default function DayBreadcrumb({ courseTitle, dayNumber }: DayBreadcrumbProps) {
  const formattedDay = `Day ${String(dayNumber).padStart(2, '0')}`;

  return (
    <nav className={styles.dayBreadcrumb} aria-label="Breadcrumb">
      <Link to="/" className={styles.dayBreadcrumbBack}>
        <span aria-hidden="true">←</span>
        Dashboard
      </Link>

      <span className={styles.dayBreadcrumbSeparator}>/</span>

      <span className={styles.dayBreadcrumbCourse}>{courseTitle}</span>

      <span className={styles.dayBreadcrumbSeparator}>/</span>

      <span className={styles.dayBreadcrumbCurrent} aria-current="page">
        {formattedDay}
      </span>
    </nav>
  );
}
