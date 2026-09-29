import { describe, it, expect } from 'vitest';
import { toFileSystemTree } from './toFileSystemTree';

describe('toFileSystemTree', () => {
  it('puts root files at the top level', () => {
    expect(toFileSystemTree({ 'package.json': '{}', 'index.js': 'x' })).toEqual({
      'package.json': { file: { contents: '{}' } },
      'index.js': { file: { contents: 'x' } },
    });
  });

  it('merges files in the same folder into one directory, nested too', () => {
    expect(toFileSystemTree({ 'src/a.js': 'a', 'src/b.js': 'b', 'src/lib/c.js': 'c' })).toEqual({
      src: {
        directory: {
          'a.js': { file: { contents: 'a' } },
          'b.js': { file: { contents: 'b' } },
          lib: { directory: { 'c.js': { file: { contents: 'c' } } } },
        },
      },
    });
  });

  it('skips ignored paths and images', () => {
    expect(
      toFileSystemTree({
        'node_modules/x/index.js': 'x',
        'dist/out.js': 'x',
        'npm-debug.log': 'x',
        'assets/photo.png': 'binary',
        'assets/icon.svg': '<svg/>',
      })
    ).toEqual({ assets: { directory: { 'icon.svg': { file: { contents: '<svg/>' } } } } });
  });
});
