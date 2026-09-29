import type { DayContent } from '@itp/types';

export const postgresqlDay04: DayContent = {
  dayId: 'postgresql-day-04',
  courseSlug: 'postgresql',
  courseTitle: 'PostgreSQL',
  dayNumber: 4,
  totalDays: 6,
  title: 'Transactions and Indexes',
  subtitle: 'Protect multi-step operations and improve query performance.',
  lessonSummary:
    'Implement transactional ticket reassignment by updating the assignee, inserting history, and adding a system comment as one transaction. Demonstrate rollback when an operation fails and compare query execution plans before and after adding a justified index.',
  learningObjectives: [
    {
      id: 'postgresql-day-04-lo-01',
      code: 'LO1',
      title: 'Understand transactions',
      description: 'Explain commit and rollback and implement a multi-step transaction.',
    },
    {
      id: 'postgresql-day-04-lo-02',
      code: 'LO2',
      title: 'Implement atomic operations',
      description:
        'Update ticket assignment, insert history, and add a system comment in one transaction.',
    },
    {
      id: 'postgresql-day-04-lo-03',
      code: 'LO3',
      title: 'Analyse query performance',
      description:
        'Read basic EXPLAIN plans, compare performance before and after indexing, and justify index choices.',
    },
  ],
  selfCheckItems: [
    {
      id: 'postgresql-day-04-sc-01',
      code: 'SC1',
      label: 'Implement a transaction',
      description:
        'I can use a transaction to keep multiple ticket reassignment operations atomic.',
      isRequired: true,
    },
    {
      id: 'postgresql-day-04-sc-02',
      code: 'SC2',
      label: 'Demonstrate rollback',
      description: 'I can force an operation to fail and verify that all changes are rolled back.',
      isRequired: true,
    },
    {
      id: 'postgresql-day-04-sc-03',
      code: 'SC3',
      label: 'Compare query plans and justify an index',
      description:
        'I can compare EXPLAIN output before and after indexing and explain why an index is needed.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you ensure that ticket reassignment remained consistent when an operation failed? Reflect on your transaction, rollback test, and index performance comparison.',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
