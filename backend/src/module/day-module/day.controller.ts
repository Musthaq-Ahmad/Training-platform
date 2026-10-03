import type { Request, Response, NextFunction } from 'express';
import type { DayContent, DayCurrentStatus } from '@itp/types';
import type { AuthenticatedRequest } from '../../types/auth.types';
import { DayService } from './day.service';

const dayService = new DayService();

export const dayController = {
  getContent: async (req: Request, res: Response<DayContent>, next: NextFunction) => {
    try {
      const { dayId } = req.params as { dayId: string };
      res.status(200).json(await dayService.getContent(dayId));
    } catch (error) {
      next(error);
    }
  },

  getCurrentStatus: async (req: Request, res: Response<DayCurrentStatus>, next: NextFunction) => {
    try {
      const traineeId = (req as AuthenticatedRequest).user.id;
      const { dayId } = req.params as { dayId: string };
      res.status(200).json(await dayService.getCurrentStatus(traineeId, dayId));
    } catch (error) {
      next(error);
    }
  },
};
