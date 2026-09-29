import type { ContentTopic } from '../../../types';

export const jestGettingStartedTopics = {
  'jest-getting-started': {
    id: 'jest-getting-started',
    heading: 'Running from command line​',
    blocks: [
      {
        type: 'paragraph',
        text: "You can run Jest directly from the CLI (if it's globally available in your PATH, e.g. by yarn global add jest or npm install jest --global) with a variety of useful options.",
      },
      {
        type: 'paragraph',
        text: "Here's how to run Jest on files matching my-test, using config.json as a configuration file and display a native OS notification after the run:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest my-test --notify --config=config.json',
        },
      },
      {
        type: 'paragraph',
        text: "If you'd like to learn more about running jest through the command line, take a look at the Jest CLI Options page.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Generate a basic configuration file​',
      },
      {
        type: 'paragraph',
        text: 'Based on your project, Jest will ask you a few questions and will create a basic configuration file with a short description for each option:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['npm', 'Yarn', 'pnpm', 'Bun'],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'npm init jest@latest',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Using Babel​',
      },
      {
        type: 'paragraph',
        text: 'To use Babel, install required dependencies:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['npm', 'Yarn', 'pnpm', 'Bun'],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'npm install --save-dev babel-jest @babel/core @babel/preset-env',
        },
      },
      {
        type: 'paragraph',
        text: 'Configure Babel to target your current version of Node by creating a babel.config.js file in the root of your project:',
      },
      {
        type: 'paragraph',
        text: 'babel.config.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "module.exports = {  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],};",
        },
      },
      {
        type: 'paragraph',
        text: "The ideal configuration for Babel will depend on your project. See Babel's docs for more details.",
      },
      {
        type: 'paragraph',
        text: 'Making your Babel config jest-aware',
      },
      {
        type: 'paragraph',
        text: "Jest will set process.env.NODE_ENV to 'test' if it's not set to something else. You can use that in your configuration to conditionally setup only the compilation needed for Jest, e.g.",
      },
      {
        type: 'paragraph',
        text: 'babel.config.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "module.exports = api => {  const isTest = api.env('test');  // You can use isTest to determine what presets and plugins to use.  return {    // ...  };};",
        },
      },
      {
        type: 'paragraph',
        text: 'note',
      },
      {
        type: 'paragraph',
        text: 'babel-jest is automatically installed when installing Jest and will automatically transform files if a babel configuration exists in your project. To avoid this behavior, you can explicitly reset the transform configuration option:',
      },
      {
        type: 'paragraph',
        text: 'jest.config.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'module.exports = {  transform: {},};',
        },
      },
      {
        type: 'paragraph',
        text: 'Most of the time you do not need to do anything special to work with different bundlers - the exception is if you have some plugin or configuration which generates files or have custom file resolution rules.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Using webpack​',
      },
      {
        type: 'paragraph',
        text: 'Jest can be used in projects that use webpack to manage assets, styles, and compilation. webpack does offer some unique challenges over other tools. Refer to the webpack guide to get started.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Using Vite​',
      },
      {
        type: 'paragraph',
        text: 'Jest is not supported by Vite due to incompatibilities with the Vite plugin system.',
      },
      {
        type: 'paragraph',
        text: 'There are examples for Jest integration with Vite in the vite-jest library. However, this library is not compatible with versions of Vite later than 2.4.2.',
      },
      {
        type: 'paragraph',
        text: 'One alternative is Vitest which has an API that is compatible with Jest.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Using Parcel​',
      },
      {
        type: 'paragraph',
        text: 'Jest can be used in projects that use parcel-bundler to manage assets, styles, and compilation similar to webpack. Parcel requires zero configuration. Refer to the official docs to get started.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Using TypeScript​',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Via babel​',
      },
      {
        type: 'paragraph',
        text: 'Jest supports TypeScript, via Babel. First, make sure you followed the instructions on using Babel above. Next, install the @babel/preset-typescript:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['npm', 'Yarn', 'pnpm', 'Bun'],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'npm install --save-dev @babel/preset-typescript',
        },
      },
      {
        type: 'paragraph',
        text: 'Then add @babel/preset-typescript to the list of presets in your babel.config.js.',
      },
      {
        type: 'paragraph',
        text: 'babel.config.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "module.exports = {  presets: [    ['@babel/preset-env', {targets: {node: 'current'}}],    '@babel/preset-typescript',  ],};",
        },
      },
      {
        type: 'paragraph',
        text: 'However, there are some caveats to using TypeScript with Babel. Because TypeScript support in Babel is purely transpilation, Jest will not type-check your tests as they are run. If you want that, you can use ts-jest instead, or just run the TypeScript compiler tsc separately (or as part of your build process).',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Via ts-jest​',
      },
      {
        type: 'paragraph',
        text: 'ts-jest is a TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.',
      },
      {
        type: 'list',
        ordered: false,
        items: ['npm', 'Yarn', 'pnpm', 'Bun'],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'npm install --save-dev ts-jest',
        },
      },
      {
        type: 'paragraph',
        text: 'In order for Jest to transpile TypeScript with ts-jest, you may also need to create a configuration file.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Type definitions​',
      },
      {
        type: 'paragraph',
        text: 'There are two ways to have Jest global APIs typed for test files written in TypeScript.',
      },
      {
        type: 'paragraph',
        text: 'You can use type definitions which ships with Jest and will update each time you update Jest. Install the @jest/globals package:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['npm', 'Yarn', 'pnpm', 'Bun'],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'npm install --save-dev @jest/globals',
        },
      },
      {
        type: 'paragraph',
        text: 'And import the APIs from it:',
      },
      {
        type: 'paragraph',
        text: 'sum.test.ts',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import {describe, expect, test} from '@jest/globals';import {sum} from './sum';describe('sum module', () => {  test('adds 1 + 2 to equal 3', () => {    expect(sum(1, 2)).toBe(3);  });});",
        },
      },
      {
        type: 'paragraph',
        text: 'Or you may choose to install the @types/jest package. It provides types for Jest globals without a need to import them.',
      },
      {
        type: 'list',
        ordered: false,
        items: ['npm', 'Yarn', 'pnpm', 'Bun'],
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'npm install --save-dev @types/jest',
        },
      },
      {
        type: 'paragraph',
        text: 'info',
      },
      {
        type: 'paragraph',
        text: '@types/jest is a third party library maintained at DefinitelyTyped, hence the latest Jest features or versions may not be covered yet. Try to match versions of Jest and @types/jest as closely as possible. For example, if you are using Jest 27.4.0 then installing 27.4.x of @types/jest is ideal.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Using ESLint​',
      },
      {
        type: 'paragraph',
        text: "Jest can be used with ESLint without any further configuration as long as you import the Jest global helpers (describe, it, etc.) from @jest/globals before using them in your test file. This is necessary to avoid no-undef errors from ESLint, which doesn't know about the Jest globals.",
      },
      {
        type: 'paragraph',
        text: "If you'd like to avoid these imports, you can configure your ESLint environment to support these globals by adding the jest environment:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import {defineConfig} from 'eslint/config';import globals from 'globals';export default defineConfig([  {    files: ['**/*.js'],    languageOptions: {      globals: {        ...globals.jest,      },    },    rules: {      'no-unused-vars': 'warn',      'no-undef': 'warn',    },  },]);",
        },
      },
      {
        type: 'paragraph',
        text: 'Or use eslint-plugin-jest, which has a similar effect:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{  "overrides": [    {      "files": ["tests/**/*"],      "plugins": ["jest"],      "env": {        "jest/globals": true      }    }  ]}',
        },
      },
      {
        type: 'paragraph',
        text: 'Jest uses "matchers" to let you test values in different ways. This document will introduce some commonly used matchers. For the full list, see the expect API doc.',
      },
      {
        type: 'paragraph',
        text: 'The simplest way to test a value is with exact equality.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "test('two plus two is four', () => {  expect(2 + 2).toBe(4);});",
        },
      },
      {
        type: 'paragraph',
        text: 'In this code, expect(2 + 2) returns an "expectation" object. You typically won\'t do much with these expectation objects except call matchers on them. In this code, .toBe(4) is the matcher. When Jest runs, it tracks all the failing matchers so that it can print out nice error messages for you.',
      },
      {
        type: 'paragraph',
        text: 'toBe uses Object.is to test exact equality. If you want to check the value of an object, use toEqual:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "test('object assignment', () => {  const data = {one: 1};  data['two'] = 2;  expect(data).toEqual({one: 1, two: 2});});",
        },
      },
      {
        type: 'paragraph',
        text: 'toEqual recursively checks every field of an object or array.',
      },
      {
        type: 'paragraph',
        text: 'tip',
      },
      {
        type: 'paragraph',
        text: 'toEqual ignores object keys with undefined properties, undefined array items, array sparseness, or object type mismatch. To take these into account use toStrictEqual instead.',
      },
      {
        type: 'paragraph',
        text: 'You can also test for the opposite of a matcher using not:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "test('adding positive numbers is not zero', () => {  for (let a = 1; a < 10; a++) {    for (let b = 1; b < 10; b++) {      expect(a + b).not.toBe(0);    }  }});",
        },
      },
      {
        type: 'paragraph',
        text: 'In tests, you sometimes need to distinguish between undefined, null, and false, but you sometimes do not want to treat these differently. Jest contains helpers that let you be explicit about what you want.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'toBeNull matches only null',
          'toBeUndefined matches only undefined',
          'toBeDefined is the opposite of toBeUndefined',
          'toBeTruthy matches anything that an if statement treats as true',
          'toBeFalsy matches anything that an if statement treats as false',
        ],
      },
      {
        type: 'paragraph',
        text: 'For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "test('null', () => {  const n = null;  expect(n).toBeNull();  expect(n).toBeDefined();  expect(n).not.toBeUndefined();  expect(n).not.toBeTruthy();  expect(n).toBeFalsy();});test('zero', () => {  const z = 0;  expect(z).not.toBeNull();  expect(z).toBeDefined();  expect(z).not.toBeUndefined();  expect(z).not.toBeTruthy();  expect(z).toBeFalsy();});",
        },
      },
      {
        type: 'paragraph',
        text: 'You should use the matcher that most precisely corresponds to what you want your code to be doing.',
      },
      {
        type: 'paragraph',
        text: 'Most ways of comparing numbers have matcher equivalents.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "test('two plus two', () => {  const value = 2 + 2;  expect(value).toBeGreaterThan(3);  expect(value).toBeGreaterThanOrEqual(3.5);  expect(value).toBeLessThan(5);  expect(value).toBeLessThanOrEqual(4.5);  // toBe and toEqual are equivalent for numbers  expect(value).toBe(4);  expect(value).toEqual(4);});",
        },
      },
      {
        type: 'paragraph',
        text: "For floating point equality, use toBeCloseTo instead of toEqual, because you don't want a test to depend on a tiny rounding error.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "test('adding floating point numbers', () => {  const value = 0.1 + 0.2;  //expect(value).toBe(0.3);           This won't work because of rounding error  expect(value).toBeCloseTo(0.3); // This works.});",
        },
      },
      {
        type: 'paragraph',
        text: 'You can check strings against regular expressions with toMatch:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "test('there is no I in team', () => {  expect('team').not.toMatch(/I/);});test('but there is a \"stop\" in Christoph', () => {  expect('Christoph').toMatch(/stop/);});",
        },
      },
      {
        type: 'paragraph',
        text: 'You can check if an array or iterable contains a particular item using toContain:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "const shoppingList = [  'diapers',  'kleenex',  'trash bags',  'paper towels',  'milk',];test('the shopping list has milk on it', () => {  expect(shoppingList).toContain('milk');  expect(new Set(shoppingList)).toContain('milk');});",
        },
      },
      {
        type: 'paragraph',
        text: "If you want to test whether a particular function throws an error when it's called, use toThrow.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "function compileAndroidCode() {  throw new Error('you are using the wrong JDK!');}test('compiling android goes as expected', () => {  expect(() => compileAndroidCode()).toThrow();  expect(() => compileAndroidCode()).toThrow(Error);  // You can also use a string that must be contained in the error message or a regexp  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');  expect(() => compileAndroidCode()).toThrow(/JDK/);  // Or you can match an exact error message using a regexp like below  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass});",
        },
      },
      {
        type: 'paragraph',
        text: 'tip',
      },
      {
        type: 'paragraph',
        text: 'The function that throws an exception needs to be invoked within a wrapping function otherwise the toThrow assertion will fail.',
      },
      {
        type: 'paragraph',
        text: 'This is just a taste. For a complete list of matchers, check out the reference docs.',
      },
      {
        type: 'paragraph',
        text: "Once you've learned about the matchers that are available, a good next step is to check out how Jest lets you test asynchronous code.",
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
