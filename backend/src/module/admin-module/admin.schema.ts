import { z } from 'zod';

export const traineeIdParamsSchema = z.object({ traineeId: z.string().uuid() });

// task ids are strings like "css-day-03-t-2", not UUIDs
export const traineeTaskParamsSchema = z.object({
  traineeId: z.string().uuid(),
  taskId: z.string().min(1).max(100),
});
