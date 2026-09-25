import { ErrorCode } from '@itp/types';

export class AppError extends Error {
  statusCode: number;
  code: ErrorCode;
  details?: unknown;

  constructor(statusCode: number, code: ErrorCode, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

// General errors
export class ValidationError extends AppError {
  constructor(details: unknown) {
    super(400, 'VALIDATION_FAILED', 'Some fields are invalid.', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Please log in.') {
    super(401, 'UNAUTHENTICATED', message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You don't have access to this.") {
    super(403, 'FORBIDDEN', message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found.') {
    super(404, 'NOT_FOUND', message);
  }
}
