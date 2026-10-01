import { useCallback, useEffect, useRef, useState } from 'react';
import type { ActivityMode } from '@itp/types';

export const WORK_WINDOW_MS = 60_000;
const CHECK_EVERY_MS = 5000;

/** coding while the trainee works (edits, cursor, Run, terminal); reading when the instructions are shown. */
export function useTaskActivityMode(): {
  mode: ActivityMode;
  markWork: () => void;
} {
  const lastWorkAtRef = useRef(0);
  const [hasRecentWork, setHasRecentWork] = useState(false);

  const markWork = useCallback(() => {
    lastWorkAtRef.current = Date.now();
    setHasRecentWork(true); // no re-render when it's already true
  }, []);

  useEffect(() => {
    if (!hasRecentWork) return;
    const id = window.setInterval(() => {
      if (Date.now() - lastWorkAtRef.current > WORK_WINDOW_MS) setHasRecentWork(false);
    }, CHECK_EVERY_MS);
    return () => window.clearInterval(id);
  }, [hasRecentWork]);

  const mode: ActivityMode = hasRecentWork ? 'coding' : 'none';
  return { mode, markWork };
}
