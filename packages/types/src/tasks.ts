import type { DayTask } from './dayOverview';

/** Same values the day page uses: 'not_started' | 'in_progress' | 'completed' */
export type TaskStatus = DayTask['status'];

export type TaskFile = {
  path: string; // e.g. "src/App.tsx"
  content: string;
};

/** How the Run button executes a task. Set per task in the seed data. */
export type TaskRuntime = 'browser' | 'node' | 'sql';

/** GET /api/tasks/:taskId */
export type TaskResponse = {
  id: string;
  title: string;
  instructionsMarkdown: string;
  isStretchGoal: boolean;
  sequenceOrder: number;
  estimatedMinutes: number | null;
  status: TaskStatus;
  day: {
    id: string;
    dayNumber: number;
    courseTitle: string;
  };
  runtime: TaskRuntime;
  /** node only: what Run types into the terminal, e.g. "npm test". null for browser and sql. */
  runCommand: string | null;
  /** node only: true when trainee code needs its own Postgres (DATABASE_URL). Always false for browser. */
  usesDatabase: boolean;
};

/** GET /api/tasks/:taskId/code */
export type TaskCodeResponse = {
  files: TaskFile[];
  updatedAt: string | null; // null = never saved
};

/** PUT /api/tasks/:taskId/code */
export type SaveCodeRequest = {
  files: TaskFile[];
};

/** POST /api/tasks/:taskId/submit — can be called more than once; does not lock editing */
export type SubmitTaskResponse = {
  status: 'completed';
  submittedAt: string;
};
