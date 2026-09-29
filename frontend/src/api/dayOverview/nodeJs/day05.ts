import type { DayContent } from '@itp/types';

export const nodejsDay05: DayContent = {
  dayId: 'nodejs-day-05',
  courseSlug: 'nodejs',
  courseTitle: 'Node.js',
  dayNumber: 5,
  totalDays: 5,
  title: 'Backend Assessment 1',
  subtitle: 'Demonstrate independent Node.js API development.',
  lessonSummary:
    'Build a file-backed Support Ticket API from written requirements within one day. Implement ticket creation, listing, viewing, status updates, assignment, and deletion. Validate ticket fields, write unit and endpoint tests, and document API examples in the README.',
  learningObjectives: [
    {
      id: 'nodejs-day-05-lo-01',
      code: 'LO1',
      title: 'Translate requirements into an API design',
      description: 'Translate written requirements into endpoints and data structures.',
    },
    {
      id: 'nodejs-day-05-lo-02',
      code: 'LO2',
      title: 'Build a Support Ticket API',
      description:
        'Implement ticket creation, listing, viewing, status updates, assignment, and deletion using file-backed storage.',
    },
    {
      id: 'nodejs-day-05-lo-03',
      code: 'LO3',
      title: 'Validate ticket data',
      description: 'Validate title, description, priority, status, and assignee.',
    },
    {
      id: 'nodejs-day-05-lo-04',
      code: 'LO4',
      title: 'Test and document the API',
      description:
        'Include unit tests, endpoint tests, and API examples in the README while working independently.',
    },
  ],
  selfCheckItems: [
    {
      id: 'nodejs-day-05-sc-01',
      code: 'SC1',
      label: 'Define the API contract',
      description:
        'I can translate the requirements into endpoint and type definitions before implementation.',
      isRequired: true,
    },
    {
      id: 'nodejs-day-05-sc-02',
      code: 'SC2',
      label: 'Implement ticket operations and validation',
      description:
        'I can create, list, view, update status, assign, and delete tickets while validating the required fields.',
      isRequired: true,
    },
    {
      id: 'nodejs-day-05-sc-03',
      code: 'SC3',
      label: 'Test and document the API',
      description: 'I can write unit and endpoint tests and provide API examples in the README.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'Reflect on your Support Ticket API assessment. How did you break down the requirements, plan the implementation, handle validation, and verify your work through tests and documentation?',
};
