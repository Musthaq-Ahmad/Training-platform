import { createContext, useContext, useRef, type ReactNode, type RefObject } from 'react';
import type { editor } from 'monaco-editor';

type EditorRef = RefObject<editor.IStandaloneCodeEditor | null>;

const EditorRefContext = createContext<EditorRef | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  return <EditorRefContext.Provider value={editorRef}>{children}</EditorRefContext.Provider>;
}

export function useEditorRef(): EditorRef {
  const ref = useContext(EditorRefContext);
  if (!ref) throw new Error('useEditorRef must be used within an EditorProvider');
  return ref;
}
