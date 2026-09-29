import type { ContentTopic } from '../../../types';

export const eslintGettingStartedTopics = {
  'eslint-getting-started': {
    id: 'eslint-getting-started',
    heading: 'Prerequisites',
    blocks: [
      {
        type: 'paragraph',
        text: 'To use ESLint, you must have Node.js (^20.19.0, ^22.13.0, or &gt;=24) installed and built with SSL and ICU support. (If you are using an official Node.js distribution, both SSL and ICU are always built in.)',
      },
      {
        type: 'paragraph',
        text: 'If you use ESLint’s TypeScript type definitions, TypeScript 5.3 or later is required.',
      },
      {
        type: 'paragraph',
        text: 'You can install and configure ESLint using this command:',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'npm',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'npm init @eslint/config@latest',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'yarn',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'yarn create @eslint/config',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'pnpm',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'pnpm create @eslint/config@latest',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'bun',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'bun create @eslint/config@latest',
        },
      },
      {
        type: 'paragraph',
        text: 'If you want to use a specific shareable config that is hosted on npm, you can use the --config option and specify the package name:',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'npm',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '# use `eslint-config-xo` shared config - npm 7+\nnpm init @eslint/config@latest -- --config eslint-config-xo',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'yarn',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '# use `eslint-config-xo` shared config - npm 7+\nyarn create @eslint/config -- --config eslint-config-xo',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'pnpm',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '# use `eslint-config-xo` shared config - npm 7+\npnpm create @eslint/config@latest -- --config eslint-config-xo',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'bun',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '# use `eslint-config-xo` shared config - npm 7+\nbun create @eslint/config@latest -- --config eslint-config-xo',
        },
      },
      {
        type: 'paragraph',
        text: 'Note: npm init @eslint/config assumes you have a package.json file already. If you don’t, make sure to run npm init or yarn init beforehand.',
      },
      {
        type: 'paragraph',
        text: 'After that, you can run ESLint on any file or directory like this:',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'npm',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'npx eslint yourfile.js ',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'yarn',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'yarn dlx eslint yourfile.js ',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'pnpm',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'pnpm dlx eslint yourfile.js ',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'bun',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'bunx eslint yourfile.js ',
        },
      },
      {
        type: 'paragraph',
        text: 'Note: If you are coming from a version before 9.0.0 please see the migration guide.',
      },
      {
        type: 'paragraph',
        text: 'When you run npm init @eslint/config, you’ll be asked a series of questions to determine how you’re using ESLint and what options should be included. After answering these questions, you’ll have an eslint.config.js (or eslint.config.mjs) file created in your directory.',
      },
      {
        type: 'paragraph',
        text: 'For example, one of the questions is “Where does your code run?” If you select “Browser” then your configuration file will contain the definitions for global variables found in web browsers. Here’s an example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { defineConfig } from "eslint/config";\nimport globals from "globals";\nimport js from "@eslint/js";\n\nexport default defineConfig([\n    { files: ["**/*.js"], languageOptions: { globals: globals.browser } },\n    { files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },\n]);',
        },
      },
      {
        type: 'paragraph',
        text: 'The "js/recommended" configuration ensures all of the rules marked as recommended on the rules page will be turned on. Alternatively, you can use configurations that others have created by searching for “eslint-config” on npmjs.com. ESLint will not lint your code unless you extend from a shared configuration or explicitly turn rules on in your configuration.',
      },
      {
        type: 'paragraph',
        text: 'You can configure rules individually by defining a new object with a rules key, as in this example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { defineConfig } from "eslint/config";\nimport js from "@eslint/js";\n\nexport default defineConfig([\n    { files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },\n\n    {\n        rules: {\n            "no-unused-vars": "warn",\n            "no-undef": "warn",\n        },\n    },\n]);',
        },
      },
      {
        type: 'paragraph',
        text: 'The names "no-unused-vars" and "no-undef" are the names of rules in ESLint. The first value is the error level of the rule and can be one of these values:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '"off" or 0 - turn the rule off',
          '"warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)',
          '"error" or 2 - turn the rule on as an error (exit code will be 1)',
        ],
      },
      {
        type: 'paragraph',
        text: 'The three error levels allow you fine-grained control over how ESLint applies rules (for more configuration options and details, see the configuration docs).',
      },
      {
        type: 'paragraph',
        text: 'It is also possible to install ESLint globally, rather than locally, using npm install eslint --global. However, this is not recommended, and any plugins or shareable configs that you use must still be installed locally even if you install ESLint globally.',
      },
      {
        type: 'paragraph',
        text: 'You can also manually set up ESLint in your project.',
      },
      {
        type: 'paragraph',
        text: 'Before you begin, you must already have a package.json file. If you don’t, make sure to run npm init or yarn init to create the file beforehand.',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: ['Install the ESLint packages in your project:'],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'npm',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'npm install --save-dev eslint@latest @eslint/js@latest',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'yarn',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'yarn add --dev eslint@latest @eslint/js@latest',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'pnpm',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'pnpm add --save-dev eslint@latest @eslint/js@latest',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'bun',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'bun add --dev eslint@latest @eslint/js@latest',
        },
      },
      {
        type: 'list',
        ordered: true,
        start: 2,
        items: [
          'Add an eslint.config.js file: # Create JavaScript configuration file touch eslint.config.js',
          'Add configuration to the eslint.config.js file. Refer to the Configure ESLint documentation to learn how to add rules, custom configurations, plugins, and more. import { defineConfig } from "eslint/config"; import js from "@eslint/js"; export default defineConfig([ { files: ["**/*.js"], plugins: { js, }, extends: ["js/recommended"], rules: { "no-unused-vars": "warn", "no-undef": "warn", }, }, ]);',
          'Lint code using the ESLint CLI:',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'npm',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'npx eslint project-dir/ file.js ',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'yarn',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'yarn dlx eslint project-dir/ file.js ',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'pnpm',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'pnpm dlx eslint project-dir/ file.js ',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'bun',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'bunx eslint project-dir/ file.js ',
        },
      },
      {
        type: 'paragraph',
        text: 'For more information on the available CLI options, refer to Command Line Interface.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Learn about advanced configuration of ESLint.',
          'Get familiar with the command line options.',
          'Explore ESLint integrations into other tools like editors, build systems, and more.',
          'Can’t find just the right rule? Make your own custom rule.',
          'Make ESLint even better by contributing.',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
