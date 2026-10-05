/**
 * Keeps a Node task's database across page reloads, like the SQL runtime's stored databases.
 *
 * Prisma tasks run PGlite inside WebContainer, which keeps its files in the tab's memory, and every
 * task open starts from a clean folder (resetWorkspace). So the database folder is copied into
 * IndexedDB whenever it changes and written back when the task opens. WebContainer's Node.js can't
 * reach the browser's IndexedDB itself, which is why the page does the copying.
 *
 * Saved per trainee and task, in this browser only.
 */

/** Postgres writes several files per change: save once they have been quiet this long. */
const SAVE_DELAY_MS = 2000;
/** Lock files of the run that wrote them: a copy would stop the next run from starting. */
const SKIPPED_FILES = ['postmaster.pid', 'postmaster.opts'];

/** A folder is stored as null so empty folders (Postgres needs some) come back too. */
type Entry = Uint8Array | null;
export type Snapshot = Map<string, Entry>;

/** The WebContainer `fs` methods used here, so tests can pass a fake. */
export type SnapshotFs = {
  readFile(path: string): Promise<Uint8Array>;
  readdir(
    path: string,
    options: { withFileTypes: true }
  ): Promise<Array<{ name: string; isDirectory(): boolean }>>;
  writeFile(path: string, data: Uint8Array): Promise<void>;
  mkdir(path: string, options: { recursive: true }): Promise<unknown>;
  watch(
    path: string,
    options: { recursive: boolean },
    listener: (event: 'rename' | 'change', filename: string | Uint8Array) => void
  ): { close(): void };
};

export type SnapshotStore = {
  load(name: string): Promise<Snapshot>;
  /** Applies all writes and deletes together, so a saved copy is never half-updated. */
  save(name: string, writes: Snapshot, deletes: string[]): Promise<void>;
};

export type DatabaseSnapshots = {
  /**
   * Writes the saved copy back and starts saving changes. Call after resetWorkspace, before
   * anything opens the database. `canSave` is false while the task is open in another tab.
   */
  open(): Promise<{ restored: boolean; canSave: boolean }>;
  /** Saves what changed since the last save and stops watching. */
  dispose(): Promise<void>;
};

/** IndexedDB-friendly name for one trainee's copy of one task's database */
export function nodeDatabaseStorageName(traineeId: string, taskId: string): string {
  return `itp-node-${traineeId}-${taskId}`.replace(/[^A-Za-z0-9_-]/g, '_');
}

let pendingSaves: Promise<void> = Promise.resolve();

/** Resolves when the task that was just closed has finished saving its database. */
export function waitForPendingSaves(): Promise<void> {
  return pendingSaves;
}

function toPath(filename: string | Uint8Array): string {
  const text = typeof filename === 'string' ? filename : new TextDecoder().decode(filename);
  return text.replace(/^(\.\/|\/)+/, '');
}

function sameEntry(a: Entry, b: Entry): boolean {
  if (a === null || b === null) return a === b;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

function folderOf(path: string): string {
  const slash = path.lastIndexOf('/');
  return slash === -1 ? '' : path.slice(0, slash);
}

/**
 * Two tabs saving the same database would mix their files, so a tab saves only while it holds a
 * Web Lock for it. Returns the function that gives the lock back, or null if another tab has it.
 */
async function holdLock(name: string): Promise<(() => void) | null> {
  if (typeof navigator === 'undefined' || !('locks' in navigator)) return () => {};
  return new Promise((resolve) => {
    let release: () => void = () => {};
    const held = new Promise<void>((done) => {
      release = done;
    });
    navigator.locks
      .request(`itp-node-db:${name}`, { ifAvailable: true }, (lock) => {
        if (!lock) {
          resolve(null);
          return undefined;
        }
        resolve(release);
        return held;
      })
      .catch(() => resolve(null));
  });
}

/**
 * @param roots the paths to keep (folders or files), relative to the workspace folder
 */
export function createDatabaseSnapshots(
  fs: SnapshotFs,
  store: SnapshotStore,
  name: string,
  roots: string[]
): DatabaseSnapshots {
  let saved: Snapshot = new Map();
  let canSave = false;
  let isDisposed = false;
  let release: (() => void) | null = null;
  let watcher: { close(): void } | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let saving: Promise<void> = Promise.resolve();

  /** true for a root, anything in one, or a folder holding one (deleting it deletes the root) */
  const isRelevant = (path: string) =>
    roots.some(
      (root) => path === root || path.startsWith(`${root}/`) || root.startsWith(`${path}/`)
    );
  const isSkipped = (path: string) => SKIPPED_FILES.includes(path.slice(path.lastIndexOf('/') + 1));

  async function read(found: Snapshot, path: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(path, { withFileTypes: true });
    } catch {
      try {
        found.set(path, await fs.readFile(path));
      } catch {
        // gone
      }
      return;
    }
    found.set(path, null);
    await Promise.all(
      entries
        .map((entry) => `${path}/${entry.name}`)
        .filter((child) => !isSkipped(child))
        .map((child) => read(found, child))
    );
  }

  async function saveChanges(): Promise<void> {
    const found: Snapshot = new Map();
    for (const root of roots) await read(found, root);

    const writes: Snapshot = new Map();
    for (const [path, entry] of found) {
      const before = saved.get(path);
      if (before === undefined || !sameEntry(before, entry)) writes.set(path, entry);
    }
    const deletes = [...saved.keys()].filter((path) => !found.has(path));
    if (writes.size === 0 && deletes.length === 0) return;

    await store.save(name, writes, deletes);
    saved = found;
  }

  function queueSave(): void {
    saving = saving.then(saveChanges).catch((error: unknown) => {
      // Most likely the browser's storage is full. The task keeps working; it just isn't saved.
      console.warn("Couldn't save the task's database in this browser", error);
    });
  }

  function scheduleSave(): void {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      queueSave();
    }, SAVE_DELAY_MS);
  }

  function saveNow(): void {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
    queueSave();
  }

  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') saveNow(); // the tab may be closing
  };

  let opening: Promise<unknown> = Promise.resolve();

  async function restoreAndWatch(): Promise<{ restored: boolean; canSave: boolean }> {
    release = await holdLock(name);
    canSave = release !== null;

    saved = await store.load(name);
    const paths = [...saved.keys()].filter(isRelevant).sort();
    for (const path of paths) {
      const entry = saved.get(path);
      if (entry === undefined) continue;
      if (entry === null) {
        await fs.mkdir(path, { recursive: true });
      } else {
        const folder = folderOf(path);
        if (folder) await fs.mkdir(folder, { recursive: true });
        await fs.writeFile(path, entry);
      }
    }

    if (isDisposed) {
      return { restored: paths.length > 0, canSave: false };
    }
    if (canSave) {
      watcher = fs.watch('.', { recursive: true }, (_event, filename) => {
        if (!isDisposed && isRelevant(toPath(filename))) scheduleSave();
      });
      if (typeof document !== 'undefined') {
        document.addEventListener('visibilitychange', onVisibilityChange);
      }
    }
    return { restored: paths.length > 0, canSave };
  }

  return {
    open() {
      const result = restoreAndWatch();
      opening = result.catch(() => {});
      return result;
    },

    dispose() {
      if (isDisposed) return pendingSaves;
      isDisposed = true;
      watcher?.close();
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', onVisibilityChange);
      }
      saveNow();
      const done = opening.then(() => saving).finally(() => release?.());
      // The next task's resetWorkspace waits for this, so it doesn't delete files mid-save.
      pendingSaves = pendingSaves.then(() => done);
      return done;
    },
  };
}

// --- IndexedDB ---------------------------------------------------------------------------

const DB_NAME = 'itp-node-databases';
const FILES = 'files'; // key: [storage name, path], value: file bytes, or null for a folder

function request<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('IndexedDB request failed'));
  });
}

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    const open = indexedDB.open(DB_NAME, 1);
    open.onupgradeneeded = () => open.result.createObjectStore(FILES);
    dbPromise = request(open);
    dbPromise.catch(() => {
      dbPromise = null;
    });
  }
  return dbPromise;
}

const rangeFor = (name: string) => IDBKeyRange.bound([name, ''], [name, '￿']);

export const indexedDbSnapshotStore: SnapshotStore = {
  async load(name) {
    const db = await openDb();
    const files = db.transaction(FILES, 'readonly').objectStore(FILES);
    const [keys, values] = await Promise.all([
      request(files.getAllKeys(rangeFor(name))),
      request(files.getAll(rangeFor(name))),
    ]);
    const snapshot: Snapshot = new Map();
    keys.forEach((key, index) => {
      snapshot.set((key as [string, string])[1], values[index] as Entry);
    });
    return snapshot;
  },

  async save(name, writes, deletes) {
    const db = await openDb();
    const transaction = db.transaction(FILES, 'readwrite');
    const files = transaction.objectStore(FILES);
    for (const path of deletes) files.delete([name, path]);
    for (const [path, entry] of writes) files.put(entry, [name, path]);
    await new Promise<void>((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB save failed'));
      transaction.onabort = () => reject(transaction.error ?? new Error('IndexedDB save aborted'));
    });
  },
};

/** Whether this browser can save task databases */
export function canStoreDatabases(): boolean {
  return typeof indexedDB !== 'undefined';
}
