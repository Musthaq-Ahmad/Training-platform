import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { journalDayIdParamsSchema, saveJournalBodySchema } from './journal.schema';
import { journalController } from './journal.controller';

// Mounted at /api/days in routes/index.ts, so these become /api/days/:dayId/journal.
export const journalRouter = Router();

journalRouter.get(
  '/:dayId/journal',
  validate({ params: journalDayIdParamsSchema }),
  journalController.getJournal
);

journalRouter.put(
  '/:dayId/journal',
  validate({ params: journalDayIdParamsSchema, body: saveJournalBodySchema }),
  journalController.saveJournal
);
