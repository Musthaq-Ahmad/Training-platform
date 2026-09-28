import type {
  TaskResponse,
  TaskCodeResponse,
  SaveCodeRequest,
  SubmitTaskResponse,
} from '@itp/types';
import { apiClient } from './client';
import { taskFixture, taskCodeFixture } from '../test/fixtures/task';

const USE_FIXTURES = import.meta.env.VITE_USE_TASK_FIXTURES === 'true';

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getTask(taskId: string): Promise<TaskResponse> {
  if (USE_FIXTURES) return delay({ ...taskFixture, id: taskId });
  const res = await apiClient.get<TaskResponse>(`/tasks/${taskId}`);

  return res.data;
}

export async function getTaskCode(taskId: string): Promise<TaskCodeResponse> {
  if (USE_FIXTURES) return delay(taskCodeFixture);
  const res = await apiClient.get<TaskCodeResponse>(`/tasks/${taskId}/code`);

  return res.data;
}

export async function saveTaskCode(taskId: string, body: SaveCodeRequest): Promise<void> {
  if (USE_FIXTURES) {
    await delay(undefined);

    return;
  }
  await apiClient.put(`/tasks/${taskId}/code`, body);
}

export async function submitTask(taskId: string): Promise<SubmitTaskResponse> {
  if (USE_FIXTURES) {
    return delay({ status: 'completed' as const, submittedAt: new Date().toISOString() });
  }
  const res = await apiClient.post<SubmitTaskResponse>(`/tasks/${taskId}/submit`);

  return res.data;
}
