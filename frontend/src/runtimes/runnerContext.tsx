import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type Runner = {
  canRun: boolean;
  label: string; // text on the button, e.g. 'Run', 'Run: npm test', 'Run selection'
  title: string; // tooltip, e.g. 'Run (Ctrl+Enter)' or why it's disabled
  isRunning: boolean; // shows a spinner in the button
  run: () => void;
};

const IDLE: Runner = {
  canRun: false,
  label: 'Run',
  title: 'Loading…',
  isRunning: false,
  run: () => {},
};

const RunnerContext = createContext<Runner>(IDLE);
const SetRunnerContext = createContext<((runner: Runner) => void) | null>(null);

export function RunnerProvider({ children }: { children: ReactNode }) {
  const [runner, setRunner] = useState<Runner>(IDLE);
  return (
    <SetRunnerContext.Provider value={setRunner}>
      <RunnerContext.Provider value={runner}>{children}</RunnerContext.Provider>
    </SetRunnerContext.Provider>
  );
}

/** Call this from the active runtime component on every render. */
export function useRegisterRunner({ canRun, label, title, isRunning, run }: Runner): void {
  const setRunner = useContext(SetRunnerContext);
  if (!setRunner) throw new Error('useRegisterRunner must be used inside RunnerProvider');

  const runRef = useRef(run);
  useLayoutEffect(() => {
    runRef.current = run;
  });
  const stableRun = useCallback(() => runRef.current(), []);

  useEffect(() => {
    setRunner({ canRun, label, title, isRunning, run: stableRun });
  }, [setRunner, canRun, label, title, isRunning, stableRun]);

  useEffect(() => () => setRunner(IDLE), [setRunner]);
}

export function useRunner(): Runner {
  return useContext(RunnerContext);
}
