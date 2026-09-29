import type { DayContent } from '@itp/types';

export const tsDay04: DayContent = {
  dayId: 'ts-day-04',
  courseSlug: 'typescript',
  courseTitle: 'TypeScript',
  dayNumber: 4,
  totalDays: 5,
  title: 'Migrating JavaScript to TypeScript & ts-jest',
  subtitle: 'Thursday — Week 5',
  lessonSummary:
    'Migrate the Week 4 mini SPA incrementally from JavaScript to TypeScript. Configure ts-jest, resolve migration errors, enable strict null checks, add third-party type declarations, and achieve at least 70% test coverage.',
  learningObjectives: [
    {
      id: 'ts-day-04-lo-01',
      code: 'LO-01',
      title: 'Migrate JavaScript incrementally',
      description:
        'Convert a JavaScript project to TypeScript one file at a time, starting with utilities and progressing through components, router, and state manager.',
    },
    {
      id: 'ts-day-04-lo-02',
      code: 'LO-02',
      title: 'Configure ts-jest',
      description:
        'Configure ts-jest and run TypeScript test files with the correct Jest settings and type declarations.',
    },
    {
      id: 'ts-day-04-lo-03',
      code: 'LO-03',
      title: 'Resolve migration errors',
      description:
        'Fix common TypeScript migration errors by addressing missing properties, nullability, and incompatible types without using any.',
    },
    {
      id: 'ts-day-04-lo-04',
      code: 'LO-04',
      title: 'Use third-party type declarations',
      description:
        'Install @types packages and write declaration files for libraries that do not provide their own types.',
    },
    {
      id: 'ts-day-04-lo-05',
      code: 'LO-05',
      title: 'Enforce strict checks and coverage',
      description:
        'Enable strict mode, resolve strict null check errors, run typed tests, and achieve 70% or higher coverage on business logic files.',
    },
  ],
  selfCheckItems: [
    {
      id: 'ts-day-04-sc-01',
      code: 'SC-01',
      label: 'The Week 4 SPA is migrated',
      description: 'The Week 4 SPA is fully migrated to TypeScript with strict mode enabled.',
      isRequired: true,
    },
    {
      id: 'ts-day-04-sc-02',
      code: 'SC-02',
      label: 'Type checking passes',
      description: 'Running tsc --noEmit produces zero errors.',
      isRequired: true,
    },
    {
      id: 'ts-day-04-sc-03',
      code: 'SC-03',
      label: 'There are zero any types',
      description: 'All TypeScript files are free of any types.',
      isRequired: true,
    },
    {
      id: 'ts-day-04-sc-04',
      code: 'SC-04',
      label: 'ts-jest is configured',
      description: 'ts-jest is configured and all tests pass.',
      isRequired: true,
    },
    {
      id: 'ts-day-04-sc-05',
      code: 'SC-05',
      label: 'Test coverage is at least 70%',
      description: 'All business logic files meet the 70% or higher test coverage target.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What was the hardest migration error today? Describe the error and three options you considered.\n\nWhy are type-only imports a performance optimisation for large TypeScript codebases?\n\nWhat is one thing you want to look up more deeply tomorrow?',
  journalResponse: null,
  isLocked: true,
  isCompleted: false,
};
