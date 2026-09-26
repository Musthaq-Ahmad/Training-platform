// frontend/src/api/dashboard.ts
import type { DashboardResponse } from '@itp/types';

// TODO: replace mock with real call once GET /api/dashboard exists (see conventions.md §4, §15)
// import { apiClient } from './client';

function mockDays(
  courseId: string,
  count: number,
  status: DashboardResponse['courses'][number]['days'][number]['status']
) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${courseId}-day-${i + 1}`,
    courseId,
    dayNumber: i + 1,
    title: `${courseId} lesson ${i + 1}`,
    status,
  }));
}

function mockJsDays(): DashboardResponse['courses'][number]['days'] {
  return Array.from({ length: 12 }, (_, i) => {
    const dayNumber = i + 1;
    const status = dayNumber < 6 ? 'COMPLETED' : dayNumber === 6 ? 'UNLOCKED' : 'LOCKED';
    return {
      id: dayNumber === 6 ? 'day-js-06' : `course-js-day-${dayNumber}`,
      courseId: 'course-js',
      dayNumber,
      title: dayNumber === 6 ? 'Closures and Higher-Order Functions' : `JS lesson ${dayNumber}`,
      status,
    };
  });
}

const MOCK_DASHBOARD: DashboardResponse = {
  currentDay: {
    id: 'day-js-06',
    courseId: 'course-js',
    dayNumber: 6,
    title: 'Closures and Higher-Order Functions',
    description:
      'Implement memoized function wrappers and partial application utilities with strict scope isolation.',
    status: 'UNLOCKED',
  },
  currentCourseId: 'course-js',
  courses: [
    { id: 'course-html', title: 'HTML', days: mockDays('course-html', 5, 'COMPLETED') },
    { id: 'course-css', title: 'CSS', days: mockDays('course-css', 5, 'COMPLETED') },
    { id: 'course-js', title: 'JavaScript', days: mockJsDays() },
    { id: 'course-ts', title: 'TypeScript', days: mockDays('course-ts', 8, 'LOCKED') },
    { id: 'course-node', title: 'Node.js', days: mockDays('course-node', 8, 'LOCKED') },
    {
      id: 'course-postgresql',
      title: 'PostgreSQL',
      days: mockDays('course-postgresql', 6, 'LOCKED'),
    },
    { id: 'course-prisma', title: 'Prisma', days: mockDays('course-prisma', 4, 'LOCKED') },
    { id: 'course-react', title: 'React', days: mockDays('course-react', 12, 'LOCKED') },
  ],
  totalDaysCompleteOverall: 17,
  totalDaysOverall: 60,
  today: { activeSeconds: 5400, codingSeconds: 3600, readingSeconds: 1800 },
  total: { activeSeconds: 153000, codingSeconds: 101700, readingSeconds: 51300 },
  typing: {
    latest: { wpm: 74, accuracy: 96, takenAt: new Date().toISOString() },
    todayAverageWpm: 71,
    trend: [
      { date: '2026-09-20', averageWpm: 65 },
      { date: '2026-09-21', averageWpm: 68 },
      { date: '2026-09-22', averageWpm: 70 },
      { date: '2026-09-23', averageWpm: 69 },
      { date: '2026-09-24', averageWpm: 74 },
    ],
  },
};

export async function getDashboard(): Promise<DashboardResponse> {
  // Simulates network latency so loading states are visible during dev
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_DASHBOARD;
}
