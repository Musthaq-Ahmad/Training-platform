import { useEffect, useState } from 'react';
import { GREETING_SESSION_KEY } from '../constants/greeting';

export function useGreeting() {
  const [isVisible] = useState(() => {
    try {
      return !window.sessionStorage.getItem(GREETING_SESSION_KEY);
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!isVisible) return;

    try {
      window.sessionStorage.setItem(GREETING_SESSION_KEY, 'true');
    } catch {
      // Storage may be unavailable; still show the greeting for this dashboard visit.
    }
  }, [isVisible]);

  return { isVisible };
}
