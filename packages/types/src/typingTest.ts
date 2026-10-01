/** POST /api/typing-test/results — the server sets the time */
export type SaveTypingResultRequest = {
  wpm: number;
  accuracy: number; // 0–100
  durationSeconds: number; // how long the test ran
};

/** One saved attempt, as shown in today's history */
export type TypingTestResult = {
  id: string;
  testNumber: number; // 1 = first attempt today
  wpm: number;
  accuracy: number;
  durationSeconds: number;
  takenAt: string; // ISO
};

/** GET /api/typing-test/today — newest first */
export type TypingTodayResponse = {
  results: TypingTestResult[];
  averageWpm: number | null; // null = no tests today
  averageAccuracy: number | null;
};

/** GET /api/typing-test/summary */
export type TypingSummaryResponse = {
  latest: { wpm: number; accuracy: number; takenAt: string } | null;
  todayAverageWpm: number | null;
  trend: { date: string; averageWpm: number }[];
};
