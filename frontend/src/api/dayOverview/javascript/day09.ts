import type { DayContent } from '@itp/types';

// Thursday — Advanced DOM, Canvas & Performance Optimisation
export const jsDay09: DayContent = {
  dayId: 'js-day-09',
  courseSlug: 'javascript',
  courseTitle: 'JavaScript',
  dayNumber: 9,
  totalDays: 10,
  title: 'Advanced DOM, Canvas & Performance Optimisation',
  subtitle:
    'Optimise DOM rendering, build smooth animations with requestAnimationFrame, implement virtual scrolling, and use Canvas and Web Workers to improve application performance.',
  lessonSummary:
    'You will diagnose layout thrashing, build virtual scrolling for 10,000 items, create animated Canvas charts, use Web Workers for expensive computation, and measure performance improvements with DevTools and Lighthouse.',
  learningObjectives: [
    {
      id: 'lo-1',
      code: '01',
      title: 'Layout Optimisation',
      description: 'Identify layout thrashing and fix it by batching DOM reads and writes.',
    },
    {
      id: 'lo-2',
      code: '02',
      title: 'Virtual Scrolling',
      description: 'Implement virtual scrolling running above 50fps for 10,000 items.',
    },
    {
      id: 'lo-3',
      code: '03',
      title: 'Smooth Animations',
      description: 'Use requestAnimationFrame for smooth 60fps animations.',
    },
    {
      id: 'lo-4',
      code: '04',
      title: 'Performance Measurement',
      description: 'Measure performance before and after using the DevTools Performance panel.',
    },
    {
      id: 'lo-5',
      code: '05',
      title: 'Web Workers',
      description: 'Use Web Workers to keep the UI responsive during expensive computation.',
    },
  ],
  selfCheckItems: [
    {
      id: 'sc-1',
      code: 'SEC 9.1',
      label: 'Layout Thrashing',
      description: 'I can identify layout thrashing in DevTools and fix it.',
      isRequired: true,
    },
    {
      id: 'sc-2',
      code: 'SEC 9.2',
      label: 'Virtual Scrolling',
      description: 'I have implemented virtual scrolling for 10,000 items above 50fps.',
      isRequired: true,
    },
    {
      id: 'sc-3',
      code: 'SEC 9.3',
      label: 'Animations',
      description: 'I can build smooth requestAnimationFrame animations with easing functions.',
      isRequired: true,
    },
    {
      id: 'sc-4',
      code: 'SEC 9.4',
      label: 'Web Workers',
      description: 'I have used a Web Worker and kept the UI responsive.',
      isRequired: true,
    },
    {
      id: 'sc-5',
      code: 'SEC 9.5',
      label: 'Performance Optimisation',
      description:
        "My portfolio's Lighthouse Performance score improved after the optimisation pass.",
      isRequired: true,
    },
  ],
  journalPrompt:
    'What is layout thrashing and what specifically causes it? Draw the browser rendering pipeline. When should you use a Web Worker? What are its limitations? What is one thing you want to look up more deeply tomorrow?',
  journalResponse: null,
  isLocked: false,
  isCompleted: false,
};
