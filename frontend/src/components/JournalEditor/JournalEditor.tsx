import type { JournalEntry } from '@itp/types';
import { useJournalAutosave, type AutosaveStatus } from '../../hooks/useJournalAutosave';
import { cx } from '../../lib/cx';
import styles from './JournalEditor.module.css';

// Keep in sync with the backend Zod schema for PUT /api/journal/:dayId
const JOURNAL_MAX_LENGTH = 5000;

const STATUS_LABELS: Record<Exclude<AutosaveStatus, 'error'>, string> = {
  idle: 'Autosave is on',
  unsaved: 'Unsaved changes',
  saving: 'Saving…',
  saved: 'Saved just now',
};

type JournalEditorProps = {
  entry: JournalEntry;
  onChangeText: (dayId: string, responseText: string) => void;
};

export default function JournalEditor({ entry, onChangeText }: JournalEditorProps) {
  const { status, saveNow } = useJournalAutosave(entry.dayId, entry.responseText);
  const isSaving = status === 'saving';
  const promptsId = `journal-prompts-${entry.dayId}`;

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        void saveNow();
      }}
    >
      <div className={styles.block}>
        <ol className={styles.prompts} id={promptsId}>
          {entry.prompts.map((prompt, index) => (
            <li key={index} className={styles.promptItem}>
              <span className={styles.promptNumber}>{index + 1}</span>
              <span className={styles.promptText}>{prompt}</span>
            </li>
          ))}
        </ol>

        <textarea
          className={styles.textarea}
          rows={7}
          maxLength={JOURNAL_MAX_LENGTH}
          placeholder="Write your reflection for today…"
          aria-label="Your journal entry for today"
          aria-describedby={promptsId}
          value={entry.responseText}
          onChange={(event) => onChangeText(entry.dayId, event.target.value)}
        />

        <span className={styles.counter}>
          {entry.responseText.length}/{JOURNAL_MAX_LENGTH}
        </span>
      </div>

      <div className={styles.footer}>
        <p className={cx(styles.status, styles[status])} role="status">
          <span className={styles.dot} aria-hidden="true" />
          {status === 'error' ? (
            <>
              Couldn’t save.
              <button type="button" className={styles.retry} onClick={() => void saveNow()}>
                Retry
              </button>
            </>
          ) : (
            STATUS_LABELS[status]
          )}
        </p>

        <button type="submit" className={styles.saveButton} disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save entry'}
        </button>
      </div>
    </form>
  );
}
