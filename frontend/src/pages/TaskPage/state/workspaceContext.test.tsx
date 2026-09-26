import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, render, screen } from '@testing-library/react';
import { WorkspaceProvider, useWorkspaceState, useWorkspaceDispatch } from './WorkspaceContext';
import { taskCodeFixture } from '../../../test/fixtures/task';

beforeEach(() => window.localStorage.clear());

describe('WorkspaceContext', () => {
  it('throws when useWorkspaceState is used outside the provider', () => {
    expect(() => renderHook(() => useWorkspaceState())).toThrow(
      /must be used within a WorkspaceProvider/
    );
  });

  it('throws when useWorkspaceDispatch is used outside the provider', () => {
    expect(() => renderHook(() => useWorkspaceDispatch())).toThrow(
      /must be used within a WorkspaceProvider/
    );
  });

  it('restores previously stored pane visibility on mount', () => {
    window.localStorage.setItem(
      'itp.task.panes',
      JSON.stringify({ sidebar: false, code: true, result: true })
    );

    function Probe() {
      const state = useWorkspaceState();
      return <span>{JSON.stringify(state.visiblePanes)}</span>;
    }

    render(
      <WorkspaceProvider code={taskCodeFixture}>
        <Probe />
      </WorkspaceProvider>
    );

    expect(
      screen.getByText(JSON.stringify({ sidebar: false, code: true, result: true }))
    ).toBeInTheDocument();
  });
});
