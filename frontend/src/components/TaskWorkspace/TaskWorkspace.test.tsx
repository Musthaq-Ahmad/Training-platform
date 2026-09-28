import { beforeEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import TaskWorkspace from './TaskWorkspace';
import { WorkspaceProvider } from '../../pages/TaskPage/state/WorkspaceContext';
import { EditorProvider } from '../../pages/TaskPage/state/EditorContext';
import { RunnerProvider } from '../../runtimes/runnerContext';
import { ToastProvider } from '../../components/Toast';
import { taskFixture, taskCodeFixture } from '../../test/fixtures/task';
import { saveTaskCode } from '../../api/tasks';
import { ApiError } from '../../api/errors';

vi.mock('../../api/tasks');

const navigateMock = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useNavigate: () => navigateMock };
});

function renderWorkspace() {
  return render(
    <MemoryRouter>
      <ToastProvider>
        <WorkspaceProvider code={taskCodeFixture}>
          <EditorProvider>
            <RunnerProvider>
              <TaskWorkspace task={taskFixture} />
            </RunnerProvider>
          </EditorProvider>
        </WorkspaceProvider>
      </ToastProvider>
    </MemoryRouter>
  );
}

describe('TaskWorkspace', () => {
  beforeEach(() => {
    navigateMock.mockClear();
    vi.mocked(saveTaskCode).mockReset();
    window.localStorage.clear();
  });

  it('renders sidebar and code panes by default, with the result pane mounted but hidden', () => {
    renderWorkspace();
    expect(screen.getByTestId('sidebar-pane')).toBeInTheDocument();
    expect(screen.getByTestId('code-pane')).toBeInTheDocument();
    // Always mounted (so the node runtime's terminal/server survive being
    // hidden) — jsdom here doesn't load real CSS, so assert the hiding class.
    expect(screen.getByTestId('result-pane').className).toMatch(/paneHidden/);
  });

  it('shows the result pane when Run is clicked', async () => {
    const user = userEvent.setup();
    renderWorkspace();
    await user.click(screen.getByRole('button', { name: /run/i }));
    expect(screen.getByTestId('result-pane').className).not.toMatch(/paneHidden/);
  });

  it('clicking Run calls the active runtime’s registered run()', async () => {
    const user = userEvent.setup();
    renderWorkspace();
    await user.click(screen.getByRole('button', { name: /run/i }));
    // BrowserRuntime's FE-06 placeholder shows this toast when run() fires.
    expect(await screen.findByText('Coming in FE-07.')).toBeInTheDocument();
  });

  it('Ctrl+Enter runs, even outside the editor', async () => {
    const user = userEvent.setup();
    renderWorkspace();

    await user.keyboard('{Control>}{Enter}{/Control}');

    expect(screen.getByTestId('result-pane').className).not.toMatch(/paneHidden/);
    expect(await screen.findByText('Coming in FE-07.')).toBeInTheDocument();
  });

  it('keeps the editor mounted but hidden when Code is toggled off', async () => {
    const user = userEvent.setup();
    renderWorkspace();
    await user.click(screen.getByRole('button', { name: /^code$/i }));
    // jsdom in this test setup doesn't load real CSS, so `toBeVisible()` can't see
    // the display:none rule — assert the hiding class was applied instead, and that
    // the pane (with the editor inside it) is still mounted, not unmounted.
    expect(screen.getByTestId('code-pane').className).toMatch(/paneHidden/);
    expect(screen.getByLabelText('services.html code editor')).toBeInTheDocument();
  });

  it('flushes and navigates to the day page on Back', async () => {
    const user = userEvent.setup();
    renderWorkspace();
    await user.click(screen.getByRole('button', { name: /back to tasks/i }));
    expect(navigateMock).toHaveBeenCalledWith(`/days/${taskFixture.day.id}`);
  });

  it('shows the leave-anyway confirm dialog when flush fails on Back, and does not navigate', async () => {
    const user = userEvent.setup();
    vi.mocked(saveTaskCode).mockRejectedValue(new ApiError(500, 'INTERNAL_ERROR', 'Boom'));
    renderWorkspace();

    await user.type(screen.getByLabelText('services.html code editor'), 'x');
    await user.click(screen.getByRole('button', { name: /back to tasks/i }));

    expect(
      await screen.findByRole('heading', { name: /latest changes aren.t saved/i })
    ).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('calls flush (saves) on Ctrl+S', async () => {
    const user = userEvent.setup();
    vi.mocked(saveTaskCode).mockResolvedValue(undefined);
    renderWorkspace();

    await user.type(screen.getByLabelText('services.html code editor'), 'x');
    await user.keyboard('{Control>}s{/Control}');

    expect(await screen.findByText('Saved')).toBeInTheDocument();
    expect(saveTaskCode).toHaveBeenCalled();
  });
});
