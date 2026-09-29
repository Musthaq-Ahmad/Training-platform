type Base = { __itp: true; runId: string };

export type PreviewConsoleLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

export type PreviewMessage = Base &
  (
    | { type: 'console'; level: PreviewConsoleLevel; args: string[]; ts: number }
    | {
        type: 'runtime-error';
        message: string;
        source?: string;
        line?: number;
        column?: number;
        stack?: string;
        ts: number;
      }
    | { type: 'console-clear' }
    | { type: 'dom-ready'; ms: number }
    | { type: 'navigate'; href: string }
    | { type: 'storage'; op: 'set' | 'remove' | 'clear'; key?: string; value?: string }
  );

const CONSOLE_LEVELS: readonly string[] = ['log', 'info', 'warn', 'error', 'debug'];
const STORAGE_OPS: readonly string[] = ['set', 'remove', 'clear'];

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isOptional(value: unknown, check: (v: unknown) => boolean): boolean {
  return value === undefined || check(value);
}

/** Checks every field's type. Messages from the preview are untrusted input. */
export function isPreviewMessage(data: unknown): data is PreviewMessage {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return false;
  const m = data as Record<string, unknown>;
  if (m.__itp !== true || !isString(m.runId)) return false;

  switch (m.type) {
    case 'console':
      return (
        isString(m.level) &&
        CONSOLE_LEVELS.includes(m.level) &&
        Array.isArray(m.args) &&
        m.args.every(isString) &&
        isNumber(m.ts)
      );
    case 'runtime-error':
      return (
        isString(m.message) &&
        isOptional(m.source, isString) &&
        isOptional(m.line, isNumber) &&
        isOptional(m.column, isNumber) &&
        isOptional(m.stack, isString) &&
        isNumber(m.ts)
      );
    case 'console-clear':
      return true;
    case 'dom-ready':
      return isNumber(m.ms);
    case 'navigate':
      return isString(m.href);
    case 'storage':
      return (
        isString(m.op) &&
        STORAGE_OPS.includes(m.op) &&
        isOptional(m.key, isString) &&
        isOptional(m.value, isString)
      );
    default:
      return false;
  }
}
