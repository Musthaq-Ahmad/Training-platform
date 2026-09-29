import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  taskFixture,
  taskCodeFixture,
  nodeTaskFixture,
  sqlTaskFixture,
} from '../test/fixtures/task';
import { WorkspaceProvider } from '../pages/TaskPage/state/WorkspaceContext';
import { EditorProvider } from '../pages/TaskPage/state/EditorContext';
import { ToastProvider } from '../components/Toast';
import { RunnerProvider } from './runnerContext';
import RuntimeHost from './RuntimeHost';

// The SQL runtime starts a real PGlite on mount; these tests only check which tabs show.
vi.mock('./sql/pgliteService', () => ({ createSqlDatabase: () => new Promise(() => {}) }));

function renderHost(task: typeof taskFixture) {
  return render(
    <ToastProvider>
      <WorkspaceProvider code={taskCodeFixture}>
        <EditorProvider>
          <RunnerProvider>
            {/* Not visible, so the browser runtime doesn't start a build */}
            <RuntimeHost task={task} isVisible={false} />
          </RunnerProvider>
        </EditorProvider>
      </WorkspaceProvider>
    </ToastProvider>
  );
}

describe('RuntimeHost', () => {
  it('renders the Result tab for a browser task', () => {
    renderHost(taskFixture);
    expect(screen.getByRole('tab', { name: /result/i })).toBeInTheDocument();
  });

  it('renders the Terminal tab for a node task', () => {
    renderHost(nodeTaskFixture);
    expect(screen.getByRole('tab', { name: /terminal/i })).toBeInTheDocument();
  });

  it('renders the Results tab for a sql task', () => {
    renderHost(sqlTaskFixture);
    expect(screen.getByRole('tab', { name: /results/i })).toBeInTheDocument();
  });
});
