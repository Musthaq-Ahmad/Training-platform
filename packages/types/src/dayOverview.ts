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

export interface DayJournal {
  responseText: string | null;
}

export type SaveJournalRequest = {
  responseText: string;
};
