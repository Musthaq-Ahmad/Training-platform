import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StatsRow from './StatsRow';

describe('StatsRow', () => {
  it('renders all statistic labels', () => {
    render(<StatsRow totalActiveSeconds={7200} totalCodingSeconds={3600} latestWpm={65} />);

    expect(screen.getByText('Total Time in Platform')).toBeInTheDocument();
    expect(screen.getByText('Active Coding Time')).toBeInTheDocument();
    expect(screen.getByText('Typing Speed (Most Recent)')).toBeInTheDocument();
  });

  it('renders the formatted total platform time', () => {
    render(<StatsRow totalActiveSeconds={7200} totalCodingSeconds={3600} latestWpm={65} />);

    expect(screen.getByText('2h 0m')).toBeInTheDocument();
  });

  it('renders the formatted active coding time', () => {
    render(<StatsRow totalActiveSeconds={7200} totalCodingSeconds={3600} latestWpm={65} />);

    expect(screen.getByText('1h 0m')).toBeInTheDocument();
  });

  it('renders the latest WPM when a typing speed is available', () => {
    render(<StatsRow totalActiveSeconds={7200} totalCodingSeconds={3600} latestWpm={65} />);

    expect(screen.getByText('65 WPM')).toBeInTheDocument();
  });

  it('renders an em dash when the latest WPM is null', () => {
    render(<StatsRow totalActiveSeconds={7200} totalCodingSeconds={3600} latestWpm={null} />);

    expect(screen.getByText('—')).toBeInTheDocument();
    expect(screen.queryByText(/WPM/)).not.toBeInTheDocument();
  });

  it('handles zero durations correctly', () => {
    render(<StatsRow totalActiveSeconds={0} totalCodingSeconds={0} latestWpm={0} />);

    expect(screen.getAllByText('0h 0m')).toHaveLength(2);
    expect(screen.getByText('0 WPM')).toBeInTheDocument();
  });
});
