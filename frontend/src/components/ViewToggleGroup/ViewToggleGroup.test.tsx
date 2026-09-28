import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ViewToggleGroup from './ViewToggleGroup';

describe('ViewToggleGroup', () => {
  it('renders three buttons with the right aria-pressed state', () => {
    render(
      <ViewToggleGroup
        visiblePanes={{ sidebar: true, code: true, result: false }}
        onToggle={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /instructions/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: /code/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /result/i })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('calls onToggle with the right pane id', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <ViewToggleGroup
        visiblePanes={{ sidebar: true, code: true, result: false }}
        onToggle={onToggle}
      />
    );

    await user.click(screen.getByRole('button', { name: /result/i }));
    expect(onToggle).toHaveBeenCalledWith('result');
  });

  it('marks the only visible pane as aria-disabled and ignores clicks on it', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <ViewToggleGroup
        visiblePanes={{ sidebar: false, code: true, result: false }}
        onToggle={onToggle}
      />
    );

    const codeButton = screen.getByRole('button', { name: /code/i });
    expect(codeButton).toHaveAttribute('aria-disabled', 'true');

    await user.click(codeButton);
    expect(onToggle).not.toHaveBeenCalled();
  });
});
