import type { DayContent } from '@itp/types';

export const jsDay03: DayContent = {
  dayId: 'js-day-03',
  courseSlug: 'js',
  courseTitle: 'JavaScript',
  dayNumber: 3,
  totalDays: 10,
  title: 'OOP, Functional JS & Modern Array Methods',
  subtitle:
    'Build class hierarchies, understand this binding, and write pure functions with immutable state, then use them to create a form validator, shopping cart, and Kanban board.',
  lessonSummary:
    'You will build a reusable FormValidator class, a shopping cart with immutable state, and a drag-and-drop Kanban board.',
  learningObjectives: [
    {
      id: 'lo-1',
      code: '01',
      title: 'Class Hierarchies',
      description: 'Build a class hierarchy with extends, super, and method overriding.',
    },
    {
      id: 'lo-2',
      code: '02',
      title: 'this Binding Rules',
      description: 'Describe all four this binding rules and demonstrate each.',
    },
    {
      id: 'lo-3',
      code: '03',
      title: 'Pure Functions & Immutability',
      description: 'Write pure functions for all data transformations using immutable patterns.',
    },
    {
      id: 'lo-4',
      code: '04',
      title: 'CRUD with Persistence',
      description: 'Build a full CRUD UI with localStorage persistence.',
    },
    {
      id: 'lo-5',
      code: '05',
      title: 'Drag and Drop API',
      description: 'Use the HTML5 Drag and Drop API.',
    },
  ],
  selfCheckItems: [
    {
      id: 'sc-1',
      code: 'SEC 3.1',
      label: 'Class Hierarchies',
      description: 'I can build a class hierarchy with extends, super, and method overriding.',
      isRequired: true,
    },
    {
      id: 'sc-2',
      code: 'SEC 3.2',
      label: 'this Binding Rules',
      description: 'I can demonstrate all four this binding rules from memory.',
      isRequired: true,
    },
    {
      id: 'sc-3',
      code: 'SEC 3.3',
      label: 'Pure Functions',
      description: 'I write pure functions for data transformations - no mutation of arguments.',
      isRequired: true,
    },
    {
      id: 'sc-4',
      code: 'SEC 3.4',
      label: 'CRUD with localStorage',
      description: 'I have built a CRUD UI with localStorage persistence.',
      isRequired: true,
    },
    {
      id: 'sc-5',
      code: 'SEC 3.5',
      label: 'Drag and Drop',
      description: 'I have implemented drag and drop using the HTML5 API.',
      isRequired: true,
    },
  ],
  journalPrompt:
    "What is the difference between a class method and a class field arrow function, and when does the difference matter? Why does immutable state make code easier to debug? Give a specific example from today's work.",
};
