import type { DayContent } from '@itp/types';

export const reactDay06: DayContent = {
  dayId: 'react-day-06',
  courseSlug: 'react',
  courseTitle: 'React',
  dayNumber: 6,
  totalDays: 10,
  title: 'Routing and Pages',
  subtitle: 'Turn components into a navigable application.',
  lessonSummary:
    'Use client-side routing, route parameters, and nested layouts to build a navigable application. Add routes for login, projects, issues, profile, and not-found states, with active navigation, working direct URLs, and useful invalid-ID states.',
  learningObjectives: [
    {
      id: 'react-day-06-lo-01',
      code: 'LO1',
      title: 'Define routes and layouts',
      description:
        'Configure client-side routes and nested application layouts using React Router.',
    },
    {
      id: 'react-day-06-lo-02',
      code: 'LO2',
      title: 'Use route parameters',
      description: 'Read route parameters and handle invalid IDs and missing pages.',
    },
    {
      id: 'react-day-06-lo-03',
      code: 'LO3',
      title: 'Build navigable application pages',
      description:
        'Implement login, projects, issues, profile, not-found states, active navigation, and working direct URLs.',
    },
  ],
  selfCheckItems: [
    {
      id: 'react-day-06-sc-01',
      code: 'SC1',
      label: 'Configure routes and nested layouts',
      description: 'I can define application routes and nested layouts using React Router.',
      isRequired: true,
    },
    {
      id: 'react-day-06-sc-02',
      code: 'SC2',
      label: 'Handle route parameters and invalid IDs',
      description:
        'I can read route parameters and provide useful invalid-ID and not-found states.',
      isRequired: true,
    },
    {
      id: 'react-day-06-sc-03',
      code: 'SC3',
      label: 'Implement navigation and direct URLs',
      description: 'I can build the required pages with active navigation and working direct URLs.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you turn the React components into a navigable application? Reflect on route structure, nested layouts, route parameters, active navigation, and direct URL testing.',
};
