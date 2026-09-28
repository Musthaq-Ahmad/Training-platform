import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { blockPasteEvents, type PasteSource } from './blockPasteEvents';

describe('blockPasteEvents', () => {
  let container: HTMLDivElement;
  let child: HTMLDivElement;
  let onBlocked: (source: PasteSource) => void;
  let cleanup: () => void;

  beforeEach(() => {
    container = document.createElement('div');
    child = document.createElement('div');
    container.appendChild(child);
    document.body.appendChild(container);
    onBlocked = vi.fn<(source: PasteSource) => void>();
    cleanup = blockPasteEvents(container, onBlocked);
  });

  afterEach(() => {
    cleanup();
    container.remove();
  });

  it('prevents a paste event on a child and reports clipboard-event', () => {
    const event = new Event('paste', { bubbles: true, cancelable: true });
    child.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(onBlocked).toHaveBeenCalledWith('clipboard-event');
  });

  it('prevents a drop event and reports drop', () => {
    const event = new Event('drop', { bubbles: true, cancelable: true });
    child.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(onBlocked).toHaveBeenCalledWith('drop');
  });

  it('prevents dragover without reporting it', () => {
    const event = new Event('dragover', { bubbles: true, cancelable: true });
    child.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(onBlocked).not.toHaveBeenCalled();
  });

  it('prevents contextmenu without reporting it', () => {
    const event = new Event('contextmenu', { bubbles: true, cancelable: true });
    child.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(onBlocked).not.toHaveBeenCalled();
  });

  it('prevents a beforeinput with insertFromPaste and reports input-event', () => {
    const event = new InputEvent('beforeinput', {
      bubbles: true,
      cancelable: true,
      inputType: 'insertFromPaste',
    });
    child.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(onBlocked).toHaveBeenCalledWith('input-event');
  });

  it('leaves a beforeinput with insertText untouched', () => {
    const event = new InputEvent('beforeinput', {
      bubbles: true,
      cancelable: true,
      inputType: 'insertText',
    });
    child.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(onBlocked).not.toHaveBeenCalled();
  });

  it('stops blocking after cleanup', () => {
    cleanup();

    const event = new Event('paste', { bubbles: true, cancelable: true });
    child.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(onBlocked).not.toHaveBeenCalled();
  });
});
