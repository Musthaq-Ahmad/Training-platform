import type { WorkspaceAction, WorkspaceState } from '../../../types/workspaceTypes';
import { expandParents } from './workspaceUtils';

export function workspaceReducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  switch (action.type) {
    case 'serverFilesLoaded': {
      const files = Object.fromEntries(action.code.files.map((file) => [file.path, file.content]));
      const savedFiles = { ...files };
      const openPaths = state.openPaths.filter((path) => path in files);
      const activePath =
        state.activePath && state.activePath in files ? state.activePath : (openPaths[0] ?? null);

      return {
        ...state,
        files,
        savedFiles,
        openPaths,
        activePath,
        serverVersion: state.serverVersion + 1,
      };
    }

    case 'fileOpened': {
      if (!(action.path in state.files)) return state;
      if (state.openPaths.includes(action.path)) {
        return { ...state, activePath: action.path };
      }

      const activeIndex = state.activePath ? state.openPaths.indexOf(state.activePath) : -1;
      const insertAt = activeIndex === -1 ? state.openPaths.length : activeIndex + 1;
      const openPaths = [
        ...state.openPaths.slice(0, insertAt),
        action.path,
        ...state.openPaths.slice(insertAt),
      ];

      return {
        ...state,
        openPaths,
        activePath: action.path,
        expandedFolders: expandParents(state.expandedFolders, action.path),
      };
    }

    case 'tabActivated':
      return state.openPaths.includes(action.path) ? { ...state, activePath: action.path } : state;

    case 'tabClosed': {
      if (!state.openPaths.includes(action.path)) return state;
      const index = state.openPaths.indexOf(action.path);
      const openPaths = state.openPaths.filter((path) => path !== action.path);

      const activePath =
        state.activePath === action.path
          ? (openPaths[index] ?? openPaths[index - 1] ?? null)
          : state.activePath;

      return { ...state, openPaths, activePath };
    }

    case 'allTabsClosed':
      return { ...state, openPaths: [], activePath: null };

    case 'fileEdited': {
      if (!(action.path in state.files)) return state;
      if (state.files[action.path] === action.content) return state;
      return { ...state, files: { ...state.files, [action.path]: action.content } };
    }

    case 'saveSucceeded':
      return { ...state, savedFiles: { ...state.savedFiles, ...action.snapshot } };

    case 'folderToggled': {
      const isExpanded = state.expandedFolders.includes(action.path);
      return {
        ...state,
        expandedFolders: isExpanded
          ? state.expandedFolders.filter((path) => path !== action.path)
          : [...state.expandedFolders, action.path],
      };
    }

    case 'allFoldersCollapsed':
      return { ...state, expandedFolders: [] };

    case 'paneToggled': {
      const next = { ...state.visiblePanes, [action.pane]: !state.visiblePanes[action.pane] };
      return Object.values(next).some(Boolean) ? { ...state, visiblePanes: next } : state;
    }

    case 'panesSet':
      return Object.values(action.visiblePanes).some(Boolean)
        ? { ...state, visiblePanes: action.visiblePanes }
        : state;

    case 'sidebarTabChanged':
      return {
        ...state,
        sidebarTab: action.tab,
        visiblePanes: { ...state.visiblePanes, sidebar: true },
      };

    default: {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  }
}
