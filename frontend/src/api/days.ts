import type { DayJournal, DayCurrentStatus, DayTask } from '@itp/types';
import { apiClient } from './client';

export async function getDayTasks(dayId: string): Promise<DayTask[]> {
  const res = await apiClient.get<DayTask[]>(`/days/${dayId}/tasks`);
  return res.data;
}

export async function getDayStatus(dayId: string): Promise<DayCurrentStatus> {
  const { data } = await apiClient.get<DayCurrentStatus>(`/days/${dayId}/status`);
  return data;
}

export async function getDayJournal(dayId: string): Promise<DayJournal> {
  const { data } = await apiClient.get<DayJournal>(`/days/${dayId}/journal`);
  return data;
}
