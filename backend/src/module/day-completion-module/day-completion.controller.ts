import type { Request, Response, NextFunction } from 'express';
import type { CompleteDayResponse } from '@itp/types';
import type { AuthenticatedRequest } from '../../types/auth.types';
import { DayCompletionService } from './day-completion.service';

const dayCompletionService = new DayCompletionService();

export const dayCompletionController = {
  completeDay: async (req: Request, res: Response<CompleteDayResponse>, next: NextFunction) => {
    try {
      const traineeId = (req as AuthenticatedRequest).user.id;
      const { dayId } = req.params as { dayId: string };
      res.status(200).json(await dayCompletionService.completeDay(traineeId, dayId));
    } catch (error) {
      next(error);
    }
  },
};
