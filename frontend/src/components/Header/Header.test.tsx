import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Header from './Header';

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
});
