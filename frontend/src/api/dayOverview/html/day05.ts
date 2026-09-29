import type { DayContent } from '@itp/types';

export const htmlDay05: DayContent = {
  dayId: 'html-day-05',
  courseSlug: 'html',
  courseTitle: 'HTML',
  dayNumber: 5,
  totalDays: 5,
  title: 'Week 1 Project - Five-Page Semantic Website',
  subtitle: 'Build and deploy a complete semantic HTML website.',
  lessonSummary:
    'Create a five-page company website with shared navigation, accessible content, validated pages, and a GitHub Pages deployment.',
  learningObjectives: [
    {
      id: 'html-5-obj-1',
      code: '5.1',
      title: 'Website Structure',
      description: 'Apply semantic HTML concepts across a cohesive website.',
    },
    {
      id: 'html-5-obj-2',
      code: '5.2',
      title: 'Navigation',
      description: 'Create consistent navigation and cross-link all pages.',
    },
    {
      id: 'html-5-obj-3',
      code: '5.3',
      title: 'Validation and Accessibility',
      description: 'Validate all pages and check accessibility scores.',
    },
    {
      id: 'html-5-obj-4',
      code: '5.4',
      title: 'Deployment',
      description: 'Document and deploy the website using GitHub Pages.',
    },
  ],
  selfCheckItems: [
    {
      id: 'html-5-check-1',
      code: '5.1',
      label: 'Page navigation',
      description: 'Ensure all five pages are cross-linked.',
      isRequired: true,
    },
    {
      id: 'html-5-check-2',
      code: '5.2',
      label: 'HTML validation',
      description: 'All pages pass W3C validation with zero errors.',
      isRequired: true,
    },
    {
      id: 'html-5-check-3',
      code: '5.3',
      label: 'Accessibility',
      description: 'All pages score 90 or above on Lighthouse Accessibility.',
      isRequired: true,
    },
    {
      id: 'html-5-check-4',
      code: '5.4',
      label: 'Deployment',
      description: 'Deploy the website to GitHub Pages.',
      isRequired: true,
    },
  ],
  journalPrompt: 'Which page was hardest to build and why?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
