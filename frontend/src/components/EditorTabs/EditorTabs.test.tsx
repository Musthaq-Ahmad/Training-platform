import { describe, it, expect, vi } from 'vitest';
import type { ComponentProps } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditorTabs from './EditorTabs';

function renderTabs(overrides: Partial<ComponentProps<typeof EditorTabs>> = {}) {
  const onActivate = vi.fn();
  const onClose = vi.fn();
  const onCloseAll = vi.fn();

  render(
    <EditorTabs
      openPaths={['a.ts', 'b.ts']}
      activePath="a.ts"
      dirtyPaths={new Set()}
      onActivate={onActivate}
      onClose={onClose}
      onCloseAll={onCloseAll}
      {...overrides}
    />
  );

  return { onActivate, onClose, onCloseAll };
}

describe('EditorTabs', () => {
  it('renders one tab per open path', () => {
    renderTabs();
    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });

  it('marks the active tab with aria-selected', () => {
    renderTabs();
    expect(screen.getByRole('tab', { name: /a\.ts/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /b\.ts/ })).toHaveAttribute('aria-selected', 'false');
  });

  it('activates a tab on click', async () => {
    const user = userEvent.setup();
    const { onActivate } = renderTabs();

    await user.click(screen.getByRole('tab', { name: /b\.ts/ }));
    expect(onActivate).toHaveBeenCalledWith('b.ts');
  });

  it('closes only, without activating, when the close button is clicked', async () => {
    const user = userEvent.setup();
    const { onActivate, onClose } = renderTabs();

    await user.click(screen.getByRole('button', { name: 'Close b.ts' }));
    expect(onClose).toHaveBeenCalledWith('b.ts');
    expect(onActivate).not.toHaveBeenCalled();
  });

  it('closes on middle-click', () => {
    const { onClose } = renderTabs();
    fireEvent.mouseDown(screen.getByRole('tab', { name: /b\.ts/ }), { button: 1 });
    expect(onClose).toHaveBeenCalledWith('b.ts');
  });

  it('shows the dirty dot with its accessible label', () => {
    renderTabs({ dirtyPaths: new Set(['a.ts']) });
    expect(screen.getByLabelText('Unsaved changes')).toBeInTheDocument();
  });

  it('closes all tabs from the kebab menu', async () => {
    const user = userEvent.setup();
    const { onCloseAll } = renderTabs();

    await user.click(screen.getByRole('button', { name: 'Tab options' }));
    await user.click(screen.getByRole('menuitem', { name: 'Close all tabs' }));

    expect(onCloseAll).toHaveBeenCalledTimes(1);
  });

  it('opens the menu with focus on its item, and Escape closes it back to the kebab button', async () => {
    const user = userEvent.setup();
    renderTabs();

    const kebab = screen.getByRole('button', { name: 'Tab options' });
    await user.click(kebab);

    const menuItem = screen.getByRole('menuitem', { name: 'Close all tabs' });
    expect(menuItem).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(kebab).toHaveFocus();
  });

  it('closes the menu on an outside click', async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByRole('button', { name: 'Tab options' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.click(document.body);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('moves focus among menu items with the arrow keys without closing the menu', async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByRole('button', { name: 'Tab options' }));
    const menuItem = screen.getByRole('menuitem', { name: 'Close all tabs' });
    expect(menuItem).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(menuItem).toHaveFocus();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('shows the folder suffix when two open tabs share a name', () => {
    renderTabs({ openPaths: ['a/math.ts', 'b/math.ts'], activePath: 'a/math.ts' });
    expect(screen.getAllByText('math.ts')).toHaveLength(2);
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });
});
