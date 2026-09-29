import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import type { DayContent, DayTask, DayCurrentStatus, DayJournal } from '@itp/types';
import type { ApiError } from '../../api/errors';
import DayOverviewPage from './DayOverviewPage';
import { getDayTasks, getDayStatus, getDayJournal } from '../../api/days';
import { mockDayContents } from '../../api/dayOverview';

const mockNavigate = vi.fn();
const useMockNavigate = false;

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();

  return {
    ...actual,
    useNavigate: () => (useMockNavigate ? mockNavigate : actual.useNavigate()),
  };
});

vi.mock('../../components/Header', () => ({
  default: () => <header>Header</header>,
}));

vi.mock('../../api/days', () => ({
  getDayTasks: vi.fn(),
  getDayStatus: vi.fn(),
  getDayJournal: vi.fn(),
}));

// Day content is static in the page, so each test fills this object.
vi.mock('../../api/dayOverview', () => ({
  mockDayContents: {} as Record<string, DayContent>,
}));

const mockGetDayTasks = vi.mocked(getDayTasks);
const mockGetDayStatus = vi.mocked(getDayStatus);
const mockGetDayJournal = vi.mocked(getDayJournal);
const days = mockDayContents;

function makeApiError(code: string, message = code): ApiError {
  return Object.assign(new Error(message), { code }) as unknown as ApiError;
}

function ReferencesRouteProbe() {
  return <p>References page</p>;
}

// Real MemoryRouter so <Link>, useNavigate, and useParams work without mocking react-router.
function renderWithDayId(dayId: string) {
  return render(
    <MemoryRouter initialEntries={[`/days/${dayId}`]}>
      <Routes>
        <Route path="/days/:dayId" element={<DayOverviewPage />} />
        <Route path="/days/:dayId/references" element={<ReferencesRouteProbe />} />
      </Routes>
    </MemoryRouter>
  );
}

const baseDay: DayContent = {
  dayId: 'day-01',
  courseSlug: 'css',
  courseTitle: 'CSS Fundamentals',
  dayNumber: 1,
  totalDays: 10,
  title: 'Intro to CSS',
  subtitle: 'Learn the basics of styling',
  lessonSummary: "Today you'll learn selectors and the box model.",
  learningObjectives: [
    {
      id: 'lo-1',
      code: 'LO-1',
      title: 'Understand selectors',
      description: 'Know how to target elements with class, id, and element selectors.',
    },
    {
      id: 'lo-2',
      code: 'LO-2',
      title: 'Understand the box model',
      description: 'Know how margin, border, padding, and content combine to size an element.',
    },
  ],
  selfCheckItems: [
    {
      id: 'sc-1',
      code: 'SC-1',
      label: 'I can style a div',
      description: 'Can apply background, sizing, and spacing to a div.',
      isRequired: true,
    },
  ],
  journalPrompt: 'What was the hardest part today?',
};

const baseTasks: DayTask[] = [
  {
    id: 'task-1',
    sequenceOrder: 1,
    title: 'Style a button',
    status: 'completed',
    isStretchGoal: false,
  },
  {
    id: 'task-2',
    sequenceOrder: 2,
    title: 'Style a nav bar',
    status: 'not_started',
    isStretchGoal: false,
  },
  {
    id: 'task-3',
    sequenceOrder: 3,
    title: 'Bonus animation',
    status: 'not_started',
    isStretchGoal: true,
  },
];

const baseStatus: DayCurrentStatus = { isLocked: false, isCompleted: false };
const emptyJournal: DayJournal = { responseText: null };

function setDay(day: DayContent = baseDay) {
  days[day.dayId] = day;
}

function mockLoad(
  tasks: DayTask[] = baseTasks,
  status: DayCurrentStatus = baseStatus,
  journal: DayJournal = emptyJournal
) {
  mockGetDayTasks.mockResolvedValue(tasks);
  mockGetDayStatus.mockResolvedValue(status);
  mockGetDayJournal.mockResolvedValue(journal);
}

describe('DayOverviewPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    for (const key of Object.keys(days)) {
      delete days[key];
    }
    // The page calls .catch() on the journal promise, so it must always return one.
    mockGetDayJournal.mockResolvedValue(emptyJournal);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('shows a loading state while the requests are pending', () => {
    setDay();
    mockGetDayTasks.mockReturnValue(new Promise(() => {}));
    mockGetDayStatus.mockReturnValue(new Promise(() => {}));
    mockGetDayJournal.mockReturnValue(new Promise(() => {}));

    renderWithDayId('day-01');

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('fetches tasks, status and journal with the dayId from the URL, unchanged', async () => {
    setDay();
    mockLoad();

    renderWithDayId('day-01');

    await screen.findByText(baseDay.title);
    expect(mockGetDayTasks).toHaveBeenCalledWith('day-01');
    expect(mockGetDayStatus).toHaveBeenCalledWith('day-01');
    expect(mockGetDayJournal).toHaveBeenCalledWith('day-01');
  });

  it('shows a not-found message when the dayId has no day content, without calling the API', () => {
    renderWithDayId('day-99');

    expect(screen.getByRole('heading', { name: 'Day not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to Dashboard' })).toBeInTheDocument();
    expect(mockGetDayTasks).not.toHaveBeenCalled();
    expect(mockGetDayStatus).not.toHaveBeenCalled();
    expect(mockGetDayJournal).not.toHaveBeenCalled();
  });

  it('shows a not-found message when the API returns NOT_FOUND', async () => {
    setDay();
    mockGetDayTasks.mockRejectedValue(makeApiError('NOT_FOUND'));
    mockGetDayStatus.mockRejectedValue(makeApiError('NOT_FOUND'));

    renderWithDayId('day-01');

    expect(await screen.findByRole('heading', { name: 'Day not found' })).toBeInTheDocument();
  });

  it('shows a locked message when the status says the day is locked', async () => {
    setDay();
    mockLoad(baseTasks, { ...baseStatus, isLocked: true });

    renderWithDayId('day-01');

    expect(await screen.findByRole('heading', { name: 'This day is locked' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to Dashboard' })).toBeInTheDocument();
    expect(screen.queryByText(baseDay.title)).not.toBeInTheDocument();
  });

  it('shows a locked message when the API returns DAY_LOCKED', async () => {
    setDay();
    mockGetDayTasks.mockRejectedValue(makeApiError('DAY_LOCKED'));
    mockGetDayStatus.mockResolvedValue(baseStatus);

    renderWithDayId('day-01');

    expect(await screen.findByRole('heading', { name: 'This day is locked' })).toBeInTheDocument();
    expect(screen.queryByText(baseDay.title)).not.toBeInTheDocument();
  });

  it('shows an error message for an unexpected API error', async () => {
    setDay();
    mockGetDayTasks.mockRejectedValue(makeApiError('SERVER_ERROR'));
    mockGetDayStatus.mockRejectedValue(makeApiError('SERVER_ERROR'));

    renderWithDayId('day-01');

    expect(
      await screen.findByRole('heading', { name: "Couldn't load this day" })
    ).toBeInTheDocument();
    expect(screen.queryByText(baseDay.title)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Day not found' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'This day is locked' })).not.toBeInTheDocument();
  });

  it('renders day content and counts only completed, non-stretch tasks', async () => {
    setDay();
    mockLoad();

    renderWithDayId('day-01');

    expect(await screen.findByText(baseDay.title)).toBeInTheDocument();
    expect(screen.getByText(baseDay.subtitle)).toBeInTheDocument();
    // 1 of 2 required tasks completed; the stretch goal is excluded from both numbers.
    expect(screen.getByRole('button', { name: /tasks \(1\/2\)/i })).toBeInTheDocument();
  });

  it('pre-fills the journal with the saved response', async () => {
    setDay();
    mockLoad(baseTasks, baseStatus, { responseText: 'Saved earlier' });

    renderWithDayId('day-01');

    expect(await screen.findByRole('textbox')).toHaveValue('Saved earlier');
  });

  it('still renders the day when the journal request fails', async () => {
    setDay();
    mockLoad();
    mockGetDayJournal.mockRejectedValue(makeApiError('SERVER_ERROR'));

    renderWithDayId('day-01');

    expect(await screen.findByText(baseDay.title)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('navigates to the references page when References is clicked', async () => {
    setDay();
    mockLoad();

    renderWithDayId('day-01');

    await screen.findByText(baseDay.title);
    fireEvent.click(screen.getByRole('button', { name: /references/i }));

    expect(await screen.findByText('References page')).toBeInTheDocument();
  });

  // it('closes the task modal and navigates to the selected task', async () => {
  //   useMockNavigate = true;
  //   setDay();
  //   mockLoad();

  //   renderWithDayId('day-01');

  //   await screen.findByText(baseDay.title);

  //   fireEvent.click(
  //     screen.getByRole('button', { name: /tasks/i })
  //   );

  //   expect(screen.getByText('Style a button')).toBeInTheDocument();

  //   fireEvent.click(
  //     screen.getByRole('button', { name: /style a button/i })
  //   );

  //   expect(screen.queryByText('Style a button')).not.toBeInTheDocument();

  //   expect(mockNavigate).toHaveBeenCalledWith('/tasks/task-1');
  // });

  it('marks the journal as saved after the save handler is called', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    setDay();
    mockLoad();

    renderWithDayId('day-01');

    await screen.findByText(baseDay.title);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'It was tricky to center things.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(logSpy).toHaveBeenCalledWith('Journal response:', 'It was tricky to center things.');
    expect(screen.getByText(/saved/i)).toBeInTheDocument();
  });

  it('enables Submit Day when all required tasks are completed and handles the click', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    setDay();
    mockLoad(baseTasks.map((t): DayTask => ({ ...t, status: 'completed' })));

    renderWithDayId('day-01');

    const submitButton = await screen.findByRole('button', { name: /submit day/i });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(logSpy).toHaveBeenCalledWith('Submit Day clicked');
  });

  it('disables Submit Day while required tasks are incomplete', async () => {
    setDay();
    mockLoad();

    renderWithDayId('day-01');

    expect(await screen.findByRole('button', { name: /submit day/i })).toBeDisabled();
  });

  it('disables Submit Day when the day is already completed', async () => {
    setDay();
    mockLoad(
      baseTasks.map((t): DayTask => ({ ...t, status: 'completed' })),
      { ...baseStatus, isCompleted: true }
    );

    renderWithDayId('day-01');

    expect(await screen.findByRole('button', { name: /day completed/i })).toBeDisabled();
  });
});
