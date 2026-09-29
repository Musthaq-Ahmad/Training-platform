import type { DayContent } from '@itp/types';
export const prismaDay07: DayContent = {
  dayId: 'prisma-day-07',
  courseSlug: 'prisma',
  courseTitle: 'Prisma',
  dayNumber: 7,
  totalDays: 8,
  title: 'Security and Resilience',
  subtitle: 'Reduce common API risks.',
  lessonSummary:
    'Perform a security review of the API and implement fixes for common risks. Identify at least five risks and add appropriate validation, secure headers, rate limiting, CORS, and size limits. Test important protections and document remaining limitations.',
  learningObjectives: [
    {
      id: 'prisma-day-07-lo-01',
      code: 'LO1',
      title: 'Identify API security risks',
      description:
        'Recognise injection and validation risks and identify at least five security risks.',
    },
    {
      id: 'prisma-day-07-lo-02',
      code: 'LO2',
      title: 'Apply security protections',
      description:
        'Implement appropriate validation, secure headers, rate limiting, CORS, and request size limits.',
    },
    {
      id: 'prisma-day-07-lo-03',
      code: 'LO3',
      title: 'Test and document security controls',
      description:
        'Test important protections and document residual risks and remaining limitations.',
    },
  ],
  selfCheckItems: [
    {
      id: 'prisma-day-07-sc-01',
      code: 'SC1',
      label: 'Identify and prioritise security risks',
      description: 'I can threat-model the main endpoints and record at least five risks.',
      isRequired: true,
    },
    {
      id: 'prisma-day-07-sc-02',
      code: 'SC2',
      label: 'Implement security protections',
      description:
        'I can apply validation, secure headers, rate limiting, CORS, and request size limits as appropriate.',
      isRequired: true,
    },
    {
      id: 'prisma-day-07-sc-03',
      code: 'SC3',
      label: 'Test and document protections',
      description: 'I can test important security controls and document remaining limitations.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What security risks did you identify during your API review? Reflect on the protections you implemented, the tests you added, and the risks that remain.',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
