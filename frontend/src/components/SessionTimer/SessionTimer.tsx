import { Clock } from 'lucide-react';
import { useSessionTimer } from '../../hooks/useSessionTimer';
import { describeElapsed, formatElapsed } from '../../lib/formatElapsed';
import styles from './SessionTimer.module.css';

/** Time spent on the open task in this visit. Give it `key={taskId}` so it restarts per task. */
export default function SessionTimer() {
  const elapsedSeconds = useSessionTimer();

  return (
    <span
      className={styles.timer}
      role="timer"
      aria-label={`Time on this task: ${describeElapsed(elapsedSeconds)}`}
      title="Time on this task. Pauses when you leave the tab."
    >
      <Clock size={14} aria-hidden="true" />
      <span className={styles.value}>{formatElapsed(elapsedSeconds)}</span>
    </span>
  );
}
