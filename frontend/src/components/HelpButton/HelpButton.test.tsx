import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import HelpButton from './HelpButton';

describe('HelpButton', () => {
  it('renders the Help text', () => {
    render(
      <MemoryRouter>
        <HelpButton />
      </MemoryRouter>
    );

    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  it('uses /help as the default route', () => {
    render(
      <MemoryRouter>
        <HelpButton />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Open help' })).toHaveAttribute('href', '/help');
  });

  it('uses the custom route when provided', () => {
    render(
      <MemoryRouter>
        <HelpButton to="/support" />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Open help' })).toHaveAttribute('href', '/support');
  });

  it('has the correct accessible label', () => {
    render(
      <MemoryRouter>
        <HelpButton />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Open help' })).toBeInTheDocument();
  });

  it('renders the help icon', () => {
    render(
      <MemoryRouter>
        <HelpButton />
      </MemoryRouter>
    );

    const icon = document.querySelector('svg');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
