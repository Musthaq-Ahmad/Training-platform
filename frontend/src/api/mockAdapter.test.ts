import { describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import type { TaskCodeResponse, TaskResponse } from '@itp/types';
import type { DayTask, DayCurrentStatus, DayJournal } from '@itp/types';
import { installMockAdapter } from './mockAdapter';
import { mockDayContents } from './dayOverview';
import { mockTasksByDay } from '../test/fixtures/dayTasks';
import { mockJournalByDay, mockStatusByDay } from '../test/fixtures/dayStatus';

function createClient() {
  const client = axios.create();
  installMockAdapter(client);
  return client;
}

// Lock state now lives in mockStatusByDay, not on the day content.
function findUnlockedDayId(): string {
  const dayId = Object.keys(mockDayContents).find(
    (id) => mockStatusByDay[id] && !mockStatusByDay[id].isLocked
  );
  if (!dayId) throw new Error('No unlocked day fixture found');
  return dayId;
}

function findLockedDayId(): string {
  const dayId = Object.keys(mockDayContents).find((id) => mockStatusByDay[id]?.isLocked);
  if (!dayId) throw new Error('No locked day fixture found');
  return dayId;
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

  it('no longer answers the removed /sql routes (SQL runs in the browser now)', async () => {
    await expect(client.get('/sql/database')).rejects.toMatchObject({
      response: { status: 404 },
    });
  });

  describe('days', () => {
    it('returns tasks for GET /days/:dayId/tasks', async () => {
      const dayId = findUnlockedDayId();

      const res = await client.get<DayTask[]>(`/days/${dayId}/tasks`);

      expect(res.status).toBe(200);
      expect(res.data).toEqual(mockTasksByDay[dayId] ?? []);
    });

    it('rejects GET /days/missing/tasks with 404 NOT_FOUND', async () => {
      await expect(client.get('/days/missing/tasks')).rejects.toMatchObject({
        response: { status: 404, data: { error: { code: 'NOT_FOUND' } } },
      });
    });

    it('rejects GET /days/:dayId/tasks with 403 DAY_LOCKED for a locked day', async () => {
      const dayId = findLockedDayId();

      await expect(client.get(`/days/${dayId}/tasks`)).rejects.toMatchObject({
        response: { status: 403, data: { error: { code: 'DAY_LOCKED' } } },
      });
    });

    it('returns the status for GET /days/:dayId/status', async () => {
      const dayId = findUnlockedDayId();

      const res = await client.get<DayCurrentStatus>(`/days/${dayId}/status`);

      expect(res.status).toBe(200);
      expect(res.data).toEqual(mockStatusByDay[dayId]);
    });

    it('returns the status with isLocked: true for a locked day instead of an error', async () => {
      const dayId = findLockedDayId();

      const res = await client.get<DayCurrentStatus>(`/days/${dayId}/status`);

      expect(res.status).toBe(200);
      expect(res.data.isLocked).toBe(true);
    });

    it('rejects GET /days/missing/status with 404 NOT_FOUND', async () => {
      await expect(client.get('/days/missing/status')).rejects.toMatchObject({
        response: { status: 404, data: { error: { code: 'NOT_FOUND' } } },
      });
    });

    it('returns the journal for GET /days/:dayId/journal', async () => {
      const dayId = findUnlockedDayId();

      const res = await client.get<DayJournal>(`/days/${dayId}/journal`);

      expect(res.status).toBe(200);
      expect(res.data).toEqual(mockJournalByDay[dayId] ?? { responseText: null });
    });

    it('returns an empty journal, not a 404, when the day has no journal row yet', async () => {
      const res = await client.get<DayJournal>('/days/no-journal-yet/journal');

      expect(res.status).toBe(200);
      expect(res.data).toEqual({ responseText: null });
    });
  });

  describe('activity', () => {
    it('answers POST /activity/time with 204', async () => {
      const res = await client.post('/activity/time', {
        activeSeconds: 60,
        codingSeconds: 0,
        readingSeconds: 0,
      });
      expect(res.status).toBe(204);
    });

    it('answers GET /activity/time with an empty list', async () => {
      const res = await client.get('/activity/time');
      expect(res.status).toBe(200);
      expect(res.data).toEqual([]);
    });
  });
});
