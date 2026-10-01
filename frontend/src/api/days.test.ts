import { beforeAll, describe, expect, it } from 'vitest';
import { apiClient } from './client';
import { installMockAdapter } from './mockAdapter';
import { mockDayContents } from './dayOverview';
import { mockStatusByDay } from '../test/fixtures/dayStatus';
import { mockTasksByDay } from '../test/fixtures/dayTasks';
import { ApiError } from './errors';
import { completeDay, getDayJournal, getDayStatus, getDayTasks, saveJournal } from './days';

// Pick ids from the fixtures instead of hard-coding them, so the tests survive fixture edits.
const dayIds = Object.keys(mockDayContents);

const lockedDayId = dayIds.find((id) => mockStatusByDay[id]?.isLocked);

const incompleteDayId = dayIds.find(
  (id) =>
    mockStatusByDay[id] &&
    !mockStatusByDay[id].isLocked &&
    (mockTasksByDay[id] ?? []).some((task) => !task.isStretchGoal && task.status !== 'completed')
);

const completableDayId = dayIds.find(
  (id) =>
    mockStatusByDay[id] &&
    !mockStatusByDay[id].isLocked &&
    !mockStatusByDay[id].isCompleted &&
    (mockTasksByDay[id] ?? []).every((task) => task.isStretchGoal || task.status === 'completed')
);

const anyDayId = dayIds[0];

describe('days API (against the mock adapter)', () => {
  beforeAll(() => {
    installMockAdapter(apiClient);
  });

  describe('getDayStatus / getDayTasks', () => {
    it('returns the status of a known day', async () => {
      const status = await getDayStatus(anyDayId);
      expect(typeof status.isCompleted).toBe('boolean');
      expect(typeof status.isLocked).toBe('boolean');
    });

    it('throws NOT_FOUND for an unknown day', async () => {
      const promise = getDayStatus('does-not-exist');
      await expect(promise).rejects.toBeInstanceOf(ApiError);
      await expect(promise).rejects.toMatchObject({ status: 404, code: 'NOT_FOUND' });
    });

    it.skipIf(!lockedDayId)('throws DAY_LOCKED for tasks of a locked day', async () => {
      await expect(getDayTasks(lockedDayId as string)).rejects.toMatchObject({
        status: 403,
        code: 'DAY_LOCKED',
      });
    });
  });

  describe('journal', () => {
    it('returns an empty response (not an error) when nothing is saved yet', async () => {
      const journal = await getDayJournal('does-not-exist');
      expect(journal.responseText).toBeNull();
    });

    it('saves the response and returns it on the next read', async () => {
      await saveJournal(anyDayId, 'Today I learned about Prisma.');
      const journal = await getDayJournal(anyDayId);
      expect(journal.responseText).toBe('Today I learned about Prisma.');
    });

    it('throws NOT_FOUND when saving for an unknown day', async () => {
      await expect(saveJournal('does-not-exist', 'text')).rejects.toMatchObject({
        status: 404,
        code: 'NOT_FOUND',
      });
    });
  });

  describe('completeDay', () => {
    it('throws NOT_FOUND for an unknown day', async () => {
      await expect(completeDay('does-not-exist')).rejects.toMatchObject({
        status: 404,
        code: 'NOT_FOUND',
      });
    });

    it.skipIf(!lockedDayId)('throws DAY_LOCKED for a locked day', async () => {
      await expect(completeDay(lockedDayId as string)).rejects.toMatchObject({
        status: 403,
        code: 'DAY_LOCKED',
      });
    });

    it.skipIf(!incompleteDayId)(
      'throws CHECKLIST_INCOMPLETE when a required task is not done',
      async () => {
        await expect(completeDay(incompleteDayId as string)).rejects.toMatchObject({
          status: 400,
          code: 'CHECKLIST_INCOMPLETE',
        });
      }
    );

    it.skipIf(!completableDayId)(
      'marks the day completed when all required tasks are done',
      async () => {
        const status = await completeDay(completableDayId as string);
        expect(status.isCompleted).toBe(true);
      }
    );
  });
});
