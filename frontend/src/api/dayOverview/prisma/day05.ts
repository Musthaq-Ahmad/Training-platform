import type { DayContent } from '@itp/types';

export const prismaDay05: DayContent = {
  dayId: 'prisma-day-05',
  courseSlug: 'prisma',
  courseTitle: 'Prisma',
  dayNumber: 5,
  totalDays: 8,
  title: 'Authentication',
  subtitle: 'Identify users securely.',
  lessonSummary:
    'Add authentication to the ticket system with registration, login, a current-user endpoint, and authentication middleware. Hash passwords, issue and verify access tokens, keep secrets in environment variables, and avoid revealing whether a login email exists.',
  learningObjectives: [
    {
      id: 'prisma-day-05-lo-01',
      code: 'LO1',
      title: 'Secure user credentials',
      description:
        'Create a user credentials model and hash passwords instead of storing them in plain text.',
    },
    {
      id: 'prisma-day-05-lo-02',
      code: 'LO2',
      title: 'Implement authentication',
      description:
        'Implement registration, login, access-token issuance and verification, and a current-user endpoint.',
    },
    {
      id: 'prisma-day-05-lo-03',
      code: 'LO3',
      title: 'Protect routes securely',
      description:
        'Use authentication middleware, environment-based secrets, and error messages that do not reveal whether an email exists.',
    },
  ],
  selfCheckItems: [
    {
      id: 'prisma-day-05-sc-01',
      code: 'SC1',
      label: 'Hash passwords securely',
      description: 'I can store password hashes instead of plain-text passwords.',
      isRequired: true,
    },
    {
      id: 'prisma-day-05-sc-02',
      code: 'SC2',
      label: 'Implement registration and login',
      description:
        'I can register users, authenticate login requests, and issue and verify access tokens.',
      isRequired: true,
    },
    {
      id: 'prisma-day-05-sc-03',
      code: 'SC3',
      label: 'Protect routes and avoid information leakage',
      description:
        'I can implement authentication middleware and avoid revealing whether a login email exists.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you implement authentication in the ticket system? Reflect on password hashing, access tokens, protected routes, and preventing information leakage.',
};
