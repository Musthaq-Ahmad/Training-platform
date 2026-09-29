import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

type Input = {
  day: string;
  slug: string;
  title: string;
  urls: string[];
  mode?: 'skip';
  reason?: string;
};

type IndexEntry = {
  day: string;
  slug: string;
  title: string;
  source: string[];
};

const OUT_DIR = 'src/content/references';

const turndown = new TurndownService({
  codeBlockStyle: 'fenced',
  headingStyle: 'atx',
});
turndown.use(gfm);

turndown.remove(['script', 'style', 'iframe', 'nav', 'img']);

async function urlToMarkdown(url: string): Promise<string> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const html = await response.text();

  const dom = new JSDOM(html, { url });

  const article = new Readability(dom.window.document).parse();

  if (!article?.content) {
    throw new Error('No readable content');
  }

  return turndown.turndown(article.content);
}

async function main() {
  const inputs: Input[] = JSON.parse(await readFile('scripts/references.json', 'utf8'));

  const index: IndexEntry[] = [];

  for (const ref of inputs) {
    if (ref.mode === 'skip') {
      console.log(`skip ${ref.title}`);
      continue;
    }

    const markdownParts: string[] = [];
    const sources: string[] = [];

    for (const url of ref.urls) {
      try {
        let markdown = await urlToMarkdown(url);

        // Clean headings produced from linked MDN headings.
        markdown = markdown.replace(/^\*{2}(#{2,6}) \[([^\]]+)\]\([^)]+\)\*{2}$/gm, '$1 $2');

        // Remove standalone language labels before fenced code blocks.
        markdown = markdown.replace(
          /^(js|javascript|html|css|json|bash|shell|text)\s*\n\s*(?=```)/gim,
          ''
        );

        // Remove excessive blank lines.
        markdown = markdown.replace(/\n{3,}/g, '\n\n').trim();

        markdownParts.push(markdown);
        sources.push(new URL(url).hostname);

        console.log(`ok   ${url}`);
      } catch (error) {
        console.log(`FAIL ${url} (${(error as Error).message})`);
      }
    }

    if (markdownParts.length === 0) {
      console.log(`SKIP ${ref.slug} (no content imported)`);
      continue;
    }

    const dayDir = `${OUT_DIR}/${ref.day}`;

    await mkdir(dayDir, { recursive: true });

    const output = markdownParts.join('\n\n---\n\n');

    await writeFile(`${dayDir}/${ref.slug}.md`, output, 'utf8');

    index.push({
      day: ref.day,
      slug: ref.slug,
      title: ref.title,
      source: [...new Set(sources)],
    });
  }

  await mkdir(OUT_DIR, { recursive: true });

  await writeFile(`${OUT_DIR}/index.json`, JSON.stringify(index, null, 2), 'utf8');

  console.log(`\nImported ${index.length} references.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
