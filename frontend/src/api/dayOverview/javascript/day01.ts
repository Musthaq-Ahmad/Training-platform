import type { DayContent } from '@itp/types';

export const jsDay01: DayContent = {
  dayId: 'js-day-01',
  courseSlug: 'javascript',
  courseTitle: 'JavaScript',
  dayNumber: 1,
  totalDays: 10,
  title: 'Types, Variables, Functions & Scope',
  subtitle:
    "Learn how JavaScript's types, variables, functions, and scope really work, then apply them by wiring a dark mode toggle with localStorage into the real portfolio.",
  lessonSummary:
    'You will build a dark mode toggle wired to localStorage on the real portfolio, and a scope/types reference file you will use all week.',
  learningObjectives: [
    {
      id: 'lo-1',
      code: '01',
      title: 'typeof Results',
      description:
        'Explain typeof results for null, [], {}, NaN, and function without looking them up.',
    },
    {
      id: 'lo-2',
      code: '02',
      title: 'Temporal Dead Zone',
      description: 'Demonstrate the temporal dead zone with code.',
    },
    {
      id: 'lo-3',
      code: '03',
      title: 'Functions & this-Binding',
      description: 'Write a function four ways and explain this-binding in each.',
    },
    {
      id: 'lo-4',
      code: '04',
      title: 'Closure-Based Counter',
      description: 'Build a closure-based counter with no global state.',
    },
    {
      id: 'lo-5',
      code: '05',
      title: 'Dark Mode Toggle',
      description: 'Implement the dark mode toggle across all five portfolio pages.',
    },
  ],
  selfCheckItems: [
    {
      id: 'sc-1',
      code: 'SEC 1.1',
      label: 'typeof Results',
      description: 'I can explain typeof results for null, [], {}, NaN without looking them up.',
      isRequired: true,
    },
    {
      id: 'sc-2',
      code: 'SEC 1.2',
      label: 'Temporal Dead Zone',
      description: 'I understand the temporal dead zone and can demonstrate it in 10 lines.',
      isRequired: true,
    },
    {
      id: 'sc-3',
      code: 'SEC 1.3',
      label: 'Functions & this Binding',
      description: 'I can write a function four ways and explain this binding in each.',
      isRequired: true,
    },
    {
      id: 'sc-4',
      code: 'SEC 1.4',
      label: 'Dark Mode Toggle',
      description: 'I have a working dark mode toggle persisted to localStorage on all five pages.',
      isRequired: true,
    },
    {
      id: 'sc-5',
      code: 'SEC 1.5',
      label: 'Code Pushed to GitHub',
      description: 'All files committed and pushed to GitHub.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What is the difference between == and === in JavaScript? Give an example where == gives a surprising result. Then explain closure in plain English to a non-programmer, and say what problem it solves.',
};
