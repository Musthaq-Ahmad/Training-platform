import type { DayContent } from '@itp/types';
export const nodejsDay01: DayContent = {
  dayId: 'node-day-01',
  courseSlug: 'node',
  courseTitle: 'Node.js',
  dayNumber: 1,
  totalDays: 5,
  title: 'Node.js Runtime and Project Setup',
  subtitle: 'Create a production-style TypeScript Node.js workspace.',
  lessonSummary:
    'Understand the Node.js runtime and create a repeatable project setup. Build a System Information CLI that displays runtime information using commands for version, operating system, memory, current directory, and environment. Use strict TypeScript, npm scripts, and Jest tests.',
  learningObjectives: [
    {
      id: 'node-day-01-lo-01',
      code: 'LO1',
      title: 'Understand Node.js',
      description: 'Explain the difference between Node.js and browser JavaScript.',
    },
    {
      id: 'node-day-01-lo-02',
      code: 'LO2',
      title: 'Configure a Node.js project',
      description: 'Use npm scripts, environment variables, and command-line arguments.',
    },
    {
      id: 'node-day-01-lo-03',
      code: 'LO3',
      title: 'Use TypeScript in strict mode',
      description: 'Compile and run TypeScript with strict type checking.',
    },
    {
      id: 'node-day-01-lo-04',
      code: 'LO4',
      title: 'Build a System Information CLI',
      description:
        'Create a CLI with runtime information commands, helpful invalid-command output, and Jest tests.',
    },
  ],
  selfCheckItems: [
    {
      id: 'node-day-01-sc-01',
      code: 'SC1',
      label: 'Explain Node.js versus browser JavaScript',
      description: 'I can explain how Node.js differs from JavaScript running in a browser.',
      isRequired: true,
    },
    {
      id: 'node-day-01-sc-02',
      code: 'SC2',
      label: 'Configure the project',
      description:
        'I can configure TypeScript, npm scripts, environment variables, and command-line arguments.',
      isRequired: true,
    },
    {
      id: 'node-day-01-sc-03',
      code: 'SC3',
      label: 'Implement and test CLI commands',
      description:
        'I can implement runtime information commands and write at least five Jest tests.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What did you learn about the Node.js runtime and project setup today? Describe how you structured your System Information CLI and handled command parsing, data collection, and testing.',
};
