import type { DayTask, TaskStatus } from '@itp/types';

// Temporary static data. Tasks will come from the backend (GET /days/:dayId/tasks).
// Keyed by dayId, the same ids used in the day content files.

// Builds one task. The last task of a day can be flagged as the stretch goal.
function task(
  dayId: string,
  sequenceOrder: number,
  title: string,
  status: TaskStatus,
  isStretchGoal = false
): DayTask {
  return {
    id: `${dayId}-t-${sequenceOrder}`,
    sequenceOrder,
    title,
    status,
    isStretchGoal,
  };
}

// Builds a day's task list from dayId titles, plus an optional stretch goal.
function tasksFor(
  dayId: string,
  titles: string[],
  status: TaskStatus,
  stretchTitle?: string
): DayTask[] {
  const tasks = titles.map((title, index) => task(dayId, index + 1, title, status));
  if (stretchTitle) tasks.push(task(dayId, titles.length + 1, stretchTitle, status, true));
  return tasks;
}

export const mockTasksByDay: Record<string, DayTask[]> = {
  'html-day-01': tasksFor(
    'html-day-01',
    [
      'HML5 Boilerplate from Memory',
      'Personal Profile Page',
      'Recipe Page with All Three List Types',
      'News Article with Semantic Text Elements',
      'Internal Navigation with Anchor Links',
      'Every Inline Text Element',
    ],
    'completed',
    'CV for a fictional software engineer in pure HTML'
  ),

  'html-day-02': tasksFor(
    'html-day-02',
    [
      'Full Semantic Page Rebuild',
      'Multi-Article Blog Page',
      'ARIA Hands-On',
      'Accessible Image Gallery',
      'Accessibility Audit & Fix',
      'Full Press Release Page',
    ],
    'completed',
    'A fully semantic, fully accessible portfolio homepage'
  ),

  'html-day-03': tasksFor(
    'html-day-03',
    [
      'Login Form - Accessibility First',
      'Full Registration Form - Every Input Type',
      'Native HTML5 Validation',
      'Payment / Checkout Form',
      'Multi-Section Application Form',
      'Accessible Form Audit',
    ],
    'completed',
    ' comprehensive job application form '
  ),

  'html-day-04': tasksFor(
    'html-day-04',
    [
      'League Table - Data Table Best Practices',
      'Comparison Table with Spanning',
      'Weekly Timetable with Multi-Span Cells',
      'Audio & Video with Accessibility',
      'Responsive Images - srcset & picture',
      'Complete Metadata for Social Sharing',
    ],
    'completed',
    ' sports results archive page '
  ),

  'html-day-05': tasksFor(
    'html-day-05',
    [
      'Project Setup',
      'Build Home Page + About Page',
      'Build Services Page',
      'Build Team Page + Contact Page',
      'Cross-link, Polish & Final Validation',
      'README + GitHub Pages Deploy',
    ],
    'completed',
    'Add a sixth page - a Products page '
  ),

  'css-day-01': tasksFor(
    'css-day-01',
    [
      'Selector Challenge Sheet',
      'Specificity Battle - Predict Before Running',
      'Box Model Deep Dive',
      'CSS Custom Properties Design System',
      'Typography System',
      'Backgrounds, Borders & Shadows',
      'Pseudo-Classes & Pseudo-Elements',
      'Apply Styles to Week 1 Home Page',
    ],
    'completed',
    'CSS design-system documentation page '
  ),

  'css-day-02': tasksFor(
    'css-day-02',
    [
      'Every Container Property',
      'Every Item Property',
      'Navigation Bar',
      'Card Component System',
      'Holy Grail Layout',
      'Style Checkout Form with Flexbox',
      'Apply Flexbox to Week 1 Blog Page',
      'Style About Page Footer Component',
    ],
    'completed',
    'e-commerce product listing page using only Flexbox for all layouts'
  ),

  'css-day-03': tasksFor(
    'css-day-03',
    [
      'Grid Sizing Methods - All Seven',
      'Line-Based Placement & Spanning',
      'Named Grid Areas - Magazine Layout',
      'Responsive Grid Without Media Queries',
      'Admin Dashboard Layout',
      'CSS Grid Calendar',
      'Style Week 1 Services Page',
      'Combine Grid and Flexbox',
    ],
    'not_started',
    ' newspaper homepage layout using CSS Grid '
  ),

  'css-day-04': tasksFor(
    'css-day-04',
    [
      'Mobile-First Responsive System',
      'Fluid Typography & Spacing with clamp()',
      'Transitions - Every Timing Function',
      'CSS Keyframe Animations',
      'Style Team Page - Responsive Card Grid',
      'CSS-Only Interactive Components',
      'Dark Mode with prefers-color-scheme',
      'Print Stylesheet',
    ],
    'not_started',
    ' fully animated, responsive landing page for a fictional SaaS product  '
  ),

  'css-day-05': tasksFor(
    'css-day-05',
    [
      'CSS Architecture Setup',
      'Style Home + About Pages',
      'Style Services Page',
      'Style Team + Contact Pages',
      'Global Polish & Consistency Pass',
      'Audit, Fix & Deploy',
    ],
    'not_started',
    'fully animated mobile navigation drawer '
  ),

  'js-day-01': tasksFor(
    'js-day-01',
    [
      'typeof & Type Coercion: Predict Before Running',
      'var, let, const: Scoping Rules',
      'Functions: Four Ways',
      'Closures in Practice',
      'Arrays & Objects: Mastery',
      'DOM Selection & Manipulation',
      'Wire the Dark Mode Toggle',
      'Mobile Navigation Drawer: JS Implementation',
    ],
    'not_started',
    'JavaScript Typing Speed Test'
  ),

  'js-day-02': tasksFor(
    'js-day-02',
    [
      'Bubbling, Capturing & stopPropagation',
      'Event Delegation: Dynamic To-Do List',
      'Control Flow Patterns',
      'Custom Errors & Global Handlers',
      'Live Search Filter on Services Page',
      'Accessible Accordion',
      'Scroll Animations & Progress Bar',
      'Image Lightbox',
    ],
    'not_started',
    'Keyboard Shortcut System'
  ),

  'js-day-03': tasksFor(
    'js-day-03',
    [
      'Class Hierarchy: Shape Calculator',
      'this Binding: All Four Rules',
      'Pure Functions & Immutable State',
      'Advanced Array Methods',
      'FormValidator Class',
      'Shopping Cart: Immutable + Observer',
      'Drag-and-Drop Kanban Board',
      'Blog Comment System',
    ],
    'not_started',
    'Sortable, Filterable, Paginated Data Table'
  ),

  'js-day-04': tasksFor(
    'js-day-04',
    [
      'Event Loop: Predict 10 Output Orders',
      'Promises from Scratch',
      'Fetch API: Full Pattern',
      'Async/Await: Full Patterns',
      'Live Weather Widget',
      'GitHub Profile Viewer',
      'Infinite Scroll Blog Feed',
      'URL State & Shareable Filters',
    ],
    'not_started',
    'Product Search System'
  ),

  'js-day-05': tasksFor(
    'js-day-05',
    [
      'ES Module Scaffold',
      'Wire All Core Features',
      'Wire All Form Validation',
      'API-Powered Content',
      'Polish, Lint & Deploy',
    ],
    'not_started',
    'Site-Wide Search'
  ),

  'js-day-06': tasksFor(
    'js-day-06',
    [
      'Higher-Order Function Utilities',
      'EventEmitter - Observer Pattern',
      'Factory & Builder Patterns',
      'Module Pattern & Refactor',
      'IntersectionObserver - Advanced',
      'MutationObserver & ResizeObserver',
      'Virtual Scroll for Large Lists',
      'Canvas Chart from Data',
    ],
    'not_started',
    'full dependency injection container'
  ),

  'js-day-07': tasksFor(
    'js-day-07',
    [
      'Storage Deep Dive',
      'Clipboard, Notifications & Geolocation',
      'History, URL & Navigation APIs',
      'Performance APIs',
      'Service Worker - Offline Caching',
      'Web App Manifest & PWA',
      'IndexedDB - Offline Data',
      'requestAnimationFrame & Animation Performance',
    ],
    'not_started',
    'fully offline note-taking PWA'
  ),

  'js-day-08': tasksFor(
    'js-day-08',
    [
      'First Tests - Matchers & Assertions',
      'Mock Functions - jest.fn() & jest.spyOn()',
      'Async Tests & Timer Mocks',
      'Module Mocking & Setup/Teardown',
      'DOM Testing with JSDOM',
      'Coverage Report - Find & Fix Gaps',
      'Test-Driven Development Mini Exercise',
      'CI-Ready Test Suite',
    ],
    'not_started',
    'complete test suite for the Kanban board'
  ),

  'js-day-09': tasksFor(
    'js-day-09',
    [
      'Layout Thrashing - Diagnose & Fix',
      'requestAnimationFrame Animation Loop',
      'Virtual Scroll - 10,000 Items',
      'WeakMap & Memory Management',
      'Canvas Charts',
      'Web Workers - Off-Main-Thread',
      'Proxy & Reactive State',
      'Portfolio Performance Pass',
    ],
    'not_started',
    'spreadsheet-like data grid in Canvas'
  ),

  'js-day-10': tasksFor(
    'js-day-10',
    [
      'Architecture Planning',
      'Build: Router + State Manager',
      'Build: Page & UI Components',
      'Features, Persistence & Polish',
      'Test Suite & Deploy',
    ],
    'not_started',
    'Real-time cross-tab sync using the BroadcastChannel API'
  ),

  'ts-day-01': tasksFor(
    'ts-day-01',
    [
      'Setup & First TypeScript Project',
      'Everyday Types',
      'Interfaces & Object Types',
      'Convert Week 3 Utils - Zero any',
      'Type Narrowing & Type Guards',
      'Convert CartModule to TypeScript',
      'Type Declarations for Third-Party Code',
      'Strict Mode Deep Dive',
    ],
    'not_started',
    'FormValidator to TypeScript with full generics '
  ),

  'ts-day-02': tasksFor(
    'ts-day-02',
    [
      'Generic Functions & Constraints',
      'Utility Types in Practice',
      'Discriminated Unions for API Responses',
      'Mapped Types',
      'Type-Safe State Manager',
      'Generic API Client',
      'Conditional & Infer Types',
      'Convert the Router to TypeScript',
    ],
    'not_started',
    'Build a type-safe query builder'
  ),

  'ts-day-03': tasksFor(
    'ts-day-03',
    [
      'Access Modifiers & Parameter Properties',
      'Interfaces & implements',
      'Abstract Classes',
      'Declaration Merging & Module Augmentation',
      'Convert TypedEventEmitter',
      'Convert FormValidator to TypeScript',
      'Design Pattern Interfaces',
      'TypeScript Decorators',
    ],
    'not_started',
    ' type-safe DI container '
  ),

  'ts-day-04': tasksFor(
    'ts-day-04',
    [
      'Incremental Migration Strategy',
      'Common Migration Errors & Fixes',
      'Third-Party Types',
      'Strict Null Checks - Full Pass',
      'ts-jest Setup & First Typed Tests',
      'Write New TypeScript Tests',
      'Coverage on TypeScript Project',
      'Type-Only Imports & Path Aliases',
    ],
    'not_started',
    'TypeScript utility type FormSchema<T>'
  ),

  'ts-day-05': tasksFor(
    'ts-day-05',
    [
      'Final Clean-up',
      'Documentation & README',
      'Polish & Final Commit',
      'Open PR & Self-Review',
      'Checkpoint 1 Review Preparation',
      'Phase 1 Reflection',
    ],
    'not_started',
    'runtime type validation to your TypeScript project '
  ),

  'nodejs-day-01': tasksFor(
    'nodejs-day-01',
    ['Build a System Information CLI that accepts commands and prints runtime information'],
    'not_started',
    'Add a --json option that prints machine-readable output'
  ),

  'nodejs-day-02': tasksFor(
    'nodejs-day-02',
    ['file-based Task Manager CLI.'],
    'not_started',
    'Support exporting filtered tasks to a second JSON file.'
  ),

  'nodejs-day-03': tasksFor(
    'nodejs-day-03',
    ['the task manager into a Node.js HTTP API without Express'],
    'not_started',
    'Add filtering by completion status through query parameters'
  ),

  'nodejs-day-04': tasksFor(
    'nodejs-day-04',
    ['Task API to Express'],
    'not_started',
    'Add a request ID to every response.'
  ),

  'nodejs-day-05': tasksFor('nodejs-day-05', ['file-backed Support Ticket API.'], 'not_started'),

  'postgresql-day-01': tasksFor(
    'postgresql-day-01',
    ['Design the Support Ticket database'],
    'not_started',
    'Add a labels/tags model without storing comma-separated values'
  ),

  'postgresql-day-02': tasksFor(
    'postgresql-day-02',
    ['Implement and seed the ticket-system schema'],
    'not_started',
    'Reusable reset script for the training database.'
  ),

  'postgresql-day-03': tasksFor(
    'postgresql-day-03',
    ['SQL pack for the Support Ticket system'],
    'not_started',
    'weekly workload report using a common table expression'
  ),

  'postgresql-day-04': tasksFor(
    'postgresql-day-04',
    ['transactional ticket reassignment and comparison of search query before and after indexing.'],
    'not_started',
    'Investigate a composite index for status and assignee.'
  ),

  'postgresql-day-05': tasksFor(
    'postgresql-day-05',
    ['Design and implement the Equipment Booking System database'],
    'not_started'
  ),

  'prisma-day-01': tasksFor(
    'prisma-day-01',
    ['Replace the file repository with PostgreSQL67'],
    'not_started',
    'Add graceful shutdown of the connection pool'
  ),

  'prisma-day-02': tasksFor(
    'prisma-day-02',
    ['Migrate the ticket API repository to Prisma'],
    'not_started',
    'Demonstrate how to correct a faulty migration in development.'
  ),

  'prisma-day-03': tasksFor(
    'prisma-day-03',
    ['Enhance GET /tickets'],
    'not_started',
    'Support multiple status values'
  ),

  'prisma-day-04': tasksFor(
    'prisma-day-04',
    ['Add a complete backend test suite'],
    'not_started',
    'Add a small test-data factory.'
  ),

  'prisma-day-05': tasksFor(
    'prisma-day-05',
    ['ticket comments and status history in the supplied codebase'],
    'not_started',
    'Add a history endpoint with pagination'
  ),
  'prisma-day-06': tasksFor(
    'prisma-day-06',
    ['Authentication to the ticket system'],
    'not_started',
    'Add token expiry handling'
  ),

  'prisma-day-07': tasksFor(
    'prisma-day-07',
    ['Add role-based and ownership-based permissions'],
    'not_started',
    'Add project membership permissions'
  ),

  'prisma-day-08': tasksFor(
    'prisma-day-08',
    ['security review and implement fixes'],
    'not_started',
    'Add an audit log for repeated rejected requests'
  ),
  'prisma-day-09': tasksFor(
    'prisma-day-09',
    ['operational readiness features'],
    'not_started',
    'Add readiness and liveness health endpoints'
  ),

  'react-day-01': tasksFor(
    'react-day-01',
    ['Build a static project and issue dashboard'],
    'not_started',
    'Create a component gallery page showing all variants'
  ),

  'react-day-02': tasksFor(
    'react-day-02',
    ['Build the Issue List screen'],
    'not_started',
    'Add grouped display by status'
  ),

  'react-day-03': tasksFor(
    'react-day-03',
    ['Add search, filters, sorting and issue creation'],
    'not_started',
    'Persist filters in the URL'
  ),

  'react-day-04': tasksFor(
    'react-day-04',
    ['Build create/edit issue forms.'],
    'not_started',
    'Add reusable validation helpers with tests'
  ),

  'react-day-05': tasksFor(
    'react-day-05',
    ['Build the assessed Leave Request interface'],
    'not_started'
  ),

  'react-day-06': tasksFor(
    'react-day-06',
    ['Add routes for login, projects, issues, profile and not-found states'],
    'not_started',
    'Add breadcrumb navigation derived from routes'
  ),

  'react-day-07': tasksFor(
    'react-day-07',
    ['Connect project and issue lists to the backend'],
    'not_started',
    'Add request cancellation when navigating away'
  ),

  'react-day-08': tasksFor(
    'react-day-08',
    ['Create useProjects, useIssues, useIssue, useDebounce and useDocumentTitle'],
    'not_started',
    'Add simple hook tests'
  ),

  'react-day-09': tasksFor(
    'react-day-09',
    ['Implement login, authentication context, session restore, logout and protected routes'],
    'not_started',
    'Handle expired sessions globally'
  ),

  'react-day-010': tasksFor(
    'react-day-010',
    [
      'Test login, filtering, issue form, empty/error states, retry, protected routes and navigation',
    ],
    'not_started',
    'Add a reusable render helper with router and auth providers'
  ),
};
