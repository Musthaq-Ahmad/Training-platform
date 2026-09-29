import type { DayContent } from '@itp/types';

export const reactDay03: DayContent = {
  dayId: 'react-day-03',
  courseSlug: 'react',
  courseTitle: 'React',
  dayNumber: 3,
  totalDays: 10,
  title: 'State and Events',
  subtitle: 'Make the issue screen interactive.',
  lessonSummary:
    'Use React state and events to add search, filters, sorting, issue creation, and clear-filters functionality. Use controlled inputs, calculate filtered results from state, update arrays immutably, and avoid storing filtered arrays as duplicate state.',
  learningObjectives: [
    {
      id: 'react-day-03-lo-01',
      code: 'LO1',
      title: 'Manage state and events',
      description: 'Use useState and event handlers to make the issue screen interactive.',
    },
    {
      id: 'react-day-03-lo-02',
      code: 'LO2',
      title: 'Derive filtered data from state',
      description: 'Use controlled inputs and calculate filtered and sorted results from state.',
    },
    {
      id: 'react-day-03-lo-03',
      code: 'LO3',
      title: 'Update data immutably',
      description:
        'Implement issue creation and clear-filters functionality while updating arrays immutably.',
    },
  ],
  selfCheckItems: [
    {
      id: 'react-day-03-sc-01',
      code: 'SC1',
      label: 'Use state and controlled inputs',
      description: 'I can use useState and controlled inputs to manage search and filter values.',
      isRequired: true,
    },
    {
      id: 'react-day-03-sc-02',
      code: 'SC2',
      label: 'Implement search, filters, and sorting',
      description: 'I can derive filtered and sorted issue data from state without duplicating it.',
      isRequired: true,
    },
    {
      id: 'react-day-03-sc-03',
      code: 'SC3',
      label: 'Add issues immutably',
      description: 'I can create issues, clear filters, and update arrays without mutating data.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'How did you make the issue screen interactive? Reflect on state design, controlled inputs, derived filtered data, immutable updates, and the interactions you tested.',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
