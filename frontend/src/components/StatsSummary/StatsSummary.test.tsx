import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StatsSummary from './StatsSummary';

describe('StatsSummary', () => {
  const total = {
    activeSeconds: 153000,
    codingSeconds: 51300,
  };

  const typing = {
    latestWpm: 74,
    latestAccuracy: 98.4,
  };

  it('renders total time', () => {
    render(<StatsSummary total={total} typing={typing} />);

    const stats = screen.getByRole('region', {
      name: 'Training statistics',
    });

    expect(within(stats).getByText('TOTAL TIME')).toBeInTheDocument();
    expect(within(stats).getByText('42h 30m')).toBeInTheDocument();
  });

  it('renders active coding time', () => {
    render(<StatsSummary total={total} typing={typing} />);

    const stats = screen.getByRole('region', {
      name: 'Training statistics',
    });

    expect(within(stats).getByText('ACTIVE CODING')).toBeInTheDocument();
    expect(within(stats).getByText('14h 15m')).toBeInTheDocument();
  });

  it('renders reading and lessons time as total minus coding time', () => {
    render(<StatsSummary total={total} typing={typing} />);

    const stats = screen.getByRole('region', {
      name: 'Training statistics',
    });

    expect(within(stats).getByText('READING & LESSONS')).toBeInTheDocument();
    expect(within(stats).getByText('28h 15m')).toBeInTheDocument();
  });

  it('renders latest typing speed', () => {
    render(<StatsSummary total={total} typing={typing} />);

    expect(screen.getByText('74 WPM')).toBeInTheDocument();
  });

  it('renders latest typing accuracy', () => {
    render(<StatsSummary total={total} typing={typing} />);

    expect(screen.getByText('98.4% accuracy')).toBeInTheDocument();
  });

  it('renders unavailable typing speed when latest WPM is null', () => {
    render(<StatsSummary total={total} typing={{ latestWpm: null, latestAccuracy: null }} />);

    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
