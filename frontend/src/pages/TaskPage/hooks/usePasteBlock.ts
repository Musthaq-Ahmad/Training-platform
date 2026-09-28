import { useEffect, useRef } from 'react';
import { KeyCode } from 'monaco-editor';
import type { editor } from 'monaco-editor';
import { blockPasteEvents, type PasteSource } from '../../../lib/blockPasteEvents';

type UsePasteBlockOptions = {
  editor: editor.IStandaloneCodeEditor | null;
  container: HTMLElement | null;
  onBlocked: (source: PasteSource) => void;
};

export function usePasteBlock({
  editor: editorInstance,
  container,
  onBlocked,
}: UsePasteBlockOptions): void {
  const onBlockedRef = useRef(onBlocked);

  useEffect(() => {
    onBlockedRef.current = onBlocked;
  });

  useEffect(() => {
    if (!editorInstance || !container) return;

    function report(source: PasteSource) {
      onBlockedRef.current(source);
    }

    const keyDownSubscription = editorInstance.onKeyDown((event) => {
      const isPasteChord = (event.ctrlKey || event.metaKey) && event.keyCode === KeyCode.KeyV;
      const isShiftInsert = event.shiftKey && event.keyCode === KeyCode.Insert;

      if (isPasteChord || isShiftInsert) {
        event.preventDefault();
        event.stopPropagation();
        report('keyboard');
      }
    });

    const removeDomListeners = blockPasteEvents(container, report);

    const pasteSubscription = editorInstance.onDidPaste(() => {
      editorInstance.trigger('paste-block', 'undo', null);
      report('fallback');
    });

    return () => {
      keyDownSubscription.dispose();
      pasteSubscription.dispose();
      removeDomListeners();
    };
  }, [editorInstance, container]);
}
