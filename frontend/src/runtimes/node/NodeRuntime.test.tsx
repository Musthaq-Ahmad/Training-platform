import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { TaskResponse } from '@itp/types';
import { nodeTaskCodeFixture, nodeTaskFixture } from '../../test/fixtures/task';
import { ToastProvider } from '../../components/Toast';
import { WorkspaceProvider, useWorkspaceState } from '../../pages/TaskPage/state/WorkspaceContext';
import { RunnerProvider, useRunner } from '../runnerContext';
import type { FileSyncCallbacks } from './fileSync';
import type { NodeSessionStatus } from './useNodeSession';
import NodeRuntime from './NodeRuntime';

// --- mocks -------------------------------------------------------------------------------------

vi.mock('@webcontainer/api');
vi.mock('@xterm/xterm', () => ({
  Terminal: class {
    cols = 80;
    rows = 24;
    open = vi.fn();
    write = vi.fn();
    focus = vi.fn();
    loadAddon = vi.fn();
    dispose = vi.fn();
    onData = vi.fn(() => ({ dispose: vi.fn() }));
    attachCustomKeyEventHandler = vi.fn();
  },
}));
vi.mock('@xterm/addon-fit', () => ({
  FitAddon: class {
    fit = vi.fn();
  },
}));
vi.mock('../../lib/crossOriginIsolation', () => ({
  isCrossOriginIsolated: () => true,
  isChromium: () => true,
}));
vi.mock('./webcontainerService', () => ({
  getWebContainer: () => Promise.resolve({ on: () => () => {} }),
}));

const session = {
  status: 'booting' as NodeSessionStatus,
  errorMessage: null as string | null,
  runCommand: vi.fn(),
  retry: vi.fn(),
  callbacks: null as FileSyncCallbacks | null,
};
vi.mock('./useNodeSession', () => ({
  useNodeSession: (options: { callbacks: FileSyncCallbacks }) => {
    session.callbacks = options.callbacks;
    return {
      status: session.status,
      errorMessage: session.errorMessage,
      fileSync: null,
      runCommand: session.runCommand,
      resize: vi.fn(),
      retry: session.retry,
    };
  },
}));

// --- helpers -----------------------------------------------------------------------------------

function RunnerProbe() {
  const { canRun, label, title, run } = useRunner();
  return (
    <button
      type="button"
      data-testid="runner"
      data-can-run={String(canRun)}
      title={title}
      onClick={run}
    >
      {label}
    </button>
  );
}

function WorkspaceProbe() {
  const state = useWorkspaceState();
  return (
    <output
      data-testid="workspace"
      data-files={Object.keys(state.files).sort().join(',')}
      data-open={state.openPaths.join(',')}
    />
  );
}

function renderRuntime(task: TaskResponse = nodeTaskFixture) {
  return render(
    <ToastProvider>
      <WorkspaceProvider code={nodeTaskCodeFixture}>
        <RunnerProvider>
          <NodeRuntime task={task} isVisible />
          <RunnerProbe />
          <WorkspaceProbe />
        </RunnerProvider>
      </WorkspaceProvider>
    </ToastProvider>
  );
}

function registered() {
  const probe = screen.getByTestId('runner');
  return {
    canRun: probe.dataset.canRun === 'true',
    label: probe.textContent,
    title: probe.getAttribute('title'),
  };
}

beforeEach(() => {
  session.status = 'booting';
  session.errorMessage = null;
  session.runCommand.mockClear();
  session.callbacks = null;
});

// --- tests -------------------------------------------------------------------------------------

describe('NodeRuntime runner', () => {
  it.each([
    ['booting', nodeTaskFixture, { canRun: false, label: 'Run', title: 'Starting Node…' }],
    ['installing', nodeTaskFixture, { canRun: false, label: 'Run', title: 'Installing packages…' }],
    ['ready', nodeTaskFixture, { canRun: true, label: 'Run: npm test', title: 'Run (Ctrl+Enter)' }],
    [
      'ready',
      { ...nodeTaskFixture, runCommand: null },
      { canRun: false, label: 'Run', title: 'Use the terminal for this task' },
    ],
    [
      'unsupported',
      nodeTaskFixture,
      { canRun: false, label: 'Run', title: 'Node tasks need Chrome or Edge' },
    ],
  ] as const)('%s → %j', (status, task, expected) => {
    session.status = status;
    renderRuntime(task);
    expect(registered()).toEqual(expected);
  });

  it('error → the reason as the title', () => {
    session.status = 'error';
    session.errorMessage = "Node couldn't start: boot failed";
    renderRuntime();

    expect(registered()).toEqual({
      canRun: false,
      label: 'Run',
      title: "Node couldn't start: boot failed",
    });
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('run types the task command into the terminal', async () => {
    const user = userEvent.setup();
    session.status = 'ready';
    renderRuntime();

    await user.click(screen.getByTestId('runner'));

    expect(session.runCommand).toHaveBeenCalledWith('npm test');
  });

  it('shows the pill for each state', () => {
    session.status = 'ready';
    const { rerender } = renderRuntime();
    expect(screen.getByText('Node ready')).toBeInTheDocument();

    session.status = 'installing';
    rerender(
      <ToastProvider>
        <WorkspaceProvider code={nodeTaskCodeFixture}>
          <RunnerProvider>
            <NodeRuntime task={nodeTaskFixture} isVisible />
          </RunnerProvider>
        </WorkspaceProvider>
      </ToastProvider>
    );
    expect(screen.getByText('Installing…')).toBeInTheDocument();
  });
});

describe('NodeRuntime unsupported browser', () => {
  it('explains that Node tasks need Chrome or Edge instead of a terminal', () => {
    session.status = 'unsupported';
    renderRuntime();

    expect(screen.getByRole('alert')).toHaveTextContent('Node tasks need Chrome or Edge');
    expect(
      screen.getByText(/runs Node\.js inside your browser, which currently works only in Chromium/)
    ).toBeInTheDocument();
    expect(screen.queryByTestId('terminal')).not.toBeInTheDocument();
  });
});

describe('NodeRuntime file sync callbacks', () => {
  it('a new file from the terminal is created in the workspace without opening it', () => {
    session.status = 'ready';
    renderRuntime();

    act(() => session.callbacks?.onRemoteChange('notes.txt', 'x\n'));

    const workspace = screen.getByTestId('workspace');
    expect(workspace.dataset.files).toContain('notes.txt');
    expect(workspace.dataset.open).not.toContain('notes.txt');
  });

  it('a changed file is edited, and a removed file is deleted', () => {
    session.status = 'ready';
    renderRuntime();

    act(() => session.callbacks?.onRemoteChange('src/sysinfo.js', 'changed'));
    act(() => session.callbacks?.onRemoteDelete('src/sysinfo.test.js'));

    const files = screen.getByTestId('workspace').dataset.files ?? '';
    expect(files).toContain('src/sysinfo.js');
    expect(files).not.toContain('src/sysinfo.test.js');
  });
});
