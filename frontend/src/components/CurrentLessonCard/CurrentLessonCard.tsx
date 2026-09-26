import styles from './CurrentLessonCard.module.css';

type CurrentLessonCardProps = {
  courseTitle: string; // e.g. "JAVASCRIPT"
  dayNumber: number; // e.g. 6
  totalDays: number; // e.g. 12
  lessonTitle: string; // e.g. "Closures and Higher-Order Functions"
  description: string;
  onContinue: () => void;
};

export default function CurrentLessonCard({
  courseTitle,
  dayNumber,
  totalDays,
  lessonTitle,
  description,
  onContinue,
}: CurrentLessonCardProps) {
  return (
    <section className={styles.card}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>
          {courseTitle} — DAY {dayNumber} OF {totalDays}
        </p>
        <h2 className={styles.title}>{lessonTitle}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <button className={styles.continueButton} onClick={onContinue}>
        Continue
      </button>
    </section>
  );
}
