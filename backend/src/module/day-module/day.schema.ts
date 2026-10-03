import { z } from 'zod';

export const dayIdParamsSchema = z.object({
  dayId: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
});
