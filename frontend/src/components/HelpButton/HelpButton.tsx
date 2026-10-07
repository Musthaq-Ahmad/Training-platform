import { Link } from 'react-router';
import { CircleHelp } from 'lucide-react';
import styles from './HelpButton.module.css';

type HelpButtonProps = {
  to?: string;
};

export default function HelpButton({ to = '/help' }: HelpButtonProps) {
  return (
    <Link to={to} className={styles.helpButton} aria-label="Open help">
      <CircleHelp size={18} aria-hidden="true" />
      <span>Help</span>
    </Link>
  );
}
