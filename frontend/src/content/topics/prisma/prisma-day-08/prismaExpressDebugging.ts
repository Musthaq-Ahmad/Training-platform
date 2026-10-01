import type { ContentTopic } from '../../../types';

export const prismaexpressdebuggingTopics = {
  prismaexpressdebugging: {
    id: 'prismaexpressdebugging',
    heading: 'Debugging Express',
    blocks: [
      {
        type: 'paragraph',
        text: 'To see all the internal logs used in Express, set the DEBUG environment variable to express:*,router,router:* when launching your app. Routing is handled by the separate router package, so its logs live under the router namespace and are not included in express:*.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ DEBUG=express:*,router,router:* node index.js',
        },
      },
      {
        type: 'paragraph',
        text: 'On Windows, use the corresponding command.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '> $env:DEBUG = "express:*,router,router:*"; node index.js',
        },
      },
      {
        type: 'paragraph',
        text: 'Running this command on a small app with a JSON body parser and a mounted router prints the following output:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "const express = require('express');\nconst app = express();\napp.use(express.json());\nconst users = express.Router();users.get('/', (req, res) => {  res.json([]);});\napp.use('/users', users);\napp.get('/', (req, res) => {  res.send('Hello World!');});\napp.listen(3000);",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: "$ DEBUG=express:*,router,router:* node index.js  express:application set \"x-powered-by\" to true +0ms  express:application set \"etag\" to 'weak' +3ms  express:application set \"etag fn\" to [Function: generateETag] +0ms  express:application set \"env\" to 'development' +1ms  express:application set \"query parser\" to 'simple' +0ms  express:application set \"query parser fn\" to [Function: parse] +0ms  express:application set \"subdomain offset\" to 2 +1ms  express:application set \"trust proxy\" to false +0ms  express:application set \"trust proxy fn\" to [Function: trustNone] +1ms  express:application booting in development mode +0ms  express:application set \"view\" to [Function: View] +0ms  express:application set \"views\" to '/projects/example/views' +1ms  express:application set \"jsonp callback name\" to 'callback' +0ms  router use '/' jsonParser +0ms  router:layer new '/' +0ms  router:route new '/' +0ms  router:layer new '/' +3ms  router:route get / +0ms  router:layer new '/' +1ms  router use '/users' router +4ms  router:layer new '/users' +0ms  router:route new '/' +1ms  router:layer new '/' +0ms  router:route get / +1ms  router:layer new '/' +1ms",
        },
      },
      {
        type: 'paragraph',
        text: 'When a request is then made to the app, you will see the logs specified in the Express code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '  router dispatching GET /users +712ms  router jsonParser  : /users +1ms  router trim prefix (/users) from url /users +2ms  router router /users : /users +0ms  router dispatching GET / +0ms',
        },
      },
      {
        type: 'paragraph',
        text: 'To see the logs only from the router implementation, set the value of DEBUG to router,router:*. Likewise, to see logs only from the application implementation, set the value of DEBUG to express:application, and so on.',
      },
      {
        type: 'paragraph',
        text: 'The same debug module that Express uses internally is available for your application code. Install it, create one or more loggers scoped to a namespace of your choosing, and call them wherever you would otherwise use console.log:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'npm install debug',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "const express = require('express');const debug = require('debug')('myapp:server');\nconst app = express();\napp.get('/', (req, res) => {  debug('handling request from %s', req.ip);  res.send('Hello World!');});\napp.listen(3000, () => {  debug('listening on port 3000');});",
        },
      },
      {
        type: 'paragraph',
        text: 'These statements print nothing by default. Enable them through the same DEBUG environment variable, using your own namespace:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ DEBUG=myapp:* node index.js',
        },
      },
      {
        type: 'paragraph',
        text: 'You can specify more than one debug namespace by assigning a comma-separated list of names:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ DEBUG=myapp:*,router node index.js',
        },
      },
      {
        type: 'paragraph',
        text: 'The DEBUG environment variable can be set by any process launcher that supports environment variables, including the run and debug configurations of your IDE. For example, in VS Code you can set it in the env property of a launch configuration:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '{  "type": "node",  "request": "launch",  "name": "Launch Express app",  "program": "${workspaceFolder}/index.js",  "env": { "DEBUG": "express:*,router,router:*" }}',
        },
      },
      {
        type: 'paragraph',
        text: 'See Node.js debugging in VS Code for the full list of launch options.',
      },
      {
        type: 'paragraph',
        text: 'Debug logs show what the app did; for stepping through your code with breakpoints, use the built-in Node.js inspector. Start your app with the --inspect flag:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ node --inspect index.js',
        },
      },
      {
        type: 'paragraph',
        text: 'Then attach a debugging client, such as Chrome DevTools (open chrome://inspect), VS Code, or any other inspector-capable tool, to set breakpoints in your route handlers and middleware, step through code, and inspect variables.',
      },
      {
        type: 'paragraph',
        text: 'If you need to debug something that happens during startup, use --inspect-brk instead, which pauses execution on the first line until a debugger attaches. See the Node.js debugging guide for details.',
      },
      {
        type: 'paragraph',
        text: 'Express runs on top of the Node.js http module, which has its own debugging facilities that work with any Express app.',
      },
      {
        type: 'paragraph',
        text: 'Setting the NODE_DEBUG environment variable to http makes Node.js print internal logs from the HTTP layer, such as connection handling and socket events:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ NODE_DEBUG=http node index.js',
        },
      },
      {
        type: 'paragraph',
        text: 'You can combine it with other subsystems, such as net or stream, in a comma-separated list. Be aware that this output can expose sensitive data such as authentication headers, so use it only in development.',
      },
      {
        type: 'paragraph',
        text: 'Node.js publishes an event for every HTTP request through the diagnostics_channel module, which you can subscribe to without patching Express or adding middleware:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "const { subscribe } = require('node:diagnostics_channel');\nsubscribe('http.server.request.start', ({ request }) => {  console.log(`${request.method} ${request.url}`);});",
        },
      },
      {
        type: 'paragraph',
        text: 'Other built-in channels cover the rest of the request lifecycle, such as http.server.response.finish, and the client side of http.request calls. See the diagnostics_channel documentation for the full list.',
      },
      {
        type: 'paragraph',
        text: 'When running through Node.js, you can set a few environment variables that will change the behavior of the debug logging:',
      },
      {
        type: 'table',
        headers: ['Name', 'Purpose'],
        rows: [
          ['DEBUG', 'Enables/disables specific debugging namespaces.'],
          ['DEBUG_COLORS', 'Whether or not to use colors in the debug output.'],
          ['DEBUG_DEPTH', 'Object inspection depth.'],
          ['DEBUG_FD', 'File descriptor to write debug output to.'],
          ['DEBUG_SHOW_HIDDEN', 'Shows hidden properties on inspected objects.'],
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Note',
      },
      {
        type: 'paragraph',
        text: 'The environment variables beginning with DEBUG_ end up being converted into an Options object that gets used with %o/%O formatters. See the Node.js documentation for util.inspect() for the complete list.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
