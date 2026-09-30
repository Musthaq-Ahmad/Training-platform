/**
 * The IndexedDB name for one trainee's database for one task. The trainee id is in it so two people
 * sharing a browser never open each other's tables.
 */
export function sqlStorageName(traineeId: string, taskId: string): string {
  return `itp-sql-${traineeId}-${taskId}`.replace(/[^A-Za-z0-9_-]/g, '_');
}
