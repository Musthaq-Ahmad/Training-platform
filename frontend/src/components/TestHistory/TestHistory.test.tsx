import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { TypingResultRecord } from '@itp/types';
import TestHistory from './TestHistory';

const results: TypingResultRecord[] = [
  {
    id: 'typing-3',
    wpm: 51,
    accuracy: 98,
    takenAt: '2026-09-30T14:20:00.000Z',
  },
  {
    id: 'typing-2',
    wpm: 47,
    accuracy: 94,
    takenAt: '2026-09-30T11:15:00.000Z',
  },
];

describe('TestHistory', () => {
  it('renders each saved result with WPM, accuracy and completion time', () => {
    render(<TestHistory results={results} />);

    expect(screen.getByText('51 WPM')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('47 WPM')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  it('shows an empty message when there are no saved tests', () => {
    render(<TestHistory results={[]} />);

    expect(
      screen.getByText('No typing tests yet. Complete a test to start your history.')
    ).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
