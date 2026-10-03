import { prisma } from '../../lib/prisma';
import type { review_priority } from '../../generated/prisma/enums';
import type { CreateFlagData } from './flag.schema';
import type { flag_event_type } from '../../generated/prisma/enums';

export class FlagRepository {
  findTask = async (taskId: string) => {
    return prisma.task.findUnique({
      where: { id: taskId },
      select: {
        curriculum_day: {
          select: {
            id: true,
          },
        },
      },
    });
  };
  createFlag = (data: CreateFlagData, priority: review_priority, traineeId: string) => {
    return prisma.flag_event.create({
      data: {
        trainee_id: traineeId,
        task_id: data.taskId,
        type: data.type,
        review_priority: priority,
        duration_ms: data.durationMs,
        context_data: data.context,
      },
      select: { id: true },
    });
  };
  findRecentFlag(traineeId: string, taskId: string, type: flag_event_type, since: Date) {
    return prisma.flag_event.findFirst({
      where: { trainee_id: traineeId, task_id: taskId, type, timestamp: { gte: since } },
      select: { id: true },
    });
  }
}
