import type { DayContent } from '@itp/types';

export const cssDay04: DayContent = {
  dayId: 'css-day-04',
  courseSlug: 'css',
  courseTitle: 'CSS',
  dayNumber: 4,
  totalDays: 5,
  title: 'Responsive Design, CSS Animations & Transitions',
  subtitle: 'Make the website responsive and add motion and theming.',
  lessonSummary:
    'Build a responsive website across three breakpoints, add animations and transitions, and create a dark mode system.',
  learningObjectives: [
    {
      id: 'css-4-obj-1',
      code: '4.1',
      title: 'Responsive Design',
      description: 'Use media queries and responsive layouts.',
    },
    {
      id: 'css-4-obj-2',
      code: '4.2',
      title: 'CSS Transitions',
      description: 'Apply transitions to interactive elements.',
    },
    {
      id: 'css-4-obj-3',
      code: '4.3',
      title: 'CSS Animations',
      description: 'Create animations using keyframes.',
    },
    {
      id: 'css-4-obj-4',
      code: '4.4',
      title: 'Dark Mode',
      description: 'Build a dark mode system using CSS variables.',
    },
  ],
  selfCheckItems: [
    {
      id: 'css-4-check-1',
      code: '4.1',
      label: 'Responsive breakpoints',
      description: 'Test the website at three breakpoints.',
      isRequired: true,
    },
    {
      id: 'css-4-check-2',
      code: '4.2',
      label: 'Transitions',
      description: 'Apply transitions to interactive elements.',
      isRequired: true,
    },
    {
      id: 'css-4-check-3',
      code: '4.3',
      label: 'Animations',
      description: 'Create and apply CSS animations.',
      isRequired: true,
    },
    {
      id: 'css-4-check-4',
      code: '4.4',
      label: 'Dark mode',
      description: 'Implement a dark mode theme.',
      isRequired: true,
    },
  ],
  journalPrompt: 'What is the difference between a CSS transition and a CSS animation?',
};
