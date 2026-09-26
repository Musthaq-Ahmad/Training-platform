import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTaskData } from './useTaskData';
import { getTask, getTaskCode } from '../../../api/tasks';
import { ApiError } from '../../../api/errors';
import { taskFixture, taskCodeFixture } from '../../../test/fixtures/task';

vi.mock('../../../api/tasks');

describe('useTaskData', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns both payloads on success', async () => {
    vi.mocked(getTask).mockResolvedValue(taskFixture);
    vi.mocked(getTaskCode).mockResolvedValue(taskCodeFixture);

    const { result } = renderHook(() => useTaskData('t1'));

    expect(result.current.status).toBe('loading');
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current).toMatchObject({
      status: 'success',
      task: taskFixture,
      code: taskCodeFixture,
    });
  });

  it('returns the ApiError when getTask fails', async () => {
    const error = new ApiError(404, 'NOT_FOUND', 'Task not found.');
    vi.mocked(getTask).mockRejectedValue(error);
    vi.mocked(getTaskCode).mockResolvedValue(taskCodeFixture);

    const { result } = renderHook(() => useTaskData('t1'));

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect((result.current as { error: ApiError }).error).toBe(error);
  });

  it('wraps a non-ApiError rejection as INTERNAL_ERROR', async () => {
    vi.mocked(getTask).mockRejectedValue(new Error('boom'));
    vi.mocked(getTaskCode).mockResolvedValue(taskCodeFixture);

    const { result } = renderHook(() => useTaskData('t1'));

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect((result.current as { error: ApiError }).error.code).toBe('INTERNAL_ERROR');
  });

  it('ignores a stale response when taskId changes mid-flight', async () => {
    let resolveFirst!: (value: typeof taskFixture) => void;
    vi.mocked(getTask).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFirst = resolve;
        })
    );
    vi.mocked(getTaskCode).mockResolvedValue(taskCodeFixture);

    const { result, rerender } = renderHook(
      ({ taskId }: { taskId: string }) => useTaskData(taskId),
      { initialProps: { taskId: 't1' } }
    );

    vi.mocked(getTask).mockResolvedValue({ ...taskFixture, id: 't2' });
    rerender({ taskId: 't2' });

    await waitFor(() => expect(result.current.status).toBe('success'));
    resolveFirst(taskFixture); // late response for t1 arrives after t2 already resolved

    expect(result.current).toMatchObject({ status: 'success', task: { id: 't2' } });
  });

  it('calls both functions again on reload', async () => {
    vi.mocked(getTask).mockResolvedValue(taskFixture);
    vi.mocked(getTaskCode).mockResolvedValue(taskCodeFixture);

    const { result } = renderHook(() => useTaskData('t1'));
    await waitFor(() => expect(result.current.status).toBe('success'));

    result.current.reload();

    await waitFor(() => expect(getTask).toHaveBeenCalledTimes(2));
    expect(getTaskCode).toHaveBeenCalledTimes(2);
  });

  it('returns a NOT_FOUND error without calling the API when taskId is undefined', () => {
    const { result } = renderHook(() => useTaskData(undefined));

    expect(result.current.status).toBe('error');
    expect((result.current as { error: ApiError }).error.code).toBe('NOT_FOUND');
    expect(getTask).not.toHaveBeenCalled();
    expect(getTaskCode).not.toHaveBeenCalled();
  });
});
