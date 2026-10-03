import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DayLockedError, NotFoundError } from '../../errors/AppError';

const repo = vi.hoisted(() => ({
  findContent: vi.fn(),
  findTasks: vi.fn(),
  findJournal: vi.fn(),
  saveJournal: vi.fn(),
}));

const progress = vi.hoisted(() => ({
  getDayStatus: vi.fn(),
  assertDayUnlocked: vi.fn(),
  taskStatus: vi.fn(),
}));

vi.mock('./day.repository', () => ({
  DayRepository: class {
    findContent = repo.findContent;
    findTasks = repo.findTasks;
    findJournal = repo.findJournal;
    saveJournal = repo.saveJournal;
  },
}));

vi.mock('../progress-module/progress.service', () => ({
  ProgressService: class {
    getDayStatus = progress.getDayStatus;
    assertDayUnlocked = progress.assertDayUnlocked;
    taskStatus = progress.taskStatus;
  },
}));

import { DayService } from './day.service';

describe('DayService', () => {
  let service: DayService;

  const day = {
    id: 'html-day-01',
    day_number: 1,
    title: 'HTML structure',
    subtitle: 'Build valid HTML pages.',
    lesson_summary: 'Create a page with semantic structure.',
    journal_prompt: 'What did you learn?',
    course: { id: 'html', title: 'HTML', _count: { days: 10 } },
    learning_objectives: [
      { id: 'objective-1', code: '1.1', title: 'Structure', description: 'Use HTML elements.' },
    ],
    self_check_items: [
      {
        id: 'check-1',
        code: '1.1',
        label: 'Document structure',
        description: 'Write the document skeleton.',
        is_required: true,
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new DayService();
    repo.findContent.mockResolvedValue(day);
    progress.getDayStatus.mockResolvedValue('UNLOCKED');
    progress.assertDayUnlocked.mockResolvedValue(undefined);
    progress.taskStatus.mockReturnValue('not_started');
  });

  describe('getContent', () => {
    it('maps database fields to the DayContent response shape', async () => {
      await expect(service.getContent(day.id)).resolves.toEqual({
        dayId: day.id,
        courseSlug: 'html',
        courseTitle: 'HTML',
        dayNumber: 1,
        totalDays: 10,
        title: 'HTML structure',
        subtitle: 'Build valid HTML pages.',
        lessonSummary: 'Create a page with semantic structure.',
        learningObjectives: day.learning_objectives,
        selfCheckItems: [
          {
            id: 'check-1',
            code: '1.1',
            label: 'Document structure',
            description: 'Write the document skeleton.',
            isRequired: true,
          },
        ],
        journalPrompt: 'What did you learn?',
      });
      expect(repo.findContent).toHaveBeenCalledWith(day.id);
    });

    it('throws NotFoundError when the day does not exist', async () => {
      repo.findContent.mockResolvedValue(null);

      await expect(service.getContent('missing-day')).rejects.toBeInstanceOf(NotFoundError);
    });
  });

  describe('getCurrentStatus', () => {
    it.each([
      ['UNLOCKED', { isLocked: false, isCompleted: false }],
      ['LOCKED', { isLocked: true, isCompleted: false }],
      ['COMPLETED', { isLocked: false, isCompleted: true }],
    ] as const)('maps %s progress to the current status response', async (status, expected) => {
      progress.getDayStatus.mockResolvedValue(status);

      await expect(service.getCurrentStatus('trainee-1', day.id)).resolves.toEqual(expected);
      expect(progress.getDayStatus).toHaveBeenCalledWith('trainee-1', day.id);
    });
  });

  describe('getTasks', () => {
    it('checks access and maps ordered task records with trainee progress', async () => {
      repo.findTasks.mockResolvedValue([
        {
          id: 'html-task-1',
          sequence_order: 1,
          title: 'Profile page',
          is_stretch_goal: false,
          progress: [{ status: 'completed' }],
        },
        {
          id: 'html-task-2',
          sequence_order: 2,
          title: 'Print styles',
          is_stretch_goal: true,
          progress: [],
        },
      ]);
      progress.taskStatus.mockReturnValueOnce('completed').mockReturnValueOnce('not_started');

      await expect(service.getTasks('trainee-1', day.id)).resolves.toEqual([
        {
          id: 'html-task-1',
          sequenceOrder: 1,
          title: 'Profile page',
          status: 'completed',
          isStretchGoal: false,
        },
        {
          id: 'html-task-2',
          sequenceOrder: 2,
          title: 'Print styles',
          status: 'not_started',
          isStretchGoal: true,
        },
      ]);
      expect(progress.assertDayUnlocked).toHaveBeenCalledWith('trainee-1', day.id);
      expect(repo.findTasks).toHaveBeenCalledWith(day.id, 'trainee-1');
      expect(progress.taskStatus).toHaveBeenNthCalledWith(1, { status: 'completed' });
      expect(progress.taskStatus).toHaveBeenNthCalledWith(2, null);
    });

    it('propagates a locked day error without querying tasks', async () => {
      progress.assertDayUnlocked.mockRejectedValue(new DayLockedError());

      await expect(service.getTasks('trainee-1', day.id)).rejects.toBeInstanceOf(DayLockedError);
      expect(repo.findTasks).not.toHaveBeenCalled();
    });
  });

  describe('journal', () => {
    it('returns null when the trainee has not saved a response', async () => {
      repo.findJournal.mockResolvedValue(null);

      await expect(service.getJournal('trainee-1', day.id)).resolves.toEqual({
        responseText: null,
      });
      expect(progress.assertDayUnlocked).toHaveBeenCalledWith('trainee-1', day.id);
      expect(repo.findJournal).toHaveBeenCalledWith(day.id, 'trainee-1');
    });

    it('returns the trainee’s saved response', async () => {
      repo.findJournal.mockResolvedValue({ response_text: 'Semantic tags matter.' });

      await expect(service.getJournal('trainee-1', day.id)).resolves.toEqual({
        responseText: 'Semantic tags matter.',
      });
    });

    it('trims and saves the response for the authenticated trainee', async () => {
      repo.saveJournal.mockResolvedValue({ response_text: 'My answer' });

      await expect(service.saveJournal('trainee-1', day.id, '  My answer  ')).resolves.toEqual({
        responseText: 'My answer',
      });
      expect(progress.assertDayUnlocked).toHaveBeenCalledWith('trainee-1', day.id);
      expect(repo.saveJournal).toHaveBeenCalledWith(day.id, 'trainee-1', 'My answer');
    });
  });
});
