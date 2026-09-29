import type { DayContent } from '@itp/types';

export const prismaDay02: DayContent = {
  dayId: 'prisma-day-02',
  courseSlug: 'prisma',
  courseTitle: 'Prisma',
  dayNumber: 2,
  totalDays: 8,
  title: 'Validation, Pagination and Filtering',
  subtitle: 'Build list endpoints suitable for real applications.',
  lessonSummary:
    'Enhance GET /tickets with validated query parameters for pagination, filtering, searching, and sorting. Implement database-level pagination, enforce a maximum page size, return total-count and page metadata, and whitelist sortable fields.',
  learningObjectives: [
    {
      id: 'prisma-day-02-lo-01',
      code: 'LO1',
      title: 'Validate query parameters',
      description:
        'Validate page, pageSize, status, priority, assignee, search, sortField, and sortDirection.',
    },
    {
      id: 'prisma-day-02-lo-02',
      code: 'LO2',
      title: 'Implement database-level pagination',
      description:
        'Apply pagination and filtering in database queries instead of fetching all rows before slicing.',
    },
    {
      id: 'prisma-day-02-lo-03',
      code: 'LO3',
      title: 'Return pagination metadata safely',
      description:
        'Return total count and page metadata while enforcing maximum page size and whitelisting sortable fields.',
    },
  ],
  selfCheckItems: [
    {
      id: 'prisma-day-02-sc-01',
      code: 'SC1',
      label: 'Validate list query parameters',
      description: 'I can validate pagination, filtering, searching, and sorting parameters.',
      isRequired: true,
    },
    {
      id: 'prisma-day-02-sc-02',
      code: 'SC2',
      label: 'Implement database-level pagination',
      description:
        'I can filter and paginate records in the database without fetching all rows first.',
      isRequired: true,
    },
    {
      id: 'prisma-day-02-sc-03',
      code: 'SC3',
      label: 'Return metadata and test edge cases',
      description:
        'I can return total count and page metadata, enforce a page-size limit, and whitelist sortable fields.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you enhance GET /tickets with pagination, filtering, and sorting? Reflect on query validation, database-level pagination, metadata, and edge cases you tested.',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
