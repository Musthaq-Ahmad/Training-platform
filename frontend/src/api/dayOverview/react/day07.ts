import type { DayContent } from '@itp/types';

export const reactDay07: DayContent = {
  dayId: 'react-day-07',
  courseSlug: 'react',
  courseTitle: 'React',
  dayNumber: 7,
  totalDays: 10,
  title: 'API Integration',
  subtitle: 'Connect React to the backend safely.',
  lessonSummary:
    'Build a typed API layer that connects project and issue lists to the backend. Use environment-based API URLs and typed response mapping. Implement loading, empty, error, retry, validation, network, and server states without calling fetch directly from many display components.',
  learningObjectives: [
    {
      id: 'react-day-07-lo-01',
      code: 'LO1',
      title: 'Build a typed API client',
      description: 'Create a typed API layer and use environment-based API URLs.',
    },
    {
      id: 'react-day-07-lo-02',
      code: 'LO2',
      title: 'Fetch and map backend data',
      description: 'Connect project and issue lists to the backend and map typed responses.',
    },
    {
      id: 'react-day-07-lo-03',
      code: 'LO3',
      title: 'Handle API states and failures',
      description:
        'Implement loading, empty, error, retry, validation, network, and server states and test failed requests.',
    },
  ],
  selfCheckItems: [
    {
      id: 'react-day-07-sc-01',
      code: 'SC1',
      label: 'Create a typed API client',
      description:
        'I can create a shared API client and configure API URLs through environment variables.',
      isRequired: true,
    },
    {
      id: 'react-day-07-sc-02',
      code: 'SC2',
      label: 'Connect project and issue lists',
      description: 'I can fetch backend data and map responses using TypeScript types.',
      isRequired: true,
    },
    {
      id: 'react-day-07-sc-03',
      code: 'SC3',
      label: 'Handle and test API states',
      description:
        'I can implement loading, empty, error, and retry states and test failed requests.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you connect the React application to the backend? Reflect on the API client, typed response mapping, environment configuration, UI states, and failed-request testing.',
};
