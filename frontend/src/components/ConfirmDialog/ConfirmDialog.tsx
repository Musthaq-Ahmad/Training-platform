import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import styles from './ConfirmDialog.module.css';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
  isConfirming?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel = 'Cancel',
  tone = 'default',
  isConfirming = false,
  error = null,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      cancelRef.current?.focus();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleCancel(event: Event) {
      event.preventDefault();
      if (!isConfirming) onCancel();
    }

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [isConfirming, onCancel]);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current && !isConfirming) {
      onCancel();
    }
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClick={handleBackdropClick}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.body}>{children}</div>

        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}

        <div className={styles.actions}>
          <button
            ref={cancelRef}
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isConfirming}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={tone === 'danger' ? styles.confirmButtonDanger : styles.confirmButton}
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
