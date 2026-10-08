import type { AdminJournalEntry } from '@itp/types';
import { formatIstDateTime } from '../../lib/formatDateTime';
import styles from './AdminJournalList.module.css';

type AdminJournalListProps = {
  entries: AdminJournalEntry[];
};

export default function AdminJournalList({ entries }: AdminJournalListProps) {
  if (entries.length === 0) {
    return (
      <p className={styles.empty}>This trainee hasn&rsquo;t written any journal entries yet.</p>
    );
  }

  return (
    <div className={styles.list}>
      {entries.map((entry) => (
        <article key={entry.dayId} className={styles.entry}>
          <header className={styles.header}>
            <h3 className={styles.title}>
              {entry.courseTitle} · Day {entry.dayNumber}
              <span className={styles.dayTitle}> — {entry.dayTitle}</span>
            </h3>
            <time className={styles.time} dateTime={entry.updatedAt}>
              {formatIstDateTime(entry.updatedAt)}
            </time>
          </header>

          <p className={styles.text}>{entry.responseText}</p>
        </article>
      ))}
    </div>
  );
}
