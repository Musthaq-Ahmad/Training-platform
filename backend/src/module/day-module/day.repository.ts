import { prisma } from '../../lib/prisma';

export class DayRepository {
  findContent(dayId: string) {
    return prisma.curriculum_day.findUnique({
      where: { id: dayId },
      select: {
        id: true,
        day_number: true,
        title: true,
        subtitle: true,
        lesson_summary: true,
        journal_prompt: true,
        course: {
          select: {
            id: true,
            title: true,
            _count: { select: { days: true } },
          },
        },
        learning_objectives: {
          orderBy: { sort_order: 'asc' },
          select: { id: true, code: true, title: true, description: true },
        },
        self_check_items: {
          orderBy: { sort_order: 'asc' },
          select: {
            id: true,
            code: true,
            label: true,
            description: true,
            is_required: true,
          },
        },
      },
    });
  }

  findTasks(dayId: string, traineeId: string) {
    return prisma.task.findMany({
      where: { curriculum_day_id: dayId },
      orderBy: { sequence_order: 'asc' },
      select: {
        id: true,
        sequence_order: true,
        title: true,
        is_stretch_goal: true,
        progress: {
          where: { trainee_id: traineeId },
          take: 1,
        },
      },
    });
  }

  findJournal(dayId: string, traineeId: string) {
    return prisma.journal_response.findUnique({
      where: { trainee_id_curriculum_day_id: { trainee_id: traineeId, curriculum_day_id: dayId } },
      select: { response_text: true },
    });
  }

  saveJournal(dayId: string, traineeId: string, responseText: string) {
    return prisma.journal_response.upsert({
      where: { trainee_id_curriculum_day_id: { trainee_id: traineeId, curriculum_day_id: dayId } },
      create: { trainee_id: traineeId, curriculum_day_id: dayId, response_text: responseText },
      update: { response_text: responseText },
    });
  }
}
