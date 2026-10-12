import type { CourseCertificate } from '@itp/types';
import { ForbiddenError, NotFoundError } from '../../errors/AppError';
import { CertificateRepository } from './certificate.repository';
import { buildCertificateId } from './certificate.util';

const certificateRepository = new CertificateRepository();

export const CERTIFICATE_LOCKED_MESSAGE = 'Finish every day of this course to get its certificate.';

export type CourseCompletion = { dayCount: number; complete: boolean; completedAt: Date | null };

/** Pure: the one definition of "course finished", used by the endpoint and the dashboard. */
export function summarizeCompletions(
  days: { id: string; course_id: string }[],
  completions: { curriculum_day_id: string; completed_at: Date }[]
): Map<string, CourseCompletion> {
  const completedAtByDay = new Map(completions.map((c) => [c.curriculum_day_id, c.completed_at]));
  const tally = new Map<string, { dayCount: number; done: number; latest: Date | null }>();

  for (const day of days) {
    const entry = tally.get(day.course_id) ?? { dayCount: 0, done: 0, latest: null };
    entry.dayCount += 1;
    const at = completedAtByDay.get(day.id);
    if (at) {
      entry.done += 1;
      if (!entry.latest || at > entry.latest) entry.latest = at;
    }
    tally.set(day.course_id, entry);
  }

  return new Map(
    [...tally].map(([courseId, t]) => [
      courseId,
      {
        dayCount: t.dayCount,
        complete: t.dayCount > 0 && t.done === t.dayCount,
        completedAt: t.dayCount > 0 && t.done === t.dayCount ? t.latest : null,
      },
    ])
  );
}

export class CertificateService {
  private async loadSummary(traineeId: string) {
    const [days, completions] = await Promise.all([
      certificateRepository.findAllDays(),
      certificateRepository.findCompletions(traineeId),
    ]);
    return summarizeCompletions(days, completions);
  }

  async getCompletedCourseIds(traineeId: string): Promise<string[]> {
    const summary = await this.loadSummary(traineeId);
    return [...summary].filter(([, c]) => c.complete).map(([courseId]) => courseId);
  }

  /** 404 for an unknown course, 403 until every day of it is completed. */
  async getCourseCertificate(traineeId: string, courseId: string): Promise<CourseCertificate> {
    const course = await certificateRepository.findCourse(courseId);
    if (!course) throw new NotFoundError('Course not found.');

    const completion = (await this.loadSummary(traineeId)).get(courseId);
    if (!completion?.complete || !completion.completedAt) {
      throw new ForbiddenError(CERTIFICATE_LOCKED_MESSAGE);
    }

    const trainee = await certificateRepository.findTrainee(traineeId);
    if (!trainee) throw new NotFoundError('Trainee not found.');

    return {
      courseId: course.id,
      courseTitle: course.title,
      traineeName: trainee.name,
      daysCompleted: completion.dayCount,
      completedAt: completion.completedAt.toISOString(),
      certificateId: buildCertificateId(traineeId, courseId),
    };
  }
}
