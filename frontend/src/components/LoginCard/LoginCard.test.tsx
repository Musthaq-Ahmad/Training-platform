import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginCard from './LoginCard';

describe('LoginCard', () => {
  it('renders the heading and subtitle', () => {
    render(<LoginCard />);
    expect(
      screen.getByRole('heading', { name: /in-house trainee training platform/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/learn, practice, and track your technical training progress/i)
    ).toBeInTheDocument();
  });

  it('renders the Google sign-in button', () => {
    render(<LoginCard />);
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument();
  });

  it('renders the enterprise security notice with the domain highlighted', () => {
    render(<LoginCard />);
    expect(screen.getByText(/enterprise security/i)).toBeInTheDocument();
    expect(screen.getByText('@vonnue.com')).toBeInTheDocument();
  });
});

describe('Google sign-in navigation', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { ...originalLocation, href: '' },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
    vi.unstubAllEnvs();
  });

  it('navigates to the backend /api/auth/google endpoint on click', async () => {
    const user = userEvent.setup();
    render(<LoginCard />);

    await user.click(screen.getByRole('button', { name: /continue with google/i }));

    expect(window.location.href).toBe('http://localhost:3000/api/auth/google');
  });
});
