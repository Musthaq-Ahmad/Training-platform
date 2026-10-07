import type {
  AdminFlagEvent,
  AdminTaskCode,
  AdminTraineeDetail,
  AdminTraineeSummary,
  TaskFile,
} from '@itp/types';

import { NotFoundError } from '../../errors/AppError';
import { istDateValue } from '../../utils/istDate';
import { ProfileService } from '../profile-module/profile.service';
import { ProgressService } from '../progress-module/progress.service';
import { AdminRepository } from './admin.repository';

const repo = new AdminRepository();
const profileService = new ProfileService();
const progressService = new ProgressService();

const FLAG_LIMIT = 500;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export class AdminService {
  /** GET /api/admin/trainees: a fixed number of queries, however many trainees there are. */
  listTrainees = async (): Promise<AdminTraineeSummary[]> => {
    const [trainees, days, completions, totals, today, typing, flags] = await Promise.all([
      repo.listTrainees(),
      repo.listDaysInOrder(),
      repo.listCompletions(),
      repo.activityTotals(),
      repo.activityForDate(istDateValue(0)),
      repo.latestTypingResults(),
      repo.flagCountsSince(new Date(Date.now() - WEEK_MS)),
    ]);

    const completedBy = new Map<string, Set<string>>();
    for (const completion of completions) {
      const set = completedBy.get(completion.trainee_id) ?? new Set<string>();
      set.add(completion.curriculum_day_id);
      completedBy.set(completion.trainee_id, set);
    }
    const totalsBy = new Map(totals.map((row) => [row.trainee_id, row]));
    const todayBy = new Map(today.map((row) => [row.trainee_id, row.active_seconds]));
    const wpmBy = new Map(typing.map((row) => [row.trainee_id, row.wpm]));
    const flagsBy = new Map(flags.map((row) => [row.trainee_id, row._count._all]));

    return trainees.map((trainee) => {
      const done = completedBy.get(trainee.id) ?? new Set<string>();
      // First day in curriculum order that isn't completed; null = finished everything.
      const current = days.find((day) => !done.has(day.id));
      const total = totalsBy.get(trainee.id);

      return {
        id: trainee.id,
        name: trainee.name,
        email: trainee.email,
        daysCompleted: done.size,
        totalDays: days.length,
        currentDay: current
          ? {
              id: current.id,
              courseTitle: current.course.title,
              dayNumber: current.day_number,
              title: current.title,
            }
          : null,
        todayActiveSeconds: todayBy.get(trainee.id) ?? 0,
        totalActiveSeconds: total?._sum.active_seconds ?? 0,
        totalCodingSeconds: total?._sum.coding_seconds ?? 0,
        lastActiveDate: total?._max.date ? total._max.date.toISOString().slice(0, 10) : null,
        latestWpm: wpmBy.get(trainee.id) ?? null,
        flagsLast7Days: flagsBy.get(trainee.id) ?? 0,
      };
    });
  };

  /** GET /api/admin/trainees/:traineeId */
  getTraineeDetail = async (traineeId: string): Promise<AdminTraineeDetail> => {
    await this.assertTrainee(traineeId); // 404 before any other work

    const [profile, statuses, courses, tasks, progress, completions, journal] = await Promise.all([
      profileService.getProfile(traineeId),
      progressService.getDayStatuses(traineeId),
      repo.listCoursesWithDays(),
      repo.listTasks(),
      repo.listTaskProgress(traineeId),
      repo.listCompletionsFor(traineeId),
      repo.listJournal(traineeId),
    ]);

    const statusByDay = new Map(statuses.map((day) => [day.dayId, day.status]));
    const completedAtByDay = new Map(
      completions.map((c) => [c.curriculum_day_id, c.completed_at.toISOString()])
    );
    const progressByTask = new Map(progress.map((p) => [p.task_id, p]));

    return {
      id: traineeId,
      profile,
      courses: courses.map((course) => ({
        id: course.id,
        title: course.title,
        days: course.days.map((day) => ({
          id: day.id,
          dayNumber: day.day_number,
          title: day.title,
          status: statusByDay.get(day.id) ?? 'LOCKED',
          completedAt: completedAtByDay.get(day.id) ?? null,
        })),
      })),
      tasks: tasks.map((task) => {
        const p = progressByTask.get(task.id);
        return {
          taskId: task.id,
          title: task.title,
          dayId: task.curriculum_day_id,
          isStretchGoal: task.is_stretch_goal,
          status: p?.status ?? 'not_started',
          codeUpdatedAt: p?.code_updated_at?.toISOString() ?? null,
          lastSubmittedAt: p?.last_submitted_at?.toISOString() ?? null,
        };
      }),
      journal: journal.map((entry) => ({
        dayId: entry.curriculum_day.id,
        courseTitle: entry.curriculum_day.course.title,
        dayNumber: entry.curriculum_day.day_number,
        dayTitle: entry.curriculum_day.title,
        responseText: entry.response_text,
        updatedAt: entry.updated_at.toISOString(),
      })),
    };
  };

  /** GET /api/admin/trainees/:traineeId/flags: newest first, capped at FLAG_LIMIT. */
  listFlags = async (traineeId: string): Promise<AdminFlagEvent[]> => {
    await this.assertTrainee(traineeId);

    const rows = await repo.listFlags(traineeId, FLAG_LIMIT);
    return rows.map((flag) => ({
      id: flag.id,
      type: flag.type,
      taskId: flag.task.id,
      taskTitle: flag.task.title,
      dayId: flag.task.curriculum_day_id,
      durationMs: flag.duration_ms,
      reviewPriority: flag.review_priority,
      timestamp: flag.timestamp.toISOString(),
    }));
  };

  /** GET /api/admin/trainees/:traineeId/tasks/:taskId/code: read-only. */
  getTaskCode = async (traineeId: string, taskId: string): Promise<AdminTaskCode> => {
    await this.assertTrainee(traineeId);

    const task = await repo.findTask(taskId);
    if (!task) throw new NotFoundError('Task not found.');

    const progress = await repo.findProgress(traineeId, taskId);
    const saved = progress?.files ?? null; // null = never saved

    return {
      taskId: task.id,
      title: task.title,
      status: progress?.status ?? 'not_started',
      isStarterCode: saved === null,
      files: (saved ?? task.starter_files) as unknown as TaskFile[],
      codeUpdatedAt: progress?.code_updated_at?.toISOString() ?? null,
      lastSubmittedAt: progress?.last_submitted_at?.toISOString() ?? null,
    };
  };

  private assertTrainee = async (traineeId: string) => {
    const trainee = await repo.findTrainee(traineeId);
    if (!trainee) throw new NotFoundError('Trainee not found.');
  };
}
