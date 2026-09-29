import type { DayContent } from '@itp/types';

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
