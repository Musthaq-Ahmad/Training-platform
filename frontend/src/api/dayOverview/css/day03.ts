import type { DayContent } from '@itp/types';

export const cssDay03: DayContent = {
  dayId: 'css-day-03',
  courseSlug: 'css',
  courseTitle: 'CSS',
  dayNumber: 3,
  totalDays: 5,
  title: 'CSS Grid - Every Property, Complex Layouts',
  subtitle: 'Build two-dimensional layouts using CSS Grid.',
  lessonSummary:
    'Create a dashboard, magazine-style content page, and Services page using CSS Grid.',
  learningObjectives: [
    {
      id: 'css-3-obj-1',
      code: '3.1',
      title: 'Grid Structure',
      description: 'Define grid rows, columns, and gaps.',
    },
    {
      id: 'css-3-obj-2',
      code: '3.2',
      title: 'Grid Placement',
      description: 'Position items using grid lines and grid areas.',
    },
    {
      id: 'css-3-obj-3',
      code: '3.3',
      title: 'Responsive Grid',
      description: 'Create layouts that adapt to different screen sizes.',
    },
    {
      id: 'css-3-obj-4',
      code: '3.4',
      title: 'Complex Layouts',
      description: 'Build dashboard and magazine-style layouts using Grid.',
    },
  ],
  selfCheckItems: [
    {
      id: 'css-3-check-1',
      code: '3.1',
      label: 'Grid structure',
      description: 'Define grid rows, columns, and gaps.',
      isRequired: true,
    },
    {
      id: 'css-3-check-2',
      code: '3.2',
      label: 'Grid placement',
      description: 'Position items using grid lines or areas.',
      isRequired: true,
    },
    {
      id: 'css-3-check-3',
      code: '3.3',
      label: 'Responsive Grid',
      description: 'Adapt the grid to different screen sizes.',
      isRequired: true,
    },
    {
      id: 'css-3-check-4',
      code: '3.4',
      label: 'Complex layouts',
      description: 'Build a dashboard or magazine-style layout.',
      isRequired: true,
    },
  ],
  journalPrompt: 'When would you choose CSS Grid instead of Flexbox?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
