import { createContext } from 'react';
import type { MeResponse } from '@itp/types';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthContextValue {
  user: MeResponse | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  /** Starts the Google OAuth flow (full-page navigation to the backend). */
  login: () => void;

  /** Clears the cookie on the server and the session in the UI. */
  logout: () => Promise<void>;
  /** Re-checks the session with the backend. */
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
