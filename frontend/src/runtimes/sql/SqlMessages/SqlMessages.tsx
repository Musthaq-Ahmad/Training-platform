import type { SqlRun } from '../useSqlRunner';
import styles from './SqlMessages.module.css';

type SqlMessagesProps = { history: SqlRun[] };

/** 14:32:05 */
function formatTime(date: Date): string {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((part) => String(part).padStart(2, '0'))
    .join(':');
}

function RunRows({ run }: { run: SqlRun }) {
  const time = <span className={styles.time}>{formatTime(run.at)}</span>;

  if (run.runError !== null) {
    return (
      <div className={`${styles.row} ${styles.error}`}>
        {time}
        <span className={styles.message}>{run.runError}</span>
      </div>
    );
  }

  const result = run.result;
  if (!result) return null;

  const main = result.ok ? (
    <div className={styles.row}>
      {time}
      <span className={styles.message}>
        Ran {result.results.length} {result.results.length === 1 ? 'statement' : 'statements'} in{' '}
        {result.durationMs} ms{run.ranSelection && ' · selection'}
      </span>
    </div>
  ) : (
    <div className={`${styles.row} ${styles.error}`}>
      {time}
      <span className={styles.message}>
        {run.location && `Line ${run.location.line}, column ${run.location.column}: `}
        {result.error.message}
        {result.error.sqlState && (
          <span className={styles.detail}>SQLSTATE {result.error.sqlState}</span>
        )}
        {run.statementCount > 1 && (
          <span className={styles.detail}>Nothing from this run was saved.</span>
        )}
      </span>
    </div>
  );

  return (
    <>
      {main}
      {run.hadOpenTransaction && (
        <div className={`${styles.row} ${styles.info}`}>
          {time}
          <span className={styles.message}>
            Your transaction is still open. Run COMMIT or ROLLBACK.
          </span>
        </div>
      )}
    </>
  );
}

export default function SqlMessages({ history }: SqlMessagesProps) {
  if (history.length === 0) {
    return <p className={styles.empty}>Messages from your runs appear here.</p>;
  }

  return (
    <div className={styles.panel}>
      {history.map((run) => (
        <RunRows key={run.id} run={run} />
      ))}
    </div>
  );
}
