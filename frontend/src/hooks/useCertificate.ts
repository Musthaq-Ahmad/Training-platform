import { useEffect, useState } from 'react';
import type { CourseCertificate } from '@itp/types';
import { getCertificate } from '../api/certificate';
import { ApiError } from '../api/errors';

type Result = { key: string; certificate: CourseCertificate } | { key: string; error: ApiError };

function toApiError(err: unknown): ApiError {
  return err instanceof ApiError
    ? err
    : new ApiError(0, 'NETWORK_ERROR', 'Something went wrong. Please try again.');
}

/** One course's certificate. A 403 means the course is not finished yet. */
export function useCertificate(courseId: string) {
  const [result, setResult] = useState<Result | null>(null);
  const [attempt, setAttempt] = useState(0);
  const key = `${courseId}:${attempt}`;

  useEffect(() => {
    if (!courseId) return;
    let cancelled = false;

    getCertificate(courseId)
      .then((certificate) => {
        if (!cancelled) setResult({ key, certificate });
      })
      .catch((err: unknown) => {
        if (!cancelled) setResult({ key, error: toApiError(err) });
      });

    return () => {
      cancelled = true;
    };
  }, [courseId, key]);

  // Only trust a result that belongs to this course and attempt.
  const current = result?.key === key ? result : null;

  return {
    isLoading: current === null,
    certificate: current && 'certificate' in current ? current.certificate : null,
    error: current && 'error' in current ? current.error : null,
    retry: () => setAttempt((n) => n + 1),
  };
}
