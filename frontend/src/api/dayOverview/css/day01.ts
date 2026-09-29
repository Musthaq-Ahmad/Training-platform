import type { DayContent } from '@itp/types';

export const cssDay01: DayContent = {
  dayId: 'css-day-01',
  courseSlug: 'css',
  courseTitle: 'CSS',
  dayNumber: 1,
  totalDays: 5,
  title: 'Selectors, Box Model, Colours & Typography',
  subtitle: 'Build a reusable CSS design system.',
  lessonSummary:
    'Create a design system with CSS variables, typography, colours, and box model rules, then apply it to the home page.',
  learningObjectives: [
    {
      id: 'css-1-obj-1',
      code: '1.1',
      title: 'CSS Selectors',
      description: 'Understand selectors, specificity, and cascade.',
    },
    {
      id: 'css-1-obj-2',
      code: '1.2',
      title: 'Box Model',
      description: 'Explain content-box, border-box, padding, border, and margin.',
    },
    {
      id: 'css-1-obj-3',
      code: '1.3',
      title: 'Custom Properties',
      description: 'Define and use CSS variables with fallback values.',
    },
    {
      id: 'css-1-obj-4',
      code: '1.4',
      title: 'Typography',
      description: 'Create a typography scale using rem units.',
    },
  ],
  selfCheckItems: [
    {
      id: 'css-1-check-1',
      code: '1.1',
      label: 'Specificity',
      description: 'Predict the winning rule in a specificity conflict.',
      isRequired: true,
    },
    {
      id: 'css-1-check-2',
      code: '1.2',
      label: 'Box sizing',
      description: 'Understand content-box and border-box.',
      isRequired: true,
    },
    {
      id: 'css-1-check-3',
      code: '1.3',
      label: 'CSS variables',
      description: 'Define and use custom properties.',
      isRequired: true,
    },
    {
      id: 'css-1-check-4',
      code: '1.4',
      label: 'Typography scale',
      description: 'Set up a type scale using rem units.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'Why is box-sizing: border-box almost always the better choice? When would you not use it?',
};
