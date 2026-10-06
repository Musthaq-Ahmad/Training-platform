import { PRISMA_PGLITE_SUPPORT_FILES, PRISMA_SAVED_DATABASE } from './support/prismaPglite';

/**
 * Hidden helper files a Node task needs, written into WebContainer next to the trainee's files.
 * They go in .vinkup/, which the workspace ignores, so they are never shown or saved.
 * Today: Prisma tasks that depend on prisma-pglite (Prisma on PGlite in the browser).
 */
export function supportFilesFor(files: Record<string, string>): Record<string, string> {
  return dependsOn(files['package.json'], 'prisma-pglite') ? PRISMA_PGLITE_SUPPORT_FILES : {};
}

/**
 * Paths of a database the task's code keeps in WebContainer, to save in the browser between visits
 * (databaseSnapshots.ts). Empty for tasks without one.
 */
export function savedDatabasePaths(files: Record<string, string>): string[] {
  return dependsOn(files['package.json'], 'prisma-pglite') ? PRISMA_SAVED_DATABASE : [];
}

function dependsOn(packageJson: string | undefined, name: string): boolean {
  if (!packageJson) return false;
  try {
    const parsed = JSON.parse(packageJson) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    return name in (parsed.dependencies ?? {}) || name in (parsed.devDependencies ?? {});
  } catch {
    return false; // a broken package.json: npm will say so
  }
}
