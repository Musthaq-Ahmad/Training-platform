import type { ActivityMode } from '@itp/types';

/** No React and no timers in this file, so it is easy to test. */

export const IDLE_AFTER_MS = 5 * 60_000;
/** The server rejects a batch above this, so a batch never exceeds it. */
export const MAX_BATCH_SECONDS = 600;
const MAX_TICK_MS = 5_000; // ignore big gaps (laptop asleep, throttled background timers)
const MAX_BACKLOG_MS = 60 * 60_000; // never keep more than an hour of unsent time

export type Totals = { activeMs: number; codingMs: number; readingMs: number };
export type SecondsBatch = { activeSeconds: number; codingSeconds: number; readingSeconds: number };

export function emptyTotals(): Totals {
  return { activeMs: 0, codingMs: 0, readingMs: 0 };
}

export function addTick(
  totals: Totals,
  input: { elapsedMs: number; isVisible: boolean; msSinceInput: number; mode: ActivityMode }
): Totals {
  const ms = Math.min(Math.max(input.elapsedMs, 0), MAX_TICK_MS);
  if (!input.isVisible || input.msSinceInput > IDLE_AFTER_MS) return totals;
  return {
    activeMs: totals.activeMs + ms,
    codingMs: totals.codingMs + (input.mode === 'coding' ? ms : 0),
    readingMs: totals.readingMs + (input.mode === 'reading' ? ms : 0),
  };
}

/**
 * Whole seconds to send now, and what is left over for the next batch.
 * One batch holds at most MAX_BATCH_SECONDS, and coding + reading never exceed active.
 */
export function takeWholeSeconds(totals: Totals): { batch: SecondsBatch; rest: Totals } {
  const activeSeconds = Math.min(Math.floor(totals.activeMs / 1000), MAX_BATCH_SECONDS);
  const codingSeconds = Math.min(Math.floor(totals.codingMs / 1000), activeSeconds);
  const readingSeconds = Math.min(
    Math.floor(totals.readingMs / 1000),
    activeSeconds - codingSeconds
  );
  return {
    batch: { activeSeconds, codingSeconds, readingSeconds },
    rest: {
      activeMs: totals.activeMs - activeSeconds * 1000,
      codingMs: totals.codingMs - codingSeconds * 1000,
      readingMs: totals.readingMs - readingSeconds * 1000,
    },
  };
}

/** Puts a batch that failed to send back into the totals, capped at an hour. */
export function restoreBatch(totals: Totals, batch: SecondsBatch): Totals {
  const activeMs = Math.min(totals.activeMs + batch.activeSeconds * 1000, MAX_BACKLOG_MS);
  return {
    activeMs,
    codingMs: Math.min(totals.codingMs + batch.codingSeconds * 1000, activeMs),
    readingMs: Math.min(totals.readingMs + batch.readingSeconds * 1000, activeMs),
  };
}
