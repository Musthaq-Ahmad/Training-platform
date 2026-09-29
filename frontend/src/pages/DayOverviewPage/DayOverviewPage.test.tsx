import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import type { DayContent, DayTask } from '@itp/types';
import type { ApiError } from '../../api/errors';
import DayOverviewPage from './DayOverviewPage';
import { getDayContent, getDayTasks } from '../../api/days';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

vi.mock('../../components/Header', () => ({
  default: () => <header>Header</header>,
}));

vi.mock('../../api/days', () => ({
  getDayContent: vi.fn(),
  getDayTasks: vi.fn(),
}));

const mockGetDayContent = vi.mocked(getDayContent);
const mockGetDayTasks = vi.mocked(getDayTasks);

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
  journalResponse: '',
  isCompleted: false,
} as DayContent;

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

function mockSuccess(day: DayContent = baseDay, tasks: DayTask[] = baseTasks) {
  mockGetDayContent.mockResolvedValue(day);
  mockGetDayTasks.mockResolvedValue(tasks);
}

describe('DayOverviewPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows a loading state while the requests are pending', () => {
    mockGetDayContent.mockReturnValue(new Promise(() => {}));
    mockGetDayTasks.mockReturnValue(new Promise(() => {}));

    renderWithDayId('day-01');

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('passes the dayId from the URL to the API unchanged', async () => {
    mockSuccess();

    renderWithDayId('day-01');

    await screen.findByText(baseDay.title);
    expect(mockGetDayContent).toHaveBeenCalledWith('day-01');
    expect(mockGetDayTasks).toHaveBeenCalledWith('day-01');
  });

  it('shows a not-found message when the API returns NOT_FOUND', async () => {
    mockGetDayContent.mockRejectedValue(makeApiError('NOT_FOUND'));
    mockGetDayTasks.mockRejectedValue(makeApiError('NOT_FOUND'));

    renderWithDayId('day-99');

    expect(await screen.findByRole('heading', { name: 'Day not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to Dashboard' })).toBeInTheDocument();
  });

  it('shows a locked message when the API returns DAY_LOCKED, without rendering content', async () => {
    mockGetDayContent.mockRejectedValue(makeApiError('DAY_LOCKED'));
    mockGetDayTasks.mockRejectedValue(makeApiError('DAY_LOCKED'));

    renderWithDayId('day-01');

    expect(await screen.findByRole('heading', { name: 'This day is locked' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to Dashboard' })).toBeInTheDocument();
    expect(screen.queryByText(baseDay.title)).not.toBeInTheDocument();
  });

  it('renders no day content for an unexpected error', async () => {
    mockGetDayContent.mockRejectedValue(makeApiError('SERVER_ERROR'));
    mockGetDayTasks.mockRejectedValue(makeApiError('SERVER_ERROR'));

    renderWithDayId('day-01');

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    expect(screen.queryByText(baseDay.title)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Day not found' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'This day is locked' })).not.toBeInTheDocument();
  });

  it('renders day content and counts only completed, non-stretch tasks', async () => {
    mockSuccess();

    renderWithDayId('day-01');

    expect(await screen.findByText(baseDay.title)).toBeInTheDocument();
    expect(screen.getByText(baseDay.subtitle)).toBeInTheDocument();
    // 1 of 2 required tasks completed; the stretch goal is excluded from both numbers.
    expect(screen.getByRole('button', { name: /tasks \(1\/2\)/i })).toBeInTheDocument();
  });

  it('navigates to the references page when References is clicked', async () => {
    mockSuccess();

    renderWithDayId('day-01');

    await screen.findByText(baseDay.title);
    fireEvent.click(screen.getByRole('button', { name: /references/i }));

    expect(await screen.findByText('References page')).toBeInTheDocument();
  });

  it('closes the task modal and logs the task id when a task is selected', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    mockSuccess();

    renderWithDayId('day-01');

    await screen.findByText(baseDay.title);
    fireEvent.click(screen.getByRole('button', { name: /tasks \(/i }));
    expect(screen.getByText('Style a button')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Style a button'));

    expect(logSpy).toHaveBeenCalledWith('Selected task:', 'task-1');
    expect(screen.queryByText('Style a button')).not.toBeInTheDocument();
  });

  it('marks the journal as saved after the save handler is called', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    mockSuccess();

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
    mockSuccess(
      baseDay,
      baseTasks.map((t): DayTask => ({ ...t, status: 'completed' }))
    );

    renderWithDayId('day-01');

    const submitButton = await screen.findByRole('button', { name: /submit day/i });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(logSpy).toHaveBeenCalledWith('Submit Day clicked');
  });

  it('disables Submit Day while required tasks are incomplete', async () => {
    mockSuccess();

    renderWithDayId('day-01');

    expect(await screen.findByRole('button', { name: /submit day/i })).toBeDisabled();
  });
});
