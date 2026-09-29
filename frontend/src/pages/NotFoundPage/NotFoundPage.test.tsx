import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import NotFoundPage from './NotFoundPage';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderNotFoundPage() {
  return render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );
}

describe('NotFoundPage', () => {
  it('renders the 404 status', () => {
    renderNotFoundPage();

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the page not found heading', () => {
    renderNotFoundPage();

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  });

  it('renders the page description', () => {
    renderNotFoundPage();

    expect(
      screen.getByText('The page you’re looking for doesn’t exist or may have been moved.')
    ).toBeInTheDocument();
  });

  it('renders the dashboard and go back actions', () => {
    renderNotFoundPage();

    expect(screen.getByRole('button', { name: 'Go to Dashboard' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
  });

  it('navigates to the dashboard when Go to Dashboard is clicked', async () => {
    const user = userEvent.setup();

    renderNotFoundPage();

    await user.click(screen.getByRole('button', { name: 'Go to Dashboard' }));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates back when Go Back is clicked', async () => {
    const user = userEvent.setup();

    renderNotFoundPage();

    await user.click(screen.getByRole('button', { name: 'Go Back' }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
