import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middleware/validate';
import { dayCompletionController } from './day-completion.controller';

const dayIdParamsSchema = z.object({ dayId: z.string().min(1).max(100) });

export const dayCompletionRouter = Router();

dayCompletionRouter.patch(
  '/:dayId/complete',
  validate({ params: dayIdParamsSchema }),
  dayCompletionController.completeDay
);
