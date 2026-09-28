import { useEffect } from 'react';
import { useMonaco } from '@monaco-editor/react';
import { syncMonacoModels } from '../../../lib/syncMonacoModels';

const WORKSPACE_PREFIX = 'file:///workspace/';

export function useMonacoModels(files: Record<string, string>): void {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;
    syncMonacoModels(monaco, files);
  }, [monaco, files]);

  useEffect(() => {
    if (!monaco) return;
    return () => {
      for (const model of monaco.editor.getModels()) {
        if (model.uri.toString().startsWith(WORKSPACE_PREFIX)) model.dispose();
      }
    };
  }, [monaco]);
}
