import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { dayController } from './day.controller';
import { dayIdParamsSchema, saveJournalBodySchema } from './day.schema';

const dayRoutes = Router();

dayRoutes.get('/:dayId', validate({ params: dayIdParamsSchema }), dayController.getContent);
dayRoutes.get(
  '/:dayId/status',
  validate({ params: dayIdParamsSchema }),
  dayController.getCurrentStatus
);
dayRoutes.get('/:dayId/tasks', validate({ params: dayIdParamsSchema }), dayController.getTasks);
dayRoutes.get('/:dayId/journal', validate({ params: dayIdParamsSchema }), dayController.getJournal);
dayRoutes.put(
  '/:dayId/journal',
  validate({ params: dayIdParamsSchema, body: saveJournalBodySchema }),
  dayController.saveJournal
);

export default dayRoutes;
