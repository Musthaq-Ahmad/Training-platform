import type { TaskFile } from '@itp/types';
import type { WorkspaceState } from '../../../types/workspaceTypes';
import { resolveHtmlEntry } from './workspaceUtils';

export function selectDirtyPaths(state: WorkspaceState): string[] {
  return Object.keys(state.files).filter((path) => state.files[path] !== state.savedFiles[path]);
}

export function selectIsDirty(state: WorkspaceState): boolean {
  return selectDirtyPaths(state).length > 0;
}

export function selectFilesForSave(state: WorkspaceState): TaskFile[] {
  return Object.entries(state.files)
    .map(([path, content]) => ({ path, content }))
    .sort((a, b) => a.path.localeCompare(b.path));
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

export function selectFileCount(state: WorkspaceState): number {
  return Object.keys(state.files).filter((path) => !path.includes('/')).length;
}
