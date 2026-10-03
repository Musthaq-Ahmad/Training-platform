import { z } from 'zod';

export const dayIdParamsSchema = z.object({
  dayId: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
});

export const saveJournalBodySchema = z.object({
  responseText: z.string().trim().min(1).max(5000),
});

export type SaveJournalBody = z.infer<typeof saveJournalBodySchema>;

export type DayIdParams = z.infer<typeof dayIdParamsSchema>;
