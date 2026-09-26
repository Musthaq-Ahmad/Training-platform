import type { LogFlagEventRequest } from '@itp/types';
import { apiClient } from './client';

export async function logFlagEvent(taskId: string, body: LogFlagEventRequest): Promise<void> {
  await apiClient.post(`/activity/${taskId}/events`, body);
}
