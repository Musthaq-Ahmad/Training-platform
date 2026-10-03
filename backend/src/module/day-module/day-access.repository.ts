import { prisma } from '../../lib/prisma';

// Queries for the "is this day unlocked for this trainee?" rule. Shared by every endpoint
// that sits under /api/days/:dayId/... so the lock rule lives in exactly one place.
export const dayAccessRepository = {
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
};
