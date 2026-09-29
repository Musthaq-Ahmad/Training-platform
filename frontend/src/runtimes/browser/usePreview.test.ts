import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { buildPreviewDocument, type PreviewBuild } from './buildPreviewDocument';
import { usePreview } from './usePreview';

vi.mock('./buildPreviewDocument', () => ({ buildPreviewDocument: vi.fn() }));

const files = {
  'index.html': '<h1>Home</h1><a href="about.html">About</a>',
  'about.html': '<h1>About</h1>',
};

let iframe: HTMLIFrameElement;

function okBuild(runId: string, entryPath: string): PreviewBuild {
  return {
    ok: true,
    srcdoc: '<!DOCTYPE html>',
    runId,
    entryPath,
    durationMs: 3,
    inlined: [entryPath],
    missing: [],
    warnings: [],
  };
}

function renderPreview(isVisible = true, taskId = 't1') {
  return renderHook(
    (props: { isVisible: boolean }) =>
      usePreview({
        taskId,
        files,
        defaultEntry: 'index.html',
        isVisible: props.isVisible,
        iframeRef: { current: iframe },
      }),
    { initialProps: { isVisible } }
  );
}

/** Run id of the nth build (0-based) */
function runIdOf(call = vi.mocked(buildPreviewDocument).mock.calls.length - 1): string {
  return vi.mocked(buildPreviewDocument).mock.calls[call][2].runId;
}

function postFromPreview(
  data: Record<string, unknown>,
  source: Window | null = iframe.contentWindow
) {
  act(() => {
    window.dispatchEvent(new MessageEvent('message', { data: { __itp: true, ...data }, source }));
  });
}

beforeEach(() => {
  window.localStorage.clear();
  iframe = document.createElement('iframe');
  document.body.append(iframe);
  vi.mocked(buildPreviewDocument).mockReset();
  vi.mocked(buildPreviewDocument).mockImplementation((_files, entry, options) =>
    Promise.resolve(okBuild(options.runId, entry ?? ''))
  );
});

afterEach(() => {
  iframe.remove();
});

describe('usePreview', () => {
  it('runs automatically the first time it becomes visible, and only then', async () => {
    const { result, rerender } = renderPreview(false);
    expect(buildPreviewDocument).not.toHaveBeenCalled();

    rerender({ isVisible: true });
    await waitFor(() => expect(result.current.build?.ok).toBe(true));
    expect(buildPreviewDocument).toHaveBeenCalledTimes(1);
    expect(vi.mocked(buildPreviewDocument).mock.calls[0][1]).toBe('index.html');

    rerender({ isVisible: false });
    rerender({ isVisible: true });
    expect(buildPreviewDocument).toHaveBeenCalledTimes(1);
  });

  it('turns console messages into entries', async () => {
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.build).not.toBeNull());

    postFromPreview({
      runId: runIdOf(),
      type: 'console',
      level: 'log',
      args: ['a', '{b: 1}'],
      ts: 5,
    });
    expect(result.current.entries).toEqual([
      { id: expect.any(Number) as number, ts: 5, level: 'log', text: 'a {b: 1}' },
    ]);
  });

  it('ignores a message from another source', async () => {
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.build).not.toBeNull());

    postFromPreview(
      { runId: runIdOf(), type: 'console', level: 'log', args: ['x'], ts: 1 },
      window
    );
    expect(result.current.entries).toEqual([]);
  });

  it('ignores a message from an old run', async () => {
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.build).not.toBeNull());
    const oldRunId = runIdOf();

    act(() => result.current.run());
    await waitFor(() => expect(buildPreviewDocument).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(result.current.isRunning).toBe(false));

    postFromPreview({ runId: oldRunId, type: 'console', level: 'log', args: ['stale'], ts: 1 });
    expect(result.current.entries).toEqual([]);
  });

  it('ignores messages that fail the type check', async () => {
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.build).not.toBeNull());

    postFromPreview({ runId: runIdOf(), type: 'console', level: 'log', args: [1], ts: 1 });
    expect(result.current.entries).toEqual([]);
  });

  it('counts error, runtime and build entries in errorCount', async () => {
    vi.mocked(buildPreviewDocument).mockResolvedValueOnce({
      ok: false,
      reason: 'BUILD_ERROR',
      message: 'Build failed',
      issues: [{ file: 'js/main.js', line: 4, column: 10, message: "Cannot find './utl'" }],
    });
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.build).not.toBeNull());
    expect(result.current.entries[0]).toMatchObject({
      level: 'build',
      text: "js/main.js:4:10 — Cannot find './utl'",
    });

    const runId = runIdOf();
    postFromPreview({ runId, type: 'console', level: 'error', args: ['bad'], ts: 1 });
    postFromPreview({ runId, type: 'console', level: 'warn', args: ['meh'], ts: 1 });
    postFromPreview({
      runId,
      type: 'runtime-error',
      message: 'Uncaught TypeError: x is undefined',
      source: 'script.js',
      line: 12,
      ts: 1,
    });

    expect(result.current.errorCount).toBe(3);
    expect(result.current.entries[3]).toMatchObject({ level: 'runtime', source: 'script.js:12' });
  });

  it('adds a system entry for each missing file and warning', async () => {
    vi.mocked(buildPreviewDocument).mockImplementationOnce((_files, entry, options) =>
      Promise.resolve({
        ...okBuild(options.runId, entry ?? ''),
        missing: ['styles.css'],
        warnings: ['External scripts are blocked in the preview: https://x.test/a.js'],
      } as PreviewBuild)
    );
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.entries).toHaveLength(2));

    expect(result.current.entries.map((entry) => [entry.level, entry.text])).toEqual([
      ['system', 'styles.css not found'],
      ['system', 'External scripts are blocked in the preview: https://x.test/a.js'],
    ]);
  });

  it('empties the console on console-clear', async () => {
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.build).not.toBeNull());

    postFromPreview({ runId: runIdOf(), type: 'console', level: 'log', args: ['a'], ts: 1 });
    postFromPreview({ runId: runIdOf(), type: 'console-clear' });
    expect(result.current.entries).toEqual([]);
  });

  it('sets isDomReady on dom-ready', async () => {
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.build).not.toBeNull());
    expect(result.current.isDomReady).toBe(false);

    postFromPreview({ runId: runIdOf(), type: 'dom-ready', ms: 12 });
    expect(result.current.isDomReady).toBe(true);
  });

  it('switches the entry and runs on navigate to a workspace page', async () => {
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.build).not.toBeNull());

    postFromPreview({ runId: runIdOf(), type: 'navigate', href: 'about.html#team' });

    expect(result.current.entryPath).toBe('about.html');
    await waitFor(() => expect(buildPreviewDocument).toHaveBeenCalledTimes(2));
    expect(vi.mocked(buildPreviewDocument).mock.calls[1][1]).toBe('about.html');
  });

  it('adds a system entry on navigate to a page that does not exist', async () => {
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.build).not.toBeNull());

    postFromPreview({ runId: runIdOf(), type: 'navigate', href: 'contact.html' });

    expect(result.current.entryPath).toBe('index.html');
    expect(result.current.entries[0]).toMatchObject({
      level: 'system',
      text: 'contact.html not found',
    });
    expect(buildPreviewDocument).toHaveBeenCalledTimes(1);
  });

  it('saves a storage message under itp.preview.storage.<taskId> and passes it to the next build', async () => {
    const { result } = renderPreview(true, 't-browser');
    await waitFor(() => expect(result.current.build).not.toBeNull());

    postFromPreview({ runId: runIdOf(), type: 'storage', op: 'set', key: 'theme', value: 'dark' });
    expect(
      JSON.parse(window.localStorage.getItem('itp.preview.storage.t-browser') ?? '{}')
    ).toEqual({
      theme: 'dark',
    });

    act(() => result.current.run());
    await waitFor(() => expect(buildPreviewDocument).toHaveBeenCalledTimes(2));
    expect(vi.mocked(buildPreviewDocument).mock.calls[1][2].storage).toEqual({ theme: 'dark' });
  });

  it('starts from the stored values after a page reload', async () => {
    window.localStorage.setItem('itp.preview.storage.t1', JSON.stringify({ theme: 'dark' }));
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.build).not.toBeNull());

    expect(vi.mocked(buildPreviewDocument).mock.calls[0][2].storage).toEqual({ theme: 'dark' });
  });

  it('empties the stored values on resetStorage', async () => {
    window.localStorage.setItem('itp.preview.storage.t1', JSON.stringify({ theme: 'dark' }));
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.build).not.toBeNull());

    act(() => result.current.resetStorage());
    expect(window.localStorage.getItem('itp.preview.storage.t1')).toBeNull();

    act(() => result.current.run());
    await waitFor(() => expect(buildPreviewDocument).toHaveBeenCalledTimes(2));
    expect(vi.mocked(buildPreviewDocument).mock.calls[1][2].storage).toEqual({});
  });

  it('keeps at most 1,000 console entries', async () => {
    const { result } = renderPreview();
    await waitFor(() => expect(result.current.build).not.toBeNull());

    const runId = runIdOf();
    for (let i = 0; i < 1005; i += 1) {
      postFromPreview({ runId, type: 'console', level: 'log', args: [String(i)], ts: 1 });
    }
    expect(result.current.entries).toHaveLength(1000);
    expect(result.current.entries[0].text).toBe('5');
  });

  it('builds the latest files on Run', async () => {
    const { result, rerender } = renderHook(
      (props: { files: Record<string, string> }) =>
        usePreview({
          taskId: 't1',
          files: props.files,
          defaultEntry: 'index.html',
          isVisible: true,
          iframeRef: { current: iframe },
        }),
      { initialProps: { files } }
    );
    await waitFor(() => expect(result.current.build).not.toBeNull());

    const edited = { ...files, 'index.html': '<h1>Edited</h1>' };
    rerender({ files: edited });
    act(() => result.current.run());
    await waitFor(() => expect(buildPreviewDocument).toHaveBeenCalledTimes(2));
    expect(vi.mocked(buildPreviewDocument).mock.calls[1][0]).toBe(edited);
  });
});
