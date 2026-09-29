import type { DayContent } from '@itp/types';

export const prismaDay03: DayContent = {
  dayId: 'prisma-day-03',
  courseSlug: 'prisma',
  courseTitle: 'Prisma',
  dayNumber: 3,
  totalDays: 8,
  title: 'Backend API Testing',
  subtitle: 'Test the application at service and HTTP boundaries.',
  lessonSummary:
    'Build a reliable backend test suite using a dedicated test database. Add at least ten endpoint tests and five service tests, covering validation, not-found responses, pagination, filtering, and database errors. Ensure tests are isolated and independent of execution order.',
  learningObjectives: [
    {
      id: 'prisma-day-03-lo-01',
      code: 'LO1',
      title: 'Distinguish test types',
      description: 'Explain the difference between unit and integration tests.',
    },
    {
      id: 'prisma-day-03-lo-02',
      code: 'LO2',
      title: 'Manage test data and isolation',
      description: 'Set up and tear down test data safely using a dedicated test database.',
    },
    {
      id: 'prisma-day-03-lo-03',
      code: 'LO3',
      title: 'Build a complete backend test suite',
      description:
        'Write at least ten endpoint tests and five service tests covering success, validation, and failure cases.',
    },
  ],
  selfCheckItems: [
    {
      id: 'prisma-day-03-sc-01',
      code: 'SC1',
      label: 'Distinguish unit and integration tests',
      description: 'I can explain the purpose of service tests and endpoint integration tests.',
      isRequired: true,
    },
    {
      id: 'prisma-day-03-sc-02',
      code: 'SC2',
      label: 'Configure an isolated test database',
      description: 'I can set up and reset test data safely without relying on execution order.',
      isRequired: true,
    },
    {
      id: 'prisma-day-03-sc-03',
      code: 'SC3',
      label: 'Test success and failure scenarios',
      description:
        'I can test validation, not-found responses, pagination, filtering, and database errors using arrange-act-assert.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What did you learn while building the backend test suite? Reflect on test isolation, test data setup, the arrange-act-assert structure, and the failure cases you covered.',
};
