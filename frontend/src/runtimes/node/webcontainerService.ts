import type { WebContainer } from '@webcontainer/api';
import { toFileSystemTree } from './toFileSystemTree';

let bootPromise: Promise<WebContainer> | null = null;

/** Boots WebContainer once per page load; every caller gets the same instance. */
export function getWebContainer(): Promise<WebContainer> {
  if (!bootPromise) {
    // Only one WebContainer may run per page, and booting takes seconds, so it's never torn down
    // between tasks: resetWorkspace() gives the next task a clean folder instead.
    // Loaded on demand, so pages without a Node task never download it.
    bootPromise = import('@webcontainer/api').then(({ WebContainer }) =>
      // coep must match the page's own Cross-Origin-Embedder-Policy header (vite.config.ts).
      WebContainer.boot({ coep: 'credentialless', workdirName: 'workspace' })
    );
    // A failed boot (offline, blocked) shouldn't stick: let Retry try again.
    bootPromise.catch(() => {
      bootPromise = null;
    });
  }
  return bootPromise;
}

/** Empties the working folder and mounts the given files. */
export async function resetWorkspace(
  wc: WebContainer,
  files: Record<string, string>
): Promise<void> {
  // Also removes the previous task's node_modules and anything it created in the terminal.
  const entries = await wc.fs.readdir('/');
  await Promise.all(entries.map((name) => wc.fs.rm(name, { recursive: true, force: true })));
  await wc.mount(toFileSystemTree(files));
}
