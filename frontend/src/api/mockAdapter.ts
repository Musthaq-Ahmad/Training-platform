import {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import type {
  ApiErrorResponse,
  SqlExecuteRequest,
  SqlExecuteResponse,
  SqlStatementResult,
  SubmitTaskResponse,
  TaskCodeResponse,
  TaskFile,
  TaskResponse,
  TraineeDatabaseResponse,
} from '@itp/types';
import {
  nodeTaskCodeFixture,
  nodeTaskFixture,
  sqlTaskCodeFixture,
  sqlTaskFixture,
  taskCodeFixture,
  taskFixture,
} from '../test/fixtures/task';

const MOCK_DELAY_MS = 300;

const savedFiles = new Map<string, TaskFile[]>();
let databaseCallCount = 0;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function respond<T>(config: InternalAxiosRequestConfig, status: number, data: T): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: String(status),
    headers: {},
    config,
  };
}

function errorResponse(
  config: InternalAxiosRequestConfig,
  status: number,
  code: ApiErrorResponse['error']['code'],
  message: string
): Promise<AxiosResponse<never>> {
  const data: ApiErrorResponse = { error: { code, message } };
  const response = respond(config, status, data);
  return Promise.reject(new AxiosError(message, undefined, config, undefined, response));
}

function codeFixtureFor(taskId: string): TaskCodeResponse {
  if (savedFiles.has(taskId)) {
    return { files: savedFiles.get(taskId) as TaskFile[], updatedAt: new Date().toISOString() };
  }

  if (taskId === 't-node') return nodeTaskCodeFixture;
  if (taskId === 't-sql') return sqlTaskCodeFixture;
  return taskCodeFixture;
}

function taskFixtureFor(taskId: string): TaskResponse {
  if (taskId === 't-node') return nodeTaskFixture;
  if (taskId === 't-sql') return sqlTaskFixture;
  return { ...taskFixture, id: taskId };
}

function statementResult(statement: string): SqlStatementResult {
  const command = (statement.trim().split(/\s+/)[0] ?? '').toUpperCase();

  if (command === 'SELECT') {
    return {
      command,
      rowCount: 2,
      columns: ['id', 'title'],
      rows: [
        ['1', 'Row 1'],
        ['2', 'Row 2'],
      ],
      truncated: false,
    };
  }

  return { command, rowCount: 1, columns: [], rows: [], truncated: false };
}

function executeSqlMock(body: SqlExecuteRequest): SqlExecuteResponse {
  const errorIndex = body.query.indexOf('error');

  if (errorIndex !== -1) {
    return {
      ok: false,
      error: {
        message: 'syntax error at or near "error"',
        sqlState: '42601',
        position: errorIndex + 1,
      },
      results: [],
      durationMs: 5,
    };
  }

  const statements = body.query
    .split(';')
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0);

  return { ok: true, results: statements.map(statementResult), durationMs: 12 };
}

function databaseResponse(): TraineeDatabaseResponse {
  return databaseCallCount <= 2
    ? { status: 'provisioning' }
    : { status: 'ready', connectionString: 'postgresql://mock:mock@localhost/mock' };
}

async function handle(config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
  await delay(MOCK_DELAY_MS);

  const method = (config.method ?? 'get').toLowerCase();
  const url = config.url ?? '';

  const codeMatch = /^\/tasks\/([^/]+)\/code$/.exec(url);
  const taskMatch = /^\/tasks\/([^/]+)$/.exec(url);
  const submitMatch = /^\/tasks\/([^/]+)\/submit$/.exec(url);
  const activityMatch = /^\/activity\/([^/]+)\/events$/.exec(url);

  if (method === 'get' && codeMatch) {
    const taskId = codeMatch[1];
    if (taskId === 'locked') {
      return errorResponse(
        config,
        403,
        'DAY_LOCKED',
        'Finish the previous day to unlock this task.'
      );
    }
    return respond(config, 200, codeFixtureFor(taskId));
  }

  if (method === 'put' && codeMatch) {
    const taskId = codeMatch[1];
    const body = JSON.parse(config.data as string) as { files: TaskFile[] };
    savedFiles.set(taskId, body.files);
    return respond(config, 204, undefined);
  }

  if (method === 'post' && submitMatch) {
    const data: SubmitTaskResponse = { status: 'completed', submittedAt: new Date().toISOString() };
    return respond(config, 200, data);
  }

  if (method === 'get' && taskMatch) {
    const taskId = taskMatch[1];
    if (taskId === 'locked') {
      return errorResponse(
        config,
        403,
        'DAY_LOCKED',
        'Finish the previous day to unlock this task.'
      );
    }
    if (taskId === 'missing') {
      return errorResponse(config, 404, 'NOT_FOUND', 'Task not found.');
    }
    return respond(config, 200, taskFixtureFor(taskId));
  }

  if (method === 'post' && activityMatch) {
    return respond(config, 204, undefined);
  }

  if (method === 'get' && url === '/sql/database') {
    databaseCallCount += 1;
    return respond(config, 200, databaseResponse());
  }

  if (method === 'post' && url === '/sql/database/reset') {
    databaseCallCount = 0;
    const data: TraineeDatabaseResponse = { status: 'provisioning' };
    return respond(config, 200, data);
  }

  if (method === 'post' && url === '/sql/execute') {
    const body = JSON.parse(config.data as string) as SqlExecuteRequest;
    return respond(config, 200, executeSqlMock(body));
  }

  return errorResponse(config, 404, 'NOT_FOUND', 'Not found.');
}

/** Turns on the fake backend for `VITE_USE_MOCKS=true`. Answers from fixtures after a short delay. */
export function installMockAdapter(client: AxiosInstance): void {
  client.defaults.adapter = handle;
}
