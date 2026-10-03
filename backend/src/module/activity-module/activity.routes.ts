import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { activityController } from './activity.controller';
import { activityTimeBodySchema } from './activity.schema';

const activityRoutes = Router();

activityRoutes.post(
  '/time',
  validate({ body: activityTimeBodySchema }),
  activityController.addTime
);
activityRoutes.get('/time', activityController.listTime);

export default activityRoutes;
