import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import TaskPage from './TaskPage';
import { getTask, getTaskCode } from '../../api/tasks';
import { ApiError } from '../../api/errors';
import { taskFixture, taskCodeFixture } from '../../test/fixtures/task';

vi.mock('../../api/tasks');

function renderTaskPage(taskId = 't1') {
  return render(
    <MemoryRouter initialEntries={[`/task/${taskId}`]}>
      <Routes>
        <Route path="/task/:taskId" element={<TaskPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('TaskPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows a loading state while the task is loading', () => {
    vi.mocked(getTask).mockReturnValue(new Promise(() => {}));
    vi.mocked(getTaskCode).mockReturnValue(new Promise(() => {}));

    renderTaskPage();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows a not-found state for a NOT_FOUND error', async () => {
    vi.mocked(getTask).mockRejectedValue(new ApiError(404, 'NOT_FOUND', 'Task not found.'));
    vi.mocked(getTaskCode).mockResolvedValue(taskCodeFixture);

    renderTaskPage('not-found');

    expect(await screen.findByRole('alert')).toBeInTheDocument();

    expect(screen.getByText(/task not found/i)).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /back to dashboard/i,
      })
    ).toBeInTheDocument();
  });

  it('shows a generic error state with Retry for an unexpected error', async () => {
    vi.mocked(getTask).mockRejectedValue(
      new ApiError(500, 'INTERNAL_ERROR', 'Something went wrong. Please try again.')
    );
    vi.mocked(getTaskCode).mockResolvedValue(taskCodeFixture);

    renderTaskPage('error');

    expect(await screen.findByRole('alert')).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /retry/i,
      })
    ).toBeInTheDocument();
  });

  it('retries loading when Retry is clicked', async () => {
    const user = userEvent.setup();

    vi.mocked(getTask)
      .mockRejectedValueOnce(
        new ApiError(500, 'INTERNAL_ERROR', 'Something went wrong. Please try again.')
      )
      .mockResolvedValueOnce(taskFixture);

    vi.mocked(getTaskCode).mockResolvedValue(taskCodeFixture);

    renderTaskPage('t1');

    const retryButton = await screen.findByRole('button', {
      name: /retry/i,
    });

    await user.click(retryButton);

    expect(getTask).toHaveBeenCalledTimes(2);
    expect(getTaskCode).toHaveBeenCalledTimes(2);

    expect(await screen.findByText(taskFixture.title)).toBeInTheDocument();
  });

  it('renders the task on successful load', async () => {
    vi.mocked(getTask).mockResolvedValue(taskFixture);
    vi.mocked(getTaskCode).mockResolvedValue(taskCodeFixture);

    renderTaskPage('t1');

    expect(await screen.findByText(taskFixture.title)).toBeInTheDocument();
  });
});
