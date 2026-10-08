import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { JournalEntry } from '@itp/types';

import JournalPage from './JournalPage';
import { getJournalEntries } from '../../api/journal';

vi.mock('../../api/journal', () => ({
  getJournalEntries: vi.fn(),
}));

vi.mock('../../components/Header', () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock('../../components/HelpButton', () => ({
  default: () => (
    <a href="/help" aria-label="Open help">
      Help
    </a>
  ),
}));

vi.mock('../../components/JournalMessage', () => ({
  default: ({
    variant,
    description,
    onAction,
  }: {
    variant: string;
    description?: string;
    onAction?: () => void;
  }) => (
    <div data-testid={`journal-message-${variant}`}>
      {description && <span>{description}</span>}

      {onAction && <button onClick={onAction}>Retry</button>}
    </div>
  ),
}));

vi.mock('../../components/JournalSearchBar', () => ({
  default: ({
    value,
    onChange,
    entryCount,
    isDisabled,
  }: {
    value: string;
    onChange: (value: string) => void;
    entryCount: number | null;
    isDisabled: boolean;
  }) => (
    <div>
      <input
        data-testid="journal-search"
        value={value}
        disabled={isDisabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search journal"
      />

      <span data-testid="entry-count">{entryCount === null ? 'null' : entryCount}</span>
    </div>
  ),
}));

vi.mock('../../components/JournalEntryCard', () => ({
  default: ({
    entry,
    isExpanded,
    onToggle,
    onChangeText,
  }: {
    entry: JournalEntry;
    isExpanded: boolean;
    onToggle: (dayId: string) => void;
    onChangeText: (dayId: string, responseText: string) => void;
  }) => (
    <li data-testid={`journal-entry-${entry.dayId}`}>
      <button onClick={() => onToggle(entry.dayId)}>{entry.title}</button>

      <span data-testid={`expanded-${entry.dayId}`}>{isExpanded ? 'expanded' : 'collapsed'}</span>

      <span data-testid={`response-${entry.dayId}`}>{entry.responseText}</span>

      <button onClick={() => onChangeText(entry.dayId, 'Updated journal response')}>
        Update text
      </button>
    </li>
  ),
}));

const mockEntries: JournalEntry[] = [
  {
    dayId: 'day-1',
    dayNumber: 1,
    date: '2026-09-29',
    updatedAt: '2026-09-29T10:00:00.000Z',
    title: 'Introduction to React',
    trackLabel: 'Frontend',
    responseText: 'Learned about React components.',
    prompts: ['What did you learn?', 'What was difficult?'],
    isEditable: false,
  },
  {
    dayId: 'day-2',
    dayNumber: 2,
    date: '2026-09-30',
    updatedAt: '2026-09-30T10:00:00.000Z',
    title: 'React Hooks',
    trackLabel: 'Frontend',
    responseText: 'Learned useState and useEffect.',
    prompts: ['What are hooks?'],
    isEditable: false,
  },
  {
    dayId: 'day-3',
    dayNumber: 3,
    date: '2026-10-01',
    updatedAt: '2026-10-01T10:00:00.000Z',
    title: 'Current Day',
    trackLabel: 'Frontend',
    responseText: '',
    prompts: ['What did you learn today?'],
    isEditable: true,
  },
];

const mockedGetJournalEntries = vi.mocked(getJournalEntries);

function renderJournalPage() {
  return render(
    <MemoryRouter>
      <JournalPage />
    </MemoryRouter>
  );
}

describe('JournalPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the loading state initially', () => {
    mockedGetJournalEntries.mockReturnValue(new Promise(() => {}));

    renderJournalPage();

    expect(screen.getByLabelText('Loading journal entries')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Journal' })).toBeInTheDocument();

    expect(screen.getByText('Your daily reflections and notes.')).toBeInTheDocument();
  });

  it('loads and renders journal entries successfully', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: mockEntries,
    });

    renderJournalPage();

    expect(await screen.findByText('Introduction to React')).toBeInTheDocument();

    expect(screen.getByText('React Hooks')).toBeInTheDocument();

    expect(screen.getByText('Current Day')).toBeInTheDocument();

    expect(mockedGetJournalEntries).toHaveBeenCalledTimes(1);
  });

  it('opens the first past entry with written text by default', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: mockEntries,
    });

    renderJournalPage();

    await screen.findByText('Introduction to React');

    expect(screen.getByTestId('expanded-day-1')).toHaveTextContent('expanded');

    expect(screen.getByTestId('expanded-day-2')).toHaveTextContent('collapsed');

    expect(screen.getByTestId('expanded-day-3')).toHaveTextContent('collapsed');
  });

  it('toggles an entry when its title is clicked', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: mockEntries,
    });

    renderJournalPage();

    await screen.findByText('Introduction to React');

    const day1Button = screen.getByRole('button', {
      name: 'Introduction to React',
    });

    expect(screen.getByTestId('expanded-day-1')).toHaveTextContent('expanded');

    fireEvent.click(day1Button);

    expect(screen.getByTestId('expanded-day-1')).toHaveTextContent('collapsed');

    fireEvent.click(day1Button);

    expect(screen.getByTestId('expanded-day-1')).toHaveTextContent('expanded');
  });

  it('collapses the currently expanded entry when another entry is opened', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: mockEntries,
    });

    renderJournalPage();

    await screen.findByText('Introduction to React');

    expect(screen.getByTestId('expanded-day-1')).toHaveTextContent('expanded');

    fireEvent.click(
      screen.getByRole('button', {
        name: 'React Hooks',
      })
    );

    expect(screen.getByTestId('expanded-day-1')).toHaveTextContent('collapsed');

    expect(screen.getByTestId('expanded-day-2')).toHaveTextContent('expanded');
  });

  it('updates an entry response when the text changes', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: mockEntries,
    });

    renderJournalPage();

    await screen.findByText('Introduction to React');

    expect(screen.getByTestId('response-day-3')).toHaveTextContent('');

    const day3Entry = screen.getByTestId('journal-entry-day-3');

    fireEvent.click(
      within(day3Entry).getByRole('button', {
        name: 'Update text',
      })
    );

    expect(screen.getByTestId('response-day-3')).toHaveTextContent('Updated journal response');
  });

  it('filters entries using the search text', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: mockEntries,
    });

    renderJournalPage();

    await screen.findByText('Introduction to React');

    fireEvent.change(screen.getByTestId('journal-search'), {
      target: { value: 'hooks' },
    });

    expect(screen.getByText('React Hooks')).toBeInTheDocument();

    expect(screen.queryByText('Introduction to React')).not.toBeInTheDocument();

    expect(screen.queryByText('Current Day')).not.toBeInTheDocument();

    expect(screen.getByTestId('entry-count')).toHaveTextContent('1');
  });

  it('searches through track labels', async () => {
    const entries: JournalEntry[] = [
      {
        ...mockEntries[0],
        trackLabel: 'Backend Development',
      },
      mockEntries[1],
    ];

    mockedGetJournalEntries.mockResolvedValue({
      entries,
    });

    renderJournalPage();

    await screen.findByText('Introduction to React');

    fireEvent.change(screen.getByTestId('journal-search'), {
      target: { value: 'backend' },
    });

    expect(screen.getByText('Introduction to React')).toBeInTheDocument();

    expect(screen.queryByText('React Hooks')).not.toBeInTheDocument();
  });

  it('searches through prompts', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: mockEntries,
    });

    renderJournalPage();

    await screen.findByText('Introduction to React');

    fireEvent.change(screen.getByTestId('journal-search'), {
      target: { value: 'what was difficult' },
    });

    expect(screen.getByText('Introduction to React')).toBeInTheDocument();

    expect(screen.queryByText('React Hooks')).not.toBeInTheDocument();
  });

  it('searches case-insensitively', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: mockEntries,
    });

    renderJournalPage();

    await screen.findByText('Introduction to React');

    fireEvent.change(screen.getByTestId('journal-search'), {
      target: { value: 'REACT HOOKS' },
    });

    expect(screen.getByText('React Hooks')).toBeInTheDocument();

    expect(screen.queryByText('Introduction to React')).not.toBeInTheDocument();
  });

  it('shows no-results message when search has no matches', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: mockEntries,
    });

    renderJournalPage();

    await screen.findByText('Introduction to React');

    fireEvent.change(screen.getByTestId('journal-search'), {
      target: { value: 'javascript' },
    });

    expect(screen.getByTestId('journal-message-noResults')).toBeInTheDocument();

    expect(
      screen.getByText('Nothing matched “javascript”. Try a different keyword.')
    ).toBeInTheDocument();
  });

  it('clears the search when the no-results action is clicked', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: mockEntries,
    });

    renderJournalPage();

    await screen.findByText('Introduction to React');

    const searchInput = screen.getByTestId('journal-search');

    fireEvent.change(searchInput, {
      target: { value: 'does-not-exist' },
    });

    expect(screen.getByTestId('journal-message-noResults')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Retry',
      })
    );

    expect(searchInput).toHaveValue('');

    expect(screen.getByText('Introduction to React')).toBeInTheDocument();
  });

  it('shows empty state when there are no journal entries', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: [],
    });

    renderJournalPage();

    expect(await screen.findByTestId('journal-message-empty')).toBeInTheDocument();

    expect(screen.queryByTestId('journal-entry-day-1')).not.toBeInTheDocument();
  });

  it('shows error state when loading entries fails', async () => {
    mockedGetJournalEntries.mockRejectedValue({
      message: 'Failed to load journal entries',
    });

    renderJournalPage();

    expect(await screen.findByTestId('journal-message-error')).toBeInTheDocument();

    expect(screen.getByText('Failed to load journal entries')).toBeInTheDocument();
  });

  it('retries loading entries after an error', async () => {
    mockedGetJournalEntries
      .mockRejectedValueOnce({
        message: 'Failed to load journal entries',
      })
      .mockResolvedValueOnce({
        entries: mockEntries,
      });

    renderJournalPage();

    expect(await screen.findByTestId('journal-message-error')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Retry',
      })
    );

    expect(await screen.findByText('Introduction to React')).toBeInTheDocument();

    expect(mockedGetJournalEntries).toHaveBeenCalledTimes(2);
  });

  it('disables search while loading', () => {
    mockedGetJournalEntries.mockReturnValue(new Promise(() => {}));

    renderJournalPage();

    expect(screen.getByTestId('journal-search')).toBeDisabled();

    expect(screen.getByTestId('entry-count')).toHaveTextContent('null');
  });

  it('disables search when there is an error', async () => {
    mockedGetJournalEntries.mockRejectedValue({
      message: 'Something went wrong',
    });

    renderJournalPage();

    await screen.findByTestId('journal-message-error');

    expect(screen.getByTestId('journal-search')).toBeDisabled();

    expect(screen.getByTestId('entry-count')).toHaveTextContent('null');
  });

  it('shows the number of visible entries after searching', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: mockEntries,
    });

    renderJournalPage();

    await screen.findByText('Introduction to React');

    expect(screen.getByTestId('entry-count')).toHaveTextContent('3');

    fireEvent.change(screen.getByTestId('journal-search'), {
      target: { value: 'frontend' },
    });

    expect(screen.getByTestId('entry-count')).toHaveTextContent('3');

    fireEvent.change(screen.getByTestId('journal-search'), {
      target: { value: 'hooks' },
    });

    expect(screen.getByTestId('entry-count')).toHaveTextContent('1');
  });

  it('ignores whitespace around the search query', async () => {
    mockedGetJournalEntries.mockResolvedValue({
      entries: mockEntries,
    });

    renderJournalPage();

    await screen.findByText('Introduction to React');

    fireEvent.change(screen.getByTestId('journal-search'), {
      target: { value: '   hooks   ' },
    });

    expect(screen.getByText('React Hooks')).toBeInTheDocument();

    expect(screen.queryByText('Introduction to React')).not.toBeInTheDocument();
  });
});
