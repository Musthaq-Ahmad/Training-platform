export type FlagEventType = 'FULLSCREEN_EXIT' | 'TAB_SWITCH';

/** POST /api/activity/:taskId/events — the server sets the timestamp */
export type LogFlagEventRequest = {
  type: FlagEventType;
  durationMs?: number; // how long the trainee was away, if known
};
