import { describe, it, expect } from 'vitest';
import {
  selectDirtyPaths,
  selectIsDirty,
  selectFilesForSave,
  selectSaveSnapshot,
  selectActiveFile,
  selectHtmlEntry,
  selectFileCount,
} from './selectors';
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

  it('selectFileCount only counts files at the workspace root', () => {
    const state = baseState();
    // fixture: services.html, styles.css, script.js, package.json, test.spec.js at root (5),
    // plus assets/logo.svg and assets/banner-grid.svg nested
    expect(selectFileCount(state)).toBe(5);
  });
});
