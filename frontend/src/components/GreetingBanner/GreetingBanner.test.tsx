import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GreetingBanner from './index';

describe('GreetingBanner', () => {
  const progress = {
    completedDays: 10,
    totalDays: 54,
    completionPercent: 19,
  };

  it('shows the first name, greeting, and curriculum progress accessibly', () => {
    render(<GreetingBanner name="Fathima Fadwah" {...progress} />);

    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText('Welcome back, Fathima!')).toBeInTheDocument();
    expect(screen.getByText('👋')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Curriculum Completion')).toBeInTheDocument();
    expect(screen.getByText('10 / 54 days (19%)')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Dismiss greeting' })).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar', { name: 'Curriculum completion' })).toHaveAttribute(
      'aria-valuenow',
      '19'
    );
  });

  it.each([undefined, null, '', '   '])('omits the name when it is missing: %s', (name) => {
    render(<GreetingBanner name={name} {...progress} />);

    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.queryByText('👋')).not.toBeInTheDocument();
  });
});
