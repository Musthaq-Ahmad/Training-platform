import { Router } from 'express';
import { journalController } from './journal.controller';

export const journalRouter = Router();

journalRouter.get('/', journalController.listJournal);

export default journalRouter;
