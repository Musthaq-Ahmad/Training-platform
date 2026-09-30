import {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import type {
  ApiErrorResponse,
  SubmitTaskResponse,
  TaskCodeResponse,
  TaskFile,
  TaskResponse,
} from '@itp/types';
import { mockUser } from '../test/fixtures/user';

import { mockTaskStatus, mockTasksByDay } from '../test/fixtures/dayTasks';
import { catalogTaskCode, catalogTaskResponse, findCatalogTask, scenarios } from './mockTasks';
import { mockStatusByDay, mockJournalByDay } from '../test/fixtures/dayStatus';
import { mockDayContents } from './dayOverview';

const MOCK_DELAY_MS = 300;

const savedFiles = new Map<string, TaskFile[]>();

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

// Tasks: test scenarios first (/tasks/t-browser, t-node, t-sql, … see mockTasks/scenarios.ts),
// then the real curriculum tasks from the trainee guides (/tasks/html-day-01-t-2, …).

function codeFixtureFor(taskId: string): TaskCodeResponse | null {
  if (savedFiles.has(taskId)) {
    return { files: savedFiles.get(taskId) as TaskFile[], updatedAt: new Date().toISOString() };
  }
  return scenarios[taskId]?.code ?? catalogTaskCode(taskId);
}

function taskFixtureFor(taskId: string): TaskResponse | null {
  const scenario = scenarios[taskId];
  if (scenario) return scenario.task;
  const found = findCatalogTask(taskId);
  return found ? catalogTaskResponse(taskId, mockTaskStatus(found.day.dayId)) : null;
}

/** A curriculum task whose day is locked answers 403, like the real API (FR-1). */
function isLockedTask(taskId: string): boolean {
  if (taskId === 'locked') return true;
  const found = findCatalogTask(taskId);
  return found ? mockStatusByDay[found.day.dayId]?.isLocked === true : false;
}

function scenarioFailure(
  config: InternalAxiosRequestConfig,
  taskId: string,
  step: 'getTask' | 'getCode' | 'saveCode' | 'submit'
): Promise<AxiosResponse<never>> | null {
  const failure = scenarios[taskId]?.fail?.[step];
  return failure ? errorResponse(config, failure.status, failure.code, failure.message) : null;
}

async function handle(config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
  await delay(MOCK_DELAY_MS);

  const method = (config.method ?? 'get').toLowerCase();
  const url = config.url ?? '';

  const codeMatch = /^\/tasks\/([^/]+)\/code$/.exec(url);
  const taskMatch = /^\/tasks\/([^/]+)$/.exec(url);
  const submitMatch = /^\/tasks\/([^/]+)\/submit$/.exec(url);
  const activityMatch = /^\/activity\/([^/]+)\/events$/.exec(url);
  const dayTasksMatch = /^\/days\/([^/]+)\/tasks$/.exec(url);
  const dayStatusMatch = /^\/days\/([^/]+)\/status$/.exec(url);
  const dayJournalMatch = /^\/days\/([^/]+)\/journal$/.exec(url);

  if (method === 'get' && codeMatch) {
    const taskId = codeMatch[1];
    if (isLockedTask(taskId)) {
      return errorResponse(
        config,
        403,
        'DAY_LOCKED',
        'Finish the previous day to unlock this task.'
      );
    }
    const failure = scenarioFailure(config, taskId, 'getCode');
    if (failure) return failure;
    const code = codeFixtureFor(taskId);
    return code
      ? respond(config, 200, code)
      : errorResponse(config, 404, 'NOT_FOUND', 'Task not found.');
  }

  if (method === 'put' && codeMatch) {
    const taskId = codeMatch[1];
    const failure = scenarioFailure(config, taskId, 'saveCode');
    if (failure) return failure;
    const body = JSON.parse(config.data as string) as { files: TaskFile[] };
    savedFiles.set(taskId, body.files);
    return respond(config, 204, undefined);
  }

  if (method === 'post' && submitMatch) {
    const failure = scenarioFailure(config, submitMatch[1], 'submit');
    if (failure) return failure;
    const data: SubmitTaskResponse = { status: 'completed', submittedAt: new Date().toISOString() };
    return respond(config, 200, data);
  }

  if (method === 'get' && taskMatch) {
    const taskId = taskMatch[1];
    if (isLockedTask(taskId)) {
      return errorResponse(
        config,
        403,
        'DAY_LOCKED',
        'Finish the previous day to unlock this task.'
      );
    }
    const failure = scenarioFailure(config, taskId, 'getTask');
    if (failure) return failure;
    const task = taskFixtureFor(taskId);
    return task
      ? respond(config, 200, task)
      : errorResponse(config, 404, 'NOT_FOUND', 'Task not found.');
  }

  if (method === 'post' && activityMatch) {
    return respond(config, 204, undefined);
  }

  if (method === 'get' && url === '/auth/me') {
    return respond(config, 200, mockUser);
  }

  if (method === 'get' && dayTasksMatch) {
    const dayId = dayTasksMatch[1];
    if (!mockDayContents[dayId]) return errorResponse(config, 404, 'NOT_FOUND', 'Day not found.');
    if (mockStatusByDay[dayId]?.isLocked) {
      return errorResponse(config, 403, 'DAY_LOCKED', "This day isn't unlocked yet.");
    }
    return respond(config, 200, mockTasksByDay[dayId] ?? []);
  }

  if (method === 'get' && dayStatusMatch) {
    const dayId = dayStatusMatch[1];
    const status = mockStatusByDay[dayId];
    if (!mockDayContents[dayId] || !status) {
      return errorResponse(config, 404, 'NOT_FOUND', 'Day not found.');
    }
    return respond(config, 200, status);
  }

  if (method === 'get' && dayJournalMatch) {
    // No journal row yet is normal for a new trainee: return an empty response, not a 404.
    const journal = mockJournalByDay[dayJournalMatch[1]] ?? { responseText: null };
    return respond(config, 200, journal);
  }

  return errorResponse(config, 404, 'NOT_FOUND', 'Not found.');
}

/** Turns on the fake backend for `VITE_USE_MOCKS=true`. Answers from fixtures after a short delay. */
export function installMockAdapter(client: AxiosInstance): void {
  client.defaults.adapter = handle;
}
