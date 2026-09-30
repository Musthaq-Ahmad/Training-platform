import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { SqlRun } from '../useSqlRunner';
import SqlMessages from './SqlMessages';

const at = new Date(2026, 8, 28, 14, 32, 5);

function makeRun(overrides: Partial<SqlRun>): SqlRun {
  return {
    id: 1,
    at,
    ranSelection: false,
    result: null,
    runError: null,
    location: null,
    hadOpenTransaction: false,
    statementCount: 1,
    ...overrides,
  };
}

const empty = { label: 'SELECT', rowCount: null, columns: [], rows: [], truncated: false };

describe('SqlMessages', () => {
  it('shows a success line with the time', () => {
    render(
      <SqlMessages
        history={[
          makeRun({
            statementCount: 3,
            result: { ok: true, results: [empty, empty, empty], durationMs: 42 },
          }),
        ]}
      />
    );
    expect(screen.getByText('14:32:05')).toBeInTheDocument();
    expect(screen.getByText('Ran 3 statements in 42 ms')).toBeInTheDocument();
  });

  it('adds " · selection" when a selection ran', () => {
    render(
      <SqlMessages
        history={[
          makeRun({ ranSelection: true, result: { ok: true, results: [empty], durationMs: 5 } }),
        ]}
      />
    );
    expect(screen.getByText('Ran 1 statement in 5 ms · selection')).toBeInTheDocument();
  });

  it('shows an error line with "Line 4, column 8", the SQLSTATE and the rollback note', () => {
    render(
      <SqlMessages
        history={[
          makeRun({
            statementCount: 2,
            location: { line: 4, column: 8 },
            result: {
              ok: false,
              durationMs: 2,
              error: {
                message: 'relation "tickets" does not exist',
                sqlState: '42P01',
                position: 30,
              },
            },
          }),
        ]}
      />
    );
    const line = screen.getByText(/Line 4, column 8: relation "tickets" does not exist/);
    expect(line.closest('[class]')?.parentElement?.className).toMatch(/error/);
    expect(screen.getByText('SQLSTATE 42P01')).toBeInTheDocument();
    expect(screen.getByText('Nothing from this run was saved.')).toBeInTheDocument();
  });

  it('leaves out the rollback note for a single statement', () => {
    render(
      <SqlMessages
        history={[
          makeRun({
            result: {
              ok: false,
              durationMs: 1,
              error: { message: 'x', sqlState: null, position: null },
            },
          }),
        ]}
      />
    );
    expect(screen.queryByText('Nothing from this run was saved.')).not.toBeInTheDocument();
  });

  it('shows a run error, error-styled', () => {
    render(<SqlMessages history={[makeRun({ runError: 'Nothing to run.' })]} />);
    expect(screen.getByText('Nothing to run.').parentElement?.className).toMatch(/error/);
  });

  it('shows the open-transaction info row', () => {
    render(
      <SqlMessages
        history={[
          makeRun({
            hadOpenTransaction: true,
            result: { ok: true, results: [empty], durationMs: 1 },
          }),
        ]}
      />
    );
    expect(
      screen.getByText('Your transaction is still open. Run COMMIT or ROLLBACK.').parentElement
        ?.className
    ).toMatch(/info/);
  });

  it('lists runs newest first as given', () => {
    render(
      <SqlMessages
        history={[makeRun({ id: 2, runError: 'second' }), makeRun({ id: 1, runError: 'first' })]}
      />
    );
    const texts = screen.getAllByText(/^(first|second)$/).map((node) => node.textContent);
    expect(texts).toEqual(['second', 'first']);
  });
});
