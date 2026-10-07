import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createFileSync, type FileSyncCallbacks, type WebContainerLike } from './fileSync';

type Listener = (event: 'rename' | 'change', filename: string | Uint8Array) => void;

/** An in-memory fs whose `watch` keeps the listener, so tests can fire events by hand. */
function createFakeContainer(initial: Record<string, string>) {
  const disk = new Map(Object.entries(initial));
  const folders = new Set<string>();
  let listener: Listener | null = null;
  const close = vi.fn();
  let folderReadsSucceed = false;

  const fs = {
    readFile: vi.fn((path: string) => {
      if (folders.has(path)) {
        return folderReadsSucceed
          ? Promise.resolve('')
          : Promise.reject(new Error(`EISDIR: ${path}`));
      }
      const content = disk.get(path);
      return content === undefined
        ? Promise.reject(
            Object.assign(new Error(`ENOENT: no such file, '${path}'`), { code: 'ENOENT' })
          )
        : Promise.resolve(content);
    }),
    readdir: vi.fn((path: string) =>
      folders.has(path)
        ? Promise.resolve([])
        : Promise.reject(Object.assign(new Error(`ENOTDIR: ${path}`), { code: 'ENOTDIR' }))
    ),

    writeFile: vi.fn((path: string, data: string) => {
      disk.set(path, data);
      return Promise.resolve();
    }),
    mkdir: vi.fn((path: string) => {
      folders.add(path);
      return Promise.resolve(path);
    }),
    rm: vi.fn((path: string) => {
      disk.delete(path);
      return Promise.resolve();
    }),
    watch: vi.fn((_path: string, _options: { recursive: boolean }, next: Listener) => {
      listener = next;
      return { close };
    }),
  };

  const wc: WebContainerLike = { fs };
  return {
    wc,
    fs,
    disk,
    folders,
    close,
    setFolderReadsSucceed(value: boolean) {
      folderReadsSucceed = value;
    },
    /** What the terminal would do: change the disk, then the watcher fires. */
    remoteWrite(path: string, content: string) {
      disk.set(path, content);
      listener?.('change', path);
    },
    remoteDelete(path: string) {
      disk.delete(path);
      listener?.('rename', path);
    },
    fire(filename: string | Uint8Array) {
      listener?.('change', filename);
    },
  };
}

function makeCallbacks() {
  return {
    onRemoteChange: vi.fn(),
    onRemoteDelete: vi.fn(),
    onSkipped: vi.fn(),
  } satisfies FileSyncCallbacks;
}

const initial = { 'package.json': '{}', 'src/sysinfo.js': 'old' };

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('createFileSync: editor → Node', () => {
  it('writes only changed files, after 200 ms, creating parent folders', async () => {
    const container = createFakeContainer(initial);
    const sync = createFileSync(container.wc, initial, makeCallbacks());

    sync.pushFromWorkspace({ ...initial, 'src/sysinfo.js': 'new', 'src/lib/util.js': 'u' });
    await vi.advanceTimersByTimeAsync(199);
    expect(container.fs.writeFile).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    expect(container.fs.writeFile).toHaveBeenCalledTimes(2);
    expect(container.fs.writeFile).toHaveBeenCalledWith('src/sysinfo.js', 'new');
    expect(container.fs.writeFile).toHaveBeenCalledWith('src/lib/util.js', 'u');
    expect(container.fs.mkdir).toHaveBeenCalledWith('src/lib', { recursive: true });
    expect(container.fs.writeFile).not.toHaveBeenCalledWith('package.json', expect.anything());
  });

  it('debounces typing: several quick changes give one write with the last text', async () => {
    const container = createFakeContainer(initial);
    const sync = createFileSync(container.wc, initial, makeCallbacks());

    sync.pushFromWorkspace({ ...initial, 'src/sysinfo.js': 'n' });
    await vi.advanceTimersByTimeAsync(100);
    sync.pushFromWorkspace({ ...initial, 'src/sysinfo.js': 'ne' });
    await vi.advanceTimersByTimeAsync(100);
    sync.pushFromWorkspace({ ...initial, 'src/sysinfo.js': 'new' });
    await vi.advanceTimersByTimeAsync(200);

    expect(container.fs.writeFile).toHaveBeenCalledTimes(1);
    expect(container.fs.writeFile).toHaveBeenCalledWith('src/sysinfo.js', 'new');
  });

  it('rm-s a file removed from the workspace', () => {
    const container = createFakeContainer(initial);
    const sync = createFileSync(container.wc, initial, makeCallbacks());

    sync.pushFromWorkspace({ 'package.json': '{}' });

    expect(container.fs.rm).toHaveBeenCalledWith('src/sysinfo.js', { force: true });
  });

  it('never pushes ignored paths', async () => {
    const container = createFakeContainer(initial);
    const sync = createFileSync(container.wc, initial, makeCallbacks());

    sync.pushFromWorkspace({ ...initial, 'node_modules/x/index.js': 'x', 'debug.log': 'x' });
    await vi.advanceTimersByTimeAsync(500);

    expect(container.fs.writeFile).not.toHaveBeenCalled();
  });
});

describe('createFileSync: Node → editor', () => {
  it('ignores the echo of its own write (echo test)', async () => {
    const container = createFakeContainer(initial);
    const callbacks = makeCallbacks();
    const sync = createFileSync(container.wc, initial, callbacks);

    sync.pushFromWorkspace({ ...initial, 'src/sysinfo.js': 'new' });
    await vi.advanceTimersByTimeAsync(200);
    container.fire('src/sysinfo.js'); // the watcher sees our write
    await vi.advanceTimersByTimeAsync(300);

    expect(callbacks.onRemoteChange).not.toHaveBeenCalled();
    expect(callbacks.onRemoteDelete).not.toHaveBeenCalled();
  });

  it('reports new content once, then pushing that same content writes nothing (no loop)', async () => {
    const container = createFakeContainer(initial);
    const callbacks = makeCallbacks();
    const sync = createFileSync(container.wc, initial, callbacks);

    container.remoteWrite('notes.txt', 'x\n');
    await vi.advanceTimersByTimeAsync(300);
    expect(callbacks.onRemoteChange).toHaveBeenCalledTimes(1);
    expect(callbacks.onRemoteChange).toHaveBeenCalledWith('notes.txt', 'x\n');

    // The workspace now has the file (NodeRuntime dispatched fileCreated) and pushes it back.
    sync.pushFromWorkspace({ ...initial, 'notes.txt': 'x\n' });
    await vi.advanceTimersByTimeAsync(500);
    expect(container.fs.writeFile).not.toHaveBeenCalled();
    expect(callbacks.onRemoteChange).toHaveBeenCalledTimes(1);
  });

  it('waits 300 ms and reads once for a burst of events on one path', async () => {
    const container = createFakeContainer(initial);
    const callbacks = makeCallbacks();
    createFileSync(container.wc, initial, callbacks);

    container.remoteWrite('out.txt', 'a');
    container.remoteWrite('out.txt', 'ab');
    await vi.advanceTimersByTimeAsync(299);
    expect(container.fs.readFile).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);

    expect(container.fs.readFile).toHaveBeenCalledTimes(1);
    expect(callbacks.onRemoteChange).toHaveBeenCalledWith('out.txt', 'ab');
  });

  it('reports a delete when a synced file is gone', async () => {
    const container = createFakeContainer(initial);
    const callbacks = makeCallbacks();
    createFileSync(container.wc, initial, callbacks);

    container.remoteDelete('src/sysinfo.js');
    await vi.advanceTimersByTimeAsync(300);

    expect(callbacks.onRemoteDelete).toHaveBeenCalledWith('src/sysinfo.js');
  });

  it('reports every synced file under a folder removed with rm -r', async () => {
    const container = createFakeContainer(initial);
    const callbacks = makeCallbacks();
    createFileSync(container.wc, initial, callbacks);

    container.disk.delete('src/sysinfo.js');
    container.fire('src');
    await vi.advanceTimersByTimeAsync(300);

    expect(callbacks.onRemoteDelete).toHaveBeenCalledWith('src/sysinfo.js');
  });

  it('ignores a folder event', async () => {
    const container = createFakeContainer(initial);
    const callbacks = makeCallbacks();
    createFileSync(container.wc, initial, callbacks);

    container.folders.add('newdir');
    container.fire('newdir');
    await vi.advanceTimersByTimeAsync(300);

    expect(callbacks.onRemoteChange).not.toHaveBeenCalled();
    expect(callbacks.onRemoteDelete).not.toHaveBeenCalled();
  });

  it('ignores a folder even when readFile on it succeeds with an empty string', async () => {
    const container = createFakeContainer(initial);
    const callbacks = makeCallbacks();
    createFileSync(container.wc, initial, callbacks);

    container.setFolderReadsSucceed(true);
    container.folders.add('prisma/migrations');
    container.folders.add('prisma/migrations/20261006062809_init');
    container.fire('prisma/migrations');
    container.fire('prisma/migrations/20261006062809_init');
    await vi.advanceTimersByTimeAsync(300);

    expect(callbacks.onRemoteChange).not.toHaveBeenCalled();
  });

  it('ignores node_modules events without reading them', async () => {
    const container = createFakeContainer(initial);
    const callbacks = makeCallbacks();
    createFileSync(container.wc, initial, callbacks);

    container.remoteWrite('node_modules/x/index.js', 'x');
    await vi.advanceTimersByTimeAsync(300);

    expect(container.fs.readFile).not.toHaveBeenCalled();
    expect(callbacks.onRemoteChange).not.toHaveBeenCalled();
  });

  it('accepts a filename given as bytes, with a leading ./', async () => {
    const container = createFakeContainer(initial);
    const callbacks = makeCallbacks();
    createFileSync(container.wc, initial, callbacks);

    container.disk.set('jest.config.js', 'module.exports = {};');
    container.fire(new TextEncoder().encode('./jest.config.js'));
    await vi.advanceTimersByTimeAsync(300);

    expect(callbacks.onRemoteChange).toHaveBeenCalledWith('jest.config.js', 'module.exports = {};');
  });

  it("skips a 200,001-character file as 'too-large', once", async () => {
    const container = createFakeContainer(initial);
    const callbacks = makeCallbacks();
    createFileSync(container.wc, initial, callbacks);

    container.remoteWrite('data.json', 'x'.repeat(200_001));
    await vi.advanceTimersByTimeAsync(300);
    container.remoteWrite('data.json', 'y'.repeat(200_002));
    await vi.advanceTimersByTimeAsync(300);

    expect(callbacks.onSkipped).toHaveBeenCalledTimes(1);
    expect(callbacks.onSkipped).toHaveBeenCalledWith('data.json', 'too-large');
    expect(callbacks.onRemoteChange).not.toHaveBeenCalled();
  });

  it("skips an image as 'binary'", async () => {
    const container = createFakeContainer(initial);
    const callbacks = makeCallbacks();
    createFileSync(container.wc, initial, callbacks);

    container.remoteWrite('chart.png', '�PNG');
    await vi.advanceTimersByTimeAsync(300);

    expect(callbacks.onSkipped).toHaveBeenCalledWith('chart.png', 'binary');
  });
});

describe('createFileSync: dispose', () => {
  it('closes the watcher and cancels pending work', async () => {
    const container = createFakeContainer(initial);
    const callbacks = makeCallbacks();
    const sync = createFileSync(container.wc, initial, callbacks);

    sync.pushFromWorkspace({ ...initial, 'src/sysinfo.js': 'new' });
    container.remoteWrite('notes.txt', 'x');
    sync.dispose();
    await vi.advanceTimersByTimeAsync(500);

    expect(container.close).toHaveBeenCalledTimes(1);
    expect(container.fs.writeFile).not.toHaveBeenCalled();
    expect(callbacks.onRemoteChange).not.toHaveBeenCalled();
  });
});
