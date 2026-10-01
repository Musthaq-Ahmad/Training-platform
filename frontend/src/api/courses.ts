// src/api/courses.ts
import type { CourseDaysResponse } from '@itp/types';
import { apiClient } from './client';

export async function getCourseDays(courseId: string): Promise<CourseDaysResponse> {
  const res = await apiClient.get<CourseDaysResponse>(`/courses/${courseId}/days`);
  return res.data;
}
