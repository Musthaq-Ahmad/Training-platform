import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, X, XCircle, type LucideIcon } from 'lucide-react';
import {
  ToastContext,
  type ShowToastOptions,
  type ToastContextValue,
  type ToastVariant,
} from './ToastContext';
import styles from './Toast.module.css';

type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
  durationMs: number;
};

const MAX_VISIBLE_TOASTS = 3;
const DEFAULT_DURATION_MS = 4000;

const VARIANT_ICONS: Record<ToastVariant, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

function createToastId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function ToastItemView({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  // Keep the latest callback in a ref so a new toast arriving doesn't restart this timer
  const onDismissRef = useRef(onDismiss);
  useEffect(() => {
    onDismissRef.current = onDismiss;
  });

  useEffect(() => {
    const timer = setTimeout(() => onDismissRef.current(), toast.durationMs);
    return () => clearTimeout(timer);
  }, [toast.durationMs]);

  const Icon = VARIANT_ICONS[toast.variant];
  const isUrgent = toast.variant === 'warning' || toast.variant === 'error';

  return (
    <div
      className={`${styles.toast} ${styles[toast.variant]}`}
      role={isUrgent ? 'alert' : undefined}
    >
      <span className={styles.iconBadge} aria-hidden="true">
        <Icon size={18} />
      </span>
      <p className={styles.message}>{toast.message}</p>
      <button
        type="button"
        className={styles.dismissButton}
        aria-label="Dismiss"
        onClick={onDismiss}
      >
        <X size={16} aria-hidden="true" />
      </button>
      <span className={styles.progress} style={{ animationDuration: `${toast.durationMs}ms` }} />
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    ({ message, variant = 'info', durationMs = DEFAULT_DURATION_MS }: ShowToastOptions) => {
      const toast: ToastItem = { id: createToastId(), message, variant, durationMs };
      setToasts((current) => [...current, toast].slice(-MAX_VISIBLE_TOASTS));
    },
    []
  );

  // Stable value: components that only call show() don't re-render when toasts change
  const value = useMemo<ToastContextValue>(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.container} role="status" aria-live="polite">
        {toasts.map((toast) => (
          <ToastItemView key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
