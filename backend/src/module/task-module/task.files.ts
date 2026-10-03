import type { TaskFile } from '@itp/types';

/**
 * Reads a JSON column that should hold TaskFile[] (task.starter_files, task_progress.files).
 * Anything that isn't a { path, content } pair of strings is dropped instead of being sent on.
 */
export function toTaskFiles(value: unknown): TaskFile[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item: unknown) => {
    if (typeof item !== 'object' || item === null) return [];
    const { path, content } = item as { path?: unknown; content?: unknown };
    return typeof path === 'string' && typeof content === 'string' ? [{ path, content }] : [];
  });
}
