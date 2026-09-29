import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ToastProvider } from '../../../components/Toast';
import { logFlagEvent } from '../../../api/activity';
import TerminalView from './TerminalView';
import { isPasteShortcut } from './isPasteShortcut';

// xterm draws with canvas/DOM measurements that jsdom doesn't have: use a fake Terminal.
// vi.mock is hoisted above the imports, so the fake is created with vi.hoisted.
const { FakeTerminal, terminals } = vi.hoisted(() => {
  const created: Array<InstanceType<typeof Fake>> = [];
  class Fake {
    cols = 80;
    rows = 24;
    keyHandler: ((event: KeyboardEvent) => boolean) | null = null;
    open = vi.fn();
    write = vi.fn();
    focus = vi.fn();
    loadAddon = vi.fn();
    dispose = vi.fn();
    onData = vi.fn(() => ({ dispose: vi.fn() }));
    attachCustomKeyEventHandler = vi.fn((handler: (event: KeyboardEvent) => boolean) => {
      this.keyHandler = handler;
    });
    constructor() {
      created.push(this);
    }
  }
  return { FakeTerminal: Fake, terminals: created };
});
vi.mock('@xterm/xterm', () => ({ Terminal: FakeTerminal }));
vi.mock('@xterm/addon-fit', () => ({
  FitAddon: class {
    fit = vi.fn();
  },
}));
vi.mock('../../../api/activity', () => ({ logFlagEvent: vi.fn(() => Promise.resolve()) }));

function renderTerminal() {
  const onReady = vi.fn();
  const onResize = vi.fn();
  const view = render(
    <ToastProvider>
      <TerminalView taskId="t-node" isVisible onReady={onReady} onResize={onResize} />
    </ToastProvider>
  );
  return { ...view, onReady, onResize };
}

function key(init: KeyboardEventInit) {
  return new KeyboardEvent('keydown', init);
}

beforeEach(() => {
  terminals.length = 0;
  vi.mocked(logFlagEvent).mockClear();
});

describe('TerminalView', () => {
  it('opens one terminal and calls onReady once with it', () => {
    const { onReady } = renderTerminal();

    expect(terminals).toHaveLength(1);
    expect(terminals[0].open).toHaveBeenCalledWith(screen.getByTestId('terminal'));
    expect(onReady).toHaveBeenCalledTimes(1);
    expect(onReady).toHaveBeenCalledWith(terminals[0]);
  });

  it('blocks Ctrl+V and Shift+Insert in the key handler and reports once (throttled)', () => {
    renderTerminal();
    const handler = terminals[0].keyHandler;
    if (!handler) throw new Error('no key handler attached');

    // act(): the handler shows a toast, which is a React state update
    let results: boolean[] = [];
    act(() => {
      results = [
        handler(key({ key: 'v', ctrlKey: true })),
        handler(key({ key: 'Insert', shiftKey: true })),
        handler(key({ key: 'a' })),
        handler(new KeyboardEvent('keyup', { key: 'v', ctrlKey: true })),
      ];
    });
    expect(results).toEqual([false, false, true, true]);

    expect(logFlagEvent).toHaveBeenCalledTimes(1);
    expect(logFlagEvent).toHaveBeenCalledWith('t-node', {
      type: 'PASTE_BLOCKED',
      context: { source: 'terminal' },
    });
    expect(screen.getByText('Pasting is turned off in the workspace.')).toBeInTheDocument();
  });

  it('prevents a paste event on the container', () => {
    renderTerminal();
    const container = screen.getByTestId('terminal');

    const allowed = fireEvent.paste(container);

    expect(allowed).toBe(false); // preventDefault was called
    expect(logFlagEvent).toHaveBeenCalledTimes(1);
  });

  it('disposes the terminal on unmount', () => {
    const { unmount } = renderTerminal();
    unmount();
    expect(terminals[0].dispose).toHaveBeenCalledTimes(1);
  });
});

describe('isPasteShortcut', () => {
  it.each([
    [{ key: 'v', ctrlKey: true }, true],
    [{ key: 'v', metaKey: true }, true],
    [{ key: 'V', ctrlKey: true, shiftKey: true }, true],
    [{ key: 'Insert', shiftKey: true }, true],
    [{ key: 'v' }, false],
    [{ key: 'c', ctrlKey: true }, false],
    [{ key: 'Insert' }, false],
  ])('%j → %s', (init, expected) => {
    expect(isPasteShortcut(key(init))).toBe(expected);
  });
});
