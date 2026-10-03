import { z } from 'zod';

export const MAX_JOURNAL_LENGTH = 5_000;

// curriculum_day.id is a plain string in the schema (not @db.Uuid), so don't require a UUID here.
// Zod only checks the shape; whether the day exists is the service's job.
export const journalDayIdParamsSchema = z.object({
  dayId: z.string().min(1).max(100),
});

// Zod trims first, then checks the length, so "   " is rejected and the saved text has no
// leading/trailing spaces (validate() replaces req.body with this cleaned data).
export const saveJournalBodySchema = z.object({
  responseText: z.string().trim().min(1).max(MAX_JOURNAL_LENGTH),
});
