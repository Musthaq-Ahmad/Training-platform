import { ApiError } from '../api/errors';

export type TraineeFormErrors = { name?: string; email?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Same limits as the backend schema, so most mistakes are caught before a request. */
export function validateTraineeForm(name: string, email: string): TraineeFormErrors {
  const errors: TraineeFormErrors = {};
  const trimmedName = name.trim();

  if (trimmedName.length < 2) errors.name = 'Enter the trainee’s full name.';
  else if (trimmedName.length > 80) errors.name = 'Keep the name under 80 characters.';

  if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Enter a valid email address.';

  return errors;
}

export function hasErrors(errors: TraineeFormErrors): boolean {
  return Boolean(errors.name ?? errors.email);
}

/** Puts a server error under the field it belongs to, or above the buttons. */
export function errorsFromApi(error: unknown): { fields: TraineeFormErrors; form: string | null } {
  if (!(error instanceof ApiError)) {
    return { fields: {}, form: 'Could not add the trainee. Please try again.' };
  }
  switch (error.code) {
    case 'TRAINEE_EXISTS':
      return { fields: { email: 'A trainee with this email already exists.' }, form: null };
    case 'EMAIL_BELONGS_TO_ADMIN':
      return { fields: { email: 'This email belongs to a mentor account.' }, form: null };
    case 'DOMAIN_NOT_PERMITTED':
      return { fields: { email: error.message }, form: null };
    case 'VALIDATION_FAILED':
      return { fields: {}, form: 'Check the name and email and try again.' };
    default:
      return { fields: {}, form: error.message };
  }
}
