import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import type { DayCurrentStatus, DayTask } from '@itp/types';
import { ApiError } from '../../api/errors';
import { mockDayContents } from '../../api/dayOverview';
import { completeDay, getDayJournal, getDayStatus, getDayTasks } from '../../api/days';
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

describe('DayOverviewPage: completing the day', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(getDayTasks).mockResolvedValue([completedTask]);
    vi.mocked(getDayStatus).mockResolvedValue(openStatus);
    vi.mocked(getDayJournal).mockResolvedValue({ responseText: null });
  });

  it('calls completeDay and shows "Day completed" on success', async () => {
    vi.mocked(completeDay).mockResolvedValue({ ...openStatus, isCompleted: true });
    renderPage();

    fireEvent.click(await screen.findByRole('button', { name: /submit day/i }));

    expect(completeDay).toHaveBeenCalledWith(dayId);
    expect(await screen.findByText('Day completed')).toBeTruthy();
  });

  it('shows the server message when completion fails', async () => {
    vi.mocked(completeDay).mockRejectedValue(
      new ApiError(400, 'CHECKLIST_INCOMPLETE', 'Check all required items before submitting.')
    );
    renderPage();

    fireEvent.click(await screen.findByRole('button', { name: /submit day/i }));

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toBe('Check all required items before submitting.');
  });

  it('shows the locked message when the status says the day is locked', async () => {
    vi.mocked(getDayStatus).mockResolvedValue({ ...openStatus, isLocked: true });
    renderPage();

    expect(await screen.findByText('This day is locked')).toBeTruthy();
  });
});
