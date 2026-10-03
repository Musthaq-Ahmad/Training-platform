import { z } from 'zod';

// curriculum_day.id is a plain string (not a UUID). Zod only checks the shape;
// whether the day exists is the service's job.
export const dayTasksParamsSchema = z.object({
  dayId: z.string().min(1).max(100),
});
