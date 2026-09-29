import type { DayContent } from '@itp/types';

export const cssDay05: DayContent = {
  dayId: 'css-day-05',
  courseSlug: 'css',
  courseTitle: 'CSS',
  dayNumber: 5,
  totalDays: 5,
  title: 'Week 2 Project - Style the Complete Five-Page Website',
  subtitle: 'Apply CSS concepts to the complete website.',
  lessonSummary:
    'Style all five HTML pages with a consistent design system, responsive layouts, and interactive states, then deploy the updated site.',
  learningObjectives: [
    {
      id: 'css-5-obj-1',
      code: '5.1',
      title: 'Consistent Design',
      description: 'Apply a consistent colour system and typography.',
    },
    {
      id: 'css-5-obj-2',
      code: '5.2',
      title: 'Responsive Layouts',
      description: 'Make all pages responsive across three breakpoints.',
    },
    {
      id: 'css-5-obj-3',
      code: '5.3',
      title: 'Interactive States',
      description: 'Style interactive elements with hover and focus states.',
    },
    {
      id: 'css-5-obj-4',
      code: '5.4',
      title: 'Deployment',
      description: 'Deploy the updated website to GitHub Pages.',
    },
  ],
  selfCheckItems: [
    {
      id: 'css-5-check-1',
      code: '5.1',
      label: 'Consistent styling',
      description: 'Apply a consistent design across all five pages.',
      isRequired: true,
    },
    {
      id: 'css-5-check-2',
      code: '5.2',
      label: 'Responsive pages',
      description: 'Verify all pages at three breakpoints.',
      isRequired: true,
    },
    {
      id: 'css-5-check-3',
      code: '5.3',
      label: 'Interactive states',
      description: 'Style hover and focus states for interactive elements.',
      isRequired: true,
    },
    {
      id: 'css-5-check-4',
      code: '5.4',
      label: 'Deployment',
      description: 'Deploy the updated website to GitHub Pages.',
      isRequired: true,
    },
  ],
  journalPrompt: 'Which page was hardest to style and why?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
