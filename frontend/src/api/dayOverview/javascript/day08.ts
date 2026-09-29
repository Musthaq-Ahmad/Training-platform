import type { DayContent } from '@itp/types';

// Wednesday — Testing with Jest
export const jsDay08: DayContent = {
  dayId: 'js-day-08',
  courseSlug: 'javascript',
  courseTitle: 'JavaScript',
  dayNumber: 8,
  totalDays: 10,
  title: 'Testing with Jest - Unit, Integration & Mocking',
  subtitle:
    'Learn to test JavaScript utilities, asynchronous operations, and DOM interactions using Jest. Practise mocking functions and modules, managing test state, and improving code coverage.',
  lessonSummary:
    'You will build a Jest test suite for Week 3 utilities, test asynchronous code and DOM behaviour, use mocks and spies, and achieve 70%+ statement and branch coverage on business logic files.',
  learningObjectives: [
    {
      id: 'lo-1',
      code: '01',
      title: 'Unit Testing',
      description: 'Write unit tests using describe, it, expect, and Jest matchers.',
    },
    {
      id: 'lo-2',
      code: '02',
      title: 'Mocking',
      description: 'Mock functions and modules using jest.fn() and jest.mock().',
    },
    {
      id: 'lo-3',
      code: '03',
      title: 'Test Setup & Teardown',
      description: 'Set up and tear down test state with beforeEach and afterEach.',
    },
    {
      id: 'lo-4',
      code: '04',
      title: 'Code Coverage',
      description: 'Read a coverage report and add tests to cover uncovered branches.',
    },
    {
      id: 'lo-5',
      code: '05',
      title: 'Testing Behaviour',
      description:
        'Understand the test pyramid and why testing behaviour matters more than implementation.',
    },
  ],
  selfCheckItems: [
    {
      id: 'sc-1',
      code: 'SEC 8.1',
      label: 'Jest Testing',
      description:
        'I can write a unit test with describe, it, expect, and five different matchers.',
      isRequired: true,
    },
    {
      id: 'sc-2',
      code: 'SEC 8.2',
      label: 'Mock Functions',
      description:
        'I can mock a function with jest.fn() and assert it was called with the right arguments.',
      isRequired: true,
    },
    {
      id: 'sc-3',
      code: 'SEC 8.3',
      label: 'Timer Mocks',
      description: 'I can use jest.useFakeTimers() to test time-based functions.',
      isRequired: true,
    },
    {
      id: 'sc-4',
      code: 'SEC 8.4',
      label: 'Code Coverage',
      description: 'I have achieved 70%+ coverage on my utility functions.',
      isRequired: true,
    },
    {
      id: 'sc-5',
      code: 'SEC 8.5',
      label: 'Coverage Concepts',
      description: 'I understand statement, branch, function, and line coverage.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What should you test: implementation (how) or behaviour (what)? Why does the distinction matter? What is the difference between a mock, a stub, and a spy? Give a code example of each. What is one thing you want to look up more deeply tomorrow?',
};
