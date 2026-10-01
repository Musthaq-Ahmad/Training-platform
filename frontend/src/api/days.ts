import type { DayJournal, DayCurrentStatus, DayTask, SaveJournalRequest } from '@itp/types';
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
export async function saveJournal(dayId: string, responseText: string): Promise<void> {
  const body: SaveJournalRequest = { responseText };
  await apiClient.put(`/days/${dayId}/journal`, body);
}

/** Asks the server to complete the day. The server checks the rules; the client sends no body. */
export async function completeDay(dayId: string): Promise<DayCurrentStatus> {
  const { data } = await apiClient.patch<DayCurrentStatus>(`/days/${dayId}/status`);
  return data;
}
