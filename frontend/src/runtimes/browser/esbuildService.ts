import type { Loader, Message, Plugin } from 'esbuild-wasm';
import wasmURL from 'esbuild-wasm/esbuild.wasm?url';
import { resolvePath } from './resolvePath';

export type BuildIssue = {
  file: string | null;
  line: number | null;
  column: number | null; // 1-based, like the editor
  message: string;
};

type Esbuild = typeof import('esbuild-wasm');

const NAMESPACE = 'workspace';
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];
const INDEX_FILES = ['/index.ts', '/index.js'];
const LOADERS: Record<string, Loader> = {
  ts: 'ts',
  tsx: 'tsx',
  jsx: 'jsx',
  css: 'css',
  json: 'json',
};

let esbuildPromise: Promise<Esbuild> | null = null;

/** True under Node (Vitest), where esbuild-wasm runs its own engine and rejects a wasmURL. */
function isNode(): boolean {
  const { process } = globalThis as { process?: { versions?: { node?: string } } };
  return typeof process?.versions?.node === 'string';
}

/** Loads esbuild-wasm once per page (about 10 MB, cached by the browser after the first time). */
export function getEsbuild(): Promise<Esbuild> {
  if (!esbuildPromise) {
    esbuildPromise = (async () => {
      const esbuild = await import('esbuild-wasm');
      // initialize() may only run once per page, so every caller shares this promise.
      await esbuild.initialize(isNode() ? {} : { wasmURL });
      return esbuild;
    })();
    // A failed download shouldn't break every later Run: let the next call try again.
    esbuildPromise.catch(() => {
      esbuildPromise = null;
    });
  }
  return esbuildPromise;
}

function loaderFor(path: string): Loader {
  const extension = path.slice(path.lastIndexOf('.') + 1).toLowerCase();
  return LOADERS[extension] ?? 'js';
}

/** 'lodash/fp' → 'lodash', '@scope/pkg/x' → '@scope/pkg' */
function packageName(specifier: string): string {
  const parts = specifier.split('/');
  return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

function findWorkspaceFile(files: Record<string, string>, path: string): string | null {
  const candidates = [
    path,
    ...EXTENSIONS.map((ext) => path + ext),
    ...INDEX_FILES.map((i) => path + i),
    // TypeScript style: `import './utils.js'` means utils.ts
    ...(/\.jsx?$/.test(path) ? [path.replace(/\.js(x?)$/, '.ts$1')] : []),
  ];
  return candidates.find((candidate) => candidate in files) ?? null;
}

/** Reads every import from the workspace files, never from disk or the network. */
function workspacePlugin(files: Record<string, string>, htmlPath: string | null): Plugin {
  return {
    name: 'workspace',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        if (args.kind === 'entry-point') {
          return args.path in files
            ? { path: args.path, namespace: NAMESPACE }
            : { errors: [{ text: `Cannot find '${args.path}'` }] };
        }

        // Imports inside inline module code come from stdin, which has no workspace importer.
        const importer = args.namespace === NAMESPACE ? args.importer : (htmlPath ?? '');
        const importerLabel =
          args.namespace === NAMESPACE ? args.importer : `${htmlPath ?? ''} (inline module)`;

        if (/^\.{0,2}\//.test(args.path)) {
          const resolved = resolvePath(importer, args.path);
          const found = resolved === null ? null : findWorkspaceFile(files, resolved);
          if (found) return { path: found, namespace: NAMESPACE };
          return {
            errors: [{ text: `Cannot find '${args.path}' (imported from ${importerLabel})` }],
          };
        }

        if (/^([a-z][a-z\d+.-]*:|\/\/)/i.test(args.path)) {
          return {
            errors: [{ text: `Imports from URLs aren't supported in the preview: ${args.path}` }],
          };
        }

        return {
          errors: [
            {
              text: `"${packageName(args.path)}" is an npm package. npm packages need a Node task.`,
            },
          ],
        };
      });

      build.onLoad({ filter: /.*/, namespace: NAMESPACE }, (args) => ({
        contents: files[args.path],
        loader: loaderFor(args.path),
      }));
    },
  };
}

function toIssue(message: Message): BuildIssue {
  const location = message.location;
  return {
    file: location ? location.file.replace(/^workspace:/, '') : null,
    line: location ? location.line : null,
    column: location ? location.column + 1 : null,
    message: message.text,
  };
}

function toIssues(error: unknown): BuildIssue[] {
  if (error && typeof error === 'object' && 'errors' in error && Array.isArray(error.errors)) {
    const errors = error.errors as Message[];
    if (errors.length > 0) return errors.map(toIssue);
  }
  const message = error instanceof Error ? error.message : String(error);
  return [{ file: null, line: null, column: null, message }];
}

/** Bundles an ES module entry (a workspace file, or inline code from an HTML file) into one IIFE. */
export async function bundleModule(
  files: Record<string, string>,
  entry: { path: string } | { inlineCode: string; htmlPath: string }
): Promise<{ ok: true; js: string; css: string } | { ok: false; issues: BuildIssue[] }> {
  try {
    const esbuild = await getEsbuild();
    const isInline = 'inlineCode' in entry;

    const result = await esbuild.build({
      ...(isInline
        ? {
            stdin: {
              contents: entry.inlineCode,
              sourcefile: `${entry.htmlPath} (inline module)`,
              loader: 'js',
            },
          }
        : { entryPoints: [entry.path] }),
      bundle: true,
      write: false,
      format: 'iife',
      target: 'es2020',
      sourcemap: 'inline',
      outdir: '/out',
      logLevel: 'silent',
      plugins: [workspacePlugin(files, isInline ? entry.htmlPath : null)],
    });

    const output = result.outputFiles ?? [];
    return {
      ok: true,
      js: output.find((file) => file.path.endsWith('.js'))?.text ?? '',
      css: output.find((file) => file.path.endsWith('.css'))?.text ?? '',
    };
  } catch (error) {
    return { ok: false, issues: toIssues(error) };
  }
}

/** Strips types from a classic (non-module) .ts script, keeping top-level names global. */
export async function transformClassicScript(
  code: string,
  path: string
): Promise<{ ok: true; js: string } | { ok: false; issues: BuildIssue[] }> {
  try {
    const esbuild = await getEsbuild();
    // No `format`: top-level function and var stay global, so plain <script> files can share them.
    const result = await esbuild.transform(code, {
      loader: 'ts',
      sourcefile: path,
      target: 'es2020',
    });
    return { ok: true, js: result.code };
  } catch (error) {
    return { ok: false, issues: toIssues(error) };
  }
}
