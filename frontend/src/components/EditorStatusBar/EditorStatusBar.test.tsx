import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EditorStatusBar from './EditorStatusBar';

describe('EditorStatusBar', () => {
  it('shows the current line and column', () => {
    render(<EditorStatusBar languageLabel="TypeScript" line={3} column={7} isTooLarge={false} />);
    expect(screen.getByText('Ln 3, Col 7')).toBeInTheDocument();
  });

  it('shows the size warning only when isTooLarge', () => {
    const { rerender } = render(
      <EditorStatusBar languageLabel="TypeScript" line={1} column={1} isTooLarge={false} />
    );
    expect(screen.queryByText(/too large to save/i)).not.toBeInTheDocument();

    rerender(<EditorStatusBar languageLabel="TypeScript" line={1} column={1} isTooLarge />);
    expect(screen.getByText(/too large to save/i)).toBeInTheDocument();
  });
});
