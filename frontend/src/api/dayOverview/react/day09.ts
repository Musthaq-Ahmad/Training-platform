import type { DayContent } from '@itp/types';

export const reactDay09: DayContent = {
  dayId: 'react-day-09',
  courseSlug: 'react',
  courseTitle: 'React',
  dayNumber: 9,
  totalDays: 10,
  title: 'Authentication State and Context',
  subtitle: 'Maintain user session and protect pages.',
  lessonSummary:
    'Use React Context to manage authentication without making all application state global. Implement login, authentication context, session restoration, logout, protected routes, an unauthorised page, and role-aware navigation.',
  learningObjectives: [
    {
      id: 'react-day-09-lo-01',
      code: 'LO1',
      title: 'Manage authentication state',
      description: 'Create authentication context and maintain user session state.',
    },
    {
      id: 'react-day-09-lo-02',
      code: 'LO2',
      title: 'Restore and manage sessions',
      description: 'Implement login, session restoration, and logout.',
    },
    {
      id: 'react-day-09-lo-03',
      code: 'LO3',
      title: 'Protect routes and display role-aware navigation',
      description:
        'Implement protected routes, an unauthorised page, and role-aware navigation while keeping backend authorisation authoritative.',
    },
  ],
  selfCheckItems: [
    {
      id: 'react-day-09-sc-01',
      code: 'SC1',
      label: 'Create authentication context',
      description: 'I can build authentication context and connect it to the login API.',
      isRequired: true,
    },
    {
      id: 'react-day-09-sc-02',
      code: 'SC2',
      label: 'Restore sessions and implement logout',
      description: 'I can restore a session and implement logout functionality.',
      isRequired: true,
    },
    {
      id: 'react-day-09-sc-03',
      code: 'SC3',
      label: 'Protect routes and manage role-aware UI',
      description:
        'I can implement protected routes, an unauthorised page, and role-aware navigation without treating frontend hiding as authorisation.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you manage authentication state and protect pages in React? Reflect on authentication context, session restoration, logout, protected routes, and role-aware navigation.',
};
