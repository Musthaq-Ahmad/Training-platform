import { useMemo, type ReactNode } from 'react';
import { Activity, Flag, TrendingUp, Users } from 'lucide-react';
import type { AdminTraineeSummary } from '@itp/types';
import { summarizeCohort } from '../../lib/adminTrainees';
import styles from './CohortSummary.module.css';

type SummaryCardProps = {
  label: string;
  value: string;
  detail: string | null;
  icon: ReactNode;
  tone?: 'warning';
};

function SummaryCard({ label, value, detail, icon, tone }: SummaryCardProps) {
  return (
    <div role="group" aria-label={label} className={styles.card} data-tone={tone}>
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
        <p className={styles.label}>{label}</p>
      </div>
      <p className={styles.value}>{value}</p>
      {detail && <p className={styles.detail}>{detail}</p>}
    </div>
  );
}

const plural = (count: number, word: string) => `${count} ${count === 1 ? word : `${word}s`}`;

type CohortSummaryProps = {
  trainees: AdminTraineeSummary[];
};

/** Four cards above the trainee table: size, average progress, activity today, flags this week. */
export default function CohortSummary({ trainees }: CohortSummaryProps) {
  const summary = useMemo(() => summarizeCohort(trainees), [trainees]);
  const iconProps = { size: 16, strokeWidth: 2 };

  return (
    <section className={styles.row} aria-label="Cohort summary">
      <SummaryCard
        label="Trainees"
        value={String(summary.traineeCount)}
        detail={summary.finishedCount > 0 ? `${summary.finishedCount} finished` : null}
        icon={<Users {...iconProps} />}
      />
      <SummaryCard
        label="Average progress"
        value={`${summary.averageProgressPercent}%`}
        detail={`${summary.averageDaysCompleted} of ${summary.totalDays} days`}
        icon={<TrendingUp {...iconProps} />}
      />
      <SummaryCard
        label="Active today"
        value={`${summary.activeTodayCount} of ${summary.traineeCount}`}
        detail="trainees with time today"
        icon={<Activity {...iconProps} />}
      />
      <SummaryCard
        label="Flags this week"
        value={String(summary.flagsThisWeek)}
        detail={
          summary.flagsThisWeek === 0
            ? 'No flags'
            : `across ${plural(summary.flaggedTraineeCount, 'trainee')}`
        }
        icon={<Flag {...iconProps} />}
        tone={summary.flagsThisWeek > 0 ? 'warning' : undefined}
      />
    </section>
  );
}
