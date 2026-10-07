import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AdminHeader from './AdminHeader';

const mockLogout = vi.fn();

vi.mock('../../context/Useauth', () => ({
  useAuth: () => ({
    user: { id: 'admin-1', name: 'Mentor One', email: 'mentor@vonnue.com', role: 'admin' },
    isLoading: false,
    logout: mockLogout,
  }),
}));

afterEach(() => {
  cleanup();
});

function renderHeader(ui = <AdminHeader />, route = '/admin') {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe('AdminHeader', () => {
  it('renders the app name, the Mentor view badge and the mentor name', () => {
    renderHeader();
    expect(screen.getByText('Vink')).toHaveTextContent('VinkUp');
    expect(screen.getByText('Mentor view')).toBeInTheDocument();
    expect(screen.getByText('Mentor One')).toBeInTheDocument();
  });

  it('links to the trainee list and nowhere a mentor cannot go', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: 'Trainees' })).toHaveAttribute('href', '/admin');
    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Typing Test' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Mentor One' })).not.toBeInTheDocument();
  });

  it('keeps Trainees active on a trainee detail page', () => {
    renderHeader(<AdminHeader />, '/admin/trainees/abc');
    expect(screen.getByRole('link', { name: 'Trainees' })).toHaveAttribute('aria-current', 'page');
  });

  it('shows leading content instead of the app name when given', () => {
    renderHeader(<AdminHeader leading={<span>Custom crumb</span>} />);
    expect(screen.getByText('Custom crumb')).toBeInTheDocument();
    expect(screen.queryByText('Vink')).not.toBeInTheDocument();
  });

  it('has a log out button', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });
});
