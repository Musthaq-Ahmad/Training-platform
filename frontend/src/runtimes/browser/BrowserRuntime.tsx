import { useCallback, useState } from 'react';
import { MonitorPlay, Terminal } from 'lucide-react';
import type { TaskResponse } from '@itp/types';
import { useToast } from '../../components/Toast';
import ResultPaneFrame from '../../components/ResultPaneFrame';
import { useRegisterRunner } from '../runnerContext';

type BrowserRuntimeProps = { task: TaskResponse };

export default function BrowserRuntime({ task: _task }: BrowserRuntimeProps) {
  const { show } = useToast();
  const [activeTab, setActiveTab] = useState('result');

  const run = useCallback(() => {
    show({ message: 'Coming in FE-07.', variant: 'info' });
  }, [show]);

  useRegisterRunner({
    canRun: true,
    label: 'Run',
    title: 'Run (Ctrl+Enter)',
    isRunning: false,
    run,
  });

  return (
    <ResultPaneFrame
      tabs={[
        { id: 'result', label: 'Result', icon: MonitorPlay },
        { id: 'console', label: 'Console', icon: Terminal },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <p>Not built yet</p>
    </ResultPaneFrame>
  );
}
