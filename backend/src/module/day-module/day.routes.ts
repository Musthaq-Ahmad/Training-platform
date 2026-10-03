import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { dayController } from './day.controller';
import { dayIdParamsSchema } from './day.schema';

export const dayRouter = Router();

dayRouter.get('/:dayId', validate({ params: dayIdParamsSchema }), dayController.getContent);
dayRouter.get(
  '/:dayId/status',
  validate({ params: dayIdParamsSchema }),
  dayController.getCurrentStatus
);

export default dayRouter;
