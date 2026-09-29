import type { DayContent } from '@itp/types';

// Friday — Week 4 Project: Mini SPA Without a Framework
export const jsDay10: DayContent = {
  dayId: 'js-day-10',
  courseSlug: 'javascript',
  courseTitle: 'JavaScript',
  dayNumber: 10,
  totalDays: 10,
  title: 'Week 4 Project - Mini SPA Without a Framework',
  subtitle:
    'Build a mini single-page application without a framework, with client-side routing, reactive state management, reusable UI components, localStorage persistence, and a complete Jest test suite.',
  lessonSummary:
    'You will architect and build a mini SPA with routing, a state manager, reusable page and UI components, CRUD operations, persistence, loading and error states, keyboard navigation, and a Jest test suite with 70%+ coverage. Deploy the application to GitHub Pages.',
  learningObjectives: [
    {
      id: 'lo-1',
      code: '01',
      title: 'Application Architecture',
      description: 'Architect a JavaScript application using module and observer patterns.',
    },
    {
      id: 'lo-2',
      code: '02',
      title: 'Client-Side Routing',
      description: 'Build a client-side router that handles history and browser navigation.',
    },
    {
      id: 'lo-3',
      code: '03',
      title: 'Testing',
      description: 'Write a full Jest test suite with 70%+ coverage.',
    },
    {
      id: 'lo-4',
      code: '04',
      title: 'Deployment',
      description: 'Deploy the application to GitHub Pages.',
    },
    {
      id: 'lo-5',
      code: '05',
      title: 'Documentation',
      description: 'Document the architecture in a README with a component diagram.',
    },
  ],
  selfCheckItems: [
    {
      id: 'sc-1',
      code: 'SEC 10.1',
      label: 'Client-Side Routing',
      description: 'The SPA has client-side routing that handles browser back/forward correctly.',
      isRequired: true,
    },
    {
      id: 'sc-2',
      code: 'SEC 10.2',
      label: 'Reactive State',
      description:
        'The state manager is immutable and all components re-render on relevant state changes.',
      isRequired: true,
    },
    {
      id: 'sc-3',
      code: 'SEC 10.3',
      label: 'Test Coverage',
      description: 'The Jest test suite achieves 70%+ coverage on business logic.',
      isRequired: true,
    },
    {
      id: 'sc-4',
      code: 'SEC 10.4',
      label: 'Deployment',
      description: 'The SPA is deployed to GitHub Pages.',
      isRequired: true,
    },
    {
      id: 'sc-5',
      code: 'SEC 10.5',
      label: 'Architecture Documentation',
      description: 'The README includes a component diagram and explains the architecture.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'After building your own mini SPA, what problems do React and Vue actually solve? Which parts were hardest? What would you add with one more week? What technical debt did you leave behind? What is one thing you want to look up more deeply tomorrow?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
