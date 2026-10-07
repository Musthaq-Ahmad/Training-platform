export interface LearningObjective {
  id: string;
  code: string;
  title: string;
  description: string;
}

export interface SelfCheckItem {
  id: string;
  code: string;
  label: string;
  description: string;
  isRequired: boolean;
}

export interface DayTask {
  id: string;
  sequenceOrder: number;
  title: string;
  status: 'not_started' | 'in_progress' | 'completed';
  isStretchGoal: boolean;
}
export interface DayContent {
  dayId: string;
  courseSlug: string;
  courseTitle: string;
  dayNumber: number;
  totalDays: number;
  title: string;
  subtitle: string;
  lessonSummary: string;
  learningObjectives: LearningObjective[];
  selfCheckItems: SelfCheckItem[];
  journalPrompt: string;
}
export interface DailyJournalProps {
  prompt: string;
  initialResponse: string | null;
  isSaving: boolean;
  isSaved: boolean;
  onSave: (responseText: string) => void;
}

export interface DayCurrentStatus {
  isLocked: boolean;
  isCompleted: boolean;
}

export interface CompleteDayResponse {
  status: DayCurrentStatus;
  nextDayId: string | null;
}

export interface DayJournal {
  responseText: string | null;
}

export type SaveJournalRequest = {
  responseText: string;
};

/** Counts of recorded events for the tasks counted in a day's score. No timestamps, priorities or notes. */
export type IntegrityBreakdown = {
  pasteAttempts: number;
  tabSwitches: number;
  fullscreenExits: number;
  windowBlurs: number;
};

export type DayIntegrityState = 'not_started' | 'in_progress' | 'completed';

/** GET /api/days/:dayId/integrity */
export type DayIntegrityResponse = {
  state: DayIntegrityState;
  score: number | null; // null = no task worked on yet, show "-"
  tasksCounted: number; // started tasks the score is based on
  breakdown: IntegrityBreakdown;
};
