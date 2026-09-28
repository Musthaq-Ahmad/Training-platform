import { useCallback, useRef } from 'react';
import { logFlagEvent } from '../../../api/activity';
import { useToast } from '../../../components/Toast';

const THROTTLE_MS = 2000;

/** Returns a stable callback: shows a warning and logs PASTE_BLOCKED, at most once per 2 s. */
export function useBlockedPasteReporter(taskId: string, source: 'editor' | 'terminal'): () => void {
  const { show } = useToast();
  const lastReportedAtRef = useRef(-Infinity);

  return useCallback(() => {
    const now = Date.now();
    if (now - lastReportedAtRef.current < THROTTLE_MS) return;
    lastReportedAtRef.current = now;

    show({
      message: 'Pasting is turned off in the workspace.',
      variant: 'warning',
      durationMs: 3000,
    });
    void logFlagEvent(taskId, { type: 'PASTE_BLOCKED', context: { source } }).catch(() => {});
  }, [show, taskId, source]);
}
