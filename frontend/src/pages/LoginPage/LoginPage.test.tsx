// LoginPage.test.tsx
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import LoginPage from './LoginPage';

// LoginPage reads query params via useSearchParams, so every render needs a
// Router context to supply the current location — MemoryRouter with
// initialEntries lets each test control exactly what the URL looks like.
function renderLoginPage(initialEntry: string = '/login') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LoginPage />
    </MemoryRouter>
  );
}

describe('LoginPage', () => {
  describe('default state (no error param)', () => {
    it('renders LoginCard', () => {
      renderLoginPage('/login');
      expect(
        screen.getByRole('heading', { name: /in-house trainee training platform/i })
      ).toBeInTheDocument();
    });

    it('does not render AccessRestrictedCard', () => {
      renderLoginPage('/login');
      expect(screen.queryByRole('heading', { name: /access restricted/i })).not.toBeInTheDocument();
    });
  });

  describe('domain_not_permitted error state', () => {
    it('renders AccessRestrictedCard instead of LoginCard', () => {
      renderLoginPage('/login?error=domain_not_permitted');
      expect(screen.getByRole('heading', { name: /access restricted/i })).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { name: /in-house trainee training platform/i })
      ).not.toBeInTheDocument();
    });

    it('passes the email query param through as the detected email', () => {
      renderLoginPage('/login?error=domain_not_permitted&email=alex.trainee%40gmail.com');
      expect(screen.getByText('alex.trainee@gmail.com')).toBeInTheDocument();
    });

    it('falls back to "unknown" when no email param is present', () => {
      renderLoginPage('/login?error=domain_not_permitted');
      expect(screen.getByText('unknown')).toBeInTheDocument();
    });

    it('passes the fixed allowedDomain and domainInfo values', () => {
      renderLoginPage('/login?error=domain_not_permitted');
      expect(screen.getByText('@vonnue.com')).toBeInTheDocument();
      expect(screen.getByText(/external personal domain/i)).toBeInTheDocument();
    });
  });

  describe('an unrecognized error value', () => {
    it('still falls back to LoginCard', () => {
      renderLoginPage('/login?error=something_else');
      expect(
        screen.getByRole('heading', { name: /in-house trainee training platform/i })
      ).toBeInTheDocument();
    });
  });

  describe('Google sign-in navigation from the AccessRestrictedCard retry button', () => {
    const originalLocation = window.location;

    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { ...originalLocation, href: '' },
        writable: true,
        configurable: true,
      });
      vi.stubEnv('VITE_API_URL', 'http://localhost:3000');
    });

    afterEach(() => {
      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
        configurable: true,
      });
      vi.unstubAllEnvs();
    });

    it('navigates to the backend /api/auth/google endpoint when retry is clicked', async () => {
      const user = userEvent.setup();
      renderLoginPage('/login?error=domain_not_permitted');

      await user.click(screen.getByRole('button', { name: /sign in with google account/i }));

      expect(window.location.href).toBe('http://localhost:3000/api/auth/google');
    });
  });
});
