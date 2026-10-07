import type { JournalListResponse, SaveJournalRequest } from '@itp/types';
import { apiClient } from './client';

export async function getJournalEntries(): Promise<JournalListResponse> {
  const res = await apiClient.get<JournalListResponse>('/journal');
  return res.data;
}

export async function saveJournal(dayId: string, body: SaveJournalRequest): Promise<void> {
  await apiClient.put(`days/${dayId}/journal`, body);
}
