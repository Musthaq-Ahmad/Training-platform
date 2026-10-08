import { Link } from 'react-router';
import type { AdminTraineeSummary } from '@itp/types';
import { formatDurationHM } from '../../lib/formatTime';
import { formatCurrentDay, formatLastActive, progressPercent } from '../../lib/adminTrainees';
import styles from './TraineeTable.module.css';
import AttentionBadge from './AttentionBadge';

type TraineeTableProps = {
  trainees: AdminTraineeSummary[];
  /** Attention reasons by trainee id (from `needsAttention`); a missing id means none. */
  attentionReasons?: Record<string, string[]>;
};

const COLUMNS = [
  'Trainee',
  'Progress',
  'Current day',
  'Today',
  'Total active',
  'WPM',
  'Integrity Score',
  'Last active',
];

type IntegrityScoreBand = 'high' | 'mid' | 'low' | 'neutral';

function getIntegrityScoreBand(score: number | null): IntegrityScoreBand {
  if (score === null) return 'neutral';
  if (score >= 90) return 'high';
  if (score > 75) return 'mid';
  return 'low';
}

/**
 * One row per trainee. The name is the only real link; its ::after covers the whole row,
 * so the entire row is clickable while screen readers and keyboards see one link per trainee.
 */
export default function TraineeTable({ trainees, attentionReasons = {} }: TraineeTableProps) {
  return (
    <div className={styles.scroll}>
      <div className={styles.table} role="table" aria-label="Trainees">
        <div className={`${styles.row} ${styles.headRow}`} role="row">
          {COLUMNS.map((column) => (
            <div key={column} role="columnheader">
              {column}
            </div>
          ))}
        </div>

        <div role="rowgroup">
          {trainees.map((trainee) => {
            return (
              <div
                key={trainee.id}
                className={`${styles.row} ${styles.bodyRow}`}
                role="row"
                data-attention={(attentionReasons[trainee.id] ?? []).length > 0}
              >
                <div className={styles.identity} role="cell">
                  <Link to={`/admin/trainees/${trainee.id}`} className={styles.nameLink}>
                    {trainee.name}
                  </Link>
                  <span className={styles.email}>{trainee.email}</span>
                  <AttentionBadge reasons={attentionReasons[trainee.id] ?? []} />
                </div>

                <div className={styles.progress} role="cell">
                  <div
                    className={styles.bar}
                    role="progressbar"
                    aria-label={`${trainee.name} progress`}
                    aria-valuemin={0}
                    aria-valuemax={trainee.totalDays}
                    aria-valuenow={trainee.daysCompleted}
                  >
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${progressPercent(trainee.daysCompleted, trainee.totalDays)}%`,
                      }}
                    />
                  </div>
                  <span className={styles.count}>
                    {trainee.daysCompleted} / {trainee.totalDays}
                  </span>
                </div>

                <div className={styles.currentDay} role="cell">
                  {formatCurrentDay(trainee.currentDay)}
                </div>

                <div className={styles.value} role="cell">
                  {formatDurationHM(trainee.todayActiveSeconds)}
                </div>

                <div className={styles.value} role="cell">
                  {formatDurationHM(trainee.totalActiveSeconds)}
                </div>

                <div className={styles.value} role="cell">
                  {trainee.latestWpm ?? '—'}
                </div>

                <div role="cell">
                  <span
                    className={`${styles.integrityScore} ${
                      styles[getIntegrityScoreBand(trainee.averageScore)]
                    }`}
                  >
                    {trainee.averageScore !== null ? `${trainee.averageScore}/100` : '—'}
                  </span>
                </div>

                <div className={trainee.lastActiveDate ? styles.value : styles.muted} role="cell">
                  {formatLastActive(trainee.lastActiveDate)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
