// src/middleware/errorHandler.ts
import type { Request, Response, NextFunction } from 'express';
import type { ApiErrorResponse } from '@itp/types';
import { AppError } from '../errors/AppError';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response<ApiErrorResponse>,
  _next: NextFunction
) {
  // One of our errors → send its status and code
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: { code: error.code, message: error.message, details: error.details },
    });
    return;
  }

  // Anything else is a bug → log it, but never send internal details to the trainee (TRD §10.2)
  console.error(error);
  res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'Something went wrong. Please try again.' },
  });
}
