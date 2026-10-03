import { z } from 'zod';

export const saveTypingResultBodySchema = z.object({
  wpm: z.number().int().min(0).max(300),
  accuracy: z.number().min(0).max(100),
});

export type SaveTypingResultBody = z.infer<typeof saveTypingResultBodySchema>;
