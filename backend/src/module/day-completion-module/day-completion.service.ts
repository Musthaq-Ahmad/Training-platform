import type { CompleteDayResponse } from '@itp/types';
import { ChecklistIncompleteError } from '../../errors/AppError';
import { ProgressService } from '../progress-module/progress.service';
import { DayCompletionRepository } from './day-completion.repository';

const completionRepository = new DayCompletionRepository();
const progressService = new ProgressService();

function isUniqueConstraintError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002';
}

export class DayCompletionService {
  async completeDay(traineeId: string, dayId: string): Promise<CompleteDayResponse> {
    // This checks that the day exists before checking its lock state.
    await progressService.assertDayUnlocked(traineeId, dayId);

    const requiredTaskIds = (await completionRepository.findRequiredTaskIds(dayId)).map(
      (task) => task.id
    );
    const completedTasks = requiredTaskIds.length
      ? await completionRepository.countCompletedTasks(traineeId, requiredTaskIds)
      : 0;
    const requiredTasks = requiredTaskIds.length;

    if (completedTasks < requiredTasks) {
      throw new ChecklistIncompleteError(completedTasks, requiredTasks);
    }

    const existingCompletion = await completionRepository.findCompletion(traineeId, dayId);
    if (!existingCompletion) {
      try {
        await completionRepository.createCompletion(traineeId, dayId);
      } catch (error) {
        // Two submit requests can pass the read above together. The unique constraint decides
        // which request inserts the row; the other one is an idempotent repeat submission.
        if (!isUniqueConstraintError(error)) throw error;
      }
    }

    const dayStatuses = await progressService.getDayStatuses(traineeId);
    return {
      status: { isLocked: false, isCompleted: true },
      nextDayId: dayStatuses.find((day) => day.status === 'UNLOCKED')?.dayId ?? null,
    };
  }
}
