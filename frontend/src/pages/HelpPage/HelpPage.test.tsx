import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import HelpPage from './HelpPage';

vi.mock('../../components/Header', () => ({ default: () => <header /> }));

function renderHelpPage() {
  return render(
    <MemoryRouter>
      <HelpPage />
    </MemoryRouter>
  );
}

describe('HelpPage', () => {
  it('renders the heading, search box and how-a-day-works section', () => {
    renderHelpPage();

    expect(screen.getByRole('heading', { name: 'How can we help?' })).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'Search help' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'How a training day works' })).toBeInTheDocument();
  });

  it('shows every topic section', () => {
    renderHelpPage();

    expect(screen.getByRole('heading', { name: 'Tasks & Editor' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Troubleshooting' })).toBeInTheDocument();
  });

  it('filters the questions while typing and hides the overview sections', async () => {
    const user = userEvent.setup();
    renderHelpPage();

    await user.type(screen.getByRole('searchbox', { name: 'Search help' }), 'paste');

    expect(screen.getByText("Why can't I paste into the editor?")).toBeInTheDocument();
    expect(screen.queryByText('Why is my day locked?')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'How a training day works' })
    ).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(/result/i);
  });

  it('shows a message when nothing matches', async () => {
    const user = userEvent.setup();
    renderHelpPage();

    await user.type(screen.getByRole('searchbox', { name: 'Search help' }), 'zzzz');

    expect(screen.getByRole('status')).toHaveTextContent('No results for "zzzz"');
  });
});
