export type HelpTopicId =
  'days' | 'tasks' | 'sql' | 'typing' | 'journal' | 'progress' | 'troubleshooting';

export type HelpQuestion = {
  /** Also used as the element id, so `/help#day-locked` opens this answer. */
  id: string;
  question: string;
  answer: string;
};

export type HelpTopic = {
  id: HelpTopicId;
  title: string;
  summary: string;
  questions: HelpQuestion[];
};

export type DayFlowStep = {
  title: string;
  text: string;
};

export const DAY_FLOW_STEPS: DayFlowStep[] = [
  { title: 'Open a day', text: 'Pick the next unlocked day on the dashboard.' },
  { title: 'Learn', text: 'Read the day overview and its references.' },
  { title: 'Do the tasks', text: 'Write and save your work in the editor.' },
  { title: 'Submit Day', text: 'Available once every required task is submitted.' },
  { title: 'Continue', text: 'Submitting unlocks the next day.' },
];

export const HELP_TOPICS: HelpTopic[] = [
  {
    id: 'days',
    title: 'Courses & Days',
    summary: 'How days unlock and what counts as done.',
    questions: [
      {
        id: 'day-unlock',
        question: 'How does the next day unlock?',
        answer:
          'The next day unlocks when you submit the current one. Open the day, submit every required task, then press Submit Day. Stretch tasks never block you.',
      },
      {
        id: 'day-locked',
        question: 'Why is my day locked?',
        answer:
          "Days open in order. A day stays locked until you have submitted the day before it. This is checked on the server, so reloading the page or opening the link directly won't open it. Finish and submit the previous day first.",
      },
      {
        id: 'required-vs-stretch',
        question: "What's the difference between required and stretch tasks?",
        answer:
          'Required tasks must be submitted before you can submit the day. Stretch tasks are extra practice: you can skip them or do them later, and they never stop you from moving on.',
      },
      {
        id: 'submit-day-refused',
        question: 'Submit Day says I still have tasks left. What now?',
        answer:
          "Submit Day is refused while any required task isn't submitted, and the message tells you how many are left. Open each unfinished required task, submit it, then try Submit Day again.",
      },
    ],
  },
  {
    id: 'tasks',
    title: 'Tasks & Editor',
    summary: 'Saving, pasting and resubmitting your code.',
    questions: [
      {
        id: 'autosave',
        question: 'Does my code save automatically?',
        answer:
          'Yes. Your code saves about 2 seconds after you stop typing, and at least every 8 seconds while you keep typing. If you go offline it waits and saves again when you are back. Check the save indicator before leaving a task.',
      },
      {
        id: 'no-paste',
        question: "Why can't I paste into the editor?",
        answer:
          'Pasting and drag-and-drop are blocked in the editor and the terminal on purpose, so you type what you learn. Type the code yourself.',
      },
      {
        id: 'edit-after-submit',
        question: 'Can I change a task after I submit it?',
        answer:
          'Yes. Task files stay editable even after you submit them or complete the day, and you can submit again whenever you like.',
      },
    ],
  },
  {
    id: 'typing',
    title: 'Typing Test',
    summary: 'What it measures and where results show up.',
    questions: [
      {
        id: 'typing-measures',
        question: 'What does the typing test measure?',
        answer:
          'Your typing speed in words per minute and your accuracy. You type the passage shown on screen, and the result is saved when you finish.',
      },
      {
        id: 'typing-results',
        question: 'Where can I see my typing results?',
        answer:
          'Past results are listed on the Typing Test page, and your daily average speed  appear on your Profile.',
      },
    ],
  },
  {
    id: 'journal',
    title: 'Journal',
    summary: 'The short daily reflection.',
    questions: [
      {
        id: 'journal-what',
        question: 'What is the daily journal?',
        answer:
          "A place to write a short reflection for the day, on that day's overview page. Your entry is saved with the day, so you can come back to it later.",
      },
      {
        id: 'journal-limit',
        question: 'Is there a length limit for journal entries?',
        answer:
          'Yes, entries have a character limit. If a save is rejected, shorten the entry and save again.',
      },
    ],
  },
  {
    id: 'progress',
    title: 'Progress & Activity',
    summary: 'Time tracking, fullscreen and focus events.',
    questions: [
      {
        id: 'where-progress',
        question: 'Where can I see my progress?',
        answer:
          'The dashboard shows which days are locked, unlocked or completed. Your Profile shows your time and typing statistics.',
      },
      {
        id: 'active-vs-coding',
        question: 'What are active time and coding time?',
        answer:
          'Active time is the time you spend on the platform. Coding time is the time you spend working in the editor. Both are counted per calendar day and shown on your Profile.',
      },
      {
        id: 'focus-events',
        question: 'Do tab switches or leaving fullscreen count against me?',
        answer:
          'No. Leaving fullscreen, switching tabs and clicking away from the window are recorded with how long they lasted, and you see a warning, but they never reduce your progress. They are recorded for mentors.',
      },
      {
        id: 'why-fullscreen',
        question: 'Why does the app keep asking for fullscreen?',
        answer:
          'The platform only works in fullscreen. If you exit, the app asks you to go back before you can continue.',
      },
    ],
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    summary: 'Fixes for the most common problems.',
    questions: [
      {
        id: 'code-not-saved',
        question: "My code didn't save",
        answer:
          "Look at the save indicator. If it shows an error or you are offline, keep the tab open: it retries on its own once your connection is back. Don't close the tab until it shows Saved.",
      },
      {
        id: 'page-error',
        question: 'A page shows an error or keeps loading',
        answer:
          'Use the Retry button if there is one, otherwise refresh the page. If it keeps happening, check your internet connection.',
      },
      {
        id: 'signed-out',
        question: 'I was signed out suddenly',
        answer:
          'Your sign-in lasts 7 days. After that, or if your session becomes invalid, you are signed out and need to sign in again. Anything that had already saved is kept.',
      },
    ],
  },
];
