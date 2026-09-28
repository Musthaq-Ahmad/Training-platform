import type { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { UnauthorizedError } from '../errors/AppError';
import type { AuthenticatedRequest } from '../types/auth.types';
import { AUTH_COOKIE_NAME } from '../module/auth-module/auth.constants';

export function requireAuth(request: Request, _response: Response, next: NextFunction) {
  try {
    const token = request.cookies?.[AUTH_COOKIE_NAME] as string | undefined;
    if (!token) throw new UnauthorizedError('Not authenticated');
    (request as AuthenticatedRequest).user = verifyJwt(token);
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired token'));
  }
}
