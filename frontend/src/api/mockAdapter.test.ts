import { describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import type {
  SqlExecuteResponse,
  TaskCodeResponse,
  TaskResponse,
  TraineeDatabaseResponse,
  DayContent,
  DayTask,
} from '@itp/types';
import { installMockAdapter } from './mockAdapter';
import { mockDayContents } from './dayOverview';
import { mockTasksByDay } from '../test/fixtures/dayTasks';

function createClient() {
  const client = axios.create();
  installMockAdapter(client);
  return client;
}

describe('mockAdapter', () => {
  let client: ReturnType<typeof createClient>;

  beforeEach(() => {
    client = createClient();
  });

  it('returns the node fixture for GET /tasks/t-node', async () => {
    const res = await client.get<TaskResponse>('/tasks/t-node');
    expect(res.data.runtime).toBe('node');
  });

  it('rejects GET /tasks/locked with 403 DAY_LOCKED', async () => {
    await expect(client.get('/tasks/locked')).rejects.toMatchObject({
      response: { status: 403, data: { error: { code: 'DAY_LOCKED' } } },
    });
  });

  it('returns the saved files after a PUT then GET on the same code endpoint', async () => {
    const files = [{ path: 'a.js', content: 'console.log(1)' }];
    await client.put('/tasks/t-browser/code', { files });

    const res = await client.get<TaskCodeResponse>('/tasks/t-browser/code');
    expect(res.data.files).toEqual(files);
  });

  it('returns ok: false with a position when the query contains "error"', async () => {
    const res = await client.post<SqlExecuteResponse>('/sql/execute', {
      taskId: 't-sql',
      query: 'select error;',
    });
    expect(res.data.ok).toBe(false);
    expect(res.data.ok === false && res.data.error.position).toBe('select '.length + 1);
  });

  it('goes provisioning, provisioning, then ready across three calls', async () => {
    const first = await client.get<TraineeDatabaseResponse>('/sql/database');
    const second = await client.get<TraineeDatabaseResponse>('/sql/database');
    const third = await client.get<TraineeDatabaseResponse>('/sql/database');

    expect(first.data.status).toBe('provisioning');
    expect(second.data.status).toBe('provisioning');
    expect(third.data.status).toBe('ready');
  });

  it('returns day content for GET /days/:dayId', async () => {
    const dayId = Object.keys(mockDayContents).find((id) => !mockDayContents[id].isLocked);

    if (!dayId) throw new Error('No unlocked day fixture found');

    const res = await client.get<DayContent>(`/days/${dayId}`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual(mockDayContents[dayId]);
  });

  it('returns tasks for GET /days/:dayId/tasks', async () => {
    const dayId = Object.keys(mockDayContents).find((id) => !mockDayContents[id].isLocked);

    if (!dayId) throw new Error('No unlocked day fixture found');

    const res = await client.get<DayTask[]>(`/days/${dayId}/tasks`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual(mockTasksByDay[dayId] ?? []);
  });

  it('rejects GET /days/missing/tasks with 404 NOT_FOUND', async () => {
    await expect(client.get('/days/missing/tasks')).rejects.toMatchObject({
      response: {
        status: 404,
        data: { error: { code: 'NOT_FOUND' } },
      },
    });
  });
  it('rejects GET /days/:dayId with 403 DAY_LOCKED for a locked day', async () => {
    const dayId = Object.keys(mockDayContents).find((id) => mockDayContents[id].isLocked);

    if (!dayId) throw new Error('No locked day fixture found');

    await expect(client.get(`/days/${dayId}`)).rejects.toMatchObject({
      response: {
        status: 403,
        data: { error: { code: 'DAY_LOCKED' } },
      },
    });
  });

  it('rejects GET /days/:dayId/tasks with 403 DAY_LOCKED for a locked day', async () => {
    const dayId = Object.keys(mockDayContents).find((id) => mockDayContents[id].isLocked);

    if (!dayId) throw new Error('No locked day fixture found');

    await expect(client.get(`/days/${dayId}/tasks`)).rejects.toMatchObject({
      response: {
        status: 403,
        data: { error: { code: 'DAY_LOCKED' } },
      },
    });
  });
});
