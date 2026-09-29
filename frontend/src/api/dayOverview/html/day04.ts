import type { DayContent } from '@itp/types';

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
};
