import type { MeResponse } from '@itp/types';
import { apiClient } from './client';

export async function getMe(): Promise<MeResponse> {
  const { data } = await apiClient.get<MeResponse>('/auth/me', { skipUnauthorizedHandler: true });
  return data;
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}

export function startGoogleLogin() {
  window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
}
