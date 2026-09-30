import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Globe, Monitor, RotateCcw, SquareTerminal } from 'lucide-react';
import type { Terminal } from '@xterm/xterm';
import type { TaskResponse } from '@itp/types';
import ResultPaneFrame from '../../components/ResultPaneFrame';
import {
  useWorkspaceDispatch,
  useWorkspaceState,
} from '../../pages/TaskPage/state/WorkspaceContext';
import { useRegisterRunner } from '../runnerContext';
import type { FileSyncCallbacks } from './fileSync';
import NodePreview from './NodePreview';
import { useNodeSession, type NodeSessionStatus } from './useNodeSession';
import { getWebContainer } from './webcontainerService';
import styles from './NodeRuntime.module.css';
import { useMarkWork } from '../../pages/TaskPage/state/WorkActivityContext';

type NodeRuntimeProps = { task: TaskResponse; isVisible: boolean };

// xterm is only downloaded for Node tasks (and doesn't touch <canvas> on other pages or in tests).
const TerminalView = lazy(() => import('./TerminalView'));

const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const UNSUPPORTED_TITLE = 'Node tasks need Chrome or Edge';

function runnerFor(
  status: NodeSessionStatus,
  runCommand: string | null,
  errorMessage: string | null
): { canRun: boolean; label: string; title: string } {
  switch (status) {
    case 'booting':
      return { canRun: false, label: 'Run', title: 'Starting Node…' };
    case 'installing':
      return { canRun: false, label: 'Run', title: 'Installing packages…' };
    case 'ready':
      return runCommand
        ? { canRun: true, label: `Run: ${runCommand}`, title: 'Run (Ctrl+Enter)' }
        : { canRun: false, label: 'Run', title: 'Use the terminal for this task' };
    case 'unsupported':
      return { canRun: false, label: 'Run', title: UNSUPPORTED_TITLE };
    case 'error':
      return { canRun: false, label: 'Run', title: errorMessage ?? "Node couldn't start" };
  }
}

export default function NodeRuntime({ task, isVisible }: NodeRuntimeProps) {
  const state = useWorkspaceState();
  const dispatch = useWorkspaceDispatch();
  const markWork = useMarkWork();

  // The files at mount are what WebContainer starts from; later edits reach it through the sync.
  const [initialFiles] = useState(() => state.files);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [activeTab, setActiveTab] = useState('terminal');
  const [server, setServer] = useState<{ port: number; url: string } | null>(null);
  useEffect(() => {
    if (!terminal) return;
    const subscription = terminal.onData(() => markWork());
    return () => subscription.dispose();
  }, [terminal, markWork]);

  const filesRef = useRef(state.files);
  useEffect(() => {
    filesRef.current = state.files;
  });

  const callbacks = useMemo<FileSyncCallbacks>(
    () => ({
      // FE-03's model sync then updates any open editor tab for this file.
      onRemoteChange: (path, content) =>
        dispatch(
          path in filesRef.current
            ? { type: 'fileEdited', path, content }
            : { type: 'fileCreated', path, content, open: false }
        ),
      onRemoteDelete: (path) => dispatch({ type: 'fileDeleted', path }),
      onSkipped: (path, reason) =>
        terminal?.write(
          `\r\n${YELLOW}${path} ${
            reason === 'too-large' ? 'is over 200,000 characters' : 'is not a text file'
          } and won't be saved${RESET}\r\n`
        ),
    }),
    [dispatch, terminal]
  );

  const session = useNodeSession({
    enabled: terminal !== null,
    initialFiles,
    terminal,
    callbacks,
  });
  const { status, fileSync, runCommand, resize, retry, errorMessage } = session;

  // Editor → Node: every workspace change goes through the sync (it skips what's unchanged).
  useEffect(() => {
    fileSync?.pushFromWorkspace(state.files);
  }, [state.files, fileSync]);

  // A server in the trainee's code shows a Preview tab while its port is open.
  useEffect(() => {
    if (status !== 'ready') return;
    let isCancelled = false;
    const unsubscribes: Array<() => void> = [];

    void getWebContainer().then((wc) => {
      if (isCancelled) return;
      unsubscribes.push(
        wc.on('server-ready', (port, url) => {
          setServer({ port, url });
          setActiveTab('preview');
        }),
        wc.on('port', (port, type) => {
          if (type === 'close') setServer((current) => (current?.port === port ? null : current));
        })
      );
    });

    return () => {
      isCancelled = true;
      for (const unsubscribe of unsubscribes) unsubscribe();
    };
  }, [status]);

  const { canRun, label, title } = runnerFor(status, task.runCommand, errorMessage);
  const run = useCallback(() => {
    if (!task.runCommand) return;
    setActiveTab('terminal');
    runCommand(task.runCommand);
    terminal?.focus();
  }, [task.runCommand, runCommand, terminal]);

  useRegisterRunner({
    canRun,
    label,
    title,
    isRunning: status === 'booting' || status === 'installing',
    run,
  });

  // The Preview tab disappears when the server stops.
  const shownTab = server ? activeTab : 'terminal';

  const pill =
    status === 'ready' ? (
      <span className={`${styles.pill} ${styles.pillReady}`}>
        <span className={styles.dot} aria-hidden="true" />
        Node ready
      </span>
    ) : status === 'installing' ? (
      <span className={styles.pill}>
        <span className={styles.spinner} aria-hidden="true" />
        Installing…
      </span>
    ) : status === 'booting' ? (
      <span className={styles.pill}>
        <span className={styles.spinner} aria-hidden="true" />
        Starting…
      </span>
    ) : null;

  let body;
  if (status === 'unsupported') {
    body = (
      <div className={styles.card} role="alert">
        <Monitor size={28} aria-hidden="true" />
        <p className={styles.cardTitle}>{UNSUPPORTED_TITLE}</p>
        <p className={styles.cardText}>
          This task runs Node.js inside your browser, which currently works only in Chromium-based
          browsers.
        </p>
      </div>
    );
  } else {
    body = (
      <>
        {status === 'error' && (
          <div className={styles.errorBanner} role="alert">
            <span>{errorMessage}</span>
            <button type="button" className={styles.retry} onClick={retry}>
              <RotateCcw size={12} aria-hidden="true" />
              Retry
            </button>
          </div>
        )}
        {/* Kept mounted (hidden) while Preview shows: the terminal keeps its history and shell. */}
        <div className={styles.view} hidden={shownTab !== 'terminal'}>
          <Suspense fallback={null}>
            <TerminalView
              taskId={task.id}
              isVisible={isVisible && shownTab === 'terminal'}
              onReady={setTerminal}
              onResize={resize}
            />
          </Suspense>
        </div>
        {server && (
          <div className={styles.view} hidden={shownTab !== 'preview'}>
            <NodePreview url={server.url} port={server.port} />
          </div>
        )}
      </>
    );
  }

  return (
    <ResultPaneFrame
      tabs={[
        { id: 'terminal', label: 'Terminal', icon: SquareTerminal },
        ...(server
          ? [
              {
                id: 'preview',
                label: 'Preview',
                icon: Globe,
                badge: { text: `:${server.port}`, tone: 'neutral' as const },
              },
            ]
          : []),
      ]}
      activeTab={shownTab}
      onTabChange={setActiveTab}
      toolbarEnd={pill}
    >
      <div className={styles.body}>{body}</div>
    </ResultPaneFrame>
  );
}
