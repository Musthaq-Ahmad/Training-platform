import type { DayTask, TaskStatus } from '@itp/types';
import { catalogDayTasks, catalogDays } from '../../api/mockTasks';
import { mockDayProgress } from './dashboard';

// Temporary static data. Tasks will come from the backend (GET /days/:dayId/tasks).
// Built from the task catalog (the trainee guides), so the day page and the task page
// show the same titles and ids (`${dayId}-t-${sequenceOrder}`).

/** A task shows as completed when its day is completed (the dashboard's day_unlock rows). */
export function mockTaskStatus(dayId: string): TaskStatus {
  return mockDayProgress(dayId) === 'COMPLETED' ? 'completed' : 'not_started';
}

export const mockTasksByDay: Record<string, DayTask[]> = Object.fromEntries(
  catalogDays.map((day) => [day.dayId, catalogDayTasks(day.dayId, mockTaskStatus(day.dayId))])
);
