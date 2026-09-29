import type { DirectoryNode, FileSystemTree } from '@webcontainer/api';
import { getFileType } from '../../lib/fileTypes';
import { isIgnoredPath } from '../../lib/workspaceIgnore';

/** Flat workspace files → WebContainer's nested tree: `{ 'src/a.js': 'x' }` → `{ src: { directory: { 'a.js': { file: { contents: 'x' } } } } }` */
export function toFileSystemTree(files: Record<string, string>): FileSystemTree {
  const tree: FileSystemTree = {};

  for (const [path, contents] of Object.entries(files)) {
    if (isIgnoredPath(path) || !getFileType(path).isText) continue;

    const parts = path.split('/').filter(Boolean);
    const fileName = parts.pop();
    if (!fileName) continue;

    let folder = tree;
    for (const part of parts) {
      const existing = folder[part];
      if (!existing || !('directory' in existing)) {
        const directory: DirectoryNode = { directory: {} };
        folder[part] = directory;
        folder = directory.directory;
      } else {
        folder = existing.directory;
      }
    }
    folder[fileName] = { file: { contents } };
  }

  return tree;
}
