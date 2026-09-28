import { useEffect } from 'react';
import { useMonaco } from '@monaco-editor/react';
import { syncMonacoModels } from '../../../lib/syncMonacoModels';
import { useEditorRef } from '../state/EditorContext';

const WORKSPACE_PREFIX = 'file:///workspace/';

export function useMonacoModels(files: Record<string, string>): void {
  const monaco = useMonaco();
  const editorRef = useEditorRef();

  useEffect(() => {
    if (!monaco) return;
    const editor = editorRef.current;
    const skipUri = editor?.hasTextFocus() ? editor.getModel()?.uri.toString() : undefined;
    syncMonacoModels(monaco, files, skipUri);
  }, [monaco, files, editorRef]);

  useEffect(() => {
    if (!monaco) return;
    return () => {
      for (const model of monaco.editor.getModels()) {
        if (model.uri.toString().startsWith(WORKSPACE_PREFIX)) model.dispose();
      }
    };
  }, [monaco]);
}
