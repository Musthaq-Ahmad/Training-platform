import type { DayContent } from '@itp/types';

export const htmlDay01: DayContent = {
  dayId: 'html-day-01',
  courseSlug: 'html',
  courseTitle: 'HTML',
  dayNumber: 1,
  totalDays: 5,
  title: 'HTML5 Document Structure & Text Elements',
  subtitle: 'Build valid HTML pages using semantic text elements.',
  lessonSummary:
    'Create a personal profile, recipe page, and news article using HTML5 structure, text elements, and lists.',
  learningObjectives: [
    {
      id: 'html-1-obj-1',
      code: '1.1',
      title: 'HTML5 Boilerplate',
      description: 'Write a valid HTML5 document structure.',
    },
    {
      id: 'html-1-obj-2',
      code: '1.2',
      title: 'Text Elements',
      description: 'Use headings, paragraphs, and semantic text elements.',
    },
    {
      id: 'html-1-obj-3',
      code: '1.3',
      title: 'Lists and Links',
      description: 'Create ordered, unordered, and definition lists with links.',
    },
    {
      id: 'html-1-obj-4',
      code: '1.4',
      title: 'HTML Validation',
      description: 'Validate pages and fix HTML errors.',
    },
  ],
  selfCheckItems: [
    {
      id: 'html-1-check-1',
      code: '1.1',
      label: 'HTML5 structure',
      description: 'Write a valid HTML5 boilerplate from memory.',
      isRequired: true,
    },
    {
      id: 'html-1-check-2',
      code: '1.2',
      label: 'Semantic text',
      description: 'Use text elements according to their meaning.',
      isRequired: true,
    },
    {
      id: 'html-1-check-3',
      code: '1.3',
      label: 'Heading hierarchy',
      description: 'Use headings in the correct hierarchy.',
      isRequired: true,
    },
    {
      id: 'html-1-check-4',
      code: '1.4',
      label: 'Validation',
      description: 'Validate all pages with zero errors.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'Which text element surprised you most today? Why does its semantic meaning matter?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};

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

export const htmlDay04: DayContent = {
  dayId: 'html-day-04',
  courseSlug: 'html',
  courseTitle: 'HTML',
  dayNumber: 4,
  totalDays: 5,
  title: 'Tables, Media, Embeds & Metadata',
  subtitle: 'Work with structured data, responsive images, and embedded media.',
  lessonSummary:
    'Build accessible tables, audio and video pages, responsive image galleries, and pages with social sharing metadata.',
  learningObjectives: [
    {
      id: 'html-4-obj-1',
      code: '4.1',
      title: 'Data Tables',
      description: 'Build tables using thead, tbody, tfoot, colspan, and rowspan.',
    },
    {
      id: 'html-4-obj-2',
      code: '4.2',
      title: 'Media Elements',
      description: 'Embed audio and video with controls and captions.',
    },
    {
      id: 'html-4-obj-3',
      code: '4.3',
      title: 'Responsive Images',
      description: 'Use srcset, sizes, and picture for responsive images.',
    },
    {
      id: 'html-4-obj-4',
      code: '4.4',
      title: 'Metadata',
      description: 'Write Open Graph and Twitter Card metadata.',
    },
  ],
  selfCheckItems: [
    {
      id: 'html-4-check-1',
      code: '4.1',
      label: 'Accessible tables',
      description: 'Use table sections and spanning attributes correctly.',
      isRequired: true,
    },
    {
      id: 'html-4-check-2',
      code: '4.2',
      label: 'Audio and video',
      description: 'Embed media with controls and caption tracks.',
      isRequired: true,
    },
    {
      id: 'html-4-check-3',
      code: '4.3',
      label: 'Responsive images',
      description: 'Use srcset, sizes, and picture correctly.',
      isRequired: true,
    },
    {
      id: 'html-4-check-4',
      code: '4.4',
      label: 'Metadata',
      description: 'Add complete Open Graph and Twitter Card metadata.',
      isRequired: true,
    },
  ],
  journalPrompt: 'Why do responsive images matter for performance, not just design?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
