import type { ContentTopic } from '../../../types';

export const nodeexpressroutingTopics = {
  nodeexpressrouting: {
    id: 'nodeexpressrouting',
    heading: 'Route methods',
    blocks: [
      {
        type: 'paragraph',
        text: 'A route method is derived from one of the HTTP methods, and is attached to an instance of the express class.',
      },
      {
        type: 'paragraph',
        text: 'The following code is an example of routes that are defined for the GET and the POST methods to the root of the app.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// GET method routeapp.get('/', (req, res) => {  res.send('GET request to the homepage');});\n// POST method routeapp.post('/', (req, res) => {  res.send('POST request to the homepage');});",
        },
      },
      {
        type: 'paragraph',
        text: 'Express supports methods that correspond to all HTTP request methods: get, post, and so on. For a full list, see app.METHOD.',
      },
      {
        type: 'paragraph',
        text: 'There is a special routing method, app.all(), used to load middleware functions at a path for all HTTP request methods. For example, the following handler is executed for requests to the route "/secret" whether using GET, QUERY, POST, PUT, DELETE, or any other HTTP request method supported in the http module.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.all('/secret', (req, res, next) => {  console.log('Accessing the secret section ...');  next(); // pass control to the next handler});",
        },
      },
      {
        type: 'paragraph',
        text: 'Route paths, in combination with a request method, define the endpoints at which requests can be made. Route paths can be strings or regular expressions. They can also capture values from the URL, as described in Route parameters below.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Note',
      },
      {
        type: 'paragraph',
        text: 'Express uses path-to-regexp v8 for matching the route paths; see the path-to-regexp documentation for all the possibilities in defining route paths. Express Playground Router is a handy tool for testing basic Express routes, although it does not support pattern matching.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'String paths',
      },
      {
        type: 'paragraph',
        text: 'String paths match requests exactly. The dot (.) and hyphen (-) are interpreted literally.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Warning',
      },
      {
        type: 'paragraph',
        text: 'Query strings are not part of the route path.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.get('/', (req, res) => {  res.send('root');});\napp.get('/about', (req, res) => {  res.send('about');});\napp.get('/random.text', (req, res) => {  res.send('random.text');});",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Caution',
      },
      {
        type: 'paragraph',
        text: 'The characters ?, +, *, [], (), and ! are reserved and cannot be used as literal characters in route paths, and braces are reserved for optional segments. Use \\ to escape them if needed.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Regular expressions',
      },
      {
        type: 'paragraph',
        text: 'You can also use regular expressions as route paths. This is useful when you need more complex matching logic.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// Matches any path containing "a"app.get(/a/, (req, res) => {  res.send(\'/a/\');});\n// Matches paths ending with "fly" (butterfly, dragonfly, etc.)app.get(/.*fly$/, (req, res) => {  res.send(\'/.*fly$/\');});',
        },
      },
      {
        type: 'paragraph',
        text: 'Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys. They come in three forms: named parameters (:name), wildcards (*name), and optional segments, which wrap either of them in braces.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Named parameters',
      },
      {
        type: 'paragraph',
        text: 'Named parameters capture a single path segment at their position in the URL, or part of one when combined with literal characters, as shown further below.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'Route path: /users/:userId/books/:bookIdRequest URL: http://localhost:3000/users/34/books/8989req.params: { "userId": "34", "bookId": "8989" }',
        },
      },
      {
        type: 'paragraph',
        text: 'To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.get('/users/:userId/books/:bookId', (req, res) => {  res.send(req.params);});",
        },
      },
      {
        type: 'paragraph',
        text: 'In TypeScript, @types/express infers the parameters from the route path, so in the handler above req.params.userId and req.params.bookId are already typed as string with no extra annotation. Reading a name that is not in the route (such as req.params.other) is a type error. You only need to annotate the parameters when the handler is defined separately from the route, because the type checker can no longer see the path. In that case, pass them as the first type argument of Request:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import { type Request, type Response } from 'express';\nconst sendParams = (req: Request<{ userId: string; bookId: string }>, res: Response) => {  res.send(req.params);};\napp.get('/users/:userId/books/:bookId', sendParams);",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Caution',
      },
      {
        type: 'paragraph',
        text: 'The name of route parameters must be a valid JavaScript identifier. Other names can be used by quoting them, for example :"user-name".',
      },
      {
        type: 'paragraph',
        text: 'Since the hyphen (-) and the dot (.) are interpreted literally, they can be used along with route parameters for useful purposes.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'Route path: /flights/:from-:toRequest URL: http://localhost:3000/flights/LAX-SFOreq.params: { "from": "LAX", "to": "SFO" }',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'Route path: /plantae/:genus.:speciesRequest URL: http://localhost:3000/plantae/Prunus.persicareq.params: { "genus": "Prunus", "species": "persica" }',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Caution',
      },
      {
        type: 'paragraph',
        text: 'Regexp characters are not supported inside string paths, so a parameter cannot be restricted with a suffix such as :userId(\\d+). Use an array of paths or a full regular expression instead. See the path route matching syntax for more information.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Wildcards',
      },
      {
        type: 'paragraph',
        text: 'Wildcards match any path after a prefix. Like other route parameters they must have a name, but they are captured as an array of path segments instead of a string.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.get('/files/*filepath', (req, res) => {  // GET /files/images/logo.png  console.dir(req.params.filepath);  // => [ 'images', 'logo.png' ]  res.send(`File: ${req.params.filepath.join('/')}`);});",
        },
      },
      {
        type: 'paragraph',
        text: 'To also match the root path, wrap the wildcard in braces:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// Matches / , /foo , /foo/bar , etc.app.get('/{*splat}', (req, res) => {  // GET / => req.params = {}, splat is omitted  // GET /foo/bar => req.params.splat = [ 'foo', 'bar' ]  res.send('ok');});",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Optional segments',
      },
      {
        type: 'paragraph',
        text: 'Use braces to define optional segments in a route path. When the segment is not present, the parameter is omitted from req.params.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.get('/:file{.:ext}', (req, res) => {  // GET /image.png => req.params = { file: 'image', ext: 'png' }  // GET /image => req.params = { file: 'image' }  res.send('ok');});",
        },
      },
      {
        type: 'paragraph',
        text: 'The braces can also wrap a whole parameter to make it optional. Note that everything inside the braces is optional, so the position of the slash matters:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.get('/user/{:id}', (req, res) => {  // GET /user/42 => req.params = { id: '42' }  // GET /user/ => req.params = {}  // GET /user => 404, only the parameter is optional  res.send('ok');});\napp.get('/order{/:id}', (req, res) => {  // GET /order/42 => req.params = { id: '42' }  // GET /order => req.params = {}, the whole segment is optional  res.send('ok');});",
        },
      },
      {
        type: 'paragraph',
        text: 'Do not confuse the position of the slash in the route path with the strict routing setting, which is about the request URL: it controls whether a URL ending in a slash that the route path does not require still matches. For example, a request for /order/ matches the /order{/:id} route by default, but returns a 404 error when strict routing is enabled; the trailing slash of /user/ is unaffected because the /user/{:id} route requires it. All the requests commented in the examples above behave the same regardless of that setting.',
      },
      {
        type: 'paragraph',
        text: "You can provide multiple callback functions that behave like middleware to handle a request. The only exception is that these callbacks might invoke next('route') to bypass the remaining route callbacks. You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there’s no reason to proceed with the current route.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.get('/user/:id', (req, res, next) => {  if (req.params.id === '0') {    return next('route');  }  res.send(`User ${req.params.id}`);});\napp.get('/user/:id', (req, res) => {  res.send('Special handler for user ID 0');});",
        },
      },
      {
        type: 'paragraph',
        text: 'In this example:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'GET /user/5 → handled by first route → sends “User 5”',
          "GET /user/0 → first route calls next('route'), skipping to the next matching /user/:id route",
        ],
      },
      {
        type: 'paragraph',
        text: 'Route handlers can be in the form of a function, an array of functions, or combinations of both, as shown in the following examples.',
      },
      {
        type: 'paragraph',
        text: 'A single callback function can handle a route. For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.get('/example/a', (req, res) => {  res.send('Hello from A!');});",
        },
      },
      {
        type: 'paragraph',
        text: 'More than one callback function can handle a route (make sure you specify the next object). For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app.get(  '/example/b',  (req, res, next) => {    console.log('the response will be sent by the next function ...');    next();  },  (req, res) => {    res.send('Hello from B!');  });",
        },
      },
      {
        type: 'paragraph',
        text: 'An array of callback functions can handle a route. For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const cb0 = function (req, res, next) {  console.log('CB0');  next();};\nconst cb1 = function (req, res, next) {  console.log('CB1');  next();};\nconst cb2 = function (req, res) {  res.send('Hello from C!');};\napp.get('/example/c', [cb0, cb1, cb2]);",
        },
      },
      {
        type: 'paragraph',
        text: 'A combination of independent functions and arrays of functions can handle a route. For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const cb0 = function (req, res, next) {  console.log('CB0');  next();};\nconst cb1 = function (req, res, next) {  console.log('CB1');  next();};\napp.get(  '/example/d',  [cb0, cb1],  (req, res, next) => {    console.log('the response will be sent by the next function ...');    next();  },  (req, res) => {    res.send('Hello from D!');  });",
        },
      },
      {
        type: 'paragraph',
        text: 'The methods on the response object (res) in the following table can send a response to the client, and terminate the request-response cycle. If none of these methods are called from a route handler, the client request will be left hanging.',
      },
      {
        type: 'table',
        headers: ['Method', 'Description'],
        rows: [
          ['res.download()', 'Prompt a file to be downloaded.'],
          ['res.end()', 'End the response process.'],
          ['res.json()', 'Send a JSON response.'],
          ['res.jsonp()', 'Send a JSON response with JSONP support.'],
          ['res.redirect()', 'Redirect a request.'],
          ['res.render()', 'Render a view template.'],
          ['res.send()', 'Send a response of various types.'],
          ['res.sendFile()', 'Send a file as an octet stream.'],
          [
            'res.sendStatus()',
            'Set the response status code and send its string representation as the response body.',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'You can create chainable route handlers for a route path by using app.route(). Because the path is specified in a single location, this helps to create modular routes and reduces redundancy and typos. For more information about routes, see the Router() documentation.',
      },
      {
        type: 'paragraph',
        text: 'Here is an example of chained route handlers that are defined by using app.route().',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "app  .route('/book')  .get((req, res) => {    res.send('Get a random book');  })  .post((req, res) => {    res.send('Add a book');  })  .put((req, res) => {    res.send('Update the book');  });",
        },
      },
      {
        type: 'paragraph',
        text: 'Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.',
      },
      {
        type: 'paragraph',
        text: 'The following example creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.',
      },
      {
        type: 'paragraph',
        text: 'Create a router file named birds.js in the app directory, with the following content:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const express = require('express');const router = express.Router();\n// middleware that is specific to this routerconst timeLog = (req, res, next) => {  console.log('Time: ', Date.now());  next();};router.use(timeLog);\n// define the home page routerouter.get('/', (req, res) => {  res.send('Birds home page');});// define the about routerouter.get('/about', (req, res) => {  res.send('About birds');});\nmodule.exports = router;",
        },
      },
      {
        type: 'paragraph',
        text: 'Then, load the router module in the app:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const birds = require('./birds');\n// ...\napp.use('/birds', birds);",
        },
      },
      {
        type: 'paragraph',
        text: 'The app will now be able to handle requests to /birds and /birds/about, as well as call the timeLog middleware function that is specific to the route.',
      },
      {
        type: 'paragraph',
        text: 'But if the parent route /birds has path parameters, it will not be accessible by default from the sub-routes. To make it accessible, you will need to pass the mergeParams option to the Router constructor.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const router = express.Router({ mergeParams: true });',
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
