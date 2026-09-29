import type { DayContent } from '@itp/types';

export const nodejsDay02: DayContent = {
  dayId: 'nodejs-day-02',
  courseSlug: 'nodejs',
  courseTitle: 'Node.js',
  dayNumber: 2,
  totalDays: 5,
  title: 'Files, Promises and Error Handling',
  subtitle: 'Build a persistent command-line application.',
  lessonSummary:
    'Use async/await and promise-based file system APIs to build a file-based Task Manager CLI. Implement task creation, listing, completion, deletion, and filtering. Persist tasks in JSON, separate storage from business logic, and handle missing files, malformed data, and other failures safely.',
  learningObjectives: [
    {
      id: 'nodejs-day-02-lo-01',
      code: 'LO1',
      title: 'Work with asynchronous file APIs',
      description: 'Read and write files using promise-based APIs and async/await.',
    },
    {
      id: 'nodejs-day-02-lo-02',
      code: 'LO2',
      title: 'Handle storage errors safely',
      description: 'Handle missing files, malformed data, and avoid unhandled promise rejections.',
    },
    {
      id: 'nodejs-day-02-lo-03',
      code: 'LO3',
      title: 'Build a persistent Task Manager CLI',
      description: 'Implement task operations and persist task data in JSON.',
    },
    {
      id: 'nodejs-day-02-lo-04',
      code: 'LO4',
      title: 'Separate storage and business logic',
      description:
        'Keep repository or storage functions separate from command handling and service logic.',
    },
  ],
  selfCheckItems: [
    {
      id: 'nodejs-day-02-sc-01',
      code: 'SC1',
      label: 'Use promise-based file operations',
      description: 'I can read and write files asynchronously without using synchronous file APIs.',
      isRequired: true,
    },
    {
      id: 'nodejs-day-02-sc-02',
      code: 'SC2',
      label: 'Handle missing and malformed data',
      description:
        'I can recover gracefully when the storage file is missing or contains malformed JSON.',
      isRequired: true,
    },
    {
      id: 'nodejs-day-02-sc-03',
      code: 'SC3',
      label: 'Implement and test task operations',
      description:
        'I can add, list, complete, delete, and filter tasks while keeping storage separate from commands.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What challenges did you face while building the Task Manager CLI? Explain how you handled asynchronous file operations, separated storage from business logic, and tested failure cases.',
};
