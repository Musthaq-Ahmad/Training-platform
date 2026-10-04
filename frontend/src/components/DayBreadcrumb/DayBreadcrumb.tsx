import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import styles from './DayBreadcrumb.module.css';

interface DayBreadcrumbProps {
  dayNumber: number;
}

export default function DayBreadcrumb({ dayNumber }: DayBreadcrumbProps) {
  const formattedDay = `Day ${String(dayNumber).padStart(2, '0')}`;

  return (
    <nav className={styles.dayBreadcrumb} aria-label="Breadcrumb">
      <Link to="/" className={styles.dayBreadcrumbBack}>
        <span className={styles.arrow} aria-hidden="true">
          <ArrowLeft size={16} strokeWidth={2} />
        </span>
        Dashboard
      </Link>
      <span className={styles.dayBreadcrumbSeparator}>/</span>

      <span className={styles.dayBreadcrumbCurrent} aria-current="page">
        {formattedDay}
      </span>
    </nav>
  );
}
