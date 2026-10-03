import { prisma } from '../../lib/prisma';

// Fields of a curriculum day that the dashboard sends (as a DaySummary).
const daySummaryFields = {
  id: true,
  course_id: true,
  day_number: true,
  title: true,
  subtitle: true,
} as const;

export class DashboardRepository {
  /** One day with the lesson-card fields and how many days its course has. */
  findDayWithCourseSize = (dayId: string) => {
    return prisma.curriculum_day.findUnique({
      where: { id: dayId },
      select: {
        ...daySummaryFields,
        course: { select: { _count: { select: { days: true } } } },
      },
    });
  };

  /** A course with its days in day order, or null if there is no such course. */
  findCourseWithDays = (courseId: string) => {
    return prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        days: {
          orderBy: { day_number: 'asc' },
          select: daySummaryFields,
        },
      },
    });
  };

  /** All-time totals. The sums are null when the trainee has no activity rows. */
  sumActivity = (traineeId: string) => {
    return prisma.activity_log.aggregate({
      where: { trainee_id: traineeId },
      _sum: { active_seconds: true, coding_seconds: true },
    });
  };

  /** The trainee's activity row for one calendar day (a @db.Date value), or null. */
  findActivityOn = (traineeId: string, date: Date) => {
    return prisma.activity_log.findUnique({
      where: { trainee_id_date: { trainee_id: traineeId, date } },
      select: { active_seconds: true, coding_seconds: true },
    });
  };

  findLatestTyping = (traineeId: string) => {
    return prisma.typing_test_result.findFirst({
      where: { trainee_id: traineeId },
      orderBy: { taken_at: 'desc' },
      select: { wpm: true, accuracy: true, taken_at: true },
    });
  };

  findTypingSince = (traineeId: string, since: Date) => {
    return prisma.typing_test_result.findMany({
      where: { trainee_id: traineeId, taken_at: { gte: since } },
      orderBy: { taken_at: 'asc' },
      select: { wpm: true, taken_at: true },
    });
  };
}
