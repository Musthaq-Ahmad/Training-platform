import type {
  TaskResponse,
  TaskCodeResponse,
  SaveCodeRequest,
  SubmitTaskResponse,
} from '@itp/types';
import { apiClient } from './client';

export async function getTask(taskId: string): Promise<TaskResponse> {
  const res = await apiClient.get<TaskResponse>(`/tasks/${taskId}`);
  return res.data;
}

export async function getTaskCode(taskId: string): Promise<TaskCodeResponse> {
  const res = await apiClient.get<TaskCodeResponse>(`/tasks/${taskId}/code`);
  return res.data;
}

export async function saveTaskCode(taskId: string, body: SaveCodeRequest): Promise<void> {
  await apiClient.put(`/tasks/${taskId}/code`, body);
}

export async function submitTask(taskId: string): Promise<SubmitTaskResponse> {
  const res = await apiClient.post<SubmitTaskResponse>(`/tasks/${taskId}/submit`);
  return res.data;
}
