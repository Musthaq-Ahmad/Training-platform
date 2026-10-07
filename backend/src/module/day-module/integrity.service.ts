import type { DayIntegrityResponse } from '@itp/types';
import { integrityRepository } from './integrity.repository';
import { DayLockedError } from '../../errors/AppError';
import { dayService } from './day.services';
import { buildDayIntegrity } from './integrity.scoring';

export const integrityService = {
  async getDayIntegrity(traineeId: string, dayId: string): Promise<DayIntegrityResponse> {
    // ASSUMPTION: reuse the same lookup that powers the day status endpoint
    // (returns { isLocked, isCompleted } and throws NotFoundError for an unknown day).
    const status = await dayService.getDayStatus(traineeId, dayId);
    if (status.isLocked) throw new DayLockedError();

    const started = await integrityRepository.findStartedTasks(traineeId, dayId);
    const startedTaskIds = started.map((row) => row.task_id);

    const rows =
      startedTaskIds.length > 0
        ? await integrityRepository.findFlagEvents(traineeId, startedTaskIds)
        : [];

    return buildDayIntegrity({
      startedTaskIds,
      events: rows.map((row) => ({
        taskId: row.task_id,
        type: row.type,
        reviewPriority: row.review_priority,
        durationMs: row.duration_ms,
      })),
    });
  },
};
