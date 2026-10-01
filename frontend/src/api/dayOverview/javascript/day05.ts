import type { DayContent } from '@itp/types';

export const jsDay05: DayContent = {
  dayId: 'js-day-05',
  courseSlug: 'js',
  courseTitle: 'JavaScript',
  dayNumber: 5,
  totalDays: 10,
  title: 'Week 3 Project: Full JS Integration on Portfolio',
  subtitle:
    'Bring the whole week together by organising all portfolio JavaScript into ES modules, validating every form, powering content from public APIs, and deploying the polished site to GitHub Pages.',
  lessonSummary:
    'You will finish with a portfolio that uses ES modules, has zero global variables, passes ESLint, and is live on GitHub Pages with all interactive features working.',
  learningObjectives: [
    {
      id: 'lo-1',
      code: '01',
      title: 'ES Modules',
      description: 'Organise all JavaScript with ES modules (import/export) - one entry point.',
    },
    {
      id: 'lo-2',
      code: '02',
      title: 'Loading & Error States',
      description: 'All async operations show loading and error states.',
    },
    {
      id: 'lo-3',
      code: '03',
      title: 'Mobile & Desktop Support',
      description: 'All interactive features work on mobile and desktop.',
    },
    {
      id: 'lo-4',
      code: '04',
      title: 'Form Validation',
      description: 'All forms validate with the FormValidator class.',
    },
    {
      id: 'lo-5',
      code: '05',
      title: 'Deployed & Error-Free',
      description: 'The site is deployed and error-free in the browser console.',
    },
  ],
  selfCheckItems: [
    {
      id: 'sc-1',
      code: 'SEC 5.1',
      label: 'ES Modules',
      description: "All JS uses ES modules with type='module' - zero global variables.",
      isRequired: true,
    },
    {
      id: 'sc-2',
      code: 'SEC 5.2',
      label: 'Live on GitHub Pages',
      description: 'All five pages are live on GitHub Pages with no console errors.',
      isRequired: true,
    },
    {
      id: 'sc-3',
      code: 'SEC 5.3',
      label: 'Mobile & Desktop',
      description: 'All interactive features work on mobile and desktop.',
      isRequired: true,
    },
    {
      id: 'sc-4',
      code: 'SEC 5.4',
      label: 'ESLint',
      description: 'ESLint passes with zero warnings or errors.',
      isRequired: true,
    },
    {
      id: 'sc-5',
      code: 'SEC 5.5',
      label: 'Loading & Error States',
      description: 'All async operations show loading and error states.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What was the hardest JavaScript concept this week? Write a two-paragraph explanation in your own words. Which feature of your site are you most proud of, and why?',
};
