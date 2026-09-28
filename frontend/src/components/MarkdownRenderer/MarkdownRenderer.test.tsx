import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import MarkdownRenderer from './MarkdownRenderer';

function renderMarkdown(markdown: string) {
  return render(
    <MemoryRouter>
      <MarkdownRenderer markdown={markdown} />
    </MemoryRouter>
  );
}

describe('MarkdownRenderer', () => {
  it('shows a <script> tag as literal text instead of executing it', () => {
    renderMarkdown('Before <script>window.__hacked = true</script> after');

    expect(document.querySelector('script')).not.toBeInTheDocument();
    expect(screen.getByText(/<script>/)).toBeInTheDocument();
  });

  it('renders an external link as plain text, not an anchor', () => {
    renderMarkdown('[MDN](https://developer.mozilla.org)');

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('MDN')).toBeInTheDocument();
  });

  it('renders an internal link as a real anchor with that href', () => {
    renderMarkdown('[Day 1](/days/1)');

    expect(screen.getByRole('link', { name: 'Day 1' })).toHaveAttribute('href', '/days/1');
  });

  it('renders inline code inside a <code> element', () => {
    renderMarkdown('Run `npm test` to check.');

    const code = screen.getByText('npm test');
    expect(code.tagName).toBe('CODE');
  });
});
