import type { DayContent } from '@itp/types';

export const cssDay02: DayContent = {
  dayId: 'css-day-02',
  courseSlug: 'css',
  courseTitle: 'CSS',
  dayNumber: 2,
  totalDays: 5,
  title: 'CSS Flexbox - Every Property, Real Layouts',
  subtitle: 'Create flexible layouts using Flexbox.',
  lessonSummary:
    'Build a navigation bar, card layout, page header, and About page using Flexbox properties and responsive layouts.',
  learningObjectives: [
    {
      id: 'css-2-obj-1',
      code: '2.1',
      title: 'Flexbox Axes',
      description: 'Understand main axis, cross axis, and flex-direction.',
    },
    {
      id: 'css-2-obj-2',
      code: '2.2',
      title: 'Alignment',
      description: 'Use justify-content and align-items correctly.',
    },
    {
      id: 'css-2-obj-3',
      code: '2.3',
      title: 'Flex Item Properties',
      description: 'Use flex-grow, flex-shrink, and flex-basis.',
    },
    {
      id: 'css-2-obj-4',
      code: '2.4',
      title: 'Responsive Flexbox',
      description: 'Build layouts that adapt to smaller screens.',
    },
  ],
  selfCheckItems: [
    {
      id: 'css-2-check-1',
      code: '2.1',
      label: 'Flexbox axes',
      description: 'Explain the main and cross axes.',
      isRequired: true,
    },
    {
      id: 'css-2-check-2',
      code: '2.2',
      label: 'Alignment',
      description: 'Use alignment properties correctly.',
      isRequired: true,
    },
    {
      id: 'css-2-check-3',
      code: '2.3',
      label: 'Flex item sizing',
      description: 'Use grow, shrink, and basis properties.',
      isRequired: true,
    },
    {
      id: 'css-2-check-4',
      code: '2.4',
      label: 'Responsive layout',
      description: 'Build a layout that adapts to a single column.',
      isRequired: true,
    },
  ],
  journalPrompt: 'What is the difference between the main axis and cross axis in Flexbox?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
