import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { AuthContext, type AuthContextValue } from '../context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

const user = { id: 'u1', email: 'trainee@vonnue.com', name: 'Test Trainee' };

function fakeAuth(overrides: Partial<AuthContextValue>): AuthContextValue {
  return {
    user: null,
    status: 'unauthenticated',
    isAuthenticated: false,
    login: vi.fn(),
    logout: vi.fn(),
    refresh: vi.fn(),
    ...overrides,
  };
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<div>login page</div>} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<div>home page</div>} />
        <Route path="/private" element={<div>private page</div>} />
      </Route>
    </Routes>
  );
}

function renderApp(route: string, authOverrides: Partial<AuthContextValue>) {
  return render(
    <AuthContext.Provider value={fakeAuth(authOverrides)}>
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('ProtectedRoute', () => {
  it('shows a loader (not the login page) while the session is being checked', () => {
    renderApp('/private', { status: 'loading' });

    expect(screen.getByText(/loading/i)).toBeDefined();
    expect(screen.queryByText('login page')).toBeNull();
    expect(screen.queryByText('private page')).toBeNull();
  });

  it('redirects unauthenticated users to /login', () => {
    renderApp('/private', { status: 'unauthenticated' });

    expect(screen.getByText('login page')).toBeDefined();
    expect(screen.queryByText('private page')).toBeNull();
  });

  it('renders the protected page for authenticated users', () => {
    renderApp('/private', { status: 'authenticated', user, isAuthenticated: true });

    expect(screen.getByText('private page')).toBeDefined();
  });
});

describe('PublicOnlyRoute', () => {
  it('shows the login page to unauthenticated users', () => {
    renderApp('/login', { status: 'unauthenticated' });

    expect(screen.getByText('login page')).toBeDefined();
  });

  it('redirects authenticated users from /login to the home page', () => {
    renderApp('/login', { status: 'authenticated', user, isAuthenticated: true });

    expect(screen.getByText('home page')).toBeDefined();
    expect(screen.queryByText('login page')).toBeNull();
  });

  it('shows a loader while the session is being checked', () => {
    renderApp('/login', { status: 'loading' });

    expect(screen.getByText(/loading/i)).toBeDefined();
  });
});
