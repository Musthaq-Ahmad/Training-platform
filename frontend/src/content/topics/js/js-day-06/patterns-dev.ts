import type { ContentTopic } from '../../../types';

export const patternsDevTopics = {
  'patterns-dev': {
    id: 'patterns-dev',
    heading: 'The core shape',
    blocks: [
      {
        type: 'paragraph',
        text: 'At minimum, a subject needs three things: somewhere to keep observers, a way to add and remove them, and a way to push updates. Here’s a small implementation that uses a Set so we get O(1) removal and deduplication for free.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Subject {\n  #observers = new Set();\n\n  subscribe(observer) {\n    this.#observers.add(observer);\n    // Hand back an unsubscribe function — easier than asking\n    // the caller to hold onto the reference they passed in.\n    return () => this.#observers.delete(observer);\n  }\n\n  notify(payload) {\n    for (const observer of this.#observers) {\n      observer(payload);\n    }\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The return value of subscribe is a small ergonomic win that pays for itself the first time you forget what you passed in. The caller stores the returned function and calls it when they’re done — no lookup, no equality comparison, no unsubscribe method on the subject at all.',
      },
      {
        type: 'paragraph',
        text: 'Let’s wire the subject to a stream of prices and a few consumers that want to know about them.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const ticker = new Subject();\n\n// A chart that buffers ticks and redraws every animation frame.\nconst chartQueue = [];\nlet pending = false;\nconst drawChart = (tick) => {\n  chartQueue.push(tick);\n  if (pending) return;\n  pending = true;\n  requestAnimationFrame(() => {\n    renderChart(chartQueue);\n    chartQueue.length = 0;\n    pending = false;\n  });\n};\n\n// A watchlist row that flashes when its symbol updates.\nconst flashRow = ({ symbol, price, previous }) => {\n  if (symbol !== "AAPL") return;\n  document\n    .querySelector(\'[data-symbol="AAPL"]\')\n    ?.classList.toggle("up", price > previous);\n};\n\n// A logger that records every tick for replay.\nconst logTick = (tick) => console.debug("[tick]", tick);\n\nconst unsubChart = ticker.subscribe(drawChart);\nconst unsubRow   = ticker.subscribe(flashRow);\nconst unsubLog   = ticker.subscribe(logTick);\n\n// Somewhere else, the WebSocket pushes new prices in:\nsocket.addEventListener("message", (event) => {\n  const tick = JSON.parse(event.data);\n  ticker.notify(tick);\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Each consumer is a small, focused function. The ticker doesn’t know any of them by name. If you decide later that the watchlist row should debounce, or that the logger should sample only one in ten ticks, you change the consumer — the ticker is untouched. That decoupling is the entire payoff of the pattern.',
      },
      {
        type: 'paragraph',
        text: 'You don’t always need to write your own Subject. Since 2017, every browser has shipped a constructable EventTarget — the same machinery the DOM uses for addEventListener, available for arbitrary objects.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class Ticker extends EventTarget {\n  push(tick) {\n    this.dispatchEvent(new CustomEvent("tick", { detail: tick }));\n  }\n}\n\nconst ticker = new Ticker();\n\nticker.addEventListener("tick", (e) => drawChart(e.detail));\nticker.addEventListener("tick", (e) => flashRow(e.detail));',
        },
      },
      {
        type: 'paragraph',
        text: 'This gets you a ready‑made pub/sub mechanism with one significant bonus: AbortSignal integration. Cleanup becomes a one‑liner regardless of how many listeners you registered.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const controller = new AbortController();\nconst { signal } = controller;\n\nticker.addEventListener("tick", drawChart, { signal });\nticker.addEventListener("tick", flashRow,  { signal });\nticker.addEventListener("tick", logTick,   { signal });\n\n// Later, when the dashboard unmounts:\ncontroller.abort(); // every listener attached with `signal` is removed',
        },
      },
      {
        type: 'paragraph',
        text: 'If you’ve ever forgotten to remove a listener and chased a memory leak through Chrome DevTools’ heap snapshots, this should look like a small miracle. The signal turns “remember every subscription so you can clean it up” into a single abort() call.',
      },
      {
        type: 'paragraph',
        text: 'The two patterns are siblings, and they’re often conflated. The distinction is real and useful.',
      },
      {
        type: 'table',
        headers: ['', 'Observer', 'Pub/Sub'],
        rows: [
          [
            'Coupling',
            'Observer knows about the subject',
            'Publisher and subscriber both know only the broker',
          ],
          [
            'Routing',
            'One subject, all observers receive every notification',
            'Topic / channel — subscribers opt into specific names',
          ],
          ['Implementation', 'Method on the subject', 'Separate broker object (event bus)'],
          [
            'Typical use',
            'Domain object notifying its watchers',
            'App‑wide event bus across unrelated modules',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'In the stock ticker above, ticker is the subject and every subscriber receives every tick — that’s classic Observer. If we instead had bus.publish("ticks/AAPL", price) and subscribers selected by topic, that would be Pub/Sub.',
      },
      {
        type: 'paragraph',
        text: 'A minimal Pub/Sub built on EventTarget:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'class EventBus {\n  #target = new EventTarget();\n\n  publish(topic, data) {\n    this.#target.dispatchEvent(new CustomEvent(topic, { detail: data }));\n  }\n\n  subscribe(topic, handler, { signal } = {}) {\n    const listener = (e) => handler(e.detail);\n    this.#target.addEventListener(topic, listener, { signal });\n    return () => this.#target.removeEventListener(topic, listener);\n  }\n}',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Async iterators',
      },
      {
        type: 'paragraph',
        text: 'If your “events” are really a sequence, an async iterator turns them into a for await...of loop — readable top‑to‑bottom code that pauses at each iteration:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'async function* watchTicks(socket, { signal }) {\n  while (!signal.aborted) {\n    const message = await new Promise((resolve, reject) => {\n      socket.addEventListener("message", resolve, { once: true, signal });\n      socket.addEventListener("error",   reject,  { once: true, signal });\n    });\n    yield JSON.parse(message.data);\n  }\n}\n\nconst controller = new AbortController();\nfor await (const tick of watchTicks(socket, { signal: controller.signal })) {\n  drawChart(tick);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'This composes well with AsyncIterator.prototype.map and friends — proposals that are progressing through TC39 and already work in modern engines via helper libraries.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Reactive signals',
      },
      {
        type: 'paragraph',
        text: 'A different take on Observer is the signal: a small reactive primitive that knows which functions read it and re‑runs them when it changes. Preact, Solid, Angular, and Vue have all converged on a similar shape, and a TC39 proposal is exploring a standardized version.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { signal, computed, effect } from "@preact/signals-core";\n\nconst price    = signal(100);\nconst quantity = signal(2);\nconst total    = computed(() => price.value * quantity.value);\n\neffect(() => console.log(`Total: $${total.value}`));\n\nprice.value = 110;   // logs "Total: $220"\nquantity.value = 3;  // logs "Total: $330"',
        },
      },
      {
        type: 'paragraph',
        text: 'The subscription is invisible — effect simply re‑runs whenever any signal it read changes. Underneath, it’s still Observer: the signal is the subject, the effect is the observer.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'RxJS for stream composition',
      },
      {
        type: 'paragraph',
        text: 'When the relationship between events matters — debouncing a search box, merging two streams, retrying on failure — RxJS earns its weight. Here’s a typeahead that waits for the user to stop typing, ignores duplicate searches, and cancels stale requests:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import { fromEvent, switchMap, debounceTime, distinctUntilChanged, map } from "rxjs";\n\nconst input = document.querySelector("#search");\n\nfromEvent(input, "input").pipe(\n  map((e) => e.target.value.trim()),\n  debounceTime(250),\n  distinctUntilChanged(),\n  switchMap((q) =>\n    q ? fetch(`/api/search?q=${encodeURIComponent(q)}`).then((r) => r.json()) : []\n  )\n).subscribe(renderResults);',
        },
      },
      {
        type: 'paragraph',
        text: 'switchMap automatically cancels the previous fetch when a new query arrives — exactly the behavior you want for typeahead. Building that by hand on top of plain Observer is doable but tedious; RxJS makes it declarative.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Memory leaks from forgotten subscriptions',
      },
      {
        type: 'paragraph',
        text: 'This is the failure mode for the pattern. Every subscription is a reference from the subject to the observer; until you unsubscribe, the observer (and anything it closes over) cannot be garbage collected. Three mitigations:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Use AbortSignal with EventTarget so cleanup is a single abort() call.',
          'Return an unsubscribe function from subscribe so callers don’t need to find their handler again.',
          'Tie subscriptions to component lifecycles in frameworks — React’s useEffect cleanup, Vue’s onScopeDispose, Svelte’s onDestroy.',
        ],
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Notification order assumptions',
      },
      {
        type: 'paragraph',
        text: 'Observers receive notifications in subscription order in most implementations, but you should not rely on that for correctness. If observer B genuinely needs to run after observer A, that’s a dependency the pattern can’t express — model it explicitly instead.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Synchronous notification storms',
      },
      {
        type: 'paragraph',
        text: 'notify runs every observer synchronously. If one observer takes 200 ms, every observer behind it waits. If a tick arrives every 16 ms and your observers take longer than that to run, you’re heading for frame drops or queue blowups. Consider batching (as in the chart example above) or offloading heavy work with queueMicrotask / setTimeout.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Re‑entrant notifications',
      },
      {
        type: 'paragraph',
        text: 'If an observer’s handler triggers a new notify on the same subject, you can end up in surprising recursion. If that’s a real risk in your domain, queue notifications instead of dispatching them inline.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'When one‑shot data flow would do. A Promise is the right shape for “tell me when this finishes, once.” Observer is for repeated events.',
          'When the subject and observer always live together. If only one thing ever observes the subject and they’re created in the same place, a direct method call is simpler and easier to follow.',
          'When you need a request/response round‑trip. Observer is fire‑and‑forget. If callers expect an answer, use a function call, a promise, or a command bus.',
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'EventTarget — MDN',
          'AbortController — MDN',
          'RxJS',
          'Signals proposal — TC39',
          'Async iterators — MDN',
        ],
      },
      {
        type: 'paragraph',
        text: 'Design Pattern',
      },
      {
        type: 'paragraph',
        text: 'A module is a file that owns a piece of behavior, decides what to share, and keeps everything else to itself. Today, “module” in JavaScript means ES modules — a real specification baked into the language, supported natively by every modern browser and by Node.js. The patterns and trade‑offs that defined module systems before 2015 (closures faking privacy, AMD loaders, CommonJS wrapping) are mostly historical curiosities now. What replaces them is more interesting, and that’s what this article focuses on.',
      },
      {
        type: 'paragraph',
        text: 'The mental model is short:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'A module is a file. The file is its own scope.',
          'Anything not exported is private to the file.',
          'A module is evaluated once per realm. Every importer sees the same bindings.',
          'import statements are static and hoisted; import() is dynamic and returns a promise.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Hold onto those four points — everything else is variations on them.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// inventory.js\nconst cache = new Map();\n\nexport function get(sku) {\n  return cache.get(sku);\n}\n\nexport async function refresh() {\n  const response = await fetch("/api/inventory");\n  const items = await response.json();\n  cache.clear();\n  for (const item of items) cache.set(item.sku, item);\n}\n\nexport const ready = refresh(); // top-level await also works in modules',
        },
      },
      {
        type: 'paragraph',
        text: 'Two things to notice. First, cache is unreachable from outside this file. There’s no Object.freeze, no closure trick, no naming convention — the language gives you privacy for free. Second, ready is the result of a top‑level await expression, an ES2022 feature: if the importing module wants to wait for the initial fetch, it can await the export.',
      },
      {
        type: 'paragraph',
        text: 'On the consumer side:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// app.js\nimport { get, refresh, ready } from "./inventory.js";\n\nawait ready;\nconsole.log(get("ABC-123"));',
        },
      },
      {
        type: 'paragraph',
        text: 'Named exports are the default style from 2024 onwards. Default exports still exist (export default Foo) and have their place — most useful when a file represents a single thing (a React component, a class, the entry point of a library). For multi‑function utility files, named exports are easier to refactor and tree‑shake.',
      },
      {
        type: 'paragraph',
        text: 'Node decides whether a file is a module by looking at three things, in order:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'The file extension. .mjs is always a module; .cjs is always CommonJS.',
          'The closest package.json. If it has "type": "module", then .js files are modules. If it has "type": "commonjs" (or omits the field), .js files are CommonJS.',
          'The --input-type flag for stdin.',
        ],
      },
      {
        type: 'paragraph',
        text: 'A modern Node package looks like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '{\n  "name": "@example/inventory",\n  "version": "1.0.0",\n  "type": "module",\n  "exports": {\n    ".": "./dist/index.js",\n    "./schema": "./dist/schema.js",\n    "./package.json": "./package.json"\n  },\n  "imports": {\n    "#config": "./src/config.js",\n    "#test/*": "./test/helpers/*.js"\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'The exports field is the modern replacement for main. It does two important things: it controls which subpaths consumers can import (anything not listed is private to the package), and it can map the same subpath to different files depending on the environment (import vs require, browser vs node, development vs production).',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '"exports": {\n  ".": {\n    "types":  "./dist/index.d.ts",\n    "browser": "./dist/index.browser.js",\n    "node":    "./dist/index.node.js",\n    "default": "./dist/index.js"\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'These are conditional exports. The runtime picks the first matching condition, top to bottom — so order matters, and "types" should come first because TypeScript reads them.',
      },
      {
        type: 'paragraph',
        text: 'The imports field is a sibling feature for subpath imports inside your own package. Anywhere in the package, import config from "#config" resolves to whatever imports["#config"] maps to. It’s a cleaner alternative to ../../../../config.js paths, and it gives you a single place to swap implementations for testing.',
      },
      {
        type: 'paragraph',
        text: 'You will run into this. The rules:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'ESM importing CJS: allowed. The CJS module.exports becomes the ESM default export. Named imports work for static analyzable named exports, but anything dynamic on module.exports is only accessible through the default.',
          'CJS requiring ESM: historically forbidden, but Node 22+ permits require() of ESM when the target module has no top‑level await. Otherwise, use await import() inside an async function.',
          'Dual packages: publish both formats from one package using conditional exports. Keep state out of the package, or you’ll end up with two copies of it at runtime — the “dual package hazard.”',
        ],
      },
      {
        type: 'paragraph',
        text: 'A working dual export looks like:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '"exports": {\n  ".": {\n    "import": "./dist/index.mjs",\n    "require": "./dist/index.cjs"\n  }\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Build tools (tsup, unbuild, rollup) automate producing both bundles.',
      },
      {
        type: 'paragraph',
        text: 'A &lt;script type="module"&gt; tells the browser to parse the file as a module. Modules are deferred by default, executed in order, and fetched with CORS:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script type="module" src="/app.js"></script>\n<script nomodule src="/legacy-bundle.js"></script>',
        },
      },
      {
        type: 'paragraph',
        text: 'nomodule is the fallback for browsers that don’t support modules — fewer and fewer of those exist; for most projects, you can drop the legacy bundle entirely.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Import maps',
      },
      {
        type: 'paragraph',
        text: 'The big browser‑side improvement is import maps. They let you use bare specifiers (import { x } from "lodash-es") in the browser without a bundler, by giving the browser a JSON mapping from name to URL.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<script type="importmap">\n{\n  "imports": {\n    "lit": "https://cdn.jsdelivr.net/npm/lit@3/index.js",\n    "@app/": "/src/app/"\n  },\n  "scopes": {\n    "/legacy/": { "lit": "https://cdn.jsdelivr.net/npm/lit@2/index.js" }\n  }\n}\n</script>\n\n<script type="module">\n  import { LitElement } from "lit";\n  import { Router } from "@app/router.js";\n</script>',
        },
      },
      {
        type: 'paragraph',
        text: 'scopes lets you override mappings under specific URL prefixes — handy when one part of your app needs an older version of a dependency. Import maps ship in every modern browser as of 2023.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Module preload',
      },
      {
        type: 'paragraph',
        text: 'A static import pauses execution while the dependency is fetched. For critical modules, &lt;link rel="modulepreload"&gt; warms the cache so the import resolves instantly:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<link rel="modulepreload" href="/app.js">\n<link rel="modulepreload" href="/router.js">\n<link rel="modulepreload" href="/inventory.js">',
        },
      },
      {
        type: 'paragraph',
        text: 'The browser fetches, parses, and compiles the listed modules in parallel with the rest of the page. By the time app.js runs, its dependencies are already sitting in memory.',
      },
      {
        type: 'paragraph',
        text: 'A function‑like import() returns a promise for the module namespace. It’s the bread and butter of route‑based code splitting and on‑demand feature loading.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// Route-based: load the editor only when the user navigates to /edit\nrouter.on("/edit/:id", async ({ id }) => {\n  const { mount } = await import("./editor.js");\n  mount(document.querySelector("#root"), { id });\n});\n\n// Interaction-based: load a heavy library only when the user clicks\nbutton.addEventListener("click", async () => {\n  const { default: confetti } = await import("canvas-confetti");\n  confetti();\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Bundlers recognize import() calls and split the target into its own chunk automatically. Vite, esbuild, Rollup, webpack, Rspack — every modern bundler does this without configuration.',
      },
      {
        type: 'paragraph',
        text: 'import() can be combined with Promise.all to parallelize:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const [{ default: heavy }, { utils }] = await Promise.all([\n  import("./heavy.js"),\n  import("./utils.js"),\n]);',
        },
      },
      {
        type: 'paragraph',
        text: 'And it accepts variables, which lets you compute the path at runtime:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const lang = navigator.language.split("-")[0];\nconst { messages } = await import(`./i18n/${lang}.js`);',
        },
      },
      {
        type: 'paragraph',
        text: 'Be careful with this one: most bundlers will include every file that matches the pattern in the build, since they can’t predict the value statically. Constrain the pattern (a known directory, a fixed extension) to keep the chunk count sane.',
      },
      {
        type: 'paragraph',
        text: 'A 2024 feature (Stage 3, shipping in V8 and JavaScriptCore) is import attributes, which let you import non‑JavaScript resources by specifying their type:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'import config from "./config.json" with { type: "json" };\nimport sheet  from "./styles.css"   with { type: "css" };',
        },
      },
      {
        type: 'paragraph',
        text: 'The dynamic form takes the attributes as a second argument:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const data = await import("./data.json", { with: { type: "json" } });',
        },
      },
      {
        type: 'paragraph',
        text: 'The with syntax replaces the earlier assert keyword from the original proposal. If you have older code using assert { type: "json" }, update it — assert is being removed.',
      },
      {
        type: 'paragraph',
        text: 'JSON modules are the headline use case, but the same syntax is being extended to CSS Module Scripts and (in proposals) WebAssembly modules.',
      },
      {
        type: 'paragraph',
        text: 'Native ESM is a great development experience but ships a lot of small files. For production, bundlers consolidate modules and prune what isn’t used. The pruning step — tree‑shaking — depends on a few module‑level invariants:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Imports and exports are static, so a bundler can statically determine which exports are referenced.',
          'The module is side‑effect free, or the package marks it with "sideEffects": false (or a list of side‑effectful files) in package.json.',
          'Re‑exports (export { foo } from "./bar.js") are followed transitively.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The ecosystem has converged:',
      },
      {
        type: 'table',
        headers: ['Bundler', 'Engine', 'Notes'],
        rows: [
          ['Vite', 'Rollup (build) + esbuild (dev)', 'Default for new SPAs; native ESM in dev'],
          ['esbuild', 'Native Go', 'Extremely fast; often used as a library by other tools'],
          ['Rollup', 'JS', 'Library output is its sweet spot'],
          ['Rspack', 'Rust port of webpack', 'Drop‑in webpack replacement, much faster'],
          ['Turbopack', 'Rust', 'Next.js bundler; incremental, persistent cache'],
          ['Parcel', 'JS / Rust', 'Zero‑config'],
        ],
      },
      {
        type: 'paragraph',
        text: 'You don’t have to pick the “fastest” one — pick whichever fits your framework. The output across the modern bundlers is similar enough that performance differences are mostly at build time, not runtime.',
      },
      {
        type: 'paragraph',
        text: 'A small gotcha worth knowing: re‑export barrel files (index.js that re‑exports everything in a directory) can defeat tree‑shaking if any module in the barrel has a side effect. Either mark the package side‑effect‑free, or import directly from the leaf file.',
      },
      {
        type: 'paragraph',
        text: 'ESM is a near‑perfect fit for HMR because the module graph is explicit. When a file changes, the dev server can swap that module without reloading the page, and the framework can decide how to re‑run any code that depended on it.',
      },
      {
        type: 'paragraph',
        text: 'The standard hook in Vite and most ESM‑native bundlers is undefined:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// some-feature.js\nexport function mount(root) { /* ... */ }\n\nif (import.meta.hot) {\n  import.meta.hot.accept((newModule) => {\n    // Re-run with the updated implementation\n    newModule?.mount(document.querySelector("#root"));\n  });\n\n  import.meta.hot.dispose(() => {\n    // Tear down state before the new module takes over\n    document.querySelector("#root").innerHTML = "";\n  });\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'import.meta is the per‑module metadata object — also where you’ll find import.meta.url (the URL of the current module) and, in Node, import.meta.dirname / import.meta.filename (added in 21+).',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Live bindings catch people out',
      },
      {
        type: 'paragraph',
        text: 'ESM exports are live bindings, not value copies. If a module exports a let, importers see the current value, not the value at the time of import. CommonJS works the opposite way:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// counter.js\nexport let count = 0;\nexport function inc() { count++; }\n\n// app.js\nimport { count, inc } from "./counter.js";\ninc();\nconsole.log(count); // 1, not 0',
        },
      },
      {
        type: 'paragraph',
        text: 'This is usually what you want, but it can surprise people coming from CommonJS.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Cycles work, with caveats',
      },
      {
        type: 'paragraph',
        text: 'A imports B; B imports A. ESM handles this — both modules are partially evaluated before either finishes — but if you reference an export from the partner module during initialization (not inside a function), you may see undefined for bindings that haven’t been assigned yet. Restructure to avoid initialization‑time access across a cycle.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Path resolution differs from CommonJS',
      },
      {
        type: 'paragraph',
        text: 'Node’s ESM resolution is stricter: extensions are required (./foo.js, not ./foo), directory indices are not implicit, and the module specifier rules follow the WHATWG URL spec. The TypeScript option moduleResolution: "bundler" or "node16" aligns the compiler with what runtime resolution will actually do.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Top‑level await blocks importers',
      },
      {
        type: 'paragraph',
        text: 'await at module top level pauses the module’s completion, which means every importer also waits. Used judiciously (configuration loading, capability detection) it’s elegant. Used carelessly (a network call at the top of every leaf module) it serializes your startup.',
      },
      {
        type: 'paragraph',
        text: 'A module is the right unit when it owns a piece of state or behavior that has a clean API. A few practical heuristics:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'One concept per file. If you struggle to name the file in fewer than four words, it probably contains two concepts.',
          'Hide what callers don’t need. The fewer named exports, the easier the module is to use and refactor.',
          'Don’t pre‑split. Three closely related functions can live in one file. Splitting them increases the surface area without buying you anything.',
          'Split when reuse is real, not theoretical. Premature modularization is just as costly as premature abstraction.',
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'JavaScript modules — MDN',
          'ECMAScript modules — Node.js',
          'Package entry points — Node.js',
          'Import maps — MDN',
          'Import attributes — TC39',
          'Vite — HMR API',
        ],
      },
      {
        type: 'paragraph',
        text: 'Design Pattern',
      },
      {
        type: 'paragraph',
        text: 'A factory is a function whose job is to return an object — possibly different shapes of object depending on what you pass in — without making the caller deal with new, class hierarchies, or knowledge of which concrete type they’re getting back.',
      },
      {
        type: 'paragraph',
        text: 'In modern JavaScript you almost never need a class to do this. A function that closes over some configuration and returns an object literal is enough. The interesting questions are no longer “how do I implement a factory” but “when does a factory beat a class, and when does it beat a discriminated union or a DI container?”',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const createLogger = ({ level = "info", prefix = "" } = {}) => {\n  const ranks = { debug: 0, info: 1, warn: 2, error: 3 };\n  const threshold = ranks[level];\n\n  const log = (lvl, msg, ...rest) => {\n    if (ranks[lvl] < threshold) return;\n    console[lvl](`${prefix}${msg}`, ...rest);\n  };\n\n  return {\n    debug: (m, ...r) => log("debug", m, ...r),\n    info:  (m, ...r) => log("info", m, ...r),\n    warn:  (m, ...r) => log("warn", m, ...r),\n    error: (m, ...r) => log("error", m, ...r),\n  };\n};\n\nconst log = createLogger({ level: "warn", prefix: "[api] " });\nlog.info("ignored");          // silenced by threshold\nlog.warn("rate limit hit");   // [api] rate limit hit',
        },
      },
      {
        type: 'paragraph',
        text: 'Two things make this work as a factory rather than just “a function that returns an object”:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'It encapsulates setup. The ranks map and the threshold lookup happen exactly once, when the logger is constructed. Every call to log.warn reuses those captured values.',
          'It returns an interface, not a type. Callers depend on the shape { debug, info, warn, error }. Whether that came from a class, an object literal, or a Proxy is invisible to them — and that’s the decoupling Factory was always trying to enable.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Configuration that varies per environment, per tenant, or per service is the prototypical factory case:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const createApiClient = ({ baseUrl, auth, fetch = globalThis.fetch }) => {\n  const headers = () => ({\n    "Content-Type": "application/json",\n    ...(auth?.token && { Authorization: `Bearer ${auth.token}` }),\n  });\n\n  const request = async (method, path, body) => {\n    const res = await fetch(`${baseUrl}${path}`, {\n      method,\n      headers: headers(),\n      body: body && JSON.stringify(body),\n    });\n    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);\n    return res.status === 204 ? null : res.json();\n  };\n\n  return {\n    get:  (p)     => request("GET", p),\n    post: (p, b)  => request("POST", p, b),\n    put:  (p, b)  => request("PUT", p, b),\n    del:  (p)     => request("DELETE", p),\n  };\n};\n\nconst api = createApiClient({\n  baseUrl: "https://api.example.com",\n  auth: { token: process.env.API_TOKEN },\n});',
        },
      },
      {
        type: 'paragraph',
        text: 'Note what isn’t here: no this, no new, no inheritance, no bind calls. The fetch parameter is intentional — passing it in makes the factory trivially testable by handing in a fake.',
      },
      {
        type: 'paragraph',
        text: 'When the factory’s job is “pick the right implementation based on a string tag,” resist the urge to write a switch. A lookup table is shorter, easier to extend, and harder to forget to update:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const fieldFactories = {\n  text:     (props) => ({ type: "text",     ...props, validate: nonEmpty }),\n  email:    (props) => ({ type: "email",    ...props, validate: isEmail }),\n  number:   (props) => ({ type: "number",   ...props, validate: isFinite }),\n  checkbox: (props) => ({ type: "checkbox", ...props, validate: () => true }),\n};\n\nconst createField = ({ type, ...rest }) => {\n  const make = fieldFactories[type];\n  if (!make) throw new Error(`Unknown field type: ${type}`);\n  return make(rest);\n};',
        },
      },
      {
        type: 'paragraph',
        text: 'Adding a new field type means adding a key to fieldFactories — no editing the dispatch, no merge conflicts on a long switch block, and you can introspect the registry (Object.keys(fieldFactories)) if you need to render a “supported field types” UI.',
      },
      {
        type: 'paragraph',
        text: 'This same shape — componentMap[type] — drives most dynamic form renderers in React and Vue, and most plugin systems that ship in JS libraries.',
      },
      {
        type: 'paragraph',
        text: 'These three are often conflated. They solve overlapping problems but they cost different amounts:',
      },
      {
        type: 'table',
        headers: ['Approach', 'Best at', 'Cost'],
        rows: [
          [
            'Class with new',
            'Long-lived objects with identity, polymorphism via instanceof, hot-path methods that benefit from shared prototype',
            'this semantics, binding, harder to compose, harder to mock',
          ],
          [
            'Factory function',
            'Configuration capture, environment switching, returning different shapes, easy mocking',
            'One closure per instance (methods aren’t shared)',
          ],
          [
            'DI container (tsyringe, InversifyJS, NestJS providers)',
            'Wiring graphs of services where ownership and lifecycle matter',
            'Decorator/metadata machinery, runtime surprises, overkill outside large apps',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'A useful heuristic: if you’d reach for new SomeClass() from more than a couple of places, you usually wanted a factory. If you’d reach for a factory from across module boundaries with cross-cutting lifecycle concerns (request-scoped, singleton, transient), you might want a container.',
      },
      {
        type: 'paragraph',
        text: 'The factory’s biggest payoff in TypeScript is discriminated unions plus conditional return types. The caller gets a precise type back based on the tag they passed:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'type FieldSpec =\n  | { type: "text"; placeholder?: string }\n  | { type: "number"; min?: number; max?: number }\n  | { type: "checkbox"; defaultChecked?: boolean };\n\ntype Field<T extends FieldSpec["type"]> = Extract<FieldSpec, { type: T }> & {\n  id: string;\n  validate(value: unknown): boolean;\n};\n\nfunction createField<T extends FieldSpec["type"]>(\n  spec: Extract<FieldSpec, { type: T }>\n): Field<T> {\n  // implementation\n  return { id: crypto.randomUUID(), validate: () => true, ...spec } as Field<T>;\n}\n\nconst a = createField({ type: "number", min: 0 }); // typed with `min`/`max`\nconst b = createField({ type: "text" });           // typed with `placeholder`',
        },
      },
      {
        type: 'paragraph',
        text: 'The compiler narrows the return shape based on the input discriminator. This is the part of the pattern that classes still can’t replicate cleanly without overload soup.',
      },
      {
        type: 'paragraph',
        text: 'For one-method “objects,” a curried function is the factory:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const withRetries = (n) => async (fn) => {\n  for (let i = 0; i < n; i++) {\n    try { return await fn(); }\n    catch (e) { if (i === n - 1) throw e; }\n  }\n};\n\nconst retry3 = withRetries(3);\nawait retry3(() => fetch("/flaky"));',
        },
      },
      {
        type: 'paragraph',
        text: 'withRetries(3) is a factory call that returns a closure parameterized by n. When the “object” you’d be returning has exactly one method, skip the object literal.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'You only ever construct it one way. A factory whose only call site passes the same options is just a constructor with extra steps. Inline it.',
          'You need instanceof checks. Factories return plain objects; there’s no class to check against. If callers branch on type with instanceof, you want a class (or a discriminator field on the returned object).',
          'You’re tempted to return a React/Vue component. Component factories that close over render-time state usually misbehave with hooks and reactivity. Use composition or higher-order components instead.',
          'The “factory” is just new X() wrapped. That’s not abstraction, it’s noise.',
        ],
      },
      {
        type: 'table',
        headers: ['Benefit', 'Cost'],
        rows: [
          [
            'No new, no this, no binding bugs',
            'No shared prototype — methods are reallocated per instance',
          ],
          [
            'Easy to swap implementations behind a stable interface',
            'No instanceof for runtime type checks',
          ],
          [
            'Trivially mockable (pass fakes through options)',
            'Lookup-table dispatch loses static reachability tools (find-all-references on a class method)',
          ],
          [
            'Composes cleanly with closures and partial application',
            'Can hide complexity that would be more honest as a class',
          ],
        ],
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'JavaScript Factory Functions with ES6+ - Eric Elliott',
          'Discriminated unions in TypeScript - TypeScript Handbook',
          'tsyringe - lightweight DI container for TypeScript',
        ],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
