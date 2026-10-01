import type { ContentTopic } from '../../../types';

export const reacttestinglibraryintroTopics = {
  reacttestinglibraryintro: {
    id: 'reacttestinglibraryintro',
    heading: 'React Testing Library Introduction',
    blocks: [
      {
        type: 'paragraph',
        text: 'React Testing Library builds on top of DOM Testing Library by adding APIs for working with React components.',
      },
      {
        type: 'paragraph',
        text: "To get started with React Testing Library, you'll need to install it together with its peerDependency @testing-library/dom:",
      },
      {
        type: 'list',
        ordered: false,
        items: ['npm', 'Yarn'],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'npm install --save-dev @testing-library/react @testing-library/dom',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'With TypeScript​',
      },
      {
        type: 'paragraph',
        text: 'To get full type coverage, you need to install the types for react and react-dom as well:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['npm', 'Yarn'],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom',
        },
      },
      {
        type: 'paragraph',
        text: "You want to write maintainable tests for your React components. As a part of this goal, you want your tests to avoid including implementation details of your components and rather focus on making your tests give you the confidence for which they are intended. As part of this, you want your testbase to be maintainable in the long run so refactors of your components (changes to implementation but not functionality) don't break your tests and slow you and your team down.",
      },
      {
        type: 'paragraph',
        text: 'The React Testing Library is a very light-weight solution for testing React components. It provides light utility functions on top of react-dom and react-dom/test-utils, in a way that encourages better testing practices. Its primary guiding principle is:',
      },
      {
        type: 'paragraph',
        text: 'So rather than dealing with instances of rendered React components, your tests will work with actual DOM nodes. The utilities this library provides facilitate querying the DOM in the same way the user would. Finding form elements by their label text (just like a user would), finding links and buttons from their text (like a user would). It also exposes a recommended way to find elements by a data-testid as an "escape hatch" for elements where the text content and label do not make sense or is not practical.',
      },
      {
        type: 'paragraph',
        text: 'This library encourages your applications to be more accessible and allows you to get your tests closer to using your components the way a user will, which allows your tests to give you more confidence that your application will work when a real user uses it.',
      },
      {
        type: 'paragraph',
        text: 'This library is a replacement for Enzyme. While you can follow these guidelines using Enzyme itself, enforcing this is harder because of all the extra utilities that Enzyme provides (utilities which facilitate testing implementation details). Read more about this in the FAQ.',
      },
      {
        type: 'paragraph',
        text: 'What this library is not:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'A test runner or framework',
          'Specific to a testing framework (though we recommend Jest as our preference, the library works with any framework. See Using Without Jest)',
        ],
      },
      {
        type: 'paragraph',
        text: 'Have a look at the "What is React Testing library?" video below for an introduction to the library.',
      },
      {
        type: 'paragraph',
        text: "Also, don't miss this tutorial for React Testing Library.",
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
