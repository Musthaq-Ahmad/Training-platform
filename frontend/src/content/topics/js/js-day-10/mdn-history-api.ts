import type { ContentTopic } from '../../../types';

export const mdnHistoryApiTopics = {
  'mdn-history-api': {
    id: 'mdn-history-api',
    heading: 'Concepts and usage',
    blocks: [
      {
        type: 'paragraph',
        text: "Moving backward and forward through the user's history is done using the back(), forward(), and go() methods.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Moving forward and backward',
      },
      {
        type: 'paragraph',
        text: 'To move backward through history:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'history.back();',
        },
      },
      {
        type: 'paragraph',
        text: 'This acts exactly as if the user clicked on the Back button in their browser toolbar.',
      },
      {
        type: 'paragraph',
        text: 'Similarly, you can move forward (as if the user clicked the Forward button), like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'history.forward();',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Moving to a specific point in history',
      },
      {
        type: 'paragraph',
        text: "You can use the go() method to load a specific page from session history, identified by its relative position to the current page. (The current page's relative position is 0.)",
      },
      {
        type: 'paragraph',
        text: 'To move back one page (the equivalent of calling back()):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'history.go(-1);',
        },
      },
      {
        type: 'paragraph',
        text: 'To move forward a page, just like calling forward():',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'history.go(1);',
        },
      },
      {
        type: 'paragraph',
        text: 'Similarly, you can move forward 2 pages by passing 2, and so forth.',
      },
      {
        type: 'paragraph',
        text: 'Another use for the go() method is to refresh the current page by either passing 0, or by invoking it without an argument:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// The following statements\n// both have the effect of\n// refreshing the page\nhistory.go(0);\nhistory.go();',
        },
      },
      {
        type: 'paragraph',
        text: 'You can determine the number of pages in the history stack by looking at the value of the length property:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const numberOfEntries = history.length;',
        },
      },
      {
        type: 'paragraph',
        text: 'History',
      },
      {
        type: 'paragraph',
        text: 'Allows manipulation of the browser session history (that is, the pages visited in the tab or frame that the current page is loaded in).',
      },
      {
        type: 'paragraph',
        text: 'PopStateEvent',
      },
      {
        type: 'paragraph',
        text: 'The interface of the popstate event.',
      },
      {
        type: 'paragraph',
        text: 'The following example assigns a listener for the popstate event. It then illustrates some of the methods of the history object to add, replace, and move within the browser history for the current tab.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'window.addEventListener("popstate", (event) => {\n  alert(\n    `location: ${document.location}, state: ${JSON.stringify(event.state)}`,\n  );\n});\n\nhistory.pushState({ page: 1 }, "title 1", "?page=1");\nhistory.pushState({ page: 2 }, "title 2", "?page=2");\nhistory.replaceState({ page: 3 }, "title 3", "?page=3");\nhistory.back(); // alerts "location: http://example.com/example.html?page=1, state: {"page":1}"\nhistory.back(); // alerts "location: http://example.com/example.html, state: null"\nhistory.go(2); // alerts "location: http://example.com/example.html?page=3, state: {"page":3}"',
        },
      },
      {
        type: 'table',
        headers: ['Specification'],
        rows: [
          ['[HTML'],
          [
            '# the-history-interface](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-history-interface)',
          ],
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: ['history global object', 'popstate event'],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
