import { useCallback, useState } from 'react';
import { Table, MessageSquare } from 'lucide-react';
import type { TaskResponse } from '@itp/types';
import { useToast } from '../../components/Toast';
import ResultPaneFrame from '../../components/ResultPaneFrame';
import { useRegisterRunner } from '../runnerContext';

type SqlRuntimeProps = { task: TaskResponse };

export default function SqlRuntime({ task: _task }: SqlRuntimeProps) {
  const { show } = useToast();
  const [activeTab, setActiveTab] = useState('results');

  const run = useCallback(() => {
    show({ message: 'Coming in FE-09.', variant: 'info' });
  }, [show]);

  useRegisterRunner({
    canRun: true,
    label: 'Run SQL',
    title: 'Run (Ctrl+Enter)',
    isRunning: false,
    run,
  });

  return (
    <ResultPaneFrame
      tabs={[
        { id: 'results', label: 'Results', icon: Table },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <p>Not built yet</p>
    </ResultPaneFrame>
  );
}
