import { prisma } from '../../lib/prisma';

export class CertificateRepository {
  findCourse = (courseId: string) =>
    prisma.course.findUnique({ where: { id: courseId }, select: { id: true, title: true } });

  findTrainee = (traineeId: string) =>
    prisma.trainee.findUnique({ where: { id: traineeId }, select: { name: true } });

  /** Every curriculum day with its course (about 54 rows). */
  findAllDays = () => prisma.curriculum_day.findMany({ select: { id: true, course_id: true } });

  /** This trainee's completions, one bulk query. */
  findCompletions = (traineeId: string) =>
    prisma.day_completion.findMany({
      where: { trainee_id: traineeId },
      select: { curriculum_day_id: true, completed_at: true },
    });
}
