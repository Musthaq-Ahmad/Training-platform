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
  journalResponse: null,
  isLocked: true,
  isCompleted: false,
};

export const reactDay27: DayContent = {
  dayId: 'react-day-27',
  courseSlug: 'react',
  courseTitle: 'React',
  dayNumber: 27,
  totalDays: 10,
  title: 'Effects and Custom Hooks',
  subtitle: 'Separate reusable data behaviour from UI.',
  lessonSummary:
    'Use effects deliberately and create reusable custom hooks. Implement useProjects, useIssues, useIssue, useDebounce, and useDocumentTitle with correct loading and error behaviour, cleanup, and clear typed APIs.',
  learningObjectives: [
    {
      id: 'react-day-27-lo-01',
      code: 'LO1',
      title: 'Understand effect dependencies and cleanup',
      description:
        'Explain effect dependencies and cleanup and avoid effects for pure calculations.',
    },
    {
      id: 'react-day-27-lo-02',
      code: 'LO2',
      title: 'Create reusable custom hooks',
      description: 'Build useProjects, useIssues, useIssue, useDebounce, and useDocumentTitle.',
    },
    {
      id: 'react-day-27-lo-03',
      code: 'LO3',
      title: 'Design clear typed hook APIs',
      description:
        'Ensure hooks expose a clear typed API with correct loading, error, and cleanup behaviour.',
    },
  ],
  selfCheckItems: [
    {
      id: 'react-day-27-sc-01',
      code: 'SC1',
      label: 'Use effects deliberately',
      description:
        'I can explain effect dependencies and cleanup and identify when an effect is unnecessary.',
      isRequired: true,
    },
    {
      id: 'react-day-27-sc-02',
      code: 'SC2',
      label: 'Create reusable custom hooks',
      description:
        'I can implement the required data and utility hooks by extracting repeated behaviour.',
      isRequired: true,
    },
    {
      id: 'react-day-27-sc-03',
      code: 'SC3',
      label: 'Verify hook behaviour',
      description:
        'I can manually test hook behaviour and review effects for necessity, cleanup, and clear typed APIs.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did custom hooks help you separate reusable behaviour from UI? Reflect on the hooks you created, effect dependencies, cleanup, and how you verified their behaviour.',
  journalResponse: null,
  isLocked: true,
  isCompleted: false,
};

export const reactDay28: DayContent = {
  dayId: 'react-day-28',
  courseSlug: 'react',
  courseTitle: 'React',
  dayNumber: 28,
  totalDays: 10,
  title: 'Authentication State and Context',
  subtitle: 'Maintain user session and protect pages.',
  lessonSummary:
    'Use React Context to manage authentication without making all application state global. Implement login, authentication context, session restoration, logout, protected routes, an unauthorised page, and role-aware navigation.',
  learningObjectives: [
    {
      id: 'react-day-28-lo-01',
      code: 'LO1',
      title: 'Manage authentication state',
      description: 'Create authentication context and maintain user session state.',
    },
    {
      id: 'react-day-28-lo-02',
      code: 'LO2',
      title: 'Restore and manage sessions',
      description: 'Implement login, session restoration, and logout.',
    },
    {
      id: 'react-day-28-lo-03',
      code: 'LO3',
      title: 'Protect routes and display role-aware navigation',
      description:
        'Implement protected routes, an unauthorised page, and role-aware navigation while keeping backend authorisation authoritative.',
    },
  ],
  selfCheckItems: [
    {
      id: 'react-day-28-sc-01',
      code: 'SC1',
      label: 'Create authentication context',
      description: 'I can build authentication context and connect it to the login API.',
      isRequired: true,
    },
    {
      id: 'react-day-28-sc-02',
      code: 'SC2',
      label: 'Restore sessions and implement logout',
      description: 'I can restore a session and implement logout functionality.',
      isRequired: true,
    },
    {
      id: 'react-day-28-sc-03',
      code: 'SC3',
      label: 'Protect routes and manage role-aware UI',
      description:
        'I can implement protected routes, an unauthorised page, and role-aware navigation without treating frontend hiding as authorisation.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you manage authentication state and protect pages in React? Reflect on authentication context, session restoration, logout, protected routes, and role-aware navigation.',
  journalResponse: null,
  isLocked: true,
  isCompleted: false,
};

export const reactDay10: DayContent = {
  dayId: 'react-day-10',
  courseSlug: 'react',
  courseTitle: 'React',
  dayNumber: 10,
  totalDays: 10,
  title: 'React Testing',
  subtitle: "Test behaviour from a user's perspective.",
  lessonSummary:
    'Write resilient component and integration tests using React Testing Library. Test login, filtering, issue forms, empty and error states, retry, protected routes, and navigation. Use accessible queries, simulate realistic user actions, and mock network boundaries.',
  learningObjectives: [
    {
      id: 'react-day-10-lo-01',
      code: 'LO1',
      title: 'Use accessible testing queries',
      description:
        'Use accessible queries such as getByRole and getByLabelText to locate elements.',
    },
    {
      id: 'react-day-10-lo-02',
      code: 'LO2',
      title: 'Test realistic user interactions',
      description: 'Simulate user actions and test component and integration behaviour.',
    },
    {
      id: 'react-day-10-lo-03',
      code: 'LO3',
      title: 'Build a resilient test suite',
      description:
        'Write at least ten meaningful tests covering login, filtering, forms, UI states, retry, protected routes, and navigation.',
    },
  ],
  selfCheckItems: [
    {
      id: 'react-day-10-sc-01',
      code: 'SC1',
      label: 'Use accessible queries',
      description: 'I can use getByRole and getByLabelText to locate elements in tests.',
      isRequired: true,
    },
    {
      id: 'react-day-10-sc-02',
      code: 'SC2',
      label: 'Test user interactions',
      description:
        "I can simulate realistic user actions and test component behaviour from the user's perspective.",
      isRequired: true,
    },
    {
      id: 'react-day-10-sc-03',
      code: 'SC3',
      label: 'Complete the React test suite',
      description:
        'I can write at least ten meaningful tests covering forms, filtering, UI states, retry, protected routes, and navigation.',
      isRequired: true,
    },
  ],
  journalPrompt:
    "What did you learn while testing the React application from a user's perspective? Reflect on accessible queries, realistic interactions, API mocking, and the different UI behaviours you tested.",
  journalResponse: null,
  isLocked: true,
  isCompleted: false,
};
