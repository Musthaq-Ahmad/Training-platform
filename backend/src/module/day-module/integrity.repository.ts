import { prisma } from '../../lib/prisma';

export const integrityRepository = {
  /** Tasks of this day the trainee has worked on (a task_progress row that is not "not_started"). */
  findStartedTasks(traineeId: string, dayId: string) {
    return prisma.task_progress.findMany({
      where: {
        trainee_id: traineeId,
        status: { in: ['in_progress', 'completed'] },
        task: { curriculum_day_id: dayId }, // flag -> task -> day mapping lives here
      },
      select: { task_id: true },
    });
  },

  /** Flag events for the given tasks. `context_data` is deliberately NOT selected (mentor-only). */
  findFlagEvents(traineeId: string, taskIds: string[]) {
    return prisma.flag_event.findMany({
      where: { trainee_id: traineeId, task_id: { in: taskIds } },
      select: { task_id: true, type: true, review_priority: true, duration_ms: true },
      orderBy: { timestamp: 'asc' },
    });
  },
};
