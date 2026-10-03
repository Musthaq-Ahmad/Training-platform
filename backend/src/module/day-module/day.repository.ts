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
}
