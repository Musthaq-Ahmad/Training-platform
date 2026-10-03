import { prisma } from '../../lib/prisma';

export class DayCompletionRepository {
  findRequiredTaskIds(dayId: string) {
    return prisma.task.findMany({
      where: { curriculum_day_id: dayId, is_stretch_goal: false },
      select: { id: true },
    });
  }

  countCompletedTasks(traineeId: string, taskIds: string[]) {
    return prisma.task_progress.count({
      where: { trainee_id: traineeId, task_id: { in: taskIds }, status: 'completed' },
    });
  }

  findCompletion(traineeId: string, dayId: string) {
    return prisma.day_completion.findUnique({
      where: { trainee_id_curriculum_day_id: { trainee_id: traineeId, curriculum_day_id: dayId } },
      select: { id: true },
    });
  }

  createCompletion(traineeId: string, dayId: string) {
    return prisma.day_completion.create({
      data: { trainee_id: traineeId, curriculum_day_id: dayId },
      select: { id: true },
    });
  }
}
