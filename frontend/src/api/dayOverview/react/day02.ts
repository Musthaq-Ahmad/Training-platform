import type { DayContent } from '@itp/types';

export const reactDay02: DayContent = {
  dayId: 'react-day-02',
  courseSlug: 'react',
  courseTitle: 'React',
  dayNumber: 2,
  totalDays: 10,
  title: 'Props, Lists and Conditional Rendering',
  subtitle: 'Render reusable UI from data.',
  lessonSummary:
    'Build an Issue List screen using typed props, stable keys, and conditional rendering. Display status and priority variations, an empty list, overdue indicators, and reusable rows or cards without hard-coding business data in display components.',
  learningObjectives: [
    {
      id: 'react-day-02-lo-01',
      code: 'LO1',
      title: 'Render lists with stable keys',
      description: 'Render arrays using stable keys and avoid array indexes when stable IDs exist.',
    },
    {
      id: 'react-day-02-lo-02',
      code: 'LO2',
      title: 'Use conditional rendering',
      description:
        'Render different UI states clearly, including empty lists and overdue indicators.',
    },
    {
      id: 'react-day-02-lo-03',
      code: 'LO3',
      title: 'Build a reusable Issue List',
      description: 'Create reusable issue rows or cards with typed props and data-driven display.',
    },
  ],
  selfCheckItems: [
    {
      id: 'react-day-02-sc-01',
      code: 'SC1',
      label: 'Render lists with stable keys',
      description: 'I can render issue arrays using stable IDs as keys.',
      isRequired: true,
    },
    {
      id: 'react-day-02-sc-02',
      code: 'SC2',
      label: 'Handle UI states conditionally',
      description:
        'I can display status, priority, empty-list, and overdue states using conditional rendering.',
      isRequired: true,
    },
    {
      id: 'react-day-02-sc-03',
      code: 'SC3',
      label: 'Build reusable issue components',
      description:
        'I can build reusable rows or cards without hard-coding business data in display components.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you use props, lists, and conditional rendering to build the Issue List? Reflect on stable keys, reusable components, and the different UI states you handled.',
};
