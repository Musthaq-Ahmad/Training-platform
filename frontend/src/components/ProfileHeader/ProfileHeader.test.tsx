import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { ProfileData } from '@itp/types';

import ProfileHeader from './ProfileHeader';

afterEach(() => {
  cleanup();
});

describe('ProfileHeader', () => {
  const trainee: ProfileData['trainee'] = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@vonnue.com',
    track: 'JavaScript',
    currentDay: 6,
    totalDays: 12,
  };

  it('renders the trainee name as the page heading', () => {
    render(<ProfileHeader trainee={trainee} />);

    expect(screen.getByRole('heading', { name: 'Rahul Sharma' })).toBeInTheDocument();
  });

  it('renders the trainee email', () => {
    render(<ProfileHeader trainee={trainee} />);

    expect(screen.getByText('rahul.sharma@vonnue.com')).toBeInTheDocument();
  });

  it('renders the initials avatar', () => {
    render(<ProfileHeader trainee={trainee} />);

    expect(screen.getByText('RS')).toBeInTheDocument();
  });

  it('renders the current course and day', () => {
    render(<ProfileHeader trainee={trainee} />);

    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Day 6 of 12')).toBeInTheDocument();
  });

  it('shows the position in the course as a progress bar', () => {
    render(<ProfileHeader trainee={trainee} />);

    const bar = screen.getByRole('progressbar', { name: 'JavaScript progress' });
    expect(bar).toHaveAttribute('aria-valuenow', '6');
    expect(bar).toHaveAttribute('aria-valuemax', '12');
    expect(bar.firstElementChild).toHaveStyle({ width: '50%' });
  });

  it('renders different trainee data correctly', () => {
    const differentTrainee: ProfileData['trainee'] = {
      name: 'Jane Doe',
      email: 'jane.doe@vonnue.com',
      track: 'React',
      currentDay: 10,
      totalDays: 12,
    };

    render(<ProfileHeader trainee={differentTrainee} />);

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane.doe@vonnue.com')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Day 10 of 12')).toBeInTheDocument();
  });
});
