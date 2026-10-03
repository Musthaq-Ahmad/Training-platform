import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { dayTasksParamsSchema } from './day-tasks.schema';
import { dayTasksController } from './day-tasks.controller';
import { journalDayIdParamsSchema, saveJournalBodySchema } from './journal.schema';
import { journalController } from './journal.controller';

export const dayRouter = Router();

dayRouter.get(
  '/:dayId/journal',
  validate({ params: journalDayIdParamsSchema }),
  journalController.getJournal
);

dayRouter.put(
  '/:dayId/journal',
  validate({ params: journalDayIdParamsSchema, body: saveJournalBodySchema }),
  journalController.saveJournal
);

dayRouter.get(
  '/:dayId/tasks',
  validate({ params: dayTasksParamsSchema }),
  dayTasksController.getDayTasks
);

export default dayRouter;
