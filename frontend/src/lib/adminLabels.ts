import type { AdminFlagEvent, DayStatus, FlagEventType, TaskStatus } from '@itp/types';

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Completed',
};

/** UNLOCKED is the trainee's current day: the one they can work on right now. */
export const DAY_STATUS_LABELS: Record<DayStatus, string> = {
  LOCKED: 'Locked',
  UNLOCKED: 'Current',
  COMPLETED: 'Completed',
};

export const FLAG_TYPE_LABELS: Record<FlagEventType, string> = {
  FULLSCREEN_EXIT: 'Left fullscreen',
  TAB_SWITCH: 'Switched tab',
  PASTE_BLOCKED: 'Paste blocked',
  WINDOW_BLUR: 'Window lost focus',
};

export const FLAG_PRIORITY_LABELS: Record<AdminFlagEvent['reviewPriority'], string> = {
  LOW: 'Low',
  NORMAL: 'Normal',
  HIGH: 'High',
};

/** How long the trainee was away: "—", "<1 s", "12 s", "2 m 05 s". */
export function formatFlagDuration(durationMs: number | null): string {
  if (durationMs === null) return '—';
  if (durationMs < 1000) return '<1 s';

  const totalSeconds = Math.round(durationMs / 1000);
  if (totalSeconds < 60) return `${totalSeconds} s`;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} m ${String(seconds).padStart(2, '0')} s`;
}
