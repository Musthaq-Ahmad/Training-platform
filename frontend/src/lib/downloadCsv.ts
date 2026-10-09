import { todayKey } from './platformDate';

/** "vinkup-trainees-2026-10-09.csv": the date is the platform's calendar day (Asia/Kolkata). */
export function csvFilename(now: Date = new Date()): string {
  return `vinkup-trainees-${todayKey(now)}.csv`;
}

// Excel opens a CSV as Windows-1252 unless the file starts with this byte-order mark, which
// turns the "·" and "—" in every row into garbage. Other programs ignore it.
const UTF8_BOM = '\ufeff';

/** Saves text as a file through a temporary link, then removes the link and the blob URL. */
export function downloadCsv(csv: string, filename: string): void {
  const blob = new Blob([UTF8_BOM + csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}
