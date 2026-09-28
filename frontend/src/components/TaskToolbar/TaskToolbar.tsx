import type { ReactNode } from 'react';
import { ArrowLeft, Timer, Play } from 'lucide-react';
import type { PaneId } from '../../types/workspaceTypes';
import ViewToggleGroup from '../ViewToggleGroup';
import { formatMinutes } from '../../lib/formatMinutes';
import styles from './TaskToolbar.module.css';

export type TaskToolbarProps = {
  estimatedMinutes: number | null;
  visiblePanes: Record<PaneId, boolean>;
  onTogglePane: (pane: PaneId) => void;
  onBack: () => void;
  onRun: () => void;
  canRun: boolean;
  saveIndicator: ReactNode;
  submitSlot: ReactNode;
};

export default function TaskToolbar({
  estimatedMinutes,
  visiblePanes,
  onTogglePane,
  onBack,
  onRun,
  canRun,
  saveIndicator,
  submitSlot,
}: TaskToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <button type="button" className={styles.backButton} onClick={onBack}>
        <ArrowLeft size={16} aria-hidden="true" />
        Back to tasks
      </button>

      {estimatedMinutes !== null && (
        <span className={styles.estimatePill}>
          <Timer size={14} aria-hidden="true" />
          Est: {formatMinutes(estimatedMinutes)}
        </span>
      )}

      <div className={styles.spacer} />

      <ViewToggleGroup visiblePanes={visiblePanes} onToggle={onTogglePane} />

      <div className={styles.divider} aria-hidden="true" />

      <button
        type="button"
        className={styles.runButton}
        onClick={onRun}
        disabled={!canRun}
        title={canRun ? 'Run (Ctrl+Enter)' : 'Add an .html file to run'}
      >
        <Play size={14} aria-hidden="true" />
        Run
      </button>

      {saveIndicator}
      {submitSlot}
    </div>
  );
}
