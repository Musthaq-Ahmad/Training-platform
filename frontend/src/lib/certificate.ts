// Calendar dates on the platform are Asia/Kolkata, same as the rest of the app.
const CERTIFICATE_DATE = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
});

/** "6 October 2026" */
export function formatCertificateDate(iso: string): string {
  return CERTIFICATE_DATE.format(new Date(iso));
}

/** "15 days" / "1 day" */
export function formatDayCount(days: number): string {
  return `${days} ${days === 1 ? 'day' : 'days'}`;
}

/** Browsers suggest the tab title as the "Save as PDF" file name. */
export function certificateDocumentTitle(courseTitle: string, traineeName: string): string {
  return `Vinkup certificate - ${courseTitle} - ${traineeName}`;
}
