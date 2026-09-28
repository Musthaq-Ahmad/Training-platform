import type { TaskResponse } from '@itp/types';
import BrowserRuntime from './browser/BrowserRuntime';
import NodeRuntime from './node/NodeRuntime';
import SqlRuntime from './sql/SqlRuntime';

type RuntimeHostProps = { task: TaskResponse };

export default function RuntimeHost({ task }: RuntimeHostProps) {
  switch (task.runtime) {
    case 'browser':
      return <BrowserRuntime task={task} />;
    case 'node':
      return <NodeRuntime task={task} />;
    case 'sql':
      return <SqlRuntime task={task} />;
  }
}
