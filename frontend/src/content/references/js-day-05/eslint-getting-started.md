ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

ESLint is completely pluggable. Every single rule is a plugin and you can add more at runtime. You can also add community plugins, configurations, and parsers to extend the functionality of ESLint.

## Prerequisites

To use ESLint, you must have [Node.js](https://nodejs.org/en/) (`^20.19.0`, `^22.13.0`, or `>=24`) installed and built with SSL and ICU support. (If you are using an official Node.js distribution, both SSL and ICU are always built in.)

If you use ESLint’s TypeScript type definitions, TypeScript 5.3 or later is required.

## Quick start

You can install and configure ESLint using this command:

### npm

```
npm init @eslint/config@latest
```

### yarn

```
yarn create @eslint/config
```

### pnpm

```
pnpm create @eslint/config@latest
```

### bun

```
bun create @eslint/config@latest
```

If you want to use a specific shareable config that is hosted on npm, you can use the `--config` option and specify the package name:

### npm

```
# use `eslint-config-xo` shared config - npm 7+
npm init @eslint/config@latest -- --config eslint-config-xo
```

### yarn

```
# use `eslint-config-xo` shared config - npm 7+
yarn create @eslint/config -- --config eslint-config-xo
```

### pnpm

```
# use `eslint-config-xo` shared config - npm 7+
pnpm create @eslint/config@latest -- --config eslint-config-xo
```

### bun

```
# use `eslint-config-xo` shared config - npm 7+
bun create @eslint/config@latest -- --config eslint-config-xo
```

**Note:** `npm init @eslint/config` assumes you have a `package.json` file already. If you don’t, make sure to run `npm init` or `yarn init` beforehand.

After that, you can run ESLint on any file or directory like this:

### npm

```
npx eslint yourfile.js
```

### yarn

```
yarn dlx eslint yourfile.js
```

### pnpm

```
pnpm dlx eslint yourfile.js
```

### bun

```
bunx eslint yourfile.js
```

## Configuration

**Note:** If you are coming from a version before 9.0.0 please see the [migration guide](https://eslint.org/docs/latest/use/configure/migration-guide).

When you run `npm init @eslint/config`, you’ll be asked a series of questions to determine how you’re using ESLint and what options should be included. After answering these questions, you’ll have an `eslint.config.js` (or `eslint.config.mjs`) file created in your directory.

For example, one of the questions is “Where does your code run?” If you select “Browser” then your configuration file will contain the definitions for global variables found in web browsers. Here’s an example:

```
import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
	{ files: ["**/*.js"], languageOptions: { globals: globals.browser } },
	{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
]);
```

The `"js/recommended"` configuration ensures all of the rules marked as recommended on the [rules page](https://eslint.org/docs/latest/rules) will be turned on. Alternatively, you can use configurations that others have created by searching for “eslint-config” on [npmjs.com](https://www.npmjs.com/search?q=eslint-config). ESLint will not lint your code unless you extend from a shared configuration or explicitly turn rules on in your configuration.

You can configure rules individually by defining a new object with a `rules` key, as in this example:

```
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },

	{
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
		},
	},
]);
```

The names `"no-unused-vars"` and `"no-undef"` are the names of [rules](https://eslint.org/docs/latest/rules) in ESLint. The first value is the error level of the rule and can be one of these values:

- `"off"` or `0` - turn the rule off
- `"warn"` or `1` - turn the rule on as a warning (doesn’t affect exit code)
- `"error"` or `2` - turn the rule on as an error (exit code will be 1)

The three error levels allow you fine-grained control over how ESLint applies rules (for more configuration options and details, see the configuration docs).

## Global Install

It is also possible to install ESLint globally, rather than locally, using `npm install eslint --global`. However, this is not recommended, and any plugins or shareable configs that you use must still be installed locally even if you install ESLint globally.

## Manual Set Up

You can also manually set up ESLint in your project.

Before you begin, you must already have a `package.json` file. If you don’t, make sure to run `npm init` or `yarn init` to create the file beforehand.

1.  Install the ESLint packages in your project:

### npm

```
npm install --save-dev eslint@latest @eslint/js@latest
```

### yarn

```
yarn add --dev eslint@latest @eslint/js@latest
```

### pnpm

```
pnpm add --save-dev eslint@latest @eslint/js@latest
```

### bun

```
bun add --dev eslint@latest @eslint/js@latest
```

2.  Add an `eslint.config.js` file:

    ```
    # Create JavaScript configuration file
    touch eslint.config.js
    ```

3.  Add configuration to the `eslint.config.js` file. Refer to the [Configure ESLint documentation](https://eslint.org/docs/latest/use/configure/) to learn how to add rules, custom configurations, plugins, and more.

    ```
    import { defineConfig } from "eslint/config";
    import js from "@eslint/js";

    export default defineConfig([
    	{
    		files: ["**/*.js"],
    		plugins: {
    			js,
    		},
    		extends: ["js/recommended"],
    		rules: {
    			"no-unused-vars": "warn",
    			"no-undef": "warn",
    		},
    	},
    ]);
    ```

4.  Lint code using the ESLint CLI:

### npm

```
npx eslint project-dir/ file.js
```

### yarn

```
yarn dlx eslint project-dir/ file.js
```

### pnpm

```
pnpm dlx eslint project-dir/ file.js
```

### bun

```
bunx eslint project-dir/ file.js
```

For more information on the available CLI options, refer to [Command Line Interface](https://eslint.org/docs/latest/use/command-line-interface).

---

## Next Steps

- Learn about [advanced configuration](https://eslint.org/docs/latest/use/configure/) of ESLint.
- Get familiar with the [command line options](https://eslint.org/docs/latest/use/command-line-interface).
- Explore [ESLint integrations](https://eslint.org/docs/latest/use/integrations) into other tools like editors, build systems, and more.
- Can’t find just the right rule? Make your own [custom rule](https://eslint.org/docs/latest/extend/custom-rules).
- Make ESLint even better by [contributing](https://eslint.org/docs/latest/contribute/).
