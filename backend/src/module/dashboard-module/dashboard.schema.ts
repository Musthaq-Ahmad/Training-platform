import { z } from 'zod';

/** Course ids are short lowercase slugs: "html", "js", "postgresql". */
export const courseIdParamsSchema = z.object({
  courseId: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/),
});

export type CourseIdParams = z.infer<typeof courseIdParamsSchema>;
