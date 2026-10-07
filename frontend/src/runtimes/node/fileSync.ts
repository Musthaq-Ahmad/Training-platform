import { getFileType } from '../../lib/fileTypes';
import { isIgnoredPath, MAX_FILE_CHARS } from '../../lib/workspaceIgnore';

/** The few WebContainer `fs` methods the sync uses, so tests can pass a fake. */
export type WebContainerLike = {
  fs: {
    readFile(path: string, encoding: 'utf-8'): Promise<string>;
    readdir(path: string): Promise<unknown>;
    writeFile(path: string, data: string): Promise<void>;
    mkdir(path: string, options: { recursive: true }): Promise<unknown>;
    rm(path: string, options?: { force?: boolean; recursive?: boolean }): Promise<void>;
    watch(
      path: string,
      options: { recursive: boolean },
      listener: (event: 'rename' | 'change', filename: string | Uint8Array) => void
    ): { close(): void };
  };
};

export type FileSyncCallbacks = {
  onRemoteChange: (path: string, content: string) => void; // a file created or changed in the terminal
  onRemoteDelete: (path: string) => void;
  onSkipped: (path: string, reason: 'too-large' | 'binary') => void;
};

export type FileSync = {
  /** Call after every workspace change; pushes what differs from the last synced state. */
  pushFromWorkspace(files: Record<string, string>): void;
  dispose(): void;
};

const PUSH_DELAY_MS = 200;
const WATCH_DELAY_MS = 300;

function toPath(filename: string | Uint8Array): string {
  const text = typeof filename === 'string' ? filename : new TextDecoder().decode(filename);
  return text.replace(/^(\.\/|\/)+/, '');
}

function parentFolder(path: string): string {
  const slash = path.lastIndexOf('/');
  return slash === -1 ? '' : path.slice(0, slash);
}

function isNotFound(error: unknown): boolean {
  const { code, message } = (error ?? {}) as { code?: unknown; message?: unknown };
  return code === 'ENOENT' || (typeof message === 'string' && message.includes('ENOENT'));
}

/** NUL bytes or U+FFFD (invalid UTF-8 read as text) mean this isn't a text file. */
function looksBinary(text: string): boolean {
  return text.includes('\u0000') || text.includes('�');
}

/**
 * Two-way sync between the workspace (editor) and WebContainer, without echo loops.
 *
 * `synced` holds the text both sides agree on. A write in either direction updates it first,
 * so when that same change comes back from the other side it compares equal and stops there.
 */
export function createFileSync(
  wc: WebContainerLike,
  initialFiles: Record<string, string>,
  callbacks: FileSyncCallbacks
): FileSync {
  const synced = new Map(Object.entries(initialFiles).filter(([path]) => !isIgnoredPath(path)));
  const pushTimers = new Map<string, ReturnType<typeof setTimeout>>();
  const watchTimers = new Map<string, ReturnType<typeof setTimeout>>();
  const reportedSkips = new Set<string>();
  let latestFiles = initialFiles;
  let isDisposed = false;

  function cancel(timers: Map<string, ReturnType<typeof setTimeout>>, path: string) {
    const timer = timers.get(path);
    if (timer) clearTimeout(timer);
    timers.delete(path);
  }

  // --- Editor → Node -------------------------------------------------------------------------

  async function writeToContainer(path: string) {
    const content = latestFiles[path];
    if (isDisposed || content === undefined || synced.get(path) === content) return;
    // Record it before writing: the watcher will see this write and must recognise it as ours.
    synced.set(path, content);
    try {
      const folder = parentFolder(path);
      if (folder) await wc.fs.mkdir(folder, { recursive: true });
      await wc.fs.writeFile(path, content);
    } catch {
      synced.delete(path); // the next workspace change tries again
    }
  }

  function pushFromWorkspace(files: Record<string, string>) {
    if (isDisposed) return;
    latestFiles = files;

    for (const [path, content] of Object.entries(files)) {
      if (isIgnoredPath(path)) continue;
      if (synced.get(path) === content) {
        cancel(pushTimers, path); // typed back to what Node already has
        continue;
      }
      cancel(pushTimers, path);
      pushTimers.set(
        path,
        setTimeout(() => {
          pushTimers.delete(path);
          void writeToContainer(path);
        }, PUSH_DELAY_MS)
      );
    }

    for (const path of [...synced.keys()]) {
      if (path in files) continue;
      synced.delete(path);
      cancel(pushTimers, path);
      void wc.fs.rm(path, { force: true }).catch(() => {});
    }
  }

  // --- Node → editor -------------------------------------------------------------------------

  function forget(path: string) {
    // The path itself (a file), or everything under it (a folder removed with rm -r)
    const removed = [...synced.keys()].filter((p) => p === path || p.startsWith(`${path}/`));
    for (const p of removed) {
      synced.delete(p);
      callbacks.onRemoteDelete(p);
    }
  }

  async function readFromContainer(path: string) {
    // A folder is not a file. Don't rely on readFile failing with EISDIR: in WebContainer
    // it can succeed with '', which would add an empty "file" named like the folder.
    try {
      await wc.fs.readdir(path);
      return; // it's a folder
    } catch {
      // not a folder, or already deleted: carry on, readFile below handles both
    }

    let text: string;
    try {
      text = await wc.fs.readFile(path, 'utf-8');
    } catch (error) {
      if (!isDisposed && isNotFound(error)) forget(path);
      return; // anything else (EISDIR: it's a folder) is ignored
    }
    if (isDisposed || synced.get(path) === text) return; // our own write echoing back

    if (text.length > MAX_FILE_CHARS || !getFileType(path).isText || looksBinary(text)) {
      // Once per path: a script rewriting data.json every second shouldn't flood the terminal.
      if (!reportedSkips.has(path)) {
        reportedSkips.add(path);
        callbacks.onSkipped(path, text.length > MAX_FILE_CHARS ? 'too-large' : 'binary');
      }
      return;
    }

    reportedSkips.delete(path);
    synced.set(path, text);
    callbacks.onRemoteChange(path, text);
  }

  const watcher = wc.fs.watch('.', { recursive: true }, (_event, filename) => {
    const path = toPath(filename);
    if (isDisposed || !path || isIgnoredPath(path)) return;
    cancel(watchTimers, path);
    watchTimers.set(
      path,
      setTimeout(() => {
        watchTimers.delete(path);
        void readFromContainer(path);
      }, WATCH_DELAY_MS)
    );
  });

  return {
    pushFromWorkspace,
    dispose() {
      isDisposed = true;
      watcher.close();
      for (const timer of [...pushTimers.values(), ...watchTimers.values()]) clearTimeout(timer);
      pushTimers.clear();
      watchTimers.clear();
    },
  };
}
