import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { sqlTaskWithSetupFixture } from '../../test/fixtures/task';
import { createSqlDatabase, toDisplayText, type SqlDatabase } from './pgliteService';
import type { SqlRunResult } from './sqlTypes';

// Real PGlite, no mocks. The spec asked for the Node test environment; the shared
// src/test/setup.ts touches `window`, so this runs in jsdom like esbuildService.test.ts
// (PGlite's Node build works there). Start-up takes a moment, so one database per group.

function okResults(result: SqlRunResult) {
  if (!result.ok) throw new Error(`expected ok, got ${result.error.message}`);
  return result.results;
}

describe('createSqlDatabase', { timeout: 30000 }, () => {
  describe('an empty database', () => {
    let db: SqlDatabase;
    beforeAll(async () => {
      db = await createSqlDatabase(null);
    });
    afterAll(async () => {
      await db.close();
    });

    it('starts empty', async () => {
      const [result] = okResults(
        await db.run(
          "select count(*)::int as n from information_schema.tables where table_schema = 'public'"
        )
      );
      expect(result.rows).toEqual([['0']]);
    });

    it('reports rows affected per statement, and Done for DDL', async () => {
      const results = okResults(
        await db.run(
          "create table tickets (id serial primary key, title text not null, note text, status text check (status in ('open', 'closed')));" +
            "insert into tickets (title, status) values ('a', 'open'), ('b', 'open'), ('c', 'closed');" +
            "update tickets set note = 'x' where status = 'open';"
        )
      );

      expect(results.map((r) => [r.label, r.rowCount])).toEqual([
        ['CREATE TABLE', null],
        ['INSERT', 3],
        ['UPDATE', 2],
      ]);
    });

    it('returns columns and display values for a SELECT, with NULL as null', async () => {
      const [result] = okResults(await db.run('select id, title, note from tickets order by id'));

      expect(result).toMatchObject({
        label: 'SELECT',
        rowCount: null,
        columns: ['id', 'title', 'note'],
        truncated: false,
      });
      expect(result.rows).toEqual([
        ['1', 'a', 'x'],
        ['2', 'b', 'x'],
        ['3', 'c', null],
      ]);
    });

    it('keeps two columns with the same name', async () => {
      const [result] = okResults(await db.run('select 1 as a, 2 as a'));
      expect(result.columns).toEqual(['a', 'a']);
      expect(result.rows).toEqual([['1', '2']]);
    });

    it('gives SQLSTATE 23514 for a CHECK violation', async () => {
      const result = await db.run("insert into tickets (title, status) values ('d', 'maybe')");
      expect(result).toMatchObject({ ok: false, error: { sqlState: '23514' } });
    });

    it('gives 42601 and position 1 for "selec 1"', async () => {
      const result = await db.run('selec 1');
      expect(result).toMatchObject({ ok: false, error: { sqlState: '42601', position: 1 } });
    });

    it('keeps nothing from a multi-statement run when a later statement fails', async () => {
      const text =
        "insert into tickets (title, status) values ('kept?', 'open'); select * from nope;";
      const result = await db.run(text);
      expect(result).toMatchObject({
        ok: false,
        error: { sqlState: '42P01', position: text.indexOf('nope') + 1 },
      });

      const [count] = okResults(await db.run("select count(*) from tickets where title = 'kept?'"));
      expect(count.rows).toEqual([['0']]);
    });

    it('keeps the first 500 of 600 rows and marks the result truncated', async () => {
      const [result] = okResults(await db.run('select g from generate_series(1, 600) g'));
      expect(result.rows).toHaveLength(500);
      expect(result.truncated).toBe(true);
    });

    it('shows EXPLAIN as a one-column result', async () => {
      const [result] = okResults(await db.run('explain select * from tickets where id = 1'));
      expect(result.label).toBe('EXPLAIN');
      expect(result.columns).toEqual(['QUERY PLAN']);
      expect(result.rows.length).toBeGreaterThan(0);
      expect(result.rows.every((row) => row.length === 1)).toBe(true);
    });

    it('reports a duration', async () => {
      const result = await db.run('select 1');
      expect(result.durationMs).toBeGreaterThanOrEqual(0);
    });
  });

  describe("a database with the task's setup SQL", () => {
    let db: SqlDatabase;
    beforeAll(async () => {
      db = await createSqlDatabase(sqlTaskWithSetupFixture.setupSql);
    });
    afterAll(async () => {
      await db.close();
    });

    it('has the setup rows', async () => {
      const [result] = okResults(await db.run('select * from rooms order by id'));
      expect(result.rows).toEqual([
        ['1', 'A'],
        ['2', 'B'],
      ]);
    });
  });

  it('rejects with the setup message when setupSql is bad', async () => {
    await expect(createSqlDatabase('create tabel oops (id int);')).rejects.toThrow(
      /^The task's setup SQL failed: syntax error at or near "tabel"/
    );
  });

  it.each([null, '', '   \n\t'])('creates a database with setupSql=%s', async (sql) => {
    const db = await createSqlDatabase(sql);

    try {
      const result = await db.run('select 1 as value');
      expect(okResults(result)[0].rows).toEqual([['1']]);
    } finally {
      await db.close();
    }
  });

  it('runs multiple setup statements in order', async () => {
    const db = await createSqlDatabase(`
    create table setup_test (id int primary key);
    insert into setup_test values (1);
    insert into setup_test values (2);
  `);

    try {
      const [result] = okResults(await db.run('select id from setup_test order by id'));

      expect(result.rows).toEqual([['1'], ['2']]);
    } finally {
      await db.close();
    }
  });
});

describe('toDisplayText', () => {
  it.each([
    [null, null],
    [undefined, null],
    [42, '42'],
    [true, 'true'],
    ['text', 'text'],
    [new Date('2026-09-28T09:30:00.000Z'), '2026-09-28T09:30:00.000Z'],
    [new Uint8Array([1, 171]), '\\x01ab'],
    [{ k: 1 }, '{"k":1}'],
    [[1, 2], '[1,2]'],
  ])('%s → %s', (value, text) => {
    expect(toDisplayText(value)).toBe(text);
  });
});
