import { useMemo, useRef, useState } from 'react';
import { CircleAlert, Eye, FileCode2, Lock, RefreshCw, SquareTerminal } from 'lucide-react';
import type { TaskResponse } from '@itp/types';
import ResultPaneFrame from '../../components/ResultPaneFrame';
import { isIgnoredPath } from '../../lib/workspaceIgnore';
import { selectHtmlEntry } from '../../pages/TaskPage/state/selectors';
import { useWorkspaceState } from '../../pages/TaskPage/state/WorkspaceContext';
import { useRegisterRunner } from '../runnerContext';
import { NO_ENTRY_MESSAGE, type PreviewBuild } from './buildPreviewDocument';
import ConsolePanel from './ConsolePanel';
import PreviewFrame from './PreviewFrame';
import { PREVIEW_URL_PREFIX } from './previewPolicy';
import { usePreview } from './usePreview';
import styles from './BrowserRuntime.module.css';

type BrowserRuntimeProps = { task: TaskResponse; isVisible: boolean };

type GoodBuild = Extract<PreviewBuild, { ok: true }>;

function statusText(build: PreviewBuild | null, isRunning: boolean): string {
  if (isRunning) return 'Building…';
  if (!build) return 'Waiting for the first run.';
  if (!build.ok)
    return build.reason === 'NO_ENTRY' ? NO_ENTRY_MESSAGE : 'Build failed — see Console';
  const count = build.inlined.length;
  return `Build complete: ${count} ${count === 1 ? 'file' : 'files'} bundled (${build.durationMs} ms).`;
}

export default function BrowserRuntime({ task, isVisible }: BrowserRuntimeProps) {
  const state = useWorkspaceState();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {
    build,
    entryPath,
    entries,
    errorCount,
    isDomReady,
    isRunning,
    run,
    setEntryPath,
    clearConsole,
    resetStorage,
  } = usePreview({
    taskId: task.id,
    files: state.files,
    defaultEntry: selectHtmlEntry(state),
    isVisible,
    iframeRef,
  });

  const [activeTab, setActiveTab] = useState('result');
  const [seenBuild, setSeenBuild] = useState<PreviewBuild | null>(null);
  const [lastGoodBuild, setLastGoodBuild] = useState<GoodBuild | null>(null);

  // React to each new build once, during render (no effect needed): remember the last good
  // preview, and show the Console when a build fails.
  if (build !== seenBuild) {
    setSeenBuild(build);
    if (build?.ok) setLastGoodBuild(build);
    else if (build?.reason === 'BUILD_ERROR') setActiveTab('console');
  }

  const htmlPaths = useMemo(
    () =>
      Object.keys(state.files)
        .filter((path) => path.endsWith('.html') && !isIgnoredPath(path))
        .sort(),
    [state.files]
  );

  const canRun = entryPath !== null && !isRunning;

  useRegisterRunner({
    canRun,
    label: 'Run',
    title: entryPath ? 'Run (Ctrl+Enter)' : 'Add an .html file to run',
    isRunning,
    run,
  });

  const isBuildError = build?.ok === false && build.reason === 'BUILD_ERROR';

  const toolbarEnd = (
    <div className={styles.toolbar}>
      <div className={styles.urlField}>
        <Lock size={13} aria-hidden="true" className={styles.lockIcon} />
        <select
          className={styles.urlSelect}
          aria-label="Preview page"
          value={entryPath ?? ''}
          disabled={htmlPaths.length === 0}
          onChange={(event) => {
            setEntryPath(event.target.value);
            run();
          }}
        >
          {htmlPaths.length === 0 && <option value="">{PREVIEW_URL_PREFIX}</option>}
          {htmlPaths.map((path) => (
            <option key={path} value={path}>
              {PREVIEW_URL_PREFIX + path}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className={styles.iconButton}
        aria-label="Reload preview"
        title="Reload preview"
        disabled={!canRun}
        onClick={run}
      >
        <RefreshCw size={14} aria-hidden="true" />
      </button>
    </div>
  );

  const footer = (
    <div className={styles.footer}>
      <span className={isBuildError ? `${styles.status} ${styles.statusError}` : styles.status}>
        <span className={styles.systemTag}>[System]</span> {statusText(build, isRunning)}
      </span>
      {build?.ok && (
        <span className={isDomReady ? `${styles.ready} ${styles.readyDone}` : styles.ready}>
          <span className={styles.dot} aria-hidden="true" />
          {isDomReady ? 'DOM Ready' : 'Loading…'}
        </span>
      )}
    </div>
  );

  return (
    <ResultPaneFrame
      tabs={[
        { id: 'result', label: 'Result', icon: Eye },
        {
          id: 'console',
          label: 'Console',
          icon: SquareTerminal,
          badge: errorCount > 0 ? { text: String(errorCount), tone: 'error' } : undefined,
        },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      toolbarEnd={toolbarEnd}
      footer={footer}
    >
      {/* Both views stay mounted so switching tabs doesn't reload the preview. */}
      <div
        className={styles.view}
        role="tabpanel"
        aria-label="Result"
        hidden={activeTab !== 'result'}
      >
        {entryPath === null ? (
          <div className={styles.empty}>
            <FileCode2 size={28} aria-hidden="true" />
            <p>{NO_ENTRY_MESSAGE}</p>
          </div>
        ) : (
          <>
            {isBuildError && (
              <div className={styles.banner}>
                <CircleAlert size={14} aria-hidden="true" />
                Build failed — see Console for details.
              </div>
            )}
            {lastGoodBuild ? (
              <div className={styles.frameArea}>
                <PreviewFrame
                  srcdoc={lastGoodBuild.srcdoc}
                  runId={lastGoodBuild.runId}
                  entryPath={lastGoodBuild.entryPath}
                  iframeRef={iframeRef}
                />
              </div>
            ) : (
              !isBuildError && (
                <div className={styles.empty}>
                  <p>{isRunning ? 'Building your page…' : 'Press Run to see your page.'}</p>
                </div>
              )
            )}
          </>
        )}
      </div>
      <div
        className={styles.view}
        role="tabpanel"
        aria-label="Console"
        hidden={activeTab !== 'console'}
      >
        <ConsolePanel entries={entries} onClear={clearConsole} onResetStorage={resetStorage} />
      </div>
    </ResultPaneFrame>
  );
}
