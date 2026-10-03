import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { getDayStatus } from '../../api/days';
import ReferenceRoute from './ReferenceRoute';

vi.mock('../../api/days', () => ({ getDayStatus: vi.fn() }));
vi.mock('./ReferencePage', () => ({
  default: ({ dayId }: { dayId: string }) => <h1>References for {dayId}</h1>,
}));

function renderRoute(dayId = 'html-day-02') {
  return render(
    <MemoryRouter initialEntries={[`/days/${dayId}/references`]}>
      <Routes>
        <Route path="/days/:dayId/references" element={<ReferenceRoute />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ReferenceRoute', () => {
  beforeEach(() => vi.resetAllMocks());

  it('renders references after the API confirms the day is unlocked', async () => {
    vi.mocked(getDayStatus).mockResolvedValue({ isLocked: false, isCompleted: false });

    renderRoute();

    expect(
      await screen.findByRole('heading', { name: 'References for html-day-02' })
    ).toBeInTheDocument();
    expect(getDayStatus).toHaveBeenCalledWith('html-day-02');
  });

  it('does not render reference content for a locked day', async () => {
    vi.mocked(getDayStatus).mockResolvedValue({ isLocked: true, isCompleted: false });

    renderRoute();

    expect(await screen.findByRole('heading', { name: 'This day is locked' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'References for html-day-02' })
    ).not.toBeInTheDocument();
  });

  it('does not render references if access status cannot be checked', async () => {
    vi.mocked(getDayStatus).mockRejectedValue(new Error('API unavailable'));

    renderRoute();

    expect(
      await screen.findByRole('heading', { name: "Couldn't verify access" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'References for html-day-02' })
    ).not.toBeInTheDocument();
  });
});
