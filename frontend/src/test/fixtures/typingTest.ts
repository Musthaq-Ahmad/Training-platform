import type { SaveTypingResultRequest, TypingResultRecord } from '@itp/types';

function minutesAgo(n: number): string {
  return new Date(Date.now() - n * 60_000).toISOString();
}

// Oldest first. Kept in memory so a saved test shows up in the history.
const results: TypingResultRecord[] = [
  { id: 'typing-1', wpm: 42, accuracy: 94, takenAt: minutesAgo(240) },
  { id: 'typing-2', wpm: 47, accuracy: 94, takenAt: minutesAgo(180) },
  { id: 'typing-3', wpm: 51, accuracy: 98, takenAt: minutesAgo(60) },
];

/** GET /typing-test/results — newest first. */
export function buildTypingResults(): TypingResultRecord[] {
  return [...results].reverse();
}

/** POST /typing-test/results — the server sets the time */
export function addTypingResult(body: SaveTypingResultRequest): TypingResultRecord {
  const row = {
    id: `typing-${results.length + 1}`,
    wpm: body.wpm,
    accuracy: Math.round(body.accuracy * 10) / 10,
    takenAt: new Date().toISOString(),
  };
  results.push(row);
  return row;
}
