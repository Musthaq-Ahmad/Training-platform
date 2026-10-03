export const IGNORED_DIRS = [
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.vite',
  '.cache',
  '.git',
  'generated',
];
export const IGNORED_FILES = ['package-lock.json', '.DS_Store'];
/** Same limits as the backend's saveCodeBodySchema (see lib/saveRules.ts) */
export const MAX_FILE_CHARS = 200_000;
export const MAX_FILES_PER_TASK = 200;
export const MAX_PATH_CHARS = 200;
/** The backend accepts JSON bodies up to 5 MB; this leaves room for the JSON around the files. */
export const MAX_SAVE_BYTES = 5_000_000;

/** true for anything inside an ignored folder, an ignored file name, or a *.log file */
export function isIgnoredPath(path: string): boolean {
  const segments = path.split('/');
  const lastSegment = segments[segments.length - 1];

  return (
    segments.some((segment) => IGNORED_DIRS.includes(segment)) ||
    IGNORED_FILES.includes(lastSegment) ||
    lastSegment.endsWith('.log')
  );
}
