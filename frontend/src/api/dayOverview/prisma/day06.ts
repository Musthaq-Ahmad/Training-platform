import type { DayContent } from '@itp/types';

export const prismaDay06: DayContent = {
  dayId: 'prisma-day-06',
  courseSlug: 'prisma',
  courseTitle: 'Prisma',
  dayNumber: 6,
  totalDays: 8,
  title: 'Authorisation and Roles',
  subtitle: 'Control what authenticated users may do.',
  lessonSummary:
    'Implement server-side permissions for administrator, agent, and customer roles. Define a permission matrix, enforce ownership and role rules, restrict customer and agent ticket access, and ensure only administrators can manage users.',
  learningObjectives: [
    {
      id: 'prisma-day-06-lo-01',
      code: 'LO1',
      title: 'Define a permission matrix',
      description: 'Define access rules for administrators, agents, and customers.',
    },
    {
      id: 'prisma-day-06-lo-02',
      code: 'LO2',
      title: 'Enforce role and ownership rules',
      description:
        'Ensure customers see their own tickets, agents see assigned tickets, and administrators manage all tickets.',
    },
    {
      id: 'prisma-day-06-lo-03',
      code: 'LO3',
      title: 'Protect restricted resources',
      description:
        'Restrict user management to administrators and return 403 responses without exposing restricted data.',
    },
  ],
  selfCheckItems: [
    {
      id: 'prisma-day-06-sc-01',
      code: 'SC1',
      label: 'Create a permission matrix',
      description: 'I can define access permissions for administrators, agents, and customers.',
      isRequired: true,
    },
    {
      id: 'prisma-day-06-sc-02',
      code: 'SC2',
      label: 'Enforce role and ownership rules',
      description:
        'I can enforce ticket visibility and user-management permissions on the backend.',
      isRequired: true,
    },
    {
      id: 'prisma-day-06-sc-03',
      code: 'SC3',
      label: 'Test forbidden access',
      description:
        'I can test every role and return 403 responses without exposing restricted data.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you design and enforce permissions for administrators, agents, and customers? Reflect on the permission matrix, ownership checks, and forbidden-access tests.',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
