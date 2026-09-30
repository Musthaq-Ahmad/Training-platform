import { describe, it, expect } from 'vitest';
import { splitStatements, statementLabel } from './splitStatements';

describe('splitStatements', () => {
  it('splits on ;', () => {
    expect(splitStatements('select 1; select 2;')).toEqual(['select 1', 'select 2']);
  });

  it("ignores ; inside '…' strings, including '' escapes", () => {
    expect(splitStatements("insert into t values ('a;b', 'it''s; ok'); select 1")).toEqual([
      "insert into t values ('a;b', 'it''s; ok')",
      'select 1',
    ]);
  });

  it("ignores ; inside E'…' strings with backslash escapes", () => {
    expect(splitStatements("select E'x\\';y'; select 2")).toEqual(["select E'x\\';y'", 'select 2']);
  });

  it('ignores ; inside "…" identifiers', () => {
    expect(splitStatements('select 1 as "a;b"; select 2')).toEqual([
      'select 1 as "a;b"',
      'select 2',
    ]);
  });

  it('ignores ; inside -- comments and drops the comment', () => {
    expect(splitStatements('select 1; -- a; b\nselect 2;')).toEqual(['select 1', 'select 2']);
  });

  it('ignores ; inside /* */ comments, nested too', () => {
    expect(splitStatements('select /* a; /* b; */ c; */ 1; select 2')).toEqual([
      'select   1',
      'select 2',
    ]);
  });

  it('ignores ; inside $$…$$ and $tag$…$tag$ bodies', () => {
    const fn = 'create function f() returns int as $$ begin return 1; end; $$ language plpgsql';
    const tagged = 'do $body$ begin perform 1; end $body$';
    expect(splitStatements(`${fn}; ${tagged}; select $1`)).toEqual([fn, tagged, 'select $1']);
  });

  it('keeps a trailing statement without ;', () => {
    expect(splitStatements('select 1;\nselect 2')).toEqual(['select 1', 'select 2']);
  });

  it('drops empty and comment-only statements', () => {
    expect(splitStatements(';;  ; -- only a comment\n; /* x */ ; select 1;;')).toEqual([
      'select 1',
    ]);
    expect(splitStatements('   ')).toEqual([]);
  });
});

describe('statementLabel', () => {
  it.each([
    ['select * from t', 'SELECT'],
    ['create table rooms (id int)', 'CREATE TABLE'],
    ['CREATE INDEX idx on t (a)', 'CREATE INDEX'],
    ['insert into t values (1)', 'INSERT'],
    ['explain select 1', 'EXPLAIN'],
    ['with x as (select 1) select * from x', 'WITH'],
    ['drop table t', 'DROP TABLE'],
    ['start transaction', 'START TRANSACTION'],
  ])('%s → %s', (statement, label) => {
    expect(statementLabel(statement)).toBe(label);
  });
});
