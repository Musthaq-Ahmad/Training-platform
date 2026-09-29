import type { DayContent } from '@itp/types';

export const htmlDay02: DayContent = {
  dayId: 'html-day-02',
  courseSlug: 'html',
  courseTitle: 'HTML',
  dayNumber: 2,
  totalDays: 5,
  title: 'Semantic HTML5 & Web Accessibility',
  subtitle: 'Build accessible pages using semantic elements and ARIA.',
  lessonSummary:
    'Create a semantic blog page and accessible image gallery with meaningful landmarks, alt text, and accessibility checks.',
  learningObjectives: [
    {
      id: 'html-2-obj-1',
      code: '2.1',
      title: 'Semantic Elements',
      description: 'Use HTML sectioning and landmark elements correctly.',
    },
    {
      id: 'html-2-obj-2',
      code: '2.2',
      title: 'ARIA',
      description: 'Use ARIA roles, labels, and live regions appropriately.',
    },
    {
      id: 'html-2-obj-3',
      code: '2.3',
      title: 'Accessible Images',
      description: 'Write descriptive alt text and identify decorative images.',
    },
    {
      id: 'html-2-obj-4',
      code: '2.4',
      title: 'Accessibility Auditing',
      description: 'Use axe DevTools and Lighthouse to find accessibility issues.',
    },
  ],
  selfCheckItems: [
    {
      id: 'html-2-check-1',
      code: '2.1',
      label: 'Semantic landmarks',
      description: 'Use semantic landmarks appropriately.',
      isRequired: true,
    },
    {
      id: 'html-2-check-2',
      code: '2.2',
      label: 'Image accessibility',
      description: 'Use meaningful alt text and empty alt for decorative images.',
      isRequired: true,
    },
    {
      id: 'html-2-check-3',
      code: '2.3',
      label: 'ARIA attributes',
      description: 'Understand ARIA roles, properties, and states.',
      isRequired: true,
    },
    {
      id: 'html-2-check-4',
      code: '2.4',
      label: 'Accessibility score',
      description: 'Achieve a Lighthouse Accessibility score of 90 or above.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'A screen reader user cannot see your page. What would their experience be of the blog page you built today?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
