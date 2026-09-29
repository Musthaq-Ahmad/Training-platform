import type { DayContent } from '@itp/types';

export const postgresqlDay05: DayContent = {
  dayId: 'postgresql-day-05',
  courseSlug: 'postgresql',
  courseTitle: 'PostgreSQL',
  dayNumber: 5,
  totalDays: 6,
  title: 'Database Assessment',
  subtitle: 'Demonstrate independent database design and SQL skills.',
  lessonSummary:
    'Design and implement the database for an Equipment Booking System. Model employees, equipment, categories, bookings, approvals, and maintenance records. Create seed data, complete ten required queries, implement a transaction and two justified indexes, and validate the result from a clean database.',
  learningObjectives: [
    {
      id: 'postgresql-day-5-lo-01',
      code: 'LO1',
      title: 'Model a new business domain',
      description:
        'Translate Equipment Booking System requirements into a relational database design.',
    },
    {
      id: 'postgresql-day-5-lo-02',
      code: 'LO2',
      title: 'Implement database functionality',
      description: 'Create constraints, seed data, reports, a transaction, and justified indexes.',
    },
    {
      id: 'postgresql-day-5-lo-03',
      code: 'LO3',
      title: 'Deliver a reproducible database',
      description:
        'Submit an ER diagram and runnable SQL scripts that reproduce the result from a clean database.',
    },
  ],
  selfCheckItems: [
    {
      id: 'postgresql-day-5-sc-01',
      code: 'SC1',
      label: 'Design the database',
      description:
        'I can create an ER diagram and schema for employees, equipment, categories, bookings, approvals, and maintenance records.',
      isRequired: true,
    },
    {
      id: 'postgresql-day-5-sc-02',
      code: 'SC2',
      label: 'Complete queries and database operations',
      description:
        'I can complete ten required queries, implement one transaction, and create two justified indexes.',
      isRequired: true,
    },
    {
      id: 'postgresql-day-5-sc-03',
      code: 'SC3',
      label: 'Validate from a clean database',
      description:
        'I can reproduce the database using runnable SQL scripts and verify the results from a clean reset.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'Reflect on your Equipment Booking System database assessment. How did you translate the requirements into a schema, implement the queries and transaction, and validate your work from a clean database?',
};
