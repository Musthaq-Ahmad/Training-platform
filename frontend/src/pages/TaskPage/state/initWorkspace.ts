import type { TaskCodeResponse } from '@itp/types';
import type { PaneId, WorkspaceState } from '../../../types/workspaceTypes';
import { isValidPaneVisibility, resolveHtmlEntry, topLevelFolders } from './workspaceUtils';

export function initWorkspace(
  code: TaskCodeResponse,
  savedPanes?: Record<PaneId, boolean>
): WorkspaceState {
  const files = Object.fromEntries(code.files.map((file) => [file.path, file.content]));
  const savedFiles = { ...files };

  const entry = resolveHtmlEntry(files);
  const firstAlphabetical = Object.keys(files).sort()[0] ?? null;
  const initialPath = entry ?? firstAlphabetical;

  const visiblePanes = isValidPaneVisibility(savedPanes)
    ? savedPanes
    : { sidebar: true, code: true, result: false };

  return {
    files,
    savedFiles,
    openPaths: initialPath ? [initialPath] : [],
    activePath: initialPath,
    expandedFolders: topLevelFolders(files),
    visiblePanes,
    sidebarTab: 'instructions',
    serverVersion: 0,
  };
}
