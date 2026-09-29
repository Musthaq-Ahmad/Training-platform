Design Pattern

Imagine you’re building a stock dashboard. The price ticker arrives over a WebSocket, and several unrelated pieces of UI need to react: a chart redraws, a row in a watchlist flashes green or red, a portfolio total recalculates, and an audit log records the tick. The WebSocket has no business knowing about any of those consumers. What it needs is a way to say “here is a new tick” and let interested parties decide what that means for them.

That is the Observer pattern. A **subject** maintains a list of **observers** and broadcasts to them when something changes. New observers can attach themselves whenever they like; existing observers can detach when they’re done. Nothing in the subject is hard‑coded to a specific consumer.

---

## The core shape

At minimum, a subject needs three things: somewhere to keep observers, a way to add and remove them, and a way to push updates. Here’s a small implementation that uses a `Set` so we get O(1) removal and deduplication for free.

```
class Subject {
  #observers = new Set();

  subscribe(observer) {
    this.#observers.add(observer);
    // Hand back an unsubscribe function — easier than asking
    // the caller to hold onto the reference they passed in.
    return () => this.#observers.delete(observer);
  }

  notify(payload) {
    for (const observer of this.#observers) {
      observer(payload);
    }
  }
}
```

The return value of `subscribe` is a small ergonomic win that pays for itself the first time you forget what you passed in. The caller stores the returned function and calls it when they’re done — no lookup, no equality comparison, no `unsubscribe` method on the subject at all.

---

## A concrete example: a stock ticker

Let’s wire the subject to a stream of prices and a few consumers that want to know about them.

```
const ticker = new Subject();

// A chart that buffers ticks and redraws every animation frame.
const chartQueue = [];
let pending = false;
const drawChart = (tick) => {
  chartQueue.push(tick);
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
    renderChart(chartQueue);
    chartQueue.length = 0;
    pending = false;
  });
};

// A watchlist row that flashes when its symbol updates.
const flashRow = ({ symbol, price, previous }) => {
  if (symbol !== "AAPL") return;
  document
    .querySelector('[data-symbol="AAPL"]')
    ?.classList.toggle("up", price > previous);
};

// A logger that records every tick for replay.
const logTick = (tick) => console.debug("[tick]", tick);

const unsubChart = ticker.subscribe(drawChart);
const unsubRow   = ticker.subscribe(flashRow);
const unsubLog   = ticker.subscribe(logTick);

// Somewhere else, the WebSocket pushes new prices in:
socket.addEventListener("message", (event) => {
  const tick = JSON.parse(event.data);
  ticker.notify(tick);
});
```

Each consumer is a small, focused function. The ticker doesn’t know any of them by name. If you decide later that the watchlist row should debounce, or that the logger should sample only one in ten ticks, you change the consumer — the ticker is untouched. That decoupling is the entire payoff of the pattern.

---

## Using the browser’s built‑in Observer: `EventTarget`

You don’t always need to write your own `Subject`. Since 2017, every browser has shipped a constructable `EventTarget` — the same machinery the DOM uses for `addEventListener`, available for arbitrary objects.

```
class Ticker extends EventTarget {
  push(tick) {
    this.dispatchEvent(new CustomEvent("tick", { detail: tick }));
  }
}

const ticker = new Ticker();

ticker.addEventListener("tick", (e) => drawChart(e.detail));
ticker.addEventListener("tick", (e) => flashRow(e.detail));
```

This gets you a ready‑made pub/sub mechanism with one significant bonus: **`AbortSignal` integration**. Cleanup becomes a one‑liner regardless of how many listeners you registered.

```
const controller = new AbortController();
const { signal } = controller;

ticker.addEventListener("tick", drawChart, { signal });
ticker.addEventListener("tick", flashRow,  { signal });
ticker.addEventListener("tick", logTick,   { signal });

// Later, when the dashboard unmounts:
controller.abort(); // every listener attached with `signal` is removed
```

If you’ve ever forgotten to remove a listener and chased a memory leak through Chrome DevTools’ heap snapshots, this should look like a small miracle. The signal turns “remember every subscription so you can clean it up” into a single `abort()` call.

---

## Observer vs. Pub/Sub

The two patterns are siblings, and they’re often conflated. The distinction is real and useful.

|                    | Observer                                              | Pub/Sub                                               |
| ------------------ | ----------------------------------------------------- | ----------------------------------------------------- |
| **Coupling**       | Observer knows about the subject                      | Publisher and subscriber both know only the broker    |
| **Routing**        | One subject, all observers receive every notification | Topic / channel — subscribers opt into specific names |
| **Implementation** | Method on the subject                                 | Separate broker object (event bus)                    |
| **Typical use**    | Domain object notifying its watchers                  | App‑wide event bus across unrelated modules           |

In the stock ticker above, `ticker` is the subject and every subscriber receives every tick — that’s classic Observer. If we instead had `bus.publish("ticks/AAPL", price)` and subscribers selected by topic, that would be Pub/Sub.

A minimal Pub/Sub built on `EventTarget`:

```
class EventBus {
  #target = new EventTarget();

  publish(topic, data) {
    this.#target.dispatchEvent(new CustomEvent(topic, { detail: data }));
  }

  subscribe(topic, handler, { signal } = {}) {
    const listener = (e) => handler(e.detail);
    this.#target.addEventListener(topic, listener, { signal });
    return () => this.#target.removeEventListener(topic, listener);
  }
}
```

---

## Modern variants you should know

### Async iterators

If your “events” are really a sequence, an async iterator turns them into a `for await...of` loop — readable top‑to‑bottom code that pauses at each iteration:

```
async function* watchTicks(socket, { signal }) {
  while (!signal.aborted) {
    const message = await new Promise((resolve, reject) => {
      socket.addEventListener("message", resolve, { once: true, signal });
      socket.addEventListener("error",   reject,  { once: true, signal });
    });
    yield JSON.parse(message.data);
  }
}

const controller = new AbortController();
for await (const tick of watchTicks(socket, { signal: controller.signal })) {
  drawChart(tick);
}
```

This composes well with `AsyncIterator.prototype.map` and friends — proposals that are progressing through TC39 and already work in modern engines via helper libraries.

### Reactive signals

A different take on Observer is the **signal**: a small reactive primitive that knows which functions read it and re‑runs them when it changes. Preact, Solid, Angular, and Vue have all converged on a similar shape, and a TC39 proposal is exploring a standardized version.

```
import { signal, computed, effect } from "@preact/signals-core";

const price    = signal(100);
const quantity = signal(2);
const total    = computed(() => price.value * quantity.value);

effect(() => console.log(`Total: $${total.value}`));

price.value = 110;   // logs "Total: $220"
quantity.value = 3;  // logs "Total: $330"
```

The subscription is invisible — `effect` simply re‑runs whenever any signal it read changes. Underneath, it’s still Observer: the signal is the subject, the effect is the observer.

### RxJS for stream composition

When the relationship between events matters — debouncing a search box, merging two streams, retrying on failure — RxJS earns its weight. Here’s a typeahead that waits for the user to stop typing, ignores duplicate searches, and cancels stale requests:

```
import { fromEvent, switchMap, debounceTime, distinctUntilChanged, map } from "rxjs";

const input = document.querySelector("#search");

fromEvent(input, "input").pipe(
  map((e) => e.target.value.trim()),
  debounceTime(250),
  distinctUntilChanged(),
  switchMap((q) =>
    q ? fetch(`/api/search?q=${encodeURIComponent(q)}`).then((r) => r.json()) : []
  )
).subscribe(renderResults);
```

`switchMap` automatically cancels the previous fetch when a new query arrives — exactly the behavior you want for typeahead. Building that by hand on top of plain Observer is doable but tedious; RxJS makes it declarative.

---

## Common pitfalls

### Memory leaks from forgotten subscriptions

This is the failure mode for the pattern. Every subscription is a reference from the subject to the observer; until you unsubscribe, the observer (and anything it closes over) cannot be garbage collected. Three mitigations:

1.  **Use `AbortSignal`** with `EventTarget` so cleanup is a single `abort()` call.
2.  **Return an unsubscribe function from `subscribe`** so callers don’t need to find their handler again.
3.  **Tie subscriptions to component lifecycles** in frameworks — React’s `useEffect` cleanup, Vue’s `onScopeDispose`, Svelte’s `onDestroy`.

### Notification order assumptions

Observers receive notifications in subscription order in most implementations, but you should not rely on that for correctness. If observer B genuinely needs to run after observer A, that’s a dependency the pattern can’t express — model it explicitly instead.

### Synchronous notification storms

`notify` runs every observer synchronously. If one observer takes 200 ms, every observer behind it waits. If a tick arrives every 16 ms and your observers take longer than that to run, you’re heading for frame drops or queue blowups. Consider batching (as in the chart example above) or offloading heavy work with `queueMicrotask` / `setTimeout`.

### Re‑entrant notifications

If an observer’s handler triggers a new `notify` on the same subject, you can end up in surprising recursion. If that’s a real risk in your domain, queue notifications instead of dispatching them inline.

---

## When NOT to use Observer

- **When one‑shot data flow would do.** A `Promise` is the right shape for “tell me when this finishes, once.” Observer is for repeated events.
- **When the subject and observer always live together.** If only one thing ever observes the subject and they’re created in the same place, a direct method call is simpler and easier to follow.
- **When you need a request/response round‑trip.** Observer is fire‑and‑forget. If callers expect an answer, use a function call, a promise, or a command bus.

---

## References

- [EventTarget — MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
- [AbortController — MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [RxJS](https://rxjs.dev/)
- [Signals proposal — TC39](https://github.com/tc39/proposal-signals)
- [Async iterators — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)

---

Design Pattern

A module is a file that owns a piece of behavior, decides what to share, and keeps everything else to itself. Today, “module” in JavaScript means **ES modules** — a real specification baked into the language, supported natively by every modern browser and by Node.js. The patterns and trade‑offs that defined module systems before 2015 (closures faking privacy, AMD loaders, CommonJS wrapping) are mostly historical curiosities now. What replaces them is more interesting, and that’s what this article focuses on.

The mental model is short:

1.  A module is a file. The file is its own scope.
2.  Anything not `export`ed is private to the file.
3.  A module is evaluated **once** per realm. Every importer sees the same bindings.
4.  `import` statements are static and hoisted; `import()` is dynamic and returns a promise.

Hold onto those four points — everything else is variations on them.

---

## Exports and imports, the modern shape

```
// inventory.js
const cache = new Map();

export function get(sku) {
  return cache.get(sku);
}

export async function refresh() {
  const response = await fetch("/api/inventory");
  const items = await response.json();
  cache.clear();
  for (const item of items) cache.set(item.sku, item);
}

export const ready = refresh(); // top-level await also works in modules
```

Two things to notice. First, `cache` is unreachable from outside this file. There’s no `Object.freeze`, no closure trick, no naming convention — the language gives you privacy for free. Second, `ready` is the result of a top‑level `await` expression, an ES2022 feature: if the importing module wants to wait for the initial fetch, it can `await` the export.

On the consumer side:

```
// app.js
import { get, refresh, ready } from "./inventory.js";

await ready;
console.log(get("ABC-123"));
```

Named exports are the default style from 2024 onwards. Default exports still exist (`export default Foo`) and have their place — most useful when a file represents a single thing (a React component, a class, the entry point of a library). For multi‑function utility files, named exports are easier to refactor and tree‑shake.

---

## ESM in Node.js

Node decides whether a file is a module by looking at three things, in order:

1.  The file extension. `.mjs` is always a module; `.cjs` is always CommonJS.
2.  The closest `package.json`. If it has `"type": "module"`, then `.js` files are modules. If it has `"type": "commonjs"` (or omits the field), `.js` files are CommonJS.
3.  The `--input-type` flag for stdin.

A modern Node package looks like this:

```
{
  "name": "@example/inventory",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": "./dist/index.js",
    "./schema": "./dist/schema.js",
    "./package.json": "./package.json"
  },
  "imports": {
    "#config": "./src/config.js",
    "#test/*": "./test/helpers/*.js"
  }
}
```

The `exports` field is the modern replacement for `main`. It does two important things: it controls **which subpaths consumers can import** (anything not listed is private to the package), and it can map the same subpath to different files depending on the environment (`import` vs `require`, browser vs node, development vs production).

```
"exports": {
  ".": {
    "types":  "./dist/index.d.ts",
    "browser": "./dist/index.browser.js",
    "node":    "./dist/index.node.js",
    "default": "./dist/index.js"
  }
}
```

These are **conditional exports**. The runtime picks the first matching condition, top to bottom — so order matters, and `"types"` should come first because TypeScript reads them.

The `imports` field is a sibling feature for **subpath imports inside your own package**. Anywhere in the package, `import config from "#config"` resolves to whatever `imports["#config"]` maps to. It’s a cleaner alternative to `../../../../config.js` paths, and it gives you a single place to swap implementations for testing.

---

## ESM/CJS interop, briefly

You will run into this. The rules:

- **ESM importing CJS:** allowed. The CJS `module.exports` becomes the ESM `default` export. Named imports work for static analyzable named exports, but anything dynamic on `module.exports` is only accessible through the default.
- **CJS requiring ESM:** historically forbidden, but Node 22+ permits `require()` of ESM when the target module has no top‑level `await`. Otherwise, use `await import()` inside an async function.
- **Dual packages:** publish both formats from one package using conditional exports. Keep state out of the package, or you’ll end up with two copies of it at runtime — the “dual package hazard.”

A working dual export looks like:

```
"exports": {
  ".": {
    "import": "./dist/index.mjs",
    "require": "./dist/index.cjs"
  }
}
```

Build tools (tsup, unbuild, rollup) automate producing both bundles.

---

## ESM in the browser

A `<script type="module">` tells the browser to parse the file as a module. Modules are deferred by default, executed in order, and fetched with CORS:

```
<script type="module" src="/app.js"></script>
<script nomodule src="/legacy-bundle.js"></script>
```

`nomodule` is the fallback for browsers that don’t support modules — fewer and fewer of those exist; for most projects, you can drop the legacy bundle entirely.

### Import maps

The big browser‑side improvement is **import maps**. They let you use bare specifiers (`import { x } from "lodash-es"`) in the browser without a bundler, by giving the browser a JSON mapping from name to URL.

```
<script type="importmap">
{
  "imports": {
    "lit": "https://cdn.jsdelivr.net/npm/lit@3/index.js",
    "@app/": "/src/app/"
  },
  "scopes": {
    "/legacy/": { "lit": "https://cdn.jsdelivr.net/npm/lit@2/index.js" }
  }
}
</script>

<script type="module">
  import { LitElement } from "lit";
  import { Router } from "@app/router.js";
</script>
```

`scopes` lets you override mappings under specific URL prefixes — handy when one part of your app needs an older version of a dependency. Import maps ship in every modern browser as of 2023.

### Module preload

A static `import` pauses execution while the dependency is fetched. For critical modules, `<link rel="modulepreload">` warms the cache so the import resolves instantly:

```
<link rel="modulepreload" href="/app.js">
<link rel="modulepreload" href="/router.js">
<link rel="modulepreload" href="/inventory.js">
```

The browser fetches, parses, and compiles the listed modules in parallel with the rest of the page. By the time `app.js` runs, its dependencies are already sitting in memory.

---

## Dynamic imports

A function‑like `import()` returns a promise for the module namespace. It’s the bread and butter of route‑based code splitting and on‑demand feature loading.

```
// Route-based: load the editor only when the user navigates to /edit
router.on("/edit/:id", async ({ id }) => {
  const { mount } = await import("./editor.js");
  mount(document.querySelector("#root"), { id });
});

// Interaction-based: load a heavy library only when the user clicks
button.addEventListener("click", async () => {
  const { default: confetti } = await import("canvas-confetti");
  confetti();
});
```

Bundlers recognize `import()` calls and split the target into its own chunk automatically. Vite, esbuild, Rollup, webpack, Rspack — every modern bundler does this without configuration.

`import()` can be combined with `Promise.all` to parallelize:

```
const [{ default: heavy }, { utils }] = await Promise.all([
  import("./heavy.js"),
  import("./utils.js"),
]);
```

And it accepts variables, which lets you compute the path at runtime:

```
const lang = navigator.language.split("-")[0];
const { messages } = await import(`./i18n/${lang}.js`);
```

Be careful with this one: most bundlers will include every file that matches the pattern in the build, since they can’t predict the value statically. Constrain the pattern (a known directory, a fixed extension) to keep the chunk count sane.

---

## Import attributes

A 2024 feature (Stage 3, shipping in V8 and JavaScriptCore) is **import attributes**, which let you import non‑JavaScript resources by specifying their type:

```
import config from "./config.json" with { type: "json" };
import sheet  from "./styles.css"   with { type: "css" };
```

The dynamic form takes the attributes as a second argument:

```
const data = await import("./data.json", { with: { type: "json" } });
```

The `with` syntax replaces the earlier `assert` keyword from the original proposal. If you have older code using `assert { type: "json" }`, update it — `assert` is being removed.

JSON modules are the headline use case, but the same syntax is being extended to CSS Module Scripts and (in proposals) WebAssembly modules.

---

## Bundlers, tree‑shaking, and build output

Native ESM is a great development experience but ships a lot of small files. For production, bundlers consolidate modules and prune what isn’t used. The pruning step — **tree‑shaking** — depends on a few module‑level invariants:

- Imports and exports are static, so a bundler can statically determine which exports are referenced.
- The module is side‑effect free, or the package marks it with `"sideEffects": false` (or a list of side‑effectful files) in `package.json`.
- Re‑exports (`export { foo } from "./bar.js"`) are followed transitively.

The ecosystem has converged:

| Bundler       | Engine                         | Notes                                                  |
| ------------- | ------------------------------ | ------------------------------------------------------ |
| **Vite**      | Rollup (build) + esbuild (dev) | Default for new SPAs; native ESM in dev                |
| **esbuild**   | Native Go                      | Extremely fast; often used as a library by other tools |
| **Rollup**    | JS                             | Library output is its sweet spot                       |
| **Rspack**    | Rust port of webpack           | Drop‑in webpack replacement, much faster               |
| **Turbopack** | Rust                           | Next.js bundler; incremental, persistent cache         |
| **Parcel**    | JS / Rust                      | Zero‑config                                            |

You don’t have to pick the “fastest” one — pick whichever fits your framework. The output across the modern bundlers is similar enough that performance differences are mostly at build time, not runtime.

A small gotcha worth knowing: re‑export barrel files (`index.js` that re‑exports everything in a directory) can defeat tree‑shaking if any module in the barrel has a side effect. Either mark the package side‑effect‑free, or import directly from the leaf file.

---

## HMR (Hot Module Replacement)

ESM is a near‑perfect fit for HMR because the module graph is explicit. When a file changes, the dev server can swap that module without reloading the page, and the framework can decide how to re‑run any code that depended on it.

The standard hook in Vite and most ESM‑native bundlers is `undefined`:

```
// some-feature.js
export function mount(root) { /* ... */ }

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // Re-run with the updated implementation
    newModule?.mount(document.querySelector("#root"));
  });

  import.meta.hot.dispose(() => {
    // Tear down state before the new module takes over
    document.querySelector("#root").innerHTML = "";
  });
}
```

`import.meta` is the per‑module metadata object — also where you’ll find `import.meta.url` (the URL of the current module) and, in Node, `import.meta.dirname` / `import.meta.filename` (added in 21+).

---

## Common pitfalls

### Live bindings catch people out

ESM exports are **live bindings**, not value copies. If a module exports a `let`, importers see the current value, not the value at the time of import. CommonJS works the opposite way:

```
// counter.js
export let count = 0;
export function inc() { count++; }

// app.js
import { count, inc } from "./counter.js";
inc();
console.log(count); // 1, not 0
```

This is usually what you want, but it can surprise people coming from CommonJS.

### Cycles work, with caveats

A imports B; B imports A. ESM handles this — both modules are partially evaluated before either finishes — but if you reference an export from the partner module **during initialization** (not inside a function), you may see `undefined` for bindings that haven’t been assigned yet. Restructure to avoid initialization‑time access across a cycle.

### Path resolution differs from CommonJS

Node’s ESM resolution is stricter: extensions are required (`./foo.js`, not `./foo`), directory indices are not implicit, and the module specifier rules follow the WHATWG URL spec. The TypeScript option `moduleResolution: "bundler"` or `"node16"` aligns the compiler with what runtime resolution will actually do.

### Top‑level await blocks importers

`await` at module top level pauses the module’s completion, which means every importer also waits. Used judiciously (configuration loading, capability detection) it’s elegant. Used carelessly (a network call at the top of every leaf module) it serializes your startup.

---

## When to split into a new module

A module is the right unit when it owns a piece of state or behavior that has a clean API. A few practical heuristics:

- **One concept per file.** If you struggle to name the file in fewer than four words, it probably contains two concepts.
- **Hide what callers don’t need.** The fewer named exports, the easier the module is to use and refactor.
- **Don’t pre‑split.** Three closely related functions can live in one file. Splitting them increases the surface area without buying you anything.
- **Split when reuse is real**, not theoretical. Premature modularization is just as costly as premature abstraction.

---

## References

- [JavaScript modules — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [ECMAScript modules — Node.js](https://nodejs.org/api/esm.html)
- [Package entry points — Node.js](https://nodejs.org/api/packages.html#package-entry-points)
- [Import maps — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)
- [Import attributes — TC39](https://github.com/tc39/proposal-import-attributes)
- [Vite — HMR API](https://vitejs.dev/guide/api-hmr.html)

---

Design Pattern

A factory is a function whose job is to _return an object_ — possibly different shapes of object depending on what you pass in — without making the caller deal with `new`, class hierarchies, or knowledge of which concrete type they’re getting back.

In modern JavaScript you almost never need a class to do this. A function that closes over some configuration and returns an object literal is enough. The interesting questions are no longer “how do I implement a factory” but “when does a factory beat a class, and when does it beat a discriminated union or a DI container?”

## A minimal factory function

```
const createLogger = ({ level = "info", prefix = "" } = {}) => {
  const ranks = { debug: 0, info: 1, warn: 2, error: 3 };
  const threshold = ranks[level];

  const log = (lvl, msg, ...rest) => {
    if (ranks[lvl] < threshold) return;
    console[lvl](`${prefix}${msg}`, ...rest);
  };

  return {
    debug: (m, ...r) => log("debug", m, ...r),
    info:  (m, ...r) => log("info", m, ...r),
    warn:  (m, ...r) => log("warn", m, ...r),
    error: (m, ...r) => log("error", m, ...r),
  };
};

const log = createLogger({ level: "warn", prefix: "[api] " });
log.info("ignored");          // silenced by threshold
log.warn("rate limit hit");   // [api] rate limit hit
```

Two things make this work as a factory rather than just “a function that returns an object”:

1.  **It encapsulates setup.** The `ranks` map and the `threshold` lookup happen exactly once, when the logger is constructed. Every call to `log.warn` reuses those captured values.
2.  **It returns an interface, not a type.** Callers depend on the shape `{ debug, info, warn, error }`. Whether that came from a class, an object literal, or a Proxy is invisible to them — and that’s the decoupling Factory was always trying to enable.

## A more useful example: an HTTP client factory

Configuration that varies per environment, per tenant, or per service is the prototypical factory case:

```
const createApiClient = ({ baseUrl, auth, fetch = globalThis.fetch }) => {
  const headers = () => ({
    "Content-Type": "application/json",
    ...(auth?.token && { Authorization: `Bearer ${auth.token}` }),
  });

  const request = async (method, path, body) => {
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: headers(),
      body: body && JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.status === 204 ? null : res.json();
  };

  return {
    get:  (p)     => request("GET", p),
    post: (p, b)  => request("POST", p, b),
    put:  (p, b)  => request("PUT", p, b),
    del:  (p)     => request("DELETE", p),
  };
};

const api = createApiClient({
  baseUrl: "https://api.example.com",
  auth: { token: process.env.API_TOKEN },
});
```

Note what _isn’t_ here: no `this`, no `new`, no inheritance, no `bind` calls. The `fetch` parameter is intentional — passing it in makes the factory trivially testable by handing in a fake.

## Lookup-table factories: the Vehicle problem, done right

When the factory’s job is “pick the right implementation based on a string tag,” resist the urge to write a `switch`. A lookup table is shorter, easier to extend, and harder to forget to update:

```
const fieldFactories = {
  text:     (props) => ({ type: "text",     ...props, validate: nonEmpty }),
  email:    (props) => ({ type: "email",    ...props, validate: isEmail }),
  number:   (props) => ({ type: "number",   ...props, validate: isFinite }),
  checkbox: (props) => ({ type: "checkbox", ...props, validate: () => true }),
};

const createField = ({ type, ...rest }) => {
  const make = fieldFactories[type];
  if (!make) throw new Error(`Unknown field type: ${type}`);
  return make(rest);
};
```

Adding a new field type means adding a key to `fieldFactories` — no editing the dispatch, no merge conflicts on a long `switch` block, and you can introspect the registry (`Object.keys(fieldFactories)`) if you need to render a “supported field types” UI.

This same shape — `componentMap[type]` — drives most dynamic form renderers in React and Vue, and most plugin systems that ship in JS libraries.

## Factory vs. class vs. DI container

These three are often conflated. They solve overlapping problems but they cost different amounts:

| Approach                                                       | Best at                                                                                                              | Cost                                                                         |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Class with `new`**                                           | Long-lived objects with identity, polymorphism via `instanceof`, hot-path methods that benefit from shared prototype | `this` semantics, binding, harder to compose, harder to mock                 |
| **Factory function**                                           | Configuration capture, environment switching, returning different shapes, easy mocking                               | One closure per instance (methods aren’t shared)                             |
| **DI container** (`tsyringe`, `InversifyJS`, NestJS providers) | Wiring graphs of services where ownership and lifecycle matter                                                       | Decorator/metadata machinery, runtime surprises, overkill outside large apps |

A useful heuristic: if you’d reach for `new SomeClass()` from more than a couple of places, you usually wanted a factory. If you’d reach for a factory from across module boundaries with cross-cutting lifecycle concerns (request-scoped, singleton, transient), you might want a container.

## Type-safe factories in TypeScript

The factory’s biggest payoff in TypeScript is **discriminated unions** plus **conditional return types**. The caller gets a precise type back based on the tag they passed:

```
type FieldSpec =
  | { type: "text"; placeholder?: string }
  | { type: "number"; min?: number; max?: number }
  | { type: "checkbox"; defaultChecked?: boolean };

type Field<T extends FieldSpec["type"]> = Extract<FieldSpec, { type: T }> & {
  id: string;
  validate(value: unknown): boolean;
};

function createField<T extends FieldSpec["type"]>(
  spec: Extract<FieldSpec, { type: T }>
): Field<T> {
  // implementation
  return { id: crypto.randomUUID(), validate: () => true, ...spec } as Field<T>;
}

const a = createField({ type: "number", min: 0 }); // typed with `min`/`max`
const b = createField({ type: "text" });           // typed with `placeholder`
```

The compiler narrows the return shape based on the input discriminator. This is the part of the pattern that classes still can’t replicate cleanly without overload soup.

## Curry as a lightweight factory

For one-method “objects,” a curried function _is_ the factory:

```
const withRetries = (n) => async (fn) => {
  for (let i = 0; i < n; i++) {
    try { return await fn(); }
    catch (e) { if (i === n - 1) throw e; }
  }
};

const retry3 = withRetries(3);
await retry3(() => fetch("/flaky"));
```

`withRetries(3)` is a factory call that returns a closure parameterized by `n`. When the “object” you’d be returning has exactly one method, skip the object literal.

## When _not_ to use a factory

- **You only ever construct it one way.** A factory whose only call site passes the same options is just a constructor with extra steps. Inline it.
- **You need `instanceof` checks.** Factories return plain objects; there’s no class to check against. If callers branch on type with `instanceof`, you want a class (or a discriminator field on the returned object).
- **You’re tempted to return a React/Vue component.** Component factories that close over render-time state usually misbehave with hooks and reactivity. Use composition or higher-order components instead.
- **The “factory” is just `new X()` wrapped.** That’s not abstraction, it’s noise.

## Trade-offs

| Benefit                                                | Cost                                                                                          |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| No `new`, no `this`, no binding bugs                   | No shared prototype — methods are reallocated per instance                                    |
| Easy to swap implementations behind a stable interface | No `instanceof` for runtime type checks                                                       |
| Trivially mockable (pass fakes through options)        | Lookup-table dispatch loses static reachability tools (find-all-references on a class method) |
| Composes cleanly with closures and partial application | Can hide complexity that would be more honest as a class                                      |

---

## References

- [JavaScript Factory Functions with ES6+](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1) - Eric Elliott
- [Discriminated unions in TypeScript](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) - TypeScript Handbook
- [tsyringe](https://github.com/microsoft/tsyringe) - lightweight DI container for TypeScript
