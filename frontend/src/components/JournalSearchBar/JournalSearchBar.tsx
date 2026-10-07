import { useEffect, useRef } from 'react';
import Icon from '../Icon';
import styles from './JournalSearchBar.module.css';

type JournalSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  entryCount: number | null; // null while loading or on error
  isDisabled?: boolean;
};

export default function JournalSearchBar({
  value,
  onChange,
  entryCount,
  isDisabled = false,
}: JournalSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd/Ctrl + K focuses the search box
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const entryWord = entryCount === 1 ? 'Entry' : 'Entries';
  const countLabel = entryCount === null ? '' : entryCount + ' ' + entryWord;

  return (
    <div className={styles.bar}>
      <div className={styles.searchWrap}>
        <Icon name="search" size={16} className={styles.searchIcon} />
        <input
          ref={inputRef}
          type="search"
          className={styles.input}
          placeholder="Search..."
          aria-label="Search journal entries"
          value={value}
          disabled={isDisabled}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>

      {entryCount !== null && (
        <p className={styles.count}>
          <Icon name="sliders" size={14} className={styles.countIcon} />
          {countLabel}
        </p>
      )}
    </div>
  );
}
