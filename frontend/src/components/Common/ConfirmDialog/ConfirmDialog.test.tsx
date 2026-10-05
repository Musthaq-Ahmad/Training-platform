import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { ConfirmPopover } from './ConfirmDialog';

type Props = Omit<React.ComponentProps<typeof ConfirmPopover>, 'children'>;

function setup(overrides: Partial<Props> = {}) {
  const props: Props = {
    open: true,
    message: 'Log out?',
    confirmLabel: 'Log out',
    cancelLabel: 'Cancel',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
    ...overrides,
  };
  const utils = render(
    <>
      <button type="button">outside</button>
      <ConfirmPopover {...props}>
        <button type="button">trigger</button>
      </ConfirmPopover>
    </>
  );
  return { props, ...utils };
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('ConfirmPopover', () => {
  describe('rendering', () => {
    it('always renders the trigger', () => {
      setup({ open: false });

      expect(screen.getByRole('button', { name: 'trigger' })).toBeInTheDocument();
    });

    it('renders nothing extra when closed', () => {
      setup({ open: false });

      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
      expect(screen.queryByText('Log out?')).not.toBeInTheDocument();
    });

    it('shows the message and both buttons when open', () => {
      setup();

      expect(screen.getByRole('alertdialog', { name: 'Log out?' })).toBeInTheDocument();
      expect(screen.getByText('Log out?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
    });

    it('uses default button labels when none are provided', () => {
      setup({ confirmLabel: undefined, cancelLabel: undefined });

      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('moves focus to the cancel button when opened', () => {
      setup();

      expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
    });

    it('shows an error only when one is provided', () => {
      const { unmount } = setup();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      unmount();

      setup({ error: 'Could not log out. Please try again.' });
      expect(screen.getByRole('alert')).toHaveTextContent('Could not log out. Please try again.');
    });
  });

  describe('actions', () => {
    it('calls onConfirm when the confirm button is clicked', async () => {
      const user = userEvent.setup();
      const { props } = setup();

      await user.click(screen.getByRole('button', { name: 'Log out' }));

      expect(props.onConfirm).toHaveBeenCalledTimes(1);
      expect(props.onCancel).not.toHaveBeenCalled();
    });

    it('calls onCancel when the cancel button is clicked', async () => {
      const user = userEvent.setup();
      const { props } = setup();

      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(props.onCancel).toHaveBeenCalledTimes(1);
      expect(props.onConfirm).not.toHaveBeenCalled();
    });

    it('calls onCancel when Esc is pressed', () => {
      const { props } = setup();

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(props.onCancel).toHaveBeenCalledTimes(1);
    });

    it('ignores other keys', () => {
      const { props } = setup();

      fireEvent.keyDown(document, { key: 'Enter' });

      expect(props.onCancel).not.toHaveBeenCalled();
    });

    it('calls onCancel when clicking outside', () => {
      const { props } = setup();

      fireEvent.mouseDown(screen.getByRole('button', { name: 'outside' }));

      expect(props.onCancel).toHaveBeenCalledTimes(1);
    });

    it('does not call onCancel when clicking the trigger or the popover itself', () => {
      const { props } = setup();

      fireEvent.mouseDown(screen.getByRole('button', { name: 'trigger' }));
      fireEvent.mouseDown(screen.getByText('Log out?'));

      expect(props.onCancel).not.toHaveBeenCalled();
    });

    it('does not react to Esc or outside clicks while closed', () => {
      const { props } = setup({ open: false });

      fireEvent.keyDown(document, { key: 'Escape' });
      fireEvent.mouseDown(screen.getByRole('button', { name: 'outside' }));

      expect(props.onCancel).not.toHaveBeenCalled();
    });
  });

  describe('busy state', () => {
    it('shows the busy label and disables both buttons', () => {
      setup({ isBusy: true, busyLabel: 'Logging out…' });

      expect(screen.getByRole('button', { name: 'Logging out…' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    });

    it('falls back to the default busy label', () => {
      setup({ isBusy: true });

      expect(screen.getByRole('button', { name: 'Working…' })).toBeDisabled();
    });

    it('ignores Esc and outside clicks while busy', () => {
      const { props } = setup({ isBusy: true });

      fireEvent.keyDown(document, { key: 'Escape' });
      fireEvent.mouseDown(screen.getByRole('button', { name: 'outside' }));

      expect(props.onCancel).not.toHaveBeenCalled();
    });

    it('does not call onConfirm when the disabled confirm button is clicked', async () => {
      const user = userEvent.setup();
      const { props } = setup({ isBusy: true });

      await user.click(screen.getByRole('button', { name: 'Working…' }));

      expect(props.onConfirm).not.toHaveBeenCalled();
    });
  });
});
