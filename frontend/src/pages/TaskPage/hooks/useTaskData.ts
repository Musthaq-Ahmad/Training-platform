import { useCallback, useEffect, useState } from 'react';
import type { TaskResponse, TaskCodeResponse } from '@itp/types';
import { getTask, getTaskCode } from '../../../api/tasks';
import { ApiError } from '../../../api/errors';

type TaskDataResult =
  | { status: 'error'; error: ApiError }
  | { status: 'success'; task: TaskResponse; code: TaskCodeResponse };

type TaskDataState = { status: 'loading' } | TaskDataResult;

export function useTaskData(taskId: string | undefined): TaskDataState & { reload: () => void } {
  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = taskId ? `${taskId}:${reloadKey}` : undefined;

  const [resolved, setResolved] = useState<{
    requestKey: string;
    result: TaskDataResult;
  } | null>(null);

  useEffect(() => {
    if (!taskId) return;

    let isCancelled = false;
    const key = requestKey as string;

    Promise.all([getTask(taskId), getTaskCode(taskId)])
      .then(([task, code]) => {
        if (isCancelled) return;
        setResolved({ requestKey: key, result: { status: 'success', task, code } });
      })
      .catch((error: unknown) => {
        if (isCancelled) return;
        const apiError =
          error instanceof ApiError
            ? error
            : new ApiError(0, 'INTERNAL_ERROR', 'Something went wrong. Please try again.');
        setResolved({ requestKey: key, result: { status: 'error', error: apiError } });
      });

    return () => {
      isCancelled = true;
    };
  }, [taskId, requestKey]);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  if (!taskId) {
    return { status: 'error', error: new ApiError(404, 'NOT_FOUND', 'Task not found.'), reload };
  }

  if (resolved && resolved.requestKey === requestKey) {
    return { ...resolved.result, reload };
  }

  return { status: 'loading', reload };
}
