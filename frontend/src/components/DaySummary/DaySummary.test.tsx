import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DaySummary from './DaySummary';

afterEach(() => {
  cleanup();
});

describe('DaySummary', () => {
  const defaultProps = {
    dayNumber: 1,
    totalDays: 10,
    title: 'Introduction to CSS',
    description: 'Learn the fundamentals of CSS styling.',
    completedTasks: 2,
    totalTasks: 4,
    onReferences: vi.fn(),
    onTasks: vi.fn(),
  };

  it('renders the day label with a two-digit day number', () => {
    render(<DaySummary {...defaultProps} />);

    expect(screen.getByText('CSS - DAY 01 OF 10')).toBeInTheDocument();
  });

  it('renders the title and description', () => {
    render(<DaySummary {...defaultProps} />);

    expect(screen.getByRole('heading', { name: 'Introduction to CSS' })).toBeInTheDocument();

    expect(screen.getByText('Learn the fundamentals of CSS styling.')).toBeInTheDocument();
  });

  it('renders the References button', () => {
    render(<DaySummary {...defaultProps} />);

    expect(screen.getByRole('button', { name: /references/i })).toBeInTheDocument();
  });

  it('renders the Tasks button with the correct task count', () => {
    render(<DaySummary {...defaultProps} />);

    expect(screen.getByRole('button', { name: /tasks \(2\/5\)/i })).toBeInTheDocument();
  });

  it('calls onReferences when the References button is clicked', () => {
    const onReferences = vi.fn();

    render(<DaySummary {...defaultProps} onReferences={onReferences} />);

    fireEvent.click(screen.getByRole('button', { name: /references/i }));

    expect(onReferences).toHaveBeenCalledTimes(1);
  });

  it('calls onTasks when the Tasks button is clicked', () => {
    const onTasks = vi.fn();

    render(<DaySummary {...defaultProps} onTasks={onTasks} />);

    fireEvent.click(screen.getByRole('button', { name: /tasks/i }));

    expect(onTasks).toHaveBeenCalledTimes(1);
  });

  it('formats a single-digit day number with a leading zero', () => {
    render(<DaySummary {...defaultProps} dayNumber={5} />);

    expect(screen.getByText('CSS - DAY 05 OF 10')).toBeInTheDocument();
  });

  it('renders a two-digit day number without changing it', () => {
    render(<DaySummary {...defaultProps} dayNumber={12} />);

    expect(screen.getByText('CSS - DAY 12 OF 10')).toBeInTheDocument();
  });
});
