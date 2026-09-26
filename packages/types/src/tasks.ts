export type TaskStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED';

export type TaskFile = {
  path: string; // e.g. "src/App.tsx"
  content: string;
};

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
  status: 'SUBMITTED';
  submittedAt: string;
};
