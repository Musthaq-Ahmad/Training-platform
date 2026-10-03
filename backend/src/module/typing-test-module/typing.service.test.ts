import { beforeEach, describe, expect, it, vi } from 'vitest';

const repository = vi.hoisted(() => ({
  createResult: vi.fn(),
  findResults: vi.fn(),
}));

vi.mock('./typing.repository', () => ({
  TypingRepository: class {
    createResult = repository.createResult;
    findResults = repository.findResults;
  },
}));

import { TypingService } from './typing.service';

describe('TypingService', () => {
  let service: TypingService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new TypingService();
  });

  describe('createResult', () => {
    it('rounds accuracy before saving and returns the saved result with an ISO timestamp', async () => {
      const takenAt = new Date('2026-10-03T08:15:30.000Z');
      repository.createResult.mockResolvedValue({
        id: 'result-1',
        wpm: 74,
        accuracy: 96.5,
        taken_at: takenAt,
      });

      await expect(service.createResult('trainee-1', 74, 96.46)).resolves.toEqual({
        id: 'result-1',
        wpm: 74,
        accuracy: 96.5,
        takenAt: '2026-10-03T08:15:30.000Z',
      });
      expect(repository.createResult).toHaveBeenCalledWith('trainee-1', 74, 96.5);
    });
  });

  describe('getResults', () => {
    it("returns the trainee's result history with ISO timestamps", async () => {
      repository.findResults.mockResolvedValue([
        {
          id: 'result-2',
          wpm: 82,
          accuracy: 98.04,
          taken_at: new Date('2026-10-03T08:15:30.000Z'),
        },
        {
          id: 'result-1',
          wpm: 74,
          accuracy: 96.46,
          taken_at: new Date('2026-10-02T08:15:30.000Z'),
        },
      ]);

      await expect(service.getResults('trainee-1')).resolves.toEqual([
        {
          id: 'result-2',
          wpm: 82,
          accuracy: 98,
          takenAt: '2026-10-03T08:15:30.000Z',
        },
        {
          id: 'result-1',
          wpm: 74,
          accuracy: 96.5,
          takenAt: '2026-10-02T08:15:30.000Z',
        },
      ]);
      expect(repository.findResults).toHaveBeenCalledWith('trainee-1');
    });
  });
});
