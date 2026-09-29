Install Jest using your favorite package manager:

- npm
- Yarn
- pnpm
- Bun

```
npm install --save-dev jest
```

Let's get started by writing a test for a hypothetical function that adds two numbers. First, create a `sum.js` file:

```
function sum(a, b) {  return a + b;}module.exports = sum;
```

Then, create a file named `sum.test.js`. This will contain our actual test:

```
const sum = require('./sum');test('adds 1 + 2 to equal 3', () => {  expect(sum(1, 2)).toBe(3);});
```

Add the following section to your `package.json`:

```
{  "scripts": {    "test": "jest"  }}
```

Finally, run `yarn test` or `npm test` and Jest will print this message:

```
PASS  ./sum.test.js✓ adds 1 + 2 to equal 3 (5ms)
```

**You just successfully wrote your first test using Jest!**

This test used `expect` and `toBe` to test that two values were exactly identical. To learn about the other things that Jest can test, see [Using Matchers](https://jestjs.io/docs/using-matchers).

## Running from command line[​](#running-from-command-line 'Direct link to Running from command line')

You can run Jest directly from the CLI (if it's globally available in your `PATH`, e.g. by `yarn global add jest` or `npm install jest --global`) with a variety of useful options.

Here's how to run Jest on files matching `my-test`, using `config.json` as a configuration file and display a native OS notification after the run:

```
jest my-test --notify --config=config.json
```

If you'd like to learn more about running `jest` through the command line, take a look at the [Jest CLI Options](https://jestjs.io/docs/cli) page.

## Additional Configuration[​](#additional-configuration 'Direct link to Additional Configuration')

### Generate a basic configuration file[​](#generate-a-basic-configuration-file 'Direct link to Generate a basic configuration file')

Based on your project, Jest will ask you a few questions and will create a basic configuration file with a short description for each option:

- npm
- Yarn
- pnpm
- Bun

```
npm init jest@latest
```

### Using Babel[​](#using-babel 'Direct link to Using Babel')

To use [Babel](https://babeljs.io/), install required dependencies:

- npm
- Yarn
- pnpm
- Bun

```
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

Configure Babel to target your current version of Node by creating a `babel.config.js` file in the root of your project:

babel.config.js

```
module.exports = {  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],};
```

The ideal configuration for Babel will depend on your project. See [Babel's docs](https://babeljs.io/docs/en/) for more details.

**Making your Babel config jest-aware**

Jest will set `process.env.NODE_ENV` to `'test'` if it's not set to something else. You can use that in your configuration to conditionally setup only the compilation needed for Jest, e.g.

babel.config.js

```
module.exports = api => {  const isTest = api.env('test');  // You can use isTest to determine what presets and plugins to use.  return {    // ...  };};
```

note

`babel-jest` is automatically installed when installing Jest and will automatically transform files if a babel configuration exists in your project. To avoid this behavior, you can explicitly reset the `transform` configuration option:

jest.config.js

```
module.exports = {  transform: {},};
```

## Using with bundlers[​](#using-with-bundlers 'Direct link to Using with bundlers')

Most of the time you do not need to do anything special to work with different bundlers - the exception is if you have some plugin or configuration which generates files or have custom file resolution rules.

### Using webpack[​](#using-webpack 'Direct link to Using webpack')

Jest can be used in projects that use [webpack](https://webpack.js.org/) to manage assets, styles, and compilation. webpack does offer some unique challenges over other tools. Refer to the [webpack guide](https://jestjs.io/docs/webpack) to get started.

### Using Vite[​](#using-vite 'Direct link to Using Vite')

Jest is not supported by Vite due to incompatibilities with the Vite [plugin system](https://github.com/vitejs/vite/issues/1955#issuecomment-776009094).

There are examples for Jest integration with Vite in the [vite-jest](https://github.com/sodatea/vite-jest) library. However, this library is not compatible with versions of Vite later than 2.4.2.

One alternative is [Vitest](https://vitest.dev/) which has an API that is compatible with Jest.

### Using Parcel[​](#using-parcel 'Direct link to Using Parcel')

Jest can be used in projects that use [parcel-bundler](https://parceljs.org/) to manage assets, styles, and compilation similar to webpack. Parcel requires zero configuration. Refer to the official [docs](https://parceljs.org/docs/) to get started.

### Using TypeScript[​](#using-typescript 'Direct link to Using TypeScript')

#### Via `babel`[​](#via-babel 'Direct link to via-babel')

Jest supports TypeScript, via Babel. First, make sure you followed the instructions on [using Babel](#using-babel) above. Next, install the `@babel/preset-typescript`:

- npm
- Yarn
- pnpm
- Bun

```
npm install --save-dev @babel/preset-typescript
```

Then add `@babel/preset-typescript` to the list of presets in your `babel.config.js`.

babel.config.js

```
module.exports = {  presets: [    ['@babel/preset-env', {targets: {node: 'current'}}],    '@babel/preset-typescript',  ],};
```

However, there are some [caveats](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats) to using TypeScript with Babel. Because TypeScript support in Babel is purely transpilation, Jest will not type-check your tests as they are run. If you want that, you can use [ts-jest](https://github.com/kulshekhar/ts-jest) instead, or just run the TypeScript compiler [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html) separately (or as part of your build process).

#### Via `ts-jest`[​](#via-ts-jest 'Direct link to via-ts-jest')

[ts-jest](https://github.com/kulshekhar/ts-jest) is a TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.

- npm
- Yarn
- pnpm
- Bun

```
npm install --save-dev ts-jest
```

In order for Jest to transpile TypeScript with `ts-jest`, you may also need to create a [configuration](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation#jest-config-file) file.

#### Type definitions[​](#type-definitions 'Direct link to Type definitions')

There are two ways to have [Jest global APIs](https://jestjs.io/docs/api) typed for test files written in TypeScript.

You can use type definitions which ships with Jest and will update each time you update Jest. Install the `@jest/globals` package:

- npm
- Yarn
- pnpm
- Bun

```
npm install --save-dev @jest/globals
```

And import the APIs from it:

sum.test.ts

```
import {describe, expect, test} from '@jest/globals';import {sum} from './sum';describe('sum module', () => {  test('adds 1 + 2 to equal 3', () => {    expect(sum(1, 2)).toBe(3);  });});
```

Or you may choose to install the [`@types/jest`](https://npmjs.com/package/@types/jest) package. It provides types for Jest globals without a need to import them.

- npm
- Yarn
- pnpm
- Bun

```
npm install --save-dev @types/jest
```

info

`@types/jest` is a third party library maintained at [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jest), hence the latest Jest features or versions may not be covered yet. Try to match versions of Jest and `@types/jest` as closely as possible. For example, if you are using Jest `27.4.0` then installing `27.4.x` of `@types/jest` is ideal.

### Using ESLint[​](#using-eslint 'Direct link to Using ESLint')

Jest can be used with ESLint without any further configuration as long as you import the [Jest global helpers](https://jestjs.io/docs/api) (`describe`, `it`, etc.) from `@jest/globals` before using them in your test file. This is necessary to avoid `no-undef` errors from ESLint, which doesn't know about the Jest globals.

If you'd like to avoid these imports, you can configure your [ESLint environment](https://eslint.org/docs/latest/use/configure/language-options#specifying-environments) to support these globals by adding the `jest` environment:

```
import {defineConfig} from 'eslint/config';import globals from 'globals';export default defineConfig([  {    files: ['**/*.js'],    languageOptions: {      globals: {        ...globals.jest,      },    },    rules: {      'no-unused-vars': 'warn',      'no-undef': 'warn',    },  },]);
```

Or use [`eslint-plugin-jest`](https://github.com/jest-community/eslint-plugin-jest), which has a similar effect:

```
{  "overrides": [    {      "files": ["tests/**/*"],      "plugins": ["jest"],      "env": {        "jest/globals": true      }    }  ]}
```

---

Jest uses "matchers" to let you test values in different ways. This document will introduce some commonly used matchers. For the full list, see the [`expect` API doc](https://jestjs.io/docs/expect).

## Common Matchers[​](#common-matchers 'Direct link to Common Matchers')

The simplest way to test a value is with exact equality.

```
test('two plus two is four', () => {  expect(2 + 2).toBe(4);});
```

In this code, `expect(2 + 2)` returns an "expectation" object. You typically won't do much with these expectation objects except call matchers on them. In this code, `.toBe(4)` is the matcher. When Jest runs, it tracks all the failing matchers so that it can print out nice error messages for you.

`toBe` uses `Object.is` to test exact equality. If you want to check the value of an object, use `toEqual`:

```
test('object assignment', () => {  const data = {one: 1};  data['two'] = 2;  expect(data).toEqual({one: 1, two: 2});});
```

`toEqual` recursively checks every field of an object or array.

tip

`toEqual` ignores object keys with `undefined` properties, `undefined` array items, array sparseness, or object type mismatch. To take these into account use `toStrictEqual` instead.

You can also test for the opposite of a matcher using `not`:

```
test('adding positive numbers is not zero', () => {  for (let a = 1; a < 10; a++) {    for (let b = 1; b < 10; b++) {      expect(a + b).not.toBe(0);    }  }});
```

## Truthiness[​](#truthiness 'Direct link to Truthiness')

In tests, you sometimes need to distinguish between `undefined`, `null`, and `false`, but you sometimes do not want to treat these differently. Jest contains helpers that let you be explicit about what you want.

- `toBeNull` matches only `null`
- `toBeUndefined` matches only `undefined`
- `toBeDefined` is the opposite of `toBeUndefined`
- `toBeTruthy` matches anything that an `if` statement treats as true
- `toBeFalsy` matches anything that an `if` statement treats as false

For example:

```
test('null', () => {  const n = null;  expect(n).toBeNull();  expect(n).toBeDefined();  expect(n).not.toBeUndefined();  expect(n).not.toBeTruthy();  expect(n).toBeFalsy();});test('zero', () => {  const z = 0;  expect(z).not.toBeNull();  expect(z).toBeDefined();  expect(z).not.toBeUndefined();  expect(z).not.toBeTruthy();  expect(z).toBeFalsy();});
```

You should use the matcher that most precisely corresponds to what you want your code to be doing.

## Numbers[​](#numbers 'Direct link to Numbers')

Most ways of comparing numbers have matcher equivalents.

```
test('two plus two', () => {  const value = 2 + 2;  expect(value).toBeGreaterThan(3);  expect(value).toBeGreaterThanOrEqual(3.5);  expect(value).toBeLessThan(5);  expect(value).toBeLessThanOrEqual(4.5);  // toBe and toEqual are equivalent for numbers  expect(value).toBe(4);  expect(value).toEqual(4);});
```

For floating point equality, use `toBeCloseTo` instead of `toEqual`, because you don't want a test to depend on a tiny rounding error.

```
test('adding floating point numbers', () => {  const value = 0.1 + 0.2;  //expect(value).toBe(0.3);           This won't work because of rounding error  expect(value).toBeCloseTo(0.3); // This works.});
```

## Strings[​](#strings 'Direct link to Strings')

You can check strings against regular expressions with `toMatch`:

```
test('there is no I in team', () => {  expect('team').not.toMatch(/I/);});test('but there is a "stop" in Christoph', () => {  expect('Christoph').toMatch(/stop/);});
```

## Arrays and iterables[​](#arrays-and-iterables 'Direct link to Arrays and iterables')

You can check if an array or iterable contains a particular item using `toContain`:

```
const shoppingList = [  'diapers',  'kleenex',  'trash bags',  'paper towels',  'milk',];test('the shopping list has milk on it', () => {  expect(shoppingList).toContain('milk');  expect(new Set(shoppingList)).toContain('milk');});
```

## Exceptions[​](#exceptions 'Direct link to Exceptions')

If you want to test whether a particular function throws an error when it's called, use `toThrow`.

```
function compileAndroidCode() {  throw new Error('you are using the wrong JDK!');}test('compiling android goes as expected', () => {  expect(() => compileAndroidCode()).toThrow();  expect(() => compileAndroidCode()).toThrow(Error);  // You can also use a string that must be contained in the error message or a regexp  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');  expect(() => compileAndroidCode()).toThrow(/JDK/);  // Or you can match an exact error message using a regexp like below  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass});
```

tip

The function that throws an exception needs to be invoked within a wrapping function otherwise the `toThrow` assertion will fail.

## And More[​](#and-more 'Direct link to And More')

This is just a taste. For a complete list of matchers, check out the [reference docs](https://jestjs.io/docs/expect).

Once you've learned about the matchers that are available, a good next step is to check out how Jest lets you [test asynchronous code](https://jestjs.io/docs/asynchronous).
