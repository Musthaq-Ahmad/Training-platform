import type { DayContent } from '@itp/types';

export const reactDay05: DayContent = {
  dayId: 'react-day-05',
  courseSlug: 'react',
  courseTitle: 'React',
  dayNumber: 5,
  totalDays: 10,
  title: 'React Assessment',
  subtitle: 'Demonstrate React fundamentals independently.',
  lessonSummary:
    'Build an Employee Leave Request interface from a supplied design. Implement the request list, filters, form, balance summary, and loading, empty, and error states. Apply component design, state management, TypeScript, accessibility, and responsive behaviour.',
  learningObjectives: [
    {
      id: 'react-day-05-lo-01',
      code: 'LO1',
      title: 'Apply React fundamentals independently',
      description:
        'Use component design, state, TypeScript, and accessibility to build the assessment interface.',
    },
    {
      id: 'react-day-05-lo-02',
      code: 'LO2',
      title: 'Implement common UI states',
      description:
        'Build the request list, filters, form, balance summary, loading, empty, and error states.',
    },
    {
      id: 'react-day-05-lo-03',
      code: 'LO3',
      title: 'Deliver a responsive interface',
      description:
        'Analyse the supplied design and implement a responsive interface that reasonably matches it.',
    },
  ],
  selfCheckItems: [
    {
      id: 'react-day-05-sc-01',
      code: 'SC1',
      label: 'Analyse the supplied design',
      description: 'I can analyse the Leave Request design and create a component plan.',
      isRequired: true,
    },
    {
      id: 'react-day-05-sc-02',
      code: 'SC2',
      label: 'Implement the interface and states',
      description:
        'I can build the request list, filters, form, balance summary, and loading, empty, and error states.',
      isRequired: true,
    },
    {
      id: 'react-day-05-sc-03',
      code: 'SC3',
      label: 'Test and polish the responsive interface',
      description:
        'I can add state and validation, test the interface, and verify responsive behaviour.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'Reflect on your Employee Leave Request assessment. How did you plan the components, implement state and validation, handle UI states, and ensure the interface was responsive and accessible?',
  journalResponse: null,
  isLocked: true,
  isCompleted: false,
};
