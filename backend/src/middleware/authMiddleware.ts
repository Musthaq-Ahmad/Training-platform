import type { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { UnauthorizedError } from '../errors/AppError';
import type { AuthenticatedRequest } from '../types/auth.types';

export function requireAuth(request: Request, _response: Response, next: NextFunction) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Not authenticated');
    }

    const token = authHeader.replace('Bearer ', '');
    (request as AuthenticatedRequest).user = verifyJwt(token);
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired token'));
  }
}
