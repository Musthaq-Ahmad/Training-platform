import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import type { TypingResultRecord, TypingTestStats } from '@itp/types';

import TypingTestPage from './TypingTestPage';
import { getTypingResults, saveTypingResult } from '../../api/typingTest';
import { ApiError } from '../../api/errors';

vi.mock('../../api/typingTest', () => ({
  getTypingResults: vi.fn(),
  saveTypingResult: vi.fn(),
}));

vi.mock('../../components/Header', () => ({
  default: () => <header>Header</header>,
}));

vi.mock('../../components/HelpButton', () => ({
  default: () => (
    <a href="/help" aria-label="Open help">
      Help
    </a>
  ),
}));

vi.mock('../../components/PassageDisplay', () => ({
  default: ({ passage, typed }: { passage: string; typed: string }) => (
    <div aria-label="Text to type">
      {passage}
      <span data-testid="typed-text">{typed}</span>
    </div>
  ),
}));

vi.mock('../../components/TestHistory', () => ({
  default: ({ results }: { results: TypingResultRecord[] }) => (
    <div>
      {results.map((result) => (
        <div key={result.id}>
          <span>{result.wpm} WPM</span>
        </div>
      ))}
    </div>
  ),
}));

type MockTypingTestState = {
  passage: string;
  typed: string;
  status: 'idle' | 'running' | 'finished';
  secondsLeft: number;
  durationSeconds: number;
  options: {
    punctuation: boolean;
    numbers: boolean;
  };
  handleInput: (value: string) => void;
  restart: (nextDuration?: number) => void;
  toggleOption: (key: 'punctuation' | 'numbers') => void;
  isPaused: boolean;
};

type UseTypingTestMock = (
  initialDuration: number,
  onFinish: (stats: TypingTestStats) => void
) => MockTypingTestState;

const mockUseTypingTest = vi.fn<UseTypingTestMock>();

vi.mock('../../hooks/useTypingTest', () => ({
  useTypingTest: (initialDuration: number, onFinish: (stats: TypingTestStats) => void) =>
    mockUseTypingTest(initialDuration, onFinish),
}));

const history: TypingResultRecord[] = [
  {
    id: 'typing-2',
    wpm: 51,
    accuracy: 98,
    takenAt: '2026-09-30T14:20:00.000Z',
  },
  {
    id: 'typing-1',
    wpm: 42,
    accuracy: 94,
    takenAt: '2026-09-30T09:00:00.000Z',
  },
];

const savedResult: TypingResultRecord = {
  id: 'typing-3',
  wpm: 24,
  accuracy: 100,
  takenAt: '2026-09-30T15:00:00.000Z',
};

const defaultTypingTestState: MockTypingTestState = {
  passage: 'hi',
  typed: '',
  status: 'idle',
  secondsLeft: 60,
  durationSeconds: 60,
  options: {
    punctuation: false,
    numbers: false,
  },
  handleInput: vi.fn(),
  restart: vi.fn(),
  toggleOption: vi.fn(),
  isPaused: false,
};

function getTypingInput() {
  return screen.getByLabelText('Type the text shown above');
}

function renderTypingTestPage(overrides: Partial<MockTypingTestState> = {}) {
  /*
   * Only replace the mock state when overrides are explicitly supplied.
   *
   * This is important because some tests configure mockUseTypingTest
   * themselves using mockReturnValue/mockImplementation before rendering.
   * The previous helper always overwrote those configurations.
   */
  if (Object.keys(overrides).length > 0) {
    mockUseTypingTest.mockReturnValue({
      ...defaultTypingTestState,
      ...overrides,
    });
  }

  return render(
    <MemoryRouter>
      <TypingTestPage />
    </MemoryRouter>
  );
}

describe('TypingTestPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getTypingResults).mockResolvedValue(history);
    vi.mocked(saveTypingResult).mockResolvedValue(savedResult);

    mockUseTypingTest.mockReturnValue({
      ...defaultTypingTestState,
      handleInput: vi.fn(),
      restart: vi.fn(),
      toggleOption: vi.fn(),
    });
  });

  it('renders the page header, title and typing area', () => {
    renderTypingTestPage();

    expect(screen.getByText('Header')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Typing Test' })).toBeInTheDocument();

    expect(screen.getByLabelText('Text to type')).toHaveTextContent('hi');

    expect(screen.getByRole('timer')).toHaveTextContent('01:00');
  });

  it('shows a loading message while history loads', () => {
    vi.mocked(getTypingResults).mockReturnValue(new Promise(() => {}));

    renderTypingTestPage();

    expect(screen.getByText('Loading history...')).toBeInTheDocument();
  });

  it('shows history once it has loaded', async () => {
    renderTypingTestPage();

    expect(await screen.findByText('51 WPM')).toBeInTheDocument();

    expect(screen.getByText('42 WPM')).toBeInTheDocument();
  });

  it('shows the error when history fails to load', async () => {
    vi.mocked(getTypingResults).mockRejectedValue(
      new ApiError(500, 'INTERNAL_ERROR', 'Failed to load history')
    );

    renderTypingTestPage();

    expect(await screen.findByText('Failed to load history')).toBeInTheDocument();

    expect(getTypingInput()).toBeInTheDocument();
  });

  it('shows the timeout overlay when the test is finished', () => {
    renderTypingTestPage({
      status: 'finished',
      secondsLeft: 0,
    });

    const overlay = screen.getByRole('status');

    expect(overlay).toHaveTextContent("Time's up!");

    expect(overlay).toHaveTextContent('Press Enter or Restart Test to try again');

    expect(
      screen.getByRole('button', {
        name: 'Restart Test',
      })
    ).toBeInTheDocument();
  });

  it('shows WPM and accuracy labels in the timeout overlay', () => {
    let finishCallback: ((stats: TypingTestStats) => void) | undefined;

    let testFinished = false;

    mockUseTypingTest.mockImplementation((_duration, onFinish) => {
      finishCallback = onFinish;

      return {
        ...defaultTypingTestState,
        status: testFinished ? 'finished' : 'running',
        secondsLeft: testFinished ? 0 : 60,
      };
    });

    const { rerender } = render(
      <MemoryRouter>
        <TypingTestPage />
      </MemoryRouter>
    );

    act(() => {
      finishCallback?.({
        wpm: 45,
        accuracy: 96,
        durationSeconds: 60,
      });

      testFinished = true;
    });

    rerender(
      <MemoryRouter>
        <TypingTestPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toHaveTextContent("Time's up!");

    expect(screen.getByText('WPM')).toBeInTheDocument();

    expect(screen.getByText('ACCURACY')).toBeInTheDocument();

    expect(screen.getByText('45')).toBeInTheDocument();

    expect(screen.getByText('96%')).toBeInTheDocument();
  });

  it('shows the saving state when the result is being saved', async () => {
    let finishCallback: ((stats: TypingTestStats) => void) | undefined;

    mockUseTypingTest.mockImplementation((_initialDuration, onFinish) => {
      finishCallback = onFinish;

      return {
        ...defaultTypingTestState,
        status: 'finished',
        secondsLeft: 0,
      };
    });

    vi.mocked(saveTypingResult).mockReturnValue(new Promise(() => {}));

    /*
     * Do not pass overrides here.
     * This allows the mockImplementation above to remain active.
     */
    renderTypingTestPage();

    expect(screen.getByText("Time's up!")).toBeInTheDocument();

    act(() => {
      finishCallback?.({
        wpm: 24,
        accuracy: 100,
        durationSeconds: 60,
      });
    });

    expect(await screen.findByText('Saving result...')).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Restart Test',
      })
    ).toBeDisabled();

    expect(
      screen.getByRole('button', {
        name: '30s',
      })
    ).toBeDisabled();
  });

  it('shows an error when the result cannot be saved', async () => {
    let finishCallback: ((stats: TypingTestStats) => void) | undefined;

    mockUseTypingTest.mockImplementation((_initialDuration, onFinish) => {
      finishCallback = onFinish;

      return {
        ...defaultTypingTestState,
        status: 'finished',
        secondsLeft: 0,
      };
    });

    vi.mocked(saveTypingResult).mockRejectedValue(
      new ApiError(500, 'INTERNAL_ERROR', 'Server unavailable')
    );

    /*
     * Do not pass overrides here.
     * This preserves the mockImplementation above.
     */
    renderTypingTestPage();

    act(() => {
      finishCallback?.({
        wpm: 24,
        accuracy: 100,
        durationSeconds: 60,
      });
    });

    expect(await screen.findByRole('alert')).toHaveTextContent('Server unavailable');
  });

  it('changes the timer when another mode is selected', async () => {
    const user = userEvent.setup();
    const restart = vi.fn();

    mockUseTypingTest.mockReturnValue({
      ...defaultTypingTestState,
      restart,
    });

    /*
     * Do not pass overrides so the test's mockReturnValue is preserved.
     */
    renderTypingTestPage();

    await user.click(
      screen.getByRole('button', {
        name: '30s',
      })
    );

    expect(restart).toHaveBeenCalledWith(30);
  });

  it('restarts the test when Restart Test is clicked', async () => {
    const user = userEvent.setup();
    const restart = vi.fn();

    mockUseTypingTest.mockReturnValue({
      ...defaultTypingTestState,
      typed: 'h',
      restart,
    });

    renderTypingTestPage();

    await user.click(
      screen.getByRole('button', {
        name: 'Restart Test',
      })
    );

    expect(restart).toHaveBeenCalledWith(undefined);
  });

  it('turns punctuation and numbers on and off', async () => {
    const user = userEvent.setup();
    const toggleOption = vi.fn();

    mockUseTypingTest.mockReturnValue({
      ...defaultTypingTestState,
      toggleOption,
    });

    renderTypingTestPage();

    const punctuation = screen.getByRole('button', {
      name: 'punctuation',
    });

    const numbers = screen.getByRole('button', {
      name: 'numbers',
    });

    expect(punctuation).toHaveAttribute('aria-pressed', 'false');

    expect(numbers).toHaveAttribute('aria-pressed', 'false');

    await user.click(punctuation);

    expect(toggleOption).toHaveBeenCalledWith('punctuation');

    await user.click(numbers);

    expect(toggleOption).toHaveBeenCalledWith('numbers');
  });

  it('shows the resume prompt when inactivity pauses the test', () => {
    mockUseTypingTest.mockReturnValue({
      ...defaultTypingTestState,
      status: 'running',
      secondsLeft: 42,
      isPaused: true,
    });

    renderTypingTestPage();

    expect(screen.getByText('PAUSED')).toBeInTheDocument();

    expect(screen.getByText('Press any key to continue')).toBeInTheDocument();

    expect(screen.getByRole('timer')).toHaveTextContent('00:42');
  });

  it('renders the correct timer value', () => {
    mockUseTypingTest.mockReturnValue({
      ...defaultTypingTestState,
      secondsLeft: 30,
    });

    renderTypingTestPage();

    expect(screen.getByRole('timer')).toHaveTextContent('00:30');
  });

  it('marks the selected duration as active', () => {
    mockUseTypingTest.mockReturnValue({
      ...defaultTypingTestState,
      durationSeconds: 30,
    });

    renderTypingTestPage();

    expect(
      screen.getByRole('button', {
        name: '30s',
      })
    ).toHaveAttribute('aria-pressed', 'true');

    expect(
      screen.getByRole('button', {
        name: '60s',
      })
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('marks enabled typing options as active', () => {
    mockUseTypingTest.mockReturnValue({
      ...defaultTypingTestState,
      options: {
        punctuation: true,
        numbers: true,
      },
    });

    renderTypingTestPage();

    expect(
      screen.getByRole('button', {
        name: 'punctuation',
      })
    ).toHaveAttribute('aria-pressed', 'true');

    expect(
      screen.getByRole('button', {
        name: 'numbers',
      })
    ).toHaveAttribute('aria-pressed', 'true');
  });
});
