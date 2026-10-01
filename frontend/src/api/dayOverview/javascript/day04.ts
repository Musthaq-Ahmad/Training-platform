import type { DayContent } from '@itp/types';

export const jsDay04: DayContent = {
  dayId: 'js-day-04',
  courseSlug: 'js',
  courseTitle: 'JavaScript',
  dayNumber: 4,
  totalDays: 10,
  title: 'Async JavaScript: Promises, Fetch & Async/Await',
  subtitle:
    'Understand the event loop, Promises, fetch, and async/await, then use them to build a weather widget, GitHub profile viewer, and infinite scroll feed with proper loading and error states.',
  lessonSummary:
    'You will build a live weather widget, GitHub profile viewer, and infinite scroll blog feed, all on the portfolio site.',
  learningObjectives: [
    {
      id: 'lo-1',
      code: '01',
      title: 'Event Loop Order',
      description:
        'Predict console output order of code mixing setTimeout, Promise.resolve, and synchronous calls.',
    },
    {
      id: 'lo-2',
      code: '02',
      title: 'Fetch Error Handling',
      description: 'Use fetch with correct error handling - checking response.ok, not just catch.',
    },
    {
      id: 'lo-3',
      code: '03',
      title: 'Parallel Async with Promise.all',
      description: 'Run async operations in parallel with Promise.all.',
    },
    {
      id: 'lo-4',
      code: '04',
      title: 'Request Cancellation',
      description: 'Implement debouncing and request cancellation with AbortController.',
    },
    {
      id: 'lo-5',
      code: '05',
      title: 'Loading & Error States',
      description: 'Show loading and error states for every async operation in the UI.',
    },
  ],
  selfCheckItems: [
    {
      id: 'sc-1',
      code: 'SEC 4.1',
      label: 'Event Loop Order',
      description:
        'I can predict output order of code mixing setTimeout, Promise.resolve, and synchronous calls.',
      isRequired: true,
    },
    {
      id: 'sc-2',
      code: 'SEC 4.2',
      label: 'Checking response.ok',
      description: 'I check response.ok in every fetch - not just catch.',
      isRequired: true,
    },
    {
      id: 'sc-3',
      code: 'SEC 4.3',
      label: 'Parallel Requests',
      description:
        'I can run async operations in parallel with Promise.all and time the difference.',
      isRequired: true,
    },
    {
      id: 'sc-4',
      code: 'SEC 4.4',
      label: 'Request Cancellation',
      description: 'I have implemented AbortController for request cancellation.',
      isRequired: true,
    },
    {
      id: 'sc-5',
      code: 'SEC 4.5',
      label: 'Loading & Error States',
      description: 'Every async operation on my site shows a loading state and an error state.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What is the microtask queue, how is it different from the task queue, and why do Promise callbacks run before setTimeout callbacks? When should you use Promise.all vs sequential awaits? Write a real example of each.',
};
