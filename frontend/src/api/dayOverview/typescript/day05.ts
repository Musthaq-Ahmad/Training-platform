import type { DayContent } from '@itp/types';

export const tsDay05: DayContent = {
  dayId: 'ts-day-05',
  courseSlug: 'typescript',
  courseTitle: 'TypeScript',
  dayNumber: 5,
  totalDays: 5,
  title: 'Phase 1 Capstone — Checkpoint 1 Submission',
  subtitle: 'Friday — Week 5',
  lessonSummary:
    'Finalize the TypeScript project for Checkpoint 1. Verify strict compilation, zero any types, passing tests, and 70% or higher coverage. Prepare project documentation, CI, a pull request, and a Phase 2 growth plan.',
  learningObjectives: [
    {
      id: 'ts-day-05-lo-01',
      code: 'LO-01',
      title: 'Prepare a clean TypeScript codebase',
      description:
        'Verify strict TypeScript compilation, zero any types, ESLint, passing tests, and the required test coverage.',
    },
    {
      id: 'ts-day-05-lo-02',
      code: 'LO-02',
      title: 'Document the project',
      description:
        'Write a comprehensive README and architecture documentation covering the project, technical decisions, and complex types.',
    },
    {
      id: 'ts-day-05-lo-03',
      code: 'LO-03',
      title: 'Configure continuous integration',
      description:
        'Set up a GitHub Actions workflow that runs TypeScript checks, ESLint, and Jest coverage on every pull request.',
    },
    {
      id: 'ts-day-05-lo-04',
      code: 'LO-04',
      title: 'Submit and review a pull request',
      description:
        'Open a pull request, review the changes, verify that CI passes, and prepare for the Checkpoint 1 review.',
    },
    {
      id: 'ts-day-05-lo-05',
      code: 'LO-05',
      title: 'Reflect and prepare for Phase 2',
      description:
        'Complete the Phase 1 reflection and self-assessment, prepare a 30-day growth plan, and identify areas for improvement.',
    },
  ],
  selfCheckItems: [
    {
      id: 'ts-day-05-sc-01',
      code: 'SC-01',
      label: 'Strict TypeScript compilation passes',
      description: 'tsc --noEmit exits with zero errors with strict mode enabled.',
      isRequired: true,
    },
    {
      id: 'ts-day-05-sc-02',
      code: 'SC-02',
      label: 'There are zero any types',
      description: 'All files are verified to contain zero any types.',
      isRequired: true,
    },
    {
      id: 'ts-day-05-sc-03',
      code: 'SC-03',
      label: 'Test coverage meets the target',
      description: 'Jest coverage is 70% or higher on all business logic files.',
      isRequired: true,
    },
    {
      id: 'ts-day-05-sc-04',
      code: 'SC-04',
      label: 'The pull request is ready',
      description: 'The pull request is open with a thorough description and CI is green.',
      isRequired: true,
    },
    {
      id: 'ts-day-05-sc-05',
      code: 'SC-05',
      label: 'Phase 2 preparation is complete',
      description: 'The 30-day Phase 2 growth plan and Phase 1 self-assessment are complete.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'After five weeks, what is the single most important habit you have developed as a programmer?\n\nIf you were teaching Week 1 to the next cohort, what would you emphasise that you wish you had known on Day 1?\n\nWhat is one thing you want to look up more deeply tomorrow?',
  journalResponse: null,
  isLocked: true,
  isCompleted: false,
};
