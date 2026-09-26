import { Router, type Request, type Response, type NextFunction } from 'express';
import { URLSearchParams } from 'url';
import passport from './passport';
import type { RequestHandler } from 'express';
import { env } from '../../config/env';

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
    (
      error: unknown,
      trainee: Express.User | false,
      info?: { message?: string; email?: string }
    ) => {
      if (error) return next(error);

      if (!trainee) {
        const params = new URLSearchParams({
          error: info?.message ?? 'LOGIN_FAILED',
          email: info?.email ?? '',
        });

        return res.redirect(`${env.FRONTEND_URL}/login?${params.toString()}`);
      }

      // req.logIn(trainee, (loginError) => {
      //   if (loginError) return next(loginError);

      // });
      res.redirect(`${env.FRONTEND_URL}`);
    }
  ) as RequestHandler;

  authenticateCallback(req, res, next);
});

export default authRoutes;
