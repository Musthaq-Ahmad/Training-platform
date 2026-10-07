import type {
  CompleteDayResponse,
  DayContent,
  DayJournal,
  DayCurrentStatus,
  DayTask,
  SaveJournalRequest,
  DayIntegrityResponse,
} from '@itp/types';
import { apiClient } from './client';

export async function getDayContent(dayId: string): Promise<DayContent> {
  const { data } = await apiClient.get<DayContent>(`/days/${dayId}`);
  return data;
}

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
  const { data } = await apiClient.patch<CompleteDayResponse>(`/days/${dayId}/complete`);
  return data.status;
}

export function getDayIntegrity(_dayId: string): Promise<DayIntegrityResponse> {
  //  const res = await apiClient.get<DayIntegrityResponse>(`/days/${dayId}/integrity`);
  // return res.data;
  return new Promise((resolve) => {
    // The delay lets you see the loading state.
    setTimeout(
      () =>
        resolve({
          state: 'in_progress',
          score: 31,
          tasksCounted: 2,
          breakdown: { pasteAttempts: 0, tabSwitches: 3, fullscreenExits: 1, windowBlurs: 0 },
        }),
      400
    );
  });
}
