import type { DayContent } from '@itp/types';

export const nodejsDay04: DayContent = {
  dayId: 'node-day-04',
  courseSlug: 'node',
  courseTitle: 'Node.js',
  dayNumber: 4,
  totalDays: 5,
  title: 'Express and Layered Architecture',
  subtitle: 'Refactor the API into a maintainable Express application.',
  lessonSummary:
    'Migrate the Task API to Express and restructure the codebase using routes, controllers, services, and repositories. Preserve existing endpoints, add request logging and a health endpoint, and implement centralized not-found and error handlers.',
  learningObjectives: [
    {
      id: 'node-day-04-lo-01',
      code: 'LO1',
      title: 'Use Express routing and middleware',
      description: 'Use Express routers, route methods, route parameters, and middleware.',
    },
    {
      id: 'node-day-04-lo-02',
      code: 'LO2',
      title: 'Apply layered architecture',
      description:
        'Separate routes, controllers, services, and repositories according to their responsibilities.',
    },
    {
      id: 'node-day-04-lo-03',
      code: 'LO3',
      title: 'Centralize error handling',
      description:
        'Implement centralized not-found and error handlers and add request logging and a health endpoint.',
    },
    {
      id: 'node-day-04-lo-04',
      code: 'LO4',
      title: 'Refactor the Task API',
      description:
        'Preserve existing endpoints while restructuring the application and running existing tests.',
    },
  ],
  selfCheckItems: [
    {
      id: 'node-day-04-sc-01',
      code: 'SC1',
      label: 'Configure Express routes and middleware',
      description: 'I can use Express routers and middleware in the application.',
      isRequired: true,
    },
    {
      id: 'node-day-04-sc-02',
      code: 'SC2',
      label: 'Separate application layers',
      description:
        'I can separate routes, controllers, services, and repositories without putting business logic in routes or direct file access in controllers.',
      isRequired: true,
    },
    {
      id: 'node-day-04-sc-03',
      code: 'SC3',
      label: 'Add centralized handlers and verify the API',
      description:
        'I can add request logging, a health endpoint, centralized error handlers, and run the existing tests.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did refactoring the Task API into Express change the structure of your application? Explain how you separated responsibilities and handled middleware, logging, and centralized errors.',
};
