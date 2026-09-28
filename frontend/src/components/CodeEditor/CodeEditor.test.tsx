import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditorProvider, useEditorRef } from '../../pages/TaskPage/state/EditorContext';
import { ToastProvider } from '../../components/Toast';
import { fakeEditor, fakeMonaco } from '../../test/setup';
import CodeEditor from './CodeEditor';

const noop = () => {};

function Harness({ onChange = noop }: { onChange?: (path: string, content: string) => void }) {
  return (
    <ToastProvider>
      <EditorProvider>
        <CodeEditor
          taskId="t1"
          path="a.ts"
          onChange={onChange}
          onCursorChange={noop}
          onSave={noop}
          onRun={noop}
        />
      </EditorProvider>
    </ToastProvider>
  );
}

describe('CodeEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls onChange with the path and new value when typing in the stub', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);

    await user.type(screen.getByLabelText('a.ts code editor'), 'x');

    expect(onChange).toHaveBeenCalledWith('a.ts', expect.any(String));
  });

  it('stores the editor instance in the editor context on mount', async () => {
    // Renders a marker element reflecting whether the shared editor ref matches
    // fakeEditor, so the assertion reads the DOM instead of mutating an outside
    // variable during render (disallowed by this repo's react-hooks lint rules).
    // Mounted after CodeEditor so its effect observes the ref CodeEditor just set.
    function Marker() {
      const editorRef = useEditorRef();
      const [matched, setMatched] = useState(false);
      useEffect(() => {
        setMatched((editorRef.current as unknown) === fakeEditor);
      }, [editorRef]);
      return <div data-testid="captured">{matched ? 'matched' : 'not-matched'}</div>;
    }

    render(
      <ToastProvider>
        <EditorProvider>
          <CodeEditor
            taskId="t1"
            path="a.ts"
            onChange={noop}
            onCursorChange={noop}
            onSave={noop}
            onRun={noop}
          />
          <Marker />
        </EditorProvider>
      </ToastProvider>
    );

    expect(await screen.findByTestId('captured')).toHaveTextContent('matched');
  });

  it('adds two commands: save and run', () => {
    render(<Harness />);
    expect(fakeEditor.addCommand).toHaveBeenCalledTimes(2);
  });

  it('binds Run to Ctrl/Cmd+Enter, not plain Enter — plain Enter must stay a newline', () => {
    render(<Harness />);

    const keybindings = fakeEditor.addCommand.mock.calls.map(
      (call: unknown[]) => call[0] as number
    );
    expect(keybindings).toContain(fakeMonaco.KeyMod.CtrlCmd | fakeMonaco.KeyCode.Enter);
    expect(keybindings).not.toContain(fakeMonaco.KeyCode.Enter);
  });
});
