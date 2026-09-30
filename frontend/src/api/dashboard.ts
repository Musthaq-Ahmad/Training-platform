import type { DashboardResponse } from '@itp/types';
import { apiClient } from './client';

export async function getDashboard(): Promise<DashboardResponse> {
  const res = await apiClient.get<DashboardResponse>('/dashboard');
  return res.data;
}
