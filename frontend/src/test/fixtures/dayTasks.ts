import type { DayTask, TaskStatus } from '@itp/types';
import { catalogDayTasks, catalogDays } from '../../api/mockTasks';

// Temporary static data. Tasks will come from the backend (GET /days/:dayId/tasks).
// Built from the task catalog (the trainee guides), so the day page and the task page
// show the same titles and ids (`${dayId}-t-${sequenceOrder}`).

/** Days whose tasks are shown as completed in mock mode. */
const COMPLETED_DAYS = new Set([
  'html-day-01',
  'html-day-02',
  'html-day-03',
  'html-day-04',
  'html-day-05',
  'css-day-01',
  'css-day-02',
]);

export function mockTaskStatus(dayId: string): TaskStatus {
  return COMPLETED_DAYS.has(dayId) ? 'completed' : 'not_started';
}

export const mockTasksByDay: Record<string, DayTask[]> = Object.fromEntries(
  catalogDays.map((day) => [day.dayId, catalogDayTasks(day.dayId, mockTaskStatus(day.dayId))])
);
