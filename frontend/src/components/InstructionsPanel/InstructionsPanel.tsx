import MarkdownRenderer from '../MarkdownRenderer';
import styles from './InstructionsPanel.module.css';

type InstructionsPanelProps = {
  markdown: string;
};

export default function InstructionsPanel({ markdown }: InstructionsPanelProps) {
  return <MarkdownRenderer markdown={markdown} className={styles.instructions} />;
}
