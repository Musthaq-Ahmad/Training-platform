import type { ContentTopic } from '../../../types';

export const reacttestinglibrarysetupTopics = {
  reacttestinglibrarysetup: {
    id: 'reacttestinglibrarysetup',
    heading: 'React Testing Library Setup',
    blocks: [
      {
        type: 'paragraph',
        text: "React Testing Library does not require any configuration to be used. However, there are some things you can do when configuring your testing framework to reduce some boilerplate. In these docs we'll demonstrate configuring Jest, but you should be able to do similar things with any testing framework (React Testing Library does not require that you use Jest).",
      },
      {
        type: 'paragraph',
        text: 'Adding options to your global test config can simplify the setup and teardown of tests in individual files.',
      },
      {
        type: 'paragraph',
        text: "It's often useful to define a custom render method that includes things like global context providers, data stores, etc. To make this available globally, one approach is to define a utility file that re-exports everything from React Testing Library. You can replace React Testing Library with this file in all your imports. See below for a way to make your test util file accessible without using relative paths.",
      },
      {
        type: 'paragraph',
        text: 'The example below sets up data providers using the wrapper option to render.',
      },
      {
        type: 'list',
        ordered: false,
        items: ['JavaScript', 'TypeScript'],
      },
      {
        type: 'paragraph',
        text: 'my-component.test.jsx',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: " import { render, fireEvent } from '@testing-library/react';\n\n import { render, fireEvent } from '../test-utils';",
        },
      },
      {
        type: 'paragraph',
        text: 'test-utils.jsx',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import React from 'react'\nimport {render} from '@testing-library/react'\nimport {ThemeProvider} from 'my-ui-lib'\nimport {TranslationProvider} from 'my-i18n-lib'\nimport defaultStrings from 'i18n/en-x-default'\n\nconst AllTheProviders = ({children}) => {\n  return (\n    <ThemeProvider theme=\"light\">\n      <TranslationProvider messages={defaultStrings}>\n        {children}\n      </TranslationProvider>\n    </ThemeProvider>\n  )\n}\n\nconst customRender = (ui, options) =>\n  render(ui, {wrapper: AllTheProviders, ...options})\n\n// re-export everything\nexport * from '@testing-library/react'\n\n// override render method\nexport {customRender as render}",
        },
      },
      {
        type: 'paragraph',
        text: 'Workaround for Babel 6',
      },
      {
        type: 'paragraph',
        text: 'You can use CommonJS modules instead of ES modules, which should work in Node:',
      },
      {
        type: 'paragraph',
        text: 'test-utils.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "const rtl = require('@testing-library/react')\n\nconst customRender = (ui, options) =>\n  rtl.render(ui, {\n    myDefaultOption: 'something',\n    ...options,\n  })\n\nmodule.exports = {\n  ...rtl,\n  render: customRender,\n}",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Add custom queries​',
      },
      {
        type: 'paragraph',
        text: 'You can define your own custom queries as described in the Custom Queries documentation, or via the buildQueries helper. Then you can use them in any render call using the queries option. To make the custom queries available globally, you can add them to your custom render method as shown below.',
      },
      {
        type: 'paragraph',
        text: 'In the example below, a new set of query variants are created for getting elements by data-cy, a "test ID" convention mentioned in the Cypress.io documentation.',
      },
      {
        type: 'list',
        ordered: false,
        items: ['JavaScript', 'TypeScript'],
      },
      {
        type: 'paragraph',
        text: 'custom-queries.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import {queryHelpers, buildQueries} from '@testing-library/react'\n\n// The queryAllByAttribute is a shortcut for attribute-based matchers\n// You can also use document.querySelector or a combination of existing\n// testing library utilities to find matching nodes for your query\nconst queryAllByDataCy = (...args) =>\n  queryHelpers.queryAllByAttribute('data-cy', ...args)\n\nconst getMultipleError = (c, dataCyValue) =>\n  `Found multiple elements with the data-cy attribute of: ${dataCyValue}`\nconst getMissingError = (c, dataCyValue) =>\n  `Unable to find an element with the data-cy attribute of: ${dataCyValue}`\n\nconst [\n  queryByDataCy,\n  getAllByDataCy,\n  getByDataCy,\n  findAllByDataCy,\n  findByDataCy,\n] = buildQueries(queryAllByDataCy, getMultipleError, getMissingError)\n\nexport {\n  queryByDataCy,\n  queryAllByDataCy,\n  getByDataCy,\n  getAllByDataCy,\n  findAllByDataCy,\n  findByDataCy,\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'You can then override and append the new queries via the render function by passing a queries option.',
      },
      {
        type: 'paragraph',
        text: 'If you want to add custom queries globally, you can do this by defining your customized render, screen and within methods:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['JavaScript', 'TypeScript'],
      },
      {
        type: 'paragraph',
        text: 'test-utils.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import {render, queries, within} from '@testing-library/react'\nimport * as customQueries from './custom-queries'\n\nconst allQueries = {\n  ...queries,\n  ...customQueries,\n}\n\nconst customScreen = within(document.body, allQueries)\nconst customWithin = element => within(element, allQueries)\nconst customRender = (ui, options) =>\n  render(ui, {queries: allQueries, ...options})\n\n// re-export everything\nexport * from '@testing-library/react'\n\n// override render method\nexport {customScreen as screen, customWithin as within, customRender as render}",
        },
      },
      {
        type: 'paragraph',
        text: 'You can then use your custom queries as you would any other query:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "const {getByDataCy} = render(<Component />)\n\nexpect(getByDataCy('my-component')).toHaveTextContent('Hello')",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Configuring Jest with Test Utils​',
      },
      {
        type: 'paragraph',
        text: 'To make your custom test file accessible in your Jest test files without using relative imports (../../test-utils), add the folder containing the file to the Jest moduleDirectories option.',
      },
      {
        type: 'paragraph',
        text: 'This will make all the .js files in the test-utils directory importable without ../.',
      },
      {
        type: 'paragraph',
        text: 'my-component.test.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: " import { render, fireEvent } from '../test-utils';\n\n import { render, fireEvent } from 'test-utils';",
        },
      },
      {
        type: 'paragraph',
        text: 'jest.config.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: " moduleDirectories: [\n\n   'node_modules',\n\n   // add the directory with the test-utils.js file, for example:\n\n   'utils', // a utility folder\n\n    __dirname, // the root directory\n\n ],\n\n // ... other options ...",
        },
      },
      {
        type: 'paragraph',
        text: "If you're using TypeScript, merge this into your tsconfig.json. If you're using Create React App without TypeScript, save this to jsconfig.json instead.",
      },
      {
        type: 'paragraph',
        text: 'tsconfig.json',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '{\n  "compilerOptions": {\n    "baseUrl": "src",\n    "paths": {\n      "test-utils": ["./utils/test-utils"]\n    }\n  }\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Jest 28​',
      },
      {
        type: 'paragraph',
        text: "If you're using Jest 28 or later, jest-environment-jsdom package now must be installed separately.",
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
          code: 'npm install --save-dev jest-environment-jsdom',
        },
      },
      {
        type: 'paragraph',
        text: 'jsdom is also no longer the default environment. You can enable jsdom globally by editing jest.config.js:',
      },
      {
        type: 'paragraph',
        text: 'jest.config.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "module.exports = {\n\n  testEnvironment: 'jsdom',\n\n  // ... other options ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Or if you only need jsdom in some of your tests, you can enable it as and when needed using docblocks:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '/**\n * @jest-environment jsdom\n */',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Jest 27​',
      },
      {
        type: 'paragraph',
        text: "If you're using a recent version of Jest (27), jsdom is no longer the default environment. You can enable jsdom globally by editing jest.config.js:",
      },
      {
        type: 'paragraph',
        text: 'jest.config.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "module.exports = {\n\n  testEnvironment: 'jest-environment-jsdom',\n\n  // ... other options ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: 'Or if you only need jsdom in some of your tests, you can enable it as and when needed using docblocks:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '/**\n * @jest-environment jsdom\n */',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Jest 24 (or lower) and defaults​',
      },
      {
        type: 'paragraph',
        text: "If you're using the Jest testing framework version 24 or lower with the default configuration, it's recommended to use jest-environment-jsdom-fifteen package as Jest uses a version of the jsdom environment that misses some features and fixes, required by React Testing Library.",
      },
      {
        type: 'paragraph',
        text: 'First, install jest-environment-jsdom-fifteen.',
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
          code: 'npm install --save-dev jest-environment-jsdom-fifteen',
        },
      },
      {
        type: 'paragraph',
        text: 'Then specify jest-environment-jsdom-fifteen as the testEnvironment:',
      },
      {
        type: 'paragraph',
        text: 'jest.config.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "module.exports = {\n\n  testEnvironment: 'jest-environment-jsdom-fifteen',\n\n  // ... other options ...\n\n}",
        },
      },
      {
        type: 'paragraph',
        text: "If you're running your tests in the browser bundled with webpack (or similar) then React Testing Library should work out of the box for you. However, most people using React Testing Library are using it with the Jest testing framework with the testEnvironment set to jest-environment-jsdom (which is the default configuration with Jest 26 and earlier).",
      },
      {
        type: 'paragraph',
        text: "jsdom is a pure JavaScript implementation of the DOM and browser APIs that runs in Node. If you're not using Jest and you would like to run your tests in Node, then you must install jsdom yourself. There's also a package called global-jsdom which can be used to setup the global environment to simulate the browser APIs.",
      },
      {
        type: 'paragraph',
        text: 'First, install jsdom and global-jsdom.',
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
          code: 'npm install --save-dev jsdom global-jsdom',
        },
      },
      {
        type: 'paragraph',
        text: 'With mocha, the test command would look something like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'mocha --require global-jsdom/register',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Skipping Auto Cleanup​',
      },
      {
        type: 'paragraph',
        text: "Cleanup is called after each test automatically by default if the testing framework you're using supports the afterEach global (like mocha, Jest, and Jasmine). However, you may choose to skip the auto cleanup by setting the RTL_SKIP_AUTO_CLEANUP env variable to 'true'. You can do this with cross-env like so:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'cross-env RTL_SKIP_AUTO_CLEANUP=true jest',
        },
      },
      {
        type: 'paragraph',
        text: "To make this even easier, you can also simply import @testing-library/react/dont-cleanup-after-each which will do the same thing. Just make sure you do this before importing @testing-library/react. You could do this with Jest's setupFiles configuration:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "{\n  // ... other jest config\n  setupFiles: ['@testing-library/react/dont-cleanup-after-each']\n}",
        },
      },
      {
        type: 'paragraph',
        text: "Or with mocha's -r flag:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'mocha --require @testing-library/react/dont-cleanup-after-each',
        },
      },
      {
        type: 'paragraph',
        text: "Alternatively, you could import @testing-library/react/pure in all your tests that you don't want the cleanup to run and the afterEach won't be setup automatically.",
      },
      {
        type: 'subheading',
        level: 3,
        text: "Auto Cleanup in Mocha's watch mode​",
      },
      {
        type: 'paragraph',
        text: 'When using Mocha in watch mode, the globally registered cleanup is run only the first time after each test. Therefore, subsequent runs will most likely fail with a TestingLibraryElementError: Found multiple elements error.',
      },
      {
        type: 'paragraph',
        text: "To enable automatic cleanup in Mocha's watch mode, add a cleanup root hook. Create a mocha-watch-cleanup-after-each.js file with the following contents:",
      },
      {
        type: 'paragraph',
        text: 'mocha-watch-cleanup-after-each.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "const {cleanup} = require('@testing-library/react')\n\nexports.mochaHooks = {\n  afterEach() {\n    cleanup()\n  },\n}",
        },
      },
      {
        type: 'paragraph',
        text: "And register it using mocha's -r flag:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: 'mocha --require ./mocha-watch-cleanup-after-each.js',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Auto Cleanup in Vitest​',
      },
      {
        type: 'paragraph',
        text: "If you're using Vitest and want automatic cleanup to work, you can enable globals through its configuration file:",
      },
      {
        type: 'paragraph',
        text: 'vitest.config.ts',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import {defineConfig} from 'vitest/config'\n\nexport default defineConfig({\n  test: {\n    globals: true,\n  },\n})",
        },
      },
      {
        type: 'paragraph',
        text: "If you don't want to enable globals, you can import cleanup and call it manually in a top-level afterEach hook:",
      },
      {
        type: 'paragraph',
        text: 'vitest.config.ts',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import {defineConfig} from 'vitest/config'\n\nexport default defineConfig({\n  test: {\n    setupFiles: ['vitest-cleanup-after-each.ts'],\n  },\n})",
        },
      },
      {
        type: 'paragraph',
        text: 'vitest-cleanup-after-each.ts',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: "import {cleanup} from '@testing-library/react'\nimport {afterEach} from 'vitest'\n\nafterEach(() => {\n  cleanup()\n})",
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
