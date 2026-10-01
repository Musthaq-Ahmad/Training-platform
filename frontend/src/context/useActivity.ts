import { useContext, useEffect } from 'react';
import type { ActivityMode } from '@itp/types';
import { ActivityContext, type ActivityContextValue } from './ActivityContext';

export function useActivity(): ActivityContextValue | null {
  return useContext(ActivityContext);
}

/**
 * Tells the activity counter what this page is (coding / reading / none) while it is mounted.
 * Two effects on purpose: a change of mode or day only reports the new value, and the reset to
 * 'none' happens once, on unmount. With a single effect, every mode change went through
 * ('none', null), which made the provider see a day change and flush twice.
 */
export function useReportActivityMode(mode: ActivityMode): void {
  const activity = useContext(ActivityContext);

  useEffect(() => {
    activity?.reportMode(mode); // no provider (e.g. in component tests): do nothing
  }, [activity, mode]);

  useEffect(() => {
    return () => activity?.reportMode('none');
  }, [activity]);
}
