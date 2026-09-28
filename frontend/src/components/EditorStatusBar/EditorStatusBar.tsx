import { Code2, AlertTriangle } from 'lucide-react';
import styles from './EditorStatusBar.module.css';

type EditorStatusBarProps = {
  languageLabel: string | null;
  line: number;
  column: number;
  isTooLarge: boolean;
};

export default function EditorStatusBar({
  languageLabel,
  line,
  column,
  isTooLarge,
}: EditorStatusBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.side}>
        <Code2 size={12} aria-hidden="true" />
        {languageLabel && <span>{languageLabel}</span>}
        <span>UTF-8</span>
        <span>
          Ln {line}, Col {column}
        </span>
      </div>

      <div className={styles.side}>
        <span>Spaces: 2</span>
        {isTooLarge && (
          <span className={styles.warning}>
            <AlertTriangle size={12} aria-hidden="true" />
            Too large to save — 200,000 characters max
          </span>
        )}
      </div>
    </div>
  );
}
