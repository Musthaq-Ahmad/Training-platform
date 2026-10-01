import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_DIR = 'scripts/local-sources/prisma';
const OUT_DIR = 'src/content/references';

type LocalReference = {
  file: string;
  dayId: string;
  name: string; // output file name, and the topic id once lowercased
  title: string;
};

// Edit the titles if you want different wording
const REFERENCES: LocalReference[] = [
  {
    file: 'getting-started.mdx',
    dayId: 'prisma-day-01',
    name: 'prismaGettingStarted',
    title: 'Choose a Prisma ORM Setup Path',
  },
  {
    file: 'reading-data.mdx',
    dayId: 'prisma-day-01',
    name: 'prismaReadingData',
    title: 'Reading Data',
  },
  {
    file: 'writing-data.mdx',
    dayId: 'prisma-day-01',
    name: 'prismaWritingData',
    title: 'Writing Data',
  },
  {
    file: 'filter-pagination-data.mdx',
    dayId: 'prisma-day-02',
    name: 'prismaFilterPagination',
    title: 'Filtering and Pagination',
  },
  { file: 'supertest.md', dayId: 'prisma-day-03', name: 'prismaSupertest', title: 'Supertest' },
];

function stripFrontmatter(text: string): string {
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

function clean(raw: string): string {
  let text = stripFrontmatter(raw).replace(/\r\n/g, '\n');

  // <Card ... title="X">body</Card> -> "- **X**: body"
  // (assumes the opening tag is on one line, as in the Prisma docs)
  text = text.replace(
    /^[ \t]*<Card\b[^\n]*\n([\s\S]*?)<\/Card>/gm,
    (match: string, inner: string) => {
      const openingTag = match.trim().split('\n')[0];
      const title = openingTag.match(/title="([^"]*)"/)?.[1];
      const body = inner.replace(/\s+/g, ' ').trim();
      return title ? `- **${title}**: ${body}\n` : `${body}\n`;
    }
  );

  const out: string[] = [];
  let inFence = false;

  for (const line of text.split('\n')) {
    const fence = line.match(/^(\s*)```(.*)$/);

    if (fence) {
      if (!inFence) {
        inFence = true;
        // keep only the language word: ```ts title="x.ts" -> ```ts
        const lang = fence[2].trim().split(/[\s{]/)[0];
        out.push(`${fence[1]}\`\`\`${lang}`);
      } else {
        inFence = false;
        out.push(line);
      }
      continue;
    }

    if (inFence) {
      out.push(line);
      continue;
    }

    if (/^\s*(import|export)\s.+from\s+['"]/.test(line)) continue; // MDX imports
    if (/^\s*<\/?[A-Z][\w.]*[^>]*>\s*$/.test(line)) continue; // <Cards>, <Tabs>, <Tab ...>
    if (/^\s*:::/.test(line)) continue; // ::: admonition markers
    if (/^\s*\[!\[.*\]\(.*\)\]\(.*\)\s*$/.test(line)) continue; // badge images

    out.push(line);
  }

  return (
    out
      .join('\n')
      .replace(/^\s*# .*\n/, '') // drop the page's own h1, we add our own title
      .replace(/\n{3,}/g, '\n\n')
      .trim() + '\n'
  );
}

async function main() {
  for (const ref of REFERENCES) {
    const raw = await readFile(path.join(SOURCE_DIR, ref.file), 'utf8');
    const outDir = path.join(OUT_DIR, ref.dayId);
    await mkdir(outDir, { recursive: true });

    const outPath = path.join(outDir, `${ref.name}.md`);
    await writeFile(outPath, `# ${ref.title}\n\n${clean(raw)}`, 'utf8');

    console.log(`ok ${ref.file} -> ${outPath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
