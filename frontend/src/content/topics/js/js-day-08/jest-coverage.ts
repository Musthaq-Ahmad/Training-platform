import type { ContentTopic } from '../../../types';

export const jestCoverageTopics = {
  'jest-coverage': {
    id: 'jest-coverage',
    heading: 'Running from the command line​',
    blocks: [
      {
        type: 'paragraph',
        text: 'Run all tests (default):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest',
        },
      },
      {
        type: 'paragraph',
        text: 'Run only the tests that were specified with a pattern or filename:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest my-test #orjest path/to/my-test.js',
        },
      },
      {
        type: 'paragraph',
        text: 'Run tests related to changed files based on hg/git (uncommitted files):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest -o',
        },
      },
      {
        type: 'paragraph',
        text: 'Run tests related to path/to/fileA.js and path/to/fileB.js:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest --findRelatedTests path/to/fileA.js path/to/fileB.js',
        },
      },
      {
        type: 'paragraph',
        text: 'Run tests that match this spec name (match against the name in describe or test, basically).',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest -t name-of-spec',
        },
      },
      {
        type: 'paragraph',
        text: 'Run watch mode:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest --watch #runs jest -o by defaultjest --watchAll #runs all tests',
        },
      },
      {
        type: 'paragraph',
        text: 'Watch mode also enables to specify the name or path to a file to focus on a specific set of tests.',
      },
      {
        type: 'paragraph',
        text: 'If you run Jest via your package manager, you can still pass the command line arguments directly as Jest arguments.',
      },
      {
        type: 'paragraph',
        text: 'Instead of:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest -u -t="ColorPicker"',
        },
      },
      {
        type: 'paragraph',
        text: 'you can use:',
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
          code: 'npm test -- -u -t="ColorPicker"',
        },
      },
      {
        type: 'paragraph',
        text: 'Jest supports both camelcase and dashed arg formats. The following examples will have an equal result:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest --collect-coveragejest --collectCoverage',
        },
      },
      {
        type: 'paragraph',
        text: 'Arguments can also be mixed:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest --update-snapshot --detectOpenHandles',
        },
      },
      {
        type: 'paragraph',
        text: 'note',
      },
      {
        type: 'paragraph',
        text: 'CLI options take precedence over values from the Configuration.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Camelcase & dashed args support',
          'Options',
          'Reference * jest <regexForTestFiles> * --bail[=<n>] * --cache * --changedFilesWithAncestor * --changedSince * --ci * --clearCache * --clearMocks * --collectCoverageFrom=<glob> * --collectTests * --colors * --config=<path> * --coverage[=<boolean>] * --coverageDirectory=<path> * --coverageProvider=<provider> * --debug * --detectOpenHandles * --env=<environment> * --errorOnDeprecated * --expand * --filter=<file> * --findRelatedTests <spaceSeparatedListOfSourceFiles> * --forceExit * --help * --ignoreProjects <project1> ... <projectN> * --injectGlobals * --json * --lastCommit * --listTests * --logHeapUsage * --maxConcurrency=<num> * --maxWorkers=<num>|<string> * --noStackTrace * --notify * --onlyChanged * --onlyFailures * --openHandlesTimeout=<milliseconds> * --outputFile=<filename> * --passWithNoTests * --projects <path1> ... <pathN> * --randomize * --reporters * --resetMocks * --restoreMocks * --roots * --runInBand * --runTestsByPath * --seed=<num> * --selectProjects <project1> ... <projectN> * --setupFilesAfterEnv <path1> ... <pathN> * --shard * --showConfig * --showSeed * --silent * --testEnvironmentOptions=&lt;json string&gt; * --testLocationInResults * --testMatch glob1 ... globN * --testNamePattern=<regex> * --testPathIgnorePatterns=<regex>|[array] * --testPathPatterns=<regex> * --testRunner=<path> * --testSequencer=<path> * --testTimeout=<number> * --updateSnapshot * --useStderr * --verbose * --version * --waitForUnhandledRejections * --watch * --watchAll * --watchman * --workerGracefulExitTimeout=<number> * --workerThreads',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'jest <regexForTestFiles>​',
      },
      {
        type: 'paragraph',
        text: 'When you run jest with an argument, that argument is treated as a regular expression to match against files in your project. It is possible to run test suites by providing a pattern. Only the files that the pattern matches will be picked up and executed. Depending on your terminal, you may need to quote this argument: jest "my.*(complex)?pattern". On Windows, you will need to use / as a path separator or escape \\ as \\\\.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--bail[=<n>]​',
      },
      {
        type: 'paragraph',
        text: 'Alias: -b. Exit the test suite immediately upon n number of failing test suite. Defaults to 1.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--cache​',
      },
      {
        type: 'paragraph',
        text: 'Whether to use the cache. Defaults to true. Disable the cache using --no-cache.',
      },
      {
        type: 'paragraph',
        text: 'caution',
      },
      {
        type: 'paragraph',
        text: 'The cache should only be disabled if you are experiencing caching related problems. On average, disabling the cache makes Jest at least two times slower.',
      },
      {
        type: 'paragraph',
        text: 'If you want to inspect the cache, use --showConfig and look at the cacheDirectory value. If you need to clear the cache, use --clearCache.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--changedFilesWithAncestor​',
      },
      {
        type: 'paragraph',
        text: 'Runs tests related to the current changes and the changes made in the last commit. Behaves similarly to --onlyChanged.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--changedSince​',
      },
      {
        type: 'paragraph',
        text: 'Runs tests related to the changes since the provided branch or commit hash. If the current branch has diverged from the given branch, then only changes made locally will be tested. Behaves similarly to --onlyChanged.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--ci​',
      },
      {
        type: 'paragraph',
        text: 'When this option is provided, Jest will assume it is running in a CI environment. This changes the behavior when a new snapshot is encountered. Instead of the regular behavior of storing a new snapshot automatically, it will fail the test and require Jest to be run with --updateSnapshot.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--clearCache​',
      },
      {
        type: 'paragraph',
        text: "Deletes the Jest cache directory and then exits without running tests. Will delete cacheDirectory if the option is passed, or Jest's default cache directory. The default cache directory can be found by calling jest --showConfig.",
      },
      {
        type: 'paragraph',
        text: 'caution',
      },
      {
        type: 'paragraph',
        text: 'Clearing the cache will reduce performance.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--clearMocks​',
      },
      {
        type: 'paragraph',
        text: 'Automatically clear mock calls, instances, contexts and results before every test. Equivalent to calling jest.clearAllMocks() before each test. This does not remove any mock implementation that may have been provided.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--collectCoverageFrom=<glob>​',
      },
      {
        type: 'paragraph',
        text: 'A glob pattern relative to rootDir matching the files that coverage info needs to be collected from.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--collectTests​',
      },
      {
        type: 'paragraph',
        text: 'Discover and print all test suites and test names without executing them. Jest loads each test file, evaluates the top-level describe blocks to register tests, then exits before running any test code or lifecycle hooks.',
      },
      {
        type: 'paragraph',
        text: 'Output is a tree of file paths with their nested describe and test names, followed by a summary of the total counts. Skipped and todo tests are annotated, and any file that throws while loading is reported with its error (and the exit code is non-zero):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'path/to/my.test.ts  My suite    passes    skips [skipped]    write later [todo]Test suites: 1Tests:       3 total, 1 runnable, 1 skipped, 1 todo',
        },
      },
      {
        type: 'paragraph',
        text: 'Parametrized tests declared with test.each / describe.each are expanded to one entry per case, and each collected test is categorized exactly as a real run would categorize it:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'a test that would run is reported in the passed bucket and flagged wouldRun: true (it was selected but never executed);',
          'test.skip, tests inside a skipped describe, tests deselected by test.only, and tests excluded by --testNamePattern are reported as pending;',
          'test.todo is reported as todo.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Because every test is accounted for in the same bucket an actual run would use, the counts reported by --collectTests match those of a run in which every selected test passes — so it can be used to count tests without executing them, including under --testNamePattern.',
      },
      {
        type: 'paragraph',
        text: 'Use --json to get machine-readable output instead. The JSON uses the same shape as a normal run, including numTotalTests, numPassedTests, numPendingTests and numTodoTests, and each assertion carries the wouldRun flag described above.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--colors​',
      },
      {
        type: 'paragraph',
        text: 'Forces test results output highlighting even if stdout is not a TTY.',
      },
      {
        type: 'paragraph',
        text: 'note',
      },
      {
        type: 'paragraph',
        text: 'Alternatively you can set the environment variable FORCE_COLOR=true to forcefully enable or FORCE_COLOR=false to disable colorized output. The use of FORCE_COLOR overrides all other color support checks.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--config=<path>​',
      },
      {
        type: 'paragraph',
        text: 'Alias: -c. The path to a Jest config file specifying how to find and execute tests. If no rootDir is set in the config, the directory containing the config file is assumed to be the rootDir for the project. This can also be a JSON-encoded value which Jest will use as configuration.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--coverage[=<boolean>]​',
      },
      {
        type: 'paragraph',
        text: 'Alias: --collectCoverage. Indicates that test coverage information should be collected and reported in the output. Optionally pass <boolean> to override option set in configuration.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--coverageDirectory=<path>​',
      },
      {
        type: 'paragraph',
        text: 'The directory where Jest should output its coverage files.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--coverageProvider=<provider>​',
      },
      {
        type: 'paragraph',
        text: 'Indicates which provider should be used to instrument code for coverage. Allowed values are babel (default) or v8.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--debug​',
      },
      {
        type: 'paragraph',
        text: 'Print debugging info about your Jest config.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--detectOpenHandles​',
      },
      {
        type: 'paragraph',
        text: 'Attempt to collect and print open handles preventing Jest from exiting cleanly. Use this in cases where you need to use --forceExit in order for Jest to exit to potentially track down the reason. This implies --runInBand, making tests run serially. Implemented using async_hooks. This option has a significant performance penalty and should only be used for debugging.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--env=<environment>​',
      },
      {
        type: 'paragraph',
        text: 'The test environment used for all tests. This can point to any file or node module. Examples: jsdom, node or path/to/my-environment.js.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--errorOnDeprecated​',
      },
      {
        type: 'paragraph',
        text: 'Make calling deprecated APIs throw helpful error messages. Useful for easing the upgrade process.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--expand​',
      },
      {
        type: 'paragraph',
        text: 'Alias: -e. Use this flag to show full diffs and errors instead of a patch.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--filter=<file>​',
      },
      {
        type: 'paragraph',
        text: 'Path to a module exporting a filtering function. This asynchronous function receives a list of test paths which can be manipulated to exclude tests from running and must return an object with shape { filtered: Array<string> } containing the tests that should be run by Jest. Especially useful when used in conjunction with a testing infrastructure to filter known broken tests.',
      },
      {
        type: 'paragraph',
        text: 'my-filter.js',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// This filter when applied will only run tests ending in .spec.js (not the best way to do it, but it\'s just an example):const filteringFunction = testPath => testPath.endsWith(\'.spec.js\');module.exports = testPaths => {  const allowedPaths = testPaths.filter(filteringFunction); // ["path1.spec.js", "path2.spec.js", etc]  return {    filtered: allowedPaths,  };};',
        },
      },
      {
        type: 'paragraph',
        text: 'Find and run the tests that cover a space separated list of source files that were passed in as arguments. Useful for pre-commit hook integration to run the minimal amount of tests necessary. Can be used together with --coverage to include a test coverage for the source files, no duplicate --collectCoverageFrom arguments needed.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--forceExit​',
      },
      {
        type: 'paragraph',
        text: 'Force Jest to exit after all tests have completed running. This is useful when resources set up by test code cannot be adequately cleaned up.',
      },
      {
        type: 'paragraph',
        text: 'caution',
      },
      {
        type: 'paragraph',
        text: "This feature is an escape-hatch. If Jest doesn't exit at the end of a test run, it means external resources are still being held on to or timers are still pending in your code. It is advised to tear down external resources after each test to make sure Jest can shut down cleanly. You can use --detectOpenHandles to help track it down.",
      },
      {
        type: 'subheading',
        level: 3,
        text: '--help​',
      },
      {
        type: 'paragraph',
        text: 'Show the help information, similar to this page.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--ignoreProjects <project1> ... <projectN>​',
      },
      {
        type: 'paragraph',
        text: 'Ignore the tests of the specified projects. Jest uses the attribute displayName in the configuration to identify each project. If you use this option, you should provide a displayName to all your projects.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--injectGlobals​',
      },
      {
        type: 'paragraph',
        text: "Insert Jest's globals (expect, test, describe, beforeEach etc.) into the global environment. If you set this to false, you should import from @jest/globals, e.g.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: "import {expect, jest, test} from '@jest/globals';jest.useFakeTimers();test('some test', () => {  expect(Date.now()).toBe(0);});",
        },
      },
      {
        type: 'paragraph',
        text: 'note',
      },
      {
        type: 'paragraph',
        text: 'This option is only supported using the default jest-circus test runner.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--json​',
      },
      {
        type: 'paragraph',
        text: 'Prints the test results in JSON. This mode will send all other test output and user messages to stderr.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--lastCommit​',
      },
      {
        type: 'paragraph',
        text: 'Run all tests affected by file changes in the last commit made. Behaves similarly to --onlyChanged.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--listTests​',
      },
      {
        type: 'paragraph',
        text: 'Lists all test files that Jest will run given the arguments, and exits.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--logHeapUsage​',
      },
      {
        type: 'paragraph',
        text: 'Logs the heap usage after every test. Useful to debug memory leaks. Use together with --runInBand and --expose-gc in node.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--maxConcurrency=<num>​',
      },
      {
        type: 'paragraph',
        text: 'Prevents Jest from executing more than the specified amount of tests at the same time. Only affects tests that use test.concurrent.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--maxWorkers=<num>|<string>​',
      },
      {
        type: 'paragraph',
        text: 'Alias: -w. Specifies the maximum number of workers the worker-pool will spawn for running tests. In single run mode, this defaults to the number of the cores available on your machine minus one for the main thread. In watch mode, this defaults to half of the available cores on your machine to ensure Jest is unobtrusive and does not grind your machine to a halt. It may be useful to adjust this in resource limited environments like CIs but the defaults should be adequate for most use-cases.',
      },
      {
        type: 'paragraph',
        text: 'For environments with variable CPUs available, you can use percentage based configuration: --maxWorkers=50%',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--noStackTrace​',
      },
      {
        type: 'paragraph',
        text: 'Disables stack trace in test results output.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--notify​',
      },
      {
        type: 'paragraph',
        text: "Activates native OS notifications for test results. Good for when you don't want your consciousness to be able to focus on anything except JavaScript testing. To display the notifications Jest needs the node-notifier package, which must be installed separately.",
      },
      {
        type: 'subheading',
        level: 3,
        text: '--onlyChanged​',
      },
      {
        type: 'paragraph',
        text: "Alias: -o. Attempts to identify which tests to run based on which files have changed in the current repository. Only works if you're running tests in a git/hg repository at the moment and requires a static dependency graph (ie. no dynamic requires).",
      },
      {
        type: 'subheading',
        level: 3,
        text: '--onlyFailures​',
      },
      {
        type: 'paragraph',
        text: 'Alias: -f. Run tests that failed in the previous execution.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--openHandlesTimeout=<milliseconds>​',
      },
      {
        type: 'paragraph',
        text: 'When --detectOpenHandles and --forceExit are disabled, Jest will print a warning if the process has not exited cleanly after this number of milliseconds. A value of 0 disables the warning. Defaults to 1000.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--outputFile=<filename>​',
      },
      {
        type: 'paragraph',
        text: 'Write test results to a file when the --json option is also specified. The returned JSON structure is documented in testResultsProcessor.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--passWithNoTests​',
      },
      {
        type: 'paragraph',
        text: 'Allows the test suite to pass when no files are found.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--projects <path1> ... <pathN>​',
      },
      {
        type: 'paragraph',
        text: 'Run tests from one or more projects, found in the specified paths; also takes path globs. This option is the CLI equivalent of the projects configuration option.',
      },
      {
        type: 'paragraph',
        text: 'note',
      },
      {
        type: 'paragraph',
        text: 'If configuration files are found in the specified paths, all projects specified within those configuration files will be run.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--randomize​',
      },
      {
        type: 'paragraph',
        text: 'Shuffle the order of the tests within a file. The shuffling is based on the seed. See --seed=<num> for more info.',
      },
      {
        type: 'paragraph',
        text: 'Seed value is displayed when this option is set. Equivalent to setting the CLI option --showSeed.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest --randomize --seed 1234',
        },
      },
      {
        type: 'paragraph',
        text: 'note',
      },
      {
        type: 'paragraph',
        text: 'This option is only supported using the default jest-circus test runner.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--reporters​',
      },
      {
        type: 'paragraph',
        text: 'Run tests with specified reporters. Reporter options are not available via CLI. Example with multiple reporters:',
      },
      {
        type: 'paragraph',
        text: 'jest --reporters="default" --reporters="jest-junit"',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--resetMocks​',
      },
      {
        type: 'paragraph',
        text: 'Automatically reset mock state before every test. Equivalent to calling jest.resetAllMocks() before each test. This will lead to any mocks having their fake implementations removed but does not restore their initial implementation.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--restoreMocks​',
      },
      {
        type: 'paragraph',
        text: 'Automatically restore mock state and implementation before every test. Equivalent to calling jest.restoreAllMocks() before each test. This will lead to any mocks having their fake implementations removed and restores their initial implementation.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--roots​',
      },
      {
        type: 'paragraph',
        text: 'A list of paths to directories that Jest should use to search for files in.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--runInBand​',
      },
      {
        type: 'paragraph',
        text: 'Alias: -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--runTestsByPath​',
      },
      {
        type: 'paragraph',
        text: 'Run only the tests that were specified with their exact paths. This avoids converting them into a regular expression and matching it against every single file.',
      },
      {
        type: 'paragraph',
        text: 'For example, given the following file structure:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '__tests__└── t1.test.js # test└── t2.test.js # test',
        },
      },
      {
        type: 'paragraph',
        text: 'When ran with a pattern, no test is found:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest --runTestsByPath __tests__/t',
        },
      },
      {
        type: 'paragraph',
        text: 'Output:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'No tests found',
        },
      },
      {
        type: 'paragraph',
        text: 'However, passing an exact path will execute only the given test:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest --runTestsByPath __tests__/t1.test.js',
        },
      },
      {
        type: 'paragraph',
        text: 'Output:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'PASS __tests__/t1.test.js',
        },
      },
      {
        type: 'paragraph',
        text: 'tip',
      },
      {
        type: 'paragraph',
        text: 'The default regex matching works fine on small runs, but becomes slow if provided with multiple patterns and/or against a lot of tests. This option replaces the regex matching logic and by that optimizes the time it takes Jest to filter specific test files.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--seed=<num>​',
      },
      {
        type: 'paragraph',
        text: 'Sets a seed value that can be retrieved in a test file via jest.getSeed(). The seed value must be between -0x80000000 and 0x7fffffff inclusive (-2147483648 (-(2 ** 31)) and 2147483647 (2 ** 31 - 1) in decimal).',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest --seed=1324',
        },
      },
      {
        type: 'paragraph',
        text: 'tip',
      },
      {
        type: 'paragraph',
        text: 'If this option is not specified Jest will randomly generate the value. You can use the --showSeed flag to print the seed in the test report summary.',
      },
      {
        type: 'paragraph',
        text: 'Jest uses the seed internally for shuffling the order in which test suites are run. If the --randomize option is used, the seed is also used for shuffling the order of tests within each describe block. When dealing with flaky tests, rerunning with the same seed might help reproduce the failure.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--selectProjects <project1> ... <projectN>​',
      },
      {
        type: 'paragraph',
        text: 'Run the tests of the specified projects. Jest uses the attribute displayName in the configuration to identify each project. If you use this option, you should provide a displayName to all your projects.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--setupFilesAfterEnv <path1> ... <pathN>​',
      },
      {
        type: 'paragraph',
        text: 'A list of paths to modules that run some code to configure or to set up the testing framework before each test file. Beware that files imported by the setup scripts will not be mocked during testing.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--shard​',
      },
      {
        type: 'paragraph',
        text: 'The test suite shard to execute in a format of (?<shardIndex>\\d+)/(?<shardCount>\\d+).',
      },
      {
        type: 'paragraph',
        text: 'shardIndex describes which shard to select while shardCount controls the number of shards the suite should be split into.',
      },
      {
        type: 'paragraph',
        text: 'shardIndex and shardCount have to be 1-based, positive numbers, and shardIndex has to be lower than or equal to shardCount.',
      },
      {
        type: 'paragraph',
        text: 'When shard is specified the configured testSequencer has to implement a shard method.',
      },
      {
        type: 'paragraph',
        text: 'For example, to split the suite into three shards, each running one third of the tests:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'jest --shard=1/3jest --shard=2/3jest --shard=3/3',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: '--showConfig​',
      },
      {
        type: 'paragraph',
        text: 'Print your Jest config and then exits.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--showSeed​',
      },
      {
        type: 'paragraph',
        text: 'Prints the seed value in the test report summary. See --seed=<num> for the details.',
      },
      {
        type: 'paragraph',
        text: 'Can also be set in configuration. See showSeed.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--silent​',
      },
      {
        type: 'paragraph',
        text: 'Prevent tests from printing messages through the console.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--testEnvironmentOptions=&lt;json string&gt;​',
      },
      {
        type: 'paragraph',
        text: 'A JSON string with options that will be passed to the testEnvironment. The relevant options depend on the environment.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--testLocationInResults​',
      },
      {
        type: 'paragraph',
        text: 'Adds a location field to test results. Useful if you want to report the location of a test in a reporter.',
      },
      {
        type: 'paragraph',
        text: 'note',
      },
      {
        type: 'paragraph',
        text: 'line is 1-indexed. column is 1-indexed with the default jest-circus runner, but 0-indexed with jest-jasmine2. Both will be 1-indexed in Jest 31, matching the positions V8 reports in a stack trace and through CallSite.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{  "column": 4,  "line": 5}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: '--testMatch glob1 ... globN​',
      },
      {
        type: 'paragraph',
        text: 'The glob patterns Jest uses to detect test files. Please refer to the testMatch configuration for details.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--testNamePattern=<regex>​',
      },
      {
        type: 'paragraph',
        text: "Alias: -t. Run only tests with a name that matches the regex. For example, suppose you want to run only tests related to authorization which will have names like 'GET /api/posts with auth', then you can use jest -t=auth.",
      },
      {
        type: 'paragraph',
        text: 'tip',
      },
      {
        type: 'paragraph',
        text: 'The regex is matched against the full name, which is a combination of the test name and all its surrounding describe blocks.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--testPathIgnorePatterns=<regex>|[array]​',
      },
      {
        type: 'paragraph',
        text: 'A single or array of regexp pattern strings that are tested against all tests paths before executing the test. Contrary to --testPathPatterns, it will only run those tests with a path that does not match with the provided regexp expressions.',
      },
      {
        type: 'paragraph',
        text: 'To pass as an array use escaped parentheses and space delimited regexps such as \\(/node_modules/ /tests/e2e/\\). Alternatively, you can omit parentheses by combining regexps into a single regexp like /node_modules/|/tests/e2e/. These two examples are equivalent.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--testPathPatterns=<regex>​',
      },
      {
        type: 'paragraph',
        text: 'A regexp pattern string that is matched against all tests paths before executing the test. On Windows, you will need to use / as a path separator or escape \\ as \\\\.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--testRunner=<path>​',
      },
      {
        type: 'paragraph',
        text: 'Lets you specify a custom test runner.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--testSequencer=<path>​',
      },
      {
        type: 'paragraph',
        text: 'Lets you specify a custom test sequencer. Please refer to the testSequencer configuration for details.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--testTimeout=<number>​',
      },
      {
        type: 'paragraph',
        text: 'Default timeout of a test in milliseconds. Default value: 5000.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--updateSnapshot​',
      },
      {
        type: 'paragraph',
        text: 'Alias: -u. Use this flag to re-record every snapshot that fails during this test run. Can be used together with a test suite pattern or with --testNamePattern to re-record snapshots.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--useStderr​',
      },
      {
        type: 'paragraph',
        text: 'Divert all output to stderr.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--verbose​',
      },
      {
        type: 'paragraph',
        text: 'Display individual test results with the test suite hierarchy.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--version​',
      },
      {
        type: 'paragraph',
        text: 'Alias: -v. Print the version and exit.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--waitForUnhandledRejections​',
      },
      {
        type: 'paragraph',
        text: 'Gives one event loop turn to handle rejectionHandled, uncaughtException or unhandledRejection.',
      },
      {
        type: 'paragraph',
        text: 'Without this flag Jest may report false-positive errors (e.g. actually handled rejection reported) or not report actually unhandled rejection (or report it for different test case).',
      },
      {
        type: 'paragraph',
        text: 'This option may add a noticeable overhead for fast test suites.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--watch​',
      },
      {
        type: 'paragraph',
        text: 'Watch files for changes and rerun tests related to changed files. If you want to re-run all tests when a file has changed, use the --watchAll option instead.',
      },
      {
        type: 'paragraph',
        text: 'tip',
      },
      {
        type: 'paragraph',
        text: 'Use --no-watch (or --watch=false) to explicitly disable the watch mode if it was enabled using --watch. In most CI environments, this is automatically handled for you.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--watchAll​',
      },
      {
        type: 'paragraph',
        text: 'Watch files for changes and rerun all tests when something changes. If you want to re-run only the tests that depend on the changed files, use the --watch option.',
      },
      {
        type: 'paragraph',
        text: 'tip',
      },
      {
        type: 'paragraph',
        text: 'Use --no-watchAll (or --watchAll=false) to explicitly disable the watch mode if it was enabled using --watchAll. In most CI environments, this is automatically handled for you.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--watchman​',
      },
      {
        type: 'paragraph',
        text: 'Whether to use watchman for file crawling. Defaults to true. Disable using --no-watchman.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--workerGracefulExitTimeout=<number>​',
      },
      {
        type: 'paragraph',
        text: 'Timeout in milliseconds for worker processes to exit gracefully after tests complete. Workers that do not exit in time are force-killed. Default: 500.',
      },
      {
        type: 'subheading',
        level: 3,
        text: '--workerThreads​',
      },
      {
        type: 'paragraph',
        text: 'Whether to use worker threads for parallelization. Child processes are used by default.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
