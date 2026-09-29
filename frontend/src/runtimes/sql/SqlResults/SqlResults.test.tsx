import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import type { SqlStatementResult } from '../sqlTypes';
import type { SqlRun } from '../useSqlRunner';
import SqlResults from './SqlResults';

function runWith(results: SqlStatementResult[]): SqlRun {
  return {
    id: 1,
    at: new Date(),
    ranSelection: false,
    result: { ok: true, results, durationMs: 3 },
    runError: null,
    location: null,
    hadOpenTransaction: false,
    statementCount: results.length,
  };
}

const select: SqlStatementResult = {
  label: 'SELECT',
  rowCount: null,
  columns: ['id', 'title'],
  rows: [
    ['1', 'Login broken'],
    ['2', null],
  ],
  truncated: false,
};

describe('SqlResults', () => {
  it('shows the header, column names and rows of a SELECT', () => {
    render(<SqlResults run={runWith([select])} />);

    expect(screen.getByRole('heading', { name: 'SELECT · 2 rows' })).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(
      within(table)
        .getAllByRole('columnheader')
        .map((th) => th.textContent)
    ).toEqual(['id', 'title']);
    expect(within(table).getByText('Login broken')).toBeInTheDocument();
  });

  it('shows NULL, dimmed', () => {
    render(<SqlResults run={runWith([select])} />);
    expect(screen.getByText('NULL').className).toMatch(/null/);
  });

  it('says when rows were cut off', () => {
    const rows = Array.from({ length: 500 }, (_, i) => [String(i)]);
    render(
      <SqlResults
        run={runWith([{ label: 'SELECT', rowCount: null, columns: ['g'], rows, truncated: true }])}
      />
    );
    expect(screen.getByText('Showing the first 500 rows')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'SELECT · 500+ rows' })).toBeInTheDocument();
  });

  it('shows "3 rows affected" and "Done" for statements without columns', () => {
    render(
      <SqlResults
        run={runWith([
          { label: 'CREATE TABLE', rowCount: null, columns: [], rows: [], truncated: false },
          { label: 'INSERT', rowCount: 3, columns: [], rows: [], truncated: false },
          { label: 'DELETE', rowCount: 1, columns: [], rows: [], truncated: false },
        ])}
      />
    );
    expect(screen.getByRole('heading', { name: 'CREATE TABLE · Done' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'INSERT · 3 rows affected' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'DELETE · 1 row affected' })).toBeInTheDocument();
  });

  it('shows "No rows" for an empty SELECT, with its header', () => {
    render(
      <SqlResults
        run={runWith([
          { label: 'SELECT', rowCount: null, columns: ['id'], rows: [], truncated: false },
        ])}
      />
    );
    expect(screen.getByRole('columnheader', { name: 'id' })).toBeInTheDocument();
    expect(screen.getByText('No rows')).toBeInTheDocument();
  });

  it('shows the empty state and the reload note before any run', () => {
    render(<SqlResults run={null} />);
    expect(screen.getByText('Run a query to see results here.')).toBeInTheDocument();
    expect(
      screen.getByText('The database lives in this tab. Re-run your .sql files after a reload.')
    ).toBeInTheDocument();
  });
});
