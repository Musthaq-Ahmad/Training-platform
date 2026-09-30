import type { ContentTopic } from '../../../types';

export const nodeenvvariablesTopics = {
  nodeenvvariables: {
    id: 'nodeenvvariables',
    heading: 'How to read environment variables from Node.js',
    blocks: [
      {
        type: 'paragraph',
        text: 'The process core module of Node.js provides the env property which hosts all the environment variables that were set at the moment the process was started.',
      },
      {
        type: 'paragraph',
        text: 'The below code runs app.js and set USER_ID and USER_KEY.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: 'USER_ID=239482 USER_KEY=foobar node app.js',
        },
      },
      {
        type: 'paragraph',
        text: 'That will pass the user USER_ID as 239482 and the USER_KEY as foobar. This is suitable for testing, however for production, you will probably be configuring some bash scripts to export variables.',
      },
      {
        type: 'paragraph',
        text: 'Here is an example that accesses the USER_ID and USER_KEY environment variables, which we set in above code.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'console.log(process.env.USER_ID); // "239482"\nconsole.log(process.env.USER_KEY); // "foobar"',
        },
      },
      {
        type: 'paragraph',
        text: 'In the same way you can access any custom environment variable you set.',
      },
      {
        type: 'paragraph',
        text: 'Node.js 20 introduced experimental support for .env files.',
      },
      {
        type: 'paragraph',
        text: "Now, you can use the --env-file flag to specify an environment file when running your Node.js application. Here's an example .env file and how to access its variables using process.env.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: '# .env file\nPORT=3000',
        },
      },
      {
        type: 'paragraph',
        text: 'In your js file',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'console.log(process.env.PORT); // "3000"',
        },
      },
      {
        type: 'paragraph',
        text: 'Run app.js file with environment variables set in .env file.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'node --env-file=.env app.js',
        },
      },
      {
        type: 'paragraph',
        text: 'This command loads all the environment variables from the .env file, making them available to the application on process.env',
      },
      {
        type: 'paragraph',
        text: 'Also, you can pass multiple --env-file arguments. Subsequent files override pre-existing variables defined in previous files.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'node --env-file=.env --env-file=.development.env app.js',
        },
      },
      {
        type: 'paragraph',
        text: "In case you want to optionally read from a .env file, it's possible to avoid throwing an error if the file is missing using the --env-file-if-exists flag.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'node --env-file-if-exists=.env app.js',
        },
      },
      {
        type: 'paragraph',
        text: 'Node.js provides a built-in API to load .env files directly from your code: process.loadEnvFile(path).',
      },
      {
        type: 'paragraph',
        text: 'This method loads variables from a .env file into process.env, similar to how the --env-file flag works — but can be invoked programmatically.',
      },
      {
        type: 'paragraph',
        text: 'Because this method is invoked post-initialization, the setting of startup-related environment variables (i.e. NODE_OPTIONS) has no effect on the process (however, these variables can still be accessed via process.env).',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'sql',
          code: '# .env file\nPORT=1234',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const { loadEnvFile } = require('node:process');\n\n// Loads environment variables from the default .env file\nloadEnvFile();\n\nconsole.log(process.env.PORT); // Logs '1234'",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { loadEnvFile } from 'node:process';\n\n// Loads environment variables from the default .env file\nloadEnvFile();\n\nconsole.log(process.env.PORT); // Logs '1234'",
        },
      },
      {
        type: 'paragraph',
        text: 'You can also specify a custom path:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const { loadEnvFile } = require('node:process');\nloadEnvFile('./config/.env');",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { loadEnvFile } from 'node:process';\nloadEnvFile('./config/.env');",
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
