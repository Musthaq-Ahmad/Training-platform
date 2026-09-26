import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTask, getTaskCode, saveTaskCode, submitTask } from './tasks';
import { taskFixture, taskCodeFixture } from '../test/fixtures/task';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  put: vi.fn(),
  post: vi.fn(),
}));

vi.mock('./client', () => ({
  apiClient: {
    get: mocks.get,
    put: mocks.put,
    post: mocks.post,
  },
}));

describe('tasks api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getTask fetches a task by id', async () => {
    mocks.get.mockResolvedValue({ data: taskFixture });

    const result = await getTask('t1');

    expect(mocks.get).toHaveBeenCalledWith('/tasks/t1');
    expect(result).toEqual(taskFixture);
  });

  it("getTaskCode fetches a task's code", async () => {
    mocks.get.mockResolvedValue({ data: taskCodeFixture });

    const result = await getTaskCode('t1');

    expect(mocks.get).toHaveBeenCalledWith('/tasks/t1/code');
    expect(result).toEqual(taskCodeFixture);
  });

  it('saveTaskCode PUTs the files', async () => {
    mocks.put.mockResolvedValue({ data: undefined });

    await saveTaskCode('t1', {
      files: taskCodeFixture.files,
    });

    expect(mocks.put).toHaveBeenCalledWith('/tasks/t1/code', {
      files: taskCodeFixture.files,
    });
  });

  it('submitTask posts to the submit endpoint', async () => {
    const response = {
      status: 'SUBMITTED' as const,
      submittedAt: '2026-09-26T00:00:00.000Z',
    };

    mocks.post.mockResolvedValue({ data: response });

    const result = await submitTask('t1');

    expect(mocks.post).toHaveBeenCalledWith('/tasks/t1/submit');
    expect(result).toEqual(response);
  });
});
