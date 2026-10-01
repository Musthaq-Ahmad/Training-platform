import type { ContentTopic } from '../../../types';

export const prismajestsetupteardownTopics = {
  prismajestsetupteardown: {
    id: 'prismajestsetupteardown',
    heading: 'Setup and Teardown',
    blocks: [
      {
        type: 'paragraph',
        text: 'Often while writing tests you have some setup work that needs to happen before tests run, and you have some finishing work that needs to happen after tests run. Jest provides helper functions to handle this.',
      },
      {
        type: 'paragraph',
        text: 'If you have some work you need to do repeatedly for many tests, you can use beforeEach and afterEach hooks.',
      },
      {
        type: 'paragraph',
        text: "For example, let's say that several tests interact with a database of cities. You have a method initializeCityDatabase() that must be called before each of these tests, and a method clearCityDatabase() that must be called after each of these tests. You can do this with:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "beforeEach(() => {\n  initializeCityDatabase();\n});\n\nafterEach(() => {\n  clearCityDatabase();\n});\n\ntest('city database has Vienna', () => {\n  expect(isCity('Vienna')).toBeTruthy();\n});\n\ntest('city database has San Juan', () => {\n  expect(isCity('San Juan')).toBeTruthy();\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'beforeEach and afterEach can handle asynchronous code in the same ways that tests can handle asynchronous code - they can either take a done parameter or return a promise. For example, if initializeCityDatabase() returned a promise that resolved when the database was initialized, we would want to return that promise:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'beforeEach(() => {\n  return initializeCityDatabase();\n});',
        },
      },
      {
        type: 'paragraph',
        text: "In some cases, you only need to do setup once, at the beginning of a file. This can be especially bothersome when the setup is asynchronous, so you can't do it inline. Jest provides beforeAll and afterAll hooks to handle this situation.",
      },
      {
        type: 'paragraph',
        text: 'For example, if both initializeCityDatabase() and clearCityDatabase() returned promises, and the city database could be reused between tests, we could change our test code to:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "beforeAll(() => {\n  return initializeCityDatabase();\n});\n\nafterAll(() => {\n  return clearCityDatabase();\n});\n\ntest('city database has Vienna', () => {\n  expect(isCity('Vienna')).toBeTruthy();\n});\n\ntest('city database has San Juan', () => {\n  expect(isCity('San Juan')).toBeTruthy();\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'The top level before* and after* hooks apply to every test in a file. The hooks declared inside a describe block apply only to the tests within that describe block.',
      },
      {
        type: 'paragraph',
        text: "For example, let's say we had not just a city database, but also a food database. We could do different setup for different tests:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "// Applies to all tests in this file\nbeforeEach(() => {\n  return initializeCityDatabase();\n});\n\ntest('city database has Vienna', () => {\n  expect(isCity('Vienna')).toBeTruthy();\n});\n\ntest('city database has San Juan', () => {\n  expect(isCity('San Juan')).toBeTruthy();\n});\n\ndescribe('matching cities to foods', () => {\n  // Applies only to tests in this describe block\n  beforeEach(() => {\n    return initializeFoodDatabase();\n  });\n\n  test('Vienna <3 veal', () => {\n    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);\n  });\n\n  test('San Juan <3 plantains', () => {\n    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);\n  });\n});",
        },
      },
      {
        type: 'paragraph',
        text: 'Note that the top-level beforeEach is executed before the beforeEach inside the describe block. It may help to illustrate the order of execution of all hooks.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "beforeAll(() => console.log('1 - beforeAll'));\nafterAll(() => console.log('1 - afterAll'));\nbeforeEach(() => console.log('1 - beforeEach'));\nafterEach(() => console.log('1 - afterEach'));\n\ntest('', () => console.log('1 - test'));\n\ndescribe('Scoped / Nested block', () => {\n  beforeAll(() => console.log('2 - beforeAll'));\n  afterAll(() => console.log('2 - afterAll'));\n  beforeEach(() => console.log('2 - beforeEach'));\n  afterEach(() => console.log('2 - afterEach'));\n\n  test('', () => console.log('2 - test'));\n});\n\n// 1 - beforeAll\n// 1 - beforeEach\n// 1 - test\n// 1 - afterEach\n// 2 - beforeAll\n// 1 - beforeEach\n// 2 - beforeEach\n// 2 - test\n// 2 - afterEach\n// 1 - afterEach\n// 2 - afterAll\n// 1 - afterAll",
        },
      },
      {
        type: 'paragraph',
        text: 'Jest executes all describe handlers in a test file before it executes any of the actual tests. This is another reason to do setup and teardown inside before* and after* handlers rather than inside the describe blocks. Once the describe blocks are complete, by default Jest runs all the tests serially in the order they were encountered in the collection phase, waiting for each to finish and be tidied up before moving on.',
      },
      {
        type: 'paragraph',
        text: 'Consider the following illustrative test file and output:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "describe('describe outer', () => {\n  console.log('describe outer-a');\n\n  describe('describe inner 1', () => {\n    console.log('describe inner 1');\n\n    test('test 1', () => console.log('test 1'));\n  });\n\n  console.log('describe outer-b');\n\n  test('test 2', () => console.log('test 2'));\n\n  describe('describe inner 2', () => {\n    console.log('describe inner 2');\n\n    test('test 3', () => console.log('test 3'));\n  });\n\n  console.log('describe outer-c');\n});\n\n// describe outer-a\n// describe inner 1\n// describe outer-b\n// describe inner 2\n// describe outer-c\n// test 1\n// test 2\n// test 3",
        },
      },
      {
        type: 'paragraph',
        text: 'Just like the describe and test blocks Jest calls the before* and after* hooks in the order of declaration. Note that the after* hooks of the enclosing scope are called first. For example, here is how you can set up and tear down resources which depend on each other:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "beforeEach(() => console.log('connection setup'));\nbeforeEach(() => console.log('database setup'));\n\nafterEach(() => console.log('database teardown'));\nafterEach(() => console.log('connection teardown'));\n\ntest('test 1', () => console.log('test 1'));\n\ndescribe('extra', () => {\n  beforeEach(() => console.log('extra database setup'));\n  afterEach(() => console.log('extra database teardown'));\n\n  test('test 2', () => console.log('test 2'));\n});\n\n// connection setup\n// database setup\n// test 1\n// database teardown\n// connection teardown\n\n// connection setup\n// database setup\n// extra database setup\n// test 2\n// extra database teardown\n// database teardown\n// connection teardown",
        },
      },
      {
        type: 'paragraph',
        text: 'note',
      },
      {
        type: 'paragraph',
        text: 'If you are using jasmine2 test runner, take into account that it calls the after* hooks in the reverse order of declaration. To have identical output, the above example should be altered like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: " beforeEach(() => console.log('connection setup'));\n\n afterEach(() => console.log('connection teardown'));\n\n beforeEach(() => console.log('database setup'));\n\n afterEach(() => console.log('database teardown'));\n\n afterEach(() => console.log('database teardown'));\n\n afterEach(() => console.log('connection teardown'));\n\n // ...",
        },
      },
      {
        type: 'paragraph',
        text: "If a test is failing, one of the first things to check should be whether the test is failing when it's the only test that runs. To run only one test with Jest, temporarily change that test command to a test.only:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "test.only('this will be the only test that runs', () => {\n  expect(true).toBe(false);\n});\n\ntest('this test will not run', () => {\n  expect('A').toBe('A');\n});",
        },
      },
      {
        type: 'paragraph',
        text: "If you have a test that often fails when it's run as part of a larger suite, but doesn't fail when you run it alone, it's a good bet that something from a different test is interfering with this one. You can often fix this by clearing some shared state with beforeEach. If you're not sure whether some shared state is being modified, you can also try a beforeEach that logs data.",
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
