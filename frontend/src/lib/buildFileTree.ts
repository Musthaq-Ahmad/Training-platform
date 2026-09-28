export type TreeNode =
  | { type: 'folder'; name: string; path: string; children: TreeNode[]; fileCount: number }
  | { type: 'file'; name: string; path: string };

type FolderBuilder = {
  name: string;
  path: string;
  children: Map<string, FolderBuilder>;
  files: string[];
};

function createFolder(name: string, path: string): FolderBuilder {
  return { name, path, children: new Map(), files: [] };
}

function countFiles(nodes: TreeNode[]): number {
  return nodes.reduce((sum, node) => sum + (node.type === 'file' ? 1 : node.fileCount), 0);
}

function toNodes(folder: FolderBuilder): TreeNode[] {
  const folderNodes: TreeNode[] = [...folder.children.values()]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((child) => {
      const children = toNodes(child);
      return {
        type: 'folder',
        name: child.name,
        path: child.path,
        children,
        fileCount: countFiles(children),
      };
    });

  const fileNodes: TreeNode[] = folder.files.map((path) => ({
    type: 'file',
    name: path.split('/').pop() as string,
    path,
  }));

  return [...folderNodes, ...fileNodes];
}

/** Folders first (alphabetical), then files (input order), at every level. `fileCount` includes nested files. */
export function buildFileTree(paths: string[]): TreeNode[] {
  const root = createFolder('', '');

  for (const path of paths) {
    const parts = path.split('/');
    let current = root;

    for (let i = 0; i < parts.length - 1; i++) {
      const name = parts[i];
      const folderPath = parts.slice(0, i + 1).join('/');
      let child = current.children.get(name);
      if (!child) {
        child = createFolder(name, folderPath);
        current.children.set(name, child);
      }
      current = child;
    }

    current.files.push(path);
  }

  return toNodes(root);
}
