import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { TypingTestResult } from '@itp/types';
import TestHistory from './TestHistory';

const results: TypingTestResult[] = [
  {
    id: 'typing-3',
    testNumber: 3,
    wpm: 51,
    accuracy: 98,
    durationSeconds: 60,
    takenAt: '2026-09-30T14:20:00.000Z',
  },
  {
    id: 'typing-2',
    testNumber: 2,
    wpm: 47,
    accuracy: 94,
    durationSeconds: 60,
    takenAt: '2026-09-30T11:15:00.000Z',
  },
];

describe('TestHistory', () => {
  it('renders one row per result with its numbers', () => {
    render(<TestHistory results={results} averageWpm={49} averageAccuracy={96} />);

    expect(screen.getByText('Test 3')).toBeInTheDocument();
    expect(screen.getByText('51 WPM')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
    expect(screen.getAllByText('60 sec')).toHaveLength(2);
    expect(screen.getAllByText('Completed')).toHaveLength(2);
  });

  it("shows today's average WPM and accuracy", () => {
    render(<TestHistory results={results} averageWpm={49} averageAccuracy={96} />);

    expect(screen.getByText('49 WPM')).toBeInTheDocument();
    expect(screen.getByText('96%')).toBeInTheDocument();
  });

  it('shows an empty message and dashes when there are no tests today', () => {
    render(<TestHistory results={[]} averageWpm={null} averageAccuracy={null} />);

    expect(screen.getByText('No tests yet today. Start typing to begin.')).toBeInTheDocument();
    expect(screen.getByText('— WPM')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
