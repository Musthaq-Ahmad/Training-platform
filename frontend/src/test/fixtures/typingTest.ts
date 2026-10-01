import type { SaveTypingResultRequest, TypingTestResult, TypingTodayResponse } from '@itp/types';

function minutesAgo(n: number): string {
  return new Date(Date.now() - n * 60_000).toISOString();
}

// Oldest first. Kept in memory so a saved test shows up in the history.
const results: Omit<TypingTestResult, 'testNumber'>[] = [
  { id: 'typing-1', wpm: 42, accuracy: 94, durationSeconds: 60, takenAt: minutesAgo(240) },
  { id: 'typing-2', wpm: 47, accuracy: 94, durationSeconds: 60, takenAt: minutesAgo(180) },
  { id: 'typing-3', wpm: 51, accuracy: 98, durationSeconds: 60, takenAt: minutesAgo(60) },
];

function average(nums: number[]): number | null {
  if (nums.length === 0) return null;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

/** GET /typing-test/today */
export function buildTypingToday(): TypingTodayResponse {
  const numbered = results.map((r, i) => ({ ...r, testNumber: i + 1 }));
  return {
    results: [...numbered].reverse(), // newest first
    averageWpm: average(results.map((r) => r.wpm)),
    averageAccuracy: average(results.map((r) => r.accuracy)),
  };
}

/** POST /typing-test/results — the server sets the time */
export function addTypingResult(body: SaveTypingResultRequest): TypingTestResult {
  const row = { id: `typing-${results.length + 1}`, ...body, takenAt: new Date().toISOString() };
  results.push(row);
  return { ...row, testNumber: results.length };
}
