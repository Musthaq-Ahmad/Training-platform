// Generated from the Phase 1 and Phase 2 Trainee Guides (task text is the guides' wording).
// Task ids follow the day page: `${dayId}-t-${sequenceOrder}`.
import type { CatalogDay } from '../types';

export const nodejsDays: CatalogDay[] = [
  {
    dayId: 'node-day-01',
    dayNumber: 1,
    courseTitle: 'Node.js',
    tasks: [
      {
        id: 'node-day-01-t-1',
        sequenceOrder: 1,
        title:
          'Build a System Information CLI that accepts commands and prints runtime information',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**Node.js · Day 1: Node.js runtime and project setup**\n\nCreate a production-style TypeScript Node.js workspace.\n\n## Today's goal\nUnderstand the Node.js runtime and create a repeatable project setup that another developer can run.\n\n## What you should know by the end of today\n- Explain Node.js versus browser JavaScript.\n- Use npm scripts, environment variables and command-line arguments.\n- Compile and run TypeScript in strict mode.\n\n## Task\nBuild a System Information CLI that accepts commands and prints runtime information.\n\n## Functional requirements\n- Commands for version, operating system, memory, current directory and environment.\n- Helpful output for invalid commands.\n- README with install, development, build and test commands.\n\n## Engineering expectations\n- Use strict TypeScript.\n- Separate command parsing from data collection.\n- Add at least five Jest tests.\n\n## Suggested implementation order\n1. Initialise the repository and TypeScript configuration.\n2. Create npm scripts.\n3. Implement one command at a time.\n4. Extract reusable functions.\n5. Add tests and documentation.\n\n## Resources\n- Node.js Learn — Read the introduction and command-line sections.\n- TypeScript Handbook — Review modules, strict typing and project configuration.\n",
      },
      {
        id: 'node-day-01-t-2',
        sequenceOrder: 2,
        title: 'Add a --json option that prints machine-readable output',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**Node.js · Day 1: Node.js runtime and project setup** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nAdd a --json option that prints machine-readable output.\n\n## Builds on\nBuild a System Information CLI that accepts commands and prints runtime information.\n',
      },
    ],
  },
  {
    dayId: 'node-day-02',
    dayNumber: 2,
    courseTitle: 'Node.js',
    tasks: [
      {
        id: 'node-day-02-t-1',
        sequenceOrder: 1,
        title: 'Build a file-based Task Manager CLI',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**Node.js · Day 2: Files, promises and error handling**\n\nBuild a persistent command-line application.\n\n## Today's goal\nUse async/await correctly and keep storage concerns separate from business logic.\n\n## What you should know by the end of today\n- Read and write files using promise-based APIs.\n- Handle malformed or missing data safely.\n- Avoid unhandled promise rejections.\n\n## Task\nBuild a file-based Task Manager CLI.\n\n## Functional requirements\n- Add, list, complete, delete and filter tasks.\n- Persist tasks in JSON.\n- Recover gracefully when the file does not yet exist.\n\n## Engineering expectations\n- No synchronous file APIs.\n- Repository/storage functions must be separate from commands.\n- Include tests for failure cases.\n\n## Suggested implementation order\n1. Define the Task type.\n2. Build storage functions.\n3. Build service functions.\n4. Add CLI commands.\n5. Test malformed data and missing IDs.\n\n## Resources\n- Node.js File System — Use the promise-based API.\n- Jest — Review asynchronous testing.\n",
      },
      {
        id: 'node-day-02-t-2',
        sequenceOrder: 2,
        title: 'Support exporting filtered tasks to a second JSON file',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**Node.js · Day 2: Files, promises and error handling** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nSupport exporting filtered tasks to a second JSON file.\n\n## Builds on\nBuild a file-based Task Manager CLI.\n',
      },
    ],
  },
  {
    dayId: 'node-day-03',
    dayNumber: 3,
    courseTitle: 'Node.js',
    tasks: [
      {
        id: 'node-day-03-t-1',
        sequenceOrder: 1,
        title: 'Convert the task manager into a Node.js HTTP API without Express',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**Node.js · Day 3: HTTP and REST fundamentals**\n\nExpose task data through an HTTP API.\n\n## Today's goal\nUnderstand requests, responses, status codes and REST resource design.\n\n## What you should know by the end of today\n- Explain HTTP method and status-code choices.\n- Parse route parameters and JSON bodies.\n- Return consistent JSON errors.\n\n## Task\nConvert the task manager into a Node.js HTTP API without Express.\n\n## Functional requirements\n- GET /tasks, GET /tasks/:id, POST /tasks, PATCH /tasks/:id and DELETE /tasks/:id.\n- Correct status codes for success, validation failure and missing resources.\n\n## Engineering expectations\n- Set Content-Type correctly.\n- Do not duplicate response-writing logic.\n- Validate all input before saving.\n\n## Suggested implementation order\n1. Write the API contract first.\n2. Build response helpers.\n3. Implement routing.\n4. Connect the service layer.\n5. Test with an API client and Jest.\n\n## Resources\n- Node.js HTTP — Review server, request and response APIs.\n- MDN HTTP overview — Use as a protocol reference.\n",
      },
      {
        id: 'node-day-03-t-2',
        sequenceOrder: 2,
        title: 'Add filtering by completion status through query parameters',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**Node.js · Day 3: HTTP and REST fundamentals** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nAdd filtering by completion status through query parameters.\n\n## Builds on\nConvert the task manager into a Node.js HTTP API without Express.\n',
      },
    ],
  },
  {
    dayId: 'node-day-04',
    dayNumber: 4,
    courseTitle: 'Node.js',
    tasks: [
      {
        id: 'node-day-04-t-1',
        sequenceOrder: 1,
        title: 'Migrate the Task API to Express and restructure the codebase',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**Node.js · Day 4: Express and layered architecture**\n\nRefactor the API into a maintainable Express application.\n\n## Today's goal\nLearn routing, middleware and separation of responsibilities.\n\n## What you should know by the end of today\n- Use Express routers and middleware.\n- Separate routes, controllers, services and repositories.\n- Handle errors centrally.\n\n## Task\nMigrate the Task API to Express and restructure the codebase.\n\n## Functional requirements\n- Preserve all existing endpoints.\n- Add request logging and a health endpoint.\n- Add centralised not-found and error handlers.\n\n## Engineering expectations\n- Routes contain no business logic.\n- Controllers do not access files directly.\n- Avoid any unless explained.\n\n## Suggested implementation order\n1. Create the folder structure.\n2. Move repository and service code first.\n3. Create controllers and routes. Add middleware.\n4. Run all existing tests.\n\n## Resources\n- Express routing — Read route methods and route parameters.\n- Express middleware — Read application- and router-level middleware.\n",
      },
      {
        id: 'node-day-04-t-2',
        sequenceOrder: 2,
        title: 'Add a request ID to every response',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**Node.js · Day 4: Express and layered architecture** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nAdd a request ID to every response.\n\n## Builds on\nMigrate the Task API to Express and restructure the codebase.\n',
      },
    ],
  },
  {
    dayId: 'node-day-05',
    dayNumber: 5,
    courseTitle: 'Node.js',
    tasks: [
      {
        id: 'node-day-05-t-1',
        sequenceOrder: 1,
        title: 'Build a file-backed Support Ticket API',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**Node.js · Day 5: Backend assessment 1**\n\nDemonstrate independent Node.js API development.\n\n## Today's goal\nBuild a Support Ticket API from a written requirement within one day.\n\n## What you should know by the end of today\n- Translate a requirement into endpoints and data structures.\n- Plan before coding.\n- Deliver tested, documented functionality.\n\n## Task\nBuild a file-backed Support Ticket API.\n\n## Functional requirements\n- Create, list, view, update status, assign and delete tickets.\n- Validate title, description, priority, status and assignee.\n- Provide API examples in the README.\n\n## Engineering expectations\n- Work independently.\n- Commit in logical increments.\n- Include unit and endpoint tests.\n\n## Suggested implementation order\n1. Read and clarify the requirement.\n2. Write endpoint and type definitions.\n3. Implement the smallest complete flow.\n4. Add remaining endpoints.\n5. Test and document.\n\n## Resources\n- Node.js Learn — Use as reference only.\n- Express guide — Use as reference only.\n",
      },
    ],
  },
];
