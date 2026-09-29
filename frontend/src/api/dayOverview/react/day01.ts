import type { DayContent } from '@itp/types';

export const reactDay01: DayContent = {
  dayId: 'react-day-01',
  courseSlug: 'react',
  courseTitle: 'React',
  dayNumber: 1,
  totalDays: 10,
  title: 'React Mental Model and Setup',
  subtitle: 'Build a static component-based dashboard.',
  lessonSummary:
    'Understand components, JSX, props, and UI decomposition. Set up a React TypeScript application with Vite and build a static project and issue dashboard using reusable components, semantic HTML, and typed props.',
  learningObjectives: [
    {
      id: 'react-day-01-lo-01',
      code: 'LO1',
      title: 'Understand React components and JSX',
      description: 'Explain components, JSX, props, and UI decomposition.',
    },
    {
      id: 'react-day-01-lo-02',
      code: 'LO2',
      title: 'Build reusable typed components',
      description: 'Create typed function components and break a screen into reusable parts.',
    },
    {
      id: 'react-day-01-lo-03',
      code: 'LO3',
      title: 'Set up a React TypeScript application',
      description:
        'Run a React TypeScript app with Vite and compose a static dashboard using semantic HTML.',
    },
  ],
  selfCheckItems: [
    {
      id: 'react-day-01-sc-01',
      code: 'SC1',
      label: 'Understand components and JSX',
      description: 'I can explain how components, JSX, and props help organise a React interface.',
      isRequired: true,
    },
    {
      id: 'react-day-01-sc-02',
      code: 'SC2',
      label: 'Build reusable typed components',
      description:
        'I can create typed function components and divide the dashboard into reusable parts.',
      isRequired: true,
    },
    {
      id: 'react-day-01-sc-03',
      code: 'SC3',
      label: 'Build the static dashboard',
      description: 'I can create the dashboard using Vite, semantic HTML, and typed props.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you break the dashboard into reusable React components? Reflect on your component tree, typed props, semantic HTML, and accessibility and responsiveness review.',
};
