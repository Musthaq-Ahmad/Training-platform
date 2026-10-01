// ReferenceSearch.tsx
import { useState, type KeyboardEvent, type RefObject } from 'react';
import { useReferenceSearch } from '../../hooks/useReferenceSearch';
import styles from './ReferenceSearch.module.css';

type ReferenceSearchProps = {
  containerRef: RefObject<HTMLElement | null>;
  contentKey: string; // changes when the page content changes (use dayId)
};

export default function ReferenceSearch({ containerRef, contentKey }: ReferenceSearchProps) {
  const [query, setQuery] = useState('');
  const { isSupported, isSearching, matchCount, activeIndex, next, previous } = useReferenceSearch(
    containerRef,
    query,
    contentKey
  );

  if (!isSupported) return null;

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.shiftKey) previous();
      else next();
    } else if (event.key === 'Escape') {
      setQuery('');
    }
  }

  const status = !isSearching
    ? ''
    : matchCount === 0
      ? 'No results'
      : `${activeIndex + 1} of ${matchCount}`;

  return (
    <div className={styles.search} role="search">
      <svg
        className={styles.searchIcon}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>

      <input
        type="text"
        className={styles.input}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search this page"
        aria-label="Search this page"
      />

      <span className={styles.status} aria-live="polite">
        {status}
      </span>

      <button
        type="button"
        className={styles.iconButton}
        onClick={previous}
        disabled={matchCount === 0}
        aria-label="Previous match"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 15 6-6 6 6" />
        </svg>
      </button>

      <button
        type="button"
        className={styles.iconButton}
        onClick={next}
        disabled={matchCount === 0}
        aria-label="Next match"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {query && (
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => setQuery('')}
          aria-label="Clear search"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      )}
    </div>
  );
}
