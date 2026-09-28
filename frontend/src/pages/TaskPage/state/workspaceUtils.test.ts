import { describe, it, expect } from 'vitest';
import { parentFolders, expandParents } from './workspaceUtils';

describe('parentFolders', () => {
  it('returns every ancestor folder, nearest last', () => {
    expect(parentFolders('a/b/c.js')).toEqual(['a', 'a/b']);
  });

  it('returns an empty array for a root file', () => {
    expect(parentFolders('a.js')).toEqual([]);
  });
});

describe('expandParents', () => {
  it('adds only the folders that are missing', () => {
    const next = expandParents(['a'], 'a/b/c.js');
    expect(next).toEqual(['a', 'a/b']);
  });

  it('returns the same array when nothing is missing', () => {
    const expanded = ['a', 'a/b'];
    const next = expandParents(expanded, 'a/b/c.js');
    expect(next).toBe(expanded);
  });
});
