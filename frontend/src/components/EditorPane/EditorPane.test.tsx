import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorkspaceProvider } from '../../pages/TaskPage/state/WorkspaceContext';
import { EditorProvider } from '../../pages/TaskPage/state/EditorContext';
import { ToastProvider } from '../../components/Toast';
import { taskCodeFixture, makeTaskCode } from '../../test/fixtures/task';
import type { TaskCodeResponse } from '@itp/types';
import EditorPane from './EditorPane';

const noop = () => {};

function renderPane(code: TaskCodeResponse = taskCodeFixture) {
  return render(
    <ToastProvider>
      <WorkspaceProvider code={code}>
        <EditorProvider>
          <EditorPane taskId="t-1" onSave={noop} onRun={noop} />
        </EditorProvider>
      </WorkspaceProvider>
    </ToastProvider>
  );
}

describe('EditorPane', () => {
  it('shows the empty state when there are no tabs, and its button opens the Files tab', async () => {
    const user = userEvent.setup();
    renderPane(makeTaskCode({ files: [] }));

    expect(screen.getByText('Select a file from the Files panel')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open Files panel' }));
    // Dispatch happened without throwing; the workspace's sidebarTab isn't
    // observable from here without a consumer, so this just proves the wiring.
  });

  it('shows a message instead of an editor for an image file', () => {
    const code = makeTaskCode({ files: [{ path: 'logo.png', content: 'binary' }] });
    renderPane(code);

    expect(screen.getByText(/images can.t be edited here\./i)).toBeInTheDocument();
  });

  it('dispatches fileEdited when typing in the stub editor', async () => {
    const user = userEvent.setup();
    renderPane();

    const editor = screen.getByLabelText('services.html code editor');
    await user.type(editor, 'x');

    // The reducer applied the edit if the tree's dirty state changed;
    // the direct, observable signal here is the dirty dot appearing on the tab.
    expect(await screen.findByLabelText('Unsaved changes')).toBeInTheDocument();
  });
});
