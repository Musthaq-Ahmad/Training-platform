import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { dayTasksParamsSchema } from './day-tasks.schema';
import { dayTasksController } from './day-tasks.controller';
import { journalDayIdParamsSchema, saveJournalBodySchema } from './journal.schema';
import { journalController } from './journal.controller';
import { dayController } from './day.controller';

export const dayRouter = Router();

dayRouter.get('/:dayId', validate({ params: journalDayIdParamsSchema }), dayController.getDay);

dayRouter.get(
  '/:dayId/status',
  validate({ params: journalDayIdParamsSchema }),
  dayController.getStatus
);

dayRouter.patch(
  '/:dayId/complete',
  validate({ params: journalDayIdParamsSchema }),
  dayController.completeDay
);

// Kept for the existing day overview client; the documented endpoint is /:dayId/complete.
dayRouter.patch(
  '/:dayId/status',
  validate({ params: journalDayIdParamsSchema }),
  dayController.completeDayStatus
);

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
