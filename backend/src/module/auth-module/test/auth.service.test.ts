// auth.service.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Profile } from 'passport-google-oauth20';

import { AuthService } from '../auth.service';
import {
  UnauthorizedError,
  DomainNotPermittedError,
  NotProvisionedError,
} from '../../../errors/AppError';

const { findBymail } = vi.hoisted(() => ({ findBymail: vi.fn() }));

// Exports both shapes, so this works whether the service does
// `new AuthRepository()` or imports a shared `authRepository` instance.
vi.mock('../auth.repository', () => {
  class AuthRepository {
    findBymail = findBymail;
  }
  return { AuthRepository, authRepository: new AuthRepository() };
});

// The real config/env.ts parses process.env at import time. Pin the one value
// the service reads so the tests don't depend on the machine's .env.
vi.mock('../../../config/env', () => ({
  env: { ALLOWED_EMAIL_DOMAIN: 'company.com' },
}));

describe('AuthService.verifyGoogleProfile', () => {
  const authService = new AuthService();

  const allowedEmail = 'trainee@company.com';

  const trainee = {
    id: '3f2c9c0e-5b1d-4c53-9a7e-0d6f2f1a9b11',
    email: allowedEmail,
    name: 'Test Trainee',
  };

  const createProfile = (email?: string): Profile =>
    ({
      id: 'google-id-1',
      provider: 'google',
      displayName: 'Test Trainee',
      emails: email ? [{ value: email, verified: true }] : undefined,
    }) as Profile;

  beforeEach(() => {
    findBymail.mockReset(); // clears calls AND any leftover mockResolvedValue
  });

  it('returns the trainee when the profile is on the allowed domain and provisioned', async () => {
    findBymail.mockResolvedValue(trainee);

    const result = await authService.verifyGoogleProfile(createProfile(allowedEmail));

    expect(result).toEqual(trainee);
    expect(findBymail).toHaveBeenCalledTimes(1);
    expect(findBymail).toHaveBeenCalledWith(allowedEmail);
  });

  it('throws UnauthorizedError when Google returns no email', async () => {
    await expect(authService.verifyGoogleProfile(createProfile())).rejects.toBeInstanceOf(
      UnauthorizedError
    );

    expect(findBymail).not.toHaveBeenCalled();
  });

  it('throws DomainNotPermittedError for an email outside the allowed domain', async () => {
    await expect(
      authService.verifyGoogleProfile(createProfile('user@gmail.com'))
    ).rejects.toBeInstanceOf(DomainNotPermittedError);

    // The domain check must run before any database lookup
    expect(findBymail).not.toHaveBeenCalled();
  });

  it.each(['user@notcompany.com', 'user@company.com.evil.com', 'company.com@gmail.com'])(
    'rejects the lookalike address %s',
    async (email) => {
      await expect(authService.verifyGoogleProfile(createProfile(email))).rejects.toBeInstanceOf(
        DomainNotPermittedError
      );

      expect(findBymail).not.toHaveBeenCalled();
    }
  );

  it('throws NotProvisionedError when the domain is allowed but no trainee row exists', async () => {
    findBymail.mockResolvedValue(null);

    await expect(
      authService.verifyGoogleProfile(createProfile(allowedEmail))
    ).rejects.toBeInstanceOf(NotProvisionedError);

    expect(findBymail).toHaveBeenCalledWith(allowedEmail);
  });

  it('lets unexpected repository errors propagate unchanged', async () => {
    const dbError = new Error('db down');
    findBymail.mockRejectedValue(dbError);

    await expect(authService.verifyGoogleProfile(createProfile(allowedEmail))).rejects.toBe(
      dbError
    );
  });
});
