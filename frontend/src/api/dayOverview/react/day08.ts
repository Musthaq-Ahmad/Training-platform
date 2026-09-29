import type { DayContent } from '@itp/types';

export const reactDay08: DayContent = {
  dayId: 'react-day-08',
  courseSlug: 'react',
  courseTitle: 'React',
  dayNumber: 8,
  totalDays: 10,
  title: 'Effects and Custom Hooks',
  subtitle: 'Separate reusable data behaviour from UI.',
  lessonSummary:
    'Use effects deliberately and create reusable custom hooks. Implement useProjects, useIssues, useIssue, useDebounce, and useDocumentTitle with correct loading and error behaviour, cleanup, and clear typed APIs.',
  learningObjectives: [
    {
      id: 'react-day-08-lo-01',
      code: 'LO1',
      title: 'Understand effect dependencies and cleanup',
      description:
        'Explain effect dependencies and cleanup and avoid effects for pure calculations.',
    },
    {
      id: 'react-day-08-lo-02',
      code: 'LO2',
      title: 'Create reusable custom hooks',
      description: 'Build useProjects, useIssues, useIssue, useDebounce, and useDocumentTitle.',
    },
    {
      id: 'react-day-08-lo-03',
      code: 'LO3',
      title: 'Design clear typed hook APIs',
      description:
        'Ensure hooks expose a clear typed API with correct loading, error, and cleanup behaviour.',
    },
  ],
  selfCheckItems: [
    {
      id: 'react-day-08-sc-01',
      code: 'SC1',
      label: 'Use effects deliberately',
      description:
        'I can explain effect dependencies and cleanup and identify when an effect is unnecessary.',
      isRequired: true,
    },
    {
      id: 'react-day-08-sc-02',
      code: 'SC2',
      label: 'Create reusable custom hooks',
      description:
        'I can implement the required data and utility hooks by extracting repeated behaviour.',
      isRequired: true,
    },
    {
      id: 'react-day-08-sc-03',
      code: 'SC3',
      label: 'Verify hook behaviour',
      description:
        'I can manually test hook behaviour and review effects for necessity, cleanup, and clear typed APIs.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did custom hooks help you separate reusable behaviour from UI? Reflect on the hooks you created, effect dependencies, cleanup, and how you verified their behaviour.',
};
