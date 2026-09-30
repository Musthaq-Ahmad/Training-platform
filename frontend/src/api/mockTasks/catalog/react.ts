// Generated from the Phase 1 and Phase 2 Trainee Guides (task text is the guides' wording).
// Task ids follow the day page: `${dayId}-t-${sequenceOrder}`.
import type { CatalogDay } from '../types';

export const reactDays: CatalogDay[] = [
  {
    dayId: 'react-day-01',
    dayNumber: 1,
    courseTitle: 'React',
    tasks: [
      {
        id: 'react-day-01-t-1',
        sequenceOrder: 1,
        title: 'Build a static project and issue dashboard',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**React · Day 1: React mental model and setup**\n\nBuild a static component-based dashboard.\n\n## Today's goal\nUnderstand components, JSX, props and UI decomposition.\n\n## What you should know by the end of today\n- Create typed function components.\n- Break a screen into reusable parts.\n- Run a React TypeScript app with Vite.\n\n## Task\nBuild a static project and issue dashboard.\n\n## Functional requirements\n- App shell, header, sidebar, project card, issue card, badge, avatar and empty state.\n\n## Engineering expectations\n- Use semantic HTML.\n- No large monolithic component.\n- Props must be typed.\n\n## Suggested implementation order\n1. Sketch component tree.\n2. Create project.\n3. Build small components.\n4. Compose page.\n5. Review accessibility and responsiveness.\n\n## Resources\n- React Learn — Complete Quick Start.\n- Describing the UI — Read components, importing and JSX.\n- Vite guide — Use the React TypeScript starter.\n",
      },
      {
        id: 'react-day-01-t-2',
        sequenceOrder: 2,
        title: 'Create a component gallery page showing all variants',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**React · Day 1: React mental model and setup** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nCreate a component gallery page showing all variants.\n\n## Builds on\nBuild a static project and issue dashboard.\n',
      },
    ],
  },
  {
    dayId: 'react-day-02',
    dayNumber: 2,
    courseTitle: 'React',
    tasks: [
      {
        id: 'react-day-02-t-1',
        sequenceOrder: 1,
        title: 'Build the Issue List screen',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**React · Day 2: Props, lists and conditional rendering**\n\nRender reusable UI from data.\n\n## Today's goal\nBuild an issue list with correctly typed props and UI states.\n\n## What you should know by the end of today\n- Render arrays with stable keys.\n- Use conditional rendering clearly.\n- Avoid duplicated markup.\n\n## Task\nBuild the Issue List screen.\n\n## Functional requirements\n- Status and priority variations, empty list, overdue indicator and reusable rows/cards.\n\n## Engineering expectations\n- Do not use array index as a key when a stable ID exists.\n- Keep display components free of hard-coded business data.\n\n## Suggested implementation order\n1. Define issue types.\n2. Create sample data.\n3. Build one row/card.\n4. Render list.\n5. Add empty and overdue states.\n\n## Resources\n- React: Describing the UI — Read rendering lists and conditional rendering.\n",
      },
      {
        id: 'react-day-02-t-2',
        sequenceOrder: 2,
        title: 'Add grouped display by status',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**React · Day 2: Props, lists and conditional rendering** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nAdd grouped display by status.\n\n## Builds on\nBuild the Issue List screen.\n',
      },
    ],
  },
  {
    dayId: 'react-day-03',
    dayNumber: 3,
    courseTitle: 'React',
    tasks: [
      {
        id: 'react-day-03-t-1',
        sequenceOrder: 1,
        title: 'Add search, filters, sorting and issue creation',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**React · Day 3: State and events**\n\nMake the issue screen interactive.\n\n## Today's goal\nUse state, events and derived values without mutating data.\n\n## What you should know by the end of today\n- Use useState and controlled inputs.\n- Calculate filtered results from state.\n- Update arrays immutably.\n\n## Task\nAdd search, filters, sorting and issue creation.\n\n## Functional requirements\n- Search, status filter, priority filter, sort, add issue and clear filters.\n\n## Engineering expectations\n- Do not store filtered arrays as duplicate state.\n- No external state library.\n\n## Suggested implementation order\n1. Identify minimal state.\n2. Add controlled inputs.\n3. Create derived filtered data.\n4. Implement add action.\n5. Test interactions manually.\n\n## Resources\n- React: Adding Interactivity — Read events, state and updating arrays.\n",
      },
      {
        id: 'react-day-03-t-2',
        sequenceOrder: 2,
        title: 'Persist filters in the URL',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**React · Day 3: State and events** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nPersist filters in the URL.\n\n## Builds on\nAdd search, filters, sorting and issue creation.\n',
      },
    ],
  },
  {
    dayId: 'react-day-04',
    dayNumber: 4,
    courseTitle: 'React',
    tasks: [
      {
        id: 'react-day-04-t-1',
        sequenceOrder: 1,
        title: 'Build create/edit issue forms',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**React · Day 4: Forms and validation**\n\nBuild an accessible issue form.\n\n## Today's goal\nHandle controlled fields, validation and submit states.\n\n## What you should know by the end of today\n- Validate on submit and at field level.\n- Associate labels and errors.\n- Handle unsaved changes.\n\n## Task\nBuild create/edit issue forms.\n\n## Functional requirements\n- Title, description, project, assignee, priority, status, due date and labels.\n- Error summary, disabled submitting state and cancel confirmation.\n\n## Engineering expectations\n- Error messages must be actionable.\n- Form submission must not occur with invalid data.\n\n## Suggested implementation order\n1. Define form model.\n2. Build reusable field components only where useful.\n3. Implement validation.\n4. Add submit and cancel states.\n5. Keyboard-test the form.\n\n## Resources\n- React forms guidance — Review controlled inputs.\n",
      },
      {
        id: 'react-day-04-t-2',
        sequenceOrder: 2,
        title: 'Add reusable validation helpers with tests',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**React · Day 4: Forms and validation** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nAdd reusable validation helpers with tests.\n\n## Builds on\nBuild create/edit issue forms.\n',
      },
    ],
  },
  {
    dayId: 'react-day-05',
    dayNumber: 5,
    courseTitle: 'React',
    tasks: [
      {
        id: 'react-day-05-t-1',
        sequenceOrder: 1,
        title: 'Build the assessed Leave Request interface',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**React · Day 5: React assessment**\n\nDemonstrate React fundamentals independently.\n\n## Today's goal\nBuild an Employee Leave Request interface from a supplied design.\n\n## What you should know by the end of today\n- Apply component design, state, TypeScript and accessibility.\n- Handle common UI states.\n- Deliver responsive work.\n\n## Task\nBuild the assessed Leave Request interface.\n\n## Functional requirements\n- Request list, filters, form, balance summary, loading, empty and error states.\n\n## Engineering expectations\n- Match the provided design reasonably.\n- Do not omit responsive behaviour.\n\n## Suggested implementation order\n1. Analyse screen.\n2. Create component plan.\n3. Implement static layout.\n4. Add state and validation.\n5. Test and polish.\n\n## Resources\n- React Learn — Use as reference only.\n",
      },
    ],
  },
  {
    dayId: 'react-day-06',
    dayNumber: 6,
    courseTitle: 'React',
    tasks: [
      {
        id: 'react-day-06-t-1',
        sequenceOrder: 1,
        title: 'Add routes for login, projects, issues, profile and not-found states',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**React · Day 6: Routing and pages**\n\nTurn components into a navigable application.\n\n## Today's goal\nUse client-side routing, parameters and nested layouts.\n\n## What you should know by the end of today\n- Define routes and layouts.\n- Read route parameters.\n- Handle missing pages and invalid IDs.\n\n## Task\nAdd routes for login, projects, issues, profile and not-found states.\n\n## Functional requirements\n- Nested application layout, active navigation and working direct URLs.\n\n## Engineering expectations\n- Do not render every page conditionally in one component.\n- Provide useful invalid-ID states.\n\n## Suggested implementation order\n1. Install router.\n2. Create route map.\n3. Build layout and navigation.\n4. Add parameterised routes.\n5. Test direct navigation.\n\n## Resources\n- React Router documentation — Follow declarative-mode setup.\n",
      },
      {
        id: 'react-day-06-t-2',
        sequenceOrder: 2,
        title: 'Add breadcrumb navigation derived from routes',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**React · Day 6: Routing and pages** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nAdd breadcrumb navigation derived from routes.\n\n## Builds on\nAdd routes for login, projects, issues, profile and not-found states.\n',
      },
    ],
  },
  {
    dayId: 'react-day-07',
    dayNumber: 7,
    courseTitle: 'React',
    tasks: [
      {
        id: 'react-day-07-t-1',
        sequenceOrder: 1,
        title: 'Connect project and issue lists to the backend',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**React · Day 7: API integration**\n\nConnect React to the backend safely.\n\n## Today's goal\nBuild a typed API layer with complete loading and error states.\n\n## What you should know by the end of today\n- Fetch data from the backend.\n- Handle success, empty, validation, network and server states.\n- Use environment-based API URLs.\n\n## Task\nConnect project and issue lists to the backend.\n\n## Functional requirements\n- Loading, empty, error and retry states.\n- Typed response mapping.\n\n## Engineering expectations\n- Do not call fetch directly from many display components.\n- Never hard-code localhost URLs in production code.\n\n## Suggested implementation order\n1. Create API client.\n2. Add environment config.\n3. Fetch projects.\n4. Fetch issues.\n5. Add all UI states.\n6. Test failed requests.\n\n## Resources\n- MDN Fetch API — Read requests, responses and errors.\n",
      },
      {
        id: 'react-day-07-t-2',
        sequenceOrder: 2,
        title: 'Add request cancellation when navigating away',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**React · Day 7: API integration** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nAdd request cancellation when navigating away.\n\n## Builds on\nConnect project and issue lists to the backend.\n',
      },
    ],
  },
  {
    dayId: 'react-day-08',
    dayNumber: 8,
    courseTitle: 'React',
    tasks: [
      {
        id: 'react-day-08-t-1',
        sequenceOrder: 1,
        title: 'Create useProjects, useIssues, useIssue, useDebounce and useDocumentTitle',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**React · Day 8: Effects and custom hooks**\n\nSeparate reusable data behaviour from UI.\n\n## Today's goal\nUse effects deliberately and create useful custom hooks.\n\n## What you should know by the end of today\n- Explain effect dependencies and cleanup.\n- Avoid effects for pure calculations.\n- Create reusable hooks.\n\n## Task\nCreate useProjects, useIssues, useIssue, useDebounce and useDocumentTitle.\n\n## Functional requirements\n- Correct loading/error behaviour and cleanup.\n\n## Engineering expectations\n- No disabled exhaustive-deps rule without explanation.\n- Hooks expose a clear, typed API.\n\n## Suggested implementation order\n1. Identify repeated logic.\n2. Extract one hook.\n3. Test behaviour manually.\n4. Add remaining hooks.\n5. Review every effect for necessity.\n\n## Resources\n- React: Synchronizing with Effects — Read the full section.\n- You Might Not Need an Effect — Use as a decision guide.\n",
      },
      {
        id: 'react-day-08-t-2',
        sequenceOrder: 2,
        title: 'Add simple hook tests',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**React · Day 8: Effects and custom hooks** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nAdd simple hook tests.\n\n## Builds on\nCreate useProjects, useIssues, useIssue, useDebounce and useDocumentTitle.\n',
      },
    ],
  },
  {
    dayId: 'react-day-09',
    dayNumber: 9,
    courseTitle: 'React',
    tasks: [
      {
        id: 'react-day-09-t-1',
        sequenceOrder: 1,
        title:
          'Implement login, authentication context, session restore, logout and protected routes',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**React · Day 9: Authentication state and context**\n\nMaintain user session and protect pages.\n\n## Today's goal\nUse Context for authentication without turning all state global.\n\n## What you should know by the end of today\n- Restore a session.\n- Protect routes.\n- Show role-aware navigation.\n\n## Task\nImplement login, authentication context, session restore, logout and protected routes.\n\n## Functional requirements\n- Unauthorised page and role-aware navigation.\n\n## Engineering expectations\n- Frontend hiding is not authorisation.\n- Avoid storing unrelated application data in auth context.\n\n## Suggested implementation order\n1. Build API login call.\n2. Create auth context.\n3. Restore session.\n4. Protect routes.\n5. Add logout and role UI.\n\n## Resources\n- React: Passing Data Deeply — Read Context guidance.\n",
      },
      {
        id: 'react-day-09-t-2',
        sequenceOrder: 2,
        title: 'Handle expired sessions globally',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**React · Day 9: Authentication state and context** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nHandle expired sessions globally.\n\n## Builds on\nImplement login, authentication context, session restore, logout and protected routes.\n',
      },
    ],
  },
  {
    dayId: 'react-day-10',
    dayNumber: 10,
    courseTitle: 'React',
    tasks: [
      {
        id: 'react-day-10-t-1',
        sequenceOrder: 1,
        title:
          'Test login, filtering, issue form, empty/error states, retry, protected routes and navigation',
        isStretchGoal: false,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**React · Day 10: React testing**\n\nTest behaviour from a user's perspective.\n\n## Today's goal\nWrite resilient component and integration tests.\n\n## What you should know by the end of today\n- Use accessible queries.\n- Simulate realistic user actions.\n- Mock network boundaries.\n\n## Task\nTest login, filtering, issue form, empty/error states, retry, protected routes and navigation.\n\n## Functional requirements\n- At least ten meaningful tests.\n\n## Engineering expectations\n- Prefer getByRole/getByLabelText.\n- Avoid testing internal state or component implementation details.\n\n## Suggested implementation order\n1. Configure test environment.\n2. Test one simple component.\n3. Test user interaction.\n4. Mock API responses.\n5. Add failure cases.\n\n## Resources\n- React Testing Library — Read the introduction.\n- Testing Library queries — Follow query priority.\n",
      },
      {
        id: 'react-day-10-t-2',
        sequenceOrder: 2,
        title:
          'Add a reusable render helper with router and auth providers. Core reference library Node.js Learn Express guide TypeScript Handbook Jest documentation PostgreSQL tutorial Prisma documentation React Learn Vite guide React Router React Testing Library',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**React · Day 10: React testing** · Stretch task\n\n> Attempt this only when the main task is finished.\n\n## Task\nAdd a reusable render helper with router and auth providers. Core reference library Node.js Learn Express guide TypeScript Handbook Jest documentation PostgreSQL tutorial Prisma documentation React Learn Vite guide React Router React Testing Library\n\n## Builds on\nTest login, filtering, issue form, empty/error states, retry, protected routes and navigation.\n',
      },
    ],
  },
];
