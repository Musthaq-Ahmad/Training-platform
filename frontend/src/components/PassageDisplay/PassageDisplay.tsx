import styles from './PassageDisplay.module.css';

type PassageDisplayProps = {
  passage: string;
  typed: string;
};

export default function PassageDisplay({ passage, typed }: PassageDisplayProps) {
  return (
    <p className={styles.passage} aria-label="Text to type">
      {passage.split('').map((char, index) => {
        let state = styles.pending;
        if (index < typed.length) {
          state = typed[index] === char ? styles.correct : styles.incorrect;
        } else if (index === typed.length) {
          state = styles.current;
        }
        return (
          <span key={index} className={state}>
            {char}
          </span>
        );
      })}
    </p>
  );
}
