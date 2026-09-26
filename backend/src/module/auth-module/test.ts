import { Router, type RequestHandler } from 'express';
import passport from './passport';

export const authRouter = Router();
authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }) as RequestHandler
);
