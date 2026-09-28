import { beforeEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import TaskWorkspace from './TaskWorkspace';
import { WorkspaceProvider } from '../../pages/TaskPage/state/WorkspaceContext';
import { taskFixture, taskCodeFixture } from '../../test/fixtures/task';

const navigateMock = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useNavigate: () => navigateMock };
});

function renderWorkspace() {
  return render(
    <MemoryRouter>
      <WorkspaceProvider code={taskCodeFixture}>
        <TaskWorkspace task={taskFixture} />
      </WorkspaceProvider>
    </MemoryRouter>
  );
}

describe('TaskWorkspace', () => {
  beforeEach(() => {
    navigateMock.mockClear();
    window.localStorage.clear();
  });

  it('renders sidebar and code panes by default, with result hidden', () => {
    renderWorkspace();
    expect(screen.getByTestId('sidebar-pane')).toBeInTheDocument();
    expect(screen.getByTestId('code-pane')).toBeInTheDocument();
    expect(screen.queryByTestId('result-pane')).not.toBeInTheDocument();
  });

  it('mounts the result pane when Run is clicked', async () => {
    const user = userEvent.setup();
    renderWorkspace();
    await user.click(screen.getByRole('button', { name: /run/i }));
    expect(screen.getByTestId('result-pane')).toBeInTheDocument();
  });

  it('removes the code pane stub when Code is toggled off', async () => {
    const user = userEvent.setup();
    renderWorkspace();
    await user.click(screen.getByRole('button', { name: /^code$/i }));
    // TK-4: flip this once the real editor lands — it must stay mounted (hidden) to keep undo history.
    expect(screen.queryByTestId('code-pane')).not.toBeInTheDocument();
  });

  it('flushes and navigates to the day page on Back', async () => {
    const user = userEvent.setup();
    renderWorkspace();
    await user.click(screen.getByRole('button', { name: /back to tasks/i }));
    expect(navigateMock).toHaveBeenCalledWith(`/days/${taskFixture.day.id}`);
  });
});
