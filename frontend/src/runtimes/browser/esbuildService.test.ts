import { describe, it, expect, vi } from 'vitest';
import { bundleModule, transformClassicScript } from './esbuildService';

// Runs the real esbuild-wasm package. Under Vitest it is the Node build, which loads its engine
// without the .wasm URL. The spec asked for the Node test environment, but the shared
// src/test/setup.ts touches `window`, so this file runs in jsdom. There the global Uint8Array
// comes from jsdom and TextEncoder's output fails esbuild's startup check
// (`new TextEncoder().encode("") instanceof Uint8Array`), so hand esbuild an encoder that
// returns this realm's Uint8Array.
const JsdomTextEncoder = globalThis.TextEncoder;
class SameRealmTextEncoder extends JsdomTextEncoder {
  encode(input?: string): Uint8Array<ArrayBuffer> {
    return new Uint8Array(super.encode(input));
  }
}
vi.stubGlobal('TextEncoder', SameRealmTextEncoder);

describe('bundleModule', () => {
  it('bundles main.js importing ./utils.js into one IIFE', async () => {
    const result = await bundleModule(
      {
        'js/main.js': "import { add } from './utils.js';\nconsole.log(add(1, 2));\n",
        'js/utils.js': 'export function add(a, b) {\n  return a + b;\n}\n',
      },
      { path: 'js/main.js' }
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.js).toMatch(/^\s*"use strict";\s*\(\(\) => \{|^\s*\(\(\) => \{/);
    expect(result.js).toContain('function add(a, b)');
    expect(result.js).not.toMatch(/\bimport\b.*from/);
    expect(result.js).toContain('sourceMappingURL=data:');
  });

  it('resolves ./utils without an extension', async () => {
    const result = await bundleModule(
      {
        'main.js': "import { greet } from './utils';\ngreet();\n",
        'utils.ts': "export function greet(): void {\n  console.log('hi');\n}\n",
      },
      { path: 'main.js' }
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.js).toContain('function greet()');
  });

  it("resolves './utils.js' to utils.ts, as TypeScript imports are written", async () => {
    const result = await bundleModule(
      {
        'main.ts': "import { add } from './utils.js';\nconsole.log(add(1, 2));\n",
        'utils.ts': 'export function add(a: number, b: number): number {\n  return a + b;\n}\n',
      },
      { path: 'main.ts' }
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.js).toContain('function add(a, b)');
  });

  it('strips TypeScript types', async () => {
    const result = await bundleModule(
      {
        'app.ts':
          'const count: number = 3;\ninterface User { name: string }\nconsole.log(count);\n',
      },
      { path: 'app.ts' }
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.js).not.toContain(': number');
    expect(result.js).not.toContain('interface');
  });

  it('bundles inline module code relative to the HTML file', async () => {
    const result = await bundleModule(
      { 'pages/about.html': '', 'js/utils.js': 'export const x = 42;\n' },
      {
        inlineCode: "import { x } from '../js/utils.js';\nconsole.log(x);\n",
        htmlPath: 'pages/about.html',
      }
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.js).toContain('42');
  });

  it('returns CSS imported from JavaScript', async () => {
    const result = await bundleModule(
      { 'main.js': "import './styles.css';\n", 'styles.css': 'body { color: red; }\n' },
      { path: 'main.js' }
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.css).toContain('color: red');
  });

  it('gives the "npm packages need a Node task" issue with file and line for a bare import', async () => {
    const result = await bundleModule(
      { 'js/main.js': "// first line\nimport _ from 'lodash';\nconsole.log(_);\n" },
      { path: 'js/main.js' }
    );

    expect(result).toEqual({
      ok: false,
      issues: [
        {
          file: 'js/main.js',
          line: 2,
          column: 15,
          message: '"lodash" is an npm package. npm packages need a Node task.',
        },
      ],
    });
  });

  it('gives a "Cannot find" issue for a missing file', async () => {
    const result = await bundleModule(
      { 'js/main.js': "import { x } from './utl';\nconsole.log(x);\n" },
      { path: 'js/main.js' }
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toMatchObject({ file: 'js/main.js', line: 1 });
    expect(result.issues[0].message).toBe("Cannot find './utl' (imported from js/main.js)");
  });

  it('reports syntax errors with their location', async () => {
    const result = await bundleModule({ 'main.js': 'const = 1;\n' }, { path: 'main.js' });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues[0]).toMatchObject({ file: 'main.js', line: 1 });
  });
});

describe('transformClassicScript', () => {
  it('strips types and keeps function greet global (the output does not wrap it)', async () => {
    const result = await transformClassicScript(
      'function greet(name: string): string {\n  return `Hi ${name}`;\n}\nvar count: number = 1;\n',
      'script.ts'
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.js).toMatch(/^function greet\(name\) \{/);
    expect(result.js).toContain('var count = 1;');
    expect(result.js).not.toContain('=>');
  });

  it('reports a type-stripping failure as an issue', async () => {
    const result = await transformClassicScript('let x: = 1;\n', 'script.ts');

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues[0]).toMatchObject({ file: 'script.ts', line: 1 });
  });
});
