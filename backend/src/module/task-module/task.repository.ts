import type { TaskFile } from '@itp/types';
import { prisma } from '../../lib/prisma';

export class TaskRepository {
  /** A task with what the task page shows about its day, or null. */
  findTask = (taskId: string) => {
    return prisma.task.findUnique({
      where: { id: taskId },
      select: {
        id: true,
        title: true,
        instructions_markdown: true,
        is_stretch_goal: true,
        sequence_order: true,
        estimated_minutes: true,
        runtime: true,
        run_command: true,
        setup_sql: true,
        curriculum_day: {
          select: { id: true, day_number: true, course: { select: { title: true } } },
        },
      },
    });
  };

  findStarterFiles = (taskId: string) => {
    return prisma.task.findUnique({
      where: { id: taskId },
      select: { starter_files: true },
    });
  };

  /** This trainee's progress row for the task, or null if they haven't saved or submitted it. */
  findProgress = (traineeId: string, taskId: string) => {
    return prisma.task_progress.findUnique({
      where: { trainee_id_task_id: { trainee_id: traineeId, task_id: taskId } },
    });
  };

  /**
   * Stores the whole file set. A new row starts as in_progress; an existing row keeps its status,
   * so a completed task stays completed when it is edited again.
   */
  saveFiles = (traineeId: string, taskId: string, files: TaskFile[], savedAt: Date) => {
    return prisma.task_progress.upsert({
      where: { trainee_id_task_id: { trainee_id: traineeId, task_id: taskId } },
      create: {
        trainee_id: traineeId,
        task_id: taskId,
        status: 'in_progress',
        files,
        code_updated_at: savedAt,
      },
      update: { files, code_updated_at: savedAt },
    });
  };

  /**
   * Marks the task completed. first_submitted_at is set only while it is still empty, in the same
   * transaction, so two submits at once can't overwrite each other's first time.
   */
  markSubmitted = async (traineeId: string, taskId: string, submittedAt: Date) => {
    const key = { trainee_id: traineeId, task_id: taskId };
    const [row] = await prisma.$transaction([
      prisma.task_progress.upsert({
        where: { trainee_id_task_id: key },
        create: {
          ...key,
          status: 'completed',
          first_submitted_at: submittedAt,
          last_submitted_at: submittedAt,
        },
        update: { status: 'completed', last_submitted_at: submittedAt },
      }),
      prisma.task_progress.updateMany({
        where: { ...key, first_submitted_at: null },
        data: { first_submitted_at: submittedAt },
      }),
    ]);
    return row;
  };
}
