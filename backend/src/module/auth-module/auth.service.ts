import type { Profile } from 'passport-google-oauth20';
import { env } from '../../config/env';
import { AuthRepository } from './auth.repository';
import {
  DomainNotPermittedError,
  NotProvisionedError,
  UnauthorizedError,
} from '../../errors/AppError';

const authRepository = new AuthRepository();

export class AuthService {
  async verifyGoogleProfile(profile: Profile) {
    const email = profile.emails?.[0]?.value;
    if (!email) throw new UnauthorizedError('Google did not return an email address.');

    if (!email.endsWith(`@${env.ALLOWED_EMAIL_DOMAIN}`)) throw new DomainNotPermittedError();

    const trainee = await authRepository.findBymail(email);
    if (!trainee) throw new NotProvisionedError();

    return trainee;
  }
}
