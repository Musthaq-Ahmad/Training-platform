import { describe, it, expect, vi, beforeEach } from 'vitest';
import { buildPreviewDocument, type PreviewBuild } from './buildPreviewDocument';
import { bundleModule, transformClassicScript } from './esbuildService';

// esbuild-wasm can't load its .wasm file in jsdom; esbuildService has its own tests.
vi.mock('./esbuildService', () => ({
  bundleModule: vi.fn(),
  transformClassicScript: vi.fn(),
}));

const options = { runId: 'run-1', parentOrigin: 'http://localhost:5173', storage: {} };

function page(head: string, body = ''): string {
  return `<!doctype html><html><head>${head}</head><body>${body}</body></html>`;
}

async function build(files: Record<string, string>, entry: string | null = 'index.html') {
  return buildPreviewDocument(files, entry, options);
}

function expectOk(result: PreviewBuild): Extract<PreviewBuild, { ok: true }> {
  if (!result.ok) throw new Error(`expected a good build, got ${result.reason}`);
  return result;
}

function parse(srcdoc: string): Document {
  return new DOMParser().parseFromString(srcdoc, 'text/html');
}

beforeEach(() => {
  vi.mocked(bundleModule).mockReset();
  vi.mocked(bundleModule).mockImplementation((_files, entry) =>
    Promise.resolve({
      ok: true,
      js: `/*bundled ${'path' in entry ? entry.path : `${entry.htmlPath} inline`}*/`,
      css: '',
    })
  );
  vi.mocked(transformClassicScript).mockReset();
  vi.mocked(transformClassicScript).mockImplementation((code) =>
    Promise.resolve({ ok: true, js: code })
  );
});

describe('buildPreviewDocument', () => {
  it('turns a stylesheet link into <style data-source>', async () => {
    const result = expectOk(
      await build({
        'index.html': page('<link rel="stylesheet" href="styles.css">'),
        'styles.css': 'body { color: red; }',
      })
    );

    const style = parse(result.srcdoc).querySelector('style[data-source="styles.css"]');
    expect(style?.textContent).toBe('body { color: red; }');
    expect(result.srcdoc).not.toContain('<link');
    expect(result.inlined).toContain('styles.css');
  });

  it('inlines CSS @import, recursively and only once', async () => {
    const result = expectOk(
      await build({
        'index.html': page('<link rel="stylesheet" href="css/main.css">'),
        'css/main.css': '@import "base.css";\n@import url(./base.css);\nh1 { margin: 0; }',
        'css/base.css':
          '@import url("https://fonts.googleapis.com/css2?family=Inter");\nbody { margin: 0; }',
      })
    );

    const css = parse(result.srcdoc).querySelector('style')?.textContent ?? '';
    expect(css.match(/body \{ margin: 0; \}/g)).toHaveLength(1);
    expect(css).toContain('h1 { margin: 0; }');
    // External @imports move to the top, where the browser still honours them.
    expect(css.startsWith('@import url("https://fonts.googleapis.com/css2?family=Inter");')).toBe(
      true
    );
  });

  it('resolves CSS url(...) relative to the CSS file', async () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
    const result = expectOk(
      await build({
        'index.html': page('<link rel="stylesheet" href="css/styles.css">'),
        'css/styles.css': '.hero { background: url(../img/a.svg) no-repeat; }',
        'img/a.svg': svg,
      })
    );

    const css = parse(result.srcdoc).querySelector('style')?.textContent ?? '';
    expect(css).toContain(`url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`);
  });

  it('lists a missing CSS file in missing and removes its tag', async () => {
    const result = expectOk(
      await build({ 'index.html': page('<link rel="stylesheet" href="nope.css">') })
    );

    expect(result.missing).toEqual(['nope.css']);
    expect(result.srcdoc).not.toContain('nope.css');
  });

  it('keeps an external stylesheet link', async () => {
    const href = 'https://fonts.googleapis.com/css2?family=Inter';
    const result = expectOk(
      await build({ 'index.html': page(`<link rel="stylesheet" href="${href}">`) })
    );
    expect(parse(result.srcdoc).querySelector('link')?.getAttribute('href')).toBe(href);
  });

  it('bundles a module script with bundleModule and inlines it (no src)', async () => {
    const result = expectOk(
      await build({
        'index.html': page('', '<script type="module" src="js/main.js"></script>'),
        'js/main.js': "import './utils.js';",
        'js/utils.js': '',
      })
    );

    expect(bundleModule).toHaveBeenCalledWith(expect.any(Object), { path: 'js/main.js' });
    const script = parse(result.srcdoc).querySelector('script[data-source="js/main.js"]');
    expect(script?.textContent).toBe('/*bundled js/main.js*/');
    expect(script?.hasAttribute('src')).toBe(false);
    // Deviation from the ticket: kept as type="module" so it still runs after parsing.
    expect(script?.getAttribute('type')).toBe('module');
  });

  it('bundles inline module code relative to the HTML file', async () => {
    const result = expectOk(
      await build(
        {
          'pages/about.html': page('', '<script type="module">import "../js/a.js";</script>'),
          'js/a.js': '',
        },
        'pages/about.html'
      )
    );

    expect(bundleModule).toHaveBeenCalledWith(expect.any(Object), {
      inlineCode: 'import "../js/a.js";',
      htmlPath: 'pages/about.html',
    });
    expect(result.srcdoc).toContain('/*bundled pages/about.html inline*/');
  });

  it('adds a <style> for CSS the module imported', async () => {
    vi.mocked(bundleModule).mockResolvedValue({
      ok: true,
      js: '/*js*/',
      css: 'p { color: blue; }',
    });
    const result = expectOk(
      await build({
        'index.html': page('', '<script type="module" src="main.js"></script>'),
        'main.js': '',
      })
    );

    const style = parse(result.srcdoc).querySelector('style[data-source="main.js"]');
    expect(style?.textContent).toBe('p { color: blue; }');
  });

  it('inlines a classic .js script with a sourceURL', async () => {
    const result = expectOk(
      await build({
        'index.html': page('', '<script src="script.js"></script>'),
        'script.js': 'function greet() {}',
      })
    );

    const script = parse(result.srcdoc).querySelector('script[data-source="script.js"]');
    expect(script?.textContent).toBe('function greet() {}\n//# sourceURL=script.js');
    expect(script?.hasAttribute('type')).toBe(false);
  });

  it('strips types from a classic .ts script with transformClassicScript', async () => {
    vi.mocked(transformClassicScript).mockResolvedValue({ ok: true, js: 'let x = 1;' });
    const result = expectOk(
      await build({
        'index.html': page('', '<script src="app.ts"></script>'),
        'app.ts': 'let x: number = 1;',
      })
    );

    expect(transformClassicScript).toHaveBeenCalledWith('let x: number = 1;', 'app.ts');
    expect(result.srcdoc).toContain('let x = 1;\n//# sourceURL=app.ts');
  });

  it('moves a deferred classic script to the end of <body>', async () => {
    const result = expectOk(
      await build({
        'index.html': page('<script src="script.js" defer></script>', '<main id="app"></main>'),
        'script.js': 'init();',
      })
    );

    const body = parse(result.srcdoc).body;
    expect(body.lastElementChild?.getAttribute('data-source')).toBe('script.js');
    expect(body.lastElementChild?.hasAttribute('defer')).toBe(false);
  });

  it('escapes </script> inside inlined JavaScript', async () => {
    const result = expectOk(
      await build({
        'index.html': page('', '<script src="script.js"></script><p id="after">after</p>'),
        'script.js': 'const html = "</script><p>oops</p>";',
      })
    );

    expect(result.srcdoc).toContain('"<\\/script><p>oops</p>"');
    const doc = parse(result.srcdoc);
    expect(doc.querySelector('script[data-source="script.js"]')?.textContent).toContain('oops');
    expect(doc.getElementById('after')).not.toBeNull();
  });

  it('leaves an external script in place and adds a warning', async () => {
    const src = 'https://cdn.example.com/lib.js';
    const result = expectOk(
      await build({ 'index.html': page('', `<script src="${src}"></script>`) })
    );

    expect(parse(result.srcdoc).querySelector(`script[src="${src}"]`)).not.toBeNull();
    expect(result.warnings).toEqual([`External scripts are blocked in the preview: ${src}`]);
  });

  it('removes a missing local script and lists it', async () => {
    const result = expectOk(
      await build({ 'index.html': page('', '<script src="gone.js"></script>') })
    );

    expect(result.missing).toEqual(['gone.js']);
    expect(result.srcdoc).not.toContain('gone.js');
  });

  it('leaves non-JavaScript script types alone', async () => {
    const result = expectOk(
      await build({ 'index.html': page('', '<script type="text/template"><b>hi</b></script>') })
    );
    expect(parse(result.srcdoc).querySelector('script[type="text/template"]')?.textContent).toBe(
      '<b>hi</b>'
    );
  });

  it('turns an SVG <img> into a data URI and leaves other images alone', async () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';
    const result = expectOk(
      await build({
        'index.html': page(
          '',
          '<img id="logo" src="assets/logo.svg"><img id="remote" src="https://picsum.photos/200"><img id="gone" src="nope.png">'
        ),
        'assets/logo.svg': svg,
      })
    );

    const doc = parse(result.srcdoc);
    expect(doc.getElementById('logo')?.getAttribute('src')).toBe(
      `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    );
    expect(doc.getElementById('remote')?.getAttribute('src')).toBe('https://picsum.photos/200');
    expect(doc.getElementById('gone')?.getAttribute('src')).toBe('nope.png');
    expect(result.missing).toEqual(['nope.png']);
  });

  it('inlines an SVG sprite once for <use href="file.svg#id"> and points at the id', async () => {
    const result = expectOk(
      await build({
        'index.html': page(
          '',
          '<svg><use id="a" href="img/icons.svg#star"></use></svg><svg><use id="b" href="img/icons.svg#dot"></use></svg>'
        ),
        'img/icons.svg':
          '<svg xmlns="http://www.w3.org/2000/svg"><symbol id="star"></symbol><symbol id="dot"></symbol></svg>',
      })
    );

    const doc = parse(result.srcdoc);
    expect(doc.getElementById('a')?.getAttribute('href')).toBe('#star');
    expect(doc.getElementById('b')?.getAttribute('href')).toBe('#dot');
    expect(doc.querySelectorAll('[data-sprite="img/icons.svg"]')).toHaveLength(1);
    expect(doc.querySelector('symbol#star')).not.toBeNull();
  });

  it('rewrites url(...) in style attributes', async () => {
    const result = expectOk(
      await build({
        'index.html': page('', `<div id="hero" style="background: url('img/bg.svg')"></div>`),
        'img/bg.svg': '<svg/>',
      })
    );
    expect(parse(result.srcdoc).getElementById('hero')?.getAttribute('style')).toContain(
      'url("data:image/svg+xml;charset=utf-8,'
    );
  });

  it('puts charset, then the CSP, then the bridge at the top of <head>, before any trainee script', async () => {
    const result = expectOk(
      await build({
        'index.html': page('<title>T</title><meta charset="utf-8"><script>var first = 1;</script>'),
      })
    );

    const head = parse(result.srcdoc).head;
    const [charset, csp, bridge] = Array.from(head.children);
    expect(charset.getAttribute('charset')).toBe('utf-8');
    expect(csp.getAttribute('http-equiv')).toBe('Content-Security-Policy');
    expect(csp.getAttribute('content')).toContain("default-src 'none'");
    expect(bridge.tagName).toBe('SCRIPT');
    expect(bridge.textContent).toContain('"runId":"run-1"');
    expect(bridge.textContent).toContain('"parentOrigin":"http://localhost:5173"');
    expect(head.querySelectorAll('meta[charset]')).toHaveLength(1);
    expect(head.querySelectorAll('script')[1].textContent).toBe('var first = 1;');
    expect(result.srcdoc.startsWith('<!DOCTYPE html>\n<html>')).toBe(true);
  });

  it('passes the stored localStorage to the bridge', async () => {
    const result = expectOk(
      await buildPreviewDocument({ 'index.html': page('') }, 'index.html', {
        ...options,
        storage: { theme: 'dark' },
      })
    );
    expect(result.srcdoc).toContain('"storage":{"theme":"dark"}');
  });

  it('returns NO_ENTRY when there is no HTML entry', async () => {
    expect(await build({ 'script.js': '' }, null)).toEqual({
      ok: false,
      reason: 'NO_ENTRY',
      message: 'Add an .html file to preview your work.',
      issues: [],
    });
  });

  it('returns BUILD_ERROR with the issues when a bundle fails', async () => {
    const issue = { file: 'js/main.js', line: 4, column: 10, message: "Cannot find './utl'" };
    vi.mocked(bundleModule).mockResolvedValue({ ok: false, issues: [issue] });

    const result = await build({
      'index.html': page('', '<script type="module" src="js/main.js"></script>'),
      'js/main.js': '',
    });

    expect(result).toEqual({
      ok: false,
      reason: 'BUILD_ERROR',
      message: 'Build failed',
      issues: [issue],
    });
  });

  it('returns the run id, entry path and a duration', async () => {
    const result = expectOk(await build({ 'index.html': page('') }));
    expect(result).toMatchObject({
      runId: 'run-1',
      entryPath: 'index.html',
      inlined: ['index.html'],
    });
    expect(result.durationMs).toBeGreaterThanOrEqual(0);
  });
});
