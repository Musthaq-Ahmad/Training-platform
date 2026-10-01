// Generated from the Phase 1 and Phase 2 Trainee Guides (task text is the guides' wording).
// Task ids follow the day page: `${dayId}-t-${sequenceOrder}`.
import type { CatalogDay } from '../types';

export const javascriptDays: CatalogDay[] = [
  {
    dayId: 'js-day-01',
    dayNumber: 1,
    courseTitle: 'JavaScript',
    tasks: [
      {
        id: 'js-day-01-t-1',
        sequenceOrder: 1,
        title: 'typeof & Type Coercion - Predict Before Running',
        isStretchGoal: false,
        estimatedMinutes: 30,
        instructionsMarkdown:
          "**JavaScript · Day 1: Types, Variables, Functions & Scope** · Task 1 of 8 · about 30 min\n\n## Today's goal\nBy the end of the day you will have built a dark mode toggle wired to localStorage on the real portfolio, and a scope/types reference file you will use all week.\n\n## What to do\n\n1. Open the browser console. Before running each, predict: typeof null, typeof [], typeof {}, typeof NaN, typeof function(){}, 0 == false, '' == false, null == undefined, null === undefined, NaN === NaN, 1 + '2', '3' - 1, true + true, [] + [], [] + {}\n2. For every wrong prediction, write a one-sentence explanation of why JS behaves that way\n3. Create types.js and log the typeof of one value for each primitive type plus object and function\n",
      },
      {
        id: 'js-day-01-t-2',
        sequenceOrder: 2,
        title: 'var, let, const - Scoping Rules',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**JavaScript · Day 1: Types, Variables, Functions & Scope** · Task 2 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a dark mode toggle wired to localStorage on the real portfolio, and a scope/types reference file you will use all week.\n\n## What to do\n\n1. Create scope.js. Write five pairs of identical-looking code using var vs let/const - show the difference in hoisting and block-scoping\n2. Demonstrate the temporal dead zone: access a let variable before its declaration, note the ReferenceError. Rewrite with var - note it logs undefined instead.\n3. Create three levels of nested functions. Inside the innermost, successfully log a variable from each outer scope.\n4. Show the var-in-loop closure bug (setTimeout in a for loop) and fix it with let\n",
      },
      {
        id: 'js-day-01-t-3',
        sequenceOrder: 3,
        title: 'Functions - Four Ways',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**JavaScript · Day 1: Types, Variables, Functions & Scope** · Task 3 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a dark mode toggle wired to localStorage on the real portfolio, and a scope/types reference file you will use all week.\n\n## What to do\n\n1. Write greet(name, greeting='Hello') as: a function declaration, a function expression, an arrow function, and an object method\n2. Build a calculator object with add, subtract, multiply, divide - handle division by zero\n3. Write createMultiplier(factor) - a factory returning a function that multiplies by factor. Verify: createMultiplier(3)(7) === 21\n4. Demonstrate arguments object vs rest parameters - show why arrow functions cannot use arguments\n",
      },
      {
        id: 'js-day-01-t-4',
        sequenceOrder: 4,
        title: 'Closures in Practice',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 1: Types, Variables, Functions & Scope** · Task 4 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a dark mode toggle wired to localStorage on the real portfolio, and a scope/types reference file you will use all week.\n\n## What to do\n\n1. Build createCounter() returning { increment, decrement, getCount, reset } - the count must be completely private\n2. Build memoize(fn) using a Map as cache - wrap a slow Fibonacci and measure first vs second call time\n3. Build once(fn) - ensures fn is called at most once; subsequent calls return the first result\n4. Build createRateLimiter(fn, maxCalls, windowMs) that throws if fn is called more than maxCalls times in windowMs\n",
      },
      {
        id: 'js-day-01-t-5',
        sequenceOrder: 5,
        title: 'Arrays & Objects - Mastery',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 1: Types, Variables, Functions & Scope** · Task 5 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a dark mode toggle wired to localStorage on the real portfolio, and a scope/types reference file you will use all week.\n\n## What to do\n\n1. Given 20 employee objects (name, dept, salary, yearsExp), chain methods to: filter Engineering with salary > 70000, map to {name, salary}, sort by salary descending - all in one expression\n2. Destructure a nested config object into flat variables in a single destructuring statement\n3. Merge two objects with spread. Show Object.entries(), keys(), values() on the result.\n4. Write deepClone(obj) that clones a flat object without JSON.parse/stringify\n",
      },
      {
        id: 'js-day-01-t-6',
        sequenceOrder: 6,
        title: 'DOM Selection & Manipulation',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 1: Types, Variables, Functions & Scope** · Task 6 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a dark mode toggle wired to localStorage on the real portfolio, and a scope/types reference file you will use all week.\n\n## What to do\n\n1. Link a JS file to portfolio index.html. Use every selection method: getElementById, getElementsByClassName, getElementsByTagName, querySelector, querySelectorAll\n2. Use DOM traversal to walk to parent, first child, last child, next sibling - log each\n3. Build addCard(title, body, imageUrl) that creates a card element and appends it using createElement + textContent (never innerHTML for user data)\n4. Build removeCard(id) and clearAllCards()\n",
      },
      {
        id: 'js-day-01-t-7',
        sequenceOrder: 7,
        title: 'Wire the Dark Mode Toggle',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 1: Types, Variables, Functions & Scope** · Task 7 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a dark mode toggle wired to localStorage on the real portfolio, and a scope/types reference file you will use all week.\n\n## What to do\n\n1. Add a dark mode toggle button to all five portfolio pages (CSS is already in place from Week 2)\n2. Write dark-mode.js: clicking toggles data-theme='dark' on the html element\n3. On page load, read localStorage and apply the saved preference before the page renders\n4. Sync the button's aria-pressed attribute with the current state\n5. Link dark-mode.js in all five pages - confirm it works across page navigations\n",
      },
      {
        id: 'js-day-01-t-8',
        sequenceOrder: 8,
        title: 'Mobile Navigation Drawer - JS Implementation',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 1: Types, Variables, Functions & Scope** · Task 8 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a dark mode toggle wired to localStorage on the real portfolio, and a scope/types reference file you will use all week.\n\n## What to do\n\n1. Replace the CSS-only hamburger from Week 2 with JS on all five pages\n2. Clicking the hamburger: adds class=open to the drawer, sets aria-expanded='true', prevents body scroll with overflow: hidden\n3. Clicking the overlay or pressing Escape closes the drawer and reverses all state\n4. Implement a focus trap: Tab must cycle through drawer links only\n",
      },
      {
        id: 'js-day-01-t-9',
        sequenceOrder: 9,
        title: 'Build a JavaScript typing speed test on a separate page',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**JavaScript · Day 1: Types, Variables, Functions & Scope** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a JavaScript typing speed test on a separate page. Show a text paragraph. When the user starts typing, start a timer. Highlight each correctly typed character green and incorrectly typed character red as they type. On completion show WPM, accuracy, and time. Persist the high score to localStorage.\n',
      },
    ],
  },
  {
    dayId: 'js-day-02',
    dayNumber: 2,
    courseTitle: 'JavaScript',
    tasks: [
      {
        id: 'js-day-02-t-1',
        sequenceOrder: 1,
        title: 'Bubbling, Capturing & stopPropagation',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**JavaScript · Day 2: Events, Control Flow & Error Handling** · Task 1 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built live search filter, accessible accordion, scroll animations, and a complete lightbox on the real portfolio site.\n\n## What to do\n\n1. Three-level nested div. Add click listeners in both bubble and capture phases on all three levels. Log phase name and element.\n2. Demonstrate stopPropagation() - click the child, outer listeners should not fire\n3. Demonstrate stopImmediatePropagation() - two listeners on same element, stop second\n4. Show preventDefault() on a form submit and on an anchor click\n",
      },
      {
        id: 'js-day-02-t-2',
        sequenceOrder: 2,
        title: 'Event Delegation - Dynamic To-Do List',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 2: Events, Control Flow & Error Handling** · Task 2 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built live search filter, accessible accordion, scroll animations, and a complete lightbox on the real portfolio site.\n\n## What to do\n\n1. Build a to-do list with ONE listener on the ul - not on individual items\n2. Use event.target.closest() to detect: checkbox click (mark complete), delete button (remove), item text click (make editable with contenteditable)\n3. Add items dynamically and verify delegation handles them without new listeners\n4. Count total listeners on the page - show it stays at one regardless of list length\n",
      },
      {
        id: 'js-day-02-t-3',
        sequenceOrder: 3,
        title: 'Control Flow Patterns',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 2: Events, Control Flow & Error Handling** · Task 3 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built live search filter, accessible accordion, scroll animations, and a complete lightbox on the real portfolio site.\n\n## What to do\n\n1. Write gradeToLetter(score) four ways: if/else, switch, ternary chain, lookup object. Benchmark 1M calls with console.time().\n2. Write processQueue(items) using three loops: while (until empty), do/while (at least once), for...of over a Map\n3. Write validateUser(user) using && short-circuit to check: user exists, user.email exists, email includes @, role is admin\n4. Refactor a provided deeply-nested if/else to use early returns - no nesting deeper than one level\n",
      },
      {
        id: 'js-day-02-t-4',
        sequenceOrder: 4,
        title: 'Custom Errors & Global Handlers',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**JavaScript · Day 2: Events, Control Flow & Error Handling** · Task 4 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built live search filter, accessible accordion, scroll animations, and a complete lightbox on the real portfolio site.\n\n## What to do\n\n1. Create ValidationError extending Error with statusCode, message, and field name\n2. Write parseUserInput(input) that throws TypeError, RangeError, or ValidationError for specific failures\n3. Catch each error type separately with different handling\n4. Add window.onerror and window.addEventListener('unhandledrejection') that display errors in a visible overlay on the page\n",
      },
      {
        id: 'js-day-02-t-5',
        sequenceOrder: 5,
        title: 'Live Search Filter on Services Page',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**JavaScript · Day 2: Events, Control Flow & Error Handling** · Task 5 of 8 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built live search filter, accessible accordion, scroll animations, and a complete lightbox on the real portfolio site.\n\n## What to do\n\n1. Search input above the services grid. Debounce keyup handler by 300ms using setTimeout/clearTimeout.\n2. Filter visible service cards so only those matching the search term show - hide others with display: none\n3. Highlight matching text inside each card with a span.highlight\n4. Show 'No results found' when nothing matches. Show a clear (×) button when input has content.\n",
      },
      {
        id: 'js-day-02-t-6',
        sequenceOrder: 6,
        title: 'Accessible Accordion',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 2: Events, Control Flow & Error Handling** · Task 6 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built live search filter, accessible accordion, scroll animations, and a complete lightbox on the real portfolio site.\n\n## What to do\n\n1. Replace the CSS-only accordion from Week 2 with JavaScript\n2. Each toggle button has aria-expanded='false'. Clicking opens the panel, sets aria-expanded='true', closes any other open panel.\n3. Keyboard: up/down moves focus between headers, Home/End jump to first/last, Enter/Space toggles\n4. Persist open state in sessionStorage\n",
      },
      {
        id: 'js-day-02-t-7',
        sequenceOrder: 7,
        title: 'Scroll Animations & Progress Bar',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 2: Events, Control Flow & Error Handling** · Task 7 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built live search filter, accessible accordion, scroll animations, and a complete lightbox on the real portfolio site.\n\n## What to do\n\n1. Add IntersectionObserver to all section headings and feature cards on the home page - add class=visible to trigger CSS animations\n2. Add reading progress bar to the blog article page: fixed div width tracks scrollY / document.body.scrollHeight\n3. Add back-to-top button that appears after 300px scroll - smooth scroll on click\n4. Use requestAnimationFrame for the progress bar update\n",
      },
      {
        id: 'js-day-02-t-8',
        sequenceOrder: 8,
        title: 'Image Lightbox',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 2: Events, Control Flow & Error Handling** · Task 8 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built live search filter, accessible accordion, scroll animations, and a complete lightbox on the real portfolio site.\n\n## What to do\n\n1. Clicking any gallery image opens a fullscreen overlay with blurred background\n2. Show prev/next navigation. Support keyboard: left/right arrows navigate, Escape closes.\n3. Focus trap inside the lightbox: Tab cycles through prev, next, close only\n4. Prevent body scroll when open. Add touch swipe support on mobile.\n",
      },
      {
        id: 'js-day-02-t-9',
        sequenceOrder: 9,
        title:
          'Build a keyboard shortcut system: / opens search, D toggles dark mode, G goes to gallery…',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**JavaScript · Day 2: Events, Control Flow & Error Handling** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a keyboard shortcut system: / opens search, D toggles dark mode, G goes to gallery, 1–5 navigate to each page, ? shows a shortcuts help modal with a styled table. Toast notification on each shortcut. Persist custom remapping to localStorage.\n',
      },
    ],
  },
  {
    dayId: 'js-day-03',
    dayNumber: 3,
    courseTitle: 'JavaScript',
    tasks: [
      {
        id: 'js-day-03-t-1',
        sequenceOrder: 1,
        title: 'Class Hierarchy - Shape Calculator',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**JavaScript · Day 3: OOP, Functional JS & Modern Array Methods** · Task 1 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a reusable FormValidator class, a shopping cart with immutable state, and a drag-and-drop Kanban board.\n\n## What to do\n\n1. Build Shape base class with constructor(name, colour), describe(), and static compare(a, b) returning the larger-area shape\n2. Extend: Circle(radius) with area()=πr² and perimeter()=2πr, Rectangle(w,h), Triangle(base, height)\n3. Override describe() in each subclass to include measurements\n4. Add ShapeCollection with add, removeById, getByType, sortByArea, getTotalArea\n5. Verify instanceof, Object.getPrototypeOf(), and constructor.name\n",
      },
      {
        id: 'js-day-03-t-2',
        sequenceOrder: 2,
        title: 'this Binding - All Four Rules',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**JavaScript · Day 3: OOP, Functional JS & Modern Array Methods** · Task 2 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a reusable FormValidator class, a shopping cart with immutable state, and a drag-and-drop Kanban board.\n\n## What to do\n\n1. Demonstrate all four: default binding (standalone call), implicit (method call), explicit (call/apply/bind), new (constructor)\n2. Show this-loss: assign a class method to a variable, call it, show this is undefined in strict mode. Fix three ways: arrow in constructor, .bind(), class field.\n3. Build bindAll(obj) that binds all enumerable methods to obj\n4. Show that arrow class fields fix this even in setTimeout callbacks\n",
      },
      {
        id: 'js-day-03-t-3',
        sequenceOrder: 3,
        title: 'Pure Functions & Immutable State',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 3: OOP, Functional JS & Modern Array Methods** · Task 3 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a reusable FormValidator class, a shopping cart with immutable state, and a drag-and-drop Kanban board.\n\n## What to do\n\n1. Write impure updateUser(users, id, changes) that mutates the array. Write the pure version. Verify the original is unchanged.\n2. Build a five-step pipeline: parseCSV, validateRows, transformRows, filterInvalid, formatOutput - each a pure function with no side effects\n3. Write deepFreeze(obj) that recursively freezes all nested objects\n",
      },
      {
        id: 'js-day-03-t-4',
        sequenceOrder: 4,
        title: 'Advanced Array Methods',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 3: OOP, Functional JS & Modern Array Methods** · Task 4 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a reusable FormValidator class, a shopping cart with immutable state, and a drag-and-drop Kanban board.\n\n## What to do\n\n1. Given orders (each with an items array), use flatMap to get all items with their parent order id\n2. Use findLast and findLastIndex on a log array to find the most recent error entry\n3. Build chunk(arr, size), zip(...arrays) that interleaves arrays, and groupBy(arr, keyFn) without Object.groupBy\n4. Use Array.from({ length: 12 }, (_, i) => ...) to generate a monthly calendar array\n",
      },
      {
        id: 'js-day-03-t-5',
        sequenceOrder: 5,
        title: 'FormValidator Class',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**JavaScript · Day 3: OOP, Functional JS & Modern Array Methods** · Task 5 of 8 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a reusable FormValidator class, a shopping cart with immutable state, and a drag-and-drop Kanban board.\n\n## What to do\n\n1. Build FormValidator(form, rules) - rules maps field names to arrays of rule objects\n2. Support: required, minLength(n), maxLength(n), pattern(regex), email, match(otherField), custom(fn)\n3. Validate on blur (individual field) and on submit (all fields)\n4. Show inline errors in span.field-error. Add/remove is-invalid and is-valid CSS classes.\n5. Apply to the registration form from Week 1\n",
      },
      {
        id: 'js-day-03-t-6',
        sequenceOrder: 6,
        title: 'Shopping Cart - Immutable + Observer',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 3: OOP, Functional JS & Modern Array Methods** · Task 6 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a reusable FormValidator class, a shopping cart with immutable state, and a drag-and-drop Kanban board.\n\n## What to do\n\n1. Build Cart with addItem, removeItem, updateQuantity, applyCoupon, getTotal - every method returns a NEW Cart, never mutates current one\n2. Implement observer: addObserver(fn) registers a listener, notifyObservers() calls all after each change\n3. Render cart to the DOM. Subscribe a render function - it re-renders on every state change.\n4. Persist to localStorage. Restore on page load. Add undo() with a history stack.\n",
      },
      {
        id: 'js-day-03-t-7',
        sequenceOrder: 7,
        title: 'Drag-and-Drop Kanban Board',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 3: OOP, Functional JS & Modern Array Methods** · Task 7 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a reusable FormValidator class, a shopping cart with immutable state, and a drag-and-drop Kanban board.\n\n## What to do\n\n1. Three-column Kanban (To Do, In Progress, Done) using HTML5 Drag and Drop API\n2. dragstart: store card id in dataTransfer. dragover: preventDefault. dragenter: show drop target. drop: move card.\n3. Add/delete cards via per-column form. Persist state to localStorage.\n4. Keyboard: Space to pick up, arrow keys to move between columns, Space to drop\n",
      },
      {
        id: 'js-day-03-t-8',
        sequenceOrder: 8,
        title: 'Blog Comment System',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 3: OOP, Functional JS & Modern Array Methods** · Task 8 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a reusable FormValidator class, a shopping cart with immutable state, and a drag-and-drop Kanban board.\n\n## What to do\n\n1. Comment section on blog article page: name + comment input, comments shown newest first\n2. Support nested replies: each comment has a Reply button that opens an inline form\n3. Upvotes persisted to localStorage - each user can upvote once per comment\n4. Sanitise comment text using textContent not innerHTML to prevent XSS\n",
      },
      {
        id: 'js-day-03-t-9',
        sequenceOrder: 9,
        title: 'Build a full sortable, filterable, paginated data table as a reusable class',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**JavaScript · Day 3: OOP, Functional JS & Modern Array Methods** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a full sortable, filterable, paginated data table as a reusable class. Accepts any array of objects and a column config. Features: sort asc/desc on header click, filter input per column, configurable page size and navigation, row selection with select-all, export to CSV. Zero external libraries.\n',
      },
    ],
  },
  {
    dayId: 'js-day-04',
    dayNumber: 4,
    courseTitle: 'JavaScript',
    tasks: [
      {
        id: 'js-day-04-t-1',
        sequenceOrder: 1,
        title: 'Event Loop - Predict 10 Output Orders',
        isStretchGoal: false,
        estimatedMinutes: 35,
        instructionsMarkdown:
          "**JavaScript · Day 4: Async JavaScript - Promises, Fetch & Async/Await** · Task 1 of 8 · about 35 min\n\n## Today's goal\nBy the end of the day you will have built a live weather widget, GitHub profile viewer, and infinite scroll blog feed - all on the portfolio site.\n\n## What to do\n\n1. For each of ten code snippets mixing console.log, setTimeout(fn, 0), Promise.resolve().then(), and queueMicrotask(), predict the output order before running\n2. For every wrong prediction, write an explanation using: call stack, microtask queue, task queue\n3. Write your own event loop puzzle and give it to a pod partner to solve\n",
      },
      {
        id: 'js-day-04-t-2',
        sequenceOrder: 2,
        title: 'Promises from Scratch',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 4: Async JavaScript - Promises, Fetch & Async/Await** · Task 2 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a live weather widget, GitHub profile viewer, and infinite scroll blog feed - all on the portfolio site.\n\n## What to do\n\n1. Create five Promises using new Promise((resolve, reject) => { setTimeout(...) }) - mix resolves and rejects\n2. Chain three dependent Promises: getUser → getOrders(userId) → getOrderDetail(orderId). Reject getOrders if userId is undefined.\n3. Demonstrate Promise.all (three parallel calls, time ≈ slowest), Promise.allSettled (one resolves, one rejects - both returned), Promise.race\n",
      },
      {
        id: 'js-day-04-t-3',
        sequenceOrder: 3,
        title: 'Fetch API - Full Pattern',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 4: Async JavaScript - Promises, Fetch & Async/Await** · Task 3 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a live weather widget, GitHub profile viewer, and infinite scroll blog feed - all on the portfolio site.\n\n## What to do\n\n1. Fetch posts from https://jsonplaceholder.typicode.com/posts. Log the response status and headers.\n2. Write fetchJSON(url, options) - wrapper that throws HttpError (custom class) if response.ok is false\n3. POST a new post with correct Content-Type header. Log the created resource.\n4. Add timeout with AbortController: abort after 5 seconds, show a friendly timeout message\n",
      },
      {
        id: 'js-day-04-t-4',
        sequenceOrder: 4,
        title: 'Async/Await - Full Patterns',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 4: Async JavaScript - Promises, Fetch & Async/Await** · Task 4 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a live weather widget, GitHub profile viewer, and infinite scroll blog feed - all on the portfolio site.\n\n## What to do\n\n1. Convert the three-chained Promise exercise to async/await. Compare side by side.\n2. Write loadDashboard(userId) that fetches user, posts, and todos in parallel (Promise.all), then fetches the first post's comments. Handle errors at each step.\n3. Demonstrate the sequential vs parallel bug: time both approaches\n4. Show the forEach async bug - it doesn't await. Fix with for...of and with Promise.all(arr.map(async fn)).\n",
      },
      {
        id: 'js-day-04-t-5',
        sequenceOrder: 5,
        title: 'Live Weather Widget',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**JavaScript · Day 4: Async JavaScript - Promises, Fetch & Async/Await** · Task 5 of 8 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a live weather widget, GitHub profile viewer, and infinite scroll blog feed - all on the portfolio site.\n\n## What to do\n\n1. Fetch from Open-Meteo for a default city. Show temperature, wind speed, weather code description.\n2. Show a loading skeleton while fetching and an inline error message on failure\n3. Cache in sessionStorage with a 10-minute TTL\n4. Add a city search input using Open-Meteo's geocoding API - update weather on city selection\n",
      },
      {
        id: 'js-day-04-t-6',
        sequenceOrder: 6,
        title: 'GitHub Profile Viewer',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 4: Async JavaScript - Promises, Fetch & Async/Await** · Task 6 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a live weather widget, GitHub profile viewer, and infinite scroll blog feed - all on the portfolio site.\n\n## What to do\n\n1. Add to About page: enter a username, fetch from api.github.com/users/{username} and /repos\n2. Show avatar, name, bio, location, followers, following. Top 6 repos by stars with name, description, language badge, star count.\n3. Handle 404 (user not found) and 403/429 (rate limited) with specific friendly messages\n4. Cancel previous requests with AbortController when a new username is typed\n",
      },
      {
        id: 'js-day-04-t-7',
        sequenceOrder: 7,
        title: 'Infinite Scroll Blog Feed',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 4: Async JavaScript - Promises, Fetch & Async/Await** · Task 7 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a live weather widget, GitHub profile viewer, and infinite scroll blog feed - all on the portfolio site.\n\n## What to do\n\n1. Fetch posts 10 at a time using ?_start=N&_limit=10. Show first 10 on load.\n2. IntersectionObserver on a sentinel div at the bottom - fetch next 10 when visible\n3. Show loading spinner during fetch. Show 'End of feed' after all 100 are loaded.\n4. Handle mid-scroll fetch errors with a Retry button\n",
      },
      {
        id: 'js-day-04-t-8',
        sequenceOrder: 8,
        title: 'URL State & Share-able Filters',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 4: Async JavaScript - Promises, Fetch & Async/Await** · Task 8 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a live weather widget, GitHub profile viewer, and infinite scroll blog feed - all on the portfolio site.\n\n## What to do\n\n1. Make the services page live search URL-state aware: update query string with history.pushState\n2. On page load, read URL params, pre-fill controls, and apply filters to content\n3. Listen to popstate - back/forward restore previous search state\n",
      },
      {
        id: 'js-day-04-t-9',
        sequenceOrder: 9,
        title:
          'Build a product search system: connect to JSONPlaceholder /posts, real-time search (300ms…',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**JavaScript · Day 4: Async JavaScript - Promises, Fetch & Async/Await** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a product search system: connect to JSONPlaceholder /posts, real-time search (300ms debounce), multi-select filter by userId, sort, pagination (10 per page), URL state for all filters, shareable URL. All async operations have loading and error states.\n',
      },
    ],
  },
  {
    dayId: 'js-day-05',
    dayNumber: 5,
    courseTitle: 'JavaScript',
    tasks: [
      {
        id: 'js-day-05-t-1',
        sequenceOrder: 1,
        title: 'ES Module Scaffold',
        isStretchGoal: false,
        estimatedMinutes: 25,
        instructionsMarkdown:
          "**JavaScript · Day 5: Week 3 Project - Full JS Integration on Portfolio** · Task 1 of 5 · about 25 min\n\n## Today's goal\nBy the end of the day you will have built the portfolio uses ES modules, has zero global variables, passes ESLint, and is live on GitHub Pages with all interactive features working.\n\n## What to do\n\n1. Create /js/utils.js (debounce, fetchJSON, showToast), /js/components/nav.js, darkMode.js, accordion.js\n2. Add type='module' to all script tags. Convert all IIFEs to named exports.\n3. Verify zero global variables: type window. in DevTools console and confirm no custom variables\n",
      },
      {
        id: 'js-day-05-t-2',
        sequenceOrder: 2,
        title: 'Wire All Core Features',
        isStretchGoal: false,
        estimatedMinutes: 85,
        instructionsMarkdown:
          "**JavaScript · Day 5: Week 3 Project - Full JS Integration on Portfolio** · Task 2 of 5 · about 85 min\n\n## Today's goal\nBy the end of the day you will have built the portfolio uses ES modules, has zero global variables, passes ESLint, and is live on GitHub Pages with all interactive features working.\n\n## What to do\n\n1. Mobile drawer with focus trap and Escape key close on all five pages\n2. Accordion on services FAQ with keyboard navigation\n3. Lightbox on gallery page with keyboard navigation and swipe\n4. Scroll animations on home page with IntersectionObserver\n5. Reading progress bar on blog article page\n6. Back-to-top button across all pages\n",
      },
      {
        id: 'js-day-05-t-3',
        sequenceOrder: 3,
        title: 'Wire All Form Validation',
        isStretchGoal: false,
        estimatedMinutes: 70,
        instructionsMarkdown:
          "**JavaScript · Day 5: Week 3 Project - Full JS Integration on Portfolio** · Task 3 of 5 · about 70 min\n\n## Today's goal\nBy the end of the day you will have built the portfolio uses ES modules, has zero global variables, passes ESLint, and is live on GitHub Pages with all interactive features working.\n\n## What to do\n\n1. FormValidator on contact form: name (required, min 2), email (required, valid), phone (optional, pattern), message (required, min 20)\n2. 1.5 second loading state on submit, then success toast and form reset\n3. All error messages in a visible span below the field - not in a browser alert\n",
      },
      {
        id: 'js-day-05-t-4',
        sequenceOrder: 4,
        title: 'API-Powered Content',
        isStretchGoal: false,
        estimatedMinutes: 75,
        instructionsMarkdown:
          "**JavaScript · Day 5: Week 3 Project - Full JS Integration on Portfolio** · Task 4 of 5 · about 75 min\n\n## Today's goal\nBy the end of the day you will have built the portfolio uses ES modules, has zero global variables, passes ESLint, and is live on GitHub Pages with all interactive features working.\n\n## What to do\n\n1. Services page: fetch JSONPlaceholder /posts as fictional services with live search and category filter\n2. Team page: fetch /users and render as team cards with department filter\n3. Home Latest section: show 3 recent posts as news cards\n4. All three: loading skeletons and error retry buttons\n",
      },
      {
        id: 'js-day-05-t-5',
        sequenceOrder: 5,
        title: 'Polish, Lint & Deploy',
        isStretchGoal: false,
        estimatedMinutes: 60,
        instructionsMarkdown:
          "**JavaScript · Day 5: Week 3 Project - Full JS Integration on Portfolio** · Task 5 of 5 · about 60 min\n\n## Today's goal\nBy the end of the day you will have built the portfolio uses ES modules, has zero global variables, passes ESLint, and is live on GitHub Pages with all interactive features working.\n\n## What to do\n\n1. Zero console errors on every page. Zero network errors.\n2. ESLint - fix every warning and error\n3. Test all features at 320px, 768px, and 1280px in DevTools\n4. Test keyboard-only navigation through every interactive component\n5. Push all changes. Confirm GitHub Pages shows updated site. Share live URL.\n6. Final commit: 'project: week 3 JS complete - live on GitHub Pages'\n",
      },
      {
        id: 'js-day-05-t-6',
        sequenceOrder: 6,
        title: 'Add site-wide search: press / to open an overlay, search pre-indexed page content…',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**JavaScript · Day 5: Week 3 Project - Full JS Integration on Portfolio** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nAdd site-wide search: press / to open an overlay, search pre-indexed page content client-side, show results grouped by page with matching text highlighted. Keyboard: up/down navigate, Enter follows link, Escape closes. Persist recent searches to localStorage.\n',
      },
    ],
  },
  {
    dayId: 'js-day-06',
    dayNumber: 6,
    courseTitle: 'JavaScript',
    tasks: [
      {
        id: 'js-day-06-t-1',
        sequenceOrder: 1,
        title: 'Higher-Order Function Utilities',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**JavaScript · Day 6: Closures, Modules & Design Patterns** · Task 1 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a typed EventEmitter, a QueryBuilder, and the portfolio refactored to ES modules with a single entry point.\n\n## What to do\n\n1. Implement pipe(fn1, fn2, ...) - composes left to right: pipe(double, addOne)(5) === 11\n2. Implement compose(fn1, fn2, ...) - composes right to left\n3. Implement curry(fn) - converts multi-argument to unary chain: curry((a,b,c) => a+b+c)(1)(2)(3) === 6\n4. Implement partial(fn, ...presetArgs) - partially applies arguments\n5. Test all four with at least three examples each\n",
      },
      {
        id: 'js-day-06-t-2',
        sequenceOrder: 2,
        title: 'EventEmitter - Observer Pattern',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 6: Closures, Modules & Design Patterns** · Task 2 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a typed EventEmitter, a QueryBuilder, and the portfolio refactored to ES modules with a single entry point.\n\n## What to do\n\n1. Build EventEmitter with on(event, listener), off(event, listener), emit(event, ...args), once(event, listener)\n2. once must automatically remove the listener after it fires\n3. Add wildcard: on('*', listener) fires on every event\n4. Demonstrate: UserStore extends EventEmitter and emits 'userAdded', 'userRemoved', 'userUpdated'\n",
      },
      {
        id: 'js-day-06-t-3',
        sequenceOrder: 3,
        title: 'Factory & Builder Patterns',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**JavaScript · Day 6: Closures, Modules & Design Patterns** · Task 3 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a typed EventEmitter, a QueryBuilder, and the portfolio refactored to ES modules with a single entry point.\n\n## What to do\n\n1. Build createUser({ name, email, role='viewer', createdAt=Date.now() }) that validates and returns a frozen user with an id (use crypto.randomUUID())\n2. Build QueryBuilder that chains: from(table).where(condition).select(fields).limit(n).build() returning a query string\n3. Build createNotification({ type, message, duration, dismissible }) factory with defaults and a show() method\n",
      },
      {
        id: 'js-day-06-t-4',
        sequenceOrder: 4,
        title: 'Module Pattern & Refactor',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 6: Closures, Modules & Design Patterns** · Task 4 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a typed EventEmitter, a QueryBuilder, and the portfolio refactored to ES modules with a single entry point.\n\n## What to do\n\n1. Build a CartModule IIFE with private items array exposing only addItem, removeItem, updateQuantity, getItems, getTotal, clear\n2. Show that items cannot be accessed or mutated from outside\n3. Refactor portfolio's dark mode, accordion, and nav scripts to each export a single init() function\n4. Create /js/main.js that imports and calls all init() - the only script tag needed in the HTML\n",
      },
      {
        id: 'js-day-06-t-5',
        sequenceOrder: 5,
        title: 'IntersectionObserver - Advanced',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 6: Closures, Modules & Design Patterns** · Task 5 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a typed EventEmitter, a QueryBuilder, and the portfolio refactored to ES modules with a single entry point.\n\n## What to do\n\n1. Lazy image loader: all img start with data-src - add src when they enter the viewport\n2. Sticky section header: when a section scrolls above viewport, show its title in a fixed mini-header using rootMargin\n3. Count-up animations: when a stats section enters viewport, count from 0 to target in 2 seconds with requestAnimationFrame\n",
      },
      {
        id: 'js-day-06-t-6',
        sequenceOrder: 6,
        title: 'MutationObserver & ResizeObserver',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**JavaScript · Day 6: Closures, Modules & Design Patterns** · Task 6 of 8 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a typed EventEmitter, a QueryBuilder, and the portfolio refactored to ES modules with a single entry point.\n\n## What to do\n\n1. Use MutationObserver to auto-apply IntersectionObserver animation to any new article added to the blog feed\n2. Use MutationObserver to log every DOM change in the body to a floating overlay panel (element added/removed/attribute changed)\n3. Use ResizeObserver to make a chart-like element that redraws content when its container size changes\n4. Add a matchMedia listener that logs every time the viewport crosses 768px and 1024px\n",
      },
      {
        id: 'js-day-06-t-7',
        sequenceOrder: 7,
        title: 'Virtual Scroll for Large Lists',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 6: Closures, Modules & Design Patterns** · Task 7 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a typed EventEmitter, a QueryBuilder, and the portfolio refactored to ES modules with a single entry point.\n\n## What to do\n\n1. Render only visible items + 10-item buffer for a 10,000-item array\n2. Calculate visible range using scrollTop, itemHeight, and containerHeight\n3. Use transform: translateY on the visible items container for correct positioning\n4. Record a Performance profile scrolling all 10,000 items - must stay above 50fps\n",
      },
      {
        id: 'js-day-06-t-8',
        sequenceOrder: 8,
        title: 'Canvas Chart from Data',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 6: Closures, Modules & Design Patterns** · Task 8 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a typed EventEmitter, a QueryBuilder, and the portfolio refactored to ES modules with a single entry point.\n\n## What to do\n\n1. Draw a bar chart of 12-month sales data: labelled axes, gridlines, bars with a linear gradient\n2. Animate bars growing from zero height using requestAnimationFrame with ease-out\n3. Add mouse hover: detect which bar is under cursor, show tooltip with exact value\n4. Export chart as PNG using canvas.toDataURL() - trigger a file download\n",
      },
      {
        id: 'js-day-06-t-9',
        sequenceOrder: 9,
        title: 'Build a full dependency injection container: register<T>(token, factory)…',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**JavaScript · Day 6: Closures, Modules & Design Patterns** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a full dependency injection container: register`<T>`(token, factory), resolve`<T>`(token) with auto-injected dependencies, singleton scope, and transient scope. Write 10 unit tests verifying each behaviour.\n',
      },
    ],
  },
  {
    dayId: 'js-day-07',
    dayNumber: 7,
    courseTitle: 'JavaScript',
    tasks: [
      {
        id: 'js-day-07-t-1',
        sequenceOrder: 1,
        title: 'Storage Deep Dive',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**JavaScript · Day 7: Web Storage, Browser APIs & Service Workers** · Task 1 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a PWA-capable portfolio with offline support, clipboard features, and a Web App Manifest.\n\n## What to do\n\n1. Demonstrate localStorage persistence: set items, close browser, reopen - still there\n2. Demonstrate sessionStorage isolation: set items in two tabs - show they have separate storage\n3. Build storageManager with get(key), set(key, value, ttl), delete(key), clear() - ttl causes entries to expire\n4. Open IndexedDB in DevTools Application panel - create a simple database and add/read a record\n",
      },
      {
        id: 'js-day-07-t-2',
        sequenceOrder: 2,
        title: 'Clipboard, Notifications & Geolocation',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 7: Web Storage, Browser APIs & Service Workers** · Task 2 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a PWA-capable portfolio with offline support, clipboard features, and a Web App Manifest.\n\n## What to do\n\n1. Add copy-to-clipboard to all code blocks using navigator.clipboard.writeText(). Show visual confirmation.\n2. Request permission for desktop notifications. Show one when a form is submitted successfully.\n3. Use navigator.geolocation.getCurrentPosition() to detect the city and pre-fill the contact form location field. Handle permission denied gracefully.\n4. Add a Share button using the Web Share API with a copy-URL fallback for unsupported browsers\n",
      },
      {
        id: 'js-day-07-t-3',
        sequenceOrder: 3,
        title: 'History, URL & Navigation APIs',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**JavaScript · Day 7: Web Storage, Browser APIs & Service Workers** · Task 3 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a PWA-capable portfolio with offline support, clipboard features, and a Web App Manifest.\n\n## What to do\n\n1. Build a client-side router using history.pushState and popstate: navigate between sections without reloading\n2. Synchronise the active nav link with the current route on every URL change\n3. Read URL search params on load: new URLSearchParams(location.search) - apply stored filter values\n4. Build a breadcrumb component that updates automatically based on the current URL path\n",
      },
      {
        id: 'js-day-07-t-4',
        sequenceOrder: 4,
        title: 'Performance APIs',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 7: Web Storage, Browser APIs & Service Workers** · Task 4 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a PWA-capable portfolio with offline support, clipboard features, and a Web App Manifest.\n\n## What to do\n\n1. Use performance.now() to benchmark: render 1000 DOM nodes vs 1000 virtual scroll items\n2. Use PerformanceObserver to log LCP and CLS events\n3. Use performance.mark() and performance.measure() to instrument the portfolio's init() function\n4. Use navigator.connection to detect slow connections and disable autoplay and animations\n",
      },
      {
        id: 'js-day-07-t-5',
        sequenceOrder: 5,
        title: 'Service Worker - Offline Caching',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**JavaScript · Day 7: Web Storage, Browser APIs & Service Workers** · Task 5 of 8 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a PWA-capable portfolio with offline support, clipboard features, and a Web App Manifest.\n\n## What to do\n\n1. Create sw.js and register it from main.js\n2. install event: precache all HTML, CSS, JS, and images\n3. fetch event: cache-first for static assets, network-first for API calls\n4. activate event: delete stale caches from previous versions\n5. Test in DevTools Network > Offline - the site must load without a network connection\n",
      },
      {
        id: 'js-day-07-t-6',
        sequenceOrder: 6,
        title: 'Web App Manifest & PWA',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 7: Web Storage, Browser APIs & Service Workers** · Task 6 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a PWA-capable portfolio with offline support, clipboard features, and a Web App Manifest.\n\n## What to do\n\n1. Create manifest.json: name, short_name, description, start_url, display: standalone, theme_color, background_color, and icons (192px and 512px)\n2. Link the manifest in all HTML pages: `<link rel='manifest'>`\n3. Add beforeinstallprompt listener - show a custom 'Install App' button when appropriate\n4. Verify in DevTools Application > Manifest - all required fields present and valid\n",
      },
      {
        id: 'js-day-07-t-7',
        sequenceOrder: 7,
        title: 'IndexedDB - Offline Data',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 7: Web Storage, Browser APIs & Service Workers** · Task 7 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a PWA-capable portfolio with offline support, clipboard features, and a Web App Manifest.\n\n## What to do\n\n1. Build a wrapper: openDB, addRecord, getRecord, getAllRecords, deleteRecord, updateRecord\n2. Use it to persist the Kanban board in IndexedDB instead of localStorage\n3. Add a sync mechanism: when online event fires, push locally saved changes to a mock API\n",
      },
      {
        id: 'js-day-07-t-8',
        sequenceOrder: 8,
        title: 'requestAnimationFrame & Animation Performance',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 7: Web Storage, Browser APIs & Service Workers** · Task 8 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a PWA-capable portfolio with offline support, clipboard features, and a Web App Manifest.\n\n## What to do\n\n1. Rebuild the count-up animation using a performant rAF loop with start time and easing function\n2. Build a smooth upload progress bar (mock with setTimeout) using rAF\n3. Add will-change: transform on animated elements - verify reduced paint times in Performance panel\n4. Demonstrate the difference: animating left/top (layout) vs transform/opacity (compositor-only)\n",
      },
      {
        id: 'js-day-07-t-9',
        sequenceOrder: 9,
        title:
          'Build a fully offline note-taking PWA: create/edit/delete notes in IndexedDB, offline…',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**JavaScript · Day 7: Web Storage, Browser APIs & Service Workers** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a fully offline note-taking PWA: create/edit/delete notes in IndexedDB, offline sync queue, rich text with contenteditable, search client-side, export notes as text files, share via Web Share API, installable.\n',
      },
    ],
  },
  {
    dayId: 'js-day-08',
    dayNumber: 8,
    courseTitle: 'JavaScript',
    tasks: [
      {
        id: 'js-day-08-t-1',
        sequenceOrder: 1,
        title: 'First Tests - Matchers & Assertions',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**JavaScript · Day 8: Testing with Jest - Unit, Integration & Mocking** · Task 1 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a full Jest test suite for Week 3 utilities with 70%+ code coverage.\n\n## What to do\n\n1. Install Jest (npm install --save-dev jest). Run npx jest --init to scaffold config.\n2. Write tests for pure utilities from Week 3: chunk, zip, groupBy, pipe, compose, curry, partial - at least three tests each (happy path, edge case, error case)\n3. Use: toBe, toEqual, toThrow, toBeTruthy, toBeFalsy, toContain, toHaveLength, toBeCloseTo\n4. Aim for 100% coverage on utils before moving to mocks\n",
      },
      {
        id: 'js-day-08-t-2',
        sequenceOrder: 2,
        title: 'Mock Functions - jest.fn() & jest.spyOn()',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 8: Testing with Jest - Unit, Integration & Mocking** · Task 2 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a full Jest test suite for Week 3 utilities with 70%+ code coverage.\n\n## What to do\n\n1. Test EventEmitter: mock listeners with jest.fn(). Verify emit calls each with correct args using toHaveBeenCalledWith.\n2. Use jest.spyOn(global, 'fetch') to mock fetch in tests for fetchJSON - test success path, HTTP error (ok = false), network failure (rejects)\n3. Use jest.fn().mockImplementationOnce() to test retry logic: first call fails, second succeeds\n",
      },
      {
        id: 'js-day-08-t-3',
        sequenceOrder: 3,
        title: 'Async Tests & Timer Mocks',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 8: Testing with Jest - Unit, Integration & Mocking** · Task 3 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a full Jest test suite for Week 3 utilities with 70%+ code coverage.\n\n## What to do\n\n1. Write async tests with async/await: fetchJSON resolves with data, rejects with HttpError on non-200\n2. Use jest.useFakeTimers() to test debounce: call 10 times rapidly, verify underlying function called once after the delay\n3. Test memoize: verify wrapped function called once for repeated input, twice for two different inputs\n4. Test AbortController timeout fires after configured duration using jest.advanceTimersByTime()\n",
      },
      {
        id: 'js-day-08-t-4',
        sequenceOrder: 4,
        title: 'Module Mocking & Setup/Teardown',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 8: Testing with Jest - Unit, Integration & Mocking** · Task 4 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a full Jest test suite for Week 3 utilities with 70%+ code coverage.\n\n## What to do\n\n1. Mock localStorage: jest.spyOn(Storage.prototype, 'getItem'). Test that dark mode reads the preference on init.\n2. Use jest.mock() to mock the weather API module - verify correct URL is called\n3. beforeEach: reset DOM to known state with document.body.innerHTML = '`<div id=app>`</div>`'\n4. afterEach: jest.restoreAllMocks() - explain why this is necessary\n",
      },
      {
        id: 'js-day-08-t-5',
        sequenceOrder: 5,
        title: 'DOM Testing with JSDOM',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**JavaScript · Day 8: Testing with Jest - Unit, Integration & Mocking** · Task 5 of 8 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a full Jest test suite for Week 3 utilities with 70%+ code coverage.\n\n## What to do\n\n1. Configure Jest with testEnvironment: 'jsdom' in jest.config.js\n2. Test FormValidator: render a form, call validate(), assert error messages appear and disappear\n3. Test accordion: click a header, assert aria-expanded changes to 'true' and panel becomes visible\n4. Test mobile nav: simulate hamburger click, assert drawer has class=open and focus is trapped\n",
      },
      {
        id: 'js-day-08-t-6',
        sequenceOrder: 6,
        title: 'Coverage Report - Find & Fix Gaps',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 8: Testing with Jest - Unit, Integration & Mocking** · Task 6 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a full Jest test suite for Week 3 utilities with 70%+ code coverage.\n\n## What to do\n\n1. Run npx jest --coverage. Open coverage/lcov-report/index.html in browser.\n2. Identify every file below 70% coverage. For each red (uncovered) branch write a specific test.\n3. Aim for 70%+ statement coverage AND 70%+ branch coverage on all business logic files\n4. Note: 100% coverage does not mean zero bugs - write meaningful tests\n",
      },
      {
        id: 'js-day-08-t-7',
        sequenceOrder: 7,
        title: 'Test-Driven Development Mini Exercise',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 8: Testing with Jest - Unit, Integration & Mocking** · Task 7 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a full Jest test suite for Week 3 utilities with 70%+ code coverage.\n\n## What to do\n\n1. Write tests FIRST for formatDate(date, format) - tests must fail before writing any implementation\n2. Formats: 'DD/MM/YYYY', 'YYYY-MM-DD', 'Month DD, YYYY', 'relative' (e.g. '3 days ago')\n3. Write at least eight tests: different formats, leap year, December 31, invalid input\n4. Implement the function until all tests pass - do not change any tests\n",
      },
      {
        id: 'js-day-08-t-8',
        sequenceOrder: 8,
        title: 'CI-Ready Test Suite',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 8: Testing with Jest - Unit, Integration & Mocking** · Task 8 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a full Jest test suite for Week 3 utilities with 70%+ code coverage.\n\n## What to do\n\n1. Add to package.json: 'test': 'jest --coverage --ci'\n2. Add a pre-commit hook using husky: tests must pass before every commit - failed tests block the commit\n3. Add eslint-plugin-jest so ESLint can lint test files\n4. Run the full suite from a clean state (npx jest --clearCache first) - all tests must pass\n",
      },
      {
        id: 'js-day-08-t-9',
        sequenceOrder: 9,
        title:
          'Write a complete test suite for the Kanban board: add a card, delete, move between…',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**JavaScript · Day 8: Testing with Jest - Unit, Integration & Mocking** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nWrite a complete test suite for the Kanban board: add a card, delete, move between columns, localStorage persistence (mocked), drag events (mocked dataTransfer), keyboard accessibility (simulated keydown), and undo. Aim for 80%+ branch coverage.\n',
      },
    ],
  },
  {
    dayId: 'js-day-09',
    dayNumber: 9,
    courseTitle: 'JavaScript',
    tasks: [
      {
        id: 'js-day-09-t-1',
        sequenceOrder: 1,
        title: 'Layout Thrashing - Diagnose & Fix',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 9: Advanced DOM, Canvas & Performance Optimisation** · Task 1 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built virtual scroll for 10,000 items, an animated Canvas chart, and a measurably improved portfolio Lighthouse Performance score.\n\n## What to do\n\n1. Record a Performance profile of a page reading element.offsetHeight inside a loop that also writes style.height - observe red 'Forced reflow' warnings\n2. Fix by separating all DOM reads into one batch and all DOM writes into another\n3. Re-record and compare frame time before and after\n",
      },
      {
        id: 'js-day-09-t-2',
        sequenceOrder: 2,
        title: 'requestAnimationFrame Animation Loop',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**JavaScript · Day 9: Advanced DOM, Canvas & Performance Optimisation** · Task 2 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built virtual scroll for 10,000 items, an animated Canvas chart, and a measurably improved portfolio Lighthouse Performance score.\n\n## What to do\n\n1. Build a smooth animated counter using rAF: use performance.now() for timing and an ease-out-cubic easing function\n2. Build a particle system: 200 particles with random position, velocity, colour drawn to canvas, updated each frame\n3. Add pause/resume with cancelAnimationFrame. Verify 60fps in the DevTools FPS meter.\n",
      },
      {
        id: 'js-day-09-t-3',
        sequenceOrder: 3,
        title: 'Virtual Scroll - 10,000 Items',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 9: Advanced DOM, Canvas & Performance Optimisation** · Task 3 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built virtual scroll for 10,000 items, an animated Canvas chart, and a measurably improved portfolio Lighthouse Performance score.\n\n## What to do\n\n1. Render only visible items + buffer of 5 above and below viewport for a 10,000-item array\n2. Visible range: const start = Math.floor(scrollTop / itemHeight)\n3. Use transform: translateY on the container for correct positioning\n4. Debounce and throttle with rAF. Record a profile - must stay above 50fps.\n",
      },
      {
        id: 'js-day-09-t-4',
        sequenceOrder: 4,
        title: 'WeakMap & Memory Management',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 9: Advanced DOM, Canvas & Performance Optimisation** · Task 4 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built virtual scroll for 10,000 items, an animated Canvas chart, and a measurably improved portfolio Lighthouse Performance score.\n\n## What to do\n\n1. Demonstrate memory leak: Map holding DOM references prevents GC after nodes are removed\n2. Fix with WeakMap: verify GC is possible by checking heap in DevTools Memory panel\n3. Build private class data using WeakMap keyed by the instance\n",
      },
      {
        id: 'js-day-09-t-5',
        sequenceOrder: 5,
        title: 'Canvas Charts',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**JavaScript · Day 9: Advanced DOM, Canvas & Performance Optimisation** · Task 5 of 8 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built virtual scroll for 10,000 items, an animated Canvas chart, and a measurably improved portfolio Lighthouse Performance score.\n\n## What to do\n\n1. Bar chart: 12 months of data, labelled axes, gridlines, gradient bars using createLinearGradient\n2. Animate bars growing from bottom with rAF ease-out\n3. Mouse hover: tooltip with exact value, highlight hovered bar\n4. Line overlay showing average target as a dashed line. Export as PNG download.\n",
      },
      {
        id: 'js-day-09-t-6',
        sequenceOrder: 6,
        title: 'Web Workers - Off-Main-Thread',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 9: Advanced DOM, Canvas & Performance Optimisation** · Task 6 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built virtual scroll for 10,000 items, an animated Canvas chart, and a measurably improved portfolio Lighthouse Performance score.\n\n## What to do\n\n1. Create worker.js that sorts 100,000 objects. Send data with postMessage.\n2. Show UI stays responsive during worker sort. Compare with main-thread sort blocking the UI.\n3. Receive sorted results via onmessage. Display them.\n",
      },
      {
        id: 'js-day-09-t-7',
        sequenceOrder: 7,
        title: 'Proxy & Reactive State',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**JavaScript · Day 9: Advanced DOM, Canvas & Performance Optimisation** · Task 7 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built virtual scroll for 10,000 items, an animated Canvas chart, and a measurably improved portfolio Lighthouse Performance score.\n\n## What to do\n\n1. Build a reactive state object using Proxy: any property set auto-calls registered view functions\n2. Proxy handler intercepts set, get, deleteProperty\n3. Build a reactive form: two inputs bound to state.name and state.email - changing either updates a live preview paragraph automatically\n",
      },
      {
        id: 'js-day-09-t-8',
        sequenceOrder: 8,
        title: 'Portfolio Performance Pass',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**JavaScript · Day 9: Advanced DOM, Canvas & Performance Optimisation** · Task 8 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built virtual scroll for 10,000 items, an animated Canvas chart, and a measurably improved portfolio Lighthouse Performance score.\n\n## What to do\n\n1. Run Lighthouse Performance on all five pages. Record current scores.\n2. Fix three largest LCP issues: add loading='lazy' to below-fold images, defer non-critical JS, preload the primary font\n3. Add font-display: swap to all Google Font @import URLs\n4. Re-run Lighthouse. Document before/after in PERFORMANCE.md\n",
      },
      {
        id: 'js-day-09-t-9',
        sequenceOrder: 9,
        title:
          'Build a spreadsheet-like data grid in Canvas: efficiently render 1,000 rows × 50 columns…',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**JavaScript · Day 9: Advanced DOM, Canvas & Performance Optimisation** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a spreadsheet-like data grid in Canvas: efficiently render 1,000 rows × 50 columns with virtual scrolling in both axes, cell selection, inline text editing, column resizing, row sorting, export to CSV.\n',
      },
    ],
  },
  {
    dayId: 'js-day-10',
    dayNumber: 10,
    courseTitle: 'JavaScript',
    tasks: [
      {
        id: 'js-day-10-t-1',
        sequenceOrder: 1,
        title: 'Architecture Planning',
        isStretchGoal: false,
        estimatedMinutes: 30,
        instructionsMarkdown:
          "**JavaScript · Day 10: Week 4 Project - Mini SPA Without a Framework** · Task 1 of 5 · about 30 min\n\n## Today's goal\nBy the end of the day you will have built a fully tested mini SPA with client-side routing, reactive state, and reusable components - deployed to GitHub Pages.\n\n## What to do\n\n1. Decide your SPA topic (task manager, recipe browser, expense tracker, movie library)\n2. Draw a component diagram on paper: modules, their exports, and dependencies\n3. Plan routes: /home, /list, /detail/:id, /settings\n4. Write module stubs and export shapes before any implementation. Commit: 'chore: scaffold SPA architecture'\n",
      },
      {
        id: 'js-day-10-t-2',
        sequenceOrder: 2,
        title: 'Build: Router + State Manager',
        isStretchGoal: false,
        estimatedMinutes: 80,
        instructionsMarkdown:
          "**JavaScript · Day 10: Week 4 Project - Mini SPA Without a Framework** · Task 2 of 5 · about 80 min\n\n## Today's goal\nBy the end of the day you will have built a fully tested mini SPA with client-side routing, reactive state, and reusable components - deployed to GitHub Pages.\n\n## What to do\n\n1. Router: register(path, component), navigate(path), popstate listener\n2. Support dynamic segments: /detail/:id - extract params\n3. State manager: createStore(initialState, reducer) returning { getState, dispatch, subscribe }\n4. Connect: navigating changes a route slice of state; components subscribe to re-render on relevant state changes\n",
      },
      {
        id: 'js-day-10-t-3',
        sequenceOrder: 3,
        title: 'Build: Page & UI Components',
        isStretchGoal: false,
        estimatedMinutes: 70,
        instructionsMarkdown:
          "**JavaScript · Day 10: Week 4 Project - Mini SPA Without a Framework** · Task 3 of 5 · about 70 min\n\n## Today's goal\nBy the end of the day you will have built a fully tested mini SPA with client-side routing, reactive state, and reusable components - deployed to GitHub Pages.\n\n## What to do\n\n1. At least four page components: renderHomePage, renderListPage, renderDetailPage, renderSettingsPage\n2. At least three reusable UI components: Button, Card, Modal - each returns a DOM element built with createElement\n3. Components must be pure: same state in → same DOM element out\n",
      },
      {
        id: 'js-day-10-t-4',
        sequenceOrder: 4,
        title: 'Features, Persistence & Polish',
        isStretchGoal: false,
        estimatedMinutes: 75,
        instructionsMarkdown:
          "**JavaScript · Day 10: Week 4 Project - Mini SPA Without a Framework** · Task 4 of 5 · about 75 min\n\n## Today's goal\nBy the end of the day you will have built a fully tested mini SPA with client-side routing, reactive state, and reusable components - deployed to GitHub Pages.\n\n## What to do\n\n1. Implement CRUD through the state manager\n2. Persist state to localStorage using a storage middleware in the store\n3. Loading state and error state for all async operations\n4. Keyboard nav: Escape closes modal, Enter confirms form\n5. Page transitions: each page fades in with a CSS animation\n",
      },
      {
        id: 'js-day-10-t-5',
        sequenceOrder: 5,
        title: 'Test Suite & Deploy',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**JavaScript · Day 10: Week 4 Project - Mini SPA Without a Framework** · Task 5 of 5 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a fully tested mini SPA with client-side routing, reactive state, and reusable components - deployed to GitHub Pages.\n\n## What to do\n\n1. Router tests: navigate to a route, assert correct component rendered, URL changed\n2. State manager tests: dispatch action, assert state changed, subscribers notified\n3. Tests for two page components using JSDOM\n4. Coverage: 70%+ on all business logic files\n5. Deploy to GitHub Pages. Share live URL with pod. Final commit: 'project: week 4 JS SPA'\n",
      },
      {
        id: 'js-day-10-t-6',
        sequenceOrder: 6,
        title:
          'Add real-time cross-tab sync using the BroadcastChannel API: when one tab modifies state…',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**JavaScript · Day 10: Week 4 Project - Mini SPA Without a Framework** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nAdd real-time cross-tab sync using the BroadcastChannel API: when one tab modifies state, all other open tabs update automatically. Show a notification when another tab makes a change. Test using two browser windows side by side.\n',
      },
    ],
  },
];
