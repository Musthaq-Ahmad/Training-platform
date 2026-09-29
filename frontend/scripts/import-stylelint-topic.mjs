import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const [, , inputFile, outputName] = process.argv;

if (!inputFile || !outputName) {
  console.error('Usage: node scripts/import-stylelint-topic.mjs <html-file> <output-name>');
  process.exit(1);
}

const html = fs.readFileSync(inputFile, 'utf8');
const $ = cheerio.load(html);

const article = $('article');

if (!article.length) {
  throw new Error('Could not find <article> in the HTML.');
}

const topics = [];
let currentTopic = null;

function createTopic(heading) {
  const idPart = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  currentTopic = {
    id: `${outputName}-${idPart}`,
    heading,
    blocks: [],
  };

  topics.push(currentTopic);
}

function addBlock(block) {
  if (currentTopic) {
    currentTopic.blocks.push(block);
  }
}

function extractCode(element) {
  const code = $(element).find('code').text().trim();

  if (!code) return null;

  const languageClass = $(element)
    .find('pre')
    .attr('class')
    ?.match(/language-([a-z0-9_-]+)/i);

  return {
    type: 'code',
    code: {
      filename: '',
      language: languageClass?.[1] ?? 'text',
      code,
    },
  };
}

article
  .find('h2, h3, h4, p, ul, ol, div.theme-admonition, div.codeBlockContainer_Ckt0')
  .each((_, element) => {
    const tag = element.tagName?.toLowerCase();

    if (['h2', 'h3', 'h4'].includes(tag)) {
      const heading = $(element).clone().find('a').remove().end().text().trim();

      if (heading) {
        createTopic(heading);
      }

      return;
    }

    if (!currentTopic) return;

    if (tag === 'p') {
      if ($(element).closest('.theme-admonition').length) {
        return;
      }

      const text = $(element).text().trim();

      if (text) {
        addBlock({
          type: 'paragraph',
          text,
        });
      }

      return;
    }

    if (tag === 'ul' || tag === 'ol') {
      const items = $(element)
        .children('li')
        .map((_, li) => {
          const clone = $(li).clone();

          clone.find('div.codeBlockContainer_Ckt0').remove();

          return clone.text().trim();
        })
        .get()
        .filter(Boolean);
      if (items.length) {
        addBlock({
          type: 'list',
          ordered: tag === 'ol',
          items,
        });
      }

      return;
    }

    if ($(element).hasClass('codeBlockContainer_Ckt0') && $(element).find('pre code').length) {
      const block = extractCode(element);

      if (block) {
        addBlock(block);
      }

      return;
    }

    if ($(element).hasClass('theme-admonition')) {
      const title = $(element).find('.admonitionHeading_Gvgb').text().trim();

      const body = $(element).find('.admonitionContent_BuS1').text().trim();

      if (body) {
        addBlock({
          type: 'callout',
          callout: {
            variant: 'info',
            title: title || 'Note',
            body,
          },
        });
      }
    }
  });

const outputDir = 'scripts/output';

fs.mkdirSync(outputDir, { recursive: true });

const outputFile = path.join(outputDir, `${outputName}-draft.json`);

fs.writeFileSync(outputFile, JSON.stringify(topics, null, 2));

console.log(`Created ${outputFile}`);
console.log(`Generated ${topics.length} topics`);
