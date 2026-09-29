import type { DayContent } from '@itp/types';

export const reactDay04: DayContent = {
  dayId: 'react-day-04',
  courseSlug: 'react',
  courseTitle: 'React',
  dayNumber: 4,
  totalDays: 10,
  title: 'Forms and Validation',
  subtitle: 'Build an accessible issue form.',
  lessonSummary:
    'Build create and edit issue forms with controlled fields, validation, and submit states. Include title, description, project, assignee, priority, status, due date, and labels. Add an error summary, disabled submitting state, cancel confirmation, and keyboard-accessible interactions.',
  learningObjectives: [
    {
      id: 'react-day-04-lo-01',
      code: 'LO1',
      title: 'Build controlled forms',
      description: 'Create controlled form fields for issue creation and editing.',
    },
    {
      id: 'react-day-04-lo-02',
      code: 'LO2',
      title: 'Validate form inputs',
      description:
        'Validate fields on submit and at field level, associate labels and errors, and prevent invalid submissions.',
    },
    {
      id: 'react-day-04-lo-03',
      code: 'LO3',
      title: 'Handle submit and cancel states',
      description:
        'Implement error summaries, disabled submitting states, unsaved-change handling, and keyboard-accessible forms.',
    },
  ],
  selfCheckItems: [
    {
      id: 'react-day-04-sc-01',
      code: 'SC1',
      label: 'Build controlled issue forms',
      description: 'I can build create and edit forms with all required issue fields.',
      isRequired: true,
    },
    {
      id: 'react-day-04-sc-02',
      code: 'SC2',
      label: 'Implement accessible validation',
      description:
        'I can validate fields, associate labels and errors, and prevent invalid form submission.',
      isRequired: true,
    },
    {
      id: 'react-day-04-sc-03',
      code: 'SC3',
      label: 'Handle form submission and cancellation',
      description:
        'I can implement error summaries, submitting states, cancel confirmation, and keyboard testing.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What challenges did you face while building the issue forms? Reflect on controlled fields, validation, accessible error messages, submit states, and unsaved-change handling.',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
