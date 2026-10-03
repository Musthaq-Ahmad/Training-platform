import type { TaskFile } from '@itp/types';
import {
  MAX_FILE_CHARS,
  MAX_FILES_PER_TASK,
  MAX_PATH_CHARS,
  MAX_SAVE_BYTES,
} from './workspaceIgnore';

// The same rules the backend applies to PUT /api/tasks/:taskId/code (task.schema.ts). Checking
// them before saving means a save the server would reject is never sent, and the trainee is told
// which file to fix instead of seeing "Some fields are invalid".

/** Half of a surrogate pair (a broken emoji). */
const LONE_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;

/** NUL, or half of a surrogate pair: Postgres can't store either in the files column (jsonb). */
export function hasUnsavableChars(text: string): boolean {
  return text.includes('\u0000') || LONE_SURROGATE.test(text);
}

/** A relative path with no empty, "." or ".." folders, no backslash, at most 200 characters. */
export function isSavablePath(path: string): boolean {
  return (
    path.length > 0 &&
    path.length <= MAX_PATH_CHARS &&
    !path.includes('\\') &&
    !hasUnsavableChars(path) &&
    path.split('/').every((segment) => segment !== '' && segment !== '.' && segment !== '..')
  );
}

/** A path short enough to read in a message. */
function shortPath(path: string): string {
  return path.length > 60 ? `${path.slice(0, 57)}...` : path;
}

/** Why these files can't be saved, or null if the server will accept them. */
export function findSaveProblem(files: TaskFile[]): string | null {
  if (files.length > MAX_FILES_PER_TASK) {
    return `Too many files to save: ${files.length} (${MAX_FILES_PER_TASK} max). Delete some to keep saving.`;
  }

  for (const file of files) {
    if (!isSavablePath(file.path)) {
      return `${shortPath(file.path)} can't be saved: rename it (a relative path of up to ${MAX_PATH_CHARS} characters).`;
    }
    if (file.content.length > MAX_FILE_CHARS) {
      return `${shortPath(file.path)} is too large to save (200,000 characters max).`;
    }
    if (hasUnsavableChars(file.content)) {
      return `${shortPath(file.path)} contains characters that can't be saved.`;
    }
  }

  const bodyBytes = new TextEncoder().encode(JSON.stringify({ files })).length;
  if (bodyBytes > MAX_SAVE_BYTES) {
    return 'The files are too large to save together (5 MB max). Delete or shrink some to keep saving.';
  }

  return null;
}
