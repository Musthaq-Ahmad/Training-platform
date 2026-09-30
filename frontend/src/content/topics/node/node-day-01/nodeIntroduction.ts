import type { ContentTopic } from '../../../types';

export const nodeintroductionTopics = {
  nodeintroduction: {
    id: 'nodeintroduction',
    heading: 'An Example Node.js Application',
    blocks: [
      {
        type: 'paragraph',
        text: 'The most common example Hello World of Node.js is a web server:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const { createServer } = require('node:http');\n\nconst hostname = '127.0.0.1';\nconst port = 3000;\n\nconst server = createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello World');\n});\n\nserver.listen(port, hostname, () => {\n  console.log(`Server running at http://${hostname}:${port}/`);\n});",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { createServer } from 'node:http';\n\nconst hostname = '127.0.0.1';\nconst port = 3000;\n\nconst server = createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello World');\n});\n\nserver.listen(port, hostname, () => {\n  console.log(`Server running at http://${hostname}:${port}/`);\n});",
        },
      },
      {
        type: 'paragraph',
        text: "Both examples create the same HTTP server. The first uses the CommonJS modules (require()), while the second uses ECMAScript modules (import). Which one you use depends on your project's module system and configuration.",
      },
      {
        type: 'paragraph',
        text: 'To run this snippet, save it as a server.js file and run node server.js in your terminal. If you use the mjs version of the code, you should save it as a server.mjs file and run node server.mjs in your terminal.',
      },
      {
        type: 'paragraph',
        text: 'This code first includes the Node.js http module.',
      },
      {
        type: 'paragraph',
        text: 'Node.js has a fantastic standard library, including first-class support for networking.',
      },
      {
        type: 'paragraph',
        text: 'The createServer() method of http creates a new HTTP server and returns it.',
      },
      {
        type: 'paragraph',
        text: 'The server is set to listen on the specified port and host name. When the server is ready, the callback function is called, in this case informing us that the server is running.',
      },
      {
        type: 'paragraph',
        text: 'Whenever a new request is received, the request event is called, providing two objects: a request (an http.IncomingMessage object) and a response (an http.ServerResponse object).',
      },
      {
        type: 'paragraph',
        text: 'Those 2 objects are essential to handle the HTTP call.',
      },
      {
        type: 'paragraph',
        text: 'The first provides the request details. In this simple example, this is not used, but you could access the request headers and request data.',
      },
      {
        type: 'paragraph',
        text: 'The second is used to return data to the caller.',
      },
      {
        type: 'paragraph',
        text: 'In this case with:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'res.statusCode = 200;',
        },
      },
      {
        type: 'paragraph',
        text: 'we set the statusCode property to 200, to indicate a successful response.',
      },
      {
        type: 'paragraph',
        text: 'We set the Content-Type header:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "res.setHeader('Content-Type', 'text/plain');",
        },
      },
      {
        type: 'paragraph',
        text: 'and we close the response, adding the content as an argument to end():',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "res.end('Hello World');",
        },
      },
      {
        type: 'paragraph',
        text: "If you haven't already done so, download Node.js.",
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
