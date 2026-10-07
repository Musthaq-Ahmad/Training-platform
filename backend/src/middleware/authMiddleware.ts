import type { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { UnauthorizedError } from '../errors/AppError';
import type { AuthenticatedRequest } from '../types/auth.types';
import { AUTH_COOKIE_NAME } from '../module/auth-module/auth.constants';
import { ForbiddenError } from '../errors/AppError';
import { AuthRepository } from '../module/auth-module/auth.repository';

const authRepository = new AuthRepository();

export function requireAuth(request: Request, _response: Response, next: NextFunction) {
  try {
    const token = request.cookies?.[AUTH_COOKIE_NAME] as string | undefined;
    if (!token) {
      next(new UnauthorizedError('Not authenticated'));
      return;
    }
    (request as AuthenticatedRequest).user = verifyJwt(token);
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired token'));
  }
}

/** Signed in AND a trainee. Admins get 403 on trainee routes. */
export function requireTrainee(request: Request, response: Response, next: NextFunction) {
  requireAuth(request, response, (error?: unknown) => {
    if (error) return next(error);
    if ((request as AuthenticatedRequest).user.role !== 'trainee') {
      return next(new ForbiddenError('This page is for trainees.'));
    }
    next();
  });
}

/** Signed in as admin AND the admin row is still active (checked on every
request). */
export function requireAdmin(request: Request, response: Response, next: NextFunction) {
  requireAuth(request, response, (error?: unknown) => {
    if (error) return next(error);
    const user = (request as AuthenticatedRequest).user;
    if (user.role !== 'admin') return next(new ForbiddenError());
    authRepository
      .findActiveAdminById(user.id)
      .then((admin) => (admin ? next() : next(new ForbiddenError())))
      .catch(next);
  });
}
