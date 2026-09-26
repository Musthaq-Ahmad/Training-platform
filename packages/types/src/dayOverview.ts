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

export interface DayReference {
  id: string;
  label: string;
  url: string;
}

export interface DayContent {
  dayId: string;
  courseSlug: string;
  dayNumber: number;
  totalDays: number;
  title: string;
  subtitle: string;
  lessonSummary: string;
  learningObjectives: LearningObjective[];
  selfCheckItems: SelfCheckItem[];
  tasks: DayTask[];
  references: DayReference[];
  journalPrompt: string;
  journalResponse: string | null;
  isLocked: boolean;
  isCompleted: boolean;
}
export interface DailyJournalProps {
  prompt: string;
  initialResponse: string | null;
  isSaving: boolean;
  isSaved: boolean;
  onSave: (responseText: string) => void;
}
