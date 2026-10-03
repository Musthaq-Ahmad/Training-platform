import type { TypingResultRecord } from '@itp/types';
import { TypingRepository } from './typing.repository';

const typingRepository = new TypingRepository();

function toTypingResultRecord(row: {
  id: string;
  wpm: number;
  accuracy: number;
  taken_at: Date;
}): TypingResultRecord {
  return {
    id: row.id,
    wpm: row.wpm,
    accuracy: Math.round(row.accuracy * 10) / 10,
    takenAt: row.taken_at.toISOString(),
  };
}

export class TypingService {
  async createResult(traineeId: string, wpm: number, accuracy: number) {
    const roundedAccuracy = Math.round(accuracy * 10) / 10;
    const row = await typingRepository.createResult(traineeId, wpm, roundedAccuracy);
    return toTypingResultRecord(row);
  }

  async getResults(traineeId: string): Promise<TypingResultRecord[]> {
    const rows = await typingRepository.findResults(traineeId);
    return rows.map(toTypingResultRecord);
  }
}
