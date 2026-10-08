import { beforeEach, describe, expect, it, vi } from 'vitest';

const { get, post } = vi.hoisted(() => ({ get: vi.fn(), post: vi.fn() }));
vi.mock('./client', () => ({ apiClient: { get, post } }));

import {
  createAdminTrainee,
  getAdminFlags,
  getAdminTaskCode,
  getAdminTrainee,
  getAdminTrainees,
} from './admin';

type Case = [name: string, call: () => Promise<unknown>, url: string];

const cases: Case[] = [
  ['getAdminTrainees', () => getAdminTrainees(), '/admin/trainees'],
  ['getAdminTrainee', () => getAdminTrainee('t-1'), '/admin/trainees/t-1'],
  ['getAdminFlags', () => getAdminFlags('t-1'), '/admin/trainees/t-1/flags'],
  [
    'getAdminTaskCode',
    () => getAdminTaskCode('t-1', 'html-day-01-t-1'),
    '/admin/trainees/t-1/tasks/html-day-01-t-1/code',
  ],
];

beforeEach(() => {
  get.mockReset();
  post.mockReset();
});

describe('admin API', () => {
  it.each(cases)('%s calls the right URL and returns the data', async (_name, call, url) => {
    const data = { marker: 'response' };
    get.mockResolvedValue({ data });

    await expect(call()).resolves.toBe(data);
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith(url);
  });

  it('passes API errors through unchanged', async () => {
    const error = new Error('403');
    get.mockRejectedValue(error);

    await expect(getAdminTrainees()).rejects.toBe(error);
  });

  it('createAdminTrainee posts the name and email and returns the new row', async () => {
    const data = { id: 't-new' };
    post.mockResolvedValue({ data });

    await expect(
      createAdminTrainee({ name: 'Asha Rao', email: 'asha.rao@vonnue.com' })
    ).resolves.toBe(data);
    expect(post).toHaveBeenCalledWith('/admin/trainees', {
      name: 'Asha Rao',
      email: 'asha.rao@vonnue.com',
    });
    expect(get).not.toHaveBeenCalled();
  });
});
