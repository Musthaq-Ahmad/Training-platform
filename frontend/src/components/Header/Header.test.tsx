import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Header from './Header';

afterEach(() => {
  cleanup();
});

describe('Header', () => {
  it('renders the app name, current page label, and user name', () => {
    render(<Header currentPageLabel="Dashboard" onLogout={() => {}} onProfileClick={() => {}} />);

    expect(screen.getByText('In-House Trainee Training Platform')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Rahul Sharma')).toBeInTheDocument();
  });

  it('calls onProfileClick when the user name is clicked', () => {
    const onProfileClick = vi.fn();
    render(
      <Header currentPageLabel="Dashboard" onLogout={() => {}} onProfileClick={onProfileClick} />
    );

    fireEvent.click(screen.getByText('Rahul Sharma'));
    expect(onProfileClick).toHaveBeenCalledTimes(1);
  });

  it('calls onLogout when the logout button is clicked', () => {
    const onLogout = vi.fn();
    render(<Header currentPageLabel="Dashboard" onLogout={onLogout} onProfileClick={() => {}} />);

    fireEvent.click(screen.getByText('Log out'));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
