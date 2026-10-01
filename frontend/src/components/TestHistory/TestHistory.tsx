import type { TypingTestResult } from '@itp/types';
import { formatClockTime } from '../../lib/typingStats';
import styles from './TestHistory.module.css';

type TestHistoryProps = {
  results: TypingTestResult[];
  averageWpm: number | null;
  averageAccuracy: number | null;
};

export default function TestHistory({ results, averageWpm, averageAccuracy }: TestHistoryProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Today&apos;s Test History</h2>
        <div className={styles.chips}>
          <span className={styles.chip}>
            Today&apos;s avg: <strong>{averageWpm ?? '—'} WPM</strong>
          </span>
          <span className={styles.chip}>
            Avg accuracy: <strong>{averageAccuracy === null ? '—' : `${averageAccuracy}%`}</strong>
          </span>
        </div>
      </div>

      {results.length === 0 ? (
        <p className={styles.empty}>No tests yet today. Start typing to begin.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Test #</th>
                <th>WPM speed</th>
                <th>Accuracy</th>
                <th>Duration</th>
                <th>Completed at</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>Test {result.testNumber}</td>
                  <td>{result.wpm} WPM</td>
                  <td className={styles.accuracy}>{result.accuracy}%</td>
                  <td>{result.durationSeconds} sec</td>
                  <td>{formatClockTime(result.takenAt)}</td>
                  <td>
                    <span className={styles.badge}>Completed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
