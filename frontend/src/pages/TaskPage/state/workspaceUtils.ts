import { type PaneId } from '../../../types/workspaceTypes';

/** index.html at root → first root .html alphabetically → first .html anywhere → null */
export function resolveHtmlEntry(files: Record<string, string>): string | null {
  const paths = Object.keys(files);
  if (paths.includes('index.html')) return 'index.html';

  const rootHtml = paths.filter((path) => !path.includes('/') && path.endsWith('.html')).sort();
  if (rootHtml.length > 0) return rootHtml[0];

  const anyHtml = paths.filter((path) => path.endsWith('.html')).sort();
  return anyHtml[0] ?? null;
}

export function topLevelFolders(files: Record<string, string>): string[] {
  const folders = new Set<string>();
  for (const path of Object.keys(files)) {
    const slashIndex = path.indexOf('/');
    if (slashIndex > 0) folders.add(path.slice(0, slashIndex));
  }
  return [...folders];
}

export function expandParents(expandedFolders: string[], path: string): string[] {
  const slashIndex = path.indexOf('/');
  if (slashIndex === -1) return expandedFolders;
  const folder = path.slice(0, slashIndex);
  return expandedFolders.includes(folder) ? expandedFolders : [...expandedFolders, folder];
}

export function isValidPaneVisibility(value: unknown): value is Record<PaneId, boolean> {
  if (!value || typeof value !== 'object') return false;
  const panes: PaneId[] = ['sidebar', 'code', 'result'];
  return panes.every((pane) => typeof (value as Record<string, unknown>)[pane] === 'boolean');
}
