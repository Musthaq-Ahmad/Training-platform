import { describe, it, expect } from 'vitest';
import { isPreviewMessage } from './previewMessages';

const base = { __itp: true, runId: 'run-1' };

describe('isPreviewMessage', () => {
  it.each([
    { ...base, type: 'console', level: 'log', args: ['a', '{b: 1}'], ts: 1 },
    { ...base, type: 'console', level: 'error', args: [], ts: 1 },
    { ...base, type: 'runtime-error', message: 'boom', ts: 1 },
    {
      ...base,
      type: 'runtime-error',
      message: 'boom',
      source: 'script.js',
      line: 12,
      column: 3,
      stack: 'Error: boom',
      ts: 1,
    },
    { ...base, type: 'console-clear' },
    { ...base, type: 'dom-ready', ms: 12.5 },
    { ...base, type: 'navigate', href: 'about.html' },
    { ...base, type: 'storage', op: 'set', key: 'theme', value: 'dark' },
    { ...base, type: 'storage', op: 'remove', key: 'theme' },
    { ...base, type: 'storage', op: 'clear' },
  ])('accepts a valid $type message', (message) => {
    expect(isPreviewMessage(message)).toBe(true);
  });

  it.each([
    [
      'a console level that does not exist',
      { ...base, type: 'console', level: 'trace', args: [], ts: 1 },
    ],
    [
      'console args that are not strings',
      { ...base, type: 'console', level: 'log', args: [1], ts: 1 },
    ],
    [
      'a runtime-error line that is a string',
      { ...base, type: 'runtime-error', message: 'x', line: '12', ts: 1 },
    ],
    ['a dom-ready ms that is not a number', { ...base, type: 'dom-ready', ms: 'soon' }],
    ['a navigate href that is not a string', { ...base, type: 'navigate', href: 42 }],
    ['a storage op that does not exist', { ...base, type: 'storage', op: 'drop' }],
    [
      'a storage value that is not a string',
      { ...base, type: 'storage', op: 'set', key: 'k', value: 1 },
    ],
    ['an unknown type', { ...base, type: 'eval', code: 'alert(1)' }],
    ['a missing __itp', { runId: 'run-1', type: 'console-clear' }],
    ['__itp that is not true', { __itp: 'true', runId: 'run-1', type: 'console-clear' }],
    ['a missing runId', { __itp: true, type: 'console-clear' }],
  ])('rejects %s', (_label, message) => {
    expect(isPreviewMessage(message)).toBe(false);
  });

  it.each([null, undefined, 'console', 42, ['console']])('rejects the non-object %j', (value) => {
    expect(isPreviewMessage(value)).toBe(false);
  });
});
