const TIMEZONE = 'Asia/Kolkata'; // the platform's calendar day, same as the GET /activity/time dates

/** Today's date as 'YYYY-MM-DD' in the platform's timezone. */
export function todayKey(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE }).format(now);
}
