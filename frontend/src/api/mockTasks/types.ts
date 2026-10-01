import type { TaskFile, TaskResponse } from '@itp/types';

/** One task as written in the trainee guides. Runtime details come from `workspaceForDay`. */
export type CatalogTask = Pick<
  TaskResponse,
  'id' | 'sequenceOrder' | 'title' | 'isStretchGoal' | 'estimatedMinutes' | 'instructionsMarkdown'
>;

export type CatalogDay = {
  dayId: string; // same id as the day page (`html-day-01`)
  dayNumber: number;
  courseTitle: string;
  tasks: CatalogTask[];
};

/** How a day's tasks run on the task page, and the files a trainee starts with. */
export type DayWorkspace = Pick<TaskResponse, 'runtime' | 'runCommand' | 'setupSql'> & {
  starterFiles: (task: CatalogTask) => TaskFile[];
};
