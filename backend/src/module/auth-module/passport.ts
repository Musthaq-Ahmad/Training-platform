import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from '../../config/env';
import { AuthService } from './auth.service';
import { AppError } from '../../errors/AppError';

const authService = new AuthService();

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    (_accessToken, _refreshToken, profile, done) => {
      void (async () => {
        try {
          const trainee = await authService.verifyGoogleProfile(profile);
          done(null, trainee);
        } catch (error) {
          const email = profile.emails?.[0]?.value;
          if (error instanceof AppError) {
            done(null, false, { message: error.code, email });
          } else {
            done(error);
          }
        }
      })();
    }
  )
);

export default passport;
