import { describe, it, expect } from 'vitest';
import { CURRICULUM_COURSES } from '../../constants/courses';
import { mockDayContents } from '../../api/dayOverview';
import { catalogDays } from '../../api/mockTasks';
import { dayReferences } from '../../content/data/dayReferences';
import { buildCourseDays, mockCurriculumDayIds, mockDayProgress } from './dashboard';
import { mockStatusByDay } from './dayStatus';
import { mockTasksByDay } from './dayTasks';

// Every page reads a different mock file. This test keeps them on the same day ids and the
// same progress, so clicking dashboard -> day -> task -> back never lands on "not found".

const dayIds = mockCurriculumDayIds;

describe('mock data consistency', () => {
  it('uses the course ids from CURRICULUM_COURSES for every day id', () => {
    const courseIds = CURRICULUM_COURSES.map((c) => c.id);
    for (const dayId of dayIds) {
      expect(courseIds).toContain(dayId.split('-day-')[0]);
    }
  });

  it('has day page content for every dashboard day, and nothing else', () => {
    expect(Object.keys(mockDayContents).sort()).toEqual([...dayIds].sort());
  });

  it('keeps each day content dayId and courseSlug equal to its key', () => {
    for (const [key, day] of Object.entries(mockDayContents)) {
      expect(day.dayId).toBe(key);
      expect(key.startsWith(`${day.courseSlug}-day-`)).toBe(true);
    }
  });

  it('has tasks in the catalog for every dashboard day, and nothing else', () => {
    expect(catalogDays.map((d) => d.dayId).sort()).toEqual([...dayIds].sort());
    for (const dayId of dayIds) {
      expect(mockTasksByDay[dayId]?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it('gives every task an id that starts with its own day id', () => {
    for (const day of catalogDays) {
      for (const task of day.tasks) {
        expect(task.id.startsWith(`${day.dayId}-t-`)).toBe(true);
      }
    }
  });

  it('shows the same progress on the dashboard, the day page and the task list', () => {
    const courseDays = CURRICULUM_COURSES.flatMap((c) => buildCourseDays(c.id) ?? []);
    for (const summary of courseDays) {
      const status = mockStatusByDay[summary.id];
      expect(status).toEqual({
        isLocked: summary.status === 'LOCKED',
        isCompleted: summary.status === 'COMPLETED',
      });
      const expectedTaskStatus = summary.status === 'COMPLETED' ? 'completed' : 'not_started';
      for (const task of mockTasksByDay[summary.id] ?? []) {
        expect(task.status).toBe(expectedTaskStatus);
      }
    }
  });

  it('points every reference page at a real day', () => {
    for (const ref of dayReferences) {
      expect(mockDayProgress(ref.id)).not.toBeNull();
    }
  });
});
