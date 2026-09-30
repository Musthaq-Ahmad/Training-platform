import { describe, expect, it } from 'vitest';
import {
  addTick,
  emptyTotals,
  IDLE_AFTER_MS,
  MAX_BATCH_SECONDS,
  restoreBatch,
  takeWholeSeconds,
} from './Activityaccumulator';

describe('addTick', () => {
  it('counts active and coding time while visible and recently used', () => {
    const totals = addTick(emptyTotals(), {
      elapsedMs: 1000,
      isVisible: true,
      msSinceInput: 10,
      mode: 'coding',
    });
    expect(totals).toEqual({ activeMs: 1000, codingMs: 1000, readingMs: 0 });
  });

  it('counts reading time in the reading bucket only', () => {
    const totals = addTick(emptyTotals(), {
      elapsedMs: 1000,
      isVisible: true,
      msSinceInput: 10,
      mode: 'reading',
    });
    expect(totals).toEqual({ activeMs: 1000, codingMs: 0, readingMs: 1000 });
  });

  it('counts only active time when the mode is none', () => {
    const totals = addTick(emptyTotals(), {
      elapsedMs: 1000,
      isVisible: true,
      msSinceInput: 10,
      mode: 'none',
    });
    expect(totals).toEqual({ activeMs: 1000, codingMs: 0, readingMs: 0 });
  });

  it('counts nothing when hidden or idle', () => {
    expect(
      addTick(emptyTotals(), { elapsedMs: 1000, isVisible: false, msSinceInput: 0, mode: 'coding' })
        .activeMs
    ).toBe(0);
    expect(
      addTick(emptyTotals(), {
        elapsedMs: 1000,
        isVisible: true,
        msSinceInput: IDLE_AFTER_MS + 1,
        mode: 'coding',
      }).activeMs
    ).toBe(0);
  });

  it('clamps a long gap to 5 seconds', () => {
    expect(
      addTick(emptyTotals(), { elapsedMs: 60_000, isVisible: true, msSinceInput: 0, mode: 'none' })
        .activeMs
    ).toBe(5000);
  });

  it('ignores a negative gap', () => {
    expect(
      addTick(emptyTotals(), { elapsedMs: -500, isVisible: true, msSinceInput: 0, mode: 'none' })
        .activeMs
    ).toBe(0);
  });
});

describe('takeWholeSeconds', () => {
  it('sends whole seconds and keeps the remainder', () => {
    const { batch, rest } = takeWholeSeconds({ activeMs: 61_500, codingMs: 30_200, readingMs: 0 });
    expect(batch).toEqual({ activeSeconds: 61, codingSeconds: 30, readingSeconds: 0 });
    expect(rest).toEqual({ activeMs: 500, codingMs: 200, readingMs: 0 });
  });

  it('never sends more than one batch allows and keeps the rest', () => {
    const { batch, rest } = takeWholeSeconds({
      activeMs: 700_000,
      codingMs: 400_000,
      readingMs: 300_000,
    });
    expect(batch.activeSeconds).toBe(MAX_BATCH_SECONDS);
    expect(batch.codingSeconds + batch.readingSeconds).toBeLessThanOrEqual(batch.activeSeconds);
    expect(rest.activeMs).toBe(100_000);
  });

  it('keeps coding + reading within active', () => {
    const { batch } = takeWholeSeconds({ activeMs: 10_000, codingMs: 9_000, readingMs: 9_000 });
    expect(batch.codingSeconds + batch.readingSeconds).toBeLessThanOrEqual(batch.activeSeconds);
  });

  it('sends nothing below one second', () => {
    expect(
      takeWholeSeconds({ activeMs: 900, codingMs: 900, readingMs: 0 }).batch.activeSeconds
    ).toBe(0);
  });
});

describe('restoreBatch', () => {
  it('adds a failed batch back', () => {
    const totals = restoreBatch(
      { activeMs: 500, codingMs: 0, readingMs: 0 },
      { activeSeconds: 60, codingSeconds: 40, readingSeconds: 10 }
    );
    expect(totals).toEqual({ activeMs: 60_500, codingMs: 40_000, readingMs: 10_000 });
  });

  it('caps the backlog at one hour', () => {
    const totals = restoreBatch(
      { activeMs: 3_590_000, codingMs: 0, readingMs: 0 },
      { activeSeconds: 600, codingSeconds: 0, readingSeconds: 0 }
    );
    expect(totals.activeMs).toBe(3_600_000);
  });
});
