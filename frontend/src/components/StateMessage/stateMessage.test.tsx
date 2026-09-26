import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import StateMessage from './StateMessage';

// StateMessage renders a <Link> when an action is provided, so it needs
// router context even though this test never navigates anywhere.
function renderStateMessage(props: Parameters<typeof StateMessage>[0]) {
  return render(
    <MemoryRouter>
      <StateMessage {...props} />
    </MemoryRouter>
  );
}

describe('StateMessage', () => {
  it('renders the title and description', () => {
    renderStateMessage({
      icon: '🔍',
      title: 'Day not found',
      description: "We couldn't find the day you're looking for.",
    });

    expect(screen.getByRole('heading', { name: 'Day not found' })).toBeInTheDocument();
    expect(screen.getByText("We couldn't find the day you're looking for.")).toBeInTheDocument();
  });

  it('renders the icon', () => {
    renderStateMessage({
      icon: '🔒',
      title: 'This day is locked',
      description: 'Finish the previous day to unlock this one.',
    });

    expect(screen.getByText('🔒')).toBeInTheDocument();
  });

  it('hides the icon from assistive tech', () => {
    renderStateMessage({
      icon: '🔒',
      title: 'This day is locked',
      description: 'Finish the previous day to unlock this one.',
    });

    expect(screen.getByText('🔒').closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it('renders an action link when both actionLabel and actionHref are given', () => {
    renderStateMessage({
      icon: '🔍',
      title: 'Day not found',
      description: "We couldn't find the day you're looking for.",
      actionLabel: 'Back to Dashboard',
      actionHref: '/',
    });

    const link = screen.getByRole('link', { name: 'Back to Dashboard' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('does not render an action link when actionLabel/actionHref are omitted', () => {
    renderStateMessage({
      icon: '🔍',
      title: 'Day not found',
      description: "We couldn't find the day you're looking for.",
    });

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('does not render an action link when only actionLabel is given', () => {
    renderStateMessage({
      icon: '🔍',
      title: 'Day not found',
      description: "We couldn't find the day you're looking for.",
      actionLabel: 'Back to Dashboard',
    });

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('exposes the message as a status region for assistive tech', () => {
    renderStateMessage({
      icon: '🔍',
      title: 'Day not found',
      description: "We couldn't find the day you're looking for.",
    });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
