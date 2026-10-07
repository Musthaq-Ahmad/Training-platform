import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { journalDayIdParamsSchema, saveJournalBodySchema } from './journal.schema';
import { journalController } from './journal.controller';

export const journalRouter = Router();

journalRouter.get('/', journalController.listJournal);
journalRouter.put(
  '/:dayId',
  validate({ params: journalDayIdParamsSchema, body: saveJournalBodySchema }),
  journalController.saveJournal
);

export default journalRouter;
