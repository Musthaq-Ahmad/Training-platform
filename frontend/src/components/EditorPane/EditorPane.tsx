import { useState } from 'react';
import { Files } from 'lucide-react';
import { getFileType } from '../../lib/fileTypes';
import { MAX_FILE_CHARS } from '../../lib/workspaceIgnore';
import { selectDirtyPaths } from '../../pages/TaskPage/state/selectors';
import { useMonacoModels } from '../../pages/TaskPage/hooks/useMonacoModels';
import {
  useWorkspaceDispatch,
  useWorkspaceState,
} from '../../pages/TaskPage/state/WorkspaceContext';
import CodeEditor from '../CodeEditor';
import EditorStatusBar from '../EditorStatusBar';
import EditorTabs from '../EditorTabs';
import styles from './EditorPane.module.css';
import { useMarkWork } from '../../pages/TaskPage/state/WorkActivityContext';

type EditorPaneProps = {
  taskId: string;
  onSave: () => void;
  onRun: () => void;
};

export default function EditorPane({ taskId, onSave, onRun }: EditorPaneProps) {
  const state = useWorkspaceState();
  const markWork = useMarkWork();
  const dispatch = useWorkspaceDispatch();

  // Reset to 1:1 when the active path changes. Adjusting state during render
  // (guarded by comparing against the last-seen path) avoids an extra committed
  // render that a `useEffect` would cause.
  const [cursorState, setCursorState] = useState({
    path: state.activePath,
    line: 1,
    column: 1,
  });
  if (cursorState.path !== state.activePath) {
    setCursorState({ path: state.activePath, line: 1, column: 1 });
  }
  const cursor = cursorState;
  const setCursor = (next: { line: number; column: number }) =>
    setCursorState({ path: state.activePath, ...next });

  useMonacoModels(state.files);

  const dirtyPaths = new Set(selectDirtyPaths(state));
  const activeContent = state.activePath ? state.files[state.activePath] : undefined;
  const fileType = state.activePath ? getFileType(state.activePath) : null;

  return (
    <div className={styles.pane}>
      <EditorTabs
        openPaths={state.openPaths}
        activePath={state.activePath}
        dirtyPaths={dirtyPaths}
        onActivate={(path) => dispatch({ type: 'tabActivated', path })}
        onClose={(path) => dispatch({ type: 'tabClosed', path })}
        onCloseAll={() => dispatch({ type: 'allTabsClosed' })}
      />

      {!state.activePath || activeContent === undefined ? (
        <div className={styles.empty}>
          <Files size={28} aria-hidden="true" />
          <p>Select a file from the Files panel</p>
          <button
            type="button"
            className={styles.emptyAction}
            onClick={() => dispatch({ type: 'sidebarTabChanged', tab: 'files' })}
          >
            Open Files panel
          </button>
        </div>
      ) : fileType && !fileType.isText ? (
        <div className={styles.empty}>
          <p>Images can&rsquo;t be edited here.</p>
        </div>
      ) : (
        <CodeEditor
          taskId={taskId}
          path={state.activePath}
          onChange={(path, content) => {
            markWork();
            dispatch({ type: 'fileEdited', path, content });
          }}
          onCursorChange={(line, column) => {
            markWork();
            setCursor({ line, column });
          }}
          onSave={onSave}
          onRun={onRun}
        />
      )}

      <EditorStatusBar
        languageLabel={fileType?.isText ? fileType.label : null}
        line={cursor.line}
        column={cursor.column}
        isTooLarge={(activeContent?.length ?? 0) > MAX_FILE_CHARS}
      />
    </div>
  );
}
