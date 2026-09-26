import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrentLessonCard from './CurrentLessonCard';

const defaultProps = {
  courseTitle: 'JAVASCRIPT',
  dayNumber: 6,
  totalDays: 12,
  lessonTitle: 'Closures and Higher-Order Functions',
  description:
    'Implement memoized function wrappers and partial application utilities with strict scope isolation.',
  onContinue: vi.fn(),
};

describe('CurrentLessonCard', () => {
  it('renders the course title, day number, and total days as one line', () => {
    render(<CurrentLessonCard {...defaultProps} />);
    expect(screen.getByText('JAVASCRIPT — DAY 6 OF 12')).toBeInTheDocument();
  });

  it('renders the lesson title as a heading', () => {
    render(<CurrentLessonCard {...defaultProps} />);
    expect(
      screen.getByRole('heading', { name: 'Closures and Higher-Order Functions' })
    ).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<CurrentLessonCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('renders an empty description without crashing', () => {
    render(<CurrentLessonCard {...defaultProps} description="" />);
    expect(
      screen.getByRole('heading', { name: 'Closures and Higher-Order Functions' })
    ).toBeInTheDocument();
  });

  it('calls onContinue when the Continue button is clicked', () => {
    const onContinue = vi.fn();
    render(<CurrentLessonCard {...defaultProps} onContinue={onContinue} />);

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it('renders different day/course data when props change', () => {
    render(<CurrentLessonCard {...defaultProps} courseTitle="HTML" dayNumber={1} totalDays={5} />);
    expect(screen.getByText('HTML — DAY 1 OF 5')).toBeInTheDocument();
  });
});
