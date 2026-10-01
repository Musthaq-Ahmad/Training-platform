import type { ErrorCode, TaskCodeResponse, TaskResponse } from '@itp/types';
import {
  nodeTaskCodeFixture,
  nodeTaskFixture,
  sqlTaskCodeFixture,
  sqlTaskFixture,
  sqlTaskWithSetupFixture,
  taskCodeFixture,
  taskFixture,
} from '../../test/fixtures/task';

// Test scenarios for the task page: open /tasks/<id> with VITE_USE_MOCKS=true.
// Real curriculum tasks live in ./catalog; these cover runtimes, states and errors.

type ScenarioError = { status: number; code: ErrorCode; message: string };

export type Scenario = {
  task: TaskResponse;
  code: TaskCodeResponse;
  /** Make one endpoint fail, to test error states. */
  fail?: Partial<Record<'getTask' | 'getCode' | 'saveCode' | 'submit', ScenarioError>>;
};

function scenario(id: string, task: Omit<TaskResponse, 'id'>, code: TaskCodeResponse): Scenario {
  return { task: { ...task, id }, code };
}

const testDay = (courseTitle: string) => ({ id: 'html-day-01', dayNumber: 1, courseTitle });

function files(entries: Record<string, string>): TaskCodeResponse {
  return {
    updatedAt: null,
    files: Object.entries(entries).map(([path, content]) => ({ path, content })),
  };
}

const modulesTask = scenario(
  't-modules',
  {
    ...taskFixture,
    title: 'Browser runtime check: modules, TypeScript, fetch and storage',
    status: 'in_progress',
    instructionsMarkdown: `## Browser runtime check
- \`js/main.js\` imports \`./utils.js\` and a TypeScript file (\`./format.ts\`).
- A fetch to JSONPlaceholder works; a fetch to example.com is blocked.
- The theme toggle is saved in localStorage and survives Run.
- The form submit is logged instead of navigating; \`about.html\` switches the preview.
`,
  },
  files({
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Modules check</title>
    <link rel="stylesheet" href="css/styles.css" />
    <script type="module" src="js/main.js"></script>
  </head>
  <body>
    <nav><a href="about.html">About</a> · <a href="https://example.com">External</a></nav>
    <h1>Modules check</h1>
    <button id="theme">Toggle theme</button>
    <form><input name="email" value="asha@example.com" /><button>Send</button></form>
    <ul id="posts"></ul>
  </body>
</html>
`,
    'about.html': `<!doctype html>\n<html lang="en"><head><meta charset="utf-8" /><title>About</title></head><body><h1>About</h1><a href="index.html">Back</a></body></html>\n`,
    'css/styles.css': `body { font-family: system-ui, sans-serif; }\nbody.dark { background: #111; color: #eee; }\n`,
    'js/utils.js': `export const twice = (n) => n * 2;\n`,
    'js/format.ts': `export function label(name: string, count: number): string {\n  return \`\${name}: \${count}\`;\n}\n`,
    'js/main.js': `import { twice } from './utils.js';
import { label } from './format.ts';

console.log(label('twice(21)', twice(21)));
console.warn('This is a warning');

const button = document.querySelector('#theme');
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
button.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
  .then((res) => res.json())
  .then((posts) => {
    document.querySelector('#posts').innerHTML = posts.map((p) => \`<li>\${p.title}</li>\`).join('');
  });

fetch('https://example.com').catch((error) => console.error('Blocked as expected:', error.message));
`,
  })
);

const noHtmlTask = scenario(
  't-no-html',
  { ...taskFixture, title: 'Browser task without an .html file', status: 'not_started' },
  files({ 'styles.css': `/* No .html file: Run should be disabled. */\n`, 'notes.md': `# Notes\n` })
);

const typescriptTask = scenario(
  't-ts',
  {
    ...nodeTaskFixture,
    title: 'TypeScript check with a type error',
    day: testDay('TypeScript'),
    runCommand: 'npm run check',
    instructionsMarkdown: `## TypeScript runtime check\nRun shows one type error in \`src/index.ts\`. Fix it and run again.\n`,
  },
  files({
    'package.json': `{\n  "name": "ts-check",\n  "private": true,\n  "scripts": { "check": "tsc --noEmit" },\n  "devDependencies": { "typescript": "^5.6.3" }\n}\n`,
    'tsconfig.json': `{\n  "compilerOptions": { "strict": true, "target": "ES2022", "module": "ESNext", "moduleResolution": "Bundler", "noEmit": true },\n  "include": ["src"]\n}\n`,
    'src/index.ts': `export function total(prices: number[]): number {\n  return prices.reduce((sum, price) => sum + price, 0);\n}\n\n// Deliberate error: a string is not a number[]\nexport const broken = total('12');\n`,
  })
);

const depsTask = scenario(
  't-deps',
  {
    ...nodeTaskFixture,
    title: 'Node task with a dependency (npm install on start)',
    runCommand: 'npm start',
    instructionsMarkdown: `## npm install check\nThe terminal runs \`npm install\` first (lodash), then Run prints a chunked array.\n`,
  },
  files({
    'package.json': `{\n  "name": "deps-check",\n  "private": true,\n  "scripts": { "start": "node index.js" },\n  "dependencies": { "lodash": "^4.17.21" }\n}\n`,
    'index.js': `const _ = require('lodash');\n\nconsole.log(_.chunk([1, 2, 3, 4, 5], 2));\n`,
  })
);

const reactTask = scenario(
  't-react',
  {
    ...nodeTaskFixture,
    title: 'React (Vite) dev server with Preview',
    day: testDay('React'),
    runCommand: 'npm run dev',
    instructionsMarkdown: `## React runtime check\nRun starts Vite; the Preview tab shows the counter. Edits hot-reload.\n`,
  },
  files({
    'package.json': `{\n  "name": "react-check",\n  "private": true,\n  "type": "module",\n  "scripts": { "dev": "vite" },\n  "dependencies": { "react": "^18.3.1", "react-dom": "^18.3.1" },\n  "devDependencies": { "vite": "^5.4.10", "@vitejs/plugin-react": "^4.3.3" }\n}\n`,
    'vite.config.js': `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({ plugins: [react()] });\n`,
    'index.html': `<!doctype html>\n<html lang="en">\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>\n`,
    'src/main.jsx': `import { createRoot } from 'react-dom/client';\nimport App from './App.jsx';\n\ncreateRoot(document.getElementById('root')).render(<App />);\n`,
    'src/App.jsx': `import { useState } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;\n}\n`,
  })
);

const fullstackTask = scenario(
  't-fullstack',
  {
    ...nodeTaskFixture,
    title: 'Full-stack: API + React in one terminal',
    day: testDay('React'),
    runCommand: 'npm run dev',
    instructionsMarkdown: `## Full-stack check\nRun starts the API (port 3000) and Vite together with \`concurrently\`. The page loads tickets through \`/api\` (Vite proxy).\n`,
  },
  files({
    'package.json': `{\n  "name": "fullstack-check",\n  "private": true,\n  "type": "module",\n  "scripts": {\n    "dev": "concurrently \\"npm run server\\" \\"npm run client\\"",\n    "server": "node server/index.js",\n    "client": "vite"\n  },\n  "dependencies": { "express": "^4.21.1", "react": "^18.3.1", "react-dom": "^18.3.1" },\n  "devDependencies": { "concurrently": "^9.1.0", "vite": "^5.4.10", "@vitejs/plugin-react": "^4.3.3" }\n}\n`,
    'server/index.js': `import express from 'express';\n\nconst app = express();\napp.get('/api/tickets', (_req, res) => {\n  res.json([{ id: 1, title: 'Invoice total is wrong' }, { id: 2, title: 'Cannot reset password' }]);\n});\n\napp.listen(3000, () => console.log('API on http://localhost:3000'));\n`,
    'vite.config.js': `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n  server: { proxy: { '/api': 'http://localhost:3000' } },\n});\n`,
    'index.html': `<!doctype html>\n<html lang="en">\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>\n`,
    'src/main.jsx': `import { createRoot } from 'react-dom/client';\nimport App from './App.jsx';\n\ncreateRoot(document.getElementById('root')).render(<App />);\n`,
    'src/App.jsx': `import { useEffect, useState } from 'react';\n\nexport default function App() {\n  const [tickets, setTickets] = useState([]);\n  useEffect(() => {\n    fetch('/api/tickets').then((res) => res.json()).then(setTickets);\n  }, []);\n  return <ul>{tickets.map((t) => <li key={t.id}>{t.title}</li>)}</ul>;\n}\n`,
  })
);

const completedTask = scenario(
  't-completed',
  { ...taskFixture, title: 'Already submitted task', status: 'completed' },
  taskCodeFixture
);

const largeFileTask = scenario(
  't-large',
  {
    ...taskFixture,
    title: 'File over the 200,000-character limit',
    instructionsMarkdown: `## Save limit check\n\`data.json\` is over 200,000 characters, so autosave is blocked until it's smaller.\n`,
  },
  files({
    'index.html': `<!doctype html>\n<html lang="en"><body><h1>Large file</h1></body></html>\n`,
    'data.json': JSON.stringify({ padding: 'x'.repeat(200_001) }),
  })
);

const saveErrorTask: Scenario = {
  ...scenario('t-save-error', { ...taskFixture, title: 'Autosave fails (500)' }, taskCodeFixture),
  fail: {
    saveCode: {
      status: 500,
      code: 'INTERNAL_ERROR',
      message: 'Could not save your code. Try again.',
    },
  },
};

const submitErrorTask: Scenario = {
  ...scenario('t-submit-error', { ...taskFixture, title: 'Submit is rejected' }, taskCodeFixture),
  fail: {
    submit: {
      status: 403,
      code: 'CHECKLIST_INCOMPLETE',
      message: 'Tick every required self-check item before submitting.',
    },
  },
};

const serverErrorTask: Scenario = {
  ...scenario('t-server-error', { ...taskFixture, title: 'Server error' }, taskCodeFixture),
  fail: {
    getTask: { status: 500, code: 'INTERNAL_ERROR', message: 'Something went wrong on our side.' },
  },
};

export const scenarios: Record<string, Scenario> = Object.fromEntries(
  [
    scenario('t-browser', taskFixture, taskCodeFixture),
    scenario('t-node', nodeTaskFixture, nodeTaskCodeFixture),
    scenario('t-sql', sqlTaskFixture, sqlTaskCodeFixture),
    scenario('t-sql-setup', sqlTaskWithSetupFixture, {
      updatedAt: null,
      files: [{ path: 'queries.sql', content: 'select * from rooms;\n' }],
    }),
    modulesTask,
    noHtmlTask,
    typescriptTask,
    depsTask,
    reactTask,
    fullstackTask,
    completedTask,
    largeFileTask,
    saveErrorTask,
    submitErrorTask,
    serverErrorTask,
  ].map((s) => [s.task.id, s])
);
