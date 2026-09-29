import type { DayContent } from '@itp/types';

export const postgresqlDay06: DayContent = {
  dayId: 'postgresql-day-6',
  courseSlug: 'postgresql',
  courseTitle: 'PostgreSQL',
  dayNumber: 6,
  totalDays: 6,
  title: 'Node.js with PostgreSQL',
  subtitle: 'Replace file storage with a real database.',
  lessonSummary:
    'Connect the Support Ticket API to PostgreSQL through a repository layer. Configure database connections safely, use parameterised queries, implement CRUD repository methods, add a connection health check, and test database failures.',
  learningObjectives: [
    {
      id: 'postgresql-day-6-lo-01',
      code: 'LO1',
      title: 'Configure database connections',
      description: 'Configure PostgreSQL connections safely using environment variables.',
    },
    {
      id: 'postgresql-day-6-lo-02',
      code: 'LO2',
      title: 'Implement a PostgreSQL repository',
      description:
        'Replace file storage with database CRUD repository methods and a connection health check.',
    },
    {
      id: 'postgresql-day-6-lo-03',
      code: 'LO3',
      title: 'Handle database failures securely',
      description:
        'Use parameterised queries, avoid SQL injection, and test database failure scenarios.',
    },
  ],
  selfCheckItems: [
    {
      id: 'postgresql-day-6-sc-01',
      code: 'SC1',
      label: 'Configure PostgreSQL safely',
      description: 'I can configure database connection settings through environment variables.',
      isRequired: true,
    },
    {
      id: 'postgresql-day-6-sc-02',
      code: 'SC2',
      label: 'Implement repository methods',
      description:
        'I can replace file storage with PostgreSQL CRUD methods and a connection health check.',
      isRequired: true,
    },
    {
      id: 'postgresql-day-6-sc-03',
      code: 'SC3',
      label: 'Prevent SQL injection and test failures',
      description: 'I can use parameterised queries and test database failure handling.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What changed when you replaced file storage with PostgreSQL? Reflect on connection configuration, repository design, parameterised queries, and database failure handling.',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
