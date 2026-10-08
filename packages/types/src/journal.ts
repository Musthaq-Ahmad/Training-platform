/** One day's entry inside GET /api/journal */
export type JournalEntry = {
  dayId: string;
  dayNumber: number;
  trackLabel: string; // short course code shown on the card, e.g. "JS", "CSS", "HTML"
  title: string;
  date: string; // the curriculum day's date
  updatedAt: string | null; // when the entry was last saved, null = never written
  prompts: string[];
  responseText: string; // '' = nothing written
  isEditable: boolean; // true only for today's entry
};

/** GET /api/journal — unlocked days only, newest first */
export type JournalListResponse = {
  entries: JournalEntry[];
};
