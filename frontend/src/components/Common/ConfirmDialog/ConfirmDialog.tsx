import { useEffect, useRef, type ReactNode } from 'react';
import styles from './ConfirmDialog.module.css';

interface ConfirmPopoverProps {
  open: boolean;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Disables both buttons and shows a busy label while the action runs. */
  isBusy?: boolean;
  busyLabel?: string;
  /** Shown under the buttons when the confirmed action fails. */
  error?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
  /** The trigger (e.g. the logout button). The popover opens right below it. */
  children: ReactNode;
}

export function ConfirmPopover({
  open,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isBusy = false,
  busyLabel = 'Working…',
  error = null,
  onConfirm,
  onCancel,
  children,
}: ConfirmPopoverProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Move focus to the safe option when the popover opens.
  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  // Close on Esc or on a click outside the trigger + popover.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isBusy) onCancel();
    };

    const handleMouseDown = (event: MouseEvent) => {
      const anchor = anchorRef.current;
      if (!isBusy && anchor && !anchor.contains(event.target as Node)) onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [open, isBusy, onCancel]);

  return (
    <div ref={anchorRef} className={styles.anchor}>
      {children}

      {open && (
        <div className={styles.popover} role="alertdialog" aria-label={message}>
          <p className={styles.message}>{message}</p>

          <div className={styles.actions}>
            <button
              ref={cancelRef}
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
              disabled={isBusy}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className={styles.confirmButton}
              onClick={onConfirm}
              disabled={isBusy}
            >
              {isBusy ? busyLabel : confirmLabel}
            </button>
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
