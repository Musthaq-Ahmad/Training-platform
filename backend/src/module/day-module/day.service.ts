import type { DayContent, DayCurrentStatus } from '@itp/types';
import { NotFoundError } from '../../errors/AppError';
import { ProgressService } from '../progress-module/progress.service';
import { DayRepository } from './day.repository';

const dayRepository = new DayRepository();
const progressService = new ProgressService();

export class DayService {
  async getContent(dayId: string): Promise<DayContent> {
    const day = await dayRepository.findContent(dayId);
    if (!day) throw new NotFoundError('Day not found.');

    return {
      dayId: day.id,
      courseSlug: day.course.id,
      courseTitle: day.course.title,
      dayNumber: day.day_number,
      totalDays: day.course._count.days,
      title: day.title,
      subtitle: day.subtitle,
      lessonSummary: day.lesson_summary,
      learningObjectives: day.learning_objectives,
      selfCheckItems: day.self_check_items.map((item) => ({
        id: item.id,
        code: item.code,
        label: item.label,
        description: item.description,
        isRequired: item.is_required,
      })),
      journalPrompt: day.journal_prompt,
    };
  }

  async getCurrentStatus(traineeId: string, dayId: string): Promise<DayCurrentStatus> {
    const status = await progressService.getDayStatus(traineeId, dayId);
    return {
      isLocked: status === 'LOCKED',
      isCompleted: status === 'COMPLETED',
    };
  }
}
