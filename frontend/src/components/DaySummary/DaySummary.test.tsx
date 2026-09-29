import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DaySummary from './DaySummary';

afterEach(() => {
  cleanup();
});

describe('DaySummary', () => {
  const defaultProps = {
    courseTitle: 'CSS',
    dayNumber: 1,
    totalDays: 10,
    title: 'Introduction to CSS',
    description: 'Learn the fundamentals of CSS styling.',
    completedTasks: 2,
    totalTasks: 4,
    onReferences: vi.fn(),
    onTasks: vi.fn(),
  };

  it('renders the uppercased course title with a two-digit day number', () => {
    render(<DaySummary {...defaultProps} />);

    expect(screen.getByText('CSS - DAY 01 OF 10')).toBeInTheDocument();
  });

  it('uppercases a mixed-case course title', () => {
    render(<DaySummary {...defaultProps} courseTitle="CSS Fundamentals" />);

    expect(screen.getByText('CSS FUNDAMENTALS - DAY 01 OF 10')).toBeInTheDocument();
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

  it('renders the Tasks button with completed and total task counts', () => {
    render(<DaySummary {...defaultProps} />);

    expect(screen.getByRole('button', { name: /tasks \(2\/4\)/i })).toBeInTheDocument();
  });

  it('renders zero progress when no tasks are completed', () => {
    render(<DaySummary {...defaultProps} completedTasks={0} totalTasks={3} />);

    expect(screen.getByRole('button', { name: /tasks \(0\/3\)/i })).toBeInTheDocument();
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

  it('does not call onReferences when the Tasks button is clicked', () => {
    const onReferences = vi.fn();

    render(<DaySummary {...defaultProps} onReferences={onReferences} />);

    fireEvent.click(screen.getByRole('button', { name: /tasks/i }));

    expect(onReferences).not.toHaveBeenCalled();
  });

  it('formats a single-digit day number with a leading zero', () => {
    render(<DaySummary {...defaultProps} dayNumber={5} />);

    expect(screen.getByText('CSS - DAY 05 OF 10')).toBeInTheDocument();
  });

  it('renders a two-digit day number without changing it', () => {
    render(<DaySummary {...defaultProps} dayNumber={12} totalDays={20} />);

    expect(screen.getByText('CSS - DAY 12 OF 20')).toBeInTheDocument();
  });
});
