import { describe, it, expect } from 'vitest';
import { toModelUri, workerKindFor, buildMonacoTheme, diagnosticsFor } from './monacoConfig';

describe('toModelUri', () => {
  it('prefixes the path with file:///workspace/', () => {
    expect(toModelUri('src/a.ts')).toBe('file:///workspace/src/a.ts');
  });
});

describe('workerKindFor', () => {
  it.each([
    ['json', 'json'],
    ['css', 'css'],
    ['scss', 'css'],
    ['less', 'css'],
    ['html', 'html'],
    ['handlebars', 'html'],
    ['razor', 'html'],
    ['typescript', 'ts'],
    ['javascript', 'ts'],
    ['markdown', 'editor'],
    ['plaintext', 'editor'],
  ])('%s → %s', (label, kind) => {
    expect(workerKindFor(label)).toBe(kind);
  });
});

describe('buildMonacoTheme', () => {
  it('puts the given token into editor.background', () => {
    const theme = buildMonacoTheme({ 'editor.background': '#101020' }, 'vs-dark');
    expect(theme.colors['editor.background']).toBe('#101020');
    expect(theme.base).toBe('vs-dark');
    expect(theme.inherit).toBe(true);
  });

  it('turns a token rule into a rule with foreground, skipping missing ones', () => {
    const theme = buildMonacoTheme({ keyword: '#ff00ff' }, 'vs');
    expect(theme.rules).toEqual([{ token: 'keyword', foreground: '#ff00ff' }]);
  });

  it('marks the comment rule italic', () => {
    const theme = buildMonacoTheme({ comment: '#888888' }, 'vs');
    expect(theme.rules).toEqual([{ token: 'comment', fontStyle: 'italic', foreground: '#888888' }]);
  });
});

describe('diagnosticsFor', () => {
  it('disables semantic validation for node tasks', () => {
    expect(diagnosticsFor('node').noSemanticValidation).toBe(true);
  });

  it('keeps semantic validation for browser tasks', () => {
    expect(diagnosticsFor('browser').noSemanticValidation).toBe(false);
  });

  it('never disables syntax validation', () => {
    expect(diagnosticsFor('node').noSyntaxValidation).toBe(false);
    expect(diagnosticsFor('browser').noSyntaxValidation).toBe(false);
    expect(diagnosticsFor('sql').noSyntaxValidation).toBe(false);
  });
});
