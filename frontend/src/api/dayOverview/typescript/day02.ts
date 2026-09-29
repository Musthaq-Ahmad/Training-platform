import type { DayContent } from '@itp/types';

export const tsDay02: DayContent = {
  dayId: 'ts-day-02',
  courseSlug: 'typescript',
  courseTitle: 'TypeScript',
  dayNumber: 2,
  totalDays: 5,
  title: 'Generics, Utility Types & Advanced Type Patterns',
  subtitle: 'Tuesday — Week 5',
  lessonSummary:
    'Master generic functions and classes, built-in utility types, mapped and conditional types, discriminated unions, and type-safe API patterns. Build a generic API client and convert the state manager and router to TypeScript.',
  learningObjectives: [
    {
      id: 'ts-day-02-lo-01',
      code: 'LO-01',
      title: 'Write generic functions and classes',
      description:
        'Create reusable generic functions and classes using type parameters and constraints with extends.',
    },
    {
      id: 'ts-day-02-lo-02',
      code: 'LO-02',
      title: 'Apply utility types',
      description:
        'Use Partial, Required, Pick, Omit, Record, ReturnType, and Parameters to transform and reuse types.',
    },
    {
      id: 'ts-day-02-lo-03',
      code: 'LO-03',
      title: 'Model API responses with unions',
      description:
        'Build type-safe API response patterns and loading states using discriminated unions.',
    },
    {
      id: 'ts-day-02-lo-04',
      code: 'LO-04',
      title: 'Build mapped and conditional types',
      description:
        'Use mapped types, keyof, typeof, infer, and conditional types to create custom type utilities.',
    },
    {
      id: 'ts-day-02-lo-05',
      code: 'LO-05',
      title: 'Build type-safe application utilities',
      description:
        'Convert the state manager, generic API client, and router to TypeScript with correctly typed actions, methods, and parameters.',
    },
  ],
  selfCheckItems: [
    {
      id: 'ts-day-02-sc-01',
      code: 'SC-01',
      label: 'I can write generic functions',
      description: 'I can write generic functions with type constraints using extends.',
      isRequired: true,
    },
    {
      id: 'ts-day-02-sc-02',
      code: 'SC-02',
      label: 'I can use utility types',
      description: 'I can use Partial, Required, Pick, Omit, Record, ReturnType, and Parameters.',
      isRequired: true,
    },
    {
      id: 'ts-day-02-sc-03',
      code: 'SC-03',
      label: 'The state manager is fully typed',
      description:
        'I have converted the state manager with fully typed dispatch and valid action types.',
      isRequired: true,
    },
    {
      id: 'ts-day-02-sc-04',
      code: 'SC-04',
      label: 'I understand discriminated unions',
      description:
        'I can use discriminated unions to represent API response states and handle each case safely.',
      isRequired: true,
    },
    {
      id: 'ts-day-02-sc-05',
      code: 'SC-05',
      label: 'I have built a mapped type',
      description: 'I have implemented at least one mapped type from scratch.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What is the difference between Partial<T> and Optional? How does Partial actually work under the hood?\n\nWhen would you use a discriminated union instead of inheritance? Give a concrete example.\n\nWhat is one thing you want to look up more deeply tomorrow?',
};
