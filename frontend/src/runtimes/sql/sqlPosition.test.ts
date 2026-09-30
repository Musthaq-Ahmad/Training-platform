import { describe, it, expect } from 'vitest';
import { sqlErrorLocation } from './sqlPosition';

describe('sqlErrorLocation', () => {
  it('maps position 1 to line 1, column 1', () => {
    expect(sqlErrorLocation('selec 1;', 0, 1)).toEqual({ line: 1, column: 1 });
  });

  it('finds a position on line 3', () => {
    const file = 'select 1;\nselect 2;\nselect * from tickets;';
    // "tickets" starts 14 characters into line 3
    const position = file.indexOf('tickets') + 1;
    expect(sqlErrorLocation(file, 0, position)).toEqual({ line: 3, column: 15 });
  });

  it('shifts by where the selection starts', () => {
    const file = 'line 1\nline 2\nline 3\nline 4\n  select * from nope;\n';
    const selectionStart = file.indexOf('select');
    // "nope" is character 15 of the selected text
    expect(sqlErrorLocation(file, selectionStart, 15)).toEqual({ line: 5, column: 17 });
  });

  it('handles \\r\\n line endings', () => {
    const file = 'select 1;\r\nselect 2;\r\nselec 3;';
    expect(sqlErrorLocation(file, 0, file.indexOf('selec 3') + 1)).toEqual({ line: 3, column: 1 });
  });

  it('counts characters the way Postgres does (an emoji is one)', () => {
    const file = "select '😀', nope;";
    // Postgres position of "nope" counts 😀 as 1 character; in the editor it takes 2 columns.
    expect(sqlErrorLocation(file, 0, 14)).toEqual({ line: 1, column: 15 });
  });

  it('clamps a position past the end', () => {
    expect(sqlErrorLocation('select 1;\nx', 0, 999)).toEqual({ line: 2, column: 2 });
  });
});
