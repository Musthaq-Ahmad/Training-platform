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

  it('renders the trainee name', () => {
    render(<ProfileHeader trainee={trainee} />);

    expect(screen.getByText('Rahul Sharma')).toBeInTheDocument();
  });

  it('renders the trainee email', () => {
    render(<ProfileHeader trainee={trainee} />);

    expect(screen.getByText('rahul.sharma@vonnue.com')).toBeInTheDocument();
  });

  it('renders the trainee track and progress', () => {
    render(<ProfileHeader trainee={trainee} />);

    expect(screen.getByText('JavaScript, Day 6 of 12')).toBeInTheDocument();
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
    expect(screen.getByText('React, Day 10 of 12')).toBeInTheDocument();
  });
});
