import { Link } from 'react-router';
import styles from './TaskBreadcrumb.module.css';

type TaskBreadcrumbProps = {
  courseTitle: string;
  dayId: string;
  dayNumber: number;
  taskNumber: number;
};

export default function TaskBreadcrumb({
  courseTitle,
  dayId,
  dayNumber,
  taskNumber,
}: TaskBreadcrumbProps) {
  const dayLabel = `Day ${String(dayNumber).padStart(2, '0')}`;

  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li>
          <Link to="/" className={styles.link}>
            Dashboard
          </Link>
        </li>
        <li>{courseTitle}</li>
        <li>
          <Link to={`/days/${dayId}`} className={styles.link}>
            {dayLabel}
          </Link>
        </li>
        <li>
          <span className={styles.current} aria-current="page">
            {`Task ${taskNumber}`}
          </span>
        </li>
      </ol>
    </nav>
  );
}
