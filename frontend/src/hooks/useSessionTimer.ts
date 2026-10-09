import { useEffect, useState } from 'react';

const TICK_MS = 1000;

/**
 * Whole seconds the page has been visible since this hook mounted.
 * Pauses while the tab is hidden. Remount (e.g. with a `key`) to start again from 0.
 * Display only: nothing is saved.
 */
export function useSessionTimer(): number {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    // Time is measured with Date.now(), so a throttled interval can't make the clock drift.
    let banked = 0; // ms from finished visible stretches
    let startedAt: number | null = document.visibilityState === 'hidden' ? null : Date.now();

    const update = () => {
      const running = startedAt === null ? 0 : Date.now() - startedAt;
      setElapsedSeconds(Math.floor((banked + running) / 1000));
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (startedAt !== null) {
          banked += Date.now() - startedAt;
          startedAt = null;
        }
      } else if (startedAt === null) {
        startedAt = Date.now();
      }
      update();
    };

    const intervalId = window.setInterval(update, TICK_MS);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return elapsedSeconds;
}
