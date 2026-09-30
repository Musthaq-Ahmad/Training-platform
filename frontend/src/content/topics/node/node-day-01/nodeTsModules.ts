import type { ContentTopic } from '../../../types';

export const nodetsmodulesTopics = {
  nodetsmodules: {
    id: 'nodetsmodules',
    heading: 'How JavaScript Modules are Defined',
    blocks: [
      {
        type: 'paragraph',
        text: 'In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module.',
      },
      {
        type: 'paragraph',
        text: 'Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).',
      },
      {
        type: 'paragraph',
        text: 'Modules are executed within their own scope, not in the global scope. This means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms. Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.',
      },
      {
        type: 'paragraph',
        text: 'Before we start, it’s important to understand what TypeScript considers a module. The JavaScript specification declares that any JavaScript files without an import declaration, export, or top-level await should be considered a script and not a module.',
      },
      {
        type: 'paragraph',
        text: 'Inside a script file variables and types are declared to be in the shared global scope, and it’s assumed that you’ll either use the outFile compiler option to join multiple input files into one output file, or use multiple <script> tags in your HTML to load these files (in the correct order!).',
      },
      {
        type: 'paragraph',
        text: 'If you have a file that doesn’t currently have any imports or exports, but you want to be treated as a module, add the line:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'export {};',
        },
      },
      {
        type: 'paragraph',
        text: 'which will change the file to be a module exporting nothing. This syntax works regardless of your module target.',
      },
      {
        type: 'paragraph',
        text: 'There are three main things to consider when writing module-based code in TypeScript:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Syntax: What syntax do I want to use to import and export things?',
          'Module Resolution: What is the relationship between module names (or paths) and files on disk?',
          'Module Output Target: What should my emitted JavaScript module look like?',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'ES Module Syntax',
      },
      {
        type: 'paragraph',
        text: 'A file can declare a main export via export default:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// @filename: hello.ts\nexport default function helloWorld() {\n  console.log("Hello, world!");\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This is then imported via:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import helloWorld from "./hello.js";\nhelloWorld();',
        },
      },
      {
        type: 'paragraph',
        text: 'In addition to the default export, you can have more than one export of variables and functions via the export by omitting default:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// @filename: maths.ts\nexport var pi = 3.14;\nexport let squareTwo = 1.41;\nexport const phi = 1.61;\n \nexport class RandomNumberGenerator {}\n \nexport function absolute(num: number) {\n  if (num < 0) return num * -1;\n  return num;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'These can be used in another file via the import syntax:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { pi, phi, absolute } from "./maths.js";\n \nconsole.log(pi);\nconst absPhi = absolute(phi);',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Additional Import Syntax',
      },
      {
        type: 'paragraph',
        text: 'An import can be renamed using a format like import {old as new}:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { pi as π } from "./maths.js";\n \nconsole.log(π);',
        },
      },
      {
        type: 'paragraph',
        text: 'You can mix and match the above syntax into a single import:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// @filename: maths.ts\nexport const pi = 3.14;\nexport default class RandomNumberGenerator {}\n \n// @filename: app.ts\nimport RandomNumberGenerator, { pi as π } from "./maths.js";\n \nRandomNumberGenerator;\n \nconsole.log(π);',
        },
      },
      {
        type: 'paragraph',
        text: 'You can take all of the exported objects and put them into a single namespace using * as name:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// @filename: app.ts\nimport * as math from "./maths.js";\n \nconsole.log(math.pi);\nconst positivePhi = math.absolute(math.phi);',
        },
      },
      {
        type: 'paragraph',
        text: 'You can import a file and not include any variables into your current module via import "./file":',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// @filename: app.ts\nimport "./maths.js";\n \nconsole.log("3.14");',
        },
      },
      {
        type: 'paragraph',
        text: 'In this case, the import does nothing. However, all of the code in maths.ts was evaluated, which could trigger side-effects which affect other objects.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'TypeScript Specific ES Module Syntax',
      },
      {
        type: 'paragraph',
        text: 'Types can be exported and imported using the same syntax as JavaScript values:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// @filename: animal.ts\nexport type Cat = { breed: string; yearOfBirth: number };\n \nexport interface Dog {\n  breeds: string[];\n  yearOfBirth: number;\n}\n \n// @filename: app.ts\nimport { Cat, Dog } from "./animal.js";\ntype Animals = Cat | Dog;',
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript has extended the import syntax with two concepts for declaring an import of a type:',
      },
      {
        type: 'subheading',
        level: 6,
        text: 'import type',
      },
      {
        type: 'paragraph',
        text: 'Which is an import statement which can only import types:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// @filename: animal.ts\nexport type Cat = { breed: string; yearOfBirth: number };\nexport type Dog = { breeds: string[]; yearOfBirth: number };\nexport const createCatName = () => "fluffy";\n \n// @filename: valid.ts\nimport type { Cat, Dog } from "./animal.js";\nexport type Animals = Cat | Dog;\n \n// @filename: app.ts\nimport type { createCatName } from "./animal.js";\nconst name = createCatName();',
        },
      },
      {
        type: 'subheading',
        level: 6,
        text: 'Inline type imports',
      },
      {
        type: 'paragraph',
        text: 'TypeScript 4.5 also allows for individual imports to be prefixed with type to indicate that the imported reference is a type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// @filename: app.ts\nimport { createCatName, type Cat, type Dog } from "./animal.js";\n \nexport type Animals = Cat | Dog;\nconst name = createCatName();',
        },
      },
      {
        type: 'paragraph',
        text: 'Together these allow a non-TypeScript transpiler like Babel, swc or esbuild to know what imports can be safely removed.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'ES Module Syntax with CommonJS Behavior',
      },
      {
        type: 'paragraph',
        text: 'TypeScript has ES Module syntax which directly correlates to a CommonJS and AMD require. Imports using ES Module are for most cases the same as the require from those environments, but this syntax ensures you have a 1 to 1 match in your TypeScript file with the CommonJS output:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import fs = require("fs");\nconst code = fs.readFileSync("hello.ts", "utf8");',
        },
      },
      {
        type: 'paragraph',
        text: 'You can learn more about this syntax in the modules reference page.',
      },
      {
        type: 'paragraph',
        text: 'CommonJS is the format which most modules on npm are delivered in. Even if you are writing using the ES Modules syntax above, having a brief understanding of how CommonJS syntax works will help you debug easier.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Exporting',
      },
      {
        type: 'paragraph',
        text: 'Identifiers are exported via setting the exports property on a global called module.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function absolute(num: number) {\n  if (num < 0) return num * -1;\n  return num;\n}\n \nmodule.exports = {\n  pi: 3.14,\n  squareTwo: 1.41,\n  phi: 1.61,\n  absolute,\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'Then these files can be imported via a require statement:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const maths = require("./maths");\nmaths.pi;',
        },
      },
      {
        type: 'paragraph',
        text: 'Or you can simplify a bit using the destructuring feature in JavaScript:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const { squareTwo } = require("./maths");\nsquareTwo;',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'CommonJS and ES Modules interop',
      },
      {
        type: 'paragraph',
        text: 'There is a mis-match in features between CommonJS and ES Modules regarding the distinction between a default import and a module namespace object import. TypeScript has a compiler flag to reduce the friction between the two different sets of constraints with esModuleInterop.',
      },
      {
        type: 'paragraph',
        text: 'Module resolution is the process of taking a string from the import or require statement, and determining what file that string refers to.',
      },
      {
        type: 'paragraph',
        text: 'TypeScript includes two resolution strategies: Classic and Node. Classic, the default when the compiler option module is not commonjs, is included for backwards compatibility. The Node strategy replicates how Node.js works in CommonJS mode, with additional checks for .ts and .d.ts.',
      },
      {
        type: 'paragraph',
        text: 'There are many TSConfig flags which influence the module strategy within TypeScript: moduleResolution, baseUrl, paths, rootDirs.',
      },
      {
        type: 'paragraph',
        text: 'For the full details on how these strategies work, you can consult the Module Resolution reference page.',
      },
      {
        type: 'paragraph',
        text: 'There are two options which affect the emitted JavaScript output:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'target which determines which JS features are downleveled (converted to run in older JavaScript runtimes) and which are left intact',
          'module which determines what code is used for modules to interact with each other',
        ],
      },
      {
        type: 'paragraph',
        text: 'Which target you use is determined by the features available in the JavaScript runtime you expect to run the TypeScript code in. That could be: the oldest web browser you support, the lowest version of Node.js you expect to run on or could come from unique constraints from your runtime - like Electron for example.',
      },
      {
        type: 'paragraph',
        text: 'All communication between modules happens via a module loader, the compiler option module determines which one is used. At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it.',
      },
      {
        type: 'paragraph',
        text: 'For example, here is a TypeScript file using ES Modules syntax, showcasing a few different options for module:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { valueOfPi } from "./constants.js";\n \nexport const twoPi = valueOfPi * 2;',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'ES2020',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { valueOfPi } from "./constants.js";\nexport const twoPi = valueOfPi * 2;\n ',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'CommonJS',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.twoPi = void 0;\nconst constants_js_1 = require("./constants.js");\nexports.twoPi = constants_js_1.valueOfPi * 2;\n ',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'UMD',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '(function (factory) {\n    if (typeof module === "object" && typeof module.exports === "object") {\n        var v = factory(require, exports);\n        if (v !== undefined) module.exports = v;\n    }\n    else if (typeof define === "function" && define.amd) {\n        define(["require", "exports", "./constants.js"], factory);\n    }\n})(function (require, exports) {\n    "use strict";\n    Object.defineProperty(exports, "__esModule", { value: true });\n    exports.twoPi = void 0;\n    const constants_js_1 = require("./constants.js");\n    exports.twoPi = constants_js_1.valueOfPi * 2;\n});\n ',
        },
      },
      {
        type: 'paragraph',
        text: 'You can see all of the available options and what their emitted JavaScript code looks like in the TSConfig Reference for module.',
      },
      {
        type: 'paragraph',
        text: 'TypeScript has its own module format called namespaces which pre-dates the ES Modules standard. This syntax has a lot of useful features for creating complex definition files, and still sees active use in DefinitelyTyped. While not deprecated, the majority of the features in namespaces exist in ES Modules and we recommend you use that to align with JavaScript’s direction. You can learn more about namespaces in the namespaces reference page.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
