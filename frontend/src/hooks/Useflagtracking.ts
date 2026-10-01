import { useEffect, useRef } from 'react';
import type { FlagEventType } from '@itp/types';
import { logFlagEvent } from '../api/activity';
import { isFullscreenActive } from '../lib/IsfullscreenActive';

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
    let wasFullscreen = isFullscreenActive();
    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

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
      const isFullscreen = isFullscreenActive();
      if (wasFullscreen && !isFullscreen) {
        log('FULLSCREEN_EXIT');
        onWarningRef.current(LEFT_WORKSPACE_WARNING);
      }
      wasFullscreen = isFullscreen;
    }
    function handleResize() {
      // F11 can trigger multiple resize events.
      // Wait until the browser finishes resizing before checking fullscreen state.
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      resizeTimeout = setTimeout(() => {
        handleFullscreenChange();
      }, 150);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    // window.addEventListener('resize', handleFullscreenChange);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, [taskId]);
}
