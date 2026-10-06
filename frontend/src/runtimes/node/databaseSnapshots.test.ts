import { describe, expect, it } from 'vitest';
import {
  createDatabaseSnapshots,
  nodeDatabaseStorageName,
  waitForPendingSaves,
  type Snapshot,
  type SnapshotFs,
  type SnapshotStore,
} from './databaseSnapshots';

const ROOTS = ['.vinkup/db/dev', '.vinkup/db/dev.schema-hash'];
const bytes = (text: string) => new TextEncoder().encode(text);
const text = (entry: Uint8Array | null | undefined) =>
  entry ? new TextDecoder().decode(entry) : entry;

/** WebContainer's file system in a Map: a folder is null, a file holds its bytes. */
function fakeFs(initial: Record<string, string | null> = {}) {
  const entries = new Map<string, Uint8Array | null>();
  const listeners: Array<(event: 'rename' | 'change', filename: string) => void> = [];
  const emit = (path: string) => listeners.forEach((listener) => listener('change', path));
  const addFolders = (path: string) => {
    const parts = path.split('/');
    for (let i = 1; i <= parts.length; i++) entries.set(parts.slice(0, i).join('/'), null);
  };
  const fs: SnapshotFs & {
    entries: typeof entries;
    write(path: string, content: string): void;
    remove(path: string): void;
  } = {
    entries,
    readFile(path) {
      const entry = entries.get(path);
      if (!entry) {
        return Promise.reject(new Error(`ENOENT or EISDIR: ${path}`));
      }
      return Promise.resolve(entry);
    },
    readdir(path) {
      if (entries.get(path) !== null) return Promise.reject(new Error(`ENOTDIR: ${path}`));
      return Promise.resolve(
        [...entries.keys()]
          .filter((key) => key.startsWith(`${path}/`) && !key.slice(path.length + 1).includes('/'))
          .map((key) => ({
            name: key.slice(path.length + 1),
            isDirectory: () => entries.get(key) === null,
          }))
      );
    },
    writeFile(path, data) {
      fs.write(path, new TextDecoder().decode(data));
      return Promise.resolve();
    },
    mkdir(path) {
      addFolders(path);
      return Promise.resolve();
    },
    watch(_path, _options, listener) {
      listeners.push(listener);
      return { close: () => listeners.splice(listeners.indexOf(listener), 1) };
    },
    write(path, content) {
      const slash = path.lastIndexOf('/');
      if (slash !== -1) addFolders(path.slice(0, slash));
      entries.set(path, bytes(content));
      emit(path);
    },
    remove(path) {
      for (const key of [...entries.keys()]) {
        if (key === path || key.startsWith(`${path}/`)) entries.delete(key);
      }
      emit(path);
    },
  };
  for (const [path, content] of Object.entries(initial)) {
    if (content === null) addFolders(path);
    else fs.write(path, content);
  }
  return fs;
}

function fakeStore(initial: Record<string, string | null> = {}) {
  let saved: Snapshot = new Map(
    Object.entries(initial).map(([path, content]) => [
      path,
      content === null ? null : bytes(content),
    ])
  );
  const saves: Array<{ writes: string[]; deletes: string[] }> = [];
  const store: SnapshotStore = {
    load() {
      return Promise.resolve(new Map(saved));
    },
    save(_name, writes, deletes) {
      saves.push({ writes: [...writes.keys()].sort(), deletes: [...deletes].sort() });
      saved = new Map(saved);
      for (const path of deletes) saved.delete(path);
      for (const [path, entry] of writes) saved.set(path, entry);
      return Promise.resolve();
    },
  };
  return { store, saves, saved: () => saved };
}

describe('nodeDatabaseStorageName', () => {
  it('is safe to use as an IndexedDB key', () => {
    expect(nodeDatabaseStorageName('u 1', 'prisma-day-01-t-1')).toBe(
      'itp-node-u_1-prisma-day-01-t-1'
    );
  });
});

describe('createDatabaseSnapshots', () => {
  it('writes the saved database back, including empty folders', async () => {
    const fs = fakeFs();
    const { store } = fakeStore({
      '.vinkup/db/dev': null,
      '.vinkup/db/dev/pg_tblspc': null,
      '.vinkup/db/dev/PG_VERSION': '17',
      '.vinkup/db/dev.schema-hash': 'abc',
      '.vinkup/db/test/PG_VERSION': 'not ours',
    });

    const result = await createDatabaseSnapshots(fs, store, 'db', ROOTS).open();

    expect(result).toEqual({ restored: true, canSave: true });
    expect(fs.entries.get('.vinkup/db/dev/pg_tblspc')).toBe(null);
    expect(text(fs.entries.get('.vinkup/db/dev/PG_VERSION'))).toBe('17');
    expect(text(fs.entries.get('.vinkup/db/dev.schema-hash'))).toBe('abc');
    expect(fs.entries.has('.vinkup/db/test/PG_VERSION')).toBe(false);
  });

  it('reports nothing restored the first time', async () => {
    const result = await createDatabaseSnapshots(fakeFs(), fakeStore().store, 'db', ROOTS).open();
    expect(result).toEqual({ restored: false, canSave: true });
  });

  it('saves only what changed, without the lock files', async () => {
    const fs = fakeFs();
    const { store, saves, saved } = fakeStore({
      '.vinkup/db/dev': null,
      '.vinkup/db/dev/PG_VERSION': '17',
      '.vinkup/db/dev/base': null,
      '.vinkup/db/dev/base/1': 'old rows',
      '.vinkup/db/dev/base/2': 'dropped table',
    });
    const snapshots = createDatabaseSnapshots(fs, store, 'db', ROOTS);
    await snapshots.open();

    fs.write('.vinkup/db/dev/base/1', 'new rows');
    fs.remove('.vinkup/db/dev/base/2');
    fs.write('.vinkup/db/dev/postmaster.pid', '42');
    await snapshots.dispose();

    expect(saves).toEqual([
      { writes: ['.vinkup/db/dev/base/1'], deletes: ['.vinkup/db/dev/base/2'] },
    ]);
    expect(text(saved().get('.vinkup/db/dev/base/1'))).toBe('new rows');
    expect(saved().has('.vinkup/db/dev/postmaster.pid')).toBe(false);
  });

  it('removes the saved copy when the database folder is deleted (db:reset)', async () => {
    const fs = fakeFs();
    const { store, saved } = fakeStore({
      '.vinkup/db/dev': null,
      '.vinkup/db/dev/PG_VERSION': '17',
      '.vinkup/db/dev.schema-hash': 'abc',
    });
    const snapshots = createDatabaseSnapshots(fs, store, 'db', ROOTS);
    await snapshots.open();

    fs.remove('.vinkup/db');
    await snapshots.dispose();

    expect([...saved().keys()]).toEqual([]);
  });

  it('saves a database created after the task opened', async () => {
    const fs = fakeFs();
    const { store, saved } = fakeStore();
    const snapshots = createDatabaseSnapshots(fs, store, 'db', ROOTS);
    await snapshots.open();

    fs.write('.vinkup/db/dev/PG_VERSION', '17');
    fs.write('.vinkup/db/dev.schema-hash', 'abc');
    await snapshots.dispose();

    expect([...saved().keys()].sort()).toEqual([
      '.vinkup/db/dev',
      '.vinkup/db/dev.schema-hash',
      '.vinkup/db/dev/PG_VERSION',
    ]);
  });

  it("doesn't save for changes elsewhere in the workspace", async () => {
    const fs = fakeFs();
    const { store, saves } = fakeStore();
    const snapshots = createDatabaseSnapshots(fs, store, 'db', ROOTS);
    await snapshots.open();

    fs.write('src/app.ts', 'export {}');
    fs.write('.vinkup/db/test/PG_VERSION', '17');
    await snapshots.dispose();

    expect(saves).toEqual([]);
  });

  it('lets the next task wait until the last changes are saved', async () => {
    const fs = fakeFs();
    const { store, saved } = fakeStore();
    const snapshots = createDatabaseSnapshots(fs, store, 'db', ROOTS);
    await snapshots.open();

    fs.write('.vinkup/db/dev/PG_VERSION', '17');
    void snapshots.dispose();
    await waitForPendingSaves();

    expect(saved().has('.vinkup/db/dev/PG_VERSION')).toBe(true);
  });
});
