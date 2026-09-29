import type { DayContent } from '@itp/types';

// Tuesday — Web Storage, Browser APIs & Service Workers
export const jsDay07: DayContent = {
  dayId: 'js-day-07',
  courseSlug: 'javascript',
  courseTitle: 'JavaScript',
  dayNumber: 7,
  totalDays: 10,
  title: 'Web Storage, Browser APIs & Service Workers',
  subtitle:
    'Work with browser storage, Clipboard, Notification, and Geolocation APIs. Build offline-first caching with Service Workers and make the portfolio installable as a Progressive Web App.',
  lessonSummary:
    'You will compare localStorage, sessionStorage, and IndexedDB, build browser API features, implement client-side navigation, configure offline caching, and create a PWA with a Web App Manifest.',
  learningObjectives: [
    {
      id: 'lo-1',
      code: '01',
      title: 'Web Storage',
      description: 'Choose correctly between localStorage, sessionStorage, and IndexedDB.',
    },
    {
      id: 'lo-2',
      code: '02',
      title: 'Browser APIs',
      description: 'Use the Clipboard API, Notification API, and Geolocation API.',
    },
    {
      id: 'lo-3',
      code: '03',
      title: 'Service Workers',
      description: 'Register a Service Worker with offline-first caching.',
    },
    {
      id: 'lo-4',
      code: '04',
      title: 'Caching Strategies',
      description: 'Understand cache-first, network-first, and stale-while-revalidate strategies.',
    },
    {
      id: 'lo-5',
      code: '05',
      title: 'Progressive Web Apps',
      description: 'Add a Web App Manifest to make the portfolio installable.',
    },
  ],
  selfCheckItems: [
    {
      id: 'sc-1',
      code: 'SEC 7.1',
      label: 'Storage APIs',
      description:
        'I can choose between localStorage, sessionStorage, and IndexedDB for different scenarios.',
      isRequired: true,
    },
    {
      id: 'sc-2',
      code: 'SEC 7.2',
      label: 'Service Worker',
      description: 'I have a registered Service Worker and offline mode works in DevTools.',
      isRequired: true,
    },
    {
      id: 'sc-3',
      code: 'SEC 7.3',
      label: 'PWA Checks',
      description: 'The portfolio passes PWA checks in Lighthouse.',
      isRequired: true,
    },
    {
      id: 'sc-4',
      code: 'SEC 7.4',
      label: 'Browser APIs',
      description: 'I can use Clipboard, Notification, and Geolocation APIs.',
      isRequired: true,
    },
    {
      id: 'sc-5',
      code: 'SEC 7.5',
      label: 'Caching Strategies',
      description: 'I understand cache-first vs network-first caching strategies.',
      isRequired: true,
    },
  ],
  journalPrompt:
    'What is a Service Worker? Why does it run in a separate thread, and why does that matter for performance? When would you store data in IndexedDB instead of localStorage? Give two specific scenarios. What is one thing you want to look up more deeply tomorrow?',
};
