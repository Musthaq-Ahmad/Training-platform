import { useEffect, useRef } from 'react';
import type { FlagEventType } from '@itp/types';
import { logFlagEvent } from '../api/activity';

export const LEFT_WORKSPACE_WARNING =
  'You left the workspace. This has been noted for your mentor.';

type Options = {
  taskId: string;
  onWarning: (message: string) => void;
};

/** FR-9/11/12: logs tab switches and fullscreen exits for this task and warns on return. No penalty. */
export function useFlagTracking({ taskId, onWarning }: Options): void {
  // Keep the latest callback without re-subscribing the listeners
  const onWarningRef = useRef(onWarning);
  useEffect(() => {
    onWarningRef.current = onWarning;
  });

  useEffect(() => {
    let isAway = document.visibilityState === 'hidden';
    let wasFullscreen = Boolean(document.fullscreenElement);

    function log(type: FlagEventType) {
      void logFlagEvent(taskId, { type }).catch(() => {});
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        if (isAway) return; // already logged this hidden period
        isAway = true;
        log('TAB_SWITCH');
      } else if (isAway) {
        isAway = false;
        onWarningRef.current(LEFT_WORKSPACE_WARNING);
      }
    }

    function handleFullscreenChange() {
      const isFullscreen = Boolean(document.fullscreenElement);
      if (wasFullscreen && !isFullscreen) {
        log('FULLSCREEN_EXIT');
        onWarningRef.current(LEFT_WORKSPACE_WARNING);
      }
      wasFullscreen = isFullscreen;
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [taskId]);
}
