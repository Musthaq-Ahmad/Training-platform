import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import LearningObjectives from './LearningObjectives';

afterEach(() => {
  cleanup();
});

describe('LearningObjectives', () => {
  const mockObjectives = [
    {
      id: '1',
      code: '01',
      title: 'CSS Selectors',
      description: 'Learn how to target HTML elements using CSS selectors.',
    },
    {
      id: '2',
      code: '02',
      title: 'Box Model',
      description: 'Understand margins, padding, borders, and content.',
    },
  ];

  it('renders the Learning Objectives label', () => {
    render(<LearningObjectives objectives={mockObjectives} />);

    expect(screen.getByText('LEARNING OBJECTIVES')).toBeInTheDocument();
  });

  it('displays the correct number of core concepts', () => {
    render(<LearningObjectives objectives={mockObjectives} />);

    expect(screen.getByText('2 Core Concepts')).toBeInTheDocument();
  });

  it('renders each objective code', () => {
    render(<LearningObjectives objectives={mockObjectives} />);

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('renders each objective title', () => {
    render(<LearningObjectives objectives={mockObjectives} />);

    expect(screen.getByRole('heading', { name: 'CSS Selectors' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Box Model' })).toBeInTheDocument();
  });

  it('renders each objective description', () => {
    render(<LearningObjectives objectives={mockObjectives} />);

    expect(
      screen.getByText('Learn how to target HTML elements using CSS selectors.')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Understand margins, padding, borders, and content.')
    ).toBeInTheDocument();
  });

  it('displays zero core concepts when the objectives list is empty', () => {
    render(<LearningObjectives objectives={[]} />);

    expect(screen.getByText('0 Core Concepts')).toBeInTheDocument();
  });

  it('does not render objective items when the list is empty', () => {
    render(<LearningObjectives objectives={[]} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders the correct count for a single objective', () => {
    render(<LearningObjectives objectives={[mockObjectives[0]]} />);

    expect(screen.getByText('1 Core Concepts')).toBeInTheDocument();
  });
});
