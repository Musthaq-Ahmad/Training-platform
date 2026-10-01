import type { ContentTopic } from '../../../types';

export const prismasupertestTopics = {
  prismasupertest: {
    id: 'prismasupertest',
    heading: 'Supertest',
    blocks: [
      {
        type: 'paragraph',
        text: 'The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.',
      },
      {
        type: 'paragraph',
        text: 'Install supertest as an npm module and save it to your package.json file as a development dependency:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'npm install supertest --save-dev',
        },
      },
      {
        type: 'paragraph',
        text: "Once installed it can now be referenced by simply calling require('supertest');",
      },
      {
        type: 'paragraph',
        text: 'You may pass an http.Server, or a Function to request() - if the server is not already listening for connections then it is bound to an ephemeral port for you so there is no need to keep track of ports.',
      },
      {
        type: 'paragraph',
        text: 'supertest works with any test framework, here is an example without using any test framework at all:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const request = require('supertest');\nconst express = require('express');\n\nconst app = express();\n\napp.get('/user', function (req, res) {\n  res.status(200).json({ name: 'john' });\n});\n\nrequest(app)\n  .get('/user')\n  .expect('Content-Type', /json/)\n  .expect('Content-Length', '15')\n  .expect(200)\n  .end(function (err, res) {\n    if (err) throw err;\n  });",
        },
      },
      {
        type: 'paragraph',
        text: 'To enable http2 protocol, simply append an options to request or request.agent:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const request = require('supertest');\nconst express = require('express');\n\nconst app = express();\n\napp.get('/user', function (req, res) {\n  res.status(200).json({ name: 'john' });\n});\n\nrequest(app, { http2: true })\n  .get('/user')\n  .expect('Content-Type', /json/)\n  .expect('Content-Length', '15')\n  .expect(200)\n  .end(function (err, res) {\n    if (err) throw err;\n  });\n\nrequest\n  .agent(app, { http2: true })\n  .get('/user')\n  .expect('Content-Type', /json/)\n  .expect('Content-Length', '15')\n  .expect(200)\n  .end(function (err, res) {\n    if (err) throw err;\n  });",
        },
      },
      {
        type: 'paragraph',
        text: "Here's an example with mocha, note how you can pass done straight to any of the .expect() calls:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "describe('GET /user', function () {\n  it('responds with json', function (done) {\n    request(app)\n      .get('/user')\n      .set('Accept', 'application/json')\n      .expect('Content-Type', /json/)\n      .expect(200, done);\n  });\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'You can use auth method to pass HTTP username and password in the same way as in the superagent:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "describe('GET /user', function () {\n  it('responds with json', function (done) {\n    request(app)\n      .get('/user')\n      .auth('username', 'password')\n      .set('Accept', 'application/json')\n      .expect('Content-Type', /json/)\n      .expect(200, done);\n  });\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'One thing to note with the above statement is that superagent now sends any HTTP error (anything other than a 2XX response code) to the callback as the first argument if you do not add a status code expect (i.e. .expect(302)).',
      },
      {
        type: 'paragraph',
        text: 'If you are using the .end() method .expect() assertions that fail will not throw - they will return the assertion as an error to the .end() callback. In order to fail the test case, you will need to rethrow or pass err to done(), as follows:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "describe('POST /users', function () {\n  it('responds with json', function (done) {\n    request(app)\n      .post('/users')\n      .send({ name: 'john' })\n      .set('Accept', 'application/json')\n      .expect('Content-Type', /json/)\n      .expect(200)\n      .end(function (err, res) {\n        if (err) return done(err);\n        return done();\n      });\n  });\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'You can also use promises:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "describe('GET /users', function () {\n  it('responds with json', function () {\n    return request(app)\n      .get('/users')\n      .set('Accept', 'application/json')\n      .expect('Content-Type', /json/)\n      .expect(200)\n      .then((response) => {\n        expect(response.body.email).toEqual('foo@bar.com');\n      });\n  });\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'Or async/await syntax:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "describe('GET /users', function () {\n  it('responds with json', async function () {\n    const response = await request(app).get('/users').set('Accept', 'application/json');\n    expect(response.headers['content-type']).toMatch(/json/);\n    expect(response.status).toEqual(200);\n    expect(response.body.email).toEqual('foo@bar.com');\n  });\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'Expectations are run in the order of definition. This characteristic can be used to modify the response body or headers before executing an assertion.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "describe('POST /user', function () {\n  it('user.name should be an case-insensitive match for \"john\"', function (done) {\n    request(app)\n      .post('/user')\n      .send('name=john') // x-www-form-urlencoded upload\n      .set('Accept', 'application/json')\n      .expect(function (res) {\n        res.body.id = 'some fixed id';\n        res.body.name = res.body.name.toLowerCase();\n      })\n      .expect(\n        200,\n        {\n          id: 'some fixed id',\n          name: 'john',\n        },\n        done\n      );\n  });\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'Anything you can do with superagent, you can do with supertest - for example multipart file uploads!',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "request(app)\n  .post('/')\n  .field('name', 'my awesome avatar')\n  .field('complex_object', '{\"attribute\": \"value\"}', {contentType: 'application/json'})\n  .attach('avatar', 'test/fixtures/avatar.jpg')\n  ...",
        },
      },
      {
        type: 'paragraph',
        text: "Passing the app or url each time is not necessary, if you're testing the same host you may simply re-assign the request variable with the initialization app or url, a new Test is created per request.VERB() call.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "request = request('http://localhost:5555');\n\nrequest.get('/').expect(200, function (err) {\n  console.log(err);\n});\n\nrequest.get('/').expect('heya', function (err) {\n  console.log(err);\n});",
        },
      },
      {
        type: 'paragraph',
        text: "Here's an example with mocha that shows how to persist a request and its cookies:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const request = require('supertest');\nconst should = require('should');\nconst express = require('express');\nconst cookieParser = require('cookie-parser');\n\ndescribe('request.agent(app)', function () {\n  const app = express();\n  app.use(cookieParser());\n\n  app.get('/', function (req, res) {\n    res.cookie('cookie', 'hey');\n    res.send();\n  });\n\n  app.get('/return', function (req, res) {\n    if (req.cookies.cookie) res.send(req.cookies.cookie);\n    else res.send(':(');\n  });\n\n  const agent = request.agent(app);\n\n  it('should save cookies', function (done) {\n    agent.get('/').expect('set-cookie', 'cookie=hey; Path=/', done);\n  });\n\n  it('should send cookies', function (done) {\n    agent.get('/return').expect('hey', done);\n  });\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'There is another example that is introduced by the file agency.js',
      },
      {
        type: 'paragraph',
        text: 'Here is an example where 2 cookies are set on the request.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "agent(app)\n  .get('/api/content')\n  .set('Cookie', ['nameOne=valueOne;nameTwo=valueTwo'])\n  .send()\n  .expect(200)\n  .end((err, res) => {\n    if (err) {\n      return done(err);\n    }\n    expect(res.text).to.be.equal('hey');\n    return done();\n  });",
        },
      },
      {
        type: 'paragraph',
        text: 'You may use any superagent methods, including .write(), .pipe() etc and perform assertions in the .end() callback for lower-level needs.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '.expect(status[, fn])',
      },
      {
        type: 'paragraph',
        text: 'Assert response status code.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '.expect(status, body[, fn])',
      },
      {
        type: 'paragraph',
        text: 'Assert response status code and body.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '.expect(body[, fn])',
      },
      {
        type: 'paragraph',
        text: 'Assert response body text with a string, regular expression, or parsed body object.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '.expect(field, value[, fn])',
      },
      {
        type: 'paragraph',
        text: 'Assert header field value with a string or regular expression.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '.expect(function(res) {})',
      },
      {
        type: 'paragraph',
        text: "Pass a custom assertion function. It'll be given the response object to check. If the check fails, throw an error.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "request(app).get('/').expect(hasPreviousAndNextKeys).end(done);\n\nfunction hasPreviousAndNextKeys(res) {\n  if (!('next' in res.body)) throw new Error('missing next key');\n  if (!('prev' in res.body)) throw new Error('missing prev key');\n}",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: '.end(fn)',
      },
      {
        type: 'paragraph',
        text: 'Perform the request and invoke fn(err, res).',
      },
      {
        type: 'paragraph',
        text: 'Here is an example of using the set and not cookie assertions:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// setup super-test\nconst request = require('supertest');\nconst express = require('express');\nconst cookies = request.cookies;\n\n// setup express test service\nconst app = express();\n\napp.get('/users', function (req, res) {\n  res.cookie('alpha', 'one', { domain: 'domain.com', path: '/', httpOnly: true });\n  res.send(200, { name: 'tobi' });\n});\n\n// test request to service\nrequest(app)\n  .get('/users')\n  .expect('Content-Type', /json/)\n  .expect('Content-Length', '15')\n  .expect(200)\n  // assert 'alpha' cookie is set with domain, path, and httpOnly options\n  .expect(cookies.set({ name: 'alpha', options: ['domain', 'path', 'httponly'] }))\n  // assert 'bravo' cookie is NOT set\n  .expect(cookies.not('set', { name: 'bravo' }))\n  .end(function (err, res) {\n    if (err) {\n      throw err;\n    }\n  });",
        },
      },
      {
        type: 'paragraph',
        text: 'It is also possible to chain assertions:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "cookies.set({/* ... */}).not('set', {/* ... */});",
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Cookie assertions',
      },
      {
        type: 'paragraph',
        text: 'Functions and methods are chainable.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'cookies([secret], [asserts])',
      },
      {
        type: 'paragraph',
        text: 'Get assertion function for super-test .expect() method.',
      },
      {
        type: 'paragraph',
        text: 'Arguments',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'secret - String or array of strings. Cookie signature secrets.',
          'asserts(req, res) - Function or array of functions. Failed custom assertions should throw.',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: '.set(expects, [assert])',
      },
      {
        type: 'paragraph',
        text: 'Assert that cookie and options are set.',
      },
      {
        type: 'paragraph',
        text: 'Arguments',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'expects - Object or array of objects. - name - String name of cookie. - options - Optional array of options.',
          'assert - Optional boolean "assert true" modifier. Default: true.',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: '.reset(expects, [assert])',
      },
      {
        type: 'paragraph',
        text: 'Assert that cookie is set and was already set (in request headers).',
      },
      {
        type: 'paragraph',
        text: 'Arguments',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'expects - Object or array of objects. - name - String name of cookie.',
          'assert - Optional boolean "assert true" modifier. Default: true.',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: '.new(expects, [assert])',
      },
      {
        type: 'paragraph',
        text: 'Assert that cookie is set and was NOT already set (NOT in request headers).',
      },
      {
        type: 'paragraph',
        text: 'Arguments',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'expects - Object or array of objects. - name - String name of cookie.',
          'assert - Optional boolean "assert true" modifier. Default: true.',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: '.renew(expects, [assert])',
      },
      {
        type: 'paragraph',
        text: 'Assert that cookie is set with a strictly greater expires or max-age than the given value.',
      },
      {
        type: 'paragraph',
        text: 'Arguments',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'expects - Object or array of objects. - name - String name of cookie. - options - Object of options. use one of two options below - options.expires - String UTC expiration for original cookie (in request headers). - options.max-age - Integer ttl in seconds for original cookie (in request headers).',
          'assert - Optional boolean "assert true" modifier. Default: true.',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: '.contain(expects, [assert])',
      },
      {
        type: 'paragraph',
        text: 'Assert that cookie is set with value and contains options.',
      },
      {
        type: 'paragraph',
        text: 'Requires cookies(secret) initialization if cookie is signed.',
      },
      {
        type: 'paragraph',
        text: 'Arguments',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'expects - Object or array of objects. - name - String name of cookie. - value - Optional string unsigned value of cookie. - options - Optional object of options. - options.domain - Optional string domain. - options.path - Optional string path. - options.expires - Optional string UTC expiration. - options.max-age - Optional integer ttl, in seconds. - options.secure - Optional boolean secure flag. - options.httponly - Optional boolean httpOnly flag.',
          'assert - Optional boolean "assert true" modifier. Default: true.',
        ],
      },
      {
        type: 'subheading',
        level: 4,
        text: '.not(method, expects)',
      },
      {
        type: 'paragraph',
        text: 'Call any cookies assertion method with "assert true" modifier set to false.',
      },
      {
        type: 'paragraph',
        text: 'Syntactic sugar.',
      },
      {
        type: 'paragraph',
        text: 'Arguments',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'method - String method name. Arguments of method name apply in expects.',
          'expects - Object or array of objects. - name - String name of cookie. - value - Optional string unsigned value of cookie. - options - Optional object of options.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Inspired by api-easy minus vows coupling.',
      },
      {
        type: 'paragraph',
        text: 'MIT',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
