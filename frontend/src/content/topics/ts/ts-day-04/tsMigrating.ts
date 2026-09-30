import type { ContentTopic } from '../../../types';

export const tsmigratingTopics = {
  tsmigrating: {
    id: 'tsmigrating',
    heading: 'Setting up your Directories',
    blocks: [
      {
        type: 'paragraph',
        text: 'If you’re writing in plain JavaScript, it’s likely that you’re running your JavaScript directly, where your .js files are in a src, lib, or dist directory, and then run as desired.',
      },
      {
        type: 'paragraph',
        text: 'If that’s the case, the files that you’ve written are going to be used as inputs to TypeScript, and you’ll run the outputs it produces. During our JS to TS migration, we’ll need to separate our input files to prevent TypeScript from overwriting them. If your output files need to reside in a specific directory, then that will be your output directory.',
      },
      {
        type: 'paragraph',
        text: 'You might also be running some intermediate steps on your JavaScript, such as bundling or using another transpiler like Babel. In this case, you might already have a folder structure like this set up.',
      },
      {
        type: 'paragraph',
        text: 'From this point on, we’re going to assume that your directory is set up something like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'projectRoot\n├── src\n│   ├── file1.js\n│   └── file2.js\n├── built\n└── tsconfig.json',
        },
      },
      {
        type: 'paragraph',
        text: 'If you have a tests folder outside of your src directory, you might have one tsconfig.json in src, and one in tests as well.',
      },
      {
        type: 'paragraph',
        text: 'TypeScript uses a file called tsconfig.json for managing your project’s options, such as which files you want to include, and what sorts of checking you want to perform. Let’s create a bare-bones one for our project:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '{\n  "compilerOptions": {\n    "outDir": "./built",\n    "allowJs": true,\n    "target": "es5"\n  },\n  "include": ["./src/**/*"]\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Here we’re specifying a few things to TypeScript:',
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'Read in any files it understands in the src directory (with include).',
          'Accept JavaScript files as inputs (with allowJs).',
          'Emit all of the output files in built (with outDir).',
          'Translate newer JavaScript constructs down to an older version like ECMAScript 5 (using target).',
        ],
      },
      {
        type: 'paragraph',
        text: 'At this point, if you try running tsc at the root of your project, you should see output files in the built directory. The layout of files in built should look identical to the layout of src. You should now have TypeScript working with your project.',
      },
      {
        type: 'paragraph',
        text: 'Even at this point you can get some great benefits from TypeScript understanding your project. If you open up an editor like VS Code or Visual Studio, you’ll see that you can often get some tooling support like completion. You can also catch certain bugs with options like:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'noImplicitReturns which prevents you from forgetting to return at the end of a function.',
          'noFallthroughCasesInSwitch which is helpful if you never want to forget a break statement between cases in a switch block.',
        ],
      },
      {
        type: 'paragraph',
        text: 'TypeScript will also warn about unreachable code and labels, which you can disable with allowUnreachableCode and allowUnusedLabels respectively.',
      },
      {
        type: 'paragraph',
        text: 'You might have some more build steps in your pipeline. Perhaps you concatenate something to each of your files. Each build tool is different, but we’ll do our best to cover the gist of things.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Gulp',
      },
      {
        type: 'paragraph',
        text: 'If you’re using Gulp in some fashion, we have a tutorial on using Gulp with TypeScript, and integrating with common build tools like Browserify, Babelify, and Uglify. You can read more there.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Webpack',
      },
      {
        type: 'paragraph',
        text: 'Webpack integration is pretty simple. You can use ts-loader, a TypeScript loader, combined with source-map-loader for easier debugging. Simply run',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'npm install ts-loader source-map-loader',
        },
      },
      {
        type: 'paragraph',
        text: 'and merge in options from the following into your webpack.config.js file:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'module.exports = {\n  entry: "./src/index.ts",\n  output: {\n    filename: "./dist/bundle.js",\n  },\n\n  // Enable sourcemaps for debugging webpack\'s output.\n  devtool: "source-map",\n\n  resolve: {\n    // Add \'.ts\' and \'.tsx\' as resolvable extensions.\n    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],\n  },\n\n  module: {\n    rules: [\n      // All files with a \'.ts\' or \'.tsx\' extension will be handled by \'ts-loader\'.\n      { test: /\\.tsx?$/, loader: "ts-loader" },\n\n      // All output \'.js\' files will have any sourcemaps re-processed by \'source-map-loader\'.\n      { test: /\\.js$/, loader: "source-map-loader" },\n    ],\n  },\n\n  // Other options...\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'It’s important to note that ts-loader will need to run before any other loader that deals with .js files.',
      },
      {
        type: 'paragraph',
        text: 'You can see an example of using Webpack in our tutorial on React and Webpack.',
      },
      {
        type: 'paragraph',
        text: 'At this point, you’re probably ready to start using TypeScript files. The first step is to rename one of your .js files to .ts. If your file uses JSX, you’ll need to rename it to .tsx.',
      },
      {
        type: 'paragraph',
        text: 'Finished with that step? Great! You’ve successfully migrated a file from JavaScript to TypeScript!',
      },
      {
        type: 'paragraph',
        text: 'Of course, that might not feel right. If you open that file in an editor with TypeScript support (or if you run tsc --pretty), you might see red squiggles on certain lines. You should think of these the same way you’d think of red squiggles in an editor like Microsoft Word. TypeScript will still translate your code, just like Word will still let you print your documents.',
      },
      {
        type: 'paragraph',
        text: 'If that sounds too lax for you, you can tighten that behavior up. If, for instance, you don’t want TypeScript to compile to JavaScript in the face of errors, you can use the noEmitOnError option. In that sense, TypeScript has a dial on its strictness, and you can turn that knob up as high as you want.',
      },
      {
        type: 'paragraph',
        text: 'If you plan on using the stricter settings that are available, it’s best to turn them on now (see Getting Stricter Checks below). For instance, if you never want TypeScript to silently infer any for a type without you explicitly saying so, you can use noImplicitAny before you start modifying your files. While it might feel somewhat overwhelming, the long-term gains become apparent much more quickly.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Weeding out Errors',
      },
      {
        type: 'paragraph',
        text: 'Like we mentioned, it’s not unexpected to get error messages after conversion. The important thing is to actually go one by one through these and decide how to deal with the errors. Often these will be legitimate bugs, but sometimes you’ll have to explain what you’re trying to do a little better to TypeScript.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Importing from Modules',
      },
      {
        type: 'paragraph',
        text: "You might start out getting a bunch of errors like Cannot find name 'require'., and Cannot find name 'define'.. In these cases, it’s likely that you’re using modules. While you can just convince TypeScript that these exist by writing out",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// For Node/CommonJS\ndeclare function require(path: string): any;',
        },
      },
      {
        type: 'paragraph',
        text: 'or',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: '// For RequireJS/AMD\ndeclare function define(...args: any[]): any;',
        },
      },
      {
        type: 'paragraph',
        text: 'it’s better to get rid of those calls and use TypeScript syntax for imports.',
      },
      {
        type: 'paragraph',
        text: 'First, you’ll need to enable some module system by setting TypeScript’s module option. Valid options are commonjs, amd, system, and umd.',
      },
      {
        type: 'paragraph',
        text: 'If you had the following Node/CommonJS code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'var foo = require("foo");\n\nfoo.doStuff();',
        },
      },
      {
        type: 'paragraph',
        text: 'or the following RequireJS/AMD code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'define(["foo"], function (foo) {\n  foo.doStuff();\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'then you would write the following TypeScript code:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'import foo = require("foo");\n\nfoo.doStuff();',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Getting Declaration Files',
      },
      {
        type: 'paragraph',
        text: "If you started converting over to TypeScript imports, you’ll probably run into errors like Cannot find module 'foo'.. The issue here is that you likely don’t have declaration files to describe your library. Luckily this is pretty easy. If TypeScript complains about a package like lodash, you can just write",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'npm install -S @types/lodash',
        },
      },
      {
        type: 'paragraph',
        text: 'If you’re using a module option other than commonjs, you’ll need to set your moduleResolution option to node.',
      },
      {
        type: 'paragraph',
        text: 'After that, you’ll be able to import lodash with no issues, and get accurate completions.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Exporting from Modules',
      },
      {
        type: 'paragraph',
        text: 'Typically, exporting from a module involves adding properties to a value like exports or module.exports. TypeScript allows you to use top-level export statements. For instance, if you exported a function like so:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'module.exports.feedPets = function (pets) {\n  // ...\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'you could write that out as the following:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'export function feedPets(pets) {\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Sometimes you’ll entirely overwrite the exports object. This is a common pattern people use to make their modules immediately callable like in this snippet:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'var express = require("express");\nvar app = express();',
        },
      },
      {
        type: 'paragraph',
        text: 'You might have previously written that like so:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function foo() {\n  // ...\n}\nmodule.exports = foo;',
        },
      },
      {
        type: 'paragraph',
        text: 'In TypeScript, you can model this with the export = construct.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function foo() {\n  // ...\n}\nexport = foo;',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Too many/too few arguments',
      },
      {
        type: 'paragraph',
        text: 'You’ll sometimes find yourself calling a function with too many/few arguments. Typically, this is a bug, but in some cases, you might have declared a function that uses the arguments object instead of writing out any parameters:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function myCoolFunction() {\n  if (arguments.length == 2 && !Array.isArray(arguments[1])) {\n    var f = arguments[0];\n    var arr = arguments[1];\n    // ...\n  }\n  // ...\n}\n\nmyCoolFunction(\n  function (x) {\n    console.log(x);\n  },\n  [1, 2, 3, 4]\n);\nmyCoolFunction(\n  function (x) {\n    console.log(x);\n  },\n  1,\n  2,\n  3,\n  4\n);',
        },
      },
      {
        type: 'paragraph',
        text: 'In this case, we need to use TypeScript to tell any of our callers about the ways myCoolFunction can be called using function overloads.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'function myCoolFunction(f: (x: number) => void, nums: number[]): void;\nfunction myCoolFunction(f: (x: number) => void, ...nums: number[]): void;\nfunction myCoolFunction() {\n  if (arguments.length == 2 && !Array.isArray(arguments[1])) {\n    var f = arguments[0];\n    var arr = arguments[1];\n    // ...\n  }\n  // ...\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'We added two overload signatures to myCoolFunction. The first checks states that myCoolFunction takes a function (which takes a number), and then a list of numbers. The second one says that it will take a function as well, and then uses a rest parameter (...nums) to state that any number of arguments after that need to be numbers.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Sequentially Added Properties',
      },
      {
        type: 'paragraph',
        text: 'Some people find it more aesthetically pleasing to create an object and add properties immediately after like so:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'var options = {};\noptions.color = "red";\noptions.volume = 11;',
        },
      },
      {
        type: 'paragraph',
        text: 'TypeScript will say that you can’t assign to color and volume because it first figured out the type of options as {} which doesn’t have any properties. If you instead moved the declarations into the object literal themselves, you’d get no errors:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'let options = {\n  color: "red",\n  volume: 11,\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'You could also define the type of options and add a type assertion on the object literal.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'interface Options {\n  color: string;\n  volume: number;\n}\n\nlet options = {} as Options;\noptions.color = "red";\noptions.volume = 11;',
        },
      },
      {
        type: 'paragraph',
        text: 'Alternatively, you can just say options has the type any which is the easiest thing to do, but which will benefit you the least.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'any, Object, and {}',
      },
      {
        type: 'paragraph',
        text: 'You might be tempted to use Object or {} to say that a value can have any property on it because Object is, for most purposes, the most general type. However any is actually the type you want to use in those situations, since it’s the most flexible type.',
      },
      {
        type: 'paragraph',
        text: 'For instance, if you have something that’s typed as Object you won’t be able to call methods like toLowerCase() on it. Being more general usually means you can do less with a type, but any is special in that it is the most general type while still allowing you to do anything with it. That means you can call it, construct it, access properties on it, etc. Keep in mind though, whenever you use any, you lose out on most of the error checking and editor support that TypeScript gives you.',
      },
      {
        type: 'paragraph',
        text: 'If a decision ever comes down to Object and {}, you should prefer {}. While they are mostly the same, technically {} is a more general type than Object in certain esoteric cases.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Getting Stricter Checks',
      },
      {
        type: 'paragraph',
        text: 'TypeScript comes with certain checks to give you more safety and analysis of your program. Once you’ve converted your codebase to TypeScript, you can start enabling these checks for greater safety.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'No Implicit any',
      },
      {
        type: 'paragraph',
        text: 'There are certain cases where TypeScript can’t figure out what certain types should be. To be as lenient as possible, it will decide to use the type any in its place. While this is great for migration, using any means that you’re not getting any type safety, and you won’t get the same tooling support you’d get elsewhere. You can tell TypeScript to flag these locations down and give an error with the noImplicitAny option.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Strict null & undefined Checks',
      },
      {
        type: 'paragraph',
        text: 'By default, TypeScript assumes that null and undefined are in the domain of every type. That means anything declared with the type number could be null or undefined. Since null and undefined are such a frequent source of bugs in JavaScript and TypeScript, TypeScript has the strictNullChecks option to spare you the stress of worrying about these issues.',
      },
      {
        type: 'paragraph',
        text: 'When strictNullChecks is enabled, null and undefined get their own types called null and undefined respectively. Whenever anything is possibly null, you can use a union type with the original type. So for instance, if something could be a number or null, you’d write the type out as number | null.',
      },
      {
        type: 'paragraph',
        text: 'If you ever have a value that TypeScript thinks is possibly null/undefined, but you know better, you can use the postfix ! operator to tell it otherwise.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: "declare var foo: string[] | null;\n\nfoo.length; // error - 'foo' is possibly 'null'\n\nfoo!.length; // okay - 'foo!' just has type 'string[]'",
        },
      },
      {
        type: 'paragraph',
        text: 'As a heads up, when using strictNullChecks, your dependencies may need to be updated to use strictNullChecks as well.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'No Implicit any for this',
      },
      {
        type: 'paragraph',
        text: 'When you use the this keyword outside of classes, it has the type any by default. For instance, imagine a Point class, and imagine a function that we wish to add as a method:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'class Point {\n  constructor(public x, public y) {}\n  getDistance(p: Point) {\n    let dx = p.x - this.x;\n    let dy = p.y - this.y;\n    return Math.sqrt(dx ** 2 + dy ** 2);\n  }\n}\n// ...\n\n// Reopen the interface.\ninterface Point {\n  distanceFromOrigin(): number;\n}\nPoint.prototype.distanceFromOrigin = function () {\n  return this.getDistance({ x: 0, y: 0 });\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'This has the same problems we mentioned above - we could easily have misspelled getDistance and not gotten an error. For this reason, TypeScript has the noImplicitThis option. When that option is set, TypeScript will issue an error when this is used without an explicit (or inferred) type. The fix is to use a this-parameter to give an explicit type in the interface or in the function itself:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'typescript',
          code: 'Point.prototype.distanceFromOrigin = function (this: Point) {\n  return this.getDistance({ x: 0, y: 0 });\n};',
        },
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
