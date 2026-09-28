import type { TaskFile } from '@itp/types';
import type { WorkspaceState } from '../../../types/workspaceTypes';
import { isIgnoredPath, MAX_FILE_CHARS } from '../../../lib/workspaceIgnore';
import { resolveHtmlEntry } from './workspaceUtils';

/** Edited, new, or deleted since the last save */
export function selectDirtyPaths(state: WorkspaceState): string[] {
  const changed = Object.keys(state.files).filter((p) => state.files[p] !== state.savedFiles[p]);
  const deleted = Object.keys(state.savedFiles).filter((p) => !(p in state.files));
  return [...changed, ...deleted];
}

export function selectIsDirty(state: WorkspaceState): boolean {
  return selectDirtyPaths(state).length > 0;
}

/** Everything the server should store: all files except ignored ones, sorted by path */
export function selectFilesForSave(state: WorkspaceState): TaskFile[] {
  return Object.entries(state.files)
    .filter(([path]) => !isIgnoredPath(path))
    .map(([path, content]) => ({ path, content }))
    .sort((a, b) => a.path.localeCompare(b.path));
}

/** First file over the backend's limit, or null */
export function selectOversizedPath(state: WorkspaceState): string | null {
  return selectFilesForSave(state).find((f) => f.content.length > MAX_FILE_CHARS)?.path ?? null;
}

export function selectSaveSnapshot(state: WorkspaceState): Record<string, string> {
  return Object.fromEntries(selectFilesForSave(state).map((file) => [file.path, file.content]));
}

export function selectActiveFile(state: WorkspaceState): { path: string; content: string } | null {
  if (!state.activePath) return null;
  const content = state.files[state.activePath];
  return content === undefined ? null : { path: state.activePath, content };
}

export function selectHtmlEntry(state: WorkspaceState): string | null {
  return resolveHtmlEntry(state.files);
}

/** Paths the tree shows and autosave sends */
export function selectVisiblePaths(state: WorkspaceState): string[] {
  return Object.keys(state.files).filter((path) => !isIgnoredPath(path));
}

export function selectFileCount(state: WorkspaceState): number {
  return selectVisiblePaths(state).length;
}
