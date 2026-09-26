import { useState } from 'react';
import styles from './DailyJournal.module.css';

import type { DailyJournalProps } from '@itp/types';

export default function DailyJournal({
  prompt,
  initialResponse,
  isSaving,
  isSaved,
  onSave,
}: DailyJournalProps) {
  const [response, setResponse] = useState(initialResponse ?? '');

  return (
    <section className={styles.journal}>
      <div className={styles.header}>
        <span className={styles.label}>DAILY JOURNAL</span>
        <span className={styles.optionalBadge}>OPTIONAL</span>
      </div>

      <p className={styles.prompt}>{prompt}</p>

      <textarea
        className={styles.textarea}
        value={response}
        onChange={(event) => setResponse(event.target.value)}
        placeholder="Document technical takeaways, quirks encountered, or architectural notes..."
        rows={6}
      />

      <div className={styles.actions}>
        <span className={isSaved ? styles.savedMessage : styles.footnote}>
          {isSaved
            ? 'Saved successfully'
            : 'Journal is optional and does not affect day completion'}
        </span>

        <button
          type="button"
          className={styles.saveButton}
          onClick={() => onSave(response)}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Journal'}
        </button>
      </div>
    </section>
  );
}
