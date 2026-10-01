import type { task_progress } from '../../generated/prisma/client';
import { NotFoundError, DayLockedError } from '../../errors/AppError';
import { ProgressRepository } from './progress.repository';

const progressRepository = new ProgressRepository();

export type DayStatus = 'COMPLETED' | 'UNLOCKED' | 'LOCKED';

export interface DayProgress {
  dayId: string;
  status: DayStatus;
}

export class ProgressService {
  /**
   * Returns the status of every curriculum day for a trainee.
   * Uses two bulk queries, regardless of the number of days.
   */
  async getDayStatuses(traineeId: string): Promise<DayProgress[]> {
    const [days, completions] = await Promise.all([
      progressRepository.getCurriculumDays(),
      progressRepository.getDayCompletions(traineeId),
    ]);

    const completedDayIds = new Set(completions.map((completion) => completion.curriculum_day_id));

    let unlockedDayFound = false;

    return days.map((day) => {
      if (completedDayIds.has(day.id)) {
        return {
          dayId: day.id,
          status: 'COMPLETED',
        };
      }

      if (!unlockedDayFound) {
        unlockedDayFound = true;

        return {
          dayId: day.id,
          status: 'UNLOCKED',
        };
      }

      return {
        dayId: day.id,
        status: 'LOCKED',
      };
    });
  }

  /**
   * Returns the status of one day.
   * Throws 404 if the day does not exist.
   */
  async getDayStatus(traineeId: string, dayId: string): Promise<DayStatus> {
    const statuses = await this.getDayStatuses(traineeId);
    const dayStatus = statuses.find((day) => day.dayId === dayId);

    if (!dayStatus) {
      throw new NotFoundError('Day not found.');
    }

    return dayStatus.status;
  }

  /**
   * Ensures that a day is accessible to the trainee.
   * Throws 404 for an unknown day and 403 for a locked day.
   */
  async assertDayUnlocked(traineeId: string, dayId: string): Promise<void> {
    const status = await this.getDayStatus(traineeId, dayId);

    if (status === 'LOCKED') {
      throw new DayLockedError();
    }
  }

  /**
   * A task is accessible only when its parent day is accessible.
   * Throws 404 if the task does not exist.
   */
  async assertTaskUnlocked(traineeId: string, taskId: string): Promise<void> {
    const task = await progressRepository.getTaskById(taskId);

    if (!task) {
      throw new NotFoundError('Task not found.');
    }

    await this.assertDayUnlocked(traineeId, task.curriculum_day_id);
  }

  /**
   * Derives task status from the trainee's saved progress row.
   */
  taskStatus(progressRow: task_progress | null): 'completed' | 'in_progress' | 'not_started' {
    if (!progressRow) {
      return 'not_started';
    }

    if (progressRow.status === 'completed') {
      return 'completed';
    }

    if (progressRow.code_updated_at || progressRow.files !== null) {
      return 'in_progress';
    }

    return 'not_started';
  }
}
