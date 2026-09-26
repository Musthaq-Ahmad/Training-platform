import { Router, type Request, type Response, type NextFunction } from 'express';
import { URLSearchParams } from 'url';
import passport from './passport';
import type { RequestHandler } from 'express';
import { env } from '../../config/env';
import { signJwt } from '../../utils/jwt';

const authRoutes = Router();

const COOKIE_NAME = 'auth-token';

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
    { session: false },
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
      const token = signJwt({ id: trainee.id, name: trainee.name, email: trainee.email });

      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days should keep in sync with JWT_EXPIRES_IN
      });
      res.redirect(`${env.FRONTEND_URL}`);
    }
  ) as RequestHandler;

  authenticateCallback(req, res, next);
});

export default authRoutes;
