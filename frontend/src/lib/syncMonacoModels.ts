import { toModelUri } from './monacoConfig';
import { getFileType } from './fileTypes';
import { isIgnoredPath } from './workspaceIgnore';

export type ModelLike = {
  uri: { toString(): string };
  getValue(): string;
  setValue(value: string): void;
  dispose(): void;
};

export type MonacoLike = {
  editor: {
    getModel(uri: unknown): ModelLike | null;
    createModel(value: string, language: string, uri: unknown): ModelLike;
    getModels(): ModelLike[];
  };
  Uri: { parse(value: string): unknown };
};

const WORKSPACE_PREFIX = 'file:///workspace/';

/** Make Monaco's models match `files`: create missing ones, update changed ones, dispose removed ones. */
export function syncMonacoModels(
  monaco: MonacoLike,
  files: Record<string, string>,
  skipUri?: string
): void {
  const keptUris = new Set<string>();

  for (const [path, content] of Object.entries(files)) {
    if (isIgnoredPath(path)) continue;
    const fileType = getFileType(path);
    if (!fileType.isText) continue;

    const modelUri = toModelUri(path);
    keptUris.add(modelUri);

    const uri = monaco.Uri.parse(modelUri);
    const existing = monaco.editor.getModel(uri);

    if (!existing) {
      monaco.editor.createModel(content, fileType.monacoLanguage, uri);
    } else if (modelUri !== skipUri && existing.getValue() !== content) {
      existing.setValue(content);
    }
  }

  for (const model of monaco.editor.getModels()) {
    const uriString = model.uri.toString();
    if (uriString.startsWith(WORKSPACE_PREFIX) && !keptUris.has(uriString)) {
      model.dispose();
    }
  }
}
