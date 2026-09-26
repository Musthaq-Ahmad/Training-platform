import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import type { TaskCodeResponse } from '@itp/types';
import { initWorkspace } from './initWorkspace';
import { workspaceReducer } from './workspaceReducer';
import type { PaneId, WorkspaceAction, WorkspaceState } from '../../../types/workspaceTypes';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const PANES_STORAGE_KEY = 'itp.task.panes';

const WorkspaceStateContext = createContext<WorkspaceState | null>(null);
const WorkspaceDispatchContext = createContext<Dispatch<WorkspaceAction> | null>(null);

type WorkspaceProviderProps = {
  code: TaskCodeResponse;
  children: ReactNode;
};

export function WorkspaceProvider({ code, children }: WorkspaceProviderProps) {
  const [storedPanes, setStoredPanes] = useLocalStorageState<Record<PaneId, boolean> | undefined>(
    PANES_STORAGE_KEY,
    undefined
  );

  const [state, dispatch] = useReducer(workspaceReducer, code, (initialCode) =>
    initWorkspace(initialCode, storedPanes)
  );

  useEffect(() => {
    setStoredPanes(state.visiblePanes);
  }, [state.visiblePanes, setStoredPanes]);

  return (
    <WorkspaceStateContext.Provider value={state}>
      <WorkspaceDispatchContext.Provider value={dispatch}>
        {children}
      </WorkspaceDispatchContext.Provider>
    </WorkspaceStateContext.Provider>
  );
}

export function useWorkspaceState(): WorkspaceState {
  const state = useContext(WorkspaceStateContext);
  if (!state) throw new Error('useWorkspaceState must be used within a WorkspaceProvider');

  return state;
}

export function useWorkspaceDispatch(): Dispatch<WorkspaceAction> {
  const dispatch = useContext(WorkspaceDispatchContext);
  if (!dispatch) throw new Error('useWorkspaceDispatch must be used within a WorkspaceProvider');
  return dispatch;
}
