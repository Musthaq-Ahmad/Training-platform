import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

type Reference = {
  name?: string;
  title: string;
  source: string;
  path?: string;
  url?: string;
  note?: string;
};

type Day = {
  id: string;
  dayNumber: number;
  title: string;
  references: Reference[];
};

type SourcesFile = {
  courseId: string;
  sources: Record<
    string,
    {
      repo: string;
      ref: string;
      basePath: string;
      license: string;
    }
  >;
  days: Day[];
};

const INPUT_FILE = process.argv[2];

if (!INPUT_FILE) {
  console.error('Usage: npx tsx scripts/importTsReferences.ts <sources-file.json>');
  process.exit(1);
}
const OUT_DIR = 'src/content/references';

const turndown = new TurndownService({
  codeBlockStyle: 'fenced',
  headingStyle: 'atx',
});

turndown.use(gfm);

turndown.remove(['script', 'style', 'iframe', 'nav']);

type SandpackFile = { path: string; lang: string; code: string };

// react.dev ships code as escaped JSON inside <script> tags (two escape layers)
const SANDPACK_FILE_RE =
  /\\"className\\":\\"language-([\w-]+)\\",\\"meta\\":\\"([^\\]*)\\",\\"children\\":\\"((?:\\\\\\\\|\\\\\\"|\\\\[nrt\/]|\\u[0-9a-fA-F]{4}|[^\\])*)\\"/g;

function decodePayload(raw: string): string | null {
  try {
    const once = JSON.parse(`"${raw}"`) as string;
    return JSON.parse(`"${once}"`) as string;
  } catch {
    return null;
  }
}

function parseSandpackFiles(html: string): SandpackFile[] {
  const files: SandpackFile[] = [];

  for (const match of html.matchAll(SANDPACK_FILE_RE)) {
    const code = decodePayload(match[3]);
    if (code === null) continue;

    files.push({
      path: match[2].split(/\s+/)[0].replace(/^\//, ''),
      lang: match[1],
      code,
    });
  }

  return files;
}

function normalizeCodeBlocks(document: Document, sandpackFiles: SandpackFile[] = []) {
  // Drop "Try" playground links (adjust selector if the class differs)
  document.querySelectorAll('pre.playground-link').forEach((el) => el.remove());
  // react.dev Sandpack examples: keep the pre-rendered code, drop the editor chrome
  const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
  let cursor = 0;

  document.querySelectorAll('.sp-wrapper').forEach((wrapper) => {
    const source = wrapper.querySelector('.sp-pre-placeholder') ?? wrapper.querySelector('pre');
    if (!source) return;

    // Multi-file example: rebuild every visible tab from the payload
    const tabs = Array.from(wrapper.querySelectorAll('.sp-tab-button')).map((b) =>
      (b.getAttribute('title') ?? '').replace(/^\//, '')
    );

    if (tabs.length > 1 && sandpackFiles.length > 0) {
      const placeholder = norm(source.textContent ?? '');
      const indexed = sandpackFiles.map((file, i) => ({ file, i }));
      const anchors = indexed.filter(({ file }) => norm(file.code) === placeholder);
      const anchor = anchors.find((a) => a.i >= cursor) ?? anchors[0];

      if (anchor) {
        const nodes: Node[] = [];

        for (const tab of tabs) {
          const candidates = indexed.filter(({ file }) => file.path === tab);
          if (candidates.length === 0) continue;

          const best = candidates.reduce((a, b) =>
            Math.abs(a.i - anchor.i) <= Math.abs(b.i - anchor.i) ? a : b
          );

          const label = document.createElement('p');
          const strong = document.createElement('strong');
          strong.textContent = tab.split('/').pop() ?? tab;
          label.appendChild(strong);

          const pre = document.createElement('pre');
          const code = document.createElement('code');
          code.className = `language-${best.file.lang === 'js' ? 'jsx' : best.file.lang}`;
          code.textContent = best.file.code.replace(/\n+$/, '');
          pre.appendChild(code);

          nodes.push(label, pre);
        }

        if (nodes.length > 0) {
          cursor = anchor.i + 1;
          (wrapper as Element).replaceWith(...(nodes as Element[]));
          return;
        }
      }
    }

    // Single-file example (or no match): use the pre-rendered placeholder
    source.querySelectorAll('br').forEach((br) => br.replaceWith('\n'));

    const lineEls = source.querySelectorAll('.cm-line');
    const raw = lineEls.length
      ? Array.from(lineEls)
          .map((l) => l.textContent ?? '')
          .join('\n')
      : (source.textContent ?? '');

    const cleanPre = document.createElement('pre');
    const code = document.createElement('code');
    code.className = 'language-jsx';
    code.textContent = raw.replace(/\n+$/, '');
    cleanPre.appendChild(code);
    wrapper.replaceWith(cleanPre);
  });

  document.querySelectorAll('pre').forEach((pre) => {
    pre.querySelectorAll('br').forEach((br) => br.replaceWith('\n'));
    // Node docs put an ESM and a CommonJS <code> in one <pre>: keep only ESM
    const flavors = pre.querySelectorAll('code.language-mjs, code.language-cjs');
    if (flavors.length > 0) {
      const esm = pre.querySelector('code.language-mjs');
      const raw = (esm ?? flavors[0]).textContent ?? '';

      const cleanPre = document.createElement('pre');
      const code = document.createElement('code');
      code.className = 'language-js';
      code.textContent = raw.replace(/\n+$/, '');
      cleanPre.appendChild(code);
      pre.replaceWith(cleanPre);
      return;
    }
    const lang =
      pre.querySelector('.language-id')?.textContent?.trim() ||
      pre.querySelector('code')?.className.match(/(?:language|lang)-([\w-]+)/)?.[1] ||
      pre.className.match(/language-([\w-]+)/)?.[1] ||
      'text';

    // Join per-line divs with real newlines; fall back to textContent
    const lines = pre.querySelectorAll('.line');
    // after: use the whole <pre> text unless it is a real multi-<code> or per-line block
    const raw = lines.length
      ? Array.from(lines)
          .map((l) => l.textContent ?? '')
          .join('\n')
      : (pre.textContent ?? '');

    const cleanPre = document.createElement('pre');
    const code = document.createElement('code');
    code.className = `language-${lang}`;
    code.textContent = raw.replace(/\n+$/, '');
    cleanPre.appendChild(code);
    pre.replaceWith(cleanPre);
  });
}
function extractByRange(document: Document, heading: Element, level: number): string {
  const FOLLOWING = 4; // Node.DOCUMENT_POSITION_FOLLOWING

  const boundary = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).find(
    (h) =>
      !heading.contains(h) &&
      (heading.compareDocumentPosition(h) & FOLLOWING) !== 0 &&
      Number(h.tagName[1]) <= level
  );

  const range = document.createRange();
  range.setStartBefore(heading);

  if (boundary) {
    range.setEndBefore(boundary);
  } else {
    const root = document.querySelector('main') ?? document.body;
    range.setEndAfter(root.lastChild ?? root);
  }

  const wrapper = document.createElement('div');
  wrapper.appendChild(range.cloneContents());
  return wrapper.innerHTML;
}
function extractSection(document: Document, id: string): string | null {
  const target = document.getElementById(id);
  if (!target) return null;

  const headingSelector = 'h1,h2,h3,h4,h5,h6';
  const heading = target.matches(headingSelector) ? target : target.closest(headingSelector);

  // The id is on a wrapper (e.g. <section>), so take it whole
  if (!heading) return target.outerHTML;

  const level = Number(heading.tagName[1]);

  // If the heading is the first child of a <section>, walk sibling
  // sections; otherwise walk sibling elements of the heading itself
  const parent = heading.parentElement;
  const start =
    parent && parent.tagName === 'SECTION' && parent.firstElementChild === heading
      ? parent
      : heading;

  // A sibling ends the section only if it is a heading itself,
  // or a <section> that starts with a heading
  const levelOf = (el: Element): number | null => {
    if (el.matches(headingSelector)) return Number(el.tagName[1]);

    const first = el.firstElementChild;
    if (el.tagName === 'SECTION' && first?.matches(headingSelector)) {
      return Number(first.tagName[1]);
    }

    return null;
  };

  const parts = [start.outerHTML];
  let node = start.nextElementSibling;
  let hitBoundary = false;

  while (node) {
    const nodeLevel = levelOf(node);
    if (nodeLevel !== null && nodeLevel <= level) {
      hitBoundary = true;
      break;
    }
    parts.push(node.outerHTML);
    node = node.nextElementSibling;
  }

  // Siblings ran out without a boundary: the content is nested elsewhere
  // (react.dev), so fall back to document order
  if (!hitBoundary) return extractByRange(document, heading, level);

  return parts.join('\n');
}
function removePermalinks(root: ParentNode) {
  root.querySelectorAll('a[href^="#"]').forEach((a) => {
    if (a.textContent?.trim() === '#') a.remove();
  });

  // MkDocs permalinks
  root.querySelectorAll('a.headerlink').forEach((a) => a.remove());

  // Version info: "Added in", "Deprecated since", and the History table
  root.querySelectorAll('.api_metadata').forEach((el) => el.remove());
}
async function urlToMarkdown(url: string): Promise<string> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const html = await response.text();

  const dom = new JSDOM(html, { url });

  const sandpackFiles = parseSandpackFiles(html);
  normalizeCodeBlocks(dom.window.document, sandpackFiles);

  const sectionId = new URL(url).hash.slice(1);

  if (sectionId) {
    const sectionHtml = extractSection(dom.window.document, decodeURIComponent(sectionId));

    if (!sectionHtml) {
      throw new Error(`Section #${sectionId} not found`);
    }

    // Remove permalinks only after the section has been located
    const wrapper = dom.window.document.createElement('div');
    wrapper.innerHTML = sectionHtml;
    removePermalinks(wrapper);

    return turndown.turndown(wrapper.innerHTML);
  }

  removePermalinks(dom.window.document);

  const article = new Readability(dom.window.document).parse();

  if (!article?.content) {
    throw new Error('No readable content');
  }

  return turndown.turndown(article.content);
}

async function main() {
  const data: SourcesFile = JSON.parse(await readFile(INPUT_FILE, 'utf8'));

  let imported = 0;

  for (const day of data.days) {
    const dayDir = path.join(OUT_DIR, day.id);

    await mkdir(dayDir, {
      recursive: true,
    });

    for (const reference of day.references) {
      if (reference.source === 'skip' || reference.source === 'manual' || !reference.url) {
        console.log(`skip ${day.id}/${reference.title}`);
        continue;
      }

      try {
        const markdown = await urlToMarkdown(reference.url);

        if (!markdown.trim()) {
          console.log(`SKIP ${reference.title} (empty content)`);
          continue;
        }

        const outputPath = path.join(
          dayDir,
          `${
            reference.name ??
            reference.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
          }.md`
        );
        // Always start with the title from the sources file, because the converter
        // uses the first heading as the topic title.
        // Anchored references start with their own heading, which would duplicate our title
        const isSection = new URL(reference.url).hash !== '';
        const body = isSection ? markdown.replace(/^\s*#{1,6}[^\n]*\n+/, '') : markdown;

        const finalMarkdown = `# ${reference.title}\n\n${body}`;

        await writeFile(outputPath, finalMarkdown, 'utf8');

        imported++;

        console.log(`ok ${reference.title} -> ${outputPath}`);
      } catch (error) {
        console.log(`FAIL ${reference.title} (${(error as Error).message})`);
      }
    }
  }

  console.log(`\nImported ${imported} TypeScript references.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
