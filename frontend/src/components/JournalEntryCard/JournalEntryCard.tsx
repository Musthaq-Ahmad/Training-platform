// frontend/src/pages/JournalPage/components/JournalEntryCard/JournalEntryCard.tsx
import { useState } from 'react';
import type { JournalEntry } from '@itp/types';
import Icon from '../Icon';
import { cx } from '../../lib/cx';
import {
  formatLongDate,
  formatLongDateTime,
  formatShortDate,
  formatTodayLabel,
} from '../../lib/formatDate';
import { renderInlineCode } from '../../lib/renderInlineCode';
import JournalEditor from '../JournalEditor';
import styles from './JournalEntryCard.module.css';

type JournalEntryCardProps = {
  entry: JournalEntry;
  isExpanded: boolean;
  onToggle: (dayId: string) => void;
  onChangeText: (dayId: string, responseText: string) => void;
};

export default function JournalEntryCard({
  entry,
  isExpanded,
  onToggle,
  onChangeText,
}: JournalEntryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const hasEntry = entry.responseText.trim() !== '';
  const isDimmed = !hasEntry && !entry.isEditable;
  const panelId = `journal-panel-${entry.dayId}`;
  const dayLabel = `${entry.trackLabel} DAY ${String(entry.dayNumber).padStart(2, '0')}`;

  const collapsedDate = entry.isEditable
    ? formatTodayLabel(entry.date)
    : formatShortDate(entry.date);

  let expandedDate = formatLongDate(entry.date);
  if (entry.isEditable) expandedDate = formatTodayLabel(entry.date);
  else if (entry.updatedAt) expandedDate = formatLongDateTime(entry.updatedAt);

  let previewText = 'No entry recorded for this day.';
  if (hasEntry) previewText = entry.responseText.replace(/`/g, '');
  else if (entry.isEditable) previewText = "Nothing written yet. Open to write today's entry.";

  function renderChips() {
    if (!isExpanded) {
      return entry.isEditable ? (
        <span className={cx(styles.chip, styles.chipAccent)}>Today</span>
      ) : null;
    }

    return null;
  }

  function renderBody() {
    if (entry.isEditable || isEditing) {
      return (
        <>
          <JournalEditor entry={entry} onChangeText={onChangeText} />
          {!entry.isEditable && (
            <div className={styles.editActions}>
              <button
                type="button"
                className={styles.editButton}
                onClick={() => setIsEditing(false)}
              >
                Done
              </button>
            </div>
          )}
        </>
      );
    }

    if (!hasEntry) {
      return <p className={styles.emptyNote}>No entry was recorded for this day.</p>;
    }

    return (
      <>
        <div className={styles.promptBlock}>
          <ol className={styles.prompts}>
            {entry.prompts.map((prompt, index) => (
              <li key={index} className={styles.promptItem}>
                <span className={styles.promptNumber}>{index + 1}</span>
                <h3 className={styles.promptText}>{prompt}</h3>
              </li>
            ))}
          </ol>
          <p className={styles.answer}>{renderInlineCode(entry.responseText)}</p>
        </div>
        <div className={styles.editActions}>
          <button
            type="button"
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
            aria-label={`Edit ${dayLabel} journal entry`}
          >
            Edit entry
          </button>
        </div>
      </>
    );
  }

  return (
    <li className={cx(styles.card, isExpanded && styles.expanded, isDimmed && styles.dimmed)}>
      <h2 className={styles.heading}>
        <button
          type="button"
          className={styles.header}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => onToggle(entry.dayId)}
        >
          <span className={styles.main}>
            <span className={styles.metaRow}>
              <span className={styles.dayLabel}>{dayLabel}</span>
              <span className={styles.date}>{isExpanded ? expandedDate : collapsedDate}</span>
            </span>
            <span className={styles.title}>{entry.title}</span>
            {!isExpanded && (
              <span className={cx(styles.preview, !hasEntry && styles.previewEmpty)}>
                {previewText}
              </span>
            )}
          </span>

          <span className={styles.actions}>
            {renderChips()}
            <Icon name="chevronDown" size={18} className={styles.chevron} />
          </span>
        </button>
      </h2>

      {isExpanded && (
        <div id={panelId} role="region" aria-label={`${dayLabel} entry`} className={styles.panel}>
          <hr className={styles.divider} />
          {renderBody()}
        </div>
      )}
    </li>
  );
}
