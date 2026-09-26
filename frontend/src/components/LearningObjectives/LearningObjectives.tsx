import styles from './LearningObjectives.module.css';

interface LearningObjective {
  id: string;
  code: string;
  title: string;
  description: string;
}

interface LearningObjectivesProps {
  objectives: LearningObjective[];
}

export default function LearningObjectives({ objectives }: LearningObjectivesProps) {
  return (
    <section className={styles.learningObjectives}>
      <div className={styles.learningObjectivesHeader}>
        <span className={styles.learningObjectivesLabel}>LEARNING OBJECTIVES</span>

        <span className={styles.learningObjectivesBadge}>{objectives.length} Core Concepts</span>
      </div>

      <div className={styles.learningObjectivesList}>
        {objectives.map((objective) => (
          <article key={objective.id} className={styles.learningObjectivesItem}>
            <span className={styles.learningObjectivesCode}>{objective.code}</span>

            <div className={styles.learningObjectivesContent}>
              <h3 className={styles.learningObjectivesItemTitle}>{objective.title}</h3>

              <p className={styles.learningObjectivesItemDescription}>{objective.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
