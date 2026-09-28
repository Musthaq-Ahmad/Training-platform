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
/** Same limit as the backend's saveCodeBodySchema */
export const MAX_FILE_CHARS = 200_000;

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
