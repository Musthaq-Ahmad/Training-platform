import type { TaskFile } from '@itp/types';
import { SQL_SETUP_BY_DAY } from './sqlSetup';
import type { CatalogTask, DayWorkspace } from './types';

// Starter files and runtime per course/day. Mock data only: the real backend seeds these per task.

function file(path: string, content: string): TaskFile {
  return { path, content };
}

function json(value: unknown): string {
  return JSON.stringify(value, null, 2) + '\n';
}

function heading(task: CatalogTask): string {
  return `${task.title}${task.isStretchGoal ? ' (stretch goal)' : ''}`;
}

// --- Browser tasks (HTML, CSS, JavaScript) ---------------------------------

function htmlStarter(task: CatalogTask): TaskFile[] {
  return [
    file(
      'index.html',
      `<!-- ${heading(task)}\n     Write your HTML here. Create more .html files with "New file" when a task asks for them. -->\n`
    ),
  ];
}

function cssStarter(task: CatalogTask): TaskFile[] {
  return [
    file(
      'index.html',
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${task.title}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>${task.title}</h1>
  </body>
</html>
`
    ),
    file('styles.css', `/* ${heading(task)} */\n`),
  ];
}

function jsStarter(task: CatalogTask): TaskFile[] {
  return [
    file(
      'index.html',
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${task.title}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <main id="app">
      <h1>${task.title}</h1>
    </main>
    <script src="script.js"></script>
  </body>
</html>
`
    ),
    file('styles.css', `/* ${heading(task)} */\n`),
    file('script.js', `// ${heading(task)}\n// Open the Console tab to see console.log output.\n`),
  ];
}

function jsModulesStarter(task: CatalogTask): TaskFile[] {
  return [
    file(
      'index.html',
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${task.title}</title>
    <link rel="stylesheet" href="css/styles.css" />
    <script type="module" src="js/main.js"></script>
  </head>
  <body>
    <main id="app"></main>
  </body>
</html>
`
    ),
    file('css/styles.css', `/* ${heading(task)} */\n`),
    file(
      'js/main.js',
      `// ${heading(task)}\nimport { render } from './app.js';\n\nrender(document.querySelector('#app'));\n`
    ),
    file(
      'js/app.js',
      `export function render(root) {\n  root.textContent = 'Replace me with your app.';\n}\n`
    ),
  ];
}

function jestStarter(task: CatalogTask): TaskFile[] {
  return [
    file(
      'package.json',
      json({
        name: 'jest-practice',
        private: true,
        scripts: { test: 'jest', 'test:coverage': 'jest --coverage' },
        devDependencies: { jest: '^29.7.0', 'jest-environment-jsdom': '^29.7.0' },
      })
    ),
    file(
      'src/math.js',
      `// ${heading(task)}\nfunction add(a, b) {\n  return a + b;\n}\n\nmodule.exports = { add };\n`
    ),
    file(
      'src/math.test.js',
      `const { add } = require('./math');\n\ntest('adds two numbers', () => {\n  expect(add(2, 3)).toBe(5);\n});\n`
    ),
  ];
}

// --- TypeScript and Node.js ----------------------------------------------

const TSCONFIG = json({
  compilerOptions: {
    target: 'ES2022',
    module: 'NodeNext',
    moduleResolution: 'NodeNext',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    noEmit: true, // Node runs .ts files directly (type stripping); tsc only checks types
    allowImportingTsExtensions: true,
  },
  include: ['src'],
});

const TSCONFIG_DOM = json({
  compilerOptions: {
    target: 'ES2022',
    module: 'ESNext',
    moduleResolution: 'Bundler',
    lib: ['ES2022', 'DOM', 'DOM.Iterable'],
    strict: true,
    noEmit: true,
    skipLibCheck: true,
  },
  include: ['src'],
});

const JEST_TS_CONFIG = `/** @type {import('jest').Config} */\nmodule.exports = {\n  preset: 'ts-jest',\n  testEnvironment: 'node',\n};\n`;

function typescriptStarter(task: CatalogTask, withJest: boolean): TaskFile[] {
  const devDependencies: Record<string, string> = { typescript: '^5.6.3' };
  const scripts: Record<string, string> = { check: 'tsc --noEmit' };
  if (withJest) {
    Object.assign(devDependencies, {
      jest: '^29.7.0',
      'ts-jest': '^29.2.5',
      '@types/jest': '^29.5.14',
    });
    scripts.test = 'jest';
  }
  const files = [
    file(
      'package.json',
      json({ name: 'typescript-practice', private: true, scripts, devDependencies })
    ),
    file('tsconfig.json', TSCONFIG_DOM),
    file(
      'src/index.ts',
      `// ${heading(task)}\n// Run "npm run check" (or press Run) to type-check with strict mode.\n\nexport {};\n`
    ),
  ];
  if (withJest) {
    files.push(file('jest.config.js', JEST_TS_CONFIG));
    files.push(
      file(
        'src/index.test.ts',
        `describe('${task.title.replace(/'/g, '')}', () => {\n  it.todo('write your first typed test');\n});\n`
      )
    );
  }
  return files;
}

type NodeFlavour = 'cli' | 'http' | 'express' | 'pglite';

function nodeStarter(task: CatalogTask, flavour: NodeFlavour): TaskFile[] {
  const dependencies: Record<string, string> = {};
  const devDependencies: Record<string, string> = {
    typescript: '^5.6.3',
    jest: '^29.7.0',
    'ts-jest': '^29.2.5',
    '@types/jest': '^29.5.14',
    '@types/node': '^22.9.0',
  };
  if (flavour === 'express' || flavour === 'pglite') {
    dependencies.express = '^4.21.1';
    devDependencies['@types/express'] = '^4.17.21';
    devDependencies.supertest = '^7.0.0';
    devDependencies['@types/supertest'] = '^6.0.2';
  }
  if (flavour === 'pglite') dependencies['@electric-sql/pglite'] = '0.5.8';

  const entry: Record<NodeFlavour, TaskFile> = {
    cli: file(
      'src/index.ts',
      `// ${heading(task)}\nconst [, , command] = process.argv;\n\nconsole.log(command ? \`Unknown command: \${command}\` : 'Usage: node src/index.ts <command>');\n`
    ),
    http: file(
      'src/server.ts',
      `// ${heading(task)}\nimport { createServer } from 'node:http';\n\nconst server = createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({ ok: true, path: req.url }));\n});\n\nserver.listen(3000, () => console.log('Listening on http://localhost:3000'));\n`
    ),
    express: file(
      'src/app.ts',
      `// ${heading(task)}\nimport express from 'express';\n\nexport const app = express();\napp.use(express.json());\n\napp.get('/health', (_req, res) => {\n  res.json({ ok: true });\n});\n`
    ),
    pglite: file(
      'src/db.ts',
      `// ${heading(task)}\n// PostgreSQL runs inside your workspace with PGlite (same SQL as a real server).\nimport { PGlite } from '@electric-sql/pglite';\n\nexport const db = new PGlite('./.pglite');\n\nexport async function listTickets() {\n  const result = await db.query('select * from tickets order by id');\n  return result.rows;\n}\n`
    ),
  };

  const scripts: Record<string, string> = { test: 'jest', check: 'tsc --noEmit' };
  if (flavour === 'cli') scripts.start = 'node src/index.ts';
  if (flavour === 'http') scripts.start = 'node src/server.ts';
  if (flavour === 'express' || flavour === 'pglite') {
    scripts.start = 'node src/server.ts';
  }

  const files = [
    file(
      'package.json',
      json({ name: 'backend-practice', private: true, scripts, dependencies, devDependencies })
    ),
    file('tsconfig.json', TSCONFIG),
    file('jest.config.js', JEST_TS_CONFIG),
    entry[flavour],
    file(
      'src/app.test.ts',
      `describe('${task.title.replace(/'/g, '')}', () => {\n  it.todo('add at least five tests');\n});\n`
    ),
  ];
  if (flavour === 'express' || flavour === 'pglite') {
    files.push(
      file(
        'src/server.ts',
        flavour === 'express'
          ? `import { app } from './app.ts';\n\napp.listen(3000, () => console.log('API on http://localhost:3000'));\n`
          : `import express from 'express';\nimport { listTickets } from './db.ts';\n\nconst app = express();\napp.get('/tickets', async (_req, res) => {\n  res.json(await listTickets());\n});\n\napp.listen(3000, () => console.log('API on http://localhost:3000'));\n`
      )
    );
  }
  return files;
}

function prismaStarter(task: CatalogTask): TaskFile[] {
  return [
    file(
      'package.json',
      json({
        name: 'ticket-api',
        private: true,
        scripts: { test: 'jest', start: 'node src/server.ts' },
        dependencies: { express: '^4.21.1', '@prisma/client': '7.10.0' },
        devDependencies: {
          prisma: '7.10.0',
          typescript: '^5.6.3',
          jest: '^29.7.0',
          'ts-jest': '^29.2.5',
          '@types/jest': '^29.5.14',
          '@types/express': '^4.17.21',
        },
      })
    ),
    file(
      'prisma/schema.prisma',
      `// ${heading(task)}\ngenerator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Ticket {\n  id        Int      @id @default(autoincrement())\n  title     String\n  status    String   @default("open")\n  createdAt DateTime @default(now())\n}\n`
    ),
    file('src/server.ts', `// ${heading(task)}\nconsole.log('Start the ticket API here.');\n`),
    file('tsconfig.json', TSCONFIG),
  ];
}

// --- React (Vite) -----------------------------------------------------------

function reactStarter(
  task: CatalogTask,
  options: { apiProxy: boolean; tests: boolean }
): TaskFile[] {
  const devDependencies: Record<string, string> = {
    vite: '^5.4.10',
    '@vitejs/plugin-react': '^4.3.3',
    typescript: '^5.6.3',
    '@types/react': '^18.3.12',
    '@types/react-dom': '^18.3.1',
  };
  const scripts: Record<string, string> = { dev: 'vite', build: 'tsc --noEmit && vite build' };
  if (options.tests) {
    Object.assign(devDependencies, {
      vitest: '^2.1.4',
      jsdom: '^25.0.1',
      '@testing-library/react': '^16.0.1',
      '@testing-library/dom': '^10.4.0',
    });
    scripts.test = 'vitest run';
  }
  const viteConfig = options.apiProxy
    ? `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\n// Calls to /api go to your API on port 3000 (the preview can't call localhost directly).\nexport default defineConfig({\n  plugins: [react()],\n  server: { proxy: { '/api': 'http://localhost:3000' } },\n});\n`
    : `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],${options.tests ? "\n  test: { environment: 'jsdom' }," : ''}\n});\n`;
  const files = [
    file(
      'package.json',
      json({
        name: 'react-practice',
        private: true,
        type: 'module',
        scripts,
        dependencies: { react: '^18.3.1', 'react-dom': '^18.3.1' },
        devDependencies,
      })
    ),
    file(
      'index.html',
      `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>${task.title}</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.tsx"></script>\n  </body>\n</html>\n`
    ),
    file(options.tests ? 'vite.config.mts' : 'vite.config.ts', viteConfig),
    file(
      'tsconfig.json',
      json({
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'Bundler',
          lib: ['ES2022', 'DOM', 'DOM.Iterable'],
          jsx: 'react-jsx',
          strict: true,
          noEmit: true,
          skipLibCheck: true,
        },
        include: ['src'],
      })
    ),
    file(
      'src/main.tsx',
      `import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App';\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);\n`
    ),
    file(
      'src/App.tsx',
      `// ${heading(task)}\nexport default function App() {\n  return <h1>${task.title.replace(/[<>{}]/g, '')}</h1>;\n}\n`
    ),
  ];
  if (options.tests) {
    files.push(
      file(
        'src/App.test.tsx',
        `import { render, screen } from '@testing-library/react';\nimport { expect, it } from 'vitest';\nimport App from './App';\n\nit('renders the heading', () => {\n  render(<App />);\n  expect(screen.getByRole('heading')).toBeTruthy();\n});\n`
      )
    );
  }
  return files;
}

// --- SQL ------------------------------------------------------------------

function sqlStarter(task: CatalogTask, hasSetup: boolean): TaskFile[] {
  const note = hasSetup
    ? '-- The Support Ticket schema and sample data are already loaded (Reset database restores them).\n'
    : '-- Your database starts empty. Create your tables here, then run this file.\n';
  return [
    file('schema.sql', `-- ${heading(task)}\n${note}`),
    file('seed.sql', `-- Sample data (INSERT statements)\n`),
    file(
      'queries.sql',
      `-- One query per business question. Select a query and press Run selection.\n`
    ),
  ];
}

// --- Day → workspace --------------------------------------------------------

function browser(starterFiles: (task: CatalogTask) => TaskFile[]): DayWorkspace {
  return { runtime: 'browser', runCommand: null, setupSql: null, starterFiles };
}

function node(
  runCommand: string | null,
  starterFiles: (task: CatalogTask) => TaskFile[]
): DayWorkspace {
  return { runtime: 'node', runCommand, setupSql: null, starterFiles };
}

export function workspaceForDay(dayId: string): DayWorkspace {
  const [course] = dayId.split('-day-');
  const dayNumber = Number(dayId.split('-day-')[1]);

  switch (course) {
    case 'html':
      return browser(htmlStarter);
    case 'css':
      return browser(cssStarter);
    case 'js':
      if (dayNumber === 8) return node('npm test', jestStarter); // Jest day
      if (dayNumber === 5 || dayNumber === 10) return browser(jsModulesStarter); // project days
      return browser(jsStarter);
    case 'ts':
      return dayNumber === 4
        ? node('npm test', (task) => typescriptStarter(task, true)) // ts-jest day
        : node('npm run check', (task) => typescriptStarter(task, false));
    case 'node':
      if (dayNumber <= 2) return node('npm test', (task) => nodeStarter(task, 'cli'));
      if (dayNumber === 3) return node('npm test', (task) => nodeStarter(task, 'http'));
      return node('npm test', (task) => nodeStarter(task, 'express'));
    case 'postgresql': {
      if (dayNumber === 6) return node('npm test', (task) => nodeStarter(task, 'pglite')); // Node.js with PostgreSQL
      const setupSql = SQL_SETUP_BY_DAY[dayId] ?? null;
      return {
        runtime: 'sql',
        runCommand: null,
        setupSql,
        starterFiles: (task) => sqlStarter(task, setupSql !== null),
      };
    }
    case 'prisma':
      return node(null, prismaStarter); // Prisma in the browser is future work: terminal only
    case 'react':
      if (dayNumber === 10) {
        return node('npm test', (task) => reactStarter(task, { apiProxy: false, tests: true }));
      }
      return node('npm run dev', (task) =>
        reactStarter(task, { apiProxy: dayNumber >= 7, tests: false })
      );
    default:
      return browser(jsStarter);
  }
}
