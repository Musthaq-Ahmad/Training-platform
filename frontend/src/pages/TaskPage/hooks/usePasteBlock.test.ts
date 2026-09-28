import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePasteBlock } from './usePasteBlock';
import type { PasteSource } from '../../../lib/blockPasteEvents';

// Matches monaco-editor's real KeyCode enum values (KeyV = 52, Insert = 19),
// kept as local constants so this test doesn't need to import the real
// (heavy) monaco-editor package just for two numbers.
const KEY_CODE_V = 52;
const KEY_CODE_C = 33;
const KEY_CODE_INSERT = 19;

function createFakeEditor() {
  const disposeKeyDown = vi.fn();
  const disposePaste = vi.fn();
  let keyDownCallback: ((event: unknown) => void) | undefined;
  let pasteCallback: (() => void) | undefined;

  const editor = {
    onKeyDown: vi.fn((callback: (event: unknown) => void) => {
      keyDownCallback = callback;
      return { dispose: disposeKeyDown };
    }),
    onDidPaste: vi.fn((callback: () => void) => {
      pasteCallback = callback;
      return { dispose: disposePaste };
    }),
    trigger: vi.fn(),
  };

  return {
    editor,
    disposeKeyDown,
    disposePaste,
    fireKeyDown: (event: unknown) => keyDownCallback?.(event),
    firePaste: () => pasteCallback?.(),
  };
}

function makeKeyEvent(
  overrides: Partial<{ ctrlKey: boolean; metaKey: boolean; shiftKey: boolean; keyCode: number }>
) {
  return {
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    keyCode: 0,
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
    ...overrides,
  };
}

describe('usePasteBlock', () => {
  let container: HTMLDivElement;
  let onBlocked: (source: PasteSource) => void;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    onBlocked = vi.fn<(source: PasteSource) => void>();
  });

  it('blocks Ctrl+V and reports keyboard', () => {
    const { editor, fireKeyDown } = createFakeEditor();
    renderHook(() => usePasteBlock({ editor: editor as never, container, onBlocked }));

    const event = makeKeyEvent({ ctrlKey: true, keyCode: KEY_CODE_V });
    fireKeyDown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(onBlocked).toHaveBeenCalledWith('keyboard');
  });

  it('blocks Cmd+V and reports keyboard', () => {
    const { editor, fireKeyDown } = createFakeEditor();
    renderHook(() => usePasteBlock({ editor: editor as never, container, onBlocked }));

    const event = makeKeyEvent({ metaKey: true, keyCode: KEY_CODE_V });
    fireKeyDown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(onBlocked).toHaveBeenCalledWith('keyboard');
  });

  it('blocks Shift+Insert and reports keyboard', () => {
    const { editor, fireKeyDown } = createFakeEditor();
    renderHook(() => usePasteBlock({ editor: editor as never, container, onBlocked }));

    const event = makeKeyEvent({ shiftKey: true, keyCode: KEY_CODE_INSERT });
    fireKeyDown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(onBlocked).toHaveBeenCalledWith('keyboard');
  });

  it('does not block Ctrl+C', () => {
    const { editor, fireKeyDown } = createFakeEditor();
    renderHook(() => usePasteBlock({ editor: editor as never, container, onBlocked }));

    const event = makeKeyEvent({ ctrlKey: true, keyCode: KEY_CODE_C });
    fireKeyDown(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(onBlocked).not.toHaveBeenCalled();
  });

  it('undoes and reports fallback on onDidPaste', () => {
    const { editor, firePaste } = createFakeEditor();
    renderHook(() => usePasteBlock({ editor: editor as never, container, onBlocked }));

    firePaste();

    expect(editor.trigger).toHaveBeenCalledWith('paste-block', 'undo', null);
    expect(onBlocked).toHaveBeenCalledWith('fallback');
  });

  it('registers nothing while editor is null', () => {
    const { editor } = createFakeEditor();
    renderHook(() => usePasteBlock({ editor: null, container, onBlocked }));

    expect(editor.onKeyDown).not.toHaveBeenCalled();
    expect(editor.onDidPaste).not.toHaveBeenCalled();
  });

  it('disposes both subscriptions on unmount', () => {
    const { editor, disposeKeyDown, disposePaste } = createFakeEditor();
    const { unmount } = renderHook(() =>
      usePasteBlock({ editor: editor as never, container, onBlocked })
    );

    unmount();

    expect(disposeKeyDown).toHaveBeenCalled();
    expect(disposePaste).toHaveBeenCalled();
  });
});
