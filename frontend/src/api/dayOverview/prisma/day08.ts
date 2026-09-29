import type { DayContent } from '@itp/types';
export const prismaDay08: DayContent = {
  dayId: 'prisma-day-08',
  courseSlug: 'prisma',
  courseTitle: 'Prisma',
  dayNumber: 8,
  totalDays: 8,
  title: 'Logging and API Documentation',
  subtitle: 'Make the service operable by another team.',
  lessonSummary:
    'Add operational readiness features to the API, including structured request and error logs, correlation IDs, a health endpoint, API documentation, and a .env.example file. Ensure another developer can run the project using the README alone without exposing passwords or tokens in logs.',
  learningObjectives: [
    {
      id: 'prisma-day-08-lo-01',
      code: 'LO1',
      title: 'Implement structured logging',
      description: 'Create useful structured request and error logs without leaking secrets.',
    },
    {
      id: 'prisma-day-08-lo-02',
      code: 'LO2',
      title: 'Add operational features',
      description: 'Implement request IDs, correlation IDs, and a health endpoint.',
    },
    {
      id: 'prisma-day-08-lo-03',
      code: 'LO3',
      title: 'Document API setup and usage',
      description:
        'Provide API documentation, a .env.example file, and setup instructions that allow a new developer to run the project.',
    },
  ],
  selfCheckItems: [
    {
      id: 'prisma-day-08-sc-01',
      code: 'SC1',
      label: 'Add structured logs and request IDs',
      description:
        'I can implement structured request and error logs with correlation IDs without logging passwords or tokens.',
      isRequired: true,
    },
    {
      id: 'prisma-day-08-sc-02',
      code: 'SC2',
      label: 'Implement health checks',
      description: "I can add a health endpoint and verify the service's operational status.",
      isRequired: true,
    },
    {
      id: 'prisma-day-08-sc-03',
      code: 'SC3',
      label: 'Document and verify project setup',
      description:
        'I can document the API, provide a .env.example file, and verify setup from a clean directory.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you make the API easier for another developer to operate? Reflect on structured logging, request IDs, health checks, API documentation, and verifying the setup from a clean directory.',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
