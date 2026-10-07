import type {
  AdminFlagEvent,
  AdminTaskCode,
  AdminTraineeDetail,
  AdminTraineeSummary,
} from '@itp/types';
import { apiClient } from './client';

export async function getAdminTrainees(): Promise<AdminTraineeSummary[]> {
  const res = await apiClient.get<AdminTraineeSummary[]>('/admin/trainees');
  return res.data;
}

export async function getAdminTrainee(traineeId: string): Promise<AdminTraineeDetail> {
  const res = await apiClient.get<AdminTraineeDetail>(`/admin/trainees/${traineeId}`);
  return res.data;
}

export async function getAdminFlags(traineeId: string): Promise<AdminFlagEvent[]> {
  const res = await apiClient.get<AdminFlagEvent[]>(`/admin/trainees/${traineeId}/flags`);
  return res.data;
}

export async function getAdminTaskCode(traineeId: string, taskId: string): Promise<AdminTaskCode> {
  const res = await apiClient.get<AdminTaskCode>(
    `/admin/trainees/${traineeId}/tasks/${taskId}/code`
  );
  return res.data;
}
