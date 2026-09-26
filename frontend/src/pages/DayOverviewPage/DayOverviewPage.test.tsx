import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import type { DayContent, DayTask } from '@itp/types';
import DayOverviewPage from './DayOverviewPage';
import { mockDayContents } from '../../api/dayOverview';

type MockDayContents = Record<string, DayContent>;

// mockDayContents is mutated per-test to cover locked / not-found / normal cases.
vi.mock('../../api/dayOverview', () => ({
  mockDayContents: {} as MockDayContents,
}));

function setDay(key: string, day: DayContent) {
  (mockDayContents as MockDayContents)[key] = day;
}

function clearDays() {
  const contents = mockDayContents as MockDayContents;
  for (const key of Object.keys(contents)) {
    delete contents[key];
  }
}

// Renders inside a real MemoryRouter/Routes so nested router components
// (DayBreadcrumb's <Link>, StateMessage's <Link>, etc.) have the context
// they need — no react-router mocking required, just a route param
// supplied via the URL.
function renderWithDayId(dayId: string) {
  return render(
    <MemoryRouter initialEntries={[`/days/${dayId}`]}>
      <Routes>
        <Route path="/days/:dayId" element={<DayOverviewPage />} />
      </Routes>
    </MemoryRouter>
  );
}

const baseDay: DayContent = {
  dayId: 'day-01',
  courseSlug: 'css',
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
  references: [],
  journalPrompt: 'What was the hardest part today?',
  journalResponse: '',
  isLocked: false,
  isCompleted: false,
  tasks: [
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
  ],
};

describe('DayOverviewPage', () => {
  beforeEach(() => {
    clearDays();
    vi.restoreAllMocks();
  });

  it('shows a not-found message when the dayId does not match any day', () => {
    renderWithDayId('day-99');

    expect(screen.getByRole('heading', { name: 'Day not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to Dashboard' })).toBeInTheDocument();
  });

  it('shows a locked message for a locked day, without rendering its content', () => {
    setDay('day-01', { ...baseDay, isLocked: true });

    renderWithDayId('day-01');

    expect(screen.getByRole('heading', { name: 'This day is locked' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to Dashboard' })).toBeInTheDocument();
    expect(screen.queryByText(baseDay.title)).not.toBeInTheDocument();
  });

  it("normalizes a bare numeric dayId (e.g. '1') to the 'day-01' key", () => {
    setDay('day-01', baseDay);

    renderWithDayId('1');

    expect(screen.getByText(baseDay.title)).toBeInTheDocument();
  });

  it('renders day content and counts only completed, non-stretch tasks', () => {
    setDay('day-01', baseDay);

    renderWithDayId('day-01');

    expect(screen.getByText(baseDay.title)).toBeInTheDocument();
    expect(screen.getByText(baseDay.subtitle)).toBeInTheDocument();
    // 1 completed non-stretch task; denominator is all 3 tasks (stretch included in the count shown here)
    expect(screen.getByRole('button', { name: /tasks \(1\/3\)/i })).toBeInTheDocument();
  });

  it('opens the task modal when the tasks summary is clicked, and closes it after selecting a task', () => {
    setDay('day-01', baseDay);

    renderWithDayId('day-01');

    fireEvent.click(screen.getByRole('button', { name: /tasks \(/i }));
    expect(screen.getByText('Style a button')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Style a button'));
    expect(screen.queryByText('Style a nav bar')).not.toBeInTheDocument();
  });

  it('marks the journal as saved after the save handler is called', () => {
    setDay('day-01', baseDay);

    renderWithDayId('day-01');

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'It was tricky to center things.' } });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/saved/i)).toBeInTheDocument();
  });

  it('calls onComplete logic when the complete button is clicked', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    setDay('day-01', {
      ...baseDay,
      tasks: baseDay.tasks.map((t): DayTask => ({ ...t, status: 'completed' })),
    });

    renderWithDayId('day-01');

    const submitButton = screen.getByRole('button', { name: /submit day/i });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(logSpy).toHaveBeenCalledWith('Submit Day clicked');
  });
});
