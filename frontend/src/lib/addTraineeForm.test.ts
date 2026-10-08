import { describe, expect, it } from 'vitest';
import { ApiError } from '../api/errors';
import { errorsFromApi, hasErrors, validateTraineeForm } from './addTraineeForm';

describe('validateTraineeForm', () => {
  it('accepts a valid name and email', () => {
    expect(validateTraineeForm('Asha Rao', 'asha.rao@vonnue.com')).toEqual({});
  });

  it('ignores surrounding spaces', () => {
    expect(validateTraineeForm('  Asha Rao  ', '  asha.rao@vonnue.com ')).toEqual({});
  });

  it.each(['', ' ', 'A'])('rejects the name %j', (name) => {
    expect(validateTraineeForm(name, 'asha.rao@vonnue.com').name).toBe(
      'Enter the trainee’s full name.'
    );
  });

  it('rejects a name over 80 characters', () => {
    expect(validateTraineeForm('x'.repeat(81), 'a@vonnue.com').name).toBe(
      'Keep the name under 80 characters.'
    );
  });

  it.each(['', 'asha', 'asha@', 'asha@vonnue', 'asha rao@vonnue.com'])(
    'rejects the email %j',
    (email) => {
      expect(validateTraineeForm('Asha Rao', email).email).toBe('Enter a valid email address.');
    }
  );

  it('reports both fields at once', () => {
    const errors = validateTraineeForm('', 'bad');
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(hasErrors(errors)).toBe(true);
    expect(hasErrors({})).toBe(false);
  });
});

describe('errorsFromApi', () => {
  it('puts TRAINEE_EXISTS under the email', () => {
    expect(errorsFromApi(new ApiError(409, 'TRAINEE_EXISTS', 'x'))).toEqual({
      fields: { email: 'A trainee with this email already exists.' },
      form: null,
    });
  });

  it('puts EMAIL_BELONGS_TO_ADMIN under the email', () => {
    expect(errorsFromApi(new ApiError(409, 'EMAIL_BELONGS_TO_ADMIN', 'x')).fields.email).toBe(
      'This email belongs to a mentor account.'
    );
  });

  it('shows the server message for DOMAIN_NOT_PERMITTED under the email', () => {
    const message = 'Use a company email address ending in @vonnue.com.';
    expect(errorsFromApi(new ApiError(400, 'DOMAIN_NOT_PERMITTED', message)).fields.email).toBe(
      message
    );
  });

  it('shows a form message for VALIDATION_FAILED and other API errors', () => {
    expect(errorsFromApi(new ApiError(400, 'VALIDATION_FAILED', 'x')).form).toBe(
      'Check the name and email and try again.'
    );
    expect(errorsFromApi(new ApiError(0, 'NETWORK_ERROR', 'Can’t reach the server.')).form).toBe(
      'Can’t reach the server.'
    );
  });

  it('shows a generic form message for a non-API error', () => {
    expect(errorsFromApi(new Error('boom'))).toEqual({
      fields: {},
      form: 'Could not add the trainee. Please try again.',
    });
  });
});
