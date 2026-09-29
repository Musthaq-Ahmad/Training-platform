export type BridgeConfig = {
  runId: string;
  parentOrigin: string;
  storage: Record<string, string>;
  maxMessages: number;
};

type BridgeWindow = Window & typeof globalThis;
type Outgoing = Record<string, unknown> & { type: string };

/**
 * Runs inside the preview, before any trainee script. Sends console output, errors, link
 * clicks, form submits and localStorage writes to the workspace with postMessage.
 *
 * It is turned into text by bridgeSource(), so it must stay self-contained: no imports and no
 * variables from outside this function. `win` is only a parameter so tests can pass a fake window.
 */
export function bridgeMain(config: BridgeConfig, win: BridgeWindow = window): void {
  const doc = win.document;
  const MAX_STRING = 2000;
  const MAX_DEPTH = 3;
  let sentCount = 0;
  let isLimited = false;

  function post(message: Outgoing): void {
    try {
      // Never '*': only the platform page may read what the trainee's page sends.
      win.parent.postMessage({ __itp: true, runId: config.runId, ...message }, config.parentOrigin);
    } catch {
      // The parent is gone (the preview was replaced); nothing to do.
    }
  }

  // Console output and errors are capped so setInterval(console.log) can't flood the workspace.
  function send(message: Outgoing): void {
    if (message.type === 'console' || message.type === 'runtime-error') {
      if (sentCount >= config.maxMessages) {
        if (!isLimited) {
          isLimited = true;
          post({
            type: 'console',
            level: 'warn',
            args: [`Console output limited to ${config.maxMessages} messages`],
            ts: Date.now(),
          });
        }
        return;
      }
      sentCount += 1;
    }
    post(message);
  }

  function note(level: 'info' | 'warn' | 'error', args: string[]): void {
    send({ type: 'console', level, args, ts: Date.now() });
  }

  function cut(text: string): string {
    return text.length > MAX_STRING ? `${text.slice(0, MAX_STRING)}…` : text;
  }

  function tagOf(value: object): string {
    return Object.prototype.toString.call(value);
  }

  function isError(value: object): value is Error {
    const tag = tagOf(value);
    return tag === '[object Error]' || tag === '[object DOMException]';
  }

  function isElement(value: object): value is Element {
    const node = value as Partial<Element>;
    return node.nodeType === 1 && typeof node.tagName === 'string';
  }

  function format(value: unknown, depth: number, seen: WeakSet<object>): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return depth === 0 ? value : JSON.stringify(value);
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (typeof value === 'bigint') return `${String(value)}n`;
    if (typeof value === 'symbol') return value.toString();
    if (typeof value === 'function') return `ƒ ${value.name || 'anonymous'}()`;
    if (typeof value !== 'object') return typeof value; // not reached: every other type is handled

    if (isError(value)) return `${value.name}: ${value.message}`;
    if (isElement(value)) {
      const id = value.id ? `#${value.id}` : '';
      const classes = (value.getAttribute('class') ?? '').trim().split(/\s+/).filter(Boolean);
      const classText = classes.map((name) => `.${name}`).join('');
      return `<${value.tagName.toLowerCase()}${id}${classText}>`;
    }

    const tag = tagOf(value);
    if (tag === '[object Date]') {
      const time = (value as Date).getTime();
      return Number.isNaN(time) ? 'Invalid Date' : (value as Date).toISOString();
    }
    if (tag === '[object RegExp]') return (value as RegExp).toString();

    if (seen.has(value)) return '[Circular]';
    const isArray = Array.isArray(value);
    if (depth >= MAX_DEPTH) return isArray ? '[…]' : '{…}';

    seen.add(value);
    let text: string;
    if (isArray) {
      text = `[${value.map((item) => format(item, depth + 1, seen)).join(', ')}]`;
    } else if (tag === '[object Map]') {
      const pairs = Array.from((value as Map<unknown, unknown>).entries()).map(
        ([k, v]) => `${format(k, depth + 1, seen)} => ${format(v, depth + 1, seen)}`
      );
      text = `Map(${pairs.length}) {${pairs.join(', ')}}`;
    } else if (tag === '[object Set]') {
      const items = Array.from((value as Set<unknown>).values()).map((v) =>
        format(v, depth + 1, seen)
      );
      text = `Set(${items.length}) {${items.join(', ')}}`;
    } else {
      const record = value as Record<string, unknown>;
      const fields = Object.keys(record).map((key) => {
        let field: unknown;
        try {
          field = record[key];
        } catch {
          field = '[Getter threw]';
        }
        return `${key}: ${format(field, depth + 1, seen)}`;
      });
      text = `{${fields.join(', ')}}`;
    }
    // Only loops are [Circular]; the same object twice side by side prints twice.
    seen.delete(value);
    return text;
  }

  function serialize(value: unknown): string {
    return cut(format(value, 0, new WeakSet()));
  }

  /** file, line and column of the first stack frame that isn't the srcdoc document itself */
  function locationFromStack(
    stack: unknown
  ): { source: string; line: number; column: number } | null {
    if (typeof stack !== 'string') return null;
    for (const frame of stack.split('\n').slice(1)) {
      const match = /(?:\(|@|at )([^\s()@]+):(\d+):(\d+)\)?\s*$/.exec(frame);
      if (match && match[1] !== 'about:srcdoc') {
        return { source: match[1], line: Number(match[2]), column: Number(match[3]) };
      }
    }
    return null;
  }

  // --- Console -------------------------------------------------------------
  const con = win.console;
  const levels = ['log', 'info', 'warn', 'error', 'debug'] as const;
  for (const level of levels) {
    const original = con[level].bind(con);
    con[level] = (...args: unknown[]) => {
      original(...args);
      send({ type: 'console', level, args: args.map(serialize), ts: Date.now() });
    };
  }
  const originalTable = con.table.bind(con);
  con.table = (...args: Parameters<Console['table']>) => {
    originalTable(...args);
    send({ type: 'console', level: 'log', args: args.map(serialize), ts: Date.now() });
  };
  const originalClear = con.clear.bind(con);
  con.clear = () => {
    originalClear();
    send({ type: 'console-clear' });
  };

  // --- Errors ----------------------------------------------------------------
  win.addEventListener('error', (event: Event) => {
    const errorEvent = event as ErrorEvent;
    const message: Outgoing = {
      type: 'runtime-error',
      message: errorEvent.message || 'Script error.',
      ts: Date.now(),
    };
    const stack: unknown = (errorEvent.error as { stack?: unknown } | null)?.stack;
    if (typeof stack === 'string') message.stack = stack;

    // Inline scripts without a sourceURL report the srcdoc document itself, which means nothing
    // to the trainee; the stack usually names the real file.
    const filename = errorEvent.filename;
    if (filename && filename !== 'about:srcdoc') {
      message.source = filename;
      if (errorEvent.lineno) message.line = errorEvent.lineno;
      if (errorEvent.colno) message.column = errorEvent.colno;
    } else {
      const location = locationFromStack(stack);
      if (location) Object.assign(message, location);
    }
    send(message);
  });

  win.addEventListener('unhandledrejection', (event: Event) => {
    const reason: unknown = (event as PromiseRejectionEvent).reason;
    const message: Outgoing = {
      type: 'runtime-error',
      message: `Uncaught (in promise) ${serialize(reason)}`,
      ts: Date.now(),
    };
    const stack: unknown = (reason as { stack?: unknown } | null)?.stack;
    if (typeof stack === 'string') {
      message.stack = stack;
      const location = locationFromStack(stack);
      if (location) Object.assign(message, location);
    }
    send(message);
  });

  // Makes a blocked fetch or script visible, not just a vague "Failed to fetch".
  doc.addEventListener('securitypolicyviolation', (event: Event) => {
    const violation = event as SecurityPolicyViolationEvent;
    note('error', [
      `Blocked by the preview's security policy (${violation.effectiveDirective}):`,
      violation.blockedURI || '(inline)',
    ]);
  });

  // --- Ready -----------------------------------------------------------------
  doc.addEventListener('DOMContentLoaded', () => {
    send({ type: 'dom-ready', ms: win.performance.now() });
  });

  // --- Links -----------------------------------------------------------------
  // Capture phase, so trainee code calling stopPropagation can't let a link escape the preview.
  doc.addEventListener(
    'click',
    (event: Event) => {
      const node = event.target as Node | null;
      const target = node && node.nodeType === 3 ? node.parentElement : (node as Element | null);
      const anchor =
        target && typeof target.closest === 'function' ? target.closest('a[href]') : null;
      if (!anchor) return;

      const href = (anchor.getAttribute('href') ?? '').trim();
      if (href.startsWith('#')) return; // same-page anchor: let the browser scroll

      event.preventDefault();
      const isExternal = /^([a-z][a-z\d+.-]*:|\/\/)/i.test(href);
      const path = href.split(/[?#]/)[0];
      if (!isExternal && /\.html$/i.test(path)) {
        send({ type: 'navigate', href });
      } else {
        note('warn', ['External links are blocked in the preview.', href]);
      }
    },
    true
  );

  // --- Forms -----------------------------------------------------------------
  // Bubble phase on window, so it runs after the trainee's own submit handlers.
  win.addEventListener('submit', (event: Event) => {
    if (event.defaultPrevented) return;
    event.preventDefault();

    const fields: Record<string, unknown> = {};
    try {
      new win.FormData(event.target as HTMLFormElement).forEach((value, key) => {
        fields[key] = value;
      });
    } catch {
      // not a real form element
    }
    note('info', ['Form submitted (blocked in the preview)', serialize(fields)]);
  });

  // --- Storage ---------------------------------------------------------------
  // A sandboxed page without allow-same-origin throws on localStorage, so give it an in-memory one.
  function createStorage(
    initial: Record<string, string>,
    onChange: ((change: Outgoing) => void) | null
  ): Storage {
    const data = new Map<string, string>(Object.entries(initial));
    const storage = {
      get length() {
        return data.size;
      },
      key(index: number): string | null {
        return Array.from(data.keys())[index] ?? null;
      },
      getItem(key: string): string | null {
        return data.get(String(key)) ?? null;
      },
      setItem(key: string, value: string): void {
        const k = String(key);
        const v = String(value);
        data.set(k, v);
        onChange?.({ type: 'storage', op: 'set', key: k, value: v });
      },
      removeItem(key: string): void {
        const k = String(key);
        data.delete(k);
        onChange?.({ type: 'storage', op: 'remove', key: k });
      },
      clear(): void {
        data.clear();
        onChange?.({ type: 'storage', op: 'clear' });
      },
    };
    return storage;
  }

  try {
    Object.defineProperty(win, 'localStorage', {
      value: createStorage(config.storage, send),
      configurable: true,
    });
  } catch {
    // leave the browser's own
  }
  try {
    Object.defineProperty(win, 'sessionStorage', {
      value: createStorage({}, null),
      configurable: true,
    });
  } catch {
    // leave the browser's own
  }
}

/** The bridge as script text for the preview's <head>. */
export function bridgeSource(config: BridgeConfig): string {
  // < stops a stored value containing "</script>" from ending the script tag
  const json = JSON.stringify(config).replace(/</g, '\\u003c');
  return `(${bridgeMain.toString()})(${json});`;
}
