import { useCallback, useEffect, useRef, useState } from 'react';
import { DatabaseZap, MessageSquare, RotateCcw, Table2 } from 'lucide-react';
import { useMonaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import type { TaskResponse } from '@itp/types';
import ConfirmDialog from '../../components/ConfirmDialog';
import ResultPaneFrame from '../../components/ResultPaneFrame';
import { useEditorRef } from '../../pages/TaskPage/state/EditorContext';
import { useWorkspaceState } from '../../pages/TaskPage/state/WorkspaceContext';
import { useRegisterRunner } from '../runnerContext';
import SqlMessages from './SqlMessages';
import SqlResults from './SqlResults';
import { useSqlDatabase } from './useSqlDatabase';
import { useSqlRunner, type SqlRun } from './useSqlRunner';
import styles from './SqlRuntime.module.css';

// isVisible is accepted and not used: nothing here needs to measure itself.
type SqlRuntimeProps = { task: TaskResponse; isVisible: boolean };

const MARKER_OWNER = 'sql-run';
const MARKER_SEVERITY_ERROR = 8; // monaco.MarkerSeverity.Error

/** Failed runs since the last successful one (the Messages badge) */
function failedSinceSuccess(history: SqlRun[]): number {
  let count = 0;
  for (const run of history) {
    if (run.result?.ok) break;
    count += 1;
  }
  return count;
}

function footerText(run: SqlRun | null): string {
  if (!run?.result) return 'No runs yet.';
  if (!run.result.ok) return `Last run failed · ${run.result.durationMs} ms`;
  const count = run.result.results.length;
  return `Last run: ${count} ${count === 1 ? 'statement' : 'statements'} · ${run.result.durationMs} ms`;
}

export default function SqlRuntime({ task }: SqlRuntimeProps) {
  const database = useSqlDatabase(task.setupSql);
  const runner = useSqlRunner(database.status === 'ready' ? database.db : null);
  const editorRef = useEditorRef();
  const monaco = useMonaco();
  const { activePath, files } = useWorkspaceState();

  const [activeTab, setActiveTab] = useState('results');
  const [selection, setSelection] = useState<{ path: string | null; hasSelection: boolean }>({
    path: null,
    hasSelection: false,
  });
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [seenRun, setSeenRun] = useState<SqlRun | null>(null);
  const markedModelRef = useRef<editor.ITextModel | null>(null);
  const ranModelRef = useRef<editor.ITextModel | null>(null);

  const isSqlFile = activePath?.toLowerCase().endsWith('.sql') ?? false;
  const hasSelection = selection.path === activePath && selection.hasSelection;

  // Label follows the selection: "Run selection" while some SQL is selected.
  useEffect(() => {
    const path = activePath;
    let selectionListener: { dispose: () => void } | null = null;
    let creationListener: { dispose: () => void } | null = null;

    const attach = (codeEditor: editor.ICodeEditor) => {
      selectionListener = codeEditor.onDidChangeCursorSelection((event) => {
        setSelection({ path, hasSelection: !event.selection.isEmpty() });
      });
    };

    if (editorRef.current) {
      attach(editorRef.current);
    } else if (monaco) {
      // Monaco loads asynchronously: the editor may not exist yet when this runs.
      creationListener = monaco.editor.onDidCreateEditor((codeEditor) => {
        creationListener?.dispose();
        attach(codeEditor);
      });
    }

    return () => {
      selectionListener?.dispose();
      creationListener?.dispose();
    };
  }, [editorRef, activePath, monaco]);

  const clearMarkers = useCallback(() => {
    const model = markedModelRef.current;
    if (monaco && model && !model.isDisposed())
      monaco.editor.setModelMarkers(model, MARKER_OWNER, []);
    markedModelRef.current = null;
  }, [monaco]);

  const run = useCallback(() => {
    if (!activePath || !isSqlFile) return;
    const codeEditor = editorRef.current;
    const model = codeEditor?.getModel() ?? null;
    const currentSelection = codeEditor?.getSelection() ?? null;
    const fileText = model?.getValue() ?? files[activePath] ?? '';

    clearMarkers();
    ranModelRef.current = model;
    if (model && currentSelection && !currentSelection.isEmpty()) {
      // Only the selected SQL runs; its start offset maps error positions back to the file.
      void runner.run({
        fileText,
        text: model.getValueInRange(currentSelection),
        selectionStartOffset: model.getOffsetAt(currentSelection.getStartPosition()),
        ranSelection: true,
      });
    } else {
      void runner.run({ fileText, text: fileText, selectionStartOffset: 0, ranSelection: false });
    }
  }, [activePath, isSqlFile, editorRef, files, clearMarkers, runner]);

  // After each run: show the matching tab (done during render, not in an effect)…
  const lastRun = runner.lastRun;
  if (lastRun !== seenRun) {
    setSeenRun(lastRun);
    if (lastRun) setActiveTab(lastRun.result?.ok ? 'results' : 'messages');
  }

  // …and underline the error in the editor. Markers are outside React, so this one is an effect.
  useEffect(() => {
    const model = ranModelRef.current;
    if (!monaco || !lastRun?.location || !model || model.isDisposed()) return;
    const { line, column } = lastRun.location;
    monaco.editor.setModelMarkers(model, MARKER_OWNER, [
      {
        severity: MARKER_SEVERITY_ERROR,
        message: lastRun.result && !lastRun.result.ok ? lastRun.result.error.message : 'SQL error',
        startLineNumber: line,
        startColumn: column,
        endLineNumber: line,
        endColumn: column + 1,
      },
    ]);
    markedModelRef.current = model;
  }, [lastRun, monaco]);

  const isStarting = database.status === 'starting';
  let canRun = false;
  let label = 'Run SQL';
  let title: string;
  if (database.status === 'starting') title = 'Starting the database…';
  else if (database.status === 'failed') title = database.message;
  else if (!isSqlFile) title = 'Open a .sql file to run it';
  else if (runner.isRunning) title = 'Running…';
  else if (hasSelection) {
    canRun = true;
    label = 'Run selection';
    title = 'Run the selected SQL (Ctrl+Enter)';
  } else {
    canRun = true;
    title = 'Run the whole file (Ctrl+Enter)';
  }

  useRegisterRunner({ canRun, label, title, isRunning: runner.isRunning || isStarting, run });

  async function confirmReset() {
    setIsResetting(true);
    try {
      await database.reset();
      clearMarkers();
    } finally {
      setIsResetting(false);
      setIsResetOpen(false);
    }
  }

  const errorBadge = failedSinceSuccess(runner.history);

  const toolbarEnd = (
    <div className={styles.toolbar}>
      {database.status === 'starting' && (
        <span className={styles.pill}>
          <span className={styles.spinner} aria-hidden="true" />
          Starting database…
        </span>
      )}
      {database.status === 'ready' && (
        <span className={`${styles.pill} ${styles.pillReady}`}>
          <span className={styles.dot} aria-hidden="true" />
          Database ready
        </span>
      )}
      {database.status === 'failed' && (
        <span className={`${styles.pill} ${styles.pillFailed}`} title={database.message}>
          Database failed
          <button type="button" className={styles.retry} onClick={database.retry}>
            <RotateCcw size={12} aria-hidden="true" />
            Retry
          </button>
        </span>
      )}
      <button
        type="button"
        className={styles.iconButton}
        aria-label="Reset database"
        title="Reset database"
        disabled={isStarting}
        onClick={() => setIsResetOpen(true)}
      >
        <DatabaseZap size={14} aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <>
      <ResultPaneFrame
        tabs={[
          { id: 'results', label: 'Results', icon: Table2 },
          {
            id: 'messages',
            label: 'Messages',
            icon: MessageSquare,
            badge: errorBadge > 0 ? { text: String(errorBadge), tone: 'error' } : undefined,
          },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        toolbarEnd={toolbarEnd}
        footer={
          <span className={styles.footer}>
            <span className={styles.systemTag}>[System]</span> {footerText(lastRun)}
          </span>
        }
      >
        {activeTab === 'results' ? (
          <SqlResults run={lastRun} />
        ) : (
          <SqlMessages history={runner.history} />
        )}
      </ResultPaneFrame>

      <ConfirmDialog
        open={isResetOpen}
        title="Reset your database?"
        confirmLabel="Reset database"
        tone="danger"
        isConfirming={isResetting}
        onConfirm={() => void confirmReset()}
        onCancel={() => setIsResetOpen(false)}
      >
        This deletes every table and row in this task&apos;s database and starts again from the
        task&apos;s setup. Your .sql files are not affected.
      </ConfirmDialog>
    </>
  );
}
