import { describe, it, expect } from 'vitest';
import {
  selectDirtyPaths,
  selectIsDirty,
  selectFilesForSave,
  selectSaveSnapshot,
  selectActiveFile,
  selectHtmlEntry,
  selectFileCount,
  selectVisiblePaths,
  selectOversizedPath,
} from './selectors';
import { workspaceReducer } from './workspaceReducer';
import { initWorkspace } from './initWorkspace';
import { taskCodeFixture } from '../../../test/fixtures/task';

function baseState() {
  return initWorkspace(taskCodeFixture);
}

describe('selectors', () => {
  it('selectDirtyPaths finds edited files and revert-to-original is clean', () => {
    const state = baseState();
    expect(selectDirtyPaths(state)).toEqual([]);

    const edited = { ...state, files: { ...state.files, 'services.html': 'changed' } };
    expect(selectDirtyPaths(edited)).toEqual(['services.html']);

    const reverted = {
      ...edited,
      files: { ...edited.files, 'services.html': state.files['services.html'] },
    };
    expect(selectDirtyPaths(reverted)).toEqual([]);
  });

  it('selectDirtyPaths treats a new file missing from savedFiles as dirty', () => {
    const state = baseState();
    const withNewFile = { ...state, files: { ...state.files, 'new.js': 'content' } };
    expect(selectDirtyPaths(withNewFile)).toContain('new.js');
  });

  it('selectIsDirty reflects whether the dirty list is empty', () => {
    const state = baseState();
    expect(selectIsDirty(state)).toBe(false);
    const edited = { ...state, files: { ...state.files, 'services.html': 'changed' } };
    expect(selectIsDirty(edited)).toBe(true);
  });

  it('selectFilesForSave includes every file, sorted by path', () => {
    const state = baseState();
    const files = selectFilesForSave(state);
    const paths = files.map((f) => f.path);
    expect(paths).toEqual([...paths].sort());
    expect(paths).toContain('test.spec.js');
  });

  it('selectFilesForSave skips ignored paths', () => {
    const state = {
      ...baseState(),
      files: {
        ...baseState().files,
        'node_modules/a.js': 'x',
        'package-lock.json': '{}',
      },
    };
    const paths = selectFilesForSave(state).map((f) => f.path);
    expect(paths).not.toContain('node_modules/a.js');
    expect(paths).not.toContain('package-lock.json');
  });

  it('selectOversizedPath finds a file over the character limit', () => {
    const state = {
      ...baseState(),
      files: { ...baseState().files, 'huge.js': 'a'.repeat(200_001) },
    };
    expect(selectOversizedPath(state)).toBe('huge.js');
  });

  it('selectOversizedPath returns null when nothing is too large', () => {
    expect(selectOversizedPath(baseState())).toBeNull();
  });

  it('selectSaveSnapshot mirrors selectFilesForSave as a record', () => {
    const state = baseState();
    const snapshot = selectSaveSnapshot(state);
    const files = selectFilesForSave(state);
    expect(Object.keys(snapshot)).toHaveLength(files.length);
    expect(snapshot['services.html']).toBe(state.files['services.html']);
  });

  it('selectActiveFile returns the active path and content', () => {
    const state = baseState();
    expect(selectActiveFile(state)).toEqual({
      path: state.activePath,
      content: state.files[state.activePath as string],
    });
  });

  it('selectActiveFile returns null when nothing is active', () => {
    const state = { ...baseState(), activePath: null };
    expect(selectActiveFile(state)).toBeNull();
  });

  it('selectHtmlEntry resolves the fixture root html file', () => {
    const state = baseState();
    expect(selectHtmlEntry(state)).toBe('services.html');
  });

  it('selectHtmlEntry prefers index.html when present', () => {
    const state = { ...baseState(), files: { 'index.html': '', 'services.html': '' } };
    expect(selectHtmlEntry(state)).toBe('index.html');
  });

  it('selectHtmlEntry returns null with no html files', () => {
    const state = { ...baseState(), files: { 'script.js': '' } };
    expect(selectHtmlEntry(state)).toBeNull();
  });

  it('selectFileCount counts every visible file, including nested ones', () => {
    const state = baseState();
    // fixture: services.html, styles.css, script.js, package.json, test.spec.js at root (5),
    // plus assets/logo.svg and assets/banner-grid.svg nested (2) — none ignored
    expect(selectFileCount(state)).toBe(7);
  });

  it('selectDirtyPaths treats a deleted file as dirty', () => {
    const state = baseState();
    const afterDelete = workspaceReducer(state, { type: 'fileDeleted', path: 'services.html' });
    expect(selectDirtyPaths(afterDelete)).toContain('services.html');
  });

  it('nothing is dirty after saveSucceeded with a snapshot that omits the deleted file', () => {
    const state = baseState();
    const afterDelete = workspaceReducer(state, { type: 'fileDeleted', path: 'services.html' });
    const afterSave = workspaceReducer(afterDelete, {
      type: 'saveSucceeded',
      snapshot: selectSaveSnapshot(afterDelete),
    });
    expect(selectDirtyPaths(afterSave)).toEqual([]);
  });

  it('selectVisiblePaths drops ignored paths like node_modules', () => {
    const state = {
      ...baseState(),
      files: { ...baseState().files, 'node_modules/a.js': 'x' },
    };
    expect(selectVisiblePaths(state)).not.toContain('node_modules/a.js');
  });
});
