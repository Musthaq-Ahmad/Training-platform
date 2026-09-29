import type { DayContent } from '@itp/types';

export const prismaDay04: DayContent = {
  dayId: 'prisma-day-04',
  courseSlug: 'prisma',
  courseTitle: 'Prisma',
  dayNumber: 4,
  totalDays: 8,
  title: 'Backend Feature Sprint',
  subtitle: 'Modify an unfamiliar starter repository.',
  lessonSummary:
    'Implement ticket comments and status history in a supplied codebase. Trace the existing request flow, write an impact analysis, implement database changes, endpoints, permissions, and tests, and prepare a focused pull request with implementation and testing details.',
  learningObjectives: [
    {
      id: 'prisma-day-04-lo-01',
      code: 'LO1',
      title: 'Understand an existing codebase',
      description:
        "Trace an existing request flow and map the project's structure and conventions.",
    },
    {
      id: 'prisma-day-04-lo-02',
      code: 'LO2',
      title: 'Implement comments and status history',
      description:
        'Add database migrations, endpoints, permissions, and tests for ticket comments and status history.',
    },
    {
      id: 'prisma-day-04-lo-03',
      code: 'LO3',
      title: 'Prepare a focused pull request',
      description:
        'Write an impact analysis and document implementation and testing details in a reviewable PR.',
    },
  ],
  selfCheckItems: [
    {
      id: 'prisma-day-04-sc-01',
      code: 'SC1',
      label: 'Map the existing project',
      description:
        'I can run the starter repository, trace its request flow, and write an impact analysis.',
      isRequired: true,
    },
    {
      id: 'prisma-day-04-sc-02',
      code: 'SC2',
      label: 'Implement the requested features',
      description:
        'I can add ticket comments and status history through the database and backend layers with permissions and tests.',
      isRequired: true,
    },
    {
      id: 'prisma-day-04-sc-03',
      code: 'SC3',
      label: 'Prepare a focused PR',
      description:
        'I can prepare a pull request with implementation and testing details while following existing conventions.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you approach modifying an unfamiliar repository? Reflect on tracing the request flow, impact analysis, implementing comments and status history, and preparing your pull request.',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
