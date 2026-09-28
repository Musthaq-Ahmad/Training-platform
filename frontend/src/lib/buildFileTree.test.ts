import { describe, it, expect } from 'vitest';
import { buildFileTree } from './buildFileTree';

describe('buildFileTree', () => {
  it('returns an empty array for no paths', () => {
    expect(buildFileTree([])).toEqual([]);
  });

  it('puts folders before files at the root', () => {
    const tree = buildFileTree(['index.html', 'src/app.js']);
    expect(tree.map((node) => node.type)).toEqual(['folder', 'file']);
    expect(tree.map((node) => node.name)).toEqual(['src', 'index.html']);
  });

  it('sorts folders alphabetically', () => {
    const tree = buildFileTree(['src/a.js', 'assets/b.svg']);
    const folderNames = tree.filter((node) => node.type === 'folder').map((node) => node.name);
    expect(folderNames).toEqual(['assets', 'src']);
  });

  it('builds nested folders', () => {
    const tree = buildFileTree(['src/utils/math.js']);
    const src = tree[0];
    if (src.type !== 'folder') throw new Error('expected a folder');
    expect(src.name).toBe('src');
    expect(src.children).toHaveLength(1);

    const utils = src.children[0];
    if (utils.type !== 'folder') throw new Error('expected a folder');
    expect(utils.name).toBe('utils');
    expect(utils.children).toEqual([{ type: 'file', name: 'math.js', path: 'src/utils/math.js' }]);
  });

  it('keeps files in input order within a folder', () => {
    const tree = buildFileTree(['src/z.js', 'src/a.js']);
    const src = tree[0];
    if (src.type !== 'folder') throw new Error('expected a folder');
    expect(src.children.map((node) => node.name)).toEqual(['z.js', 'a.js']);
  });

  it('fileCount includes nested files', () => {
    const tree = buildFileTree(['src/a.js', 'src/utils/b.js', 'src/utils/c.js']);
    const src = tree[0];
    if (src.type !== 'folder') throw new Error('expected a folder');
    expect(src.fileCount).toBe(3);
  });
});
