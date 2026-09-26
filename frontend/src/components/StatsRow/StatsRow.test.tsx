import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import StatsRow from './StatsRow';

describe('StatsRow', () => {
  it('renders all statistic labels', () => {
    render(
      <StatsRow
        totalActiveSeconds={7200}
        totalCodingSeconds={3600}
        latestWpm={65}
        onTakeTypingTest={vi.fn()}
      />
    );

    expect(screen.getByText('Total Time in Platform')).toBeInTheDocument();
    expect(screen.getByText('Active Coding Time')).toBeInTheDocument();
    expect(screen.getByText('Typing Speed (Most Recent)')).toBeInTheDocument();
  });

  it('renders the formatted total platform time', () => {
    render(
      <StatsRow
        totalActiveSeconds={7200}
        totalCodingSeconds={3600}
        latestWpm={65}
        onTakeTypingTest={vi.fn()}
      />
    );

    expect(screen.getByText('2h 0m')).toBeInTheDocument();
  });

  it('renders the formatted active coding time', () => {
    render(
      <StatsRow
        totalActiveSeconds={7200}
        totalCodingSeconds={3600}
        latestWpm={65}
        onTakeTypingTest={vi.fn()}
      />
    );

    expect(screen.getByText('1h 0m')).toBeInTheDocument();
  });

  it('renders the latest WPM when a typing speed is available', () => {
    render(
      <StatsRow
        totalActiveSeconds={7200}
        totalCodingSeconds={3600}
        latestWpm={65}
        onTakeTypingTest={vi.fn()}
      />
    );

    expect(screen.getByText('65 WPM')).toBeInTheDocument();
  });

  it('renders an em dash when the latest WPM is null', () => {
    render(
      <StatsRow
        totalActiveSeconds={7200}
        totalCodingSeconds={3600}
        latestWpm={null}
        onTakeTypingTest={vi.fn()}
      />
    );

    expect(screen.getByText('—')).toBeInTheDocument();
    expect(screen.queryByText(/WPM/)).not.toBeInTheDocument();
  });

  it('renders the typing test button', () => {
    render(
      <StatsRow
        totalActiveSeconds={7200}
        totalCodingSeconds={3600}
        latestWpm={65}
        onTakeTypingTest={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /take a typing test/i })).toBeInTheDocument();
  });

  it('calls onTakeTypingTest when the button is clicked', async () => {
    const user = userEvent.setup();
    const onTakeTypingTest = vi.fn();

    render(
      <StatsRow
        totalActiveSeconds={7200}
        totalCodingSeconds={3600}
        latestWpm={65}
        onTakeTypingTest={onTakeTypingTest}
      />
    );

    await user.click(screen.getByRole('button', { name: /take a typing test/i }));

    expect(onTakeTypingTest).toHaveBeenCalledTimes(1);
  });

  it('handles zero durations correctly', () => {
    render(
      <StatsRow
        totalActiveSeconds={0}
        totalCodingSeconds={0}
        latestWpm={0}
        onTakeTypingTest={vi.fn()}
      />
    );

    expect(screen.getAllByText('0h 0m')).toHaveLength(2);
    expect(screen.getByText('0 WPM')).toBeInTheDocument();
  });
});
