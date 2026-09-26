import { Router, type Request, type Response, type NextFunction } from 'express';
import passport from './passport';
import type { RequestHandler } from 'express';
import { env } from '../../config/env';
// import { authController } from './auth.controller';

const authRoutes = Router();

authRoutes.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }) as RequestHandler
);

authRoutes.get('/google/callback', (req: Request, res: Response, next: NextFunction) => {
  const authenticateCallback: RequestHandler = passport.authenticate(
    'google',
    (error: unknown, trainee: Express.User | false, info?: { message?: string }) => {
      if (error) return next(error);

      if (!trainee) {
        // info.message is 'DOMAIN_NOT_PERMITTED' or 'NOT_PROVISIONED' — see auth.service.ts
        return res.redirect(`${env.FRONTEND_URL}/login?error=${info?.message ?? 'LOGIN_FAILED'}`);
      }

      req.logIn(trainee, (loginError) => {
        if (loginError) return next(loginError);
        res.redirect(`${env.FRONTEND_URL}/dashboard`);
      });
    }
  ) as RequestHandler;

  authenticateCallback(req, res, next);
});

export default authRoutes;
