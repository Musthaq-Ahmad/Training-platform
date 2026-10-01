import type { Request, Response, NextFunction } from 'express';
import type { ProfileData } from '@itp/types';
import type { AuthenticatedRequest } from '../../types/auth.types';
import { ProfileService } from './profile.service';

const profileService = new ProfileService();

class ProfileController {
  getProfile = async (req: Request, res: Response<ProfileData>, next: NextFunction) => {
    try {
      const traineeId = (req as AuthenticatedRequest).user.id;
      const profile = await profileService.getProfile(traineeId);
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  };
}

export const profileController = new ProfileController();
