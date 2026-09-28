import { describe, it, expect, vi } from 'vitest';
import { syncMonacoModels, type MonacoLike, type ModelLike } from './syncMonacoModels';

function createFakeMonaco() {
  const models = new Map<string, ModelLike>();

  const monaco: MonacoLike = {
    Uri: { parse: (value: string) => value },
    editor: {
      getModel: (uri) => models.get(uri as string) ?? null,
      createModel: (value, language, uri) => {
        let current = value;
        const model: ModelLike = {
          uri: { toString: () => uri as string },
          getValue: vi.fn(() => current),
          setValue: vi.fn((next: string) => {
            current = next;
          }),
          dispose: vi.fn(() => models.delete(uri as string)),
        };
        Object.assign(model, { language });
        models.set(uri as string, model);
        return model;
      },
      getModels: () => [...models.values()],
    },
  };

  return { monaco, models };
}

describe('syncMonacoModels', () => {
  it('creates a model for each text file with the right language', () => {
    const { monaco } = createFakeMonaco();

    syncMonacoModels(monaco, { 'a.ts': 'const x = 1;', 'b.css': 'body {}' });

    const models = monaco.editor.getModels();
    expect(models).toHaveLength(2);
    expect(models.map((m) => m.uri.toString()).sort()).toEqual([
      'file:///workspace/a.ts',
      'file:///workspace/b.css',
    ]);
  });

  it('skips ignored paths and images', () => {
    const { monaco } = createFakeMonaco();

    syncMonacoModels(monaco, {
      'node_modules/a.js': 'ignored',
      'logo.png': 'binary',
      'index.ts': 'ok',
    });

    expect(monaco.editor.getModels()).toHaveLength(1);
    expect(monaco.editor.getModels()[0].uri.toString()).toBe('file:///workspace/index.ts');
  });

  it('calls setValue only when the text differs', () => {
    const { monaco } = createFakeMonaco();

    syncMonacoModels(monaco, { 'a.ts': 'const x = 1;' });
    const model = monaco.editor.getModels()[0];

    syncMonacoModels(monaco, { 'a.ts': 'const x = 1;' });
    // eslint-disable-next-line @typescript-eslint/unbound-method -- vi.fn() mocks don't use `this`
    expect(model.setValue).not.toHaveBeenCalled();

    syncMonacoModels(monaco, { 'a.ts': 'const x = 2;' });
    // eslint-disable-next-line @typescript-eslint/unbound-method -- vi.fn() mocks don't use `this`
    expect(model.setValue).toHaveBeenCalledWith('const x = 2;');
  });

  it('disposes a model whose file is gone', () => {
    const { monaco } = createFakeMonaco();

    syncMonacoModels(monaco, { 'a.ts': 'x', 'b.ts': 'y' });
    syncMonacoModels(monaco, { 'a.ts': 'x' });

    expect(monaco.editor.getModels()).toHaveLength(1);
    expect(monaco.editor.getModels()[0].uri.toString()).toBe('file:///workspace/a.ts');
  });

  it('leaves models outside file:///workspace/ alone', () => {
    const { monaco, models } = createFakeMonaco();
    const outsideModel: ModelLike = {
      uri: { toString: () => 'file:///other/thing.ts' },
      getValue: () => '',
      setValue: vi.fn(),
      dispose: vi.fn(),
    };
    models.set('file:///other/thing.ts', outsideModel);

    syncMonacoModels(monaco, {});

    // eslint-disable-next-line @typescript-eslint/unbound-method -- vi.fn() mocks don't use `this`
    expect(outsideModel.dispose).not.toHaveBeenCalled();
    expect(monaco.editor.getModels()).toContain(outsideModel);
  });
});
