import { useEffect, useState } from 'react';

const TICK_MS = 1000;

/**
 * True while the trainee is actually on the page: the tab is visible and the window has focus.
 * `document.hasFocus()` stays true while focus is inside a child iframe (the Preview), so working
 * in the preview doesn't pause the timer.
 */
function isOnPage(): boolean {
  return document.visibilityState !== 'hidden' && document.hasFocus();
}

/**
 * Whole seconds the trainee has been on the page since this hook mounted.
 * Pauses while the tab is hidden or the window doesn't have focus (another app, another window,
 * DevTools). Remount (e.g. with a `key`) to start again from 0. Display only: nothing is saved.
 */
export function useSessionTimer(): number {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    // Time is measured with Date.now(), so a throttled interval can't make the clock drift.
    let banked = 0; // ms from finished stretches on the page
    let startedAt: number | null = isOnPage() ? Date.now() : null;
    let settleId: number | undefined;

    // Brings the running/paused state up to date, then shows the total.
    const sync = () => {
      const now = Date.now();
      const onPage = isOnPage();

      if (!onPage && startedAt !== null) {
        banked += now - startedAt;
        startedAt = null;
      } else if (onPage && startedAt === null) {
        startedAt = now;
      }

      const running = startedAt === null ? 0 : now - startedAt;
      setElapsedSeconds(Math.floor((banked + running) / 1000));
    };

    // On blur, focus may be moving into the Preview iframe; check once it has settled.
    const syncSoon = () => {
      window.clearTimeout(settleId);
      settleId = window.setTimeout(sync, 0);
    };

    const intervalId = window.setInterval(sync, TICK_MS);
    document.addEventListener('visibilitychange', syncSoon);
    window.addEventListener('blur', syncSoon);
    window.addEventListener('focus', syncSoon);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(settleId);
      document.removeEventListener('visibilitychange', syncSoon);
      window.removeEventListener('blur', syncSoon);
      window.removeEventListener('focus', syncSoon);
    };
  }, []);

  return elapsedSeconds;
}
