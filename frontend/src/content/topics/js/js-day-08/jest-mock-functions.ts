import type { ContentTopic } from '../../../types';

export const jestMockFunctionsTopics = {
  'jest-mock-functions': {
    id: 'jest-mock-functions',
    heading: 'Using a mock function​',
    blocks: [
      {
        type: 'paragraph',
        text: "Let's imagine we're testing an implementation of a function forEach, which invokes a callback for each item in a supplied array.",
      },
      {
        type: 'paragraph',
        text: 'forEach.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export function forEach(items, callback) {  for (const item of items) {    callback(item);  }}',
        },
      },
      {
        type: 'paragraph',
        text: "To test this function, we can use a mock function, and inspect the mock's state to ensure the callback is invoked as expected.",
      },
      {
        type: 'paragraph',
        text: 'forEach.test.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import {forEach} from './forEach';const mockCallback = jest.fn(x => 42 + x);test('forEach mock function', () => {  forEach([0, 1], mockCallback);  // The mock function was called twice  expect(mockCallback.mock.calls).toHaveLength(2);  // The first argument of the first call to the function was 0  expect(mockCallback.mock.calls[0][0]).toBe(0);  // The first argument of the second call to the function was 1  expect(mockCallback.mock.calls[1][0]).toBe(1);  // The return value of the first call to the function was 42  expect(mockCallback.mock.results[0].value).toBe(42);});",
        },
      },
      {
        type: 'paragraph',
        text: 'All mock functions have this special .mock property, which is where data about how the function has been called and what the function returned is kept. The .mock property also tracks the value of this for each call, so it is possible to inspect this as well:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const myMock1 = jest.fn();const a = new myMock1();console.log(myMock1.mock.instances);// > [ <a> ]const myMock2 = jest.fn();const b = {};const bound = myMock2.bind(b);bound();console.log(myMock2.mock.contexts);// > [ <b> ]',
        },
      },
      {
        type: 'paragraph',
        text: 'These mock members are very useful in tests to assert how these functions get called, instantiated, or what they returned:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// The function was called exactly onceexpect(someMockFunction.mock.calls).toHaveLength(1);// The first arg of the first call to the function was 'first arg'expect(someMockFunction.mock.calls[0][0]).toBe('first arg');// The second arg of the first call to the function was 'second arg'expect(someMockFunction.mock.calls[0][1]).toBe('second arg');// The return value of the first call to the function was 'return value'expect(someMockFunction.mock.results[0].value).toBe('return value');// The function was called with a certain `this` context: the `element` object.expect(someMockFunction.mock.contexts[0]).toBe(element);// This function was instantiated exactly twiceexpect(someMockFunction.mock.instances.length).toBe(2);// The object returned by the first instantiation of this function// had a `name` property whose value was set to 'test'expect(someMockFunction.mock.instances[0].name).toBe('test');// The first argument of the last call to the function was 'test'expect(someMockFunction.mock.lastCall[0]).toBe('test');",
        },
      },
      {
        type: 'paragraph',
        text: 'Mock functions can also be used to inject test values into your code during a test:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const myMock = jest.fn();console.log(myMock());// > undefinedmyMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);console.log(myMock(), myMock(), myMock(), myMock());// > 10, 'x', true, true",
        },
      },
      {
        type: 'paragraph',
        text: "Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const filterTestFn = jest.fn();// Make the mock return `true` for the first call,// and `false` for the second callfilterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);const result = [11, 12].filter(num => filterTestFn(num));console.log(result);// > [11]console.log(filterTestFn.mock.calls[0][0]); // 11console.log(filterTestFn.mock.calls[1][0]); // 12',
        },
      },
      {
        type: 'paragraph',
        text: "Most real-world examples actually involve getting ahold of a mock function on a dependent component and configuring that, but the technique is the same. In these cases, try to avoid the temptation to implement logic inside of any function that's not directly being tested.",
      },
      {
        type: 'paragraph',
        text: 'Suppose we have a class that fetches users from our API. The class uses axios to call the API then returns the data attribute which contains all the users:',
      },
      {
        type: 'paragraph',
        text: 'users.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import axios from 'axios';class Users {  static all() {    return axios.get('/users.json').then(resp => resp.data);  }}export default Users;",
        },
      },
      {
        type: 'paragraph',
        text: 'Now, in order to test this method without actually hitting the API (and thus creating slow and fragile tests), we can use the jest.mock(...) function to automatically mock the axios module.',
      },
      {
        type: 'paragraph',
        text: "Once we mock the module we can provide a mockResolvedValue for .get that returns the data we want our test to assert against. In effect, we are saying that we want axios.get('/users.json') to return a fake response.",
      },
      {
        type: 'paragraph',
        text: 'users.test.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import axios from 'axios';import Users from './users';jest.mock('axios');test('should fetch users', () => {  const users = [{name: 'Bob'}];  const resp = {data: users};  axios.get.mockResolvedValue(resp);  // or you could use the following depending on your use case:  // axios.get.mockImplementation(() => Promise.resolve(resp))  return Users.all().then(data => expect(data).toEqual(users));});",
        },
      },
      {
        type: 'paragraph',
        text: 'Subsets of a module can be mocked and the rest of the module can keep their actual implementation:',
      },
      {
        type: 'paragraph',
        text: 'foo-bar-baz.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "export const foo = 'foo';export const bar = () => 'bar';export default () => 'baz';",
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "//test.jsimport defaultExport, {bar, foo} from '../foo-bar-baz';jest.mock('../foo-bar-baz', () => {  const originalModule = jest.requireActual('../foo-bar-baz');  //Mock the default export and named export 'foo'  return {    __esModule: true,    ...originalModule,    default: jest.fn(() => 'mocked baz'),    foo: 'mocked foo',  };});test('should do a partial mock', () => {  const defaultExportResult = defaultExport();  expect(defaultExportResult).toBe('mocked baz');  expect(defaultExport).toHaveBeenCalled();  expect(foo).toBe('mocked foo');  expect(bar()).toBe('bar');});",
        },
      },
      {
        type: 'paragraph',
        text: "Still, there are cases where it's useful to go beyond the ability to specify return values and full-on replace the implementation of a mock function. This can be done with jest.fn or the mockImplementationOnce method on mock functions.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const myMockFn = jest.fn(cb => cb(null, true));myMockFn((err, val) => console.log(val));// > true',
        },
      },
      {
        type: 'paragraph',
        text: 'The mockImplementation method is useful when you need to define the default implementation of a mock function that is created from another module:',
      },
      {
        type: 'paragraph',
        text: 'foo.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'module.exports = function () {  // some implementation;};',
        },
      },
      {
        type: 'paragraph',
        text: 'test.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "jest.mock('../foo'); // this happens automatically with automockingconst foo = require('../foo');// foo is a mock functionfoo.mockImplementation(() => 42);foo();// > 42",
        },
      },
      {
        type: 'paragraph',
        text: 'When you need to recreate a complex behavior of a mock function such that multiple function calls produce different results, use the mockImplementationOnce method:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const myMockFn = jest  .fn()  .mockImplementationOnce(cb => cb(null, true))  .mockImplementationOnce(cb => cb(null, false));myMockFn((err, val) => console.log(val));// > truemyMockFn((err, val) => console.log(val));// > false',
        },
      },
      {
        type: 'paragraph',
        text: 'When the mocked function runs out of implementations defined with mockImplementationOnce, it will execute the default implementation set with jest.fn (if it is defined):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const myMockFn = jest  .fn(() => 'default')  .mockImplementationOnce(() => 'first call')  .mockImplementationOnce(() => 'second call');console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());// > 'first call', 'second call', 'default', 'default'",
        },
      },
      {
        type: 'paragraph',
        text: 'For cases where we have methods that are typically chained (and thus always need to return this), we have a sugary API to simplify this in the form of a .mockReturnThis() function that also sits on all mocks:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const myObj = {  myMethod: jest.fn().mockReturnThis(),};// is the same asconst otherObj = {  myMethod: jest.fn(function () {    return this;  }),};',
        },
      },
      {
        type: 'paragraph',
        text: "You can optionally provide a name for your mock functions, which will be displayed instead of 'jest.fn()' in the test error output. Use .mockName() if you want to be able to quickly identify the mock function reporting an error in your test output.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const myMockFn = jest  .fn()  .mockReturnValue('default')  .mockImplementation(scalar => 42 + scalar)  .mockName('add42');",
        },
      },
      {
        type: 'paragraph',
        text: "Finally, in order to make it less demanding to assert how mock functions have been called, we've added some custom matcher functions for you:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// The mock function was called at least onceexpect(mockFunc).toHaveBeenCalled();// The mock function was called at least once with the specified argsexpect(mockFunc).toHaveBeenCalledWith(arg1, arg2);// The last call to the mock function was called with the specified argsexpect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);// All calls and the name of the mock is written as a snapshotexpect(mockFunc).toMatchSnapshot();',
        },
      },
      {
        type: 'paragraph',
        text: "These matchers are sugar for common forms of inspecting the .mock property. You can always do this manually yourself if that's more to your taste or if you need to do something more specific:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "// The mock function was called at least onceexpect(mockFunc.mock.calls.length).toBeGreaterThan(0);// The mock function was called at least once with the specified argsexpect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);// The last call to the mock function was called with the specified argsexpect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([  arg1,  arg2,]);// The first arg of the last call to the mock function was `42`// (note that there is no sugar helper for this specific of an assertion)expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);// A snapshot will check that a mock was invoked the same number of times,// in the same order, with the same arguments. It will also assert on the name.expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);expect(mockFunc.getMockName()).toBe('a mock name');",
        },
      },
      {
        type: 'paragraph',
        text: 'For a complete list of matchers, check out the reference docs.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
