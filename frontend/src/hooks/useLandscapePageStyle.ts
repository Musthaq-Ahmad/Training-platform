import { useEffect } from 'react';

/** A4 landscape with no margin, only while the certificate page is open (see PrintReport's @page). */
export function useLandscapePageStyle(): void {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = '@page { size: A4 landscape; margin: 0; }';
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
}
