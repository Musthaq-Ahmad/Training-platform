import { useCallback, useState } from 'react';
import { SquareTerminal, Eye } from 'lucide-react';
import type { TaskResponse } from '@itp/types';
import { useToast } from '../../components/Toast';
import ResultPaneFrame from '../../components/ResultPaneFrame';
import { useRegisterRunner } from '../runnerContext';

type NodeRuntimeProps = { task: TaskResponse };

export default function NodeRuntime({ task }: NodeRuntimeProps) {
  const { show } = useToast();
  const [activeTab, setActiveTab] = useState('terminal');

  const run = useCallback(() => {
    show({ message: 'Coming in FE-08.', variant: 'info' });
  }, [show]);

  useRegisterRunner({
    canRun: true,
    label: task.runCommand ? `Run: ${task.runCommand}` : 'Run',
    title: 'Run (Ctrl+Enter)',
    isRunning: false,
    run,
  });

  return (
    <ResultPaneFrame
      tabs={[
        { id: 'terminal', label: 'Terminal', icon: SquareTerminal },
        { id: 'preview', label: 'Preview', icon: Eye },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <p>Not built yet</p>
    </ResultPaneFrame>
  );
}
