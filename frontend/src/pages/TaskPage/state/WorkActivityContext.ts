import { createContext, useContext } from 'react';

/** Call to say "the trainee is working right now" (counts as coding time). */
export const WorkActivityContext = createContext<() => void>(() => {});

export function useMarkWork(): () => void {
  return useContext(WorkActivityContext);
}
