import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import StatsSummary from './StatsSummary';

afterEach(() => {
  cleanup();
});

describe('StatsSummary', () => {
  const total = {
    activeSeconds: 153000,
    readingSeconds: 51300,
  };

  const typing = {
    latestWpm: 74,
    latestAccuracy: 98.4,
  };

  it('renders total active time', () => {
    render(<StatsSummary total={total} typing={typing} />);

    expect(screen.getByText('42h 30m')).toBeInTheDocument();
  });

  it('renders reading time', () => {
    render(<StatsSummary total={total} typing={typing} />);

    expect(screen.getByText('14h 15m')).toBeInTheDocument();
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
    render(
      <StatsSummary
        total={total}
        typing={{
          latestWpm: null,
          latestAccuracy: null,
        }}
      />
    );

    expect(screen.getByText(/N\/A|—|Not available/i)).toBeInTheDocument();
  });
});
