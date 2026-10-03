import type { TypingResultRecord } from '@itp/types';
import styles from './TestHistory.module.css';

type TestHistoryProps = {
  results: TypingResultRecord[];
};

function formatCompletedAt(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function TestHistory({ results }: TestHistoryProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Typing Test History</h2>
      </div>

      {results.length === 0 ? (
        <p className={styles.empty}>No typing tests yet. Complete a test to start your history.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>WPM speed</th>
                <th>Accuracy</th>
                <th>Completed at</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.wpm} WPM</td>
                  <td className={styles.accuracy}>{result.accuracy}%</td>
                  <td>{formatCompletedAt(result.takenAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
