import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { MeResponse } from '@itp/types';
import { getMe, logout as logoutRequest, startGoogleLogin } from '../api/auth';
import { setUnauthorizedHandler } from '../api/client';
import { ApiError } from '../api/errors';
import { AuthContext, type AuthContextValue, type AuthStatus } from './AuthContext';

async function fetchSession(): Promise<MeResponse | null> {
  try {
    return await getMe();
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 0;
    if (status !== 401) {
      console.error('Failed to load session', error);
    }
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  const clearSession = useCallback(() => {
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  // Manual re-check (exposed through the context)
  const refresh = useCallback(async () => {
    const me = await fetchSession();
    setUser(me);
    setStatus(me ? 'authenticated' : 'unauthenticated');
  }, []);

  // Restore the session on first load / page refresh (the cookie is the source of truth)
  useEffect(() => {
    let cancelled = false;

    void fetchSession().then((me) => {
      if (cancelled) return;
      setUser(me);
      setStatus(me ? 'authenticated' : 'unauthenticated');
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Any 401 from a protected API call (expired token) silently signs the user out.
  // ProtectedRoute reacts to the status change and redirects to /login.
  useEffect(() => {
    setUnauthorizedHandler(clearSession);
    return () => setUnauthorizedHandler(null);
  }, [clearSession]);

  const login = useCallback(() => {
    startGoogleLogin();
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      // Clear local state even if the request failed, so the UI never shows a stale user
      clearSession();
    }
  }, [clearSession]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, status, isAuthenticated: status === 'authenticated', login, logout, refresh }),
    [user, status, login, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
