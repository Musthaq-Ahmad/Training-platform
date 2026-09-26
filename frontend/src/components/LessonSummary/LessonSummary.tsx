import styles from './LessonSummary.module.css';

interface LessonSummaryProps {
  summary: string;
}

export default function LessonSummary({ summary }: LessonSummaryProps) {
  return (
    <section className={styles.lessonSummary}>
      <div className={styles.lessonSummaryHeader}>
        <span className={styles.lessonSummaryLabel}>BY THE END OF THE DAY</span>
      </div>

      <div className={styles.lessonSummaryBox}>
        <p className={styles.lessonSummaryText}>{summary}</p>
      </div>
    </section>
  );
}
