import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import type { DayCurrentStatus, DayTask } from '@itp/types';
import { ApiError } from '../../api/errors';
import { mockDayContents } from '../../api/dayOverview';
import {
  completeDay,
  getDayContent,
  getDayJournal,
  getDayStatus,
  getDayTasks,
  saveJournal,
} from '../../api/days';
import DayOverviewPage from './DayOverviewPage';

vi.mock('../../api/days');
// The header needs providers we don't care about here.
vi.mock('../../components/Header', () => ({ default: () => null }));

const dayId = Object.keys(mockDayContents)[0];

const completedTask = {
  id: 't-1',
  title: 'Required task',
  status: 'completed' as const,
  isStretchGoal: false,
} as DayTask;

const openStatus = { isLocked: false, isCompleted: false } as DayCurrentStatus;

function renderPage() {
  render(
    <MemoryRouter initialEntries={[`/days/${dayId}`]}>
      <Routes>
        <Route path="/days/:dayId" element={<DayOverviewPage />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(getDayContent).mockResolvedValue(mockDayContents[dayId]);
  vi.mocked(getDayTasks).mockResolvedValue([completedTask]);
  vi.mocked(getDayStatus).mockResolvedValue(openStatus);
  vi.mocked(getDayJournal).mockResolvedValue({ responseText: null });
});

afterEach(() => {
  cleanup();
});

describe('DayOverviewPage: loading', () => {
  it('loads the content, tasks, status and journal for the day in the URL', async () => {
    renderPage();

    await screen.findByRole('button', { name: /submit day/i });

    expect(getDayContent).toHaveBeenCalledWith(dayId);
    expect(getDayTasks).toHaveBeenCalledWith(dayId);
    expect(getDayStatus).toHaveBeenCalledWith(dayId);
    expect(getDayJournal).toHaveBeenCalledWith(dayId);
  });

  it('shows the locked message when the status says the day is locked', async () => {
    vi.mocked(getDayStatus).mockResolvedValue({ ...openStatus, isLocked: true });
    renderPage();

    expect(await screen.findByText('This day is locked')).toBeInTheDocument();
  });

  it('shows the locked message when the API answers DAY_LOCKED', async () => {
    vi.mocked(getDayTasks).mockRejectedValue(
      new ApiError(403, 'DAY_LOCKED', "This day isn't unlocked yet.")
    );
    renderPage();

    expect(await screen.findByText('This day is locked')).toBeInTheDocument();
  });

  it('shows a generic error when loading fails', async () => {
    vi.mocked(getDayStatus).mockRejectedValue(
      new ApiError(500, 'INTERNAL_ERROR', 'Something went wrong. Please try again.')
    );
    renderPage();

    expect(await screen.findByText("Couldn't load this day")).toBeInTheDocument();
  });
});

describe('DayOverviewPage: completing the day', () => {
  it('calls completeDay and shows "Day completed" on success', async () => {
    vi.mocked(completeDay).mockResolvedValue({ ...openStatus, isCompleted: true });
    renderPage();

    fireEvent.click(await screen.findByRole('button', { name: /submit day/i }));

    expect(completeDay).toHaveBeenCalledWith(dayId);
    expect(await screen.findByText('Day completed')).toBeInTheDocument();
  });

  it('shows the server message when completion fails', async () => {
    vi.mocked(completeDay).mockRejectedValue(
      new ApiError(400, 'CHECKLIST_INCOMPLETE', 'Check all required items before submitting.')
    );
    renderPage();

    fireEvent.click(await screen.findByRole('button', { name: /submit day/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Check all required items before submitting.'
    );
  });

  it('disables the button when a required task is not completed', async () => {
    vi.mocked(getDayTasks).mockResolvedValue([
      { ...completedTask, status: 'not_started' } as unknown as DayTask,
    ]);
    renderPage();

    expect(await screen.findByRole('button', { name: /submit day/i })).toBeDisabled();
  });
});

describe('DayOverviewPage: daily journal', () => {
  it('restores the saved journal text', async () => {
    vi.mocked(getDayJournal).mockResolvedValue({ responseText: 'Saved earlier' });
    renderPage();

    await screen.findByRole('button', { name: /save journal/i });

    expect(screen.getByRole('textbox')).toHaveValue('Saved earlier');
  });

  it('starts empty when nothing is saved yet', async () => {
    renderPage();

    await screen.findByRole('button', { name: /save journal/i });

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('starts empty when loading the journal fails, without breaking the page', async () => {
    vi.mocked(getDayJournal).mockRejectedValue(
      new ApiError(500, 'INTERNAL_ERROR', 'Something went wrong. Please try again.')
    );
    renderPage();

    await screen.findByRole('button', { name: /save journal/i });

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('saves the text for this day and shows "Saved successfully"', async () => {
    vi.mocked(saveJournal).mockResolvedValue(undefined);
    renderPage();

    await screen.findByRole('button', { name: /save journal/i });

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Learned Prisma' } });
    fireEvent.click(screen.getByRole('button', { name: /save journal/i }));

    expect(saveJournal).toHaveBeenCalledWith(dayId, 'Learned Prisma');
    expect(await screen.findByText('Saved successfully')).toBeInTheDocument();
  });

  it('shows an error and no success message when saving fails', async () => {
    vi.mocked(saveJournal).mockRejectedValue(
      new ApiError(500, 'INTERNAL_ERROR', 'Something went wrong. Please try again.')
    );
    renderPage();

    await screen.findByRole('button', { name: /save journal/i });

    fireEvent.click(screen.getByRole('button', { name: /save journal/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Something went wrong. Please try again.'
    );
    expect(screen.queryByText('Saved successfully')).not.toBeInTheDocument();
  });
});
