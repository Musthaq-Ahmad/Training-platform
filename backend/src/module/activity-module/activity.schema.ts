import { z } from 'zod';

export const DEFAULT_DAYS = 7;
const MAX_DAYS = 365;

// The frontend sends about one batch a minute, so a single batch is never close to 10 minutes.
const MAX_BATCH_SECONDS = 600;
const seconds = z.number().int().min(0).max(MAX_BATCH_SECONDS);

// Plain YYYY-MM-DD, matching activity_log's per-day granularity (TRD §12 —
// dates are India time, Asia/Kolkata). No time-of-day component is stored,
// so a full ISO timestamp isn't needed here.
//
// NOTE: this makes `date` client-supplied, which is a departure from the
// "server decides time" pattern used elsewhere (e.g. typing-test results).
// Only accept this if there's a real reason the client needs to say which
// day a batch belongs to (e.g. a batch spanning a midnight IST rollover) —
// otherwise computing `date` server-side, as the TRD originally specified,
// removes the need for the future-date check below entirely.
const activityDate = z
  .string()
  .date() // requires Zod ^3.23 — swap for z.string().regex(/^\d{4}-\d{2}-\d{2}$/) on older versions
  .refine(
    (value) => {
      const todayIst = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
      return value <= todayIst;
    },
    { message: 'date cannot be in the future.' }
  )
  .transform((value) => new Date(`${value}T00:00:00.000Z`));

export const activityTimeBodySchema = z
  .object({
    date: activityDate,
    activeSeconds: seconds,
    codingSeconds: seconds,
  })
  .refine((body) => body.codingSeconds <= body.activeSeconds, {
    message: 'codingSeconds cannot be greater than activeSeconds.',
    path: ['codingSeconds'],
  });

export const activityTimeQuerySchema = z.object({
  days: z.coerce.number().int().min(1).max(MAX_DAYS).default(DEFAULT_DAYS),
});

export type ActivityTimeBodyType = z.infer<typeof activityTimeBodySchema>;
