// Calendar days on this platform are Asia/Kolkata days. India has no daylight saving, so the
// offset is always +05:30.
const IST_OFFSET_MS = 330 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** 'YYYY-MM-DD' of the Asia/Kolkata calendar day `daysAgo` days before `now`. */
export function istDateString(daysAgo = 0, now: Date = new Date()): string {
  return new Date(now.getTime() + IST_OFFSET_MS - daysAgo * DAY_MS).toISOString().slice(0, 10);
}

/** 'YYYY-MM-DD' of the Asia/Kolkata calendar day that contains `moment`. */
export function toIstDateString(moment: Date): string {
  return new Date(moment.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

/** The value to store in, or compare with, a @db.Date column: midnight UTC of that day. */
export function istDateValue(daysAgo = 0, now: Date = new Date()): Date {
  return new Date(`${istDateString(daysAgo, now)}T00:00:00.000Z`);
}

/** The moment an Asia/Kolkata calendar day began, for filtering timestamp columns. */
export function istDayStart(dateString: string): Date {
  return new Date(`${dateString}T00:00:00.000+05:30`);
}
