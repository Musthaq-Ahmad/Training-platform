import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getDayStatus } from '../../api/days';
import { ApiError } from '../../api/errors';
import Loader from '../../components/Common/LoadingState';
import StateMessage from '../../components/StateMessage';
import ReferencePage from './ReferencePage';

type AccessResult =
  { dayId: string; status: 'unlocked' | 'locked' } | { dayId: string; status: 'error' };

export default function ReferenceRoute() {
  const { dayId } = useParams();
  const [result, setResult] = useState<AccessResult | null>(null);

  useEffect(() => {
    if (!dayId) return;
    let cancelled = false;

    getDayStatus(dayId)
      .then(({ isLocked }) => {
        if (!cancelled) setResult({ dayId, status: isLocked ? 'locked' : 'unlocked' });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setResult({
            dayId,
            status: error instanceof ApiError && error.code === 'DAY_LOCKED' ? 'locked' : 'error',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dayId]);

  if (!dayId) {
    return (
      <StateMessage
        icon="🔍"
        title="Day not found"
        description="We couldn't find the day you're looking for."
        actionLabel="Back to Dashboard"
        actionHref="/"
      />
    );
  }

  const current = result?.dayId === dayId ? result : null;
  if (!current) return <Loader />;

  if (current.status === 'locked') {
    return (
      <StateMessage
        icon="🔒"
        title="This day is locked"
        description="Finish the previous day to unlock its references."
        actionLabel="Back to Dashboard"
        actionHref="/"
      />
    );
  }

  if (current.status === 'error') {
    return (
      <StateMessage
        icon="⚠️"
        title="Couldn't verify access"
        description="We couldn't check whether this day is unlocked. Please try again later."
        actionLabel="Back to Dashboard"
        actionHref="/"
      />
    );
  }

  return <ReferencePage key={dayId} dayId={dayId} />;
}
