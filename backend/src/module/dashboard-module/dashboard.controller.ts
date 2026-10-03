import type { Request, Response, NextFunction } from 'express';
import type { CourseDaysResponse, DashboardResponse } from '@itp/types';
import type { AuthenticatedRequest } from '../../types/auth.types';
import type { CourseIdParams } from './dashboard.schema';
import { DashboardService } from './dashboard.service';

const dashboardService = new DashboardService();

class DashboardController {
  getDashboard = async (req: Request, res: Response<DashboardResponse>, next: NextFunction) => {
    try {
      const traineeId = (req as AuthenticatedRequest).user.id;
      const dashboard = await dashboardService.getDashboard(traineeId);
      res.status(200).json(dashboard);
    } catch (error) {
      next(error);
    }
  };

  getCourseDays = async (req: Request, res: Response<CourseDaysResponse>, next: NextFunction) => {
    try {
      const traineeId = (req as AuthenticatedRequest).user.id;
      const { courseId } = req.params as CourseIdParams; // checked by validate()
      const days = await dashboardService.getCourseDays(traineeId, courseId);
      res.status(200).json(days);
    } catch (error) {
      next(error);
    }
  };
}

export const dashboardController = new DashboardController();
