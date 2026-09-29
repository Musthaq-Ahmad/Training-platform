import type { DayContent } from '@itp/types';

export const postgresqlDay01: DayContent = {
  dayId: 'postgresql-day-01',
  courseSlug: 'postgresql',
  courseTitle: 'PostgreSQL',
  dayNumber: 1,
  totalDays: 6,
  title: 'Relational Database Modelling',
  subtitle: 'Turn business requirements into a relational model.',
  lessonSummary:
    'Design a Support Ticket database that protects data quality through relationships and constraints. Model users, customers, tickets, comments, categories, assignments, and status history. Create an ER diagram and initial SQL table definitions.',
  learningObjectives: [
    {
      id: 'postgresql-day-01-lo-01',
      code: 'LO1',
      title: 'Identify entities and relationships',
      description:
        'Extract entities and business rules from requirements and identify relationships.',
    },
    {
      id: 'postgresql-day-01-lo-02',
      code: 'LO2',
      title: 'Design relational models',
      description:
        'Choose primary and foreign keys and explain one-to-many and many-to-many relationships.',
    },
    {
      id: 'postgresql-day-01-lo-03',
      code: 'LO3',
      title: 'Create a database schema',
      description:
        'Design an ER diagram and initial CREATE TABLE statements using consistent naming and documented assumptions.',
    },
  ],
  selfCheckItems: [
    {
      id: 'postgresql-day-01-sc-01',
      code: 'SC1',
      label: 'Identify entities and business rules',
      description: 'I can identify the entities and relationships in the Support Ticket system.',
      isRequired: true,
    },
    {
      id: 'postgresql-day-01-sc-02',
      code: 'SC2',
      label: 'Choose keys and relationships',
      description:
        'I can choose primary and foreign keys and model one-to-many and many-to-many relationships.',
      isRequired: true,
    },
    {
      id: 'postgresql-day-01-sc-03',
      code: 'SC3',
      label: 'Create the ER diagram and tables',
      description: 'I can create an ER diagram and initial PostgreSQL table definitions.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you translate the Support Ticket requirements into a relational model? Reflect on your entity choices, relationships, keys, constraints, and assumptions.',
};
