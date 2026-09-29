import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { marked, type Token } from 'marked';

import type { ContentTopic, ContentBlock } from '../src/content/types.ts';

const INPUT_DIR = 'src/content/references';
const OUTPUT_DIR = 'src/content/topics/js';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function camelCase(value: string): string {
  return value
    .replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
    .replace(/^([A-Z])/, (_, letter: string) => letter.toLowerCase());
}

function cleanText(value: string): string {
  const placeholders: string[] = [];

  const protectedValue = value.replace(/<([a-zA-Z][a-zA-Z0-9_-]*)>/g, (match) => {
    const token = `__ANGLE_PLACEHOLDER_${placeholders.length}__`;
    placeholders.push(match);
    return token;
  });

  const html = marked.parseInline(protectedValue) as string;

  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .replace(/__ANGLE_PLACEHOLDER_(\d+)__/g, (_, index: string) => placeholders[Number(index)])
    .trim();
}

function tokenToBlocks(tokens: Token[]): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  for (const token of tokens) {
    /*
     * Paragraphs can contain images.
     *
     * Example:
     * ![Screenshot](https://example.com/image.png)
     *
     * Marked can represent this as a paragraph containing
     * an image token rather than as a top-level image token.
     */
    if (token.type === 'paragraph') {
      const imageTokens = token.tokens?.filter((child) => child.type === 'image');

      if (imageTokens && imageTokens.length > 0) {
        for (const image of imageTokens) {
          if (image.type === 'image') {
            blocks.push({
              type: 'image',
              src: image.href,
              alt: image.text,
            });
          }
        }

        /*
         * Keep any normal text from the paragraph too.
         */
        const text = cleanText(token.text);

        if (text) {
          blocks.push({
            type: 'paragraph',
            text,
          });
        }

        continue;
      }

      const text = cleanText(token.text);

      if (text) {
        blocks.push({
          type: 'paragraph',
          text,
        });
      }

      continue;
    }

    if (token.type === 'heading') {
      const text = cleanText(token.text);

      if (token.depth >= 3 && token.depth <= 6) {
        blocks.push({
          type: 'subheading',
          level: token.depth,
          text,
        });
      }

      continue;
    }

    /*
     * Handle images that appear as top-level tokens.
     */
    if (token.type === 'image') {
      blocks.push({
        type: 'image',
        src: token.href,
        alt: token.text,
      });

      continue;
    }

    if (token.type === 'code') {
      blocks.push({
        type: 'code',
        code: {
          filename: 'example',
          language: token.lang || 'javascript',
          code: token.text,
        },
      });

      continue;
    }

    if (token.type === 'list') {
      blocks.push({
        type: 'list',
        ordered: token.ordered,
        ...(token.ordered
          ? {
              start: typeof token.start === 'number' ? token.start : Number(token.start) || 1,
            }
          : {}),
        items: token.items.map((item: { text: string }) => cleanText(item.text)),
      });

      continue;
    }

    if (token.type === 'table') {
      blocks.push({
        type: 'table',
        headers: token.header.map((cell: { text: string }) => cleanText(cell.text)),
        rows: token.rows.map((row: { text: string }[]) =>
          row.map((cell: { text: string }) => cleanText(cell.text))
        ),
      });

      continue;
    }
  }

  return blocks;
}

async function convertFile(inputPath: string, outputPath: string) {
  const markdown = await readFile(inputPath, 'utf8');

  const tokens = marked.lexer(markdown);

  const headingIndex = tokens.findIndex((token) => token.type === 'heading');

  if (headingIndex === -1) {
    console.log(`SKIP ${inputPath} (no heading)`);
    return;
  }

  const firstHeading = tokens[headingIndex];

  if (firstHeading.type !== 'heading') {
    return;
  }

  const heading = cleanText(firstHeading.text);

  const topicHeading = heading === 'A variable' ? 'JavaScript Fundamentals' : heading;

  const blocks = tokenToBlocks(tokens.slice(headingIndex + 1));

  const id = slugify(path.basename(inputPath, '.md'));

  const topic: ContentTopic = {
    id,
    heading: topicHeading,
    blocks,
  };

  const exportName = `${camelCase(id)}Topics`;

  await writeFile(
    outputPath,
    `import type { ContentTopic } from '../../../types';

export const ${exportName} = {
  '${id}': ${JSON.stringify(topic, null, 2)},
} satisfies Record<string, ContentTopic>;
`,
    'utf8'
  );

  console.log(`ok ${inputPath} -> ${outputPath}`);
}

async function main() {
  const dayDirs = await readdir(INPUT_DIR, {
    withFileTypes: true,
  });

  for (const dayDir of dayDirs) {
    if (!dayDir.isDirectory() || !dayDir.name.startsWith('js-day-')) {
      continue;
    }

    const inputDir = path.join(INPUT_DIR, dayDir.name);

    const outputDir = path.join(OUTPUT_DIR, dayDir.name);

    await mkdir(outputDir, {
      recursive: true,
    });

    const files = await readdir(inputDir);

    for (const file of files) {
      if (!file.endsWith('.md')) {
        continue;
      }

      await convertFile(
        path.join(inputDir, file),
        path.join(outputDir, `${file.replace('.md', '.ts')}`)
      );
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
