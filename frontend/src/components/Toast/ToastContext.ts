import { createContext } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export type ShowToastOptions = {
  message: string;
  variant?: ToastVariant;
  durationMs?: number;
};

export type ToastContextValue = {
  show: (options: ShowToastOptions) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);
