import type { DayContent } from '@itp/types';

export const jsDay06: DayContent = {
  dayId: 'js-day-06',
  courseSlug: 'javascript',
  courseTitle: 'JavaScript',
  dayNumber: 6,
  totalDays: 10,
  title: 'Closures, Modules & Design Patterns',
  subtitle:
    'Explore closures, higher-order functions, and design patterns. Build a typed EventEmitter, a QueryBuilder, and refactor the portfolio into ES modules with a single entry point.',
  lessonSummary:
    'You will implement the module, observer, and factory patterns, use browser observers, build virtual scrolling for 10,000 items, and create an animated Canvas chart.',
  learningObjectives: [
    {
      id: 'lo-1',
      code: '01',
      title: 'Design Patterns',
      description: 'Implement the module, observer, and factory patterns in JavaScript.',
    },
    {
      id: 'lo-2',
      code: '02',
      title: 'Pattern Selection',
      description:
        'Explain when each design pattern is the right tool and identify patterns in unfamiliar code.',
    },
    {
      id: 'lo-3',
      code: '03',
      title: 'Private State',
      description: 'Use IIFE and ES module exports to create private state.',
    },
    {
      id: 'lo-4',
      code: '04',
      title: 'Refactoring',
      description: 'Refactor a messy global-state script into the module pattern.',
    },
    {
      id: 'lo-5',
      code: '05',
      title: 'Browser Observers',
      description: 'Use IntersectionObserver, MutationObserver, and ResizeObserver.',
    },
  ],
  selfCheckItems: [
    {
      id: 'sc-1',
      code: 'SEC 6.1',
      label: 'Design Patterns',
      description: 'I can implement observer, factory, and module patterns from memory.',
      isRequired: true,
    },
    {
      id: 'sc-2',
      code: 'SEC 6.2',
      label: 'ES Modules',
      description:
        'I have refactored the portfolio JavaScript to ES modules with a single entry point.',
      isRequired: true,
    },
    {
      id: 'sc-3',
      code: 'SEC 6.3',
      label: 'Browser Observers',
      description: 'I can use IntersectionObserver, MutationObserver, and ResizeObserver.',
      isRequired: true,
    },
    {
      id: 'sc-4',
      code: 'SEC 6.4',
      label: 'Virtual Scrolling',
      description: 'I have implemented virtual scrolling for 10,000 items running above 50fps.',
      isRequired: true,
    },
    {
      id: 'sc-5',
      code: 'SEC 6.5',
      label: 'Canvas Chart',
      description: 'I have built and exported a Canvas bar chart.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'The Observer pattern and event listeners are both ways to react to changes. How are they different, and when would you choose one over the other? What would a codebase look like if no one used design patterns? Give a specific example of the problem each solves. What is one thing you want to look up more deeply tomorrow?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
