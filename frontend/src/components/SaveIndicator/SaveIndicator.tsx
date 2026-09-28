import { useState } from 'react';
import { WifiOff, AlertCircle } from 'lucide-react';
import type { SaveState, SaveStatus } from '../../pages/TaskPage/hooks/useAutosave';
import styles from './SaveIndicator.module.css';

type SaveIndicatorProps = {
  state: SaveState;
  onRetry: () => void;
};

const ANNOUNCED_STATUSES = new Set<SaveStatus>(['offline', 'error', 'blocked', 'saved']);

function formatTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function computeAnnouncement(state: SaveState): string {
  switch (state.status) {
    case 'offline':
      return "Offline. Changes will save when you're back online.";
    case 'error':
      return 'Save failed.';
    case 'blocked':
      return state.message ?? 'Save blocked.';
    case 'saved':
      return 'Saved.';
    default:
      return '';
  }
}

export default function SaveIndicator({ state, onRetry }: SaveIndicatorProps) {
  // Only offline/error/blocked/saved get announced — dirty/saving flicker too
  // often to read aloud on every keystroke. Adjusting during render (guarded)
  // instead of an effect avoids an extra committed frame per status change.
  const [announcement, setAnnouncement] = useState('');
  if (ANNOUNCED_STATUSES.has(state.status)) {
    const next = computeAnnouncement(state);
    if (next !== announcement) setAnnouncement(next);
  }

  return (
    <div className={styles.indicator}>
      {renderContent(state, onRetry)}
      <span className={styles.liveRegion} aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}

function renderContent(state: SaveState, onRetry: () => void) {
  switch (state.status) {
    case 'saved':
      return (
        <span
          className={styles.row}
          title={state.lastSavedAt ? `Saved at ${formatTime(state.lastSavedAt)}` : undefined}
        >
          <span className={`${styles.dot} ${styles.dotSuccess}`} aria-hidden="true" />
          <span className={styles.textSaved}>Saved</span>
        </span>
      );

    case 'dirty':
      return (
        <span className={styles.row}>
          <span className={`${styles.dot} ${styles.dotWarning}`} aria-hidden="true" />
          <span>Unsaved</span>
        </span>
      );

    case 'saving':
      return (
        <span className={styles.row}>
          <span className={styles.spinner} aria-hidden="true" />
          <span>Saving…</span>
        </span>
      );

    case 'offline':
      return (
        <span className={styles.row} title="Changes will save when you're back online">
          <WifiOff size={14} className={styles.iconWarning} aria-hidden="true" />
          <span>Offline</span>
        </span>
      );

    case 'error':
      return (
        <span className={styles.row}>
          <AlertCircle size={14} className={styles.iconError} aria-hidden="true" />
          <span>Save failed</span>
          <button type="button" className={styles.retryButton} onClick={onRetry}>
            Retry
          </button>
        </span>
      );

    case 'blocked':
      return (
        <span className={styles.row} title={state.message ?? undefined}>
          <AlertCircle size={14} className={styles.iconError} aria-hidden="true" />
          <span className={styles.truncate}>{state.message}</span>
        </span>
      );
  }
}
