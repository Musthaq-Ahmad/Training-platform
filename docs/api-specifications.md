# Vinkup API reference

REST/JSON API of Vinkup, the in-house trainee training platform (Express 5 backend in `backend/`). Written from the code on `main` as of 4 October 2026; when the code and this document disagree, the code wins.

## Base URLs

| Environment | Base URL                         | How it reaches the backend                                                                                                                                          |
| ----------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Production  | `https://vinkup.netlify.app/api` | Netlify rewrite `/api/*  https://vinkup-backend.onrender.com/api/:splat  200` (`frontend/public/_redirects:1`) proxies to the Render backend.                       |
| Local       | `http://localhost:5173/api`      | Vite dev server proxy `'/api': 'http://localhost:3000'` (`frontend/vite.config.ts`). Backend listens on `env.PORT`, default `3000` (`backend/src/config/env.ts:5`). |

All paths below include the `/api` prefix. The frontend axios client uses the relative base URL `/api` with `withCredentials: true` and a 15 s timeout (`frontend/src/api/client.ts`). Only the Google login redirect uses `VITE_API_URL` (`${VITE_API_URL}/api/auth/google`; `VITE_API_URL` is `""` locally and `https://vinkup.netlify.app` in production).

---

## Conventions

### Authentication

- **Mechanism:** a JWT in an HTTP cookie. There is no `Authorization` header support.
- **Cookie name:** `auth_token` (`AUTH_COOKIE_NAME`, `auth.constants.ts:3`).
- **How it is set:** only by `GET /api/auth/google/callback` after a successful Google OAuth login. The JWT payload is `{ id, name, email }` of the trainee, signed with `JWT_SECRET`, `expiresIn: JWT_EXPIRES_IN` (env, default `'1h'`).
- **requireAuth** (`middleware/authMiddleware.ts`): reads `req.cookies.auth_token`.
  - Missing cookie: `401 UNAUTHENTICATED`, message `"Not authenticated"`.
  - Invalid/expired JWT: `401 UNAUTHENTICATED`, message `"Invalid or expired token"`.
  - On success `req.user = { id, email, name }` from the token claims (no database lookup).
- **Which routes require it** (`app.ts`):
  - Public: `GET /api/health`, `GET /api/auth/google`, `GET /api/auth/google/callback`.
  - `POST /api/auth/logout`, `GET /api/auth/me`: `requireAuth` on the route (`auth.routes.ts:53-54`).
  - `POST /api/activity/:taskId/events`: `requireAuth` on the route (`flag.routes.ts:11`); the router is mounted without it (`app.ts:38`).
  - Everything under `/api/profile`, `/api/activity` (time), `/api/dashboard`, `/api/courses`, `/api/tasks`, `/api/days`, `/api/typing-test`: `requireAuth` at the mount (`app.ts:40-46`).
  - Because `requireAuth` runs at the mount, an **unknown path under those prefixes returns 401 (not 404) when the caller is unauthenticated**.
- **Identity:** the trainee is always taken from the token (`req.user.id`), never from the body or URL.
- **CORS:** `origin: env.FRONTEND_URL` (default `http://localhost:5173`), `credentials: true`.

### Request/response format

- JSON request bodies parsed by `express.json({ limit: '5mb' })` (`app.ts:29`). Bodies over 5 MB, and malformed JSON, are rejected with `400 VALIDATION_FAILED` (see errors).
- Responses are JSON except `204 No Content` responses (empty body).
- Field names in requests and responses are camelCase (the database is snake_case; services map it).
- Timestamps (`takenAt`, `submittedAt`, `updatedAt`) are ISO 8601 strings in UTC from `Date.toISOString()` (e.g. `"2026-10-04T05:12:33.120Z"`).

### Dates and time zone

- A platform "calendar day" is an **Asia/Kolkata (IST, UTC+05:30)** day (`utils/istDate.ts`).
- Date-only fields are `'YYYY-MM-DD'` strings of the IST calendar day (`activity_log.date` is a `@db.Date` column stored as midnight UTC of that date).
- Used by: `POST/GET /api/activity/time` (`date`), dashboard `today` and typing trend, profile `dailyActivity`.

### Error response shape

Every error is sent by `errorHandler` (`middleware/errorHandler.ts`) with this exact shape (`ApiErrorResponse`, `packages/types/src/common.ts`):

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Some fields are invalid.",
    "details": []
  }
}
```

- `code`: one of the `ErrorCode` values below.
- `message`: safe to show to the trainee.
- `details`: present only when the error carries it (validation issues, checklist counts). Absent otherwise.
- Unknown (non-`AppError`) errors are logged server-side and returned as `500 INTERNAL_ERROR` with message `"Something went wrong. Please try again."` and no `details`.
- Unmatched routes: `404 NOT_FOUND`, message `"Route <METHOD> <originalUrl> not found."` (`notFoundHandler.ts`).

### Error codes

| Code                   | HTTP           | Raised by                                                                 | Meaning / default message                                                                                                                                                                                                                                                                                                   |
| ---------------------- | -------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VALIDATION_FAILED`    | 400            | `ValidationError` (validate(), activity `days` query); body-parser errors | `"Some fields are invalid."`, `details` = Zod `issues` array. Body > 5 MB: `"The request is too large (5 MB max)."`. Malformed JSON: `"The request body is not valid JSON."`. Other client-side body-parser rejections (charset/encoding/aborted): `"The request could not be read."` (no `details` for body-parser cases). |
| `UNAUTHENTICATED`      | 401            | `UnauthorizedError`                                                       | Missing/invalid/expired cookie. Default message `"Please log in."`; requireAuth uses `"Not authenticated"` / `"Invalid or expired token"`. Also used internally in OAuth when Google returns no email (surfaces as a login redirect, not JSON).                                                                             |
| `FORBIDDEN`            | 403            | `ForbiddenError`                                                          | Defined (`"You don't have access to this."`) but not thrown by any route.                                                                                                                                                                                                                                                   |
| `NOT_FOUND`            | 404            | `NotFoundError`                                                           | Unknown route, course, day, task, trainee or empty curriculum. Message varies (see each endpoint).                                                                                                                                                                                                                          |
| `DAY_LOCKED`           | 403            | `DayLockedError`                                                          | `"This day isn't unlocked yet."`                                                                                                                                                                                                                                                                                            |
| `CHECKLIST_INCOMPLETE` | 403            | `ChecklistIncompleteError`                                                | `"Complete all required tasks before submitting the day."`, `details: { completedTasks: number, requiredTasks: number }`.                                                                                                                                                                                                   |
| `DOMAIN_NOT_PERMITTED` | 403 (internal) | `DomainNotPermittedError`                                                 | `"This Google account is not on an approved domain."` Only ever delivered as `?error=DOMAIN_NOT_PERMITTED` on the login redirect.                                                                                                                                                                                           |
| `NOT_PROVISIONED`      | 403 (internal) | `NotProvisionedError`                                                     | `"Your account has not been provisioned yet. Contact your administrator."` Only delivered as `?error=NOT_PROVISIONED` on the login redirect.                                                                                                                                                                                |
| `INTERNAL_ERROR`       | 500            | errorHandler fallback                                                     | Any unexpected error.                                                                                                                                                                                                                                                                                                       |

The frontend additionally uses a client-only `NETWORK_ERROR` (status 0) when the server is unreachable (`frontend/src/api/errors.ts`); the backend never sends it.

### Validation behaviour (`middleware/validate.ts`)

`validate({ params?, body? })` runs before the controller:

1. If `params` schema given: `safeParse(req.params)`; on failure `next(new ValidationError(issues))` → `400 VALIDATION_FAILED`. **`req.params` is not replaced** (controllers read the original strings).
2. If `body` schema given: `safeParse(req.body)`; on failure → 400. On success **`req.body` is replaced with the parsed data**: unknown keys are stripped (Zod objects strip by default), `.trim()` and `.transform()` results are applied (e.g. journal text is trimmed; activity `date` becomes a `Date`).
3. Params are checked before body, so a bad param wins.
4. `validate()` does not support query strings; the only query (`GET /api/activity/time?days=`) is parsed in the controller with the same 400 result.

`details` is the Zod v4 `issues` array, e.g.:

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Some fields are invalid.",
    "details": [
      {
        "origin": "string",
        "code": "too_small",
        "minimum": 1,
        "inclusive": true,
        "path": ["responseText"],
        "message": "Too small: expected string to have >=1 characters"
      }
    ]
  }
}
```

(Issue fields/messages are generated by Zod; custom messages are listed per endpoint.)

### Day locking (shared rule)

Days are ordered across the whole curriculum by course `sort_order`, then `day_number` (courses seeded: `html`, `css`, `js`, `ts`, `node`, `postgresql`, `prisma`, `react`). There is no unlock table. Two implementations exist (see Notes):

- **day-access** (`day-module/day-access.services.ts`), used by `GET /days/:dayId/status`, `PATCH /days/:dayId/complete|status`, `GET|PUT /days/:dayId/journal`, `GET /days/:dayId/tasks`: a day is unlocked if it is completed, or it is the first day of the curriculum, or the immediately preceding day is completed. Unknown day → 404 first, then locked → 403.
- **progress** (`progress-module/progress.service.ts`), used by all `/tasks/*` routes, flag events, dashboard, course days and profile: completed days are `COMPLETED`; the **first** non-completed day in order is `UNLOCKED`; every other day is `LOCKED`. Only `LOCKED` is rejected (403).

In normal use (days completed in order) both give the same result.

---

## Endpoint summary

| Method | Path                           | Auth | Purpose                                                           |
| ------ | ------------------------------ | ---- | ----------------------------------------------------------------- |
| GET    | `/api/health`                  | No   | Liveness check                                                    |
| GET    | `/api/auth/google`             | No   | Start Google OAuth (redirect)                                     |
| GET    | `/api/auth/google/callback`    | No   | OAuth callback; sets `auth_token` cookie and redirects            |
| POST   | `/api/auth/logout`             | Yes  | Clear the auth cookie                                             |
| GET    | `/api/auth/me`                 | Yes  | Current trainee from the token                                    |
| GET    | `/api/dashboard`               | Yes  | Dashboard: next day, progress counts, time totals, typing summary |
| GET    | `/api/courses/:courseId/days`  | Yes  | Days of one course with this trainee's status                     |
| GET    | `/api/days/:dayId`             | Yes  | Day lesson content (readable even when locked)                    |
| GET    | `/api/days/:dayId/status`      | Yes  | Lock/completion state of a day                                    |
| PATCH  | `/api/days/:dayId/complete`    | Yes  | Complete a day; returns status and next day id                    |
| PATCH  | `/api/days/:dayId/status`      | Yes  | Legacy alias of complete; returns status only                     |
| GET    | `/api/days/:dayId/journal`     | Yes  | Trainee's journal response for a day                              |
| PUT    | `/api/days/:dayId/journal`     | Yes  | Create/replace journal response                                   |
| GET    | `/api/days/:dayId/tasks`       | Yes  | Task list of a day with per-trainee status                        |
| GET    | `/api/tasks/:taskId`           | Yes  | Task details                                                      |
| GET    | `/api/tasks/:taskId/code`      | Yes  | Saved files, or starter files                                     |
| PUT    | `/api/tasks/:taskId/code`      | Yes  | Replace the saved file set                                        |
| POST   | `/api/tasks/:taskId/submit`    | Yes  | Mark task completed (repeatable)                                  |
| POST   | `/api/activity/time`           | Yes  | Add active/coding seconds to a day                                |
| GET    | `/api/activity/time`           | Yes  | Per-day activity for the last N days                              |
| POST   | `/api/activity/:taskId/events` | Yes  | Log an integrity flag event for a task                            |
| POST   | `/api/typing-test/results`     | Yes  | Save a typing test result                                         |
| GET    | `/api/typing-test/results`     | Yes  | All typing results, newest first                                  |
| GET    | `/api/profile`                 | Yes  | Profile page data                                                 |
| GET    | `/api/journal`                 | Yes  | Accessible journal entries, newest curriculum day first           |
| PUT    | `/api/journal/:dayId`          | Yes  | Create/replace journal response for the journal page              |

26 endpoints (including the legacy `PATCH /api/days/:dayId/status`).

---

## Health

### GET /api/health

- **Auth:** none.
- **Response 200:**

```json
{ "status": "ok" }
```

---

## Auth

Google OAuth 2.0 via `passport-google-oauth20`, `session: false`, scope `['profile', 'email']`. Callback URL is `env.GOOGLE_CALLBACK_URL`. In production it must be `https://vinkup.netlify.app/api/auth/google/callback` (through the Netlify proxy), so the cookie is set for the site's own domain and sent with later `/api` calls; the same URL must be registered in the Google Cloud OAuth client.

### GET /api/auth/google

- **Auth:** none.
- **Behaviour:** 302 redirect to Google's consent screen. The frontend navigates the window here (`startGoogleLogin()`), it is not an XHR call.

### GET /api/auth/google/callback

- **Auth:** none. Called by Google with `?code=...`.
- **Verification** (`auth.service.ts`, `passport.ts`):
  1. Email = first Google profile email. None → `UNAUTHENTICATED` (`"Google did not return an email address."`).
  2. Email must end with `@${ALLOWED_EMAIL_DOMAIN}` (case-sensitive string match) → else `DOMAIN_NOT_PERMITTED`.
  3. A `trainee` row with exactly that email must exist (no self-registration) → else `NOT_PROVISIONED`.
- **Success:** sets cookie `auth_token` (options above, `maxAge` 7 days) and **302 redirects to `${FRONTEND_URL}`** (no path).
- **Rejected login:** **302 redirect to `${FRONTEND_URL}/login?error=<CODE>&email=<email>`** where `<CODE>` is the `AppError` code (`DOMAIN_NOT_PERMITTED`, `NOT_PROVISIONED`, or `UNAUTHENTICATED`), or `LOGIN_FAILED` when passport fails without a message; `email` is the Google email or `""`. If the user cancels on Google's screen, passport fails with Google's `error_description` as the message (check: the value placed in `error` is then not one of the codes above).
- **Unexpected errors** (e.g. database down, token exchange failure): passed to `errorHandler` → `500 INTERNAL_ERROR` JSON, not a redirect (check for token-exchange failures).

### POST /api/auth/logout

- **Auth:** required (`requireAuth`). An expired/missing token gets 401 and the cookie is **not** cleared.
- **Request body:** none.
- **Behaviour:** `res.clearCookie('auth_token', { httpOnly, secure, sameSite, path: '/' })` (same flags as login, no `maxAge`). Stateless: the JWT itself is not revoked.
- **Response 200:**

```json
{ "message": "Logged out" }
```

- **Errors:** 401 `UNAUTHENTICATED`.

### GET /api/auth/me

- **Auth:** required.
- **Response 200** (`MeResponse`), taken from the JWT claims, not the database:

```json
{
  "id": "8f2c1d4e-6a3b-4c1e-9f7a-2b5d8e0c1a33",
  "email": "asha.k@vonnue.com",
  "name": "Asha K"
}
```

- **Errors:** 401 `UNAUTHENTICATED`. The frontend calls this with `skipUnauthorizedHandler: true` (401 is an expected "not logged in" answer).

---

## Dashboard & courses

### GET /api/dashboard

- **Auth:** required.
- **Response 200** (`DashboardResponse`):

```json
{
  "nextDay": {
    "id": "css-day-01",
    "courseId": "css",
    "dayNumber": 1,
    "title": "Selectors, Box Model, Colours & Typography",
    "description": "Build a reusable CSS design system.",
    "status": "UNLOCKED",
    "courseTotalDays": 5
  },
  "totalDaysCompleteOverall": 5,
  "totalDaysOverall": 54,
  "today": { "activeSeconds": 2460, "codingSeconds": 1380 },
  "total": { "activeSeconds": 61200, "codingSeconds": 30400 },
  "typing": {
    "latest": {
      "wpm": 52,
      "accuracy": 96.4,
      "takenAt": "2026-10-04T05:12:33.120Z"
    },
    "todayAverageWpm": 50,
    "trend": [
      { "date": "2026-10-02", "averageWpm": 47 },
      { "date": "2026-10-04", "averageWpm": 50 }
    ]
  }
}
```

- **Field rules** (`dashboard.service.ts`, `dashboard.typing.ts`):
  - `nextDay`: the single `UNLOCKED` day (progress rule) with `courseTotalDays` = number of days in its course; `null` when every day is completed. `description` is `curriculum_day.subtitle`; `status` is always `"UNLOCKED"`.
  - `totalDaysCompleteOverall` / `totalDaysOverall`: counts across all courses.
  - `today`: the `activity_log` row for today's IST date, zeros if none. `total`: sum of all rows, zeros if none. `activeSeconds` includes `codingSeconds`.
  - `typing.latest`: most recent result or `null`. `typing.todayAverageWpm`: rounded mean WPM of today's (IST) results, or `null`. `typing.trend`: one entry per IST date that has results, within the last 30 IST days (today included), oldest first, `averageWpm` rounded. Days without results are omitted.
- **Errors:** 401; 404 `NOT_FOUND` `"Day not found."` (only if the unlocked day vanishes mid-request).

### GET /api/courses/:courseId/days

- **Auth:** required.
- **Path params:** `courseId`: string, 1–50 chars, regex `^[a-z0-9-]+$` (e.g. `html`, `js`, `postgresql`).
- **Response 200** (`CourseDaysResponse` = `DaySummary[]`), days ordered by `dayNumber` ascending:

```json
[
  {
    "id": "html-day-01",
    "courseId": "html",
    "dayNumber": 1,
    "title": "…",
    "description": "…",
    "status": "COMPLETED"
  },
  {
    "id": "html-day-02",
    "courseId": "html",
    "dayNumber": 2,
    "title": "…",
    "description": "…",
    "status": "UNLOCKED"
  },
  {
    "id": "html-day-03",
    "courseId": "html",
    "dayNumber": 3,
    "title": "…",
    "description": "…",
    "status": "LOCKED"
  }
]
```

`status` ∈ `LOCKED | UNLOCKED | COMPLETED` (progress rule). `description` = day subtitle.

- **Errors:** 400 `VALIDATION_FAILED` (bad `courseId`); 401; 404 `NOT_FOUND` `"Course not found."`.

---

## Days

All day routes: `dayId` path param is a string of 1–100 chars (no format check; ids look like `css-day-01`). Days are seeded by id; lock checks use the day-access rule.

### GET /api/days/:dayId

- **Auth:** required (but the response does not depend on the trainee).
- **Business rule:** **no lock check**; locked days' content is readable so outlines can preview upcoming lessons.
- **Response 200** (`DayContent`):

```json
{
  "dayId": "css-day-01",
  "courseSlug": "css",
  "courseTitle": "CSS",
  "dayNumber": 1,
  "totalDays": 5,
  "title": "Selectors, Box Model, Colours & Typography",
  "subtitle": "Build a reusable CSS design system.",
  "lessonSummary": "Create a design system with CSS variables, typography, colours, and box model rules, then apply it to the home page.",
  "learningObjectives": [
    {
      "id": "css-day-01-obj-1",
      "code": "1.1",
      "title": "CSS Selectors",
      "description": "Understand selectors, specificity, and cascade."
    }
  ],
  "selfCheckItems": [
    {
      "id": "css-day-01-check-1",
      "code": "1.1",
      "label": "Specificity",
      "description": "Predict the winning rule in a specificity conflict.",
      "isRequired": true
    }
  ],
  "journalPrompt": "Why is box-sizing: border-box almost always the better choice? When would you not use it?"
}
```

`learningObjectives` and `selfCheckItems` are ordered by their `sort_order`. `courseSlug` is the course id. `totalDays` = days in the course.

- **Errors:** 400 (bad `dayId`); 401; 404 `NOT_FOUND` `"Day not found"`.

### GET /api/days/:dayId/status

- **Auth:** required.
- **Response 200** (`DayCurrentStatus`). Does not reject locked days:

```json
{ "isLocked": false, "isCompleted": false }
```

Completed → `{ "isLocked": false, "isCompleted": true }`. First curriculum day → never locked. Otherwise `isLocked` = previous day not completed.

- **Errors:** 400; 401; 404 `"Day not found"`.

### PATCH /api/days/:dayId/complete

- **Auth:** required.
- **Request body:** none (ignored).
- **Business rules** (`day.services.ts:38-51`):
  1. Unknown day → 404. Locked day → `403 DAY_LOCKED`.
  2. If not already completed: count **required tasks** = tasks of the day with `is_stretch_goal = false`; **completed** = this trainee's `task_progress` rows with `status = 'completed'` for those tasks (set by `POST /tasks/:taskId/submit`). If completed < required → `403 CHECKLIST_INCOMPLETE` with `details: { completedTasks, requiredTasks }`. Stretch goals, self-check items and the journal are **not** required. A day with zero required tasks can be completed immediately.
  3. Upserts `day_completion` (idempotent; calling again on a completed day succeeds without re-checking tasks) and finds the next day in curriculum order (next `day_number` in the same course, else the first day of the next course by `sort_order`), in one transaction.
- **Response 200** (`CompleteDayResponse`):

```json
{
  "status": { "isLocked": false, "isCompleted": true },
  "nextDayId": "css-day-02"
}
```

`nextDayId` is `null` after the last day of the curriculum.

- **Errors:** 400; 401; 403 `DAY_LOCKED`; 403 `CHECKLIST_INCOMPLETE`:

```json
{
  "error": {
    "code": "CHECKLIST_INCOMPLETE",
    "message": "Complete all required tasks before submitting the day.",
    "details": { "completedTasks": 3, "requiredTasks": 6 }
  }
}
```

404 `"Day not found"`.

### PATCH /api/days/:dayId/status (legacy)

- Same rules and errors as `PATCH /api/days/:dayId/complete`, but the **response 200 is only the `DayCurrentStatus`**:

```json
{ "isLocked": false, "isCompleted": true }
```

Kept "for the existing day overview client" (`day.routes.ts:25`); the current frontend calls `/complete`.

### GET /api/days/:dayId/journal

- **Auth:** required.
- **Business rule:** day must be accessible (day-access rule).
- **Response 200** (`DayJournal`). No saved entry is not an error:

```json
{ "responseText": null }
```

or `{ "responseText": "Because padding and border stay inside the declared width…" }`.

- **Errors:** 400; 401; 403 `DAY_LOCKED`; 404 `"Day not found"`.

### PUT /api/days/:dayId/journal

- **Auth:** required.
- **Request body** (`SaveJournalRequest`):

| Field          | Type   | Rules                                                                                                                                                                                                             |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `responseText` | string | Trimmed first, then 1–5,000 chars (`MAX_JOURNAL_LENGTH = 5_000`). Whitespace-only is rejected. Stored trimmed. Note: the frontend text box allows 10,000, so an entry over 5,000 characters is rejected with 400. |

```json
{ "responseText": "Because padding and border stay inside the declared width…" }
```

- **Business rules:** day must be accessible; upsert, one entry per trainee per day (create first time, replace after). Allowed on completed days.
- **Response 200** (`DayJournal`), the saved (trimmed) text:

```json
{ "responseText": "Because padding and border stay inside the declared width…" }
```

- **Errors:** 400 `VALIDATION_FAILED` (bad `dayId`, missing/empty/too-long `responseText`); 401; 403 `DAY_LOCKED`; 404 `"Day not found"`.

### GET /api/journal

- **Auth:** required.
- **Response 200** (`JournalListResponse`): `{ "entries": [...] }`, with accessible days only (completed days and the next unlocked day), newest curriculum day first. Each entry includes the curriculum title, track label, journal prompt, saved text and update time. `isEditable` is true only for the next unlocked day.

### PUT /api/journal/:dayId

- **Auth:** required.
- **Request and response:** same `SaveJournalRequest` and `DayJournal` contract as `PUT /api/days/:dayId/journal`; this route is used by the dedicated journal page's autosave editor.
- **Business rules and errors:** same accessible-day check and validation as `PUT /api/days/:dayId/journal`.

### GET /api/days/:dayId/tasks

- **Auth:** required.
- **Business rule:** day must be accessible (day-access rule).
- **Response 200** (`DayTask[]`), ordered by `sequenceOrder` ascending:

```json
[
  {
    "id": "css-day-01-t-1",
    "sequenceOrder": 1,
    "title": "Selector Challenge Sheet",
    "status": "completed",
    "isStretchGoal": false
  },
  {
    "id": "css-day-01-t-2",
    "sequenceOrder": 2,
    "title": "…",
    "status": "not_started",
    "isStretchGoal": false
  }
]
```

`status` ∈ `not_started | in_progress | completed`, taken directly from the `task_progress.status` column; no row → `not_started`.

- **Errors:** 400; 401; 403 `DAY_LOCKED`; 404 `"Day not found"`.

---

## Tasks

All task routes: `taskId` path param is a string, 1–100 chars, regex `^[a-z0-9-]+$` (e.g. `css-day-01-t-1`). Each handler first checks the task exists (`404 "Task not found."`) and its day is not `LOCKED` under the **progress** rule (`403 DAY_LOCKED`).

### GET /api/tasks/:taskId

- **Auth:** required.
- **Response 200** (`TaskResponse`):

```json
{
  "id": "css-day-01-t-1",
  "title": "Selector Challenge Sheet",
  "instructionsMarkdown": "**CSS · Day 1: Selectors, Box Model, Colours & Typography** · Task 1 of 8 · about 40 min\n\n…",
  "isStretchGoal": false,
  "sequenceOrder": 1,
  "estimatedMinutes": 40,
  "status": "in_progress",
  "day": { "id": "css-day-01", "dayNumber": 1, "courseTitle": "CSS" },
  "runtime": "browser",
  "runCommand": null,
  "setupSql": null
}
```

- **Field rules:**
  - `estimatedMinutes`: number or `null`.
  - `runtime` ∈ `browser | node | sql`. `runCommand`: the run command of a `node` task (`"npm run check"`, `"npm test"` or `"npm run dev"` in the current curriculum), otherwise `null`; the 16 Prisma tasks have none. `setupSql`: SQL string for `sql` tasks or `null`.
  - `status` is derived (`progressService.taskStatus`): no progress row → `not_started`; row `status = 'completed'` → `completed`; row with `code_updated_at` set or non-null `files` → `in_progress`; otherwise `not_started`.
- **Errors:** 400; 401; 403 `DAY_LOCKED`; 404 `"Task not found."`.

### GET /api/tasks/:taskId/code

- **Auth:** required.
- **Response 200** (`TaskCodeResponse`):
  - If the trainee has saved files: those files and `updatedAt` = ISO time of the last save (or `null` if the row has files but no save time).
  - Otherwise: the task's starter files and `updatedAt: null`.

```json
{
  "files": [
    { "path": "index.html", "content": "<!doctype html>\n<html>…</html>" },
    { "path": "styles/main.css", "content": ":root { … }" }
  ],
  "updatedAt": "2026-10-04T06:01:12.441Z"
}
```

Malformed entries in the stored JSON (not `{ path: string, content: string }`) are silently dropped (`task.files.ts`).

- **Errors:** 400; 401; 403 `DAY_LOCKED`; 404 `"Task not found."`.

### PUT /api/tasks/:taskId/code

- **Auth:** required.
- **Request body** (`SaveCodeRequest`), the **complete** file set (a file left out is deleted):

| Field             | Type   | Rules                                                                                                                                                                                                                                                                                                                         |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `files`           | array  | At most 200 items (`MAX_FILES_PER_TASK`). Paths must be unique (`"Two files have the same path."`). Empty array allowed.                                                                                                                                                                                                      |
| `files[].path`    | string | 1–200 chars (`MAX_PATH_CHARS`). No `\` (`"Use / to separate folders."`). Split on `/`, no segment may be `''`, `.` or `..` (so no leading/trailing/double slash) (`'Use a relative path with no empty, "." or ".." folders.'`). No NUL and no lone UTF-16 surrogate (`"The path contains characters that cannot be saved."`). |
| `files[].content` | string | At most 200,000 chars (`MAX_FILE_CHARS`); may be empty. No NUL / lone surrogate (`"The file contains characters that cannot be saved."`).                                                                                                                                                                                     |

The whole request is also capped by the 5 MB JSON body limit, which is reached long before 200 files × 200,000 chars.

```json
{
  "files": [
    { "path": "index.html", "content": "<!doctype html>…" },
    { "path": "styles/main.css", "content": ":root { --brand: #0a6; }" }
  ]
}
```

- **Business rules:** upsert of `task_progress`: a new row is created with `status: 'in_progress'`; an existing row keeps its status (a completed task stays completed when edited). Sets `code_updated_at` to now.
- **Response:** `204 No Content`.
- **Errors:** 400 `VALIDATION_FAILED` (schema or body > 5 MB); 401; 403 `DAY_LOCKED`; 404 `"Task not found."`.

### POST /api/tasks/:taskId/submit

- **Auth:** required.
- **Request body:** none.
- **Business rules:** repeatable ("Resubmit"); never locks editing and never completes the day. Upserts `task_progress` with `status: 'completed'` and `last_submitted_at = now`; `first_submitted_at` is set only on the first submit (same transaction). No code is required to submit.
- **Response 200** (`SubmitTaskResponse`):

```json
{ "status": "completed", "submittedAt": "2026-10-04T06:15:40.002Z" }
```

- **Errors:** 400; 401; 403 `DAY_LOCKED`; 404 `"Task not found."`.

---

## Activity time

### POST /api/activity/time

- **Auth:** required (mount-level).
- **Request body** (`ActivityTimeRequest`):

| Field           | Type    | Rules                                                                                                                            |
| --------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `date`          | string  | Required. Zod ISO date `YYYY-MM-DD`; must be `<=` today's Asia/Kolkata date (`"date cannot be in the future."`). No lower bound. |
| `activeSeconds` | integer | 0–600 (`MAX_BATCH_SECONDS`).                                                                                                     |
| `codingSeconds` | integer | 0–600, and `<= activeSeconds` (`"codingSeconds cannot be greater than activeSeconds."`, path `codingSeconds`).                   |

```json
{ "date": "2026-10-04", "activeSeconds": 60, "codingSeconds": 42 }
```

- **Business rules:** upsert of `activity_log` keyed by (trainee, date): creates the row, or **increments** both counters. Not idempotent: each call adds. The frontend sends a batch about every 60 s and on tab hide (a `fetch` with `keepalive`), with `date` = its own IST date.
- **Response:** `204 No Content`.
- **Errors:** 400 `VALIDATION_FAILED`; 401.

### GET /api/activity/time

- **Auth:** required.
- **Query params:** `days`: coerced integer 1–365, default 7. Invalid → `400 VALIDATION_FAILED` (parsed in the controller).
- **Response 200** (`ActivityTimeDay[]`): the last `days` IST calendar days including today, **newest first**, only days with `activeSeconds > 0` (days without activity are omitted):

```json
[
  { "date": "2026-10-04", "activeSeconds": 2460, "codingSeconds": 1380 },
  { "date": "2026-10-02", "activeSeconds": 5400, "codingSeconds": 3100 }
]
```

- **Errors:** 400; 401.

---

## Flag events

### POST /api/activity/:taskId/events

- **Auth:** required (route-level `requireAuth`).
- **Path params:** `taskId`: string, 1–100 chars (no regex here, unlike `/api/tasks`).
- **Request body** (`LogFlagEventRequest`):

| Field        | Type    | Rules                                                                                                                                        |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`       | enum    | `FULLSCREEN_EXIT` \| `TAB_SWITCH` \| `PASTE_BLOCKED` \| `WINDOW_BLUR`                                                                        |
| `durationMs` | integer | Optional, `>= 0`.                                                                                                                            |
| `context`    | object  | Optional. Keys: strings ≤ 50 chars; values: string ≤ 200 chars, number, or boolean; at most 10 keys (`"context can have at most 10 keys."`). |

```json
{
  "type": "TAB_SWITCH",
  "durationMs": 12000,
  "context": { "source": "terminal" }
}
```

- **Business rules** (`flag.service.ts`):
  1. Task must exist → else `404 "Task not found."`; its day must not be `LOCKED` (progress rule) → else `403 DAY_LOCKED`.
  2. Server sets the timestamp.
  3. **De-duplication:** if the same trainee + task + type was logged within the last 2000 ms, nothing is stored (still 204).
  4. `review_priority` is computed server-side: `PASTE_BLOCKED` → `LOW`; `TAB_SWITCH`, `FULLSCREEN_EXIT`, `WINDOW_BLUR` → `LOW` if `durationMs` < 5,000 (missing counts as 0), `NORMAL` if < 30,000, else `HIGH`.
- **Response:** `204 No Content`.
- **Errors:** 400; 401; 403 `DAY_LOCKED`; 404 `"Task not found."`.

---

## Typing test

### POST /api/typing-test/results

- **Auth:** required.
- **Request body** (`SaveTypingResultRequest`):

| Field      | Type    | Rules                                      |
| ---------- | ------- | ------------------------------------------ |
| `wpm`      | integer | 0–300                                      |
| `accuracy` | number  | 0–100; rounded to 1 decimal before storing |

```json
{ "wpm": 52, "accuracy": 96.37 }
```

- **Business rules:** server sets `takenAt`. Every call creates a new row.
- **Response 201** (`TypingResultRecord`):

```json
{
  "id": "3c9a7b52-0f1e-4d7a-b8a1-5e2f6c4d9e10",
  "wpm": 52,
  "accuracy": 96.4,
  "takenAt": "2026-10-04T05:12:33.120Z"
}
```

- **Errors:** 400; 401.

### GET /api/typing-test/results

- **Auth:** required.
- **Response 200** (`TypingResultRecord[]`): **all** of the trainee's results (no pagination), ordered by `takenAt` desc then `id` desc. `accuracy` rounded to 1 decimal.

```json
[
  {
    "id": "3c9a7b52-0f1e-4d7a-b8a1-5e2f6c4d9e10",
    "wpm": 52,
    "accuracy": 96.4,
    "takenAt": "2026-10-04T05:12:33.120Z"
  },
  {
    "id": "a1d0e8f4-7b2c-4e55-9c13-0d6f2a7b8c91",
    "wpm": 47,
    "accuracy": 94,
    "takenAt": "2026-10-02T11:40:05.871Z"
  }
]
```

- **Errors:** 401.

---

## Profile

### GET /api/profile

- **Auth:** required.
- **Response 200** (`ProfileData`):

```json
{
  "trainee": {
    "name": "Asha K",
    "email": "asha.k@vonnue.com",
    "track": "CSS",
    "currentDay": 1,
    "totalDays": 5
  },
  "total": { "activeSeconds": 61200, "codingSeconds": 30400 },
  "typing": { "latestWpm": 52, "latestAccuracy": 96.4 },
  "dailyActivity": [
    {
      "date": "2026-10-04",
      "timeSpentSeconds": 2460,
      "typingWpm": 50,
      "isToday": true
    },
    {
      "date": "2026-10-03",
      "timeSpentSeconds": 0,
      "typingWpm": null,
      "isToday": false
    },
    {
      "date": "2026-10-02",
      "timeSpentSeconds": 5400,
      "typingWpm": 47,
      "isToday": false
    },
    {
      "date": "2026-10-01",
      "timeSpentSeconds": 3600,
      "typingWpm": null,
      "isToday": false
    },
    {
      "date": "2026-09-30",
      "timeSpentSeconds": 0,
      "typingWpm": null,
      "isToday": false
    },
    {
      "date": "2026-09-29",
      "timeSpentSeconds": 1800,
      "typingWpm": null,
      "isToday": false
    },
    {
      "date": "2026-09-28",
      "timeSpentSeconds": 0,
      "typingWpm": null,
      "isToday": false
    }
  ]
}
```

---
