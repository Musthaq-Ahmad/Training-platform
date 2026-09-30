import type { SqlStatementResult } from '../sqlTypes';
import type { SqlRun } from '../useSqlRunner';
import styles from './SqlResults.module.css';

type SqlResultsProps = { run: SqlRun | null };

function plural(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}

/** 'SELECT · 12 rows', 'INSERT · 3 rows affected', 'CREATE TABLE · Done' */
function headerText(result: SqlStatementResult): string {
  if (result.columns.length > 0) {
    const count = result.truncated ? `${result.rows.length}+` : String(result.rows.length);
    return `${result.label} · ${count} ${result.rows.length === 1 && !result.truncated ? 'row' : 'rows'}`;
  }
  if (result.rowCount !== null)
    return `${result.label} · ${plural(result.rowCount, 'row')} affected`;
  return `${result.label} · Done`;
}

function ResultBlock({ result }: { result: SqlStatementResult }) {
  return (
    <section className={styles.block}>
      <h3 className={styles.header}>{headerText(result)}</h3>
      {result.columns.length > 0 && (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {result.columns.map((column, index) => (
                    <th key={index} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((value, index) =>
                      value === null ? (
                        <td key={index} className={styles.null}>
                          NULL
                        </td>
                      ) : (
                        <td key={index}>{value}</td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {result.rows.length === 0 && <p className={styles.note}>No rows</p>}
          {result.truncated && <p className={styles.note}>Showing the first 500 rows</p>}
        </>
      )}
    </section>
  );
}

export default function SqlResults({ run }: SqlResultsProps) {
  if (!run) {
    return (
      <div className={styles.empty}>
        <p>Run a query to see results here.</p>
        <p className={styles.dim}>
          The database lives in this tab. Re-run your .sql files after a reload.
        </p>
      </div>
    );
  }

  if (!run.result?.ok) {
    return (
      <div className={styles.empty}>
        <p>This run didn&apos;t return results. See Messages.</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      {run.result.results.map((result, index) => (
        <ResultBlock key={`${run.id}-${index}`} result={result} />
      ))}
    </div>
  );
}
