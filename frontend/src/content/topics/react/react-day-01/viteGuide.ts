import type { ContentTopic } from '../../../types';

export const viteguideTopics = {
  viteguide: {
    id: 'viteguide',
    heading: 'Vite Guide',
    blocks: [
      {
        type: 'paragraph',
        text: 'Vite (French word for "quick", pronounced /viːt/, like "veet") is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).',
          'A build command that bundles your code with Rolldown, pre-configured to output highly optimized static assets for production.',
        ],
      },
      {
        type: 'paragraph',
        text: "Vite is opinionated and comes with sensible defaults out of the box. Read about what's possible in the Features Guide. Support for frameworks or integration with other tools is possible through Plugins. The Config Section explains how to adapt Vite to your project if needed.",
      },
      {
        type: 'paragraph',
        text: 'Vite is also highly extensible via its Plugin API and JavaScript API with full typing support.',
      },
      {
        type: 'paragraph',
        text: 'You can learn more about the rationale behind the project in the Why Vite section.',
      },
      {
        type: 'paragraph',
        text: 'During development, Vite assumes that a modern browser is used. This means the browser supports most of the latest JavaScript and CSS features. For that reason, Vite sets esnext as the transform target. This prevents syntax lowering, letting Vite serve modules as close as possible to the original source code. Vite injects some runtime code to make the development server work. This code uses features included in Baseline Newly Available at the time of each major release (2026-01-01 for this major).',
      },
      {
        type: 'paragraph',
        text: 'For production builds, Vite by default targets Baseline Widely Available browser versions as of a date fixed for each major release. For this major, that corresponds to browser versions released around mid-2023. The target can be lowered via configuration. Additionally, legacy browsers can be supported via the official @vitejs/plugin-legacy. See the Building for Production section for more details.',
      },
      {
        type: 'paragraph',
        text: "You can try Vite online on StackBlitz. It runs the Vite-based build setup directly in the browser, so it is almost identical to the local setup but doesn't require installing anything on your machine. You can navigate to vite.new/{template} to select which framework to use.",
      },
      {
        type: 'paragraph',
        text: 'The supported template presets are:',
      },
      {
        type: 'table',
        headers: ['JavaScript', 'TypeScript'],
        rows: [
          ['vanilla', 'vanilla-ts'],
          ['vue', 'vue-ts'],
          ['react', 'react-ts'],
          ['preact', 'preact-ts'],
          ['lit', 'lit-ts'],
          ['svelte', 'svelte-ts'],
          ['solid', 'solid-ts'],
          ['qwik', 'qwik-ts'],
        ],
      },
      {
        type: 'paragraph',
        text: 'npmYarnpnpmBunDeno',
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ npm create vite@latest',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ yarn create vite',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ pnpm create vite',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ bun create vite',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ deno init --npm vite',
        },
      },
      {
        type: 'paragraph',
        text: 'Then follow the prompts!',
      },
      {
        type: 'paragraph',
        text: 'Compatibility Note',
      },
      {
        type: 'paragraph',
        text: 'Vite requires Node.js version 20.19+, 22.12+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.',
      },
      {
        type: 'paragraph',
        text: 'Using create vite with command line options',
      },
      {
        type: 'paragraph',
        text: 'You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite + Vue project, run:',
      },
      {
        type: 'paragraph',
        text: 'npmYarnpnpmBunDeno',
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '# npm 7+, extra double-dash is needed:\n$ npm create vite@latest my-vue-app -- --template vue',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ yarn create vite my-vue-app --template vue',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ pnpm create vite my-vue-app --template vue',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ bun create vite my-vue-app --template vue',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ deno init --npm vite my-vue-app --template vue',
        },
      },
      {
        type: 'paragraph',
        text: 'See create-vite for more details on each supported template: vanilla, vanilla-ts, vue, vue-ts, react, react-compiler, react-ts, react-compiler-ts, preact, preact-ts, lit, lit-ts, svelte, svelte-ts, solid, solid-ts, qwik, qwik-ts.',
      },
      {
        type: 'paragraph',
        text: 'You can use . for the project name to scaffold in the current directory.',
      },
      {
        type: 'paragraph',
        text: 'To create a project without interactive prompts, you can use the --no-interactive flag.',
      },
      {
        type: 'paragraph',
        text: 'create-vite is a tool to quickly start a project from a basic template for popular frameworks. Check out Awesome Vite for community maintained templates that include other tools or target different frameworks.',
      },
      {
        type: 'paragraph',
        text: 'For a template at https://github.com/user/project, you can try it out online using https://github.stackblitz.com/user/project (adding .stackblitz after github to the URL of the project).',
      },
      {
        type: 'paragraph',
        text: 'You can also use a tool like tiged to scaffold your project with one of the templates. Assuming the project is on GitHub and uses main as the default branch, you can create a local copy using:',
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'npx tiged user/project my-project\ncd my-project\n\nnpm install\nnpm run dev',
        },
      },
      {
        type: 'paragraph',
        text: 'In your project, you can install the vite CLI using:',
      },
      {
        type: 'paragraph',
        text: 'npmYarnpnpmBunDeno',
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ npm install -D vite',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ yarn add -D vite',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ pnpm add -D vite',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ bun add -D vite',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ deno add -D npm:vite',
        },
      },
      {
        type: 'paragraph',
        text: 'And create an index.html file like this:',
      },
      {
        type: 'paragraph',
        text: 'html',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '<p>Hello Vite!</p>',
        },
      },
      {
        type: 'paragraph',
        text: 'Then run the appropriate CLI command in your terminal:',
      },
      {
        type: 'paragraph',
        text: 'npmYarnpnpmBunDeno',
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ npx vite',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ yarn vite',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ pnpm vite',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ bunx vite',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ deno run -A npm:vite',
        },
      },
      {
        type: 'paragraph',
        text: 'The index.html will be served on http://localhost:5173.',
      },
      {
        type: 'paragraph',
        text: 'One thing you may have noticed is that in a Vite project, index.html is front-and-central instead of being tucked away inside public. This is intentional: during development Vite is a server, and index.html is the entry point to your application.',
      },
      {
        type: 'paragraph',
        text: 'Vite treats index.html as source code and part of the module graph. It resolves <script type="module" src="..."> that references your JavaScript source code. Even inline <script type="module"> and CSS referenced via <link href> also enjoy Vite-specific features. In addition, URLs inside index.html are automatically rebased so there\'s no need for special %PUBLIC_URL% placeholders.',
      },
      {
        type: 'paragraph',
        text: 'Similar to static http servers, Vite has the concept of a "root directory" which your files are served from. You will see it referenced as <root> throughout the rest of the docs. Absolute URLs in your source code will be resolved using the project root as base, so you can write code as if you are working with a normal static file server (except way more powerful!). Vite is also capable of handling dependencies that resolve to out-of-root file system locations, which makes it usable even in a monorepo-based setup.',
      },
      {
        type: 'paragraph',
        text: 'Vite also supports multi-page apps with multiple .html entry points.',
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Specifying Alternative Root ​',
      },
      {
        type: 'paragraph',
        text: "Running vite starts the dev server using the current working directory as root. You can specify an alternative root with vite serve some/sub/dir. Note that Vite will also resolve its config file (i.e. vite.config.js) inside the project root, so you'll need to move it if the root is changed.",
      },
      {
        type: 'paragraph',
        text: 'In a project where Vite is installed, you can use the vite binary in your npm scripts, or run it directly with npx vite. Here are the default npm scripts in a scaffolded Vite project:',
      },
      {
        type: 'paragraph',
        text: 'package.json',
      },
      {
        type: 'paragraph',
        text: 'json',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'jsx',
          code: '{\n  "scripts": {\n    "dev": "vite", // start dev server, aliases: `vite dev`, `vite serve`\n    "build": "vite build", // build for production\n    "preview": "vite preview" // locally preview production build\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'You can specify additional CLI options like --port or --open. For a full list of CLI options, run npx vite --help in your project.',
      },
      {
        type: 'paragraph',
        text: 'Learn more about the Command Line Interface.',
      },
      {
        type: 'paragraph',
        text: "If you can't wait for a new release to test the latest features, you can install a specific commit of Vite with https://pkg.pr.new:",
      },
      {
        type: 'paragraph',
        text: 'npmYarnpnpmBun',
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ npm install -D https://pkg.pr.new/vite@SHA',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ yarn add -D https://pkg.pr.new/vite@SHA',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ pnpm add -D https://pkg.pr.new/vite@SHA',
        },
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: '$ bun add -D https://pkg.pr.new/vite@SHA',
        },
      },
      {
        type: 'paragraph',
        text: "Replace SHA with any of Vite's commit SHAs. Note that only commits within the last month will work, as older commit releases are purged.",
      },
      {
        type: 'paragraph',
        text: 'Alternatively, you can also clone the vite repo to your local machine and then build and link it yourself (pnpm is required):',
      },
      {
        type: 'paragraph',
        text: 'bash',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'bash',
          code: 'git clone https://github.com/vitejs/vite.git\ncd vite\npnpm install\ncd packages/vite\npnpm run build\npnpm link # use your preferred package manager for this step',
        },
      },
      {
        type: 'paragraph',
        text: 'Then go to your Vite based project and run pnpm link vite (or the package manager that you used to link vite globally). Now restart the development server to ride on the bleeding edge!',
      },
      {
        type: 'paragraph',
        text: 'To learn more about how and when Vite does releases, check out the Releases documentation.',
      },
      {
        type: 'paragraph',
        text: 'If you have questions or need help, reach out to the community at Discord and GitHub Discussions.',
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
