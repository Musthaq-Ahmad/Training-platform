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

const INPUT_FILE = 'scripts/ts-sources.json';
const OUT_DIR = 'src/content/references';

const turndown = new TurndownService({
  codeBlockStyle: 'fenced',
  headingStyle: 'atx',
});

turndown.use(gfm);

turndown.remove(['script', 'style', 'iframe', 'nav']);
function normalizeCodeBlocks(document: Document) {
  // Drop "Try" playground links (adjust selector if the class differs)
  document.querySelectorAll('pre.playground-link').forEach((el) => el.remove());

  document.querySelectorAll('pre').forEach((pre) => {
    const lang =
      pre.querySelector('.language-id')?.textContent?.trim() ||
      pre.className.match(/language-([\w-]+)/)?.[1] ||
      'ts';

    // Join per-line divs with real newlines; fall back to textContent
    const lines = pre.querySelectorAll('.line');
    const raw = lines.length
      ? Array.from(lines)
          .map((l) => l.textContent ?? '')
          .join('\n')
      : (pre.querySelector('code')?.textContent ?? pre.textContent ?? '');

    const cleanPre = document.createElement('pre');
    const code = document.createElement('code');
    code.className = `language-${lang}`;
    code.textContent = raw.replace(/\n+$/, '');
    cleanPre.appendChild(code);
    pre.replaceWith(cleanPre);
  });
}
async function urlToMarkdown(url: string): Promise<string> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const html = await response.text();

  const dom = new JSDOM(html, { url });
  normalizeCodeBlocks(dom.window.document);

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

        await writeFile(outputPath, markdown, 'utf8');

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
