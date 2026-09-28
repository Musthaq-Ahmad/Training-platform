import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorkspaceProvider } from '../../pages/TaskPage/state/WorkspaceContext';
import { taskCodeFixture } from '../../test/fixtures/task';
import FilesPanel from './FilesPanel';

function renderPanel() {
  const onRefresh = vi.fn();
  render(
    <WorkspaceProvider code={taskCodeFixture}>
      <FilesPanel onRefresh={onRefresh} />
    </WorkspaceProvider>
  );
  return { onRefresh };
}

describe('FilesPanel', () => {
  it('creates a new file with a valid name', async () => {
    const user = userEvent.setup();
    renderPanel();

    await user.click(screen.getByRole('button', { name: 'New file' }));
    await user.type(screen.getByRole('textbox', { name: /new file name/i }), 'new.js{Enter}');

    expect(screen.getByText('new.js')).toBeInTheDocument();
  });

  it('shows an inline message for an invalid name', async () => {
    const user = userEvent.setup();
    renderPanel();

    await user.click(screen.getByRole('button', { name: 'New file' }));
    await user.type(screen.getByRole('textbox', { name: /new file name/i }), 'bad name.exe{Enter}');

    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('asks for confirmation, then deletes the file', async () => {
    const user = userEvent.setup();
    renderPanel();

    expect(screen.getByText('services.html')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Delete services.html' }));
    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(screen.queryByText('services.html')).not.toBeInTheDocument();
  });

  it('collapses all folders', async () => {
    const user = userEvent.setup();
    renderPanel();

    // assets/ is expanded by default (a top-level folder), so its files start visible.
    expect(screen.getByText('logo.svg')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Collapse all folders' }));

    expect(screen.queryByText('logo.svg')).not.toBeInTheDocument();
  });

  it('calls onRefresh when the reload button is clicked', async () => {
    const user = userEvent.setup();
    const { onRefresh } = renderPanel();

    await user.click(screen.getByRole('button', { name: 'Reload files from server' }));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
});
