import type { ReactNode } from 'react';

/** Turns `backtick` text into <code>. Everything else stays plain text (no HTML is ever injected). */
export function renderInlineCode(text: string): ReactNode[] {
  return text
    .split('`')
    .map((part, index) => (index % 2 === 1 ? <code key={index}>{part}</code> : part));
}
