import { useState } from 'react';
import styles from './DailyJournal.module.css';

const MAX_JOURNAL_LENGTH = 10_000; // keep in sync with saveJournalBodySchema on the backend

type DailyJournalProps = {
  prompts: string[];
  initialResponse?: string | null;
  isSaving: boolean;
  isSaved: boolean;
  onSave: (responseText: string) => void;
};

export default function DailyJournal({
  prompts,
  initialResponse,
  isSaving,
  isSaved,
  onSave,
}: DailyJournalProps) {
  const [response, setResponse] = useState(initialResponse ?? '');
  const [hasEditedSinceSave, setHasEditedSinceSave] = useState(false);

  const showSaved = isSaved && !hasEditedSinceSave;

  function handleChange(text: string) {
    setResponse(text);
    setHasEditedSinceSave(true);
  }

  function handleSave() {
    setHasEditedSinceSave(false);
    onSave(response);
  }

  return (
    <section className={styles.journal}>
      <div className={styles.header}>
        <span className={styles.label}>DAILY JOURNAL</span>
        <span className={styles.optionalBadge}>OPTIONAL</span>
      </div>

      {prompts.map((prompt, index) => (
        <p key={`${index}-${prompt}`} className={styles.prompt}>
          {prompt}
        </p>
      ))}

      <textarea
        className={styles.textarea}
        value={response}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Document technical takeaways, quirks encountered, or architectural notes..."
        aria-label="Daily journal response"
        maxLength={MAX_JOURNAL_LENGTH}
        rows={6}
      />

      <div className={styles.actions}>
        <span className={showSaved ? styles.savedMessage : styles.footnote} role="status">
          {showSaved
            ? 'Saved successfully'
            : 'Journal is optional and does not affect day completion'}
        </span>

        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Journal'}
        </button>
      </div>
    </section>
  );
}
