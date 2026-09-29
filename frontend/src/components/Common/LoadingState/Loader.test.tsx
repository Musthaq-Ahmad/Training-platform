import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoaderOverlay from './Loader';

describe('LoaderOverlay', () => {
  it('renders the default loading label', () => {
    render(<LoaderOverlay />);

    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('renders a custom loading label', () => {
    render(<LoaderOverlay label="Loading dashboard…" />);

    expect(screen.getByText('Loading dashboard…')).toBeInTheDocument();
    expect(screen.queryByText('Loading…')).not.toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    render(
      <LoaderOverlay
        label="Loading dashboard…"
        description="Please wait while we fetch your data."
      />
    );

    expect(screen.getByText('Please wait while we fetch your data.')).toBeInTheDocument();
  });

  it('does not render the description when it is not provided', () => {
    render(<LoaderOverlay label="Loading dashboard…" />);

    expect(screen.queryByText('Please wait while we fetch your data.')).not.toBeInTheDocument();
  });

  it('renders as a full-page overlay when fullPage is true', () => {
    render(<LoaderOverlay fullPage />);

    const status = screen.getByRole('status');

    expect(status.className).toContain('fullPage');
  });

  it('renders as a contained overlay by default', () => {
    render(<LoaderOverlay />);

    const status = screen.getByRole('status');

    expect(status.className).toContain('contained');
  });

  it('renders as a contained overlay when fullPage is false', () => {
    render(<LoaderOverlay fullPage={false} />);

    const status = screen.getByRole('status');

    expect(status.className).toContain('contained');
  });

  it('applies a custom className', () => {
    render(<LoaderOverlay className="custom-loader" />);

    expect(screen.getByRole('status')).toHaveClass('custom-loader');
  });

  it('renders the loading state with the correct accessibility attributes', () => {
    render(<LoaderOverlay />);

    const status = screen.getByRole('status');

    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('aria-busy', 'true');
  });

  it('renders the spinner as hidden from assistive technologies', () => {
    const { container } = render(<LoaderOverlay />);

    const spinner = container.querySelector('[aria-hidden="true"]');

    expect(spinner).toBeInTheDocument();
  });
});
