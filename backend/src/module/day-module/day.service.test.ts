import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '../../errors/AppError';

const repo = vi.hoisted(() => ({
  findContent: vi.fn(),
}));

const { mockGetDayStatus } = vi.hoisted(() => ({ mockGetDayStatus: vi.fn() }));

vi.mock('./day.repository', () => ({
  DayRepository: class {
    findContent = repo.findContent;
  },
}));

vi.mock('../progress-module/progress.service', () => ({
  ProgressService: class {
    getDayStatus = mockGetDayStatus;
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
    mockGetDayStatus.mockResolvedValue('UNLOCKED');
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
      mockGetDayStatus.mockResolvedValue(status);

      await expect(service.getCurrentStatus('trainee-1', day.id)).resolves.toEqual(expected);
      expect(mockGetDayStatus).toHaveBeenCalledWith('trainee-1', day.id);
    });
  });
});
