import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { TaskCodeResponse } from '@itp/types';
import { taskFixture, taskCodeFixture } from '../../test/fixtures/task';
import { WorkspaceProvider } from '../../pages/TaskPage/state/WorkspaceContext';
import { RunnerProvider, useRunner } from '../runnerContext';
import { buildPreviewDocument, type PreviewBuild } from './buildPreviewDocument';
import BrowserRuntime from './BrowserRuntime';

vi.mock('./buildPreviewDocument', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./buildPreviewDocument')>()),
  buildPreviewDocument: vi.fn(),
}));

/** Shows the registered runner as data attributes, so tests can read it. */
function RunnerProbe() {
  const { canRun, label, title } = useRunner();
  return (
    <output
      data-testid="runner"
      data-can-run={String(canRun)}
      data-label={label}
      data-title={title}
    />
  );
}

function runner() {
  const probe = screen.getByTestId('runner');
  return {
    canRun: probe.dataset.canRun === 'true',
    label: probe.dataset.label,
    title: probe.dataset.title,
  };
}

function renderRuntime(code: TaskCodeResponse = taskCodeFixture, isVisible = true) {
  return render(
    <WorkspaceProvider code={code}>
      <RunnerProvider>
        <BrowserRuntime task={taskFixture} isVisible={isVisible} />
        <RunnerProbe />
      </RunnerProvider>
    </WorkspaceProvider>
  );
}

function okBuild(runId: string, entryPath: string): PreviewBuild {
  return {
    ok: true,
    srcdoc: '<!DOCTYPE html><html><body>Hi</body></html>',
    runId,
    entryPath,
    durationMs: 14,
    inlined: [entryPath, 'styles.css', 'script.js'],
    missing: [],
    warnings: [],
  };
}

beforeEach(() => {
  window.localStorage.clear();
  vi.mocked(buildPreviewDocument).mockReset();
  vi.mocked(buildPreviewDocument).mockImplementation((_files, entry, options) =>
    Promise.resolve(okBuild(options.runId, entry ?? ''))
  );
});

describe('BrowserRuntime', () => {
  it('registers a runner labelled "Run"', async () => {
    renderRuntime();
    await waitFor(() => expect(runner().canRun).toBe(true));
    expect(runner().label).toBe('Run');
    expect(runner().title).toBe('Run (Ctrl+Enter)');
  });

  it('shows the preview and the build summary after the first run', async () => {
    renderRuntime();

    const frame = await screen.findByTitle('Preview of services.html');
    expect(frame.getAttribute('sandbox')).toBe('allow-scripts allow-modals allow-forms');
    expect(screen.getByText(/Build complete: 3 files bundled \(14 ms\)\./)).toBeInTheDocument();
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('does not run until the Result pane is visible', () => {
    renderRuntime(taskCodeFixture, false);
    expect(buildPreviewDocument).not.toHaveBeenCalled();
  });

  it('has canRun false and shows the empty state with no HTML file', async () => {
    renderRuntime({ updatedAt: null, files: [{ path: 'script.js', content: '' }] });

    await waitFor(() => expect(runner().title).toBe('Add an .html file to run'));
    expect(runner().canRun).toBe(false);
    expect(
      screen.getByText('Add an .html file to preview your work.', { selector: 'p' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload preview' })).toBeDisabled();
  });

  it('switches to the Console tab when a build fails, and the footer says so', async () => {
    vi.mocked(buildPreviewDocument).mockResolvedValue({
      ok: false,
      reason: 'BUILD_ERROR',
      message: 'Build failed',
      issues: [{ file: 'js/main.js', line: 4, column: 10, message: "Cannot find './utl'" }],
    });
    renderRuntime();

    await waitFor(() =>
      expect(screen.getByRole('tab', { name: /console/i })).toHaveAttribute('aria-selected', 'true')
    );
    expect(screen.getByText('Build failed — see Console')).toBeInTheDocument();
    expect(screen.getByText("js/main.js:4:10 — Cannot find './utl'")).toBeInTheDocument();
    // The Console badge counts errors only
    expect(screen.getByRole('tab', { name: /console/i })).toHaveTextContent('1');
  });

  it('keeps the last good preview under a banner when a later build fails', async () => {
    const user = userEvent.setup();
    renderRuntime();
    await screen.findByTitle('Preview of services.html');

    vi.mocked(buildPreviewDocument).mockResolvedValueOnce({
      ok: false,
      reason: 'BUILD_ERROR',
      message: 'Build failed',
      issues: [{ file: null, line: null, column: null, message: 'Broken' }],
    });
    await user.click(screen.getByRole('button', { name: 'Reload preview' }));

    await screen.findByText('Build failed — see Console for details.');
    expect(screen.getByTitle('Preview of services.html')).toBeInTheDocument();
  });

  it('keeps the preview mounted while the Console tab shows', async () => {
    const user = userEvent.setup();
    renderRuntime();
    const frame = await screen.findByTitle('Preview of services.html');

    await user.click(screen.getByRole('tab', { name: /console/i }));

    expect(frame).toBeInTheDocument();
    expect(frame.closest('[role="tabpanel"]')).toHaveAttribute('hidden');
    expect(screen.getByText('Console output from your page appears here.')).toBeVisible();
  });

  it('lists every .html file in the URL field and runs the one chosen', async () => {
    const user = userEvent.setup();
    renderRuntime({
      updatedAt: null,
      files: [
        { path: 'index.html', content: '<h1>Home</h1>' },
        { path: 'pages/about.html', content: '<h1>About</h1>' },
      ],
    });
    await screen.findByTitle('Preview of index.html');

    const select = screen.getByRole('combobox', { name: 'Preview page' });
    expect(Array.from((select as HTMLSelectElement).options).map((o) => o.text)).toEqual([
      'https://sandbox.local/index.html',
      'https://sandbox.local/pages/about.html',
    ]);

    await user.selectOptions(select, 'pages/about.html');
    await screen.findByTitle('Preview of pages/about.html');
    expect(vi.mocked(buildPreviewDocument).mock.calls.at(-1)?.[1]).toBe('pages/about.html');
  });
});
