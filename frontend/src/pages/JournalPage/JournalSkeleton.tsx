import styles from './JournalPage.module.css';

export default function JournalSkeleton() {
  return (
    <div className={styles.skeletonList} aria-label="Loading journal entries" aria-busy="true">
      {[0, 1, 2].map((item) => (
        <div className={styles.skeletonCard} key={item} />
      ))}
    </div>
  );
}
