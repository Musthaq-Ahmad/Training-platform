# Team Conventions — In-House Trainee Training Platform

This is how we write code on this project. It is meant to be read once, top to bottom, and then used as a reference.

- The code in this document is the **starting code** for the shared pieces (API client, error classes, validation middleware, error handler). One person adds them on day 1. Everyone else imports them — don't write your own versions.
- If the TRD and the code disagree, fix the TRD first, then the code.
- Deployment, CI pipelines and production hardening are **out of scope for now**. They will be added later.

---

## The 10 rules (read these if you read nothing else)

1. Every change goes through a **pull request** and is **reviewed by one other person** before merging. No direct pushes to `main`.
2. The **backend decides**, the frontend only displays. Day locking, completion and time tracking are always checked on the server.
3. A trainee's id always comes from the **session** (`req.user.id`), never from the request body or URL.
4. Frontend: only files in `src/api/` talk to the backend, using the shared **axios client**. No `fetch` or `axios` in components.
5. Backend layers: **route → controller → service → repository**. Each layer has one job (§5.2).
6. Controllers wrap everything in **`try/catch` and call `next(error)`**. Services **throw our custom errors**. Only the error handler sends error responses.
7. Every route that takes input has a **Zod schema**, checked by the `validate` middleware before the controller runs.
8. Every request/response shape is a type in **`packages/types`** and is used by both frontend and backend.
9. TypeScript **strict mode** is on. No `any`.
10. **Conventional commit** messages (`feat: ...`, `fix: ...`).

---

## 1. Repo structure

```
/
├── frontend/            # React (Vite) + TypeScript
├── backend/             # Node.js + Express + Prisma
├── packages/
│   └── types/           # Shared types (@itp/types), used by frontend and backend
├── docs/
│   └── conventions.md   # this file
├── eslint.config.js     # one lint config for everything
├── .prettierrc.json     # one format config for everything
├── tsconfig.base.json   # shared TypeScript settings
├── package.json         # root: npm workspaces
└── package-lock.json    # ONE lockfile, at the root
```

`frontend`, `backend` and `packages/types` are npm workspaces. Each has its own `package.json`.

**Installing packages** — always from the repo root, with `-w`:

```bash
npm install zod -w backend          # add to backend
npm install axios -w frontend       # add to frontend
npm install -D prettier             # dev tool for everyone (root)
```

Never run `npm install` inside `frontend/` or `backend/` — it creates a second lockfile.

`npm run dev` from the root starts the backend and the frontend . Open **http://localhost:5173** — Vite forwards `/api` requests to the backend (§10.2).

---

## 2. TypeScript

Strict mode is on from the first commit. Every workspace's `tsconfig.json` extends this root file:

Rules:

| Rule                               | Instead                                                                          |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| No `any`                           | Use a real type, or `unknown` and check it                                       |
| No `// @ts-ignore`                 | Fix the type error, or ask in the PR                                             |
| Don't use TypeScript `enum`        | Use a union of strings: `type DayStatus = "LOCKED" \| "UNLOCKED" \| "COMPLETED"` |
| Dates in shared types are `string` | They arrive over JSON as ISO strings, e.g. `"2026-09-25T06:50:00.000Z"`          |

---

## 3. Naming

| Thing                                  | Style                               | Example                                                                                          |
| -------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| React components (folder + file)       | PascalCase                          | `components/TaskCard/TaskCard.tsx`                                                               |
| Pages                                  | PascalCase + `Page`                 | `pages/DashboardPage/DashboardPage.tsx`                                                          |
| Hooks                                  | `use` + camelCase                   | `hooks/useAutosave.ts`                                                                           |
| Other frontend files                   | camelCase                           | `api/days.ts`, `lib/formatTime.ts`                                                               |
| Backend module folders                 | `modules/<resource>/`               | `modules/days/`, `modules/journal/`                                                              |
| Backend files (inside a module folder) | `<resource>.<layer>.ts`             | `days.route.ts`, `days.controller.ts`, `days.service.ts`, `days.repository.ts`, `days.schema.ts` |
| Variables, functions                   | camelCase                           | `getDay`, `completedAt`                                                                          |
| Booleans                               | start with `is` / `has` / `can`     | `isCompleted`, `hasAccess`                                                                       |
| Constants                              | UPPER_SNAKE_CASE                    | `AUTOSAVE_DELAY_MS`                                                                              |
| Types                                  | PascalCase                          | `DayResponse`, `SaveCodeRequest`                                                                 |
| Error classes                          | PascalCase + `Error`                | `DayLockedError`                                                                                 |
| API URLs                               | lowercase, plural, kebab-case       | `/api/typing-test/results`                                                                       |
| JSON fields                            | camelCase                           | `curriculumDayId`                                                                                |
| Database tables / columns              | snake_case (from the TRD)           | `day_unlock`, `curriculum_day_id`                                                                |
| Prisma models / fields                 | PascalCase models, camelCase fields | `model DayUnlock { curriculumDayId ... }`                                                        |
| Branches                               | `type/short-description`            | `feat/day-unlock`, `fix/paste-block`                                                             |

---

## 4. Shared types — `packages/types`

### 4.1 What it is

One package that holds the **shape of every request and response** between the frontend and the backend. Both sides import from it, so if the backend changes a response, the frontend shows a type error straight away instead of breaking at runtime.

```ts
import type { DayResponse } from '@itp/types';
```

### 4.2 What goes in, what doesn't

| ✅ Put in `packages/types`                                  | ❌ Don't put here                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------------ |
| Request body types (`SaveCodeRequest`)                      | Prisma models / database types                                     |
| Response types (`DayResponse`, `DashboardResponse`)         | Zod schemas (they live in the backend)                             |
| Small shapes used inside them (`TaskFile`, `ChecklistItem`) | React props or UI state                                            |
| Status / type unions (`DayStatus`, `FlagEventType`)         | Functions or business logic                                        |
| The error response shape (`ApiErrorResponse`)               | Anything the trainee must never see (flag events, review priority) |

### 4.3 Setup

No build step — both apps read the `.ts` files directly.

```
packages/types/
├── package.json
└── src/
    ├── index.ts        # re-exports everything
    ├── common.ts       # error response shape, error codes
    ├── auth.ts
    ├── dashboard.ts
    ├── days.ts
    ├── tasks.ts
    ├── sql.ts
    ├── typingTest.ts
    ├── journal.ts
    └── activity.ts
```

One file per API resource (matches the backend route files).

### 4.4 The types for this project

```ts
// packages/types/src/common.ts

/** Codes the backend can send in an error response. The frontend checks these, never the message text. */
export type ErrorCode =
  | 'VALIDATION_FAILED'
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INTERNAL_ERROR'
  | 'DAY_LOCKED'
  | 'CHECKLIST_INCOMPLETE';

/** Every error response from the API looks exactly like this. */
export type ApiErrorResponse = {
  error: {
    code: ErrorCode;
    message: string; // safe to show to the trainee
    details?: unknown; // e.g. which fields failed validation
  };
};
```

```ts
// packages/types/src/auth.ts

/** GET /api/auth/me */
export type MeResponse = {
  id: string;
  email: string;
  name: string;
};
```

```ts
// packages/types/src/days.ts

export type DayStatus = 'LOCKED' | 'UNLOCKED' | 'COMPLETED';

export type DaySummary = {
  id: string;
  dayNumber: number;
  title: string;
  status: DayStatus;
};

export type TaskSummary = {
  id: string;
  title: string;
  sequenceOrder: number;
  isStretchGoal: boolean;
};

export type ChecklistItem = {
  id: string;
  label: string;
  isChecked: boolean;
  isStretch: boolean; // stretch items never block completion (FR-3)
};

/** GET /api/days/:dayId */
export type DayResponse = DaySummary & {
  lessonMarkdown: string;
  tasks: TaskSummary[];
  checklist: ChecklistItem[];
};

/** PATCH /api/days/:dayId/complete */
export type CompleteDayResponse = {
  nextDay: DaySummary | null; // null if this was the last day
};
```

```ts
// packages/types/src/tasks.ts

export type TaskFile = {
  path: string; // e.g. "src/App.tsx"
  content: string;
};

/** GET /api/tasks/:taskId */
export type TaskResponse = {
  id: string;
  title: string;
  instructionsMarkdown: string;
  isStretchGoal: boolean;
};

/** GET /api/tasks/:taskId/code */
export type TaskCodeResponse = {
  files: TaskFile[];
  updatedAt: string | null; // null = never saved
};

/** PUT /api/tasks/:taskId/code */
export type SaveCodeRequest = {
  files: TaskFile[];
};
```

```ts
// packages/types/src/sql.ts

/** POST /api/sql/execute */
export type SqlExecuteRequest = {
  query: string;
};

/** A broken query is a normal result (ok: false), not an API error. */
export type SqlExecuteResponse =
  | { ok: true; columns: string[]; rows: Record<string, unknown>[] }
  | { ok: false; errorMessage: string };
```

```ts
// packages/types/src/typingTest.ts

/** POST /api/typing-test/results — the server sets the time */
export type SaveTypingResultRequest = {
  wpm: number;
  accuracy: number; // 0–100
};

/** GET /api/typing-test/summary */
export type TypingSummaryResponse = {
  latest: { wpm: number; accuracy: number; takenAt: string } | null;
  todayAverageWpm: number | null;
  trend: { date: string; averageWpm: number }[];
};
```

```ts
// packages/types/src/journal.ts

/** GET /api/journal/:dayId */
export type JournalResponse = {
  prompts: string[];
  responseText: string;
  isEditable: boolean; // only today's entry can be edited
};

/** PUT /api/journal/:dayId */
export type SaveJournalRequest = {
  responseText: string;
};
```

```ts
// packages/types/src/activity.ts

export type FlagEventType = 'FULLSCREEN_EXIT' | 'TAB_SWITCH' | 'PASTE_BLOCKED';

/** POST /api/activity/:taskId/events — the server sets the timestamp */
export type LogFlagEventRequest = {
  type: FlagEventType;
  durationMs?: number; // how long the trainee was away, if known
};

/** POST /api/activity/time — sent every ~60 seconds */
export type ActivityTimeRequest = {
  activeSeconds: number;
  codingSeconds: number;
  readingSeconds: number;
};
```

There is deliberately **no** type for returning flag events — trainees never see them (FR-18).

```ts
// packages/types/src/dashboard.ts
import type { DaySummary } from './days';
import type { TypingSummaryResponse } from './typingTest';

/** GET /api/dashboard */
export type DashboardResponse = {
  currentDay: DaySummary | null;
  days: DaySummary[];
  today: { activeSeconds: number; codingSeconds: number; readingSeconds: number };
  total: { activeSeconds: number; codingSeconds: number; readingSeconds: number };
  typing: TypingSummaryResponse;
};
```

```ts
// packages/types/src/index.ts
export * from './common';
export * from './auth';
export * from './dashboard';
export * from './days';
export * from './tasks';
export * from './sql';
export * from './typingTest';
export * from './journal';
export * from './activity';
```

### 4.5 Rules

- If your PR changes what an endpoint sends or receives, update the type **in the same PR**.
- Put a one-line comment above each request/response type saying which endpoint uses it.

---

## 5. Backend

### 5.1 Folder structure

Backend code is organized **by module (resource), not by layer**. Everything about `days` — its route, controller, service, repository and Zod schema — lives together in `modules/days/`, instead of being spread across four top-level `routes/`, `controllers/`, `services/`, `repositories/` folders. To find everything about a resource, open one folder. To add a resource, add one folder.

```
backend/
├── package.json
├── tsconfig.json
├── .env.example
├── prisma/
│   ├── schema.prisma
│   ├── migrations/          # generated by Prisma, committed
│   └── seed.ts              # test data for local development
└── src/
    ├── server.ts            # starts the server (app.listen)
    ├── app.ts               # creates the Express app, adds middleware and routes
    ├── config/
    │   └── env.ts           # reads and checks environment variables
    ├── modules/              # one folder per API resource — see §5.1a
    │   ├── auth/
    │   │   ├── auth.route.ts
    │   │   ├── auth.controller.ts
    │   │   ├── passport.ts          # Google login/strategy setup — auth-specific, lives here
    │   │   └── trainees.repository.ts
    │   ├── dashboard/
    │   │   ├── dashboard.route.ts
    │   │   ├── dashboard.controller.ts
    │   │   ├── dashboard.service.ts
    │   │   └── dashboard.repository.ts
    │   ├── days/
    │   │   ├── days.route.ts
    │   │   ├── days.controller.ts
    │   │   ├── days.service.ts
    │   │   ├── days.repository.ts
    │   │   └── days.schema.ts
    │   ├── tasks/
    │   │   └── ...                  # same five-file pattern
    │   ├── sql/
    │   ├── typingTest/
    │   ├── journal/
    │   └── activity/
    ├── routes/
    │   └── index.ts         # composition root only — imports each module's router and mounts it under /api
    ├── middleware/
    │   ├── requireAuth.ts
    │   ├── validate.ts
    │   └── errorHandler.ts
    ├── errors/
    │   └── AppError.ts      # our custom error classes
    └── lib/
        └── prisma.ts        # the one Prisma client
```

### 5.2 What each layer does

A request travels down the layers and the answer travels back up:

```
Request → route → validate (Zod) → controller → service → repository → database
                                        ↑
                    any error → next(error) → errorHandler → error JSON
```

| Layer          | Its job                                                                                                                                      | It must NOT                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Route**      | Connect a URL + method to middleware and a controller                                                                                        | Contain any logic                                                 |
| **Controller** | `try { ... } catch (error) { next(error) }`. Get the trainee id and input from `req`, call the service, send the response with a status code | Contain business rules or database queries                        |
| **Service**    | Business rules (is the day unlocked? are all required items checked?). **Throws** a custom error when a rule fails. Returns plain data       | Use `req` / `res`. Call Prisma directly                           |
| **Repository** | Prisma queries. Returns the data, or `null` if not found                                                                                     | Throw custom errors or make decisions — it just fetches and saves |

**Where do errors come from?**

- Repository finds nothing → returns `null`.
- Service sees `null` or a broken rule → `throw new NotFoundError(...)` / `throw new DayLockedError()`.
- Controller catches it → `next(error)`.
- `errorHandler` turns it into the JSON response.

### 5.3 A full example — the `days` resource

Copy this pattern for every resource.

**Route**

```ts
// src/modules/days/days.route.ts
import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { dayIdParamsSchema } from './days.schema';
import { daysController } from './days.controller';

export const daysRouter = Router();

daysRouter.get('/:dayId', validate({ params: dayIdParamsSchema }), daysController.getDay);
daysRouter.patch(
  '/:dayId/complete',
  validate({ params: dayIdParamsSchema }),
  daysController.completeDay
);
```

`routes/index.ts` is the only file that reaches _into_ the module folders — it's the composition root, not a module itself, so it's kept separate rather than living inside any one module:

```ts
// src/routes/index.ts
import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { authRouter } from '../modules/auth/auth.route';
import { daysRouter } from '../modules/days/days.route';
import { tasksRouter } from '../modules/tasks/tasks.route';
// ...other module routers

export const apiRouter = Router();

apiRouter.use('/auth', authRouter); // login routes are public

// everything below needs a logged-in trainee
apiRouter.use('/days', requireAuth, daysRouter);
apiRouter.use('/tasks', requireAuth, tasksRouter);
// ...
```

Adding `requireAuth` when the router is mounted means every route in that file is protected automatically — you can't forget it.

**Controller**

```ts
// src/modules/days/days.controller.ts
import type { Request, Response, NextFunction } from 'express';
import type { DayResponse, CompleteDayResponse } from '@itp/types';
import { daysService } from './days.service';

export const daysController = {
  async getDay(req: Request, res: Response<DayResponse>, next: NextFunction) {
    try {
      const traineeId = req.user!.id; // requireAuth guarantees req.user exists
      const { dayId } = req.params;

      const day = await daysService.getDay(traineeId, dayId);

      res.status(200).json(day);
    } catch (error) {
      next(error);
    }
  },

  async completeDay(req: Request, res: Response<CompleteDayResponse>, next: NextFunction) {
    try {
      const traineeId = req.user!.id;
      const { dayId } = req.params;

      const result = await daysService.completeDay(traineeId, dayId);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
```

Every controller function has this same shape: `try` → get input → call service → `res.status().json()` → `catch` → `next(error)`.

**Service**

```ts
// src/modules/days/days.service.ts
import type { DayResponse, CompleteDayResponse } from '@itp/types';
import { daysRepository } from './days.repository';
import { NotFoundError, DayLockedError, ChecklistIncompleteError } from '../../errors/AppError';

export const daysService = {
  async getDay(traineeId: string, dayId: string): Promise<DayResponse> {
    const day = await daysRepository.findDayWithTasks(dayId);
    if (!day) throw new NotFoundError('Day not found');

    const unlock = await daysRepository.findUnlock(traineeId, dayId);
    if (!unlock || !unlock.unlocked) throw new DayLockedError(); // FR-1

    const checklist = await daysRepository.findChecklist(traineeId, dayId);

    return {
      id: day.id,
      dayNumber: day.dayNumber,
      title: day.title,
      status: unlock.isCompleted ? 'COMPLETED' : 'UNLOCKED',
      lessonMarkdown: day.lessonMarkdown,
      tasks: day.tasks,
      checklist,
    };
  },

  async completeDay(traineeId: string, dayId: string): Promise<CompleteDayResponse> {
    const unlock = await daysRepository.findUnlock(traineeId, dayId);
    if (!unlock || !unlock.unlocked) throw new DayLockedError();

    // FR-2 / FR-3: all required items checked; stretch items don't count
    const checklist = await daysRepository.findChecklist(traineeId, dayId);
    const hasUncheckedRequired = checklist.some((item) => !item.isStretch && !item.isChecked);
    if (hasUncheckedRequired) throw new ChecklistIncompleteError();

    await daysRepository.markCompleted(traineeId, dayId);

    const nextDay = await daysRepository.findNextDay(dayId);
    if (nextDay) await daysRepository.unlockDay(traineeId, nextDay.id);

    return {
      nextDay: nextDay
        ? { id: nextDay.id, dayNumber: nextDay.dayNumber, title: nextDay.title, status: 'UNLOCKED' }
        : null,
    };
  },
};
```

**Repository**

```ts
// src/modules/days/days.repository.ts
import { prisma } from '../../lib/prisma';

export const daysRepository = {
  findDayWithTasks(dayId: string) {
    return prisma.curriculumDay.findUnique({
      where: { id: dayId },
      include: {
        tasks: {
          orderBy: { sequenceOrder: 'asc' },
          select: { id: true, title: true, sequenceOrder: true, isStretchGoal: true },
        },
      },
    });
  },

  findUnlock(traineeId: string, dayId: string) {
    return prisma.dayUnlock.findUnique({
      where: { traineeId_curriculumDayId: { traineeId, curriculumDayId: dayId } },
    });
  },

  markCompleted(traineeId: string, dayId: string) {
    return prisma.dayUnlock.update({
      where: { traineeId_curriculumDayId: { traineeId, curriculumDayId: dayId } },
      data: { isCompleted: true },
    });
  },

  // findChecklist, findNextDay, unlockDay ... same style
};
```

Notice every query about a trainee's own data includes **`traineeId`** in the `where`. That is what stops one trainee from seeing another's data (FR-6).

### 5.4 Response status codes

| Situation                                      | Status                              |
| ---------------------------------------------- | ----------------------------------- |
| Got data                                       | `200` + the data                    |
| Created something (e.g. saved a typing result) | `201`                               |
| Saved / updated, nothing to send back          | `204` (use `res.status(204).end()`) |
| Error                                          | sent by `errorHandler` only (§6)    |

Send the data directly (`res.json(day)`), not wrapped in `{ data: day }`.

### 5.5 `app.ts` and `server.ts`

```ts
// src/app.ts
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { env } from './config/env';
import { configurePassport } from './auth/passport';
import { apiRouter } from './routes';
import { errorHandler } from './middleware/errorHandler';

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use(
    session({
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 }, // 12 hours
    })
  );

  configurePassport();
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', apiRouter);

  app.use(errorHandler); // must be the LAST app.use

  return app;
}
```

```ts
// src/server.ts
import { createApp } from './app';
import { env } from './config/env';

createApp().listen(env.PORT, () => {
  console.log(`API running on http://localhost:${env.PORT}`);
});
```

`app.ts` doesn't call `listen()` so tests can use the app without starting a server.

> Sessions are kept in memory for now, so everyone is logged out when the backend restarts. That's fine for development; we'll pick a proper session store when we look at deployment.

### 5.6 Environment config

```ts
// src/config/env.ts
import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(32),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_CALLBACK_URL: z.string().min(1),
  ALLOWED_EMAIL_DOMAIN: z.string().min(1),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
});

// Crashes on startup with a clear message if a variable is missing
export const env = envSchema.parse(process.env);
```

Use `env.SESSION_SECRET` everywhere — don't read `process.env` in other files.

---

## 6. Errors

### 6.1 Custom error classes

Instead of `throw new Error("something")`, services throw one of these. Each one knows its **status code** and **error code**, so the error handler knows what to send.

```ts
// src/errors/AppError.ts
import type { ErrorCode } from '@itp/types';

export class AppError extends Error {
  statusCode: number;
  code: ErrorCode;
  details?: unknown;

  constructor(statusCode: number, code: ErrorCode, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

// General errors
export class ValidationError extends AppError {
  constructor(details: unknown) {
    super(400, 'VALIDATION_FAILED', 'Some fields are invalid.', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Please log in.') {
    super(401, 'UNAUTHENTICATED', message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You don't have access to this.") {
    super(403, 'FORBIDDEN', message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found.') {
    super(404, 'NOT_FOUND', message);
  }
}

// Project-specific errors
export class DayLockedError extends AppError {
  constructor() {
    super(403, 'DAY_LOCKED', "This day isn't unlocked yet.");
  }
}

export class ChecklistIncompleteError extends AppError {
  constructor() {
    super(400, 'CHECKLIST_INCOMPLETE', 'Check all required items before submitting.');
  }
}
```

**Adding a new error:** add a class here and add its code to `ErrorCode` in `packages/types/src/common.ts`. Only make a new class if the frontend needs to react to it differently — otherwise reuse `NotFoundError` / `ForbiddenError` with a different message.

### 6.2 The error handler

This is the **only** place that sends error responses.

```ts
// src/middleware/errorHandler.ts
import type { Request, Response, NextFunction } from 'express';
import type { ApiErrorResponse } from '@itp/types';
import { AppError } from '../errors/AppError';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response<ApiErrorResponse>,
  _next: NextFunction
) {
  // One of our errors → send its status and code
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: { code: error.code, message: error.message, details: error.details },
    });
    return;
  }

  // Anything else is a bug → log it, but never send internal details to the trainee (TRD §10.2)
  console.error(error);
  res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'Something went wrong. Please try again.' },
  });
}
```

### 6.3 Rules

| Where         | Do                                                                           |
| ------------- | ---------------------------------------------------------------------------- |
| Repository    | Don't catch errors. Return `null` when not found                             |
| Service       | `throw new SomeError()` when a rule fails. Never `throw new Error("...")`    |
| Controller    | `try { ... } catch (error) { next(error); }` — nothing else in the `catch`   |
| Anywhere else | Never `res.status(4xx).json(...)` by hand — throw, and let the handler do it |

---

## 7. Validation with Zod

### 7.1 How it works

1. You write a Zod schema describing what the request should contain.
2. You put `validate(...)` in the route, before the controller.
3. If the input is wrong, `validate` sends a `400 VALIDATION_FAILED` error and the controller **never runs**.
4. If it's right, the controller can use `req.body` / `req.params` safely.

### 7.2 The middleware

```ts
// src/middleware/validate.ts
import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod';
import { ValidationError } from '../errors/AppError';

type Schemas = {
  body?: ZodType;
  params?: ZodType;
};

export function validate(schemas: Schemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) return next(new ValidationError(result.error.issues));
    }

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) return next(new ValidationError(result.error.issues));
      req.body = result.data; // cleaned data (unknown fields removed)
    }

    next();
  };
}
```

### 7.3 Writing schemas

Schemas live inside their resource's module folder now, alongside the route/controller/service/repository — not in a separate top-level `schemas/` folder.

```ts
// src/modules/days/days.schema.ts
import { z } from 'zod';

export const dayIdParamsSchema = z.object({
  dayId: z.string().uuid(),
});
```

```ts
// src/modules/tasks/tasks.schema.ts
import { z } from 'zod';

export const taskIdParamsSchema = z.object({
  taskId: z.string().uuid(),
});

export const saveCodeBodySchema = z.object({
  files: z
    .array(
      z.object({
        path: z.string().min(1).max(200),
        content: z.string().max(200_000),
      })
    )
    .min(1),
});
```

```ts
// src/modules/activity/activity.schema.ts
import { z } from 'zod';

export const logFlagEventBodySchema = z.object({
  type: z.enum(['FULLSCREEN_EXIT', 'TAB_SWITCH', 'PASTE_BLOCKED']),
  durationMs: z.number().int().min(0).optional(),
});
```

### 7.4 Using it — route and controller

```ts
// src/modules/tasks/tasks.route.ts
tasksRouter.put(
  '/:taskId/code',
  validate({ params: taskIdParamsSchema, body: saveCodeBodySchema }),
  tasksController.saveCode
);
```

```ts
// src/modules/tasks/tasks.controller.ts
import type { SaveCodeRequest } from "@itp/types";

async saveCode(req: Request, res: Response, next: NextFunction) {
    try {
        const traineeId = req.user!.id;
        const { taskId } = req.params;
        const body = req.body as SaveCodeRequest; // safe: validate() already checked it

        await tasksService.saveCode(traineeId, taskId, body.files);

        res.status(204).end();
    } catch (error) {
        next(error);
    }
},
```

### 7.5 Zod vs. shared types — how they relate

They are two separate things with two separate jobs:

|               | Shared type (`packages/types`)           | Zod schema (`backend/src/modules/<resource>/`) |
| ------------- | ---------------------------------------- | ---------------------------------------------- |
| What it is    | A TypeScript type                        | A runtime check                                |
| When it works | While you write code (editor + compiler) | While the server runs, on every request        |
| Used by       | Frontend and backend                     | Backend only                                   |
| Example       | `SaveCodeRequest`                        | `saveCodeBodySchema`                           |

When you change one, change the other in the same PR so they describe the same shape.

### 7.6 Rules

- Every route that takes a body or URL params gets a schema.
- IDs are checked with `z.string().uuid()`.
- Strings and arrays get a `.max(...)` so nobody can send huge data.
- Zod only checks **shape** ("is this a UUID?"). Rules that need the database ("is this day unlocked?") go in the **service**.
- Never accept `traineeId` in a body — it always comes from `req.user.id`.

---

## 8. Login and authorization

### 8.1 Login flow (TRD §4)

1. Frontend login button goes to `/api/auth/google`.
2. Google login → Google calls back `/api/auth/google/callback`.
3. Backend checks the email is on the company domain (FR-20).
4. Backend checks the trainee exists in our `trainee` table (no self-registration).
5. Session created → redirect to the dashboard. If a check fails → redirect to `/login?error=...`.

### 8.2 Passport setup

Passport's Google strategy setup and the trainee-lookup repository it needs both live inside `modules/auth/` too — they're auth-specific, not generic infrastructure, so they belong with the rest of the auth module rather than in a shared top-level folder:

```ts
// src/modules/auth/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from '../../config/env';
import { traineesRepository } from './trainees.repository';

export function configurePassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: env.GOOGLE_CALLBACK_URL,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value.toLowerCase();

          // FR-20: company domain only
          if (!email || !email.endsWith(`@${env.ALLOWED_EMAIL_DOMAIN}`)) {
            return done(null, false, { message: 'DOMAIN_NOT_ALLOWED' });
          }

          // TRD §4 step 4: must already exist in our database
          const trainee = await traineesRepository.findByEmail(email);
          if (!trainee) {
            return done(null, false, { message: 'NOT_REGISTERED' });
          }

          return done(null, { id: trainee.id, email: trainee.email, name: trainee.name });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Store only the id in the session
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id: string, done) => {
    try {
      const trainee = await traineesRepository.findById(id);
      done(null, trainee ? { id: trainee.id, email: trainee.email, name: trainee.name } : false);
    } catch (error) {
      done(error);
    }
  });
}
```

```ts
// src/types/express.d.ts — tells TypeScript what req.user contains
import type { MeResponse } from '@itp/types';

declare global {
  namespace Express {
    interface User extends MeResponse {}
  }
}

export {};
```

```ts
// src/modules/auth/auth.route.ts
import { Router } from 'express';
import passport from 'passport';
import { env } from '../../config/env';
import { requireAuth } from '../../middleware/requireAuth';
import { authController } from './auth.controller';

export const authRouter = Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', (req, res, next) => {
  passport.authenticate(
    'google',
    (error: unknown, user: Express.User | false, info?: { message?: string }) => {
      if (error) return next(error);
      if (!user)
        return res.redirect(`${env.FRONTEND_URL}/login?error=${info?.message ?? 'LOGIN_FAILED'}`);

      req.logIn(user, (loginError) => {
        if (loginError) return next(loginError);
        res.redirect(`${env.FRONTEND_URL}/dashboard`);
      });
    }
  )(req, res, next);
});

authRouter.get('/me', requireAuth, authController.me);
authRouter.post('/logout', requireAuth, authController.logout);
```

### 8.3 `requireAuth`

```ts
// src/middleware/requireAuth.ts
import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/AppError';

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) return next(new UnauthorizedError());
  next();
}
```

### 8.4 Authorization rules (FR-6)

- The trainee id **only** comes from `req.user.id`.
- Every repository function for trainee data takes `traineeId` and uses it in the `where`.
- Locked days, completed days (read-only) and past journal entries (read-only) are checked in the **service**, not just hidden in the UI.
- The frontend route guard is for user experience only; the backend is what actually protects data.

---

## 9. Database (Prisma)

### 9.1 Setup

The Prisma client is created once, in one file:

```ts
// src/lib/prisma.ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { env } from '../config/env';

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });
```

Only **repositories** import `prisma`.

```prisma
// prisma/schema.prisma (top of file)
generator client {
    provider = "prisma-client"
    output   = "../src/generated/prisma"
}

datasource db {
    provider = "postgresql"
}
```

```ts
// prisma.config.ts (backend root)
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations', seed: 'tsx prisma/seed.ts' },
  datasource: { url: env('DATABASE_URL') },
});
```

> We're on Prisma 7: the database URL lives in `prisma.config.ts`, not in `schema.prisma`, and the client needs the `@prisma/adapter-pg` package. Add `src/generated/` to `.gitignore`.

### 9.2 Writing models

Model and field names follow the **TRD tables** (§8 of the TRD). Use camelCase in Prisma and map to the snake_case column names:

```prisma
model DayUnlock {
    id              String   @id @default(uuid()) @db.Uuid
    traineeId       String   @map("trainee_id") @db.Uuid
    curriculumDayId String   @map("curriculum_day_id") @db.Uuid
    unlocked        Boolean  @default(false)
    isCompleted     Boolean  @default(false) @map("is_completed")
    createdAt       DateTime @default(now()) @map("created_at")
    updatedAt       DateTime @updatedAt @map("updated_at")

    trainee       Trainee       @relation(fields: [traineeId], references: [id])
    curriculumDay CurriculumDay @relation(fields: [curriculumDayId], references: [id])

    @@unique([traineeId, curriculumDayId]) // one row per trainee per day
    @@map("day_unlock")
}
```

- Every table has `id` (UUID) and `createdAt`. Tables that change also get `updatedAt`.
- `@@map("table_name")` on every model, `@map("column_name")` on multi-word fields.
- If a rule says "one per trainee per X", add a `@@unique` for it.

### 9.3 Migrations

```bash
# after changing schema.prisma
npx prisma migrate dev --name add_checklist_items   # run inside backend/, or use -w backend scripts
```

- Commit the generated `prisma/migrations/` folder in the same PR as the schema change.
- Name migrations in snake_case describing the change: `add_checklist_items`.
- **Never edit a migration that's already merged** — make a new one.
- If two PRs both add migrations, the second one to merge pulls `main` and re-runs `migrate dev`.
- Each developer uses their **own Neon branch** for local development, so one person's migration can't break anyone else's database.

### 9.4 Seed data

`prisma/seed.ts` creates a course, a few days with tasks and checklist items, and two test trainees on the company domain. Run it with `npx prisma db seed`. It should be safe to run more than once (use `upsert`).

---

## 10. Frontend

### 10.1 Folder structure

```
frontend/src/
├── main.tsx              # app entry
├── App.tsx               # providers + router
├── router.tsx            # all routes
├── index.css
├── App.css
├── api/                  # the ONLY place that calls the backend
│   ├── client.ts         # the shared axios instance
│   ├── errors.ts         # ApiError + getErrorMessage
│   ├── auth.ts
│   ├── dashboard.ts
│   ├── days.ts
│   ├── tasks.ts
│   └── ...
├── pages/                # one folder per route
│   ├── LoginPage/
│   ├── DashboardPage/
│   ├── DayPage/
│   └── TaskPage/
├── components/           # reusable components (used by 2+ pages)
├── context/
│   └── AuthContext.tsx   # who is logged in
├── hooks/                # useAutosave, useFlagTracking, ...
├── lib/                  # small helpers (formatTime, ...)
```

### 10.2 Vite proxy

In development, Vite forwards every `/api` request to the backend, so the frontend and backend look like one site (cookies just work).

```ts
// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
```

### 10.3 Why axios, and the shared client

**Yes — use axios, through one shared client.** With plain `fetch`, every call would need to repeat the same things: add `credentials`, check `res.ok`, parse JSON, handle errors. With one axios client, that's written **once**:

|                                 | `fetch`                          | shared axios client |
| ------------------------------- | -------------------------------- | ------------------- |
| Throws on 4xx/5xx               | You check `res.ok` every time    | Automatic           |
| JSON                            | You call `res.json()` every time | Automatic           |
| Cookies / base URL              | Repeated in every call           | Set once            |
| Error handling                  | Repeated in every call           | Once, in the client |
| "Session expired → go to login" | Repeated                         | Once, in the client |

Install: `npm install axios -w frontend`

```ts
// src/api/errors.ts
import type { ApiErrorResponse, ErrorCode } from '@itp/types';

/** Every failed API call throws this. */
export class ApiError extends Error {
  status: number;
  code: ErrorCode | 'NETWORK_ERROR';

  constructor(status: number, code: ErrorCode | 'NETWORK_ERROR', message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/** Turns whatever axios threw into an ApiError. */
export function toApiError(error: unknown): ApiError {
  const axiosError = error as { response?: { status: number; data?: ApiErrorResponse } };

  // The server couldn't be reached at all
  if (!axiosError.response) {
    return new ApiError(0, 'NETWORK_ERROR', "Can't reach the server. Check your connection.");
  }

  const { status, data } = axiosError.response;
  const code = data?.error?.code ?? 'INTERNAL_ERROR';
  const message = data?.error?.message ?? 'Something went wrong. Please try again.';
  return new ApiError(status, code, message);
}
```

```ts
// src/api/client.ts
import axios from 'axios';
import { toApiError } from './errors';

export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true, // send the login cookie
  timeout: 15000,
});

// Runs on every failed request
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = toApiError(error);

    // Session expired → back to the login page
    if (apiError.status === 401 && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }

    return Promise.reject(apiError);
  }
);
```

### 10.4 API files — one per resource

Each backend resource gets one file with one function per endpoint. Every function returns the **data** with its shared type.

```ts
// src/api/days.ts
import type { DayResponse, CompleteDayResponse } from '@itp/types';
import { apiClient } from './client';

export async function getDay(dayId: string): Promise<DayResponse> {
  const res = await apiClient.get<DayResponse>(`/days/${dayId}`);
  return res.data;
}

export async function completeDay(dayId: string): Promise<CompleteDayResponse> {
  const res = await apiClient.patch<CompleteDayResponse>(`/days/${dayId}/complete`);
  return res.data;
}
```

```ts
// src/api/tasks.ts
import type { TaskResponse, TaskCodeResponse, SaveCodeRequest } from '@itp/types';
import { apiClient } from './client';

export async function getTask(taskId: string): Promise<TaskResponse> {
  const res = await apiClient.get<TaskResponse>(`/tasks/${taskId}`);
  return res.data;
}

export async function getTaskCode(taskId: string): Promise<TaskCodeResponse> {
  const res = await apiClient.get<TaskCodeResponse>(`/tasks/${taskId}/code`);
  return res.data;
}

export async function saveTaskCode(taskId: string, body: SaveCodeRequest): Promise<void> {
  await apiClient.put(`/tasks/${taskId}/code`, body);
}
```

```ts
// src/api/auth.ts
import type { MeResponse } from '@itp/types';
import { apiClient } from './client';

export async function getMe(): Promise<MeResponse> {
  const res = await apiClient.get<MeResponse>('/auth/me');
  return res.data;
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}
```

**Rule:** components and hooks import these functions. They never import `axios` or call `fetch` themselves.

### 10.5 Using API functions in a page

Same `useEffect` + `useState` you already know — you just call an `api/` function:

```tsx
// src/pages/DayPage/DayPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { DayResponse } from '@itp/types';
import { getDay } from '../../api/days';
import { ApiError } from '../../api/errors';

export default function DayPage() {
  const { dayId } = useParams();
  const [day, setDay] = useState<DayResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!dayId) return;
    setIsLoading(true);

    getDay(dayId)
      .then(setDay)
      .catch((err: ApiError) => setError(err))
      .finally(() => setIsLoading(false));
  }, [dayId]);

  if (isLoading) return <p>Loading...</p>;
  if (error?.code === 'DAY_LOCKED')
    return <p>This day is locked. Finish the previous day first.</p>;
  if (error) return <p>{error.message}</p>;
  if (!day) return null;

  return <h1>{day.title}</h1>;
}
```

Every page that loads data shows three states: **loading**, **error**, **data**. Check `error.code`, not the message text.

**Saving data** (buttons): call the api function in the click handler, and disable the button while it's saving so it can't be clicked twice.

```tsx
const [isSaving, setIsSaving] = useState(false);

async function handleComplete() {
  setIsSaving(true);
  try {
    const result = await completeDay(dayId);
    // navigate to next day, show message, etc.
  } catch (err) {
    setError(err as ApiError);
  } finally {
    setIsSaving(false);
  }
}

<button onClick={handleComplete} disabled={isSaving}>
  Complete day
</button>;
```

### 10.6 Logged-in user

```tsx
// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { MeResponse } from '@itp/types';
import { getMe } from '../api/auth';

type AuthState = { user: MeResponse | null; isLoading: boolean };

const AuthContext = createContext<AuthState>({ user: null, isLoading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, isLoading: true });

  useEffect(() => {
    getMe()
      .then((user) => setState({ user, isLoading: false }))
      .catch(() => setState({ user: null, isLoading: false }));
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
```

```tsx
// src/components/ProtectedRoute/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
```

The login button is a plain link, because Google login needs a full page redirect:

```tsx
<a href="/api/auth/google">Sign in with Google</a>
```

### 10.7 Components

Every component gets its own folder:

```
components/TaskCard/
├── TaskCard.tsx
├── TaskCard.module.css
└── index.ts            // export { default } from "./TaskCard";
```

```tsx
// components/TaskCard/TaskCard.tsx
import type { TaskSummary } from '@itp/types';
import styles from './TaskCard.module.css';

type TaskCardProps = {
  task: TaskSummary;
  onOpen: (taskId: string) => void;
};

export default function TaskCard({ task, onOpen }: TaskCardProps) {
  return (
    <button className={styles.card} onClick={() => onOpen(task.id)}>
      {task.title}
      {task.isStretchGoal && <span className={styles.badge}>Stretch</span>}
    </button>
  );
}
```

- Import from the folder: `import TaskCard from "../../components/TaskCard";`
- Props type is named `<Component>Props`.
- **Pages load data; components just display it** (they get data through props).
- A component used by only one page can live in `pages/ThatPage/components/`. Move it to `components/` when a second page needs it.
- Styles go in `ComponentName.module.css` (CSS Modules). Class names in camelCase.
- If a component gets longer than ~200 lines, split it.

### 10.8 Workspace behaviour (paste block, flags, autosave)

Put these in hooks so every page uses the same code:

| Hook                         | What it does                                                                                                                                      | Requirement  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `usePasteBlock`              | Blocks paste in the Monaco editor (keyboard, right-click menu, drag-and-drop)                                                                     | FR-10        |
| `useFlagTracking(taskId)`    | Listens for tab switch (`visibilitychange`) and fullscreen exit (`fullscreenchange`), calls `logFlagEvent`, shows a warning. No logout or penalty | FR-9, FR-11  |
| `useAutosave(taskId, files)` | Saves the code a couple of seconds after the trainee stops typing (must save within 10 s)                                                         | FR-5         |
| `useActivityTimer`           | Counts active / coding / reading seconds and sends them every ~60 s                                                                               | FR-13, FR-14 |

---

## 11. Git and pull requests

### 11.1 Branches

- `main` must always work.
- Nobody pushes directly to `main`. Every change — even a one-line fix — goes through a pull request.
- Make a new branch from the latest `main` for each piece of work: `feat/day-unlock`, `fix/paste-block`, `chore/eslint-setup`.
- Keep branches short-lived (a day or two). Pull the latest `main` into your branch at least once a day.

### 11.2 Commit messages

```
feat: add day unlock logic
fix: block paste in Monaco editor
refactor: move flag logging into a service
test: add tests for locked day
docs: update API table in TRD
chore: set up prettier
```

Types: `feat` (new feature), `fix` (bug fix), `refactor`, `test`, `docs`, `chore` (setup/tools). Be specific — "fix: bug" tells nobody anything.

### 11.3 Pull requests

- **Every PR is reviewed and approved by at least one other person** before it is merged. You never merge your own PR without an approval.
- Keep PRs small — one feature or fix per PR.
- Review each other's PRs quickly (same day). A waiting PR blocks the whole team.
- Use **"Squash and merge"**, then delete the branch.

**PR description:**

```md
## What

Which feature / fix this is (mention the FR number).

## How to test

Steps to try it locally.

## Checklist

- [ ] Shared types updated if a request/response changed
- [ ] Zod schema added for new input
- [ ] Trainee queries filter by traineeId
- [ ] Tests added for important logic
- [ ] Ran `npm run lint` and the app locally
```

**Reviewer checks:**

1. Can one trainee see or change another trainee's data?
2. Does the backend trust something from the frontend that it should check itself?
3. Is business logic in the service (not the controller or a component)?
4. Do the shared types match what the backend actually sends?

---

## 14. Testing

Tool: **Vitest** for both apps. Backend route tests also use **supertest**.

### 14.1 Two kinds of tests

- **Unit tests** — a single function with no database or server. Example: "does completion ignore stretch items?"
- **Integration tests** — call a real API route against a test database. Example: "does `GET /api/days/:id` return 403 for a locked day?" This is the only way to prove the backend really blocks it (FR-1).

### 14.2 Where they go

Next to the file they test:

```
backend/src/modules/days/days.service.test.ts           # unit
backend/src/modules/days/days.route.integration.test.ts # integration
frontend/src/components/TaskCard/TaskCard.test.tsx
```

### 14.3 Must have tests

- Day locking and completion (FR-1, FR-2, FR-3) — locked day gives 403; can't complete with unchecked required items; completing unlocks the next day; stretch items don't block.
- Login checks (FR-20) — wrong domain rejected; unregistered email rejected.
- Trainee isolation (FR-6) — trainee A can't read or change trainee B's data.
- Flag logging (FR-9, FR-12) — events are saved with a timestamp.

Nice to have: tests for simple display components.

### 14.4 Example

```ts
// backend/src/modules/days/days.route.integration.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

const app = createApp();

describe('GET /api/days/:dayId', () => {
  it('returns 401 when not logged in', async () => {
    const res = await request(app).get('/api/days/00000000-0000-0000-0000-000000000000');

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHENTICATED');
  });
});
```

Check the **status** and **`error.code`** in error tests, not the message text.

---

## 15. Checklist: adding a new feature

Example: **save a journal entry** (`PUT /api/journal/:dayId`).

1. **TRD** — check the endpoint in the TRD API table. If it's wrong, fix the TRD.
2. **Shared type** — add `SaveJournalRequest` / `JournalResponse` in `packages/types/src/journal.ts`.
3. **Database** — change `schema.prisma` if needed, run `prisma migrate dev`.
4. **Zod schema** — `src/modules/journal/journal.schema.ts`.
5. **Repository** — `src/modules/journal/journal.repository.ts`: the Prisma query, with `traineeId` in the `where`.
6. **Service** — `src/modules/journal/journal.service.ts`: the rules (day unlocked? is it today's entry?). Throw errors if not.
7. **Controller** — `src/modules/journal/journal.controller.ts`: `try` → call service → `res.status(204).end()` → `catch` → `next(error)`.
8. **Route** — `src/modules/journal/journal.route.ts`: `journalRouter.put("/:dayId", validate({...}), journalController.save)`.
9. **Tests** — for the important rules.
10. **Frontend API function** — `src/api/journal.ts`: `saveJournal(dayId, body)`.
11. **Frontend page** — call it, show saving / saved / error.
12. **PR** — `feat: save daily journal entry`, get it reviewed, squash and merge.

---
