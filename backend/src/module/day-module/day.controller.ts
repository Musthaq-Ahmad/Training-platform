import type { Request, Response, NextFunction } from 'express';
import type { DayContent, DayCurrentStatus, DayJournal, DayTask } from '@itp/types';
import type { AuthenticatedRequest } from '../../types/auth.types';
import type { DayIdParams, SaveJournalBody } from './day.schema';
import { DayService } from './day.service';

const dayService = new DayService();

class DayController {
  getContent = async (req: Request, res: Response<DayContent>, next: NextFunction) => {
    try {
      const { dayId } = req.params as DayIdParams;
      res.status(200).json(await dayService.getContent(dayId));
    } catch (error) {
      next(error);
    }
  };

  getCurrentStatus = async (req: Request, res: Response<DayCurrentStatus>, next: NextFunction) => {
    try {
      const traineeId = (req as AuthenticatedRequest).user.id;
      const { dayId } = req.params as DayIdParams;
      res.status(200).json(await dayService.getCurrentStatus(traineeId, dayId));
    } catch (error) {
      next(error);
    }
  };

  getTasks = async (req: Request, res: Response<DayTask[]>, next: NextFunction) => {
    try {
      const traineeId = (req as AuthenticatedRequest).user.id;
      const { dayId } = req.params as DayIdParams;
      res.status(200).json(await dayService.getTasks(traineeId, dayId));
    } catch (error) {
      next(error);
    }
  };

  getJournal = async (req: Request, res: Response<DayJournal>, next: NextFunction) => {
    try {
      const traineeId = (req as AuthenticatedRequest).user.id;
      const { dayId } = req.params as DayIdParams;
      res.status(200).json(await dayService.getJournal(traineeId, dayId));
    } catch (error) {
      next(error);
    }
  };

  saveJournal = async (req: Request, res: Response<DayJournal>, next: NextFunction) => {
    try {
      const traineeId = (req as AuthenticatedRequest).user.id;
      const { dayId } = req.params as DayIdParams;
      const { responseText } = req.body as SaveJournalBody;
      res.status(200).json(await dayService.saveJournal(traineeId, dayId, responseText));
    } catch (error) {
      next(error);
    }
  };
}

export const dayController = new DayController();
