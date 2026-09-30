import type { ContentTopic } from '../../../types';

export const noderunscriptsTopics = {
  noderunscripts: {
    id: 'noderunscripts',
    heading: 'Pass string as argument to node instead of file path',
    blocks: [
      {
        type: 'paragraph',
        text: 'To execute a string as argument you can use -e, --eval "script". Evaluate the following argument as JavaScript. The modules which are predefined in the REPL can also be used in script.',
      },
      {
        type: 'paragraph',
        text: 'On Windows, using cmd.exe a single quote will not work correctly because it only recognizes double " for quoting. In Powershell or Git bash, both \' and " are usable.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'node -e "console.log(123)"',
        },
      },
      {
        type: 'paragraph',
        text: 'As of Node.js v16, there is a built-in option to automatically restart the application when a file changes. This is useful for development purposes. To use this feature, you need to pass the --watch flag to Node.js.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'node --watch app.js',
        },
      },
      {
        type: 'paragraph',
        text: 'So when you change the file, the application will restart automatically. Read the --watch flag documentation.',
      },
      {
        type: 'paragraph',
        text: 'Node.js provides a built-in task runner that allows you to execute specific commands defined in your package.json file. This can be particularly useful for automating repetitive tasks such as running tests, building your project, or linting your code.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Using the --run flag',
      },
      {
        type: 'paragraph',
        text: 'The --run flag allows you to run a specified command from the scripts section of your package.json file. For example, if you have the following package.json:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{\n  "type": "module",\n  "scripts": {\n    "start": "node app.js",\n    "test": "node --test"\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'You can run the test script using the --run flag:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'node --run test',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Passing arguments to the command',
      },
      {
        type: 'paragraph',
        text: 'You can use the syntax -- --another-argument to pass arguments to the underlying script. For example, if you want to pass a --port argument to the start script:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'node --run start -- --port 8080',
        },
      },
      {
        type: 'paragraph',
        text: 'This will run the start script and append --port 8080 to the command execution, making it equivalent to running node app.js --port 8080.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Environment variables',
      },
      {
        type: 'paragraph',
        text: 'The --run flag sets specific environment variables that can be useful for your scripts:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'NODE_RUN_SCRIPT_NAME: The name of the script being run.',
          'NODE_RUN_PACKAGE_JSON_PATH: The path to the package.json file being processed.',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Intentional limitations',
      },
      {
        type: 'paragraph',
        text: 'The Node.js task runner is intentionally more limited compared to other task runners like npm run or yarn run. It focuses on performance and simplicity, omitting features like running pre or post scripts. This makes it suitable for straightforward tasks but may not cover all use cases.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
