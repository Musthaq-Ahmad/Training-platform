/** Local time as HH:mm:ss.SSS, e.g. 09:04:07.012 */
export function formatTimestamp(ts: number): string {
  const date = new Date(ts);
  const pad = (value: number, length = 2) => String(value).padStart(length, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
}
