import type { DayJournal } from '@itp/types';
import { journalRepository } from './journal.repository';
import { NotFoundError, DayLockedError } from '../../errors/AppError';

/**
 * There is no day_unlock table: a day is unlocked when it is already completed, when it is the
 * very first day, or when the day before it (course order, then day number) is completed.
 * Unknown day → 404 first, then locked → 403 (FR-1). The server decides, not the UI.
 *
 * TODO: move this rule into one shared place (e.g. the days service) once GET /days/:dayId/status
 * exists, so every endpoint uses the same lock logic.
 */
async function assertDayIsAccessible(traineeId: string, dayId: string): Promise<void> {
  const day = await journalRepository.findDayWithOrder(dayId);
  if (!day) throw new NotFoundError('Day not found');

  const isCompleted = await journalRepository.findCompletion(traineeId, dayId);
  if (isCompleted) return;

  const previousDay = await journalRepository.findPreviousDay(
    day.course.sort_order,
    day.day_number
  );
  if (!previousDay) return; // the first day of the curriculum is always open

  const hasFinishedPreviousDay = await journalRepository.findCompletion(traineeId, previousDay.id);
  if (!hasFinishedPreviousDay) throw new DayLockedError();
}

export const journalService = {
  async getJournal(traineeId: string, dayId: string): Promise<DayJournal> {
    await assertDayIsAccessible(traineeId, dayId);

    const entry = await journalRepository.findEntry(traineeId, dayId);

    // No row yet is normal for a new trainee: empty response, not a 404.
    return { responseText: entry ? entry.response_text : null };
  },

  async saveJournal(traineeId: string, dayId: string, responseText: string): Promise<DayJournal> {
    await assertDayIsAccessible(traineeId, dayId);

    const saved = await journalRepository.upsertEntry(traineeId, dayId, responseText);

    return { responseText: saved.response_text };
  },
};
