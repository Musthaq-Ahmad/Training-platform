import type { ContentTopic } from '../../../types';

export const nodeexpressmiddlewareTopics = {
  nodeexpressmiddleware: {
    id: 'nodeexpressmiddleware',
    heading: 'Application-level middleware',
    blocks: [
      {
        type: 'paragraph',
        text: 'Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions, where METHOD is the lowercase HTTP method of the request that the middleware function handles, such as get, post, put, or delete.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Middleware without a mount path',
      },
      {
        type: 'paragraph',
        text: 'The following middleware function runs every time the app receives a request:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const express = require('express');const app = express();\napp.use((req, res, next) => {  console.log('Time:', Date.now());  next();});",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Middleware mounted on a path',
      },
      {
        type: 'paragraph',
        text: 'The following middleware function runs for any type of HTTP request on the /user/:id path:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.use('/user/:id', (req, res, next) => {  console.log('Request Type:', req.method);  next();});",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Route handlers',
      },
      {
        type: 'paragraph',
        text: 'This example shows a route and its handler function (middleware system). The function handles GET requests to the /user/:id path:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.get('/user/:id', (req, res) => {  res.send('USER');});",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Middleware sub-stacks',
      },
      {
        type: 'paragraph',
        text: 'Multiple middleware functions can be loaded together at a mount point to form a middleware sub-stack. This example prints request info for any type of HTTP request to the /user/:id path:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.use(  '/user/:id',  (req, res, next) => {    console.log('Request URL:', req.originalUrl);    next();  },  (req, res, next) => {    console.log('Request Type:', req.method);    next();  });",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Multiple route handlers',
      },
      {
        type: 'paragraph',
        text: 'Route handlers enable you to define multiple routes for a path. The example below defines two routes for GET requests to the /user/:id path. The second route will not cause any problems, but it will never get called because the first route ends the request-response cycle.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.get(  '/user/:id',  (req, res, next) => {    console.log('ID:', req.params.id);    next();  },  (req, res) => {    res.send('User Info');  });\n// handler for the /user/:id path, which prints the user IDapp.get('/user/:id', (req, res) => {  res.send(req.params.id);});",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Skipping to the next route',
      },
      {
        type: 'paragraph',
        text: "Call next('route') to skip the remaining middleware functions in a router middleware stack and pass control to the next route.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Note',
      },
      {
        type: 'paragraph',
        text: "next('route') will work only in middleware functions that were loaded by using the app.METHOD() or router.METHOD() functions.",
      },
      {
        type: 'paragraph',
        text: 'In the following example, if the user ID is 0, the first handler skips to the next route, which sends a special response:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.get(  '/user/:id',  (req, res, next) => {    // if the user ID is 0, skip to the next route    if (req.params.id === '0') next('route');    // otherwise pass the control to the next middleware function in this stack    else next();  },  (req, res) => {    // send a regular response    res.send('regular');  });\n// handler for the /user/:id path, which sends a special responseapp.get('/user/:id', (req, res) => {  res.send('special');});",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Reusable middleware arrays',
      },
      {
        type: 'paragraph',
        text: 'Middleware functions can also be grouped into arrays for better reusability. This example shows an array with a middleware sub-stack that handles GET requests to the /user/:id path:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function logOriginalUrl(req, res, next) {  console.log('Request URL:', req.originalUrl);  next();}\nfunction logMethod(req, res, next) {  console.log('Request Type:', req.method);  next();}\nconst logStuff = [logOriginalUrl, logMethod];app.get('/user/:id', logStuff, (req, res) => {  res.send('User Info');});",
        },
      },
      {
        type: 'paragraph',
        text: 'Router-level middleware works the same way as application-level middleware, except it is bound to an instance of express.Router().',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const router = express.Router();',
        },
      },
      {
        type: 'paragraph',
        text: 'Load router-level middleware by using the router.use() and router.METHOD() functions.',
      },
      {
        type: 'paragraph',
        text: 'The following example code replicates the middleware system that is shown above for application-level middleware, by using router-level middleware:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const express = require('express');const app = express();const router = express.Router();\n// a middleware function with no mount path. This code is executed for every request to the routerrouter.use((req, res, next) => {  console.log('Time:', Date.now());  next();});\n// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id pathrouter.use(  '/user/:id',  (req, res, next) => {    console.log('Request URL:', req.originalUrl);    next();  },  (req, res, next) => {    console.log('Request Type:', req.method);    next();  });\n// a middleware sub-stack that handles GET requests to the /user/:id pathrouter.get(  '/user/:id',  (req, res, next) => {    // if the user ID is 0, skip to the next route    if (req.params.id === '0') next('route');    // otherwise pass control to the next middleware function in this stack    else next();  },  (req, res) => {    // render a regular page    res.render('regular');  });\n// handler for the /user/:id path, which renders a special pagerouter.get('/user/:id', (req, res) => {  console.log(req.params.id);  res.render('special');});\n// mount the router on the appapp.use('/', router);",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Skipping out of a router',
      },
      {
        type: 'paragraph',
        text: "Use next('router') to skip the rest of the router’s middleware functions and pass control back out of the router instance.",
      },
      {
        type: 'paragraph',
        text: "In the following example, the router only responds when the request includes an x-auth header. Otherwise, next('router') exits the router and the app responds with a 401 status:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const express = require('express');const app = express();const router = express.Router();\n// predicate the router with a check and bail out when neededrouter.use((req, res, next) => {  if (!req.headers['x-auth']) return next('router');  next();});\nrouter.get('/user/:id', (req, res) => {  res.send('hello, user!');});\n// use the router and 401 anything falling throughapp.use('/admin', router, (req, res) => {  res.sendStatus(401);});",
        },
      },
      {
        type: 'paragraph',
        text: 'Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature (err, req, res, next):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.use((err, req, res, next) => {  console.error(err.stack);  res.status(500).send('Something broke!');});",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Caution',
      },
      {
        type: 'paragraph',
        text: 'Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.',
      },
      {
        type: 'paragraph',
        text: 'Express has the following built-in middleware functions:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'express.static serves static assets such as HTML files, images, and so on.',
          'express.json parses incoming requests with JSON payloads.',
          'express.raw parses incoming requests with Buffer payloads.',
          'express.text parses incoming requests with text payloads.',
          'express.urlencoded parses incoming requests with URL-encoded payloads.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Use third-party middleware to add functionality to Express apps.',
      },
      {
        type: 'paragraph',
        text: 'Install the Node.js module for the required functionality, then load it in your app at the application level or at the router level.',
      },
      {
        type: 'paragraph',
        text: 'The following example illustrates installing and loading the cookie-parsing middleware function cookie-parser:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'npm install cookie-parser',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const express = require('express');const app = express();const cookieParser = require('cookie-parser');\n// load the cookie-parsing middlewareapp.use(cookieParser());",
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
