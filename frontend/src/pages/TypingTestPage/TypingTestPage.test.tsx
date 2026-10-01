import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TypingTestResult, TypingTodayResponse } from '@itp/types';

import TypingTestPage from './TypingTestPage';
import { getTypingToday, saveTypingResult } from '../../api/typingTest';
import { ApiError } from '../../api/errors';

vi.mock('../../api/typingTest', () => ({
  getTypingToday: vi.fn(),
  saveTypingResult: vi.fn(),
}));

vi.mock('../../components/Header', () => ({
  default: () => <header>Header</header>,
}));

vi.mock('../../lib/typingStats', async () => {
  const actual =
    await vi.importActual<typeof import('../../lib/typingStats')>('../../lib/typingStats');
  return { ...actual, buildPassage: () => 'hi' };
});

const todayResponse: TypingTodayResponse = {
  results: [
    {
      id: 'typing-2',
      testNumber: 2,
      wpm: 51,
      accuracy: 98,
      durationSeconds: 60,
      takenAt: '2026-09-30T14:20:00.000Z',
    },
    {
      id: 'typing-1',
      testNumber: 1,
      wpm: 42,
      accuracy: 94,
      durationSeconds: 60,
      takenAt: '2026-09-30T09:00:00.000Z',
    },
  ],
  averageWpm: 47,
  averageAccuracy: 96,
};

const savedResult: TypingTestResult = {
  id: 'typing-3',
  testNumber: 3,
  wpm: 24,
  accuracy: 100,
  durationSeconds: 1,
  takenAt: '2026-09-30T15:00:00.000Z',
};

function getTypingInput() {
  return screen.getByLabelText('Type the text shown above');
}

describe('TypingTestPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getTypingToday).mockResolvedValue(todayResponse);
    vi.mocked(saveTypingResult).mockResolvedValue(savedResult);
  });

  it('renders the page header, title and the typing area right away', () => {
    vi.mocked(getTypingToday).mockReturnValue(new Promise(() => {}));

    render(<TypingTestPage />);

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Typing Test' })).toBeInTheDocument();
    expect(screen.getByLabelText('Text to type')).toHaveTextContent('hi');
    expect(screen.getByRole('timer')).toHaveTextContent('01:00');
  });

  it('shows a loading message while the history loads', () => {
    vi.mocked(getTypingToday).mockReturnValue(new Promise(() => {}));

    render(<TypingTestPage />);

    expect(screen.getByText('Loading history...')).toBeInTheDocument();
  });

  it("shows today's history once it has loaded", async () => {
    render(<TypingTestPage />);

    expect(await screen.findByText('Test 2')).toBeInTheDocument();
    expect(screen.getByText('51 WPM')).toBeInTheDocument();
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('47 WPM')).toBeInTheDocument(); // today's average
  });

  it('shows the error message when the history fails to load, but keeps the test usable', async () => {
    vi.mocked(getTypingToday).mockRejectedValue(
      new ApiError(500, 'INTERNAL_ERROR', 'Failed to load history')
    );

    render(<TypingTestPage />);

    expect(await screen.findByText('Failed to load history')).toBeInTheDocument();
    expect(getTypingInput()).toBeInTheDocument();
  });

  it('saves the result and reloads the history when the passage is completed', async () => {
    const user = userEvent.setup();
    render(<TypingTestPage />);
    await screen.findByText('Test 2');

    await user.type(getTypingInput(), 'hi');

    await waitFor(() => expect(saveTypingResult).toHaveBeenCalledTimes(1));
    expect(saveTypingResult).toHaveBeenCalledWith(
      expect.objectContaining({ accuracy: 100, durationSeconds: 1 })
    );
    await waitFor(() => expect(getTypingToday).toHaveBeenCalledTimes(2));
    expect(screen.getByRole('status')).toHaveTextContent('Test complete');
  });

  it('shows an error when the result could not be saved', async () => {
    const user = userEvent.setup();
    vi.mocked(saveTypingResult).mockRejectedValue(
      new ApiError(500, 'INTERNAL_ERROR', 'Server unavailable')
    );
    render(<TypingTestPage />);
    await screen.findByText('Test 2');

    await user.type(getTypingInput(), 'hi');

    expect(await screen.findByRole('alert')).toHaveTextContent('Server unavailable');
  });

  it('disables Restart Test and the mode buttons while the result is being saved', async () => {
    const user = userEvent.setup();
    vi.mocked(saveTypingResult).mockReturnValue(new Promise(() => {}));
    render(<TypingTestPage />);
    await screen.findByText('Test 2');

    await user.type(getTypingInput(), 'hi');

    expect(await screen.findByRole('button', { name: 'Restart Test' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '30s' })).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent('Saving...');
  });

  it('blocks pasting text into the test', async () => {
    const user = userEvent.setup();
    render(<TypingTestPage />);
    await screen.findByText('Test 2');

    await user.click(getTypingInput());
    await user.paste('hi');

    expect(getTypingInput()).toHaveValue('');
    expect(saveTypingResult).not.toHaveBeenCalled();
  });

  it('changes the timer when another mode is selected', async () => {
    const user = userEvent.setup();
    render(<TypingTestPage />);
    await screen.findByText('Test 2');

    await user.click(screen.getByRole('button', { name: '30s' }));

    expect(screen.getByRole('timer')).toHaveTextContent('00:30');
    expect(screen.getByRole('button', { name: '30s' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: '60s' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('clears the typed text when Restart Test is clicked', async () => {
    const user = userEvent.setup();
    render(<TypingTestPage />);
    await screen.findByText('Test 2');

    await user.type(getTypingInput(), 'h');
    expect(getTypingInput()).toHaveValue('h');

    await user.click(screen.getByRole('button', { name: 'Restart Test' }));

    expect(getTypingInput()).toHaveValue('');
  });

  it('restarts the test when Escape is pressed', async () => {
    const user = userEvent.setup();
    render(<TypingTestPage />);
    await screen.findByText('Test 2');

    await user.type(getTypingInput(), 'h');
    await user.keyboard('{Escape}');

    expect(getTypingInput()).toHaveValue('');
  });
  it('turns punctuation and numbers on and off', async () => {
    const user = userEvent.setup();
    render(<TypingTestPage />);
    await screen.findByText('Test 2');

    const punctuation = screen.getByRole('button', { name: 'punctuation' });
    const numbers = screen.getByRole('button', { name: 'numbers' });
    expect(punctuation).toHaveAttribute('aria-pressed', 'false');
    expect(numbers).toHaveAttribute('aria-pressed', 'false');

    await user.click(punctuation);
    expect(punctuation).toHaveAttribute('aria-pressed', 'true');
    expect(numbers).toHaveAttribute('aria-pressed', 'false');

    await user.click(punctuation);
    expect(punctuation).toHaveAttribute('aria-pressed', 'false');
  });

  it('clears the typed text when an option is toggled', async () => {
    const user = userEvent.setup();
    render(<TypingTestPage />);
    await screen.findByText('Test 2');

    await user.type(getTypingInput(), 'h');
    await user.click(screen.getByRole('button', { name: 'numbers' }));

    expect(getTypingInput()).toHaveValue('');
  });
});
