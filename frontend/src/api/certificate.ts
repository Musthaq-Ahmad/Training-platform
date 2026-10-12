import type { CourseCertificate } from '@itp/types';
import { apiClient } from './client';

export async function getCertificate(courseId: string): Promise<CourseCertificate> {
  const res = await apiClient.get<CourseCertificate>(`/courses/${courseId}/certificate`);
  return res.data;
}
