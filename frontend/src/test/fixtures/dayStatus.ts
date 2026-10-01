import type { DayCurrentStatus, DayJournal } from '@itp/types';
import { mockCurriculumDayIds, mockDayProgress } from './dashboard';

// Built from the dashboard's day_unlock rows, so the dashboard, the day page and the task page
// always agree. To change the trainee's progress, edit `dayUnlocks` in dashboard.ts (one place).
export const mockStatusByDay: Record<string, DayCurrentStatus> = Object.fromEntries(
  mockCurriculumDayIds.map((dayId) => {
    const progress = mockDayProgress(dayId);
    return [dayId, { isLocked: progress === 'LOCKED', isCompleted: progress === 'COMPLETED' }];
  })
);

// No journal has been written yet on any day.
export const mockJournalByDay: Record<string, DayJournal> = Object.fromEntries(
  mockCurriculumDayIds.map((dayId) => [dayId, { responseText: null }])
);
