const IDENTIFIER_CHAR = /[A-Za-z0-9_]/;
const DOLLAR_TAG = /^\$(?:[A-Za-z_][A-Za-z0-9_]*)?\$/;

/** Index just after the closing quote of a '…' string or "…" identifier that starts at `start`. */
function quoteEnd(text: string, start: number, quote: string, backslashEscapes: boolean): number {
  let index = start + 1;
  while (index < text.length) {
    const char = text[index];
    if (backslashEscapes && char === '\\') {
      index += 2;
    } else if (char === quote) {
      if (text[index + 1] === quote) {
        index += 2; // '' or "" is an escaped quote
      } else {
        return index + 1;
      }
    } else {
      index += 1;
    }
  }
  return text.length;
}

/** Index just after a (possibly nested) /* … *\/ comment that starts at `start`. */
function blockCommentEnd(text: string, start: number): number {
  let depth = 1;
  let index = start + 2;
  while (index < text.length && depth > 0) {
    if (text.startsWith('/*', index)) {
      depth += 1;
      index += 2;
    } else if (text.startsWith('*/', index)) {
      depth -= 1;
      index += 2;
    } else {
      index += 1;
    }
  }
  return index;
}

/**
 * Splits SQL text into statements on `;`, the way Postgres would: semicolons inside '…' strings,
 * "…" identifiers, -- and /* *\/ comments and $$…$$ (or $tag$…$tag$) bodies don't count.
 * Comments are removed from the result; empty statements are dropped.
 */
export function splitStatements(text: string): string[] {
  const statements: string[] = [];
  let current = '';
  let index = 0;

  const finish = () => {
    const statement = current.trim();
    if (statement) statements.push(statement);
    current = '';
  };

  while (index < text.length) {
    const char = text[index];
    const previous = index > 0 ? text[index - 1] : '';

    if (char === '-' && text[index + 1] === '-') {
      const lineEnd = text.indexOf('\n', index);
      index = lineEnd === -1 ? text.length : lineEnd;
    } else if (char === '/' && text[index + 1] === '*') {
      index = blockCommentEnd(text, index);
      current += ' ';
    } else if (char === "'" || char === '"') {
      // E'…' strings allow backslash escapes: E'it\'s'
      const isEscapeString = char === "'" && /[Ee]/.test(previous);
      const end = quoteEnd(text, index, char, isEscapeString);
      current += text.slice(index, end);
      index = end;
    } else if (char === '$' && !IDENTIFIER_CHAR.test(previous)) {
      const tag = DOLLAR_TAG.exec(text.slice(index))?.[0];
      if (tag) {
        const close = text.indexOf(tag, index + tag.length);
        const end = close === -1 ? text.length : close + tag.length;
        current += text.slice(index, end);
        index = end;
      } else {
        current += char; // $1 parameter
        index += 1;
      }
    } else if (char === ';') {
      finish();
      index += 1;
    } else {
      current += char;
      index += 1;
    }
  }
  finish();

  return statements;
}

const TWO_WORD_COMMANDS = [
  'CREATE',
  'DROP',
  'ALTER',
  'START',
  'TRUNCATE',
  'COMMENT',
  'REFRESH',
  'GRANT',
  'REVOKE',
];

/** 'create table x (…)' → 'CREATE TABLE', 'select 1' → 'SELECT', 'create unique index …' → 'CREATE UNIQUE' */
export function statementLabel(statement: string): string {
  const words = statement
    .trim()
    .split(/[\s(]+/)
    .filter(Boolean);
  const first = (words[0] ?? '').toUpperCase();
  if (TWO_WORD_COMMANDS.includes(first) && words[1]) return `${first} ${words[1].toUpperCase()}`;
  return first;
}
