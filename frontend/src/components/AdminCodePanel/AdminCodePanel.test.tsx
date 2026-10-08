import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { AdminTaskCode } from '@itp/types';
import { ApiError } from '../../api/errors';
import AdminCodePanel from './AdminCodePanel';

const code: AdminTaskCode = {
  taskId: 't1',
  title: 'Profile page',
  status: 'in_progress',
  isStarterCode: false,
  files: [
    { path: 'index.html', content: '<h1>Hi</h1>' },
    { path: 'style.css', content: 'h1 { color: red; }' },
  ],
  codeUpdatedAt: '2026-10-02T12:12:00.000Z',
  lastSubmittedAt: null,
};

function renderPanel(overrides: Partial<Parameters<typeof AdminCodePanel>[0]> = {}) {
  const props = {
    traineeId: 'trainee-1',
    taskTitle: 'Profile page',
    code,
    isLoading: false,
    error: null,
    onRetry: vi.fn(),
    onClose: vi.fn(),
    ...overrides,
  };
  render(<AdminCodePanel {...props} />);
  return props;
}

describe('AdminCodePanel', () => {
  it('shows the task, its state and a read-only viewer with every file', async () => {
    renderPanel();

    expect(screen.getByRole('heading', { name: 'Profile page' })).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getByText('Saved 02 Oct 2026, 17:42')).toBeInTheDocument();
    expect(await screen.findByLabelText('index.html (read-only)')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /index\.html/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /style\.css/ })).toBeInTheDocument();
    expect(screen.getByText('Read only')).toBeInTheDocument();
  });

  it('switches between files', async () => {
    const user = userEvent.setup();
    renderPanel();

    await user.click(await screen.findByRole('tab', { name: /style\.css/ }));

    expect(screen.getByLabelText('style.css (read-only)')).toBeInTheDocument();
  });

  it('offers no way to edit, run, save or submit', async () => {
    renderPanel();
    await screen.findByLabelText('index.html (read-only)');

    expect(
      screen.queryByRole('button', { name: /run|save|reset|submit/i })
    ).not.toBeInTheDocument();
  });

  it('says when the code is starter code', () => {
    renderPanel({ code: { ...code, isStarterCode: true, codeUpdatedAt: null } });

    expect(screen.getByRole('note')).toHaveTextContent(/hasn.t saved any work/);
  });

  it('shows a loader while loading', () => {
    renderPanel({ code: null, isLoading: true });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows the error and retries', async () => {
    const user = userEvent.setup();
    const props = renderPanel({
      code: null,
      error: new ApiError(500, 'INTERNAL_ERROR', 'Something went wrong. Please try again.'),
    });

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to load code');
    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(props.onRetry).toHaveBeenCalledTimes(1);
  });

  it('has no retry for a task that does not exist', () => {
    renderPanel({ code: null, error: new ApiError(404, 'NOT_FOUND', 'Task not found.') });

    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
  });

  it('closes', async () => {
    const user = userEvent.setup();
    const props = renderPanel();

    await user.click(screen.getByRole('button', { name: 'Close code viewer' }));

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
