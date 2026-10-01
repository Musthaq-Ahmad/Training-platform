import type { ProfileData } from '@itp/types';
import { apiClient } from './client';

export async function getProfile(): Promise<ProfileData> {
  const res = await apiClient.get<ProfileData>('/profile');
  return res.data;
}
