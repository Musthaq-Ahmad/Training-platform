import type { ContentTopic } from '../../../types';

export const nodetsconfigTopics = {
  nodetsconfig: {
    id: 'nodetsconfig',
    heading: 'Overview',
    blocks: [
      {
        type: 'paragraph',
        text: 'The presence of a tsconfig.json file in a directory indicates that the directory is the root of a TypeScript project. The tsconfig.json file specifies the root files and the compiler options required to compile the project.',
      },
      {
        type: 'paragraph',
        text: 'JavaScript projects can use a jsconfig.json file instead, which acts almost the same but has some JavaScript-related compiler flags enabled by default.',
      },
      {
        type: 'paragraph',
        text: 'A project is compiled in one of the following ways:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'By invoking tsc with no input files, in which case the compiler searches for the tsconfig.json file starting in the current directory and continuing up the parent directory chain.',
          'By invoking tsc with no input files and a --project (or just -p) command line option that specifies the path of a directory containing a tsconfig.json file, or a path to a valid .json file containing the configurations.',
        ],
      },
      {
        type: 'paragraph',
        text: 'When input files are specified on the command line, tsconfig.json files are ignored.',
      },
      {
        type: 'paragraph',
        text: 'Example tsconfig.json files:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Using the files property { "compilerOptions": { "module": "commonjs", "noImplicitAny": true, "removeComments": true, "preserveConstEnums": true, "sourceMap": true }, "files": [ "core.ts", "sys.ts", "types.ts", "scanner.ts", "parser.ts", "utilities.ts", "binder.ts", "checker.ts", "emitter.ts", "program.ts", "commandLineParser.ts", "tsc.ts", "diagnosticInformationMap.generated.ts" ] }',
          'Using the include and exclude properties { "compilerOptions": { "module": "system", "noImplicitAny": true, "removeComments": true, "preserveConstEnums": true, "outFile": "../../built/local/tsc.js", "sourceMap": true }, "include": ["src/**/*"], "exclude": ["**/*.spec.ts"] }',
        ],
      },
      {
        type: 'paragraph',
        text: 'Depending on the JavaScript runtime environment which you intend to run your code in, there may be a base configuration which you can use at github.com/tsconfig/bases. These are tsconfig.json files which your project extends from which simplifies your tsconfig.json by handling the runtime support.',
      },
      {
        type: 'paragraph',
        text: 'For example, if you were writing a project which uses Node.js version 12 and above, then you could use the npm module @tsconfig/node12:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{\n  "extends": "@tsconfig/node12/tsconfig.json",\n\n  "compilerOptions": {\n    "preserveConstEnums": true\n  },\n\n  "include": ["src/**/*"],\n  "exclude": ["**/*.spec.ts"]\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This lets your tsconfig.json focus on the unique choices for your project, and not all of the runtime mechanics. There are a few tsconfig bases already, and we’re hoping the community can add more for different environments.',
      },
      {
        type: 'paragraph',
        text: 'The "compilerOptions" property can be omitted, in which case the compiler’s defaults are used. See our full list of supported Compiler Options.',
      },
      {
        type: 'paragraph',
        text: 'To learn more about the hundreds of configuration options in the TSConfig Reference.',
      },
      {
        type: 'paragraph',
        text: 'The tsconfig.json Schema can be found at the JSON Schema Store.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
