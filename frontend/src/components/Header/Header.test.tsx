import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Header from './Header';

const mockLogout = vi.fn();

vi.mock('../../context/Useauth', () => ({
  useAuth: () => ({
    user: {
      id: 'user-1',
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
    },
    isLoading: false,
    logout: mockLogout,
  }),
}));

afterEach(() => {
  cleanup();
});

describe('Header', () => {
  it('renders the app name, dashboard link, and user name', () => {
    render(<Header />);
    expect(screen.getByText('In-House Trainee Training Platform')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Rahul Sharma')).toBeInTheDocument();
  });

  it('renders Dashboard, user name, and logout as clickable buttons', () => {
    render(<Header />);
    expect(screen.getByText('Dashboard').tagName).toBe('BUTTON');
    expect(screen.getByText('Rahul Sharma').tagName).toBe('BUTTON');
    expect(screen.getByText('Log out').tagName).toBe('BUTTON');
  });

  it('shows leading content instead of the app name when given', () => {
    render(<Header leading={<span>Custom crumb</span>} />);

    expect(screen.getByText('Custom crumb')).toBeInTheDocument();
    expect(screen.queryByText(/in-house trainee training platform/i)).not.toBeInTheDocument();
  });

  it('renders the status slot before the nav', () => {
    render(<Header status={<span>ACTIVE SESSION</span>} />);

    expect(screen.getByText('ACTIVE SESSION')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  });
});
