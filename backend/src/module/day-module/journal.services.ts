import type { DayJournal } from '@itp/types';
import { journalRepository } from './journal.repository';
import { assertDayIsAccessible } from './day-access.services';

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
