import { describe, it, expect } from 'vitest';
import { isIgnoredPath } from './workspaceIgnore';

describe('isIgnoredPath', () => {
  it('is true for a path inside node_modules', () => {
    expect(isIgnoredPath('node_modules/a.js')).toBe(true);
  });

  it('is true for node_modules nested under another folder', () => {
    expect(isIgnoredPath('src/node_modules/a.js')).toBe(true);
  });

  it('is true for a path inside dist', () => {
    expect(isIgnoredPath('dist/index.html')).toBe(true);
  });

  it('is true for the workspace helper files and databases in .vinkup', () => {
    expect(isIgnoredPath('.vinkup/prisma/cli.mjs')).toBe(true);
    expect(isIgnoredPath('.vinkup/db/dev/PG_VERSION')).toBe(true);
  });

  it("is true for prisma-pglite's scratch databases in .not-committed", () => {
    expect(isIgnoredPath('.not-committed/pglite/dev/PG_VERSION')).toBe(true);
  });

  it('is true for package-lock.json', () => {
    expect(isIgnoredPath('package-lock.json')).toBe(true);
  });

  it('is true for a .log file', () => {
    expect(isIgnoredPath('debug.log')).toBe(true);
  });

  it('is false for a normal source file', () => {
    expect(isIgnoredPath('src/index.ts')).toBe(false);
  });

  it('is false for package.json', () => {
    expect(isIgnoredPath('package.json')).toBe(false);
  });

  it('is false for a file that only starts with an ignored name (whole segment only)', () => {
    expect(isIgnoredPath('distribution.md')).toBe(false);
  });
});
