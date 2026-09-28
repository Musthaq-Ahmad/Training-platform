import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorkspaceSidebar from './WorkspaceSidebar';

function renderSidebar(activeTab: 'instructions' | 'files' = 'instructions') {
  const onTabChange = vi.fn();
  const onCollapse = vi.fn();
  render(
    <WorkspaceSidebar
      activeTab={activeTab}
      onTabChange={onTabChange}
      fileCount={3}
      onCollapse={onCollapse}
      instructions={<p>Instructions content</p>}
      files={<p>Files content</p>}
    />
  );
  return { onTabChange, onCollapse };
}

describe('WorkspaceSidebar', () => {
  it('switches tab on click', async () => {
    const user = userEvent.setup();
    const { onTabChange } = renderSidebar();

    await user.click(screen.getByRole('tab', { name: /files/i }));
    expect(onTabChange).toHaveBeenCalledWith('files');
  });

  it('switches tab with the right arrow key', () => {
    const { onTabChange } = renderSidebar();

    screen.getByRole('tab', { name: /instructions/i }).focus();
    // fireEvent used directly to avoid userEvent's own tab-focus handling
    screen
      .getByRole('tab', { name: /instructions/i })
      .dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })
      );
    expect(onTabChange).toHaveBeenCalledWith('files');
  });

  it('hides the inactive panel', () => {
    renderSidebar('instructions');
    expect(screen.getByRole('tabpanel', { name: 'Instructions' })).toBeVisible();

    const panels = screen.getAllByRole('tabpanel', { hidden: true });
    const filesPanel = panels.find((panel) => panel.id === 'sidebar-panel-files');
    expect(filesPanel).not.toBeVisible();
  });

  it('calls onCollapse when the collapse button is clicked', async () => {
    const user = userEvent.setup();
    const { onCollapse } = renderSidebar();

    await user.click(screen.getByRole('button', { name: /hide sidebar/i }));
    expect(onCollapse).toHaveBeenCalledTimes(1);
  });

  it('shows the file count badge', () => {
    renderSidebar();
    expect(screen.getByRole('tab', { name: /files/i })).toHaveTextContent('3');
  });
});
