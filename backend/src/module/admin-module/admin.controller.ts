import type { NextFunction, Request, Response } from 'express';
import type {
  AdminFlagEvent,
  AdminTaskCode,
  AdminTraineeDetail,
  AdminTraineeSummary,
} from '@itp/types';
import { AdminService } from './admin.service';

const adminService = new AdminService();

class AdminController {
  listTrainees = async (
    _req: Request,
    res: Response<AdminTraineeSummary[]>,
    next: NextFunction
  ) => {
    try {
      res.status(200).json(await adminService.listTrainees());
    } catch (error) {
      next(error);
    }
  };

  getTrainee = async (req: Request, res: Response<AdminTraineeDetail>, next: NextFunction) => {
    try {
      const { traineeId } = req.params as { traineeId: string };
      res.status(200).json(await adminService.getTraineeDetail(traineeId));
    } catch (error) {
      next(error);
    }
  };

  listFlags = async (req: Request, res: Response<AdminFlagEvent[]>, next: NextFunction) => {
    try {
      const { traineeId } = req.params as { traineeId: string };
      res.status(200).json(await adminService.listFlags(traineeId));
    } catch (error) {
      next(error);
    }
  };

  getTaskCode = async (req: Request, res: Response<AdminTaskCode>, next: NextFunction) => {
    try {
      const { traineeId, taskId } = req.params as { traineeId: string; taskId: string };
      res.status(200).json(await adminService.getTaskCode(traineeId, taskId));
    } catch (error) {
      next(error);
    }
  };
}

export const adminController = new AdminController();
