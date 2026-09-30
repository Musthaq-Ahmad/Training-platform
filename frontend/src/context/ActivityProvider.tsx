import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react';
import type { ActivityMode, ActivityTimeRequest } from '@itp/types';
import { postActivityTime, postActivityTimeOnExit } from '../api/activity';
import {
  addTick,
  emptyTotals,
  restoreBatch,
  takeWholeSeconds,
  type SecondsBatch,
  type Totals,
} from '../lib/Activityaccumulator';
import { ActivityContext, type ActivityContextValue } from './ActivityContext';
import { useAuth } from './Useauth';

const TICK_MS = 1000;
const FLUSH_MS = 60_000;
const POINTER_MOVE_THROTTLE_MS = 5000;
const MAX_BATCHES_PER_FLUSH = 10;

/**
 * Counts active / coding / reading time for the signed-in trainee and sends it in batches.
 * Counts live in refs: they change every second and must not re-render the app.
 */
export function ActivityProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  const totalsRef = useRef<Totals>(emptyTotals());
  const modeRef = useRef<ActivityMode>('none');
  const dayIdRef = useRef<string | null>(null);
  const lastInputAtRef = useRef(0);
  const lastTickAtRef = useRef(0);

  const tick = useCallback(() => {
    const now = Date.now();
    if (lastTickAtRef.current > 0) {
      totalsRef.current = addTick(totalsRef.current, {
        elapsedMs: now - lastTickAtRef.current,
        isVisible: document.visibilityState === 'visible',
        msSinceInput: now - lastInputAtRef.current,
        mode: modeRef.current,
      });
    }
    lastTickAtRef.current = now;
  }, []);

  const flush = useCallback(async (onExit: boolean) => {
    // Take everything to send and the day it belongs to right now, before any await,
    // so a day change while a send is in flight cannot mix up the days.
    const batches: SecondsBatch[] = [];
    for (let i = 0; i < MAX_BATCHES_PER_FLUSH; i++) {
      const { batch, rest } = takeWholeSeconds(totalsRef.current);
      if (batch.activeSeconds === 0) break;
      totalsRef.current = rest;
      batches.push(batch);
    }
    const dayId = dayIdRef.current;

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      const body: ActivityTimeRequest = { ...batch, ...(dayId ? { dayId } : {}) };
      if (onExit) {
        postActivityTimeOnExit(body); // never waits
        continue;
      }
      try {
        await postActivityTime(body);
      } catch {
        // Put this and the unsent batches back; they go out with the next flush.
        for (const unsent of batches.slice(i)) {
          totalsRef.current = restoreBatch(totalsRef.current, unsent);
        }
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const start = Date.now();
    lastTickAtRef.current = start;
    lastInputAtRef.current = start;

    const markInput = () => {
      lastInputAtRef.current = Date.now();
    };
    let lastPointerMove = 0;
    const onPointerMove = () => {
      const now = Date.now();
      if (now - lastPointerMove < POINTER_MOVE_THROTTLE_MS) return;
      lastPointerMove = now;
      markInput();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        tick();
        void flush(true);
      } else {
        lastTickAtRef.current = Date.now(); // don't count the time away
        markInput();
      }
    };
    const onPageHide = () => {
      tick();
      void flush(true);
    };

    const options = { capture: true, passive: true } as const;
    const inputEvents = ['keydown', 'pointerdown', 'wheel', 'scroll', 'touchstart'] as const;
    inputEvents.forEach((name) => window.addEventListener(name, markInput, options));
    window.addEventListener('pointermove', onPointerMove, options);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', onPageHide);
    const tickTimer = window.setInterval(tick, TICK_MS);
    const flushTimer = window.setInterval(() => void flush(false), FLUSH_MS);

    return () => {
      inputEvents.forEach((name) => window.removeEventListener(name, markInput, options));
      window.removeEventListener('pointermove', onPointerMove, options);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', onPageHide);
      window.clearInterval(tickTimer);
      window.clearInterval(flushTimer);
      totalsRef.current = emptyTotals(); // signed out: don't carry time over to the next user
    };
  }, [isAuthenticated, tick, flush]);

  const value = useMemo<ActivityContextValue>(
    () => ({
      reportMode: (mode, dayId) => {
        tick(); // close the time so far under the previous mode
        if (dayId !== dayIdRef.current) {
          // Close the previous day's batch so its time isn't counted under the new day.
          // flush() reads the old dayId before the line below changes it.
          void flush(false);
        }
        modeRef.current = mode;
        dayIdRef.current = dayId;
      },
      flushNow: async () => {
        tick();
        await flush(false);
      },
    }),
    [tick, flush]
  );

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
}
