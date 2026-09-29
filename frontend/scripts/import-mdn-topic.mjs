// frontend/scripts/import-mdn-topic.mjs
//
// Fetches a raw MDN markdown page, strips KumaScript macros/MDN-specific
// syntax, removes hands-on exercises, downloads referenced images into
// src/content/assets/<courseId>/, and writes draft ContentTopic objects
// (blocks in original document order) to scripts/output/<draftName>-draft.json
// for manual review.
//
// Usage:
//   node scripts/import-mdn-topic.mjs <mdn-path> <courseId> [sourceUrl] [draftName]

import fs from 'node:fs/promises';
import path from 'node:path';

const [, , mdnPath, courseId, explicitSourceUrl, draftName = courseId] = process.argv;

if (!mdnPath || !courseId) {
  console.error(
    'Usage: node scripts/import-mdn-topic.mjs <mdn-path> <courseId> [sourceUrl] [draftName]'
  );
  process.exit(1);
}

const RAW_BASE = 'https://raw.githubusercontent.com/mdn/content/main/files/en-us';

const ASSETS_DIR = path.resolve('src/content/assets', courseId);

const LIST_ITEM_RE = /^(-|\d+\.)\s+(.*)$/;
const IMAGE_LINE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const HEADING_RE = /^(#{3,6})\s+(.*)$/;
const NOTE_RE = /^>\s*\[!NOTE\]/;

const TABLE_ROW_RE = /^\|.*\|$/;
const TABLE_SEPARATOR_RE = /^\|(?:\s*:?-{2,}:?\s*\|)+$/;

// Whole "## X" sections that are reference-only noise for trainees
const DROP_SECTIONS = new Set([
  'see also',
  'browser compatibility',
  'specifications',
  'technical summary',
]);

// A block matching this starts an exercise: it and everything after it in the
// same subsection is removed.
const EXERCISE_START_RE =
  /playground|click\s+"?play"?|follow the steps below|practice (?:at )?writing|feeling adventurous/i;

// Outbound partner promos (dropped, they point trainees off-platform)
const PROMO_RE = /scrimba|learning partner/i;

// "This renders as follows:" and similar lines only introduce a live preview,
// which we can't reproduce. Removed automatically (and logged).
const DANGLING_RENDER_RE =
  /^(this|that|these|the above|they both)\b[^.!?]{0,60}\brenders?\b[^.!?]{0,30}:$/i;

// Longer sentences that mention a removed preview can't be auto-removed
// safely, so they only produce a warning for manual editing.
const PREVIEW_REFERENCE_RE =
  /live output|below rendering|rendering below|output panel|rendered (below|above)/i;

function indentOf(line) {
  return line.length - line.trimStart().length;
}

function stripInline(text) {
  // Swap inline code spans for placeholders so link/bold syntax wrapping a
  // code span (e.g. [`<h1>`](url), **`class`**) is still stripped, while the
  // code itself is restored untouched.
  const codeSpans = [];

  let result = text.replace(/`[^`]*`/g, (match) => {
    codeSpans.push(match);
    return `\uE000${codeSpans.length - 1}\uE000`;
  });

  result = result
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/?[a-z][^>]*>/gi, '');

  result = result.replace(/\uE000(\d+)\uE000/g, (_, i) => codeSpans[Number(i)]);

  return result.replace(/\s+/g, ' ').trim();
}

// Splits "| a | b |" into ["a", "b"], ignoring escaped pipes (\|) inside cells
function splitTableRow(line) {
  return line
    .split(/(?<!\\)\|/)
    .slice(1, -1)
    .map((cell) => stripInline(cell.replace(/\\\|/g, '|')));
}

// MDN uses flags like "html-nolint" in the fence info string;
// keep the real language.
function normalizeLang(raw) {
  return (raw || 'plain').replace(/-nolint$/, '');
}

function isBlockStart(trimmed) {
  return (
    trimmed.startsWith('```') ||
    NOTE_RE.test(trimmed) ||
    LIST_ITEM_RE.test(trimmed) ||
    HEADING_RE.test(trimmed) ||
    IMAGE_LINE_RE.test(trimmed) ||
    /^<table\b/i.test(trimmed) ||
    TABLE_ROW_RE.test(trimmed)
  );
}

function parseBlocks(body, heading) {
  const lines = body.split('\n');
  const blocks = [];
  let idx = 0;

  const nextNonBlank = (from) => {
    let j = from;

    while (j < lines.length && lines[j].trim() === '') {
      j++;
    }

    return j;
  };

  while (idx < lines.length) {
    idx = nextNonBlank(idx);

    if (idx >= lines.length) {
      break;
    }

    const line = lines[idx];
    const trimmed = line.trim();
    const indent = indentOf(line);

    // Code fence — matched on the trimmed line so fences nested under a list
    // item (indented) are recognized; content is dedented by the fence's indent.
    const fenceMatch = trimmed.match(/^```([a-zA-Z0-9-]*)/);

    if (fenceMatch) {
      idx++;

      const codeLines = [];

      while (idx < lines.length && !lines[idx].trim().startsWith('```')) {
        codeLines.push(lines[idx].slice(Math.min(indent, indentOf(lines[idx]))));

        idx++;
      }

      idx++;

      const language = normalizeLang(fenceMatch[1]);

      const code = codeLines.join('\n').replace(/^\n+/, '').trimEnd();

      // The planets table in "What is a table?" is a normal HTML code fence
      // in MDN, but it is an actual rendered table example, so render it
      // statically instead of showing the HTML source.
      const isPlanetsTable =
        heading === 'What is a table?' &&
        language === 'html' &&
        code.includes('<table>') &&
        code.includes('Data about the planets of our solar system');

      if (isPlanetsTable) {
        blocks.push({
          type: 'htmlTable',
          html: code,
        });
      } else if (language === 'html-live-sample') {
        // MDN live-sample HTML is rendered statically on our platform.
        // No Play button or interactive preview is needed.
        blocks.push({
          type: 'htmlTable',
          html: code,
        });
      } else {
        blocks.push({
          type: 'code',
          code: {
            filename: '',
            language,
            code,
          },
        });
      }

      continue;
    }

    // Standalone image line -> image block, kept in document position
    const imgMatch = trimmed.match(IMAGE_LINE_RE);

    if (imgMatch) {
      blocks.push({
        type: 'image',
        filename: imgMatch[2],
        alt: imgMatch[1],
      });

      idx++;
      continue;
    }

    // > [!NOTE] callout
    if (NOTE_RE.test(trimmed)) {
      idx++;

      const noteLines = [];

      while (idx < lines.length && lines[idx].trim().startsWith('>')) {
        noteLines.push(lines[idx].trim().replace(/^>\s?/, ''));
        idx++;
      }

      const cleanBody = stripInline(noteLines.join(' '));

      if (cleanBody) {
        blocks.push({
          type: 'callout',
          callout: {
            variant: 'info',
            title: 'Note',
            body: cleanBody,
          },
        });
      }

      continue;
    }

    // ### / #### sub-headings -> visible subheading blocks
    const headingMatch = trimmed.match(HEADING_RE);

    if (headingMatch) {
      const text = stripInline(headingMatch[2]);

      if (text) {
        blocks.push({
          type: 'subheading',
          level: headingMatch[1].length,
          text,
        });
      }

      idx++;
      continue;
    }

    // HTML table -> htmlTable block
    if (/^<table\b/i.test(trimmed)) {
      const tableLines = [];

      while (idx < lines.length) {
        tableLines.push(lines[idx]);

        if (/<\/table>\s*$/i.test(lines[idx].trim())) {
          idx++;
          break;
        }

        idx++;
      }

      blocks.push({
        type: 'htmlTable',
        html: tableLines.join('\n'),
      });

      continue;
    }

    // Markdown table -> table block
    if (TABLE_ROW_RE.test(trimmed)) {
      const rows = [];

      while (idx < lines.length && TABLE_ROW_RE.test(lines[idx].trim())) {
        rows.push(lines[idx].trim());
        idx++;
      }

      const [headerRow, ...bodyRows] = rows.filter((r) => !TABLE_SEPARATOR_RE.test(r));

      if (headerRow) {
        blocks.push({
          type: 'table',
          headers: splitTableRow(headerRow),
          rows: bodyRows.map(splitTableRow),
        });
      }

      continue;
    }

    // Lists (bullet, numbered, and MDN definition lists)
    const listMatch = trimmed.match(LIST_ITEM_RE);

    if (listMatch) {
      const baseIndent = indent;
      const ordered = /^\d+\./.test(listMatch[1]);
      const start = ordered ? parseInt(listMatch[1], 10) : undefined;

      const entries = [];

      while (idx < lines.length) {
        const cur = lines[idx];
        const curTrim = cur.trim();
        const curIndent = indentOf(cur);

        if (curTrim === '') {
          const peek = nextNonBlank(idx);

          if (
            peek < lines.length &&
            LIST_ITEM_RE.test(lines[peek].trim()) &&
            indentOf(lines[peek]) >= baseIndent
          ) {
            idx = peek;
            continue;
          }

          break;
        }

        const itemMatch = curTrim.match(LIST_ITEM_RE);

        if (itemMatch) {
          if (curIndent < baseIndent) {
            break;
          }

          entries.push({
            text: itemMatch[2],
            indent: curIndent,
          });

          idx++;
          continue;
        }

        // Wrapped continuation line of the previous item
        if (curIndent > baseIndent && entries.length > 0 && !isBlockStart(curTrim)) {
          entries[entries.length - 1].text += ` ${curTrim}`;
          idx++;
          continue;
        }

        break;
      }

      const nested = entries.filter((e) => e.indent > baseIndent);

      const descIndent = nested.length ? Math.min(...nested.map((e) => e.indent)) : null;

      // MDN definition list: "- term" followed by indented "- : description"
      const isDefinitionList =
        nested.length > 0 &&
        nested.filter((e) => e.indent === descIndent).every((e) => e.text.startsWith(': '));

      if (isDefinitionList) {
        const defs = [];

        for (const e of entries) {
          if (e.indent === baseIndent) {
            defs.push({
              term: e.text,
              description: '',
              hasDeepContent: false,
            });

            continue;
          }

          const def = defs[defs.length - 1];

          if (e.indent === descIndent) {
            def.description += ` ${e.text.replace(/^:\s*/, '')}`;
          } else {
            def.description += ` ${e.text}`;
            def.hasDeepContent = true;
          }
        }

        for (const def of defs) {
          if (def.hasDeepContent) {
            console.warn(
              `⚠ "${heading}": a nested list inside the description of ${def.term} was merged into text — review manually.`
            );
          }
        }

        blocks.push({
          type: 'definitions',
          items: defs
            .map((d) => ({
              term: stripInline(d.term),
              description: stripInline(d.description),
            }))
            .filter((d) => d.term),
        });

        continue;
      }

      if (nested.length > 0) {
        console.warn(`⚠ "${heading}": nested list flattened into one list — review manually.`);
      }

      const cleaned = entries.map((e) => stripInline(e.text)).filter(Boolean);

      if (cleaned.length) {
        blocks.push({
          type: 'list',
          ordered,
          ...(ordered && start !== 1 ? { start } : {}),
          items: cleaned,
        });
      }

      continue;
    }

    // Paragraph — always consumes its first line, then continues until a
    // blank line or the next recognized block
    const paraLines = [trimmed];

    idx++;

    while (idx < lines.length && lines[idx].trim() !== '' && !isBlockStart(lines[idx].trim())) {
      paraLines.push(lines[idx].trim());
      idx++;
    }

    const text = stripInline(paraLines.join(' '));

    if (text) {
      blocks.push({
        type: 'paragraph',
        text,
      });
    }
  }

  return blocks;
}

function blockText(block) {
  switch (block.type) {
    case 'paragraph':
    case 'subheading':
      return block.text;

    case 'list':
      return block.items.join(' ');

    case 'callout':
      return block.callout.body;

    default:
      return '';
  }
}

function preview(block) {
  const text = blockText(block);

  return `[${block.type}] ${text.slice(0, 60)}${text.length > 60 ? '…' : ''}`;
}

// Removes exercise content (and partner promos).
// On the first exercise marker inside a subsection, everything up to the
// next subsection of the same or a higher level is dropped.
function removeExercises(blocks, heading) {
  const kept = [];

  let currentLevel = null;
  let dropUntilLevel = null;

  const drop = (block) => console.log(`  − "${heading}": removed ${preview(block)}`);

  for (const block of blocks) {
    if (block.type === 'subheading') {
      currentLevel = block.level;

      if (dropUntilLevel !== null && block.level <= dropUntilLevel) {
        dropUntilLevel = null;
      }

      if (dropUntilLevel === null) {
        kept.push(block);
      } else {
        drop(block);
      }

      continue;
    }

    if (dropUntilLevel !== null) {
      drop(block);
      continue;
    }

    const text = blockText(block);

    if (block.type === 'callout' && PROMO_RE.test(text)) {
      drop(block);
      continue;
    }

    if (EXERCISE_START_RE.test(text)) {
      if (currentLevel !== null) {
        dropUntilLevel = currentLevel;
      }

      drop(block);
      continue;
    }

    kept.push(block);
  }

  return kept;
}

function removeDanglingRenderLines(blocks, heading) {
  return blocks.filter((block) => {
    if (block.type !== 'paragraph') {
      return true;
    }

    if (DANGLING_RENDER_RE.test(block.text)) {
      console.log(`  − "${heading}": removed ${preview(block)}`);

      return false;
    }

    if (PREVIEW_REFERENCE_RE.test(block.text)) {
      console.warn(
        `⚠ "${heading}": refers to a removed live preview, edit manually: "${block.text.slice(
          0,
          70
        )}…"`
      );
    }

    return true;
  });
}

// Removes subheadings left with no content after exercise removal
function pruneEmptySubheadings(blocks, heading) {
  let result = blocks;
  let changed = true;

  while (changed) {
    changed = false;

    result = result.filter((block, i) => {
      if (block.type !== 'subheading') {
        return true;
      }

      const next = result[i + 1];

      const isEmpty = !next || (next.type === 'subheading' && next.level <= block.level);

      if (isEmpty) {
        console.log(`  − "${heading}": removed empty ${preview(block)}`);

        changed = true;
      }

      return !isEmpty;
    });
  }

  return result;
}

async function main() {
  const mdUrl = `${RAW_BASE}/${mdnPath}/index.md`;

  console.log(`Fetching ${mdUrl}`);

  const res = await fetch(mdUrl);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${mdUrl}: ${res.status}`);
  }

  let text = await res.text();

  // Remove front matter
  text = text.replace(/^---[\s\S]*?---\n/, '');

  // IMPORTANT:
  // Do NOT convert remaining HTML tables to Markdown.
  // We preserve their original HTML structure so rowspan/colspan
  // and other table markup are not lost.

  // Remove exercise solutions
  text = text.replace(/<details>[\s\S]*?<\/details>/g, '');

  // Hidden live-sample fences only feed MDN's live preview
  // and are never shown as code: drop them.
  text = text.replace(/```[^\n]*\bhidden\b[^\n]*live-sample___[^\n]*\n[\s\S]*?```/g, '');

  // Visible live-sample fences contain examples that MDN renders interactively.
  // Keep a special language marker so the parser can render them statically.
  text = text.replace(/```([a-zA-Z0-9-]*)[^\n]*live-sample___[^\n]*\n/g, '```$1-live-sample\n');

  text = text.replace(/\{\{\s*EmbedLiveSample\([^)]*\)\s*\}\}/gi, '');

  text = text.replace(/\{\{NextMenu\([^)]*\)\}\}/g, '');

  text = text.replace(/\{\{\s*PreviousMenuNext\([^)]*\)\s*\}\}/gi, '');

  // Macros with no equivalent on our platform:
  // interactive demos, spec/compat tables
  text = text.replace(/\{\{\s*InteractiveExample\([^}]*\}\}/gi, '');

  text = text.replace(/\{\{\s*(?:Specifications|Compat)\s*(?:\([^}]*\))?\s*\}\}/gi, '');

  // {{glossary("term")}} / {{ glossary("term", "label") }}
  // -> plain text
  text = text.replace(
    /\{\{\s*glossary\(\s*["']([^"']+)["'](?:\s*,\s*["']([^"']+)["'])?[^}]*\}\}/gi,
    (_, term, label) => label ?? term
  );

  // {{htmlelement('img')}} -> `<img>`
  text = text.replace(
    /\{\{\s*htmlelement\(\s*["']([^"']+)["'](?:\s*,\s*["']([^"']+)["'])?[^}]*\}\}/gi,
    (_, name, label) => `\`<${label ?? name}>\``
  );

  // Remove MDN-only status markers
  text = text.replace(
    /\{\{\s*(?:deprecated_inline|experimental_inline|experimentalinline|non-standard_inline)\s*\}\}/gi,
    ''
  );

  // {{jsxref()}}, {{domxref()}}, {{cssxref()}} -> `label`
  text = text.replace(
    /\{\{\s*(?:jsxref|domxref|cssxref)\(\s*["']([^"']+)["'](?:\s*,\s*["']([^"']+)["'])?[^}]*\}\}/gi,
    (_, target, label) => `\`${label ?? target.split('/').pop()}\``
  );

  const leftoverMacros = text.match(/\{\{[^}]+\}\}/g);

  if (leftoverMacros) {
    console.warn('⚠ Unhandled macros found — review manually:', leftoverMacros);
  }

  const sectionChunks = text
    .split(/^## /m)
    .slice(1)
    .filter((chunk) => {
      const title = chunk.split('\n')[0].trim().toLowerCase();

      if (DROP_SECTIONS.has(title)) {
        console.log(`  − dropped section "${title}"`);

        return false;
      }

      return true;
    });

  const draftTopics = [];
  let imageCounter = 0;

  const sourceUrl =
    explicitSourceUrl ??
    `https://developer.mozilla.org/en-US/docs/${mdnPath
      .split('/')
      .map((s) => s[0].toUpperCase() + s.slice(1))
      .join('/')}`;

  if (!explicitSourceUrl) {
    console.warn(
      '⚠ No explicit sourceUrl passed — best-effort URL may have wrong casing. Verify manually.'
    );
  }

  for (const chunk of sectionChunks) {
    const [headingLine, ...rest] = chunk.split('\n');

    const heading = headingLine.trim();
    const body = rest.join('\n');

    let blocks = pruneEmptySubheadings(
      removeDanglingRenderLines(removeExercises(parseBlocks(body, heading), heading), heading),
      heading
    );

    blocks = blocks.filter((block) => {
      if (block.type === 'image' && /^https?:\/\//.test(block.filename)) {
        console.warn(`⚠ Dropped absolute image URL (not an MDN local asset): ${block.filename}`);

        return false;
      }

      return true;
    });

    // Download only images that survived exercise removal
    for (const block of blocks) {
      if (block.type !== 'image') {
        continue;
      }

      const imgUrl = `${RAW_BASE}/${mdnPath}/${block.filename}`;

      const imgRes = await fetch(imgUrl);

      if (!imgRes.ok) {
        console.warn(
          `⚠ Failed to fetch image ${imgUrl}: ${imgRes.status} — block kept, fix or remove it manually.`
        );

        continue;
      }

      await fs.mkdir(ASSETS_DIR, {
        recursive: true,
      });

      const destPath = path.join(ASSETS_DIR, block.filename);

      await fs.writeFile(destPath, Buffer.from(await imgRes.arrayBuffer()));

      console.log(`Saved image: ${destPath}`);

      imageCounter++;
    }

    const id = `${draftName}-${heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}`;

    draftTopics.push({
      id,
      heading,
      blocks,
      sourceUrl,
    });
  }

  const outDir = path.resolve('scripts/output');

  await fs.mkdir(outDir, {
    recursive: true,
  });

  const outFile = path.join(outDir, `${draftName}-draft.json`);

  await fs.writeFile(outFile, JSON.stringify(draftTopics, null, 2));

  console.log(`\nDone. ${draftTopics.length} draft topic(s), ${imageCounter} image(s) saved.`);

  console.log(`Review: ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
