import { describe, it, expect } from 'vitest';
import { workspaceReducer } from './workspaceReducer';
import { initWorkspace } from './initWorkspace';
import { taskCodeFixture } from '../../../test/fixtures/task';

function baseState() {
  return initWorkspace(taskCodeFixture);
}

describe('workspaceReducer', () => {
  describe('serverFilesLoaded', () => {
    it('replaces files and savedFiles and bumps serverVersion', () => {
      const state = baseState();
      const next = workspaceReducer(state, {
        type: 'serverFilesLoaded',
        code: { files: [{ path: 'a.html', content: '<p>hi</p>' }] },
      });

      expect(next.files).toEqual({ 'a.html': '<p>hi</p>' });
      expect(next.savedFiles).toEqual({ 'a.html': '<p>hi</p>' });
      expect(next.serverVersion).toBe(state.serverVersion + 1);
    });

    it('drops open tabs whose path no longer exists and activates the first remaining', () => {
      const state = {
        ...baseState(),
        openPaths: ['services.html', 'styles.css'],
        activePath: 'services.html',
      };

      const next = workspaceReducer(state, {
        type: 'serverFilesLoaded',
        code: { files: [{ path: 'styles.css', content: 'body {}' }] },
      });

      expect(next.openPaths).toEqual(['styles.css']);
      expect(next.activePath).toBe('styles.css');
    });
  });

  describe('fileOpened', () => {
    it('inserts right after the active tab and activates it', () => {
      const state = { ...baseState(), openPaths: ['services.html'], activePath: 'services.html' };
      const next = workspaceReducer(state, { type: 'fileOpened', path: 'styles.css' });

      expect(next.openPaths).toEqual(['services.html', 'styles.css']);
      expect(next.activePath).toBe('styles.css');
    });

    it('activates without duplicating an already-open tab', () => {
      const state = {
        ...baseState(),
        openPaths: ['services.html', 'styles.css'],
        activePath: 'services.html',
      };
      const next = workspaceReducer(state, { type: 'fileOpened', path: 'styles.css' });

      expect(next.openPaths).toEqual(['services.html', 'styles.css']);
      expect(next.activePath).toBe('styles.css');
    });

    it('ignores an unknown path', () => {
      const state = baseState();
      const next = workspaceReducer(state, { type: 'fileOpened', path: 'nope.js' });
      expect(next).toBe(state);
    });

    it('expands the parent folder', () => {
      const state = { ...baseState(), expandedFolders: [] };
      const next = workspaceReducer(state, { type: 'fileOpened', path: 'assets/logo.svg' });
      expect(next.expandedFolders).toContain('assets');
    });
  });

  describe('tabActivated', () => {
    it('activates an open tab', () => {
      const state = { ...baseState(), openPaths: ['services.html', 'styles.css'] };
      const next = workspaceReducer(state, { type: 'tabActivated', path: 'styles.css' });
      expect(next.activePath).toBe('styles.css');
    });

    it('ignores a path that is not open', () => {
      const state = baseState();
      const next = workspaceReducer(state, { type: 'tabActivated', path: 'styles.css' });
      expect(next).toBe(state);
    });
  });

  describe('tabClosed', () => {
    it('activates the tab to the right when closing the active tab', () => {
      const state = {
        ...baseState(),
        openPaths: ['a.html', 'b.html', 'c.html'],
        activePath: 'b.html',
      };
      const next = workspaceReducer(state, { type: 'tabClosed', path: 'b.html' });
      expect(next.openPaths).toEqual(['a.html', 'c.html']);
      expect(next.activePath).toBe('c.html');
    });

    it('activates the tab to the left when there is nothing to the right', () => {
      const state = { ...baseState(), openPaths: ['a.html', 'b.html'], activePath: 'b.html' };
      const next = workspaceReducer(state, { type: 'tabClosed', path: 'b.html' });
      expect(next.activePath).toBe('a.html');
    });

    it('sets activePath to null when it was the only tab', () => {
      const state = { ...baseState(), openPaths: ['a.html'], activePath: 'a.html' };
      const next = workspaceReducer(state, { type: 'tabClosed', path: 'a.html' });
      expect(next.activePath).toBeNull();
    });

    it('keeps edited content in files after closing a tab', () => {
      const state = {
        ...baseState(),
        files: { ...baseState().files, 'services.html': 'edited' },
        openPaths: ['services.html'],
        activePath: 'services.html',
      };
      const next = workspaceReducer(state, { type: 'tabClosed', path: 'services.html' });
      expect(next.files['services.html']).toBe('edited');
    });
  });

  it('allTabsClosed clears openPaths and activePath', () => {
    const state = baseState();
    const next = workspaceReducer(state, { type: 'allTabsClosed' });
    expect(next.openPaths).toEqual([]);
    expect(next.activePath).toBeNull();
  });

  describe('fileEdited', () => {
    it('updates file content', () => {
      const state = baseState();
      const next = workspaceReducer(state, {
        type: 'fileEdited',
        path: 'services.html',
        content: 'new',
      });
      expect(next.files['services.html']).toBe('new');
    });

    it('ignores an unknown path', () => {
      const state = baseState();
      const next = workspaceReducer(state, { type: 'fileEdited', path: 'nope.js', content: 'x' });
      expect(next).toBe(state);
    });

    it('returns the same state object when content is unchanged', () => {
      const state = baseState();
      const content = state.files['services.html'];
      const next = workspaceReducer(state, {
        type: 'fileEdited',
        path: 'services.html',
        content,
      });
      expect(next).toBe(state);
    });
  });

  it('saveSucceeded replaces savedFiles with the snapshot', () => {
    const state = { ...baseState(), files: { ...baseState().files, 'services.html': 'dirty' } };
    const snapshot = { 'services.html': 'dirty' };
    const next = workspaceReducer(state, { type: 'saveSucceeded', snapshot });
    expect(next.savedFiles).toEqual(snapshot);
    expect(next.files['services.html']).toBe('dirty');
  });

  describe('folderToggled', () => {
    it('adds a collapsed folder', () => {
      const state = { ...baseState(), expandedFolders: [] };
      const next = workspaceReducer(state, { type: 'folderToggled', path: 'assets' });
      expect(next.expandedFolders).toEqual(['assets']);
    });

    it('removes an expanded folder', () => {
      const state = { ...baseState(), expandedFolders: ['assets'] };
      const next = workspaceReducer(state, { type: 'folderToggled', path: 'assets' });
      expect(next.expandedFolders).toEqual([]);
    });
  });

  it('allFoldersCollapsed clears expandedFolders', () => {
    const state = { ...baseState(), expandedFolders: ['assets'] };
    const next = workspaceReducer(state, { type: 'allFoldersCollapsed' });
    expect(next.expandedFolders).toEqual([]);
  });

  describe('paneToggled', () => {
    it('flips the given pane', () => {
      const state = baseState();
      const next = workspaceReducer(state, { type: 'paneToggled', pane: 'result' });
      expect(next.visiblePanes.result).toBe(true);
    });

    it('refuses to hide the last visible pane', () => {
      const state = {
        ...baseState(),
        visiblePanes: { sidebar: false, code: true, result: false },
      };
      const next = workspaceReducer(state, { type: 'paneToggled', pane: 'code' });
      expect(next).toBe(state);
    });
  });

  describe('panesSet', () => {
    it('replaces visiblePanes', () => {
      const state = baseState();
      const visiblePanes = { sidebar: false, code: false, result: true };
      const next = workspaceReducer(state, { type: 'panesSet', visiblePanes });
      expect(next.visiblePanes).toEqual(visiblePanes);
    });

    it('refuses an all-false payload', () => {
      const state = baseState();
      const next = workspaceReducer(state, {
        type: 'panesSet',
        visiblePanes: { sidebar: false, code: false, result: false },
      });
      expect(next).toBe(state);
    });
  });

  it('sidebarTabChanged sets the tab and makes the sidebar visible', () => {
    const state = {
      ...baseState(),
      visiblePanes: { sidebar: false, code: true, result: false },
    };
    const next = workspaceReducer(state, { type: 'sidebarTabChanged', tab: 'files' });
    expect(next.sidebarTab).toBe('files');
    expect(next.visiblePanes.sidebar).toBe(true);
  });

  describe('fileCreated', () => {
    it('adds and opens the new file', () => {
      const state = baseState();
      const next = workspaceReducer(state, {
        type: 'fileCreated',
        path: 'new.js',
        content: 'hi',
      });
      expect(next.files['new.js']).toBe('hi');
      expect(next.openPaths).toContain('new.js');
      expect(next.activePath).toBe('new.js');
    });

    it('adds without opening when open is false', () => {
      const state = baseState();
      const next = workspaceReducer(state, {
        type: 'fileCreated',
        path: 'new.js',
        open: false,
      });
      expect(next.files['new.js']).toBe('');
      expect(next.openPaths).not.toContain('new.js');
    });

    it('ignores an existing path', () => {
      const state = baseState();
      const next = workspaceReducer(state, {
        type: 'fileCreated',
        path: 'services.html',
        content: 'x',
      });
      expect(next).toBe(state);
    });
  });

  describe('fileDeleted', () => {
    it('removes the file and closes its tab', () => {
      const state = {
        ...baseState(),
        openPaths: ['services.html', 'styles.css'],
        activePath: 'services.html',
      };
      const next = workspaceReducer(state, { type: 'fileDeleted', path: 'services.html' });
      expect(next.files['services.html']).toBeUndefined();
      expect(next.openPaths).toEqual(['styles.css']);
      expect(next.activePath).toBe('styles.css');
    });

    it('ignores an unknown path', () => {
      const state = baseState();
      const next = workspaceReducer(state, { type: 'fileDeleted', path: 'nope.js' });
      expect(next).toBe(state);
    });
  });

  describe('folderDeleted', () => {
    it('removes every file under the prefix but not a similarly-named sibling folder', () => {
      const state = {
        ...baseState(),
        files: {
          'src/a.js': 'a',
          'src/b.js': 'b',
          'src2/x.js': 'x',
        },
        savedFiles: {},
        openPaths: [],
        activePath: null,
      };
      const next = workspaceReducer(state, { type: 'folderDeleted', path: 'src' });
      expect(next.files).toEqual({ 'src2/x.js': 'x' });
    });
  });
});
