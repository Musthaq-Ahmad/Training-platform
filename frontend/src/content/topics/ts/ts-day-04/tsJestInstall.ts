import type { ContentTopic } from '../../../types';

export const tsjestinstallTopics = {
  tsjestinstall: {
    id: 'tsjestinstall',
    heading: 'Dependencies​',
    blocks: [
      {
        type: 'paragraph',
        text: 'You can install ts-jest and dependencies all at once with one of the following commands.',
      },
      {
        type: 'list',
        ordered: false,
        items: ['npm', 'Yarn', 'pnpm', 'Bun'],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'npm install --save-dev jest typescript ts-jest @types/jest',
        },
      },
      {
        type: 'paragraph',
        text: 'tip',
      },
      {
        type: 'paragraph',
        text: 'Tip: If you get an error with the following npm commands such as npx: command not found, you can replace npx XXX with node node_modules/.bin/XXX from the root of your project.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Jest config file​',
      },
      {
        type: 'paragraph',
        text: 'tip',
      },
      {
        type: 'paragraph',
        text: 'For ESM configuration, please see more in details with ESM guide.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Creating​',
      },
      {
        type: 'paragraph',
        text: 'By default, Jest can run without any config files, but it will not compile .ts files. To make it transpile TypeScript with ts-jest, we will need to create a configuration file that will tell Jest to use a ts-jest preset.',
      },
      {
        type: 'paragraph',
        text: 'ts-jest can create the configuration file for you automatically:',
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
          language: 'typescript',
          code: 'npx ts-jest config:init',
        },
      },
      {
        type: 'paragraph',
        text: 'This will create a basic Jest configuration file which will inform Jest about how to handle .ts files correctly.',
      },
      {
        type: 'paragraph',
        text: 'You can also use the create-jest command (prefixed with either npx or yarn depending on what you\'re using) to have more options related to Jest. However, answer no to the Jest question about whether or not to enable TypeScript. Instead, add the line: preset: "ts-jest" to the jest.config.js file afterwards.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Customizing​',
      },
      {
        type: 'paragraph',
        text: 'For customizing jest, please follow their official guide online.',
      },
      {
        type: 'paragraph',
        text: 'ts-jest specific options can be found here.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
