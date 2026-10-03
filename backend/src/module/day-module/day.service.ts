import type { DayContent, DayCurrentStatus, DayJournal, DayTask } from '@itp/types';
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

  async getTasks(traineeId: string, dayId: string): Promise<DayTask[]> {
    await progressService.assertDayUnlocked(traineeId, dayId);
    const tasks = await dayRepository.findTasks(dayId, traineeId);
    return tasks.map((task) => ({
      id: task.id,
      sequenceOrder: task.sequence_order,
      title: task.title,
      status: progressService.taskStatus(task.progress[0] ?? null),
      isStretchGoal: task.is_stretch_goal,
    }));
  }

  async getJournal(traineeId: string, dayId: string): Promise<DayJournal> {
    await progressService.assertDayUnlocked(traineeId, dayId);
    const journal = await dayRepository.findJournal(dayId, traineeId);
    return { responseText: journal?.response_text ?? null };
  }

  async saveJournal(traineeId: string, dayId: string, responseText: string): Promise<DayJournal> {
    await progressService.assertDayUnlocked(traineeId, dayId);
    const journal = await dayRepository.saveJournal(dayId, traineeId, responseText.trim());
    return { responseText: journal.response_text };
  }
}
