import type { DayContent } from '@itp/types';

export const postgresqlDay02: DayContent = {
  dayId: 'postgresql-day-02',
  courseSlug: 'postgresql',
  courseTitle: 'PostgreSQL',
  dayNumber: 2,
  totalDays: 6,
  title: 'SQL CRUD and Constraints',
  subtitle: 'Create and manipulate reliable relational data.',
  lessonSummary:
    'Implement and seed the ticket-system schema, then practise SQL CRUD operations. Write queries for open and high-priority tickets, status updates, and safe deletion. Apply database constraints to prevent invalid priorities, duplicate users, and orphan records.',
  learningObjectives: [
    {
      id: 'postgresql-day-02-lo-01',
      code: 'LO1',
      title: 'Write SQL CRUD queries',
      description:
        'Write INSERT, SELECT, UPDATE, and DELETE queries using WHERE, ORDER BY, and LIMIT.',
    },
    {
      id: 'postgresql-day-02-lo-02',
      code: 'LO2',
      title: 'Apply database constraints',
      description:
        'Use NOT NULL, UNIQUE, CHECK, and foreign-key constraints to enforce business rules.',
    },
    {
      id: 'postgresql-day-02-lo-03',
      code: 'LO3',
      title: 'Implement and seed a schema',
      description:
        'Create the ticket-system schema, add meaningful sample data, and document expected query results.',
    },
  ],
  selfCheckItems: [
    {
      id: 'postgresql-day-02-sc-01',
      code: 'SC1',
      label: 'Write CRUD queries',
      description:
        'I can write INSERT, SELECT, UPDATE, and DELETE queries with filtering and sorting.',
      isRequired: true,
    },
    {
      id: 'postgresql-day-02-sc-02',
      code: 'SC2',
      label: 'Apply constraints',
      description:
        'I can use database constraints to prevent invalid priorities, duplicate users, and orphan records.',
      isRequired: true,
    },
    {
      id: 'postgresql-day-02-sc-03',
      code: 'SC3',
      label: 'Test and document queries',
      description:
        'I can seed the schema, run queries, test invalid inserts, and document expected results.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What did you learn about enforcing business rules at the database level? Reflect on the CRUD queries, constraints, and invalid-data cases you tested.',
};
