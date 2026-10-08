import { act, cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router';
import type { AdminFlagEvent, AdminTraineeDetail } from '@itp/types';

import AdminTraineePage from './AdminTraineePage';
import { getAdminFlags, getAdminTaskCode, getAdminTrainee } from '../../api/admin';
import { ApiError } from '../../api/errors';
import {
  buildAdminFlags,
  buildAdminTaskCode,
  buildAdminTraineeDetail,
  mockAdmin,
  mockAdminTraineeIds,
} from '../../test/fixtures/admin';

vi.mock('../../context/Useauth', () => ({
  useAuth: () => ({
    user: mockAdmin,
    status: 'authenticated',
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('../../api/admin', () => ({
  getAdminTrainees: vi.fn(),
  getAdminTrainee: vi.fn(),
  getAdminFlags: vi.fn(),
  getAdminTaskCode: vi.fn(),
}));

const traineeId = mockAdminTraineeIds[0];
const detail = buildAdminTraineeDetail(traineeId) as AdminTraineeDetail;
// Arjun's mock flags mix High, Normal and Low events.
const flags = buildAdminFlags(mockAdminTraineeIds[2]) as AdminFlagEvent[];
const importantFlags = flags.filter((flag) => flag.reviewPriority !== 'LOW');

function Jump({ to }: { to: string }) {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => void navigate(to)}>
      jump
    </button>
  );
}

function renderPage(path = `/admin/trainees/${traineeId}`) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/admin" element={<p>Trainees list</p>} />
        <Route
          path="/admin/trainees/:traineeId"
          element={
            <>
              <AdminTraineePage />
              <Jump to="/admin/trainees/other-trainee" />
            </>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.mocked(getAdminTrainee).mockResolvedValue(detail);
  vi.mocked(getAdminFlags).mockResolvedValue(flags);
  vi.mocked(getAdminTaskCode).mockImplementation((id, taskId) => {
    const result = buildAdminTaskCode(id, taskId);
    return result.kind === 'ok'
      ? Promise.resolve(result.data)
      : Promise.reject(new ApiError(404, 'NOT_FOUND', 'Task not found.'));
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('AdminTraineePage', () => {
  it('shows a loader while the trainee loads, and asks for the right trainee', () => {
    vi.mocked(getAdminTrainee).mockImplementation(() => new Promise<AdminTraineeDetail>(() => {}));

    renderPage();

    expect(screen.getByRole('status')).toHaveTextContent('Loading trainee');
    expect(getAdminTrainee).toHaveBeenCalledWith(traineeId);
  });

  it('shows the profile, statistics, daily activity and course grid, with a link back', async () => {
    renderPage();

    expect(
      await screen.findByRole('heading', { level: 1, name: detail.profile.trainee.name })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to trainees/ })).toHaveAttribute(
      'href',
      '/admin'
    );
    expect(screen.getByLabelText('Training statistics')).toBeInTheDocument();
    expect(screen.getByLabelText('Daily training activity')).toBeInTheDocument();
    expect(screen.getByLabelText('Course and day progress')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /^Journal/ })).toBeInTheDocument();
  });

  it('opens on the task list, with every submitted task shown', async () => {
    renderPage();

    const panel = await screen.findByRole('tabpanel');
    expect(screen.getByRole('tab', { name: /^Tasks/ })).toHaveAttribute('aria-selected', 'true');
    expect(within(panel).getAllByRole('button', { name: /^View code for/ }).length).toBe(
      detail.tasks.length
    );
  });

  it('shows journal responses on the Journal tab', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole('tab', { name: /^Journal/ }));

    const entries = within(screen.getByRole('tabpanel')).getAllByRole('article');
    expect(entries).toHaveLength(detail.journal.length);
    expect(entries[0]).toHaveTextContent(detail.journal[0].responseText.replace(/\s+/g, ' '));
  });

  it('shows the important flags newest first with their review priority', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole('tab', { name: /^Flags/ }));

    const rows = (await screen.findAllByRole('row')).slice(1);
    expect(rows).toHaveLength(importantFlags.length);
    expect(flags.length).toBeGreaterThan(importantFlags.length);
    const newest = [...importantFlags].sort(
      (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
    )[0];
    expect(within(rows[0]).getByText(newest.taskTitle)).toBeInTheDocument();
    expect(within(rows[0]).getByText(/^(Normal|High)$/)).toBeInTheDocument();
    expect(getAdminFlags).toHaveBeenCalledWith(traineeId);

    await user.click(screen.getByRole('button', { name: `All (${flags.length})` }));

    expect(screen.getAllByRole('row').slice(1)).toHaveLength(flags.length);
  });

  it('counts only the important flags on the tab', async () => {
    renderPage();

    expect(
      await screen.findByRole('tab', { name: `Flags (${importantFlags.length})` })
    ).toBeInTheDocument();
  });

  it('opens submitted code read-only, and offers no editing, running or saving', async () => {
    const user = userEvent.setup();
    renderPage();

    const completed = detail.tasks.find((task) => task.status === 'completed');
    if (!completed) throw new Error('fixture trainee has no completed task');

    await user.click(
      await screen.findByRole('button', { name: `View code for ${completed.title}` })
    );

    expect(getAdminTaskCode).toHaveBeenCalledWith(traineeId, completed.taskId);
    const viewer = await screen.findByRole('region', { name: completed.title });
    expect(await within(viewer).findByText('Read only')).toBeInTheDocument();
    expect(
      within(viewer).queryByRole('button', { name: /run|save|reset|submit/i })
    ).not.toBeInTheDocument();
    expect(within(viewer).getAllByLabelText(/\(read-only\)$/).length).toBeGreaterThan(0);
  });

  it('says when an opened task still has only starter code', async () => {
    const user = userEvent.setup();
    const task = detail.tasks[0];
    vi.mocked(getAdminTaskCode).mockResolvedValue({
      taskId: task.taskId,
      title: task.title,
      status: 'in_progress',
      isStarterCode: true,
      files: [{ path: 'index.html', content: '<!-- starter -->' }],
      codeUpdatedAt: null,
      lastSubmittedAt: null,
    });
    renderPage();

    await user.click(await screen.findByRole('button', { name: `View code for ${task.title}` }));

    expect(await screen.findByRole('note')).toHaveTextContent(/hasn.t saved any work/);
  });

  it('closes the code viewer', async () => {
    const user = userEvent.setup();
    renderPage();
    const task = detail.tasks[0];

    await user.click(
      await screen.findByRole('button', {
        name: `View code for ${task.title}`,
      })
    );
    await user.click(await screen.findByRole('button', { name: 'Close code viewer' }));

    expect(screen.queryByRole('region', { name: task.title })).not.toBeInTheDocument();
  });

  it.each([
    ['NOT_FOUND', 404],
    ['VALIDATION_FAILED', 400],
  ] as const)('shows "Trainee not found" for a %s answer', async (code, status) => {
    vi.mocked(getAdminTrainee).mockRejectedValue(new ApiError(status, code, 'nope'));

    renderPage('/admin/trainees/not-a-uuid');

    expect(await screen.findByRole('heading', { name: 'Trainee not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to trainees' })).toHaveAttribute(
      'href',
      '/admin'
    );
  });

  it('shows an error with a retry for any other failure, and loads again on retry', async () => {
    const user = userEvent.setup();
    vi.mocked(getAdminTrainee)
      .mockRejectedValueOnce(
        new ApiError(500, 'INTERNAL_ERROR', 'Something went wrong. Please try again.')
      )
      .mockResolvedValueOnce(detail);

    renderPage();

    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load trainee');
    expect(screen.getByRole('link', { name: /Back to trainees/ })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(
      await screen.findByRole('heading', { level: 1, name: detail.profile.trainee.name })
    ).toBeInTheDocument();
    expect(getAdminTrainee).toHaveBeenCalledTimes(2);
  });

  it('explains a removed admin account and offers no retry', async () => {
    vi.mocked(getAdminTrainee).mockRejectedValue(
      new ApiError(403, 'FORBIDDEN', "You don't have access to this.")
    );

    renderPage();

    expect(await screen.findByRole('alert')).toHaveTextContent('Admin access required');
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
  });

  it('keeps the rest of the page when only the flags fail to load', async () => {
    const user = userEvent.setup();
    vi.mocked(getAdminFlags).mockRejectedValueOnce(
      new ApiError(500, 'INTERNAL_ERROR', 'Something went wrong. Please try again.')
    );

    renderPage();

    await user.click(await screen.findByRole('tab', { name: /^Flags/ }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load flags');
    expect(
      screen.getByRole('heading', { level: 1, name: detail.profile.trainee.name })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findAllByRole('row')).not.toHaveLength(0);
  });

  it("never shows one trainee's data under another trainee's link", async () => {
    const user = userEvent.setup();
    vi.mocked(getAdminTrainee).mockImplementation((id) =>
      id === traineeId ? Promise.resolve(detail) : new Promise<AdminTraineeDetail>(() => {})
    );
    renderPage();
    await screen.findByRole('heading', { level: 1, name: detail.profile.trainee.name });

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'jump' }));
    });

    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
    expect(screen.queryByText(detail.profile.trainee.name)).not.toBeInTheDocument();
    expect(getAdminTrainee).toHaveBeenLastCalledWith('other-trainee');
  });
});
