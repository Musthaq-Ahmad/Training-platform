import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ErrorState } from './ErrorState';

describe('ErrorState', () => {
  it('renders default title and message', () => {
    render(<ErrorState />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
    expect(
      screen.getByText("We couldn't load this content. Please try again.")
    ).toBeInTheDocument();
  });

  it('renders custom title and message', () => {
    render(
      <ErrorState
        title="Unable to load profile"
        message="We couldn't load your profile information. Please try again."
      />
    );

    expect(screen.getByRole('heading', { name: 'Unable to load profile' })).toBeInTheDocument();

    expect(
      screen.getByText("We couldn't load your profile information. Please try again.")
    ).toBeInTheDocument();
  });

  it('does not render the message when an empty message is provided', () => {
    render(<ErrorState message="" />);

    expect(
      screen.queryByText("We couldn't load this content. Please try again.")
    ).not.toBeInTheDocument();
  });

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorState />);

    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
  });

  it('renders retry button when onRetry is provided', () => {
    const onRetry = vi.fn();

    render(<ErrorState onRetry={onRetry} />);

    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(<ErrorState onRetry={onRetry} />);

    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders custom retry label', () => {
    const onRetry = vi.fn();

    render(<ErrorState onRetry={onRetry} retryLabel="Retry loading" />);

    expect(screen.getByRole('button', { name: 'Retry loading' })).toBeInTheDocument();
  });

  it('uses h1 heading and fullPage layout when fullPage is true', () => {
    render(<ErrorState fullPage />);

    const heading = screen.getByRole('heading', {
      name: 'Something went wrong',
    });

    expect(heading.tagName).toBe('H1');
    expect(screen.getByRole('alert')).toHaveAttribute('data-layout', 'fullPage');
  });

  it('uses h2 heading and contained layout by default', () => {
    render(<ErrorState />);

    const heading = screen.getByRole('heading', {
      name: 'Something went wrong',
    });

    expect(heading.tagName).toBe('H2');
    expect(screen.getByRole('alert')).toHaveAttribute('data-layout', 'contained');
  });

  it('applies a custom class name', () => {
    render(<ErrorState className="custom-error" />);

    expect(screen.getByRole('alert')).toHaveClass('custom-error');
  });

  it('has correct accessibility attributes', () => {
    render(<ErrorState title="Unable to load profile" message="Please try again." />);

    const alert = screen.getByRole('alert');
    const heading = screen.getByRole('heading', {
      name: 'Unable to load profile',
    });
    const message = screen.getByText('Please try again.');

    expect(alert).toHaveAttribute('aria-labelledby', heading.getAttribute('id'));

    expect(alert).toHaveAttribute('aria-describedby', message.getAttribute('id'));
  });
});
