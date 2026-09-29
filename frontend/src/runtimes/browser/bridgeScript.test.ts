import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { bridgeMain, bridgeSource, type BridgeConfig } from './bridgeScript';

// jsdom doesn't run scripts inside iframes, so run bridgeMain directly on an iframe's window,
// with a fake `parent` whose postMessage is a spy.

type FrameWindow = Window & typeof globalThis;

const PARENT_ORIGIN = 'http://localhost:5173';

let frame: HTMLIFrameElement;
let win: FrameWindow;
let postMessage: ReturnType<typeof vi.fn>;

function startBridge(overrides: Partial<BridgeConfig> = {}) {
  bridgeMain(
    { runId: 'run-1', parentOrigin: PARENT_ORIGIN, storage: {}, maxMessages: 500, ...overrides },
    win
  );
}

function posted(): Record<string, unknown>[] {
  return postMessage.mock.calls.map((call: unknown[]) => call[0] as Record<string, unknown>);
}

beforeEach(() => {
  frame = document.createElement('iframe');
  document.body.append(frame);
  win = frame.contentWindow as FrameWindow;
  postMessage = vi.fn();
  Object.defineProperty(win, 'parent', { value: { postMessage }, configurable: true });
  // Keep the frame's own console quiet; the bridge still calls these "originals".
  for (const level of ['log', 'info', 'warn', 'error', 'debug', 'table', 'clear'] as const) {
    win.console[level] = vi.fn();
  }
});

afterEach(() => {
  vi.restoreAllMocks();
  frame.remove();
});

describe('bridgeMain', () => {
  it('posts console.log args, serialised, with the run id and the parent origin', () => {
    startBridge();
    win.console.log('a', { b: 1 });

    expect(postMessage).toHaveBeenCalledWith(
      {
        __itp: true,
        runId: 'run-1',
        type: 'console',
        level: 'log',
        args: ['a', '{b: 1}'],
        ts: expect.any(Number) as number,
      },
      PARENT_ORIGIN
    );
  });

  it('still calls the original console method', () => {
    const original = win.console.warn;
    startBridge();
    win.console.warn('careful');
    expect(original).toHaveBeenCalledWith('careful');
  });

  it('serialises a circular object with [Circular]', () => {
    startBridge();
    const loop: Record<string, unknown> = { name: 'loop' };
    loop.self = loop;
    win.console.log(loop);

    expect(posted()[0].args).toEqual(['{name: "loop", self: [Circular]}']);
  });

  it('serialises the other kinds of value', () => {
    startBridge();
    const div = win.document.createElement('div');
    div.id = 'app';
    div.className = 'card big';
    win.console.log(
      42,
      null,
      undefined,
      10n,
      function greet() {},
      new TypeError('bad'),
      div,
      [1, [2, [3, [4]]]],
      'x'.repeat(2500)
    );

    const args = posted()[0].args as string[];
    expect(args.slice(0, 8)).toEqual([
      '42',
      'null',
      'undefined',
      '10n',
      'ƒ greet()',
      'TypeError: bad',
      '<div#app.card.big>',
      '[1, [2, [3, […]]]]',
    ]);
    expect(args[8]).toHaveLength(2001);
  });

  it('maps console.table to log and console.clear to console-clear', () => {
    startBridge();
    win.console.table([1]);
    win.console.clear();

    expect(posted()[0]).toMatchObject({ type: 'console', level: 'log', args: ['[1]'] });
    expect(posted()[1]).toMatchObject({ type: 'console-clear' });
  });

  it('drops the 501st message after one warning', () => {
    startBridge();
    for (let i = 0; i < 510; i += 1) win.console.log(i);

    expect(postMessage).toHaveBeenCalledTimes(501);
    expect(posted()[499].args).toEqual(['499']);
    expect(posted()[500]).toMatchObject({
      type: 'console',
      level: 'warn',
      args: ['Console output limited to 500 messages'],
    });
  });

  it('posts runtime-error for an error event', () => {
    startBridge();
    win.dispatchEvent(
      new win.ErrorEvent('error', {
        message: 'Uncaught ReferenceError: x is not defined',
        filename: 'script.js',
        lineno: 12,
        colno: 5,
      })
    );

    expect(posted()[0]).toMatchObject({
      type: 'runtime-error',
      message: 'Uncaught ReferenceError: x is not defined',
      source: 'script.js',
      line: 12,
      column: 5,
    });
  });

  it('takes the location from the stack when the error comes from the srcdoc itself', () => {
    startBridge();
    const error = new Error('boom');
    error.stack = 'Error: boom\n    at about:srcdoc:40:3\n    at init (js/main.js:4:10)';
    win.dispatchEvent(
      new win.ErrorEvent('error', {
        message: 'Uncaught Error: boom',
        filename: 'about:srcdoc',
        lineno: 40,
        error,
      })
    );

    expect(posted()[0]).toMatchObject({ source: 'js/main.js', line: 4, column: 10 });
  });

  it('posts runtime-error for an unhandled promise rejection', () => {
    startBridge();
    const event = new win.Event('unhandledrejection');
    Object.defineProperty(event, 'reason', { value: new TypeError('Failed to fetch') });
    win.dispatchEvent(event);

    expect(posted()[0]).toMatchObject({
      type: 'runtime-error',
      message: 'Uncaught (in promise) TypeError: Failed to fetch',
    });
  });

  it('posts dom-ready on DOMContentLoaded', () => {
    startBridge();
    win.document.dispatchEvent(new win.Event('DOMContentLoaded'));
    expect(posted()[0]).toMatchObject({ type: 'dom-ready', ms: expect.any(Number) as number });
  });

  it('prevents a local link click and posts navigate', () => {
    startBridge();
    const link = win.document.createElement('a');
    link.href = 'about.html';
    link.textContent = 'About';
    win.document.body.append(link);

    const click = new win.MouseEvent('click', { bubbles: true, cancelable: true });
    link.firstChild?.dispatchEvent(click); // a click on the link's text

    expect(click.defaultPrevented).toBe(true);
    expect(posted()[0]).toMatchObject({ type: 'navigate', href: 'about.html' });
  });

  it('blocks an external link with a console warning', () => {
    startBridge();
    const link = win.document.createElement('a');
    link.setAttribute('href', 'https://example.com');
    win.document.body.append(link);

    const click = new win.MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(posted()[0]).toMatchObject({
      type: 'console',
      level: 'warn',
      args: ['External links are blocked in the preview.', 'https://example.com'],
    });
  });

  it('lets a same-page #hash link through', () => {
    startBridge();
    const link = win.document.createElement('a');
    link.setAttribute('href', '#pricing');
    win.document.body.append(link);

    const click = new win.MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(false);
    expect(postMessage).not.toHaveBeenCalled();
  });

  it('prevents an unhandled form submit and posts the field values', () => {
    startBridge();
    win.document.body.innerHTML =
      '<form><input name="email" value="asha@example.com"><input name="age" value="24"></form>';
    const form = win.document.querySelector('form') as HTMLFormElement;

    const submit = new win.Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(submit);

    expect(submit.defaultPrevented).toBe(true);
    expect(posted()[0]).toMatchObject({
      type: 'console',
      level: 'info',
      args: ['Form submitted (blocked in the preview)', '{email: "asha@example.com", age: "24"}'],
    });
  });

  it('leaves a submit the trainee already handled alone', () => {
    startBridge();
    win.document.body.innerHTML = '<form><input name="q" value="x"></form>';
    const form = win.document.querySelector('form') as HTMLFormElement;
    form.addEventListener('submit', (event) => event.preventDefault());

    form.dispatchEvent(new win.Event('submit', { bubbles: true, cancelable: true }));

    expect(postMessage).not.toHaveBeenCalled();
  });

  it('keeps localStorage in memory and posts every change', () => {
    startBridge();
    win.localStorage.setItem('theme', 'dark');

    expect(win.localStorage.getItem('theme')).toBe('dark');
    expect(win.localStorage.length).toBe(1);
    expect(win.localStorage.key(0)).toBe('theme');
    expect(posted()[0]).toMatchObject({ type: 'storage', op: 'set', key: 'theme', value: 'dark' });

    win.localStorage.removeItem('theme');
    win.localStorage.clear();
    expect(posted()[1]).toMatchObject({ type: 'storage', op: 'remove', key: 'theme' });
    expect(posted()[2]).toMatchObject({ type: 'storage', op: 'clear' });
    expect(win.localStorage.getItem('theme')).toBeNull();
  });

  it('starts localStorage from config.storage and sessionStorage empty', () => {
    startBridge({ storage: { theme: 'dark' } });

    expect(win.localStorage.getItem('theme')).toBe('dark');
    expect(win.sessionStorage.length).toBe(0);
    win.sessionStorage.setItem('tab', '2');
    expect(win.sessionStorage.getItem('tab')).toBe('2');
    expect(postMessage).not.toHaveBeenCalled();
  });
});

describe('bridgeSource', () => {
  const config: BridgeConfig = {
    runId: 'run-1',
    parentOrigin: PARENT_ORIGIN,
    storage: { note: '</script><script>alert(1)</script>' },
    maxMessages: 500,
  };

  it('escapes < so a stored value cannot end the script tag', () => {
    const source = bridgeSource(config);
    expect(source).not.toContain('</script');
    expect(source).toContain('\\u003c/script>');
  });

  it('is self-contained: runs with nothing but a window', () => {
    const source = bridgeSource(config);
    // `window` here is the frame's window; any other outside name would throw.
    // eslint-disable-next-line @typescript-eslint/no-implied-eval -- running the generated text is the point
    const runInFrame = new Function('window', source) as (window: Window) => void;
    runInFrame(win);

    expect(win.localStorage.getItem('note')).toBe('</script><script>alert(1)</script>');
    win.console.log('hi');
    expect(posted()[0]).toMatchObject({ runId: 'run-1', args: ['hi'] });
  });
});
