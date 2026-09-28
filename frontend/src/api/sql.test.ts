import { describe, it, expect, vi, beforeEach } from 'vitest';
import { executeSql, getTraineeDatabase, resetTraineeDatabase } from './sql';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  put: vi.fn(),
  post: vi.fn(),
}));

vi.mock('./client', () => ({
  apiClient: {
    get: mocks.get,
    put: mocks.put,
    post: mocks.post,
  },
}));

describe('sql api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('executeSql POSTs /sql/execute with the body and returns the response', async () => {
    const response = {
      ok: true as const,
      results: [
        { command: 'SELECT', rowCount: 1, columns: ['id'], rows: [['1']], truncated: false },
      ],
      durationMs: 12,
    };
    mocks.post.mockResolvedValue({ data: response });

    const result = await executeSql({ taskId: 't-sql', query: 'select 1;' });

    expect(mocks.post).toHaveBeenCalledWith(
      '/sql/execute',
      { taskId: 't-sql', query: 'select 1;' },
      { timeout: 20000 }
    );
    expect(result).toEqual(response);
  });

  it('getTraineeDatabase GETs /sql/database', async () => {
    const response = {
      status: 'ready' as const,
      connectionString: 'postgresql://mock:mock@localhost/mock',
    };
    mocks.get.mockResolvedValue({ data: response });

    const result = await getTraineeDatabase();

    expect(mocks.get).toHaveBeenCalledWith('/sql/database');
    expect(result).toEqual(response);
  });

  it('resetTraineeDatabase POSTs /sql/database/reset', async () => {
    const response = { status: 'provisioning' as const };
    mocks.post.mockResolvedValue({ data: response });

    const result = await resetTraineeDatabase();

    expect(mocks.post).toHaveBeenCalledWith('/sql/database/reset');
    expect(result).toEqual(response);
  });
});
