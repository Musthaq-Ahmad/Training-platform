/** Formats a duration in seconds as "Xh Ym", e.g. 153000 -> "42h 30m" */
export function formatDurationHM(totalSeconds: number): string {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}
