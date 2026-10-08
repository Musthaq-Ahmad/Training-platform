/** What the mentor chose to include in the printed trainee report. */
export type PrintReportOptions = {
  includeJournal: boolean;
  includeFlags: boolean;
};

export const DEFAULT_PRINT_OPTIONS: PrintReportOptions = {
  includeJournal: true,
  includeFlags: true,
};

/** "2026-10-08": the platform's calendar day (Asia/Kolkata). */
function istDateKey(moment: Date): string {
  return moment.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

/**
 * "Report – Asha Rao – 2026-10-08". Browsers use the page title as the suggested file name
 * for "Save as PDF", so it is set while the report prints.
 */
export function reportDocumentTitle(traineeName: string, moment: Date = new Date()): string {
  return `Report – ${traineeName} – ${istDateKey(moment)}`;
}
