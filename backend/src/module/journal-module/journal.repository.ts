import { prisma } from '../../lib/prisma';

// Model and field names follow the existing snake_case schema.prisma.
export const journalRepository = {
  /** The day plus where it sits in the curriculum (course order, then day number). */
  findDayWithOrder(dayId: string) {
    return prisma.curriculum_day.findUnique({
      where: { id: dayId },
      select: {
        id: true,
        day_number: true,
        course: { select: { sort_order: true } },
      },
    });
  },

  /** The day immediately before this one in the whole curriculum, or null for the very first day. */
  findPreviousDay(courseSortOrder: number, dayNumber: number) {
    return prisma.curriculum_day.findFirst({
      where: {
        OR: [
          // earlier day in the same course
          { course: { sort_order: courseSortOrder }, day_number: { lt: dayNumber } },
          // any day in an earlier course
          { course: { sort_order: { lt: courseSortOrder } } },
        ],
      },
      orderBy: [{ course: { sort_order: 'desc' } }, { day_number: 'desc' }],
      select: { id: true },
    });
  },

  findCompletion(traineeId: string, dayId: string) {
    return prisma.day_completion.findUnique({
      where: {
        trainee_id_curriculum_day_id: { trainee_id: traineeId, curriculum_day_id: dayId },
      },
    });
  },

  findEntry(traineeId: string, dayId: string) {
    return prisma.journal_response.findUnique({
      where: {
        trainee_id_curriculum_day_id: { trainee_id: traineeId, curriculum_day_id: dayId },
      },
    });
  },

  // One row per trainee per day (@@unique), so save = create the first time, update after that.
  upsertEntry(traineeId: string, dayId: string, responseText: string) {
    return prisma.journal_response.upsert({
      where: {
        trainee_id_curriculum_day_id: { trainee_id: traineeId, curriculum_day_id: dayId },
      },
      create: { trainee_id: traineeId, curriculum_day_id: dayId, response_text: responseText },
      update: { response_text: responseText },
    });
  },
};
