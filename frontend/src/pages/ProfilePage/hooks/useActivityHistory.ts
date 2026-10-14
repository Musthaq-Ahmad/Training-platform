import { useCallback, useEffect, useState } from 'react';
import type { ActivityTimeDay } from '@itp/types';
import { getActivityTime } from '../../../api/activity';

type State = { days: ActivityTimeDay[] | null; error: Error | null };

/** Loads the last `days` days of activity, on its own, so a failure never hides the profile. */
export function useActivityHistory(days: number) {
  const [state, setState] = useState<State>({ days: null, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    getActivityTime(days)
      .then((data) => {
        if (isCurrent) setState({ days: data, error: null });
      })
      .catch((error: unknown) => {
        if (isCurrent) {
          setState({
            days: null,
            error: error instanceof Error ? error : new Error('Something went wrong'),
          });
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [days, attempt]);

  const retry = useCallback(() => {
    setState({ days: null, error: null });
    setAttempt((count) => count + 1);
  }, []);

  return {
    days: state.days,
    error: state.error,
    isLoading: state.days === null && state.error === null,
    retry,
  };
}
