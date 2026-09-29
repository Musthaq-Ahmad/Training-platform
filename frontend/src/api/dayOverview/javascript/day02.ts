import type { DayContent } from '@itp/types';
export const jsDay02: DayContent = {
  dayId: 'js-day-02',
  courseSlug: 'javascript',
  courseTitle: 'JavaScript',
  dayNumber: 2,
  totalDays: 10,
  title: 'Events, Control Flow & Error Handling',
  subtitle:
    'Master browser events, bubbling and delegation, control flow, and custom errors while adding a live search, accessible accordion, scroll animations, and lightbox to the portfolio.',
  lessonSummary:
    'You will build a live search filter, accessible accordion, scroll animations, and a complete lightbox on the real portfolio site.',
  learningObjectives: [
    {
      id: 'lo-1',
      code: '01',
      title: 'Bubbling vs Capturing',
      description: 'Explain event bubbling vs capturing and predict listener execution order.',
    },
    {
      id: 'lo-2',
      code: '02',
      title: 'Event Delegation',
      description: 'Implement event delegation using event.target.matches() and closest().',
    },
    {
      id: 'lo-3',
      code: '03',
      title: 'Debouncing',
      description: 'Debounce an event handler and explain why it matters.',
    },
    {
      id: 'lo-4',
      code: '04',
      title: 'Accessible Components',
      description: 'Build keyboard-accessible interactive components with correct ARIA state.',
    },
    {
      id: 'lo-5',
      code: '05',
      title: 'Error Handling',
      description: 'Handle errors with try/catch and custom error classes.',
    },
  ],
  selfCheckItems: [
    {
      id: 'sc-1',
      code: 'SEC 2.1',
      label: 'Bubbling vs Capturing',
      description: 'I understand event bubbling vs capturing and can predict listener order.',
      isRequired: true,
    },
    {
      id: 'sc-2',
      code: 'SEC 2.2',
      label: 'Event Delegation',
      description: 'I can implement event delegation with matches() and closest().',
      isRequired: true,
    },
    {
      id: 'sc-3',
      code: 'SEC 2.3',
      label: 'Debouncing',
      description: 'I can debounce a function and explain why it matters for performance.',
      isRequired: true,
    },
    {
      id: 'sc-4',
      code: 'SEC 2.4',
      label: 'Accessible Accordion',
      description: 'I have a keyboard-accessible accordion with correct ARIA state management.',
      isRequired: true,
    },
    {
      id: 'sc-5',
      code: 'SEC 2.5',
      label: 'IntersectionObserver',
      description: 'I can use IntersectionObserver to trigger effects on scroll.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What is the difference between event.target and event.currentTarget? Give an example where they differ. Why is one delegated listener on a parent better than one listener per child?',
};
