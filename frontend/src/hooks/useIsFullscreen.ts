import { useSyncExternalStore } from 'react';
import { isFullscreenActive } from '../lib/IsfullscreenActive';

function subscribe(onChange: () => void) {
  document.addEventListener('fullscreenchange', onChange);
  window.addEventListener('resize', onChange);
  return () => {
    document.removeEventListener('fullscreenchange', onChange);
    window.removeEventListener('resize', onChange);
  };
}

const getSnapshot = () => isFullscreenActive();

export function useIsFullscreen(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
