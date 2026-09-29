import { useCallback, useEffect, useRef, useState } from 'react';
import type { WebContainerProcess } from '@webcontainer/api';
import type { Terminal } from '@xterm/xterm';
import { isChromium, isCrossOriginIsolated } from '../../lib/crossOriginIsolation';
import { createFileSync, type FileSync, type FileSyncCallbacks } from './fileSync';
import { getWebContainer, resetWorkspace } from './webcontainerService';

export type NodeSessionStatus = 'unsupported' | 'booting' | 'installing' | 'ready' | 'error';

type UseNodeSessionOptions = {
  enabled: boolean; // false until the terminal exists
  initialFiles: Record<string, string>;
  terminal: Terminal | null; // from TerminalView
  callbacks: FileSyncCallbacks; // from Blueprint 3
};

type UseNodeSessionResult = {
  status: NodeSessionStatus;
  errorMessage: string | null;
  fileSync: FileSync | null;
  runCommand: (command: string) => void;
  resize: (cols: number, rows: number) => void;
  retry: () => void;
};

const YELLOW = '\x1b[33m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';
const CTRL_C = '\x03';
const COMMAND_DELAY_MS = 150;

type Progress = {
  attempt: number;
  status: 'installing' | 'ready' | 'error';
  errorMessage: string | null;
  fileSync: FileSync | null;
};

/** true when package.json lists anything to install */
function hasDependencies(packageJson: string | undefined): boolean {
  if (!packageJson) return false;
  try {
    const parsed = JSON.parse(packageJson) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    return (
      Object.keys(parsed.dependencies ?? {}).length > 0 ||
      Object.keys(parsed.devDependencies ?? {}).length > 0
    );
  } catch {
    return false; // a broken package.json: npm will say so when the trainee runs it
  }
}

function pipeToTerminal(process: WebContainerProcess, terminal: Terminal): void {
  process.output
    .pipeTo(new WritableStream({ write: (data) => terminal.write(data) }))
    .catch(() => {}); // the stream ends with an error when the process is killed
}

export function useNodeSession({
  enabled,
  initialFiles,
  terminal,
  callbacks,
}: UseNodeSessionOptions): UseNodeSessionResult {
  // Decided once: the browser doesn't change while the page is open.
  const [isSupported] = useState(() => isCrossOriginIsolated() && isChromium());
  const [attempt, setAttempt] = useState(0);
  // Progress belongs to one attempt; a newer attempt (Retry) starts as 'booting' again without a
  // setState in the effect body (same pattern as useTaskData / useSqlDatabase).
  const [progress, setProgress] = useState<Progress | null>(null);

  const callbacksRef = useRef(callbacks);
  const initialFilesRef = useRef(initialFiles);
  useEffect(() => {
    callbacksRef.current = callbacks;
  });

  const shellRef = useRef<WebContainerProcess | null>(null);
  const writerRef = useRef<WritableStreamDefaultWriter<string> | null>(null);
  const commandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isSupported || !enabled || !terminal) return;

    let isCancelled = false;
    let install: WebContainerProcess | null = null;
    let shell: WebContainerProcess | null = null;
    let fileSync: FileSync | null = null;
    let dataSubscription: { dispose: () => void } | null = null;
    const report = (next: Omit<Progress, 'attempt'>) => {
      if (!isCancelled) setProgress({ attempt, ...next });
    };

    async function start(term: Terminal) {
      const size = () => ({ cols: term.cols, rows: term.rows });
      term.write(`${DIM}Starting Node…${RESET}\r\n`);

      const wc = await getWebContainer();
      if (isCancelled) return;
      await resetWorkspace(wc, initialFilesRef.current);
      if (isCancelled) return;
      fileSync = createFileSync(wc, initialFilesRef.current, {
        onRemoteChange: (path, content) => callbacksRef.current.onRemoteChange(path, content),
        onRemoteDelete: (path) => callbacksRef.current.onRemoteDelete(path),
        onSkipped: (path, reason) => callbacksRef.current.onSkipped(path, reason),
      });

      if (hasDependencies(initialFilesRef.current['package.json'])) {
        report({ status: 'installing', errorMessage: null, fileSync });
        install = await wc.spawn('npm', ['install'], { terminal: size() });
        if (isCancelled) return;
        pipeToTerminal(install, term);
        const exitCode = await install.exit;
        install = null;
        if (isCancelled) return;
        if (exitCode !== 0) {
          term.write(
            `\r\n${YELLOW}npm install failed — fix package.json and run npm install again${RESET}\r\n`
          );
        }
      }

      shell = await wc.spawn('jsh', { terminal: size() });
      if (isCancelled) return;
      pipeToTerminal(shell, term);
      const writer = shell.input.getWriter();
      dataSubscription = term.onData((data) => {
        void writer.write(data);
      });
      shellRef.current = shell;
      writerRef.current = writer;

      report({ status: 'ready', errorMessage: null, fileSync });
    }

    start(terminal).catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      terminal.write(`\r\n${YELLOW}Node couldn't start: ${message}${RESET}\r\n`);
      report({ status: 'error', errorMessage: `Node couldn't start: ${message}`, fileSync: null });
    });

    return () => {
      isCancelled = true;
      // Kill this task's processes, but keep WebContainer itself (booting again takes seconds).
      install?.kill();
      shell?.kill();
      fileSync?.dispose();
      dataSubscription?.dispose();
      writerRef.current?.releaseLock();
      writerRef.current = null;
      shellRef.current = null;
      if (commandTimerRef.current) clearTimeout(commandTimerRef.current);
    };
  }, [isSupported, enabled, terminal, attempt]);

  const runCommand = useCallback((command: string) => {
    const writer = writerRef.current;
    if (!writer) return;
    // Ctrl+C first stops a running server; then the command appears as if the trainee typed it.
    void writer.write(CTRL_C);
    if (commandTimerRef.current) clearTimeout(commandTimerRef.current);
    commandTimerRef.current = setTimeout(() => {
      void writerRef.current?.write(`${command}\n`);
    }, COMMAND_DELAY_MS);
  }, []);

  const resize = useCallback((cols: number, rows: number) => {
    shellRef.current?.resize({ cols, rows });
  }, []);

  const retry = useCallback(() => setAttempt((current) => current + 1), []);

  if (!isSupported) {
    return {
      status: 'unsupported',
      errorMessage: null,
      fileSync: null,
      runCommand,
      resize,
      retry,
    };
  }
  const current = progress && progress.attempt === attempt ? progress : null;
  return {
    status: current?.status ?? 'booting',
    errorMessage: current?.errorMessage ?? null,
    fileSync: current?.fileSync ?? null,
    runCommand,
    resize,
    retry,
  };
}
