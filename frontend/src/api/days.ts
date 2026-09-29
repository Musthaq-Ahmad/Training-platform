import type { DayContent, DayTask } from '@itp/types';
import { apiClient } from './client';

export async function getDayContent(dayId: string): Promise<DayContent> {
  const res = await apiClient.get<DayContent>(`/days/${dayId}`);
  return res.data;
}

export async function getDayTasks(dayId: string): Promise<DayTask[]> {
  const res = await apiClient.get<DayTask[]>(`/days/${dayId}/tasks`);
  return res.data;
}
