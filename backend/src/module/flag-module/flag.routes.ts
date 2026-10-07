import { Router } from 'express';
import { requireTrainee } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validate';
import { flagController } from './flag.controller';
import { logFlagEventSchema, taskIdParamsSchema } from './flag.schema';

const flagRoutes = Router();

flagRoutes.post(
  '/:taskId/events',
  requireTrainee,
  validate({ params: taskIdParamsSchema, body: logFlagEventSchema }),
  flagController.logflag
);

export default flagRoutes;
