import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { dayTasksParamsSchema } from './day-tasks.schema';
import { dayTasksController } from './day-tasks.controller';

// Mounted at /api/days in app.ts, so this becomes GET /api/days/:dayId/tasks.
const dayTasksRoutes = Router();

dayTasksRoutes.get(
  '/:dayId/tasks',
  validate({ params: dayTasksParamsSchema }),
  dayTasksController.getDayTasks
);

export default dayTasksRoutes;
