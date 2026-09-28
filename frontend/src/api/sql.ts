import type { SqlExecuteRequest, SqlExecuteResponse, TraineeDatabaseResponse } from '@itp/types';
import { apiClient } from './client';

export async function executeSql(body: SqlExecuteRequest): Promise<SqlExecuteResponse> {
  const res = await apiClient.post<SqlExecuteResponse>('/sql/execute', body, { timeout: 20000 });
  return res.data;
}

export async function getTraineeDatabase(): Promise<TraineeDatabaseResponse> {
  const res = await apiClient.get<TraineeDatabaseResponse>('/sql/database');
  return res.data;
}

export async function resetTraineeDatabase(): Promise<TraineeDatabaseResponse> {
  const res = await apiClient.post<TraineeDatabaseResponse>('/sql/database/reset');
  return res.data;
}
