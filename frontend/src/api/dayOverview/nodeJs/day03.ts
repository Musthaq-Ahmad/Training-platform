import type { DayContent } from '@itp/types';

export const nodejsDay03: DayContent = {
  dayId: 'nodejs-day-03',
  courseSlug: 'nodejs',
  courseTitle: 'Node.js',
  dayNumber: 3,
  totalDays: 5,
  title: 'HTTP and REST Fundamentals',
  subtitle: 'Expose task data through an HTTP API.',
  lessonSummary:
    'Convert the Task Manager into a Node.js HTTP API without Express. Understand HTTP methods, status codes, route parameters, and JSON request and response bodies. Implement task endpoints, validate input before saving, and return consistent JSON errors.',
  learningObjectives: [
    {
      id: 'nodejs-day-03-lo-01',
      code: 'LO1',
      title: 'Understand HTTP and REST',
      description: 'Explain HTTP method and status-code choices and apply REST resource design.',
    },
    {
      id: 'nodejs-day-03-lo-02',
      code: 'LO2',
      title: 'Handle HTTP requests',
      description: 'Parse route parameters and JSON request bodies using Node.js HTTP APIs.',
    },
    {
      id: 'nodejs-day-03-lo-03',
      code: 'LO3',
      title: 'Build a Task Manager HTTP API',
      description:
        'Implement GET, POST, PATCH, and DELETE endpoints for task resources without Express.',
    },
    {
      id: 'nodejs-day-03-lo-04',
      code: 'LO4',
      title: 'Validate input and return consistent errors',
      description:
        'Validate inputs before saving and return appropriate status codes and JSON error responses.',
    },
  ],
  selfCheckItems: [
    {
      id: 'nodejs-day-03-sc-01',
      code: 'SC1',
      label: 'Choose HTTP methods and status codes',
      description: 'I can explain the HTTP methods and status codes used by my API.',
      isRequired: true,
    },
    {
      id: 'nodejs-day-03-sc-02',
      code: 'SC2',
      label: 'Implement task endpoints',
      description:
        'I can implement GET, POST, PATCH, and DELETE endpoints using Node.js HTTP without Express.',
      isRequired: true,
    },
    {
      id: 'nodejs-day-03-sc-03',
      code: 'SC3',
      label: 'Validate requests and handle errors',
      description:
        'I can validate input, set the correct Content-Type, and return consistent JSON errors.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you turn the Task Manager into an HTTP API? Reflect on your route design, HTTP methods, status codes, request validation, and how you avoided duplicating response-writing logic.',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
