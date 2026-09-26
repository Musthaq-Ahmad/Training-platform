import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import LessonSummary from './LessonSummary';

afterEach(() => {
  cleanup();
});

describe('LessonSummary', () => {
  const mockSummary =
    'By the end of the day, you will understand CSS selectors, the box model, and basic styling.';

  it('renders the section heading', () => {
    render(<LessonSummary summary={mockSummary} />);

    expect(screen.getByText('BY THE END OF THE DAY')).toBeInTheDocument();
  });

  it('renders the provided summary text', () => {
    render(<LessonSummary summary={mockSummary} />);

    expect(screen.getByText(mockSummary)).toBeInTheDocument();
  });

  it('renders the summary inside a paragraph', () => {
    render(<LessonSummary summary={mockSummary} />);

    expect(screen.getByText(mockSummary).tagName).toBe('P');
  });

  it('renders an empty summary when the summary prop is empty', () => {
    const { container } = render(<LessonSummary summary="" />);

    expect(container.querySelector('p')).toBeEmptyDOMElement();
  });

  it('updates the summary when the prop changes', () => {
    const { rerender } = render(<LessonSummary summary="Initial summary" />);

    expect(screen.getByText('Initial summary')).toBeInTheDocument();

    rerender(<LessonSummary summary="Updated summary" />);

    expect(screen.getByText('Updated summary')).toBeInTheDocument();
    expect(screen.queryByText('Initial summary')).not.toBeInTheDocument();
  });
});
