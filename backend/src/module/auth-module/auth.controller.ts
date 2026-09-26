import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../../types/auth.types';

import type { MeResponse } from '@itp/types';

class AuthController {
  me(req: AuthenticatedRequest, res: Response<MeResponse>, next: NextFunction) {
    try {
      const trainee = req.user;
      res.status(200).json({
        id: trainee.id,
        email: trainee.email,
        name: trainee.name,
      });
    } catch (error) {
      next(error);
    }
  }

  logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
