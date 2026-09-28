import { describe, it, expect, vi } from 'vitest';
import type { ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmDialog from './ConfirmDialog';

function renderDialog(overrides: Partial<ComponentProps<typeof ConfirmDialog>> = {}) {
  const onConfirm = vi.fn();
  const onCancel = vi.fn();
  render(
    <ConfirmDialog
      open
      title="Delete file.js?"
      confirmLabel="Delete"
      onConfirm={onConfirm}
      onCancel={onCancel}
      {...overrides}
    >
      This can&apos;t be undone.
    </ConfirmDialog>
  );
  return { onConfirm, onCancel };
}

describe('ConfirmDialog', () => {
  it('opens the native dialog when open is true', () => {
    renderDialog();
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).toHaveAttribute('open');
  });

  it('calls onConfirm when the confirm button is clicked', async () => {
    const user = userEvent.setup();
    const { onConfirm } = renderDialog();

    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel on Escape (the native cancel event)', () => {
    const { onCancel } = renderDialog();
    const dialog = screen.getByRole('dialog', { hidden: true });

    dialog.dispatchEvent(new Event('cancel', { cancelable: true }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('does not call onCancel on Escape while confirming', () => {
    const { onCancel } = renderDialog({ isConfirming: true });
    const dialog = screen.getByRole('dialog', { hidden: true });

    dialog.dispatchEvent(new Event('cancel', { cancelable: true }));
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('shows the error with role alert', () => {
    renderDialog({ error: 'Something went wrong.' });
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong.');
  });
});
