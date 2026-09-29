import type { DayContent } from '@itp/types';

export const tsDay01: DayContent = {
  dayId: 'ts-day-01',
  courseSlug: 'typescript',
  courseTitle: 'TypeScript',
  dayNumber: 1,
  totalDays: 5,
  title: 'TypeScript Setup, Basic Types & Type Inference',
  subtitle: 'Monday — Week 5',
  lessonSummary:
    'Set up a TypeScript project with strict mode, learn basic types, type inference, interfaces, and type narrowing. Convert Week 3 utility functions to TypeScript with zero implicit any.',
  learningObjectives: [
    {
      id: 'ts-day-01-lo-01',
      code: 'LO-01',
      title: 'Configure TypeScript',
      description:
        'Install TypeScript and configure tsconfig.json with strict mode and the required compiler options.',
    },
    {
      id: 'ts-day-01-lo-02',
      code: 'LO-02',
      title: 'Use basic types and inference',
      description:
        'Annotate function parameters and return types correctly and understand how TypeScript infers types automatically.',
    },
    {
      id: 'ts-day-01-lo-03',
      code: 'LO-03',
      title: 'Define interfaces and object types',
      description:
        'Create interfaces, use optional and readonly properties, and apply utility types such as Partial and Readonly.',
    },
    {
      id: 'ts-day-01-lo-04',
      code: 'LO-04',
      title: 'Narrow types safely',
      description:
        'Use type guards, union types, discriminated unions, and exhaustive switch statements to handle different values safely.',
    },
    {
      id: 'ts-day-01-lo-05',
      code: 'LO-05',
      title: 'Convert JavaScript utilities',
      description:
        'Convert Week 3 utility functions to TypeScript with explicit return types and zero any types.',
    },
  ],
  selfCheckItems: [
    {
      id: 'ts-day-01-sc-01',
      code: 'SC-01',
      label: 'TypeScript is configured',
      description:
        'TypeScript is installed, strict mode is enabled, and the project compiles without errors.',
      isRequired: true,
    },
    {
      id: 'ts-day-01-sc-02',
      code: 'SC-02',
      label: 'I understand type inference',
      description:
        'I can explain type inference and identify cases where explicit annotations are unnecessary.',
      isRequired: true,
    },
    {
      id: 'ts-day-01-sc-03',
      code: 'SC-03',
      label: 'I can use interfaces and utility types',
      description: 'I can write interfaces and use Partial, Readonly, and union types.',
      isRequired: true,
    },
    {
      id: 'ts-day-01-sc-04',
      code: 'SC-04',
      label: 'Week 3 utilities are typed',
      description: 'Week 3 utility functions are converted to TypeScript with zero any types.',
      isRequired: true,
    },
    {
      id: 'ts-day-01-sc-05',
      code: 'SC-05',
      label: 'I understand unknown vs any',
      description: 'I can explain the difference between unknown and any and when to use unknown.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What is the difference between any and unknown in TypeScript? When would you use unknown?\n\nWhat is the temporal dead zone in JavaScript, and how does TypeScript help prevent similar bugs through static analysis?\n\nWhat is one thing you want to look up more deeply tomorrow?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
