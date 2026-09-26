import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import type { TaskResponse } from '@itp/types';
import { selectHtmlEntry } from '../../pages/TaskPage/state/selectors';
import type { PaneId } from '../../types/workspaceTypes';
import {
  useWorkspaceDispatch,
  useWorkspaceState,
} from '../../pages/TaskPage/state/WorkspaceContext';
import TaskToolbar from '../TaskToolbar';
import styles from './TaskWorkspace.module.css';

type TaskWorkspaceProps = {
  task: TaskResponse;
};

// Stubbed until TK-6 (autosave) and TK-7 (preview) land — same shape the real hooks return.
const stubAutosave = {
  async flush() {
    await Promise.resolve();
    return true;
  },
};
const stubPreview = { run: () => {} };

export default function TaskWorkspace({ task }: TaskWorkspaceProps) {
  const state = useWorkspaceState();
  const dispatch = useWorkspaceDispatch();
  const navigate = useNavigate();

  const canRun = selectHtmlEntry(state) !== null;

  const handleBack = useCallback(() => {
    void (async () => {
      await stubAutosave.flush();
      await navigate(`/days/${task.day.id}`);
    })();
  }, [navigate, task.day.id]);

  const handleRun = useCallback(() => {
    if (!state.visiblePanes.result) {
      dispatch({ type: 'paneToggled', pane: 'result' });
    }
    stubPreview.run();
  }, [dispatch, state.visiblePanes.result]);

  const handleTogglePane = useCallback(
    (pane: PaneId) => dispatch({ type: 'paneToggled', pane }),
    [dispatch]
  );

  const gridColumns = [
    state.visiblePanes.sidebar && '320px',
    state.visiblePanes.code && 'minmax(0, 1fr)',
    state.visiblePanes.result && 'minmax(0, 1fr)',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.workspace}>
      <TaskToolbar
        estimatedMinutes={task.estimatedMinutes}
        visiblePanes={state.visiblePanes}
        onTogglePane={handleTogglePane}
        onBack={handleBack}
        onRun={handleRun}
        canRun={canRun}
        saveIndicator={null}
        submitSlot={null}
      />
      <div className={styles.paneRow} style={{ gridTemplateColumns: gridColumns }}>
        {state.visiblePanes.sidebar && (
          <div className={styles.pane} data-testid="sidebar-pane">
            {/* TODO(TK-3): WorkspaceSidebar */}
          </div>
        )}
        {state.visiblePanes.code && (
          // TODO(TK-4): replace with the Monaco editor. Once real, keep this mounted and
          // hide with display:none on toggle instead of conditional rendering — unmounting
          // Monaco is expensive and would lose undo history.
          <div className={styles.pane} data-testid="code-pane">
            {/* TODO(TK-4): Monaco editor */}
          </div>
        )}
        {state.visiblePanes.result && (
          <div className={styles.pane} data-testid="result-pane">
            {/* TODO(TK-7): ResultPane */}
          </div>
        )}
      </div>
    </div>
  );
}
