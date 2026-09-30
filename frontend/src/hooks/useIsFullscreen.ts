import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  document.addEventListener('fullscreenchange', onChange);
  return () => document.removeEventListener('fullscreenchange', onChange);
}

const getSnapshot = () => Boolean(document.fullscreenElement);

export function useIsFullscreen(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
