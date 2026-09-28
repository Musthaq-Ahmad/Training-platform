import type { TaskRuntime } from '@itp/types';

/** No imports from monaco-editor here, so tests can load this file cheaply. */

export function toModelUri(path: string): string {
  return `file:///workspace/${path}`;
}

export type WorkerKind = 'editor' | 'json' | 'css' | 'html' | 'ts';

export function workerKindFor(label: string): WorkerKind {
  switch (label) {
    case 'json':
      return 'json';
    case 'css':
    case 'scss':
    case 'less':
      return 'css';
    case 'html':
    case 'handlebars':
    case 'razor':
      return 'html';
    case 'typescript':
    case 'javascript':
      return 'ts';
    default:
      return 'editor';
  }
}

export type MonacoTokens = Record<string, string>;

/** Mirrors monaco.editor.IStandaloneThemeData's shape without importing monaco-editor. */
export type MonacoThemeData = {
  base: 'vs' | 'vs-dark';
  inherit: boolean;
  rules: { token: string; foreground?: string; fontStyle?: string }[];
  colors: Record<string, string>;
};

const THEME_COLOR_KEYS = [
  'editor.background',
  'editor.foreground',
  'editorLineNumber.foreground',
  'editorLineNumber.activeForeground',
  'editor.lineHighlightBackground',
  'editorCursor.foreground',
  'editor.selectionBackground',
  'editorWidget.background',
  'editorSuggestWidget.background',
];

const THEME_TOKEN_RULES: { token: string; fontStyle?: string }[] = [
  { token: 'tag' },
  { token: 'keyword' },
  { token: 'attribute.name' },
  { token: 'type' },
  { token: 'attribute.value' },
  { token: 'string' },
  { token: 'comment', fontStyle: 'italic' },
  { token: 'number' },
];

export function buildMonacoTheme(tokens: MonacoTokens, base: 'vs' | 'vs-dark'): MonacoThemeData {
  const colors: Record<string, string> = {};
  for (const key of THEME_COLOR_KEYS) {
    const value = tokens[key];
    if (value) colors[key] = value;
  }

  const rules = THEME_TOKEN_RULES.filter((rule) => tokens[rule.token]).map((rule) => ({
    ...rule,
    foreground: tokens[rule.token],
  }));

  return { base, inherit: true, rules, colors };
}

export type PlainCompilerOptions = {
  target: 'ESNext';
  module: 'ESNext';
  moduleResolution: 'NodeJs';
  allowJs: boolean;
  allowNonTsExtensions: boolean;
  strict: boolean;
  esModuleInterop: boolean;
  jsx: 'ReactJSX';
  lib: string[];
};

export function compilerOptionsFor(runtime: TaskRuntime): PlainCompilerOptions {
  return {
    target: 'ESNext',
    module: 'ESNext',
    moduleResolution: 'NodeJs',
    allowJs: true,
    allowNonTsExtensions: true,
    strict: true,
    esModuleInterop: true,
    jsx: 'ReactJSX',
    lib: runtime === 'node' ? ['esnext', 'dom'] : ['esnext', 'dom', 'dom.iterable'],
  };
}

export type DiagnosticsOptions = {
  noSemanticValidation: boolean;
  noSyntaxValidation: boolean;
};

export function diagnosticsFor(runtime: TaskRuntime): DiagnosticsOptions {
  return { noSemanticValidation: runtime === 'node', noSyntaxValidation: false };
}
