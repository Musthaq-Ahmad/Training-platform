export type PasteSource = 'keyboard' | 'clipboard-event' | 'drop' | 'input-event' | 'fallback';

const BLOCKED_INPUT_TYPES = ['insertFromPaste', 'insertFromDrop', 'insertFromPasteAsQuotation'];

/** Blocks paste-like events on `element` and everything inside it. Returns a cleanup function. */
export function blockPasteEvents(
  element: HTMLElement,
  onBlocked: (source: PasteSource) => void
): () => void {
  function handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    onBlocked('clipboard-event');
  }

  function handleBeforeInput(event: InputEvent) {
    if (BLOCKED_INPUT_TYPES.includes(event.inputType)) {
      event.preventDefault();
      onBlocked('input-event');
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'none';
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    onBlocked('drop');
  }

  function handleContextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  element.addEventListener('paste', handlePaste, { capture: true });
  element.addEventListener('beforeinput', handleBeforeInput as EventListener, { capture: true });
  element.addEventListener('dragover', handleDragOver, { capture: true });
  element.addEventListener('drop', handleDrop, { capture: true });
  element.addEventListener('contextmenu', handleContextMenu, { capture: true });

  return () => {
    element.removeEventListener('paste', handlePaste, { capture: true });
    element.removeEventListener('beforeinput', handleBeforeInput as EventListener, {
      capture: true,
    });
    element.removeEventListener('dragover', handleDragOver, { capture: true });
    element.removeEventListener('drop', handleDrop, { capture: true });
    element.removeEventListener('contextmenu', handleContextMenu, { capture: true });
  };
}
