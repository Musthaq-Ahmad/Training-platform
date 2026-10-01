import type { SaveTypingResultRequest, TypingTestResult, TypingTodayResponse } from '@itp/types';
import { apiClient } from './client';

export async function getTypingToday(): Promise<TypingTodayResponse> {
  const res = await apiClient.get<TypingTodayResponse>('/typing-test/today');
  return res.data;
}

export async function saveTypingResult(body: SaveTypingResultRequest): Promise<TypingTestResult> {
  const res = await apiClient.post<TypingTestResult>('/typing-test/results', body);
  return res.data;
}
