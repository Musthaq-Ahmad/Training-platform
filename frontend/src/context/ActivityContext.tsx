import { createContext } from 'react';
import type { ActivityMode } from '@itp/types';

export type ActivityContextValue = {
  reportMode: (mode: ActivityMode) => void;
  /** Send what has been counted so far (call before logging out). */
  flushNow: () => Promise<void>;
};

export const ActivityContext = createContext<ActivityContextValue | null>(null);
