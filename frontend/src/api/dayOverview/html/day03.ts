import type { DayContent } from '@itp/types';

export const htmlDay03: DayContent = {
  dayId: 'html-day-03',
  courseSlug: 'html',
  courseTitle: 'HTML',
  dayNumber: 3,
  totalDays: 5,
  title: 'HTML Forms - Every Input Type & Validation',
  subtitle: 'Create accessible forms with native HTML validation.',
  lessonSummary:
    'Build login, registration, checkout, and application forms using input types, labels, fieldsets, and validation attributes.',
  learningObjectives: [
    {
      id: 'html-3-obj-1',
      code: '3.1',
      title: 'Input Types',
      description: 'Use HTML5 input types with appropriate attributes.',
    },
    {
      id: 'html-3-obj-2',
      code: '3.2',
      title: 'Accessible Labels',
      description: 'Associate form controls with labels using for and id.',
    },
    {
      id: 'html-3-obj-3',
      code: '3.3',
      title: 'Form Grouping',
      description: 'Group related controls using fieldset and legend.',
    },
    {
      id: 'html-3-obj-4',
      code: '3.4',
      title: 'Native Validation',
      description: 'Use required, pattern, min, max, minlength, and maxlength.',
    },
  ],
  selfCheckItems: [
    {
      id: 'html-3-check-1',
      code: '3.1',
      label: 'Input types',
      description: 'Use HTML5 input types correctly.',
      isRequired: true,
    },
    {
      id: 'html-3-check-2',
      code: '3.2',
      label: 'Form labels',
      description: 'Associate every form control with a programmatic label.',
      isRequired: true,
    },
    {
      id: 'html-3-check-3',
      code: '3.3',
      label: 'Fieldsets and legends',
      description: 'Group related fields accessibly.',
      isRequired: true,
    },
    {
      id: 'html-3-check-4',
      code: '3.4',
      label: 'Validation attributes',
      description: 'Use native validation attributes correctly.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'Why is using a placeholder as the only label for an input an accessibility problem?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
