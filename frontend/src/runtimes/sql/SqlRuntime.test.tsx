import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sqlTaskFixture } from '../../test/fixtures/task';
import { RunnerProvider, useRunner } from '../runnerContext';
import type { SqlDatabaseState } from './useSqlDatabase';
import type { SqlRun } from './useSqlRunner';
import SqlRuntime from './SqlRuntime';

// --- mocks -------------------------------------------------------------------------------------

const database = {
  state: { status: 'ready', db: { run: vi.fn(), close: vi.fn() } } as SqlDatabaseState,
  reset: vi.fn(() => Promise.resolve()),
  retry: vi.fn(),
};
vi.mock('./useSqlDatabase', () => ({
  useSqlDatabase: () => ({ ...database.state, reset: database.reset, retry: database.retry }),
}));

const runner = {
  lastRun: null as SqlRun | null,
  history: [] as SqlRun[],
  isRunning: false,
  run: vi.fn(() => Promise.resolve()),
};
vi.mock('./useSqlRunner', () => ({ useSqlRunner: () => ({ ...runner }) }));

const workspace = {
  activePath: 'schema.sql' as string | null,
  files: {} as Record<string, string>,
};
vi.mock('../../pages/TaskPage/state/WorkspaceContext', () => ({
  useWorkspaceState: () => workspace,
}));

const FILE = 'create table a (id int);\n\nselect * from nope;\n';
let selectionListener: ((event: { selection: { isEmpty: () => boolean } }) => void) | null = null;
let selected: { start: number; end: number } | null = null;

const model = {
  getValue: () => FILE,
  getValueInRange: () => (selected ? FILE.slice(selected.start, selected.end) : ''),
  getOffsetAt: () => selected?.start ?? 0,
  isDisposed: () => false,
};
const fakeEditor = {
  getModel: () => model,
  getSelection: () =>
    selected
      ? { isEmpty: () => false, getStartPosition: () => ({ lineNumber: 3, column: 1 }) }
      : { isEmpty: () => true, getStartPosition: () => ({ lineNumber: 1, column: 1 }) },
  onDidChangeCursorSelection: vi.fn((listener: typeof selectionListener) => {
    selectionListener = listener;
    return { dispose: vi.fn() };
  }),
};
vi.mock('../../pages/TaskPage/state/EditorContext', () => ({
  useEditorRef: () => ({ current: fakeEditor }),
}));

const setModelMarkers = vi.fn();
vi.mock('@monaco-editor/react', () => ({
  useMonaco: () => ({ editor: { setModelMarkers, onDidCreateEditor: vi.fn() } }),
}));

// --- helpers -----------------------------------------------------------------------------------

function RunnerProbe() {
  const { canRun, label, title, isRunning, run } = useRunner();
  return (
    <button
      type="button"
      data-testid="runner"
      data-can-run={String(canRun)}
      data-running={String(isRunning)}
      title={title}
      onClick={run}
    >
      {label}
    </button>
  );
}

function renderRuntime() {
  return render(
    <RunnerProvider>
      <SqlRuntime task={sqlTaskFixture} isVisible />
      <RunnerProbe />
    </RunnerProvider>
  );
}

function registered() {
  const probe = screen.getByTestId('runner');
  return {
    canRun: probe.dataset.canRun === 'true',
    isRunning: probe.dataset.running === 'true',
    label: probe.textContent,
    title: probe.getAttribute('title'),
  };
}

function makeRun(overrides: Partial<SqlRun>): SqlRun {
  return {
    id: 1,
    at: new Date(),
    ranSelection: false,
    result: null,
    runError: null,
    location: null,
    hadOpenTransaction: false,
    statementCount: 1,
    ...overrides,
  };
}

beforeEach(() => {
  database.state = { status: 'ready', db: { run: vi.fn(), close: vi.fn() } };
  database.reset.mockClear();
  runner.lastRun = null;
  runner.history = [];
  runner.isRunning = false;
  runner.run.mockClear();
  workspace.activePath = 'schema.sql';
  workspace.files = { 'schema.sql': FILE, 'README.md': '# Hi' };
  selected = null;
  selectionListener = null;
  setModelMarkers.mockClear();
});

// --- tests -------------------------------------------------------------------------------------

describe('SqlRuntime runner', () => {
  it('is disabled while the database starts', () => {
    database.state = { status: 'starting' };
    renderRuntime();
    expect(registered()).toEqual({
      canRun: false,
      isRunning: true,
      label: 'Run SQL',
      title: 'Starting the database…',
    });
    expect(screen.getByText('Starting database…')).toBeInTheDocument();
  });

  it('is disabled with the failure message when the database failed', () => {
    database.state = { status: 'failed', message: "Couldn't start the database: boom" };
    renderRuntime();
    expect(registered()).toMatchObject({
      canRun: false,
      label: 'Run SQL',
      title: "Couldn't start the database: boom",
    });
    expect(screen.getByText('Database failed')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('is disabled when the active file is not .sql', () => {
    workspace.activePath = 'README.md';
    renderRuntime();
    expect(registered()).toMatchObject({
      canRun: false,
      label: 'Run SQL',
      title: 'Open a .sql file to run it',
    });
  });

  it('is disabled while running', () => {
    runner.isRunning = true;
    renderRuntime();
    expect(registered()).toMatchObject({ canRun: false, label: 'Run SQL', title: 'Running…' });
  });

  it('runs the whole file when nothing is selected', () => {
    renderRuntime();
    expect(registered()).toEqual({
      canRun: true,
      isRunning: false,
      label: 'Run SQL',
      title: 'Run the whole file (Ctrl+Enter)',
    });
    expect(screen.getByText('Database ready')).toBeInTheDocument();
  });

  it('reads "Run selection" while SQL is selected', () => {
    renderRuntime();
    act(() => selectionListener?.({ selection: { isEmpty: () => false } }));
    expect(registered()).toMatchObject({
      canRun: true,
      label: 'Run selection',
      title: 'Run the selected SQL (Ctrl+Enter)',
    });
  });
});

describe('SqlRuntime running', () => {
  it('sends the whole file with offset 0 when nothing is selected', async () => {
    const user = userEvent.setup();
    renderRuntime();
    await user.click(screen.getByTestId('runner'));

    expect(runner.run).toHaveBeenCalledWith({
      fileText: FILE,
      text: FILE,
      selectionStartOffset: 0,
      ranSelection: false,
    });
  });

  it('sends only the selected text, with its offset in the file', async () => {
    const user = userEvent.setup();
    const start = FILE.indexOf('select');
    selected = { start, end: FILE.indexOf(';', start) + 1 };
    renderRuntime();
    await user.click(screen.getByTestId('runner'));

    expect(runner.run).toHaveBeenCalledWith({
      fileText: FILE,
      text: 'select * from nope;',
      selectionStartOffset: start,
      ranSelection: true,
    });
  });

  it('switches to Messages after an error and underlines the spot in the editor', async () => {
    const user = userEvent.setup();
    const { rerender } = renderRuntime();
    await user.click(screen.getByTestId('runner'));
    // Before running, old markers are cleared (nothing marked yet, so nothing to clear).
    expect(setModelMarkers).not.toHaveBeenCalled();

    const failed = makeRun({
      location: { line: 3, column: 15 },
      result: {
        ok: false,
        durationMs: 2,
        error: { message: 'relation "nope" does not exist', sqlState: '42P01', position: 15 },
      },
    });
    runner.lastRun = failed;
    runner.history = [failed];
    rerender(
      <RunnerProvider>
        <SqlRuntime task={sqlTaskFixture} isVisible />
        <RunnerProbe />
      </RunnerProvider>
    );

    expect(screen.getByRole('tab', { name: /messages/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /messages/i })).toHaveTextContent('1');
    expect(setModelMarkers).toHaveBeenCalledWith(model, 'sql-run', [
      expect.objectContaining({
        startLineNumber: 3,
        startColumn: 15,
        endLineNumber: 3,
        endColumn: 16,
        message: 'relation "nope" does not exist',
      }),
    ]);

    // The next Run clears the underline.
    await user.click(screen.getByTestId('runner'));
    expect(setModelMarkers).toHaveBeenLastCalledWith(model, 'sql-run', []);
  });

  it('shows Results and the footer after a successful run', () => {
    const done = makeRun({
      result: {
        ok: true,
        durationMs: 42,
        results: [
          { label: 'CREATE TABLE', rowCount: null, columns: [], rows: [], truncated: false },
        ],
      },
    });
    runner.lastRun = done;
    runner.history = [done];
    renderRuntime();

    expect(screen.getByRole('tab', { name: /results/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('CREATE TABLE · Done')).toBeInTheDocument();
    expect(screen.getByText(/Last run: 1 statement · 42 ms/)).toBeInTheDocument();
  });
});

describe('SqlRuntime reset', () => {
  it('asks first (danger style), then resets the database', async () => {
    const user = userEvent.setup();
    renderRuntime();

    await user.click(screen.getByRole('button', { name: 'Reset database' }));
    expect(screen.getByRole('heading', { name: 'Reset your database?' })).toBeInTheDocument();
    expect(database.reset).not.toHaveBeenCalled();

    const confirm = screen.getAllByRole('button', { name: 'Reset database' }).at(-1) as HTMLElement;
    expect(confirm.className).toMatch(/Danger/);
    await user.click(confirm);

    expect(database.reset).toHaveBeenCalledTimes(1);
  });

  it('does nothing on Cancel', async () => {
    const user = userEvent.setup();
    renderRuntime();

    await user.click(screen.getByRole('button', { name: 'Reset database' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(database.reset).not.toHaveBeenCalled();
  });
});
