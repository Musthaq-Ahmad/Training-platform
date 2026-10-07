const SHORT_DATE = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
const MONTH_DAY = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
const LONG_DATE = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});
const TIME = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/** "Oct 22, 2024" */
export function formatShortDate(iso: string): string {
  return SHORT_DATE.format(new Date(iso));
}

/** "Today, Oct 24" */
export function formatTodayLabel(iso: string): string {
  return `Today, ${MONTH_DAY.format(new Date(iso))}`;
}

/** "Wednesday, October 23, 2024" */
export function formatLongDate(iso: string): string {
  return LONG_DATE.format(new Date(iso));
}

/** "Wednesday, October 23, 2024 • 17:42" */
export function formatLongDateTime(iso: string): string {
  const date = new Date(iso);
  return `${LONG_DATE.format(date)} • ${TIME.format(date)}`;
}
