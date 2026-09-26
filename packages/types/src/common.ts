export type ErrorCode =
  | 'VALIDATION_FAILED'
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INTERNAL_ERROR'
  | 'DAY_LOCKED'
  | 'CHECKLIST_INCOMPLETE'
  | 'DOMAIN_NOT_PERMITTED'
  | 'NOT_PROVISIONED';

/** Every error response from the API looks exactly like this. */
export type ApiErrorResponse = {
  error: {
    code: ErrorCode;
    message: string; // safe to show to the trainee
    details?: unknown; // e.g. which fields failed validation
  };
};

// Response returned by the authenticated user profile endpoint
export type MeResponse = {
  id: string;
  email: string;
  name: string;
};
