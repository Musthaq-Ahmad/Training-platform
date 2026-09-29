import type { DayContent } from '@itp/types';

export const prismaDay01: DayContent = {
  dayId: 'prisma-day-01',
  courseSlug: 'prisma',
  courseTitle: 'Prisma',
  dayNumber: 1,
  totalDays: 8,
  title: 'Prisma, Migrations and Seed Data',
  subtitle: 'Manage schema changes repeatably.',
  lessonSummary:
    'Introduce Prisma as an ORM while understanding the SQL and migrations it generates. Model the existing ticket-system tables, create and apply migrations, seed data, replace repository queries with Prisma, and document database commands.',
  learningObjectives: [
    {
      id: 'prisma-day-01-lo-01',
      code: 'LO1',
      title: 'Define Prisma models and relations',
      description: 'Model the existing database tables and their relationships using Prisma.',
    },
    {
      id: 'prisma-day-01-lo-02',
      code: 'LO2',
      title: 'Manage migrations and seed data',
      description: 'Create and apply migrations and write a seed script.',
    },
    {
      id: 'prisma-day-01-lo-03',
      code: 'LO3',
      title: 'Migrate repository queries to Prisma',
      description:
        'Replace repository queries, inspect generated migration SQL, and document database commands.',
    },
  ],
  selfCheckItems: [
    {
      id: 'prisma-day-01-sc-01',
      code: 'SC1',
      label: 'Define Prisma models',
      description:
        'I can define Prisma models and relations for the existing ticket-system schema.',
      isRequired: true,
    },
    {
      id: 'prisma-day-01-sc-02',
      code: 'SC2',
      label: 'Create migrations and seed data',
      description: 'I can create and apply migrations and run a seed script.',
      isRequired: true,
    },
    {
      id: 'prisma-day-01-sc-03',
      code: 'SC3',
      label: 'Replace repository queries',
      description:
        'I can migrate repository methods to Prisma, inspect generated SQL, and run tests.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did Prisma change the way you manage the database schema and repository queries? Reflect on models, migrations, seed data, and the generated SQL you inspected.',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
