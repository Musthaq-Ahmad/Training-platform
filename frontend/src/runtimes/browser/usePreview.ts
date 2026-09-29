import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { buildPreviewDocument, type PreviewBuild } from './buildPreviewDocument';
import type { BuildIssue } from './esbuildService';
import { isPreviewMessage, type PreviewMessage } from './previewMessages';
import { resolvePath } from './resolvePath';

export type ConsoleLevel =
  'log' | 'info' | 'warn' | 'error' | 'debug' | 'runtime' | 'build' | 'system';
export type ConsoleEntry = {
  id: number;
  ts: number;
  level: ConsoleLevel;
  text: string;
  source?: string;
};

type UsePreviewOptions = {
  taskId: string;
  files: Record<string, string>;
  defaultEntry: string | null; // selectHtmlEntry(state)
  isVisible: boolean;
  iframeRef: RefObject<HTMLIFrameElement | null>;
};

type UsePreviewResult = {
  build: PreviewBuild | null;
  entryPath: string | null;
  entries: ConsoleEntry[];
  errorCount: number; // error + runtime + build entries
  isDomReady: boolean;
  isRunning: boolean;
  run: () => void;
  setEntryPath: (path: string) => void;
  clearConsole: () => void;
  resetStorage: () => void;
};

const MAX_ENTRIES = 1000;
const ERROR_LEVELS: ConsoleLevel[] = ['error', 'runtime', 'build'];

export function storageKey(taskId: string): string {
  return `itp.preview.storage.${taskId}`;
}

function readStoredStorage(taskId: string): Record<string, string> {
  try {
    const raw = window.localStorage.getItem(storageKey(taskId));
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter((pair): pair is [string, string] => typeof pair[1] === 'string')
    );
  } catch {
    return {};
  }
}

function writeStoredStorage(taskId: string, storage: Record<string, string>): void {
  try {
    if (Object.keys(storage).length === 0) {
      window.localStorage.removeItem(storageKey(taskId));
    } else {
      window.localStorage.setItem(storageKey(taskId), JSON.stringify(storage));
    }
  } catch {
    // storage full or blocked: the values still live in memory until the page reloads
  }
}

function issueText(issue: BuildIssue): string {
  const location = [issue.file, issue.line, issue.column].filter((part) => part !== null).join(':');
  return location ? `${location} — ${issue.message}` : issue.message;
}

export function usePreview({
  taskId,
  files,
  defaultEntry,
  isVisible,
  iframeRef,
}: UsePreviewOptions): UsePreviewResult {
  const [build, setBuild] = useState<PreviewBuild | null>(null);
  const [chosenEntry, setChosenEntry] = useState<string | null>(null);
  const [entries, setEntries] = useState<ConsoleEntry[]>([]);
  const [isDomReady, setIsDomReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const entryPath = chosenEntry !== null && chosenEntry in files ? chosenEntry : defaultEntry;

  // Run always builds the latest text, so it reads files and the entry through refs.
  const filesRef = useRef(files);
  const defaultEntryRef = useRef(defaultEntry);
  const chosenEntryRef = useRef(chosenEntry);
  useLayoutEffect(() => {
    filesRef.current = files;
    defaultEntryRef.current = defaultEntry;
  });

  const runIdRef = useRef<string | null>(null);
  const hasRunRef = useRef(false);
  const nextIdRef = useRef(1);
  const storageRef = useRef<{ taskId: string; data: Record<string, string> } | null>(null);

  const getStorage = useCallback((): Record<string, string> => {
    if (storageRef.current?.taskId !== taskId) {
      storageRef.current = { taskId, data: readStoredStorage(taskId) };
    }
    return storageRef.current.data;
  }, [taskId]);

  const setStorage = useCallback(
    (data: Record<string, string>) => {
      storageRef.current = { taskId, data };
      writeStoredStorage(taskId, data);
    },
    [taskId]
  );

  const makeEntry = useCallback(
    (level: ConsoleLevel, text: string, source?: string, ts = Date.now()): ConsoleEntry => ({
      id: nextIdRef.current++,
      ts,
      level,
      text,
      ...(source ? { source } : {}),
    }),
    []
  );

  const addEntry = useCallback((entry: ConsoleEntry) => {
    setEntries((current) => {
      const next = [...current, entry];
      return next.length > MAX_ENTRIES ? next.slice(next.length - MAX_ENTRIES) : next;
    });
  }, []);

  const currentEntry = useCallback((): string | null => {
    const chosen = chosenEntryRef.current;
    return chosen !== null && chosen in filesRef.current ? chosen : defaultEntryRef.current;
  }, []);

  const execute = useCallback(async () => {
    hasRunRef.current = true;
    const runId = crypto.randomUUID();
    runIdRef.current = runId;
    setIsRunning(true);

    let result: PreviewBuild;
    try {
      result = await buildPreviewDocument(filesRef.current, currentEntry(), {
        runId,
        parentOrigin: window.location.origin,
        storage: { ...getStorage() },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      result = {
        ok: false,
        reason: 'BUILD_ERROR',
        message: 'Build failed',
        issues: [{ file: null, line: null, column: null, message }],
      };
    }

    // A newer Run started while this one was building: its result wins.
    if (runIdRef.current !== runId) return;

    const fresh: ConsoleEntry[] = [];
    if (result.ok) {
      for (const path of result.missing) fresh.push(makeEntry('system', `${path} not found`));
      for (const warning of result.warnings) fresh.push(makeEntry('system', warning));
    } else if (result.reason === 'BUILD_ERROR') {
      for (const issue of result.issues) fresh.push(makeEntry('build', issueText(issue)));
    }

    setEntries(fresh);
    setBuild(result);
    setIsDomReady(false);
    setIsRunning(false);
  }, [currentEntry, getStorage, makeEntry]);

  const run = useCallback(() => {
    void execute();
  }, [execute]);

  const setEntryPath = useCallback((path: string) => {
    chosenEntryRef.current = path;
    setChosenEntry(path);
  }, []);

  // First run happens the first time the Result pane is shown. After that: Run, Reload or a link.
  useEffect(() => {
    if (isVisible && !hasRunRef.current) run();
  }, [isVisible, run]);

  const handleMessage = useCallback(
    (data: PreviewMessage) => {
      switch (data.type) {
        case 'console':
          addEntry(makeEntry(data.level, data.args.join(' '), undefined, data.ts));
          break;
        case 'runtime-error': {
          const source =
            data.source && data.line !== undefined ? `${data.source}:${data.line}` : data.source;
          addEntry(makeEntry('runtime', data.message, source, data.ts));
          break;
        }
        case 'console-clear':
          setEntries([]);
          break;
        case 'dom-ready':
          setIsDomReady(true);
          break;
        case 'navigate': {
          const from = currentEntry() ?? '';
          const target = resolvePath(from, data.href);
          if (target !== null && target.endsWith('.html') && target in filesRef.current) {
            setEntryPath(target);
            run();
          } else {
            addEntry(makeEntry('system', `${target ?? data.href} not found`));
          }
          break;
        }
        case 'storage': {
          const next = { ...getStorage() };
          if (data.op === 'clear') {
            for (const key of Object.keys(next)) delete next[key];
          } else if (data.key !== undefined) {
            if (data.op === 'set' && data.value !== undefined) next[data.key] = data.value;
            if (data.op === 'remove') delete next[data.key];
          }
          setStorage(next);
          break;
        }
      }
    },
    [addEntry, currentEntry, getStorage, makeEntry, run, setEntryPath, setStorage]
  );

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // The sandboxed preview has an opaque origin ("null"), so check who sent it, not the origin.
      const frameWindow = iframeRef.current?.contentWindow;
      if (!frameWindow || event.source !== frameWindow) return;
      const data: unknown = event.data;
      if (!isPreviewMessage(data) || data.runId !== runIdRef.current) return;
      handleMessage(data);
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [iframeRef, handleMessage]);

  const clearConsole = useCallback(() => setEntries([]), []);

  const resetStorage = useCallback(() => {
    setStorage({});
    addEntry(makeEntry('system', 'localStorage cleared. It starts empty on the next Run.'));
  }, [addEntry, makeEntry, setStorage]);

  const errorCount = useMemo(
    () => entries.filter((entry) => ERROR_LEVELS.includes(entry.level)).length,
    [entries]
  );

  return {
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
  };
}
