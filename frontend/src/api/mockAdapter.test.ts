import { describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import type {
  SqlExecuteResponse,
  TaskCodeResponse,
  TaskResponse,
  TraineeDatabaseResponse,
} from '@itp/types';
import { installMockAdapter } from './mockAdapter';

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
});
