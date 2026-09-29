import type { DayContent } from '@itp/types';

export const postgresqlDay03: DayContent = {
  dayId: 'postgresql-day-03',
  courseSlug: 'postgresql',
  courseTitle: 'PostgreSQL',
  dayNumber: 3,
  totalDays: 6,
  title: 'Joins, Grouping and Reports',
  subtitle: 'Answer business questions using SQL.',
  lessonSummary:
    'Create a reporting SQL pack for the Support Ticket system. Use joins, GROUP BY, HAVING, and aggregate functions to report ticket counts by status and assignee, customers with more than five open tickets, users without assigned tickets, unresolved tickets, and counts by category and priority.',
  learningObjectives: [
    {
      id: 'postgresql-day-03-lo-01',
      code: 'LO1',
      title: 'Use SQL joins',
      description: 'Choose between inner and outer joins based on reporting requirements.',
    },
    {
      id: 'postgresql-day-03-lo-02',
      code: 'LO2',
      title: 'Aggregate and group data',
      description: 'Use GROUP BY, HAVING, and aggregate functions to answer business questions.',
    },
    {
      id: 'postgresql-day-03-lo-03',
      code: 'LO3',
      title: 'Build readable SQL reports',
      description:
        'Create multi-table reporting queries and verify their results using known seed data.',
    },
  ],
  selfCheckItems: [
    {
      id: 'postgresql-day-03-sc-01',
      code: 'SC1',
      label: 'Choose appropriate joins',
      description: 'I can select inner or outer joins for different reporting requirements.',
      isRequired: true,
    },
    {
      id: 'postgresql-day-03-sc-02',
      code: 'SC2',
      label: 'Use grouping and aggregation',
      description: 'I can use GROUP BY, HAVING, and aggregate functions to produce report results.',
      isRequired: true,
    },
    {
      id: 'postgresql-day-03-sc-03',
      code: 'SC3',
      label: 'Create and verify reports',
      description: 'I can build readable multi-table reports and verify them using seed data.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'Which SQL report did you find most challenging to build? Explain how you selected joins, applied grouping and filters, and verified the results.',
};
