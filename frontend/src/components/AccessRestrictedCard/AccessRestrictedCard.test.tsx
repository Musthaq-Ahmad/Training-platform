// AccessRestrictedCard.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccessRestrictedCard from './AccessrestrictedCard';

afterEach(() => {
  cleanup();
});
const defaultProps = {
  detectedEmail: 'alex.trainee@gmail.com',
  domainInfo: 'External Personal Domain • OAuth2 / IdP Ingress',
  allowedDomain: 'vonnue.com',
  onSignInRetry: vi.fn(),
};

describe('AccessRestrictedCard', () => {
  it('renders the title', () => {
    render(<AccessRestrictedCard {...defaultProps} />);
    expect(screen.getByRole('heading', { name: /access restricted/i })).toBeInTheDocument();
  });

  it('renders the allowed domain highlighted in the description', () => {
    render(<AccessRestrictedCard {...defaultProps} />);
    // The domain sits in its own <span>, so an exact match on that node works
    // even though the surrounding paragraph text is split across nodes.
    expect(screen.getByText(`@${defaultProps.allowedDomain}`)).toBeInTheDocument();
  });

  it('renders the detected identity: email and domain info', () => {
    render(<AccessRestrictedCard {...defaultProps} />);
    expect(screen.getByText('Detected identity')).toBeInTheDocument();
    expect(screen.getByText('Untrusted realm')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.detectedEmail)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.domainInfo)).toBeInTheDocument();
  });

  it('renders the platform policy notice', () => {
    render(<AccessRestrictedCard {...defaultProps} />);
    expect(screen.getByText(/vonnue zero-trust directory service/i)).toBeInTheDocument();
  });

  it('renders the retry button', () => {
    render(<AccessRestrictedCard {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: /sign in with google account/i })
    ).toBeInTheDocument();
  });

  it('calls onSignInRetry when the retry button is clicked', async () => {
    const user = userEvent.setup();
    const onSignInRetry = vi.fn();
    render(<AccessRestrictedCard {...defaultProps} onSignInRetry={onSignInRetry} />);

    await user.click(screen.getByRole('button', { name: /sign in with google account/i }));

    expect(onSignInRetry).toHaveBeenCalledTimes(1);
  });

  it('renders a different detected email when the prop changes', () => {
    render(<AccessRestrictedCard {...defaultProps} detectedEmail="someone.else@personal.com" />);
    expect(screen.getByText('someone.else@personal.com')).toBeInTheDocument();
    expect(screen.queryByText(defaultProps.detectedEmail)).not.toBeInTheDocument();
  });
});
