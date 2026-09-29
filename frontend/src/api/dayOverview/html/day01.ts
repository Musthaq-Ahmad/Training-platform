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
};
