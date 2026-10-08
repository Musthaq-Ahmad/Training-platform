import { z } from 'zod';

export const traineeIdParamsSchema = z.object({ traineeId: z.string().uuid() });

// task ids are strings like "css-day-03-t-2", not UUIDs
export const traineeTaskParamsSchema = z.object({
  traineeId: z.string().uuid(),
  taskId: z.string().min(1).max(100),
});

export const createTraineeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter the full name.')
    .max(80, 'Keep the name under 80 characters.'),
  // Lower-cased here, so every later check and the stored value use the same form.
  email: z.string().trim().toLowerCase().email('Enter a valid email address.').max(254),
});

export type CreateTraineeBody = z.infer<typeof createTraineeSchema>;
