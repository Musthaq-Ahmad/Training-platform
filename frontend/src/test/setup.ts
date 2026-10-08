import '@testing-library/jest-dom/vitest';
import { createElement, useEffect, type ChangeEvent } from 'react';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// jsdom can't run Monaco. Stub @monaco-editor/react with a plain <textarea>
// standing in for the editor, plus fake editor/monaco instances tests can
// inspect (imported from '@monaco-editor/react' like the real exports).
export const fakeEditor = {
  addCommand: vi.fn(),
  focus: vi.fn(),
  getSelection: vi.fn(),
  getModel: vi.fn(),
  trigger: vi.fn(),
  onKeyDown: vi.fn(() => ({ dispose: vi.fn() })),
  onDidPaste: vi.fn(() => ({ dispose: vi.fn() })),
  onDidChangeCursorPosition: vi.fn(() => ({ dispose: vi.fn() })),
};

export const fakeMonaco = {
  KeyMod: { CtrlCmd: 2048, Shift: 1024, Alt: 512, WinCtrl: 256 },
  KeyCode: { Enter: 3, KeyS: 49 },
  editor: { setModelMarkers: vi.fn() },
};

vi.mock('@monaco-editor/react', () => ({
  __esModule: true,
  fakeEditor,
  fakeMonaco,
  useMonaco: () => null,
  default: function Editor({
    path,
    options,
    onMount,
    onChange,
  }: {
    path?: string;
    options?: { ariaLabel?: string };
    onMount?: (editor: typeof fakeEditor, monaco: typeof fakeMonaco) => void;
    onChange?: (value: string) => void;
  }) {
    useEffect(() => {
      onMount?.(fakeEditor, fakeMonaco);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return createElement('textarea', {
      'aria-label': options?.ariaLabel,
      'data-path': path,
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => onChange?.(event.target.value),
    });
  },
}));

vi.mock('/src/lib/monacoSetup', () => ({
  applyRuntimeSettings: vi.fn(),
  applyViewerSettings: vi.fn(),
}));

window.matchMedia = (): MediaQueryList =>
  ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }) as unknown as MediaQueryList;

class NoopResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = NoopResizeObserver;

// jsdom doesn't implement scrollIntoView (used to keep the active editor tab visible).
Element.prototype.scrollIntoView = () => {};

// jsdom doesn't implement <dialog>'s showModal/close, only the `open` attribute.
HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
  this.open = true;
};
HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
  this.open = false;
  this.dispatchEvent(new Event('close'));
};
