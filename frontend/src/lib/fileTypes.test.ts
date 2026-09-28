import { describe, it, expect } from 'vitest';
import { getFileType } from './fileTypes';

describe('getFileType', () => {
  it.each([
    ['index.html', 'HTML', 'html', '--color-filetype-html', true],
    ['page.htm', 'HTML', 'html', '--color-filetype-html', true],
    ['styles.css', 'CSS', 'css', '--color-filetype-css', true],
    ['app.js', 'JS', 'javascript', '--color-filetype-js', true],
    ['app.mjs', 'JS', 'javascript', '--color-filetype-js', true],
    ['app.cjs', 'JS', 'javascript', '--color-filetype-js', true],
    ['App.jsx', 'JS', 'javascript', '--color-filetype-js', true],
    ['app.ts', 'TS', 'typescript', '--color-filetype-ts', true],
    ['App.tsx', 'TS', 'typescript', '--color-filetype-ts', true],
    ['data.json', 'JSON', 'json', '--color-text-secondary', true],
    ['schema.sql', 'SQL', 'sql', '--color-accent-label', true],
    ['readme.md', 'MD', 'markdown', '--color-text-secondary', true],
    ['logo.svg', 'SVG', 'xml', '--color-status-success', true],
    ['photo.png', 'IMG', 'plaintext', '--color-status-success', false],
    ['photo.jpg', 'IMG', 'plaintext', '--color-status-success', false],
    ['photo.jpeg', 'IMG', 'plaintext', '--color-status-success', false],
    ['photo.gif', 'IMG', 'plaintext', '--color-status-success', false],
    ['photo.webp', 'IMG', 'plaintext', '--color-status-success', false],
    ['.env', 'TXT', 'plaintext', '--color-text-dim', true],
    ['.gitignore', 'TXT', 'plaintext', '--color-text-dim', true],
  ])('%s → %s', (path, label, monacoLanguage, colorVar, isText) => {
    expect(getFileType(path)).toEqual({ label, monacoLanguage, colorVar, isText });
  });

  it('matches extensions case-insensitively', () => {
    expect(getFileType('APP.JS').label).toBe('JS');
  });

  it('matches the last extension for a multi-dot file name', () => {
    expect(getFileType('test.spec.js')).toEqual({
      label: 'JS',
      monacoLanguage: 'javascript',
      colorVar: '--color-filetype-js',
      isText: true,
    });
  });
});
