import { describe, it, expect } from 'vitest';
import { resolvePath } from './resolvePath';

describe('resolvePath', () => {
  it('resolves a sibling file', () => {
    expect(resolvePath('index.html', 'styles.css')).toBe('styles.css');
  });

  it('resolves ../ against the folder of the referring file', () => {
    expect(resolvePath('pages/x.html', '../a.css')).toBe('a.css');
  });

  it('treats a leading / as the workspace root', () => {
    expect(resolvePath('pages/x.html', '/assets/a.svg')).toBe('assets/a.svg');
  });

  it('drops the query and hash', () => {
    expect(resolvePath('index.html', './x.js?v=1#top')).toBe('x.js');
  });

  it('resolves nested ./ and ../ segments', () => {
    expect(resolvePath('css/base/main.css', './../img/./a.svg')).toBe('css/img/a.svg');
  });

  it('returns null when the path climbs above the root', () => {
    expect(resolvePath('index.html', '../secret.txt')).toBeNull();
    expect(resolvePath('pages/x.html', '../../a.css')).toBeNull();
  });

  it.each([
    'https://example.com/a.css',
    'http://example.com/a.css',
    '//cdn.example.com/lib.js',
    'data:image/png;base64,AAAA',
    'blob:https://example.com/1234',
    '#id',
    'mailto:someone@example.com',
    'tel:+911234567890',
    'javascript:void(0)',
    '',
  ])('returns null for %j', (ref) => {
    expect(resolvePath('index.html', ref)).toBeNull();
  });
});
