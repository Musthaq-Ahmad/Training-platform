import { useEffect, useState } from 'react';

/** True while the OS reports a dark colour scheme. Follows changes without a reload. */
export function usePrefersDark(): boolean {
  const [prefersDark, setPrefersDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => setPrefersDark(event.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return prefersDark;
}
