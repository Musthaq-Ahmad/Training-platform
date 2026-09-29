import { bridgeSource } from './bridgeScript';
import { bundleModule, transformClassicScript, type BuildIssue } from './esbuildService';
import { buildPreviewCsp } from './previewPolicy';
import { resolvePath } from './resolvePath';

export type PreviewBuild =
  | {
      ok: true;
      srcdoc: string;
      runId: string;
      entryPath: string;
      durationMs: number;
      inlined: string[];
      missing: string[];
      warnings: string[];
    }
  | { ok: false; reason: 'NO_ENTRY' | 'BUILD_ERROR'; message: string; issues: BuildIssue[] };

export const NO_ENTRY_MESSAGE = 'Add an .html file to preview your work.';

const MAX_MESSAGES = 500;
const CLASSIC_SCRIPT_TYPES = ['', 'text/javascript', 'application/javascript'];
const SVG_DATA_PREFIX = 'data:image/svg+xml;charset=utf-8,';

// @import url(x) / @import "x" (with optional media) | url(x)
const CSS_REFERENCE =
  /@import\s+(?:url\(\s*(['"]?)([^'")]*)\1\s*\)|(['"])([^'"]*)\3)\s*([^;]*);|url\(\s*(['"]?)([^'")]*?)\6\s*\)/g;

type Context = {
  files: Record<string, string>;
  inlined: Set<string>;
  missing: Set<string>;
  warnings: string[];
};

/** A string containing "</script" would otherwise end the inline script early. */
function escapeScript(code: string): string {
  return code.replace(/<\/(script)/gi, '<\\/$1');
}

function escapeStyle(css: string): string {
  return css.replace(/<\/(style)/gi, '<\\/$1');
}

/** A workspace SVG becomes a data URI; other references stay as written. Missing files are recorded. */
function rewriteAsset(ctx: Context, fromFile: string, ref: string): string {
  const path = resolvePath(fromFile, ref);
  if (path === null) return ref;
  if (!(path in ctx.files)) {
    ctx.missing.add(path);
    return ref;
  }
  if (!path.toLowerCase().endsWith('.svg')) return ref;

  ctx.inlined.add(path);
  return SVG_DATA_PREFIX + encodeURIComponent(ctx.files[path]);
}

/**
 * Inlines local @imports (recursively, each file once) and rewrites url(...) relative to the file
 * the CSS came from. External @imports (Google Fonts) are moved to `hoisted`, because an @import
 * after other rules is ignored.
 */
function processCss(
  ctx: Context,
  css: string,
  fromFile: string,
  seen: Set<string>,
  hoisted: string[]
): string {
  return css.replace(
    CSS_REFERENCE,
    (
      match: string,
      _q1: string | undefined,
      importUrl: string | undefined,
      _q2: string | undefined,
      importString: string | undefined,
      media: string | undefined,
      _q3: string | undefined,
      url: string | undefined
    ) => {
      if (url !== undefined) {
        const rewritten = rewriteAsset(ctx, fromFile, url);
        return rewritten === url ? match : `url("${rewritten}")`;
      }

      const ref = importUrl ?? importString ?? '';
      const path = resolvePath(fromFile, ref);
      if (path === null) {
        hoisted.push(match);
        return '';
      }
      if (seen.has(path)) return '';
      seen.add(path);
      if (!(path in ctx.files)) {
        ctx.missing.add(path);
        return '';
      }

      ctx.inlined.add(path);
      const inner = processCss(ctx, ctx.files[path], path, seen, hoisted);
      const condition = (media ?? '').trim();
      return condition ? `@media ${condition} {\n${inner}\n}` : inner;
    }
  );
}

function cssToStyleText(ctx: Context, css: string, fromFile: string, seen: Set<string>): string {
  const hoisted: string[] = [];
  const body = processCss(ctx, css, fromFile, seen, hoisted);
  return escapeStyle([...hoisted, body].join('\n'));
}

function inlineStylesheets(ctx: Context, doc: Document, entryPath: string): void {
  for (const link of Array.from(doc.querySelectorAll('link[href]'))) {
    const rel = (link.getAttribute('rel') ?? '').toLowerCase().split(/\s+/);
    if (!rel.includes('stylesheet')) continue;

    const path = resolvePath(entryPath, link.getAttribute('href') ?? '');
    if (path === null) continue; // external, e.g. fonts.googleapis.com: the CSP allows it
    if (!(path in ctx.files)) {
      ctx.missing.add(path);
      link.remove();
      continue;
    }

    ctx.inlined.add(path);
    const style = doc.createElement('style');
    style.setAttribute('data-source', path);
    const media = link.getAttribute('media');
    if (media) style.setAttribute('media', media);
    style.textContent = cssToStyleText(ctx, ctx.files[path], path, new Set([path]));
    link.replaceWith(style);
  }

  // Inline <style> blocks: same treatment, relative to the HTML file.
  for (const style of Array.from(doc.querySelectorAll('style:not([data-source])'))) {
    style.textContent = cssToStyleText(ctx, style.textContent ?? '', entryPath, new Set());
  }
}

/** Replaces a <script> with its inlined code. Returns build issues, if any. */
async function inlineScript(
  ctx: Context,
  doc: Document,
  script: HTMLScriptElement,
  entryPath: string
): Promise<BuildIssue[]> {
  const type = (script.getAttribute('type') ?? '').trim().toLowerCase();
  const isModule = type === 'module';
  if (!isModule && !CLASSIC_SCRIPT_TYPES.includes(type)) return []; // templates, JSON, import maps

  const src = script.getAttribute('src');
  if (src === null && !isModule) return []; // an inline classic script already runs as written

  let path: string | null = null;
  if (src !== null) {
    path = resolvePath(entryPath, src);
    if (path === null) {
      // Left in place; the CSP blocks it and the bridge reports the violation.
      ctx.warnings.push(`External scripts are blocked in the preview: ${src}`);
      return [];
    }
    if (!(path in ctx.files)) {
      ctx.missing.add(path);
      script.remove();
      return [];
    }
    ctx.inlined.add(path);
  }

  let code: string;
  const label = path ?? `${entryPath} (inline module)`;
  if (isModule) {
    const result = await bundleModule(
      ctx.files,
      path !== null ? { path } : { inlineCode: script.textContent ?? '', htmlPath: entryPath }
    );
    if (!result.ok) return result.issues;
    code = result.js;
    if (result.css) {
      const style = doc.createElement('style');
      style.setAttribute('data-source', label);
      style.textContent = escapeStyle(result.css);
      script.before(style);
    }
  } else if (path !== null && path.toLowerCase().endsWith('.ts')) {
    const result = await transformClassicScript(ctx.files[path], path);
    if (!result.ok) return result.issues;
    code = `${result.js}\n//# sourceURL=${path}`;
  } else {
    code = `${ctx.files[label]}\n//# sourceURL=${label}`;
  }

  const isDeferred = !isModule && script.hasAttribute('defer');
  for (const attribute of ['src', 'defer', 'async', 'integrity', 'crossorigin']) {
    script.removeAttribute(attribute);
  }
  // The bundle is one IIFE with no imports, but it keeps type="module" so it still runs after
  // the page is parsed, like the module it came from (see FE07_NOTES.md, spec defects).
  script.setAttribute('data-source', label);
  script.textContent = escapeScript(code);
  // Inline scripts ignore `defer`; running them at the end of <body> keeps the same timing.
  if (isDeferred) doc.body.append(script);
  return [];
}

/**
 * `<use href="icons.svg#star">`: Chrome refuses data: URLs in <use>, so the sprite file is
 * inlined once into the page (invisible) and the reference becomes `#star`.
 */
function inlineSpriteReference(
  ctx: Context,
  doc: Document,
  use: Element,
  attribute: string,
  entryPath: string
): void {
  const value = use.getAttribute(attribute);
  if (value === null) return;
  const hashIndex = value.indexOf('#');
  const path = resolvePath(entryPath, value);
  if (path === null || hashIndex === -1) return;
  if (!(path in ctx.files)) {
    ctx.missing.add(path);
    return;
  }

  if (!doc.querySelector(`[data-sprite="${CSS.escape(path)}"]`)) {
    const holder = doc.createElement('div');
    holder.setAttribute('data-sprite', path);
    holder.setAttribute('aria-hidden', 'true');
    // Not display:none, which breaks gradients and masks inside the sprite in some browsers.
    holder.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
    holder.innerHTML = ctx.files[path];
    doc.body.prepend(holder);
    ctx.inlined.add(path);
  }
  use.setAttribute(attribute, value.slice(hashIndex));
}

function rewriteAssets(ctx: Context, doc: Document, entryPath: string): void {
  const rewrite = (element: Element, attribute: string) => {
    const value = element.getAttribute(attribute);
    if (value === null) return;
    const next = rewriteAsset(ctx, entryPath, value);
    if (next !== value) element.setAttribute(attribute, next);
  };

  for (const element of Array.from(doc.querySelectorAll('img, source, audio, video'))) {
    rewrite(element, 'src');
  }
  for (const element of Array.from(doc.querySelectorAll('video[poster]'))) {
    rewrite(element, 'poster');
  }
  for (const link of Array.from(doc.querySelectorAll('link[href]'))) {
    const rel = (link.getAttribute('rel') ?? '').toLowerCase().split(/\s+/);
    if (rel.includes('icon')) rewrite(link, 'href');
  }
  for (const use of Array.from(doc.querySelectorAll('use'))) {
    inlineSpriteReference(ctx, doc, use, 'href', entryPath);
    inlineSpriteReference(ctx, doc, use, 'xlink:href', entryPath);
  }
  for (const element of Array.from(doc.querySelectorAll('[style]'))) {
    const style = element.getAttribute('style') ?? '';
    const next = processCss(ctx, style, entryPath, new Set(), []);
    if (next !== style) element.setAttribute('style', next);
  }
}

export async function buildPreviewDocument(
  files: Record<string, string>,
  entryPath: string | null,
  options: { runId: string; parentOrigin: string; storage: Record<string, string> }
): Promise<PreviewBuild> {
  const startedAt = performance.now();
  if (entryPath === null || !(entryPath in files)) {
    return { ok: false, reason: 'NO_ENTRY', message: NO_ENTRY_MESSAGE, issues: [] };
  }

  const ctx: Context = { files, inlined: new Set([entryPath]), missing: new Set(), warnings: [] };
  const doc = new DOMParser().parseFromString(files[entryPath], 'text/html');

  inlineStylesheets(ctx, doc, entryPath);

  const issues: BuildIssue[] = [];
  for (const script of Array.from(doc.querySelectorAll('script'))) {
    issues.push(...(await inlineScript(ctx, doc, script, entryPath)));
  }
  if (issues.length > 0) {
    return { ok: false, reason: 'BUILD_ERROR', message: 'Build failed', issues };
  }

  rewriteAssets(ctx, doc, entryPath);

  // The bridge must run before any trainee script, so it catches the first log.
  for (const meta of Array.from(doc.querySelectorAll('meta[charset]'))) meta.remove();
  const charset = doc.createElement('meta');
  charset.setAttribute('charset', 'utf-8');
  const csp = doc.createElement('meta');
  csp.setAttribute('http-equiv', 'Content-Security-Policy');
  csp.setAttribute('content', buildPreviewCsp());
  const bridge = doc.createElement('script');
  bridge.textContent = escapeScript(
    bridgeSource({
      runId: options.runId,
      parentOrigin: options.parentOrigin,
      storage: options.storage,
      maxMessages: MAX_MESSAGES,
    })
  );
  doc.head.prepend(charset, csp, bridge);

  return {
    ok: true,
    srcdoc: `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`,
    runId: options.runId,
    entryPath,
    durationMs: Math.round(performance.now() - startedAt),
    inlined: [...ctx.inlined],
    missing: [...ctx.missing],
    warnings: ctx.warnings,
  };
}
