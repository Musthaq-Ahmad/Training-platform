import { SORT_OPTIONS, parseSortKey, type SortKey } from '../../lib/traineeListState';
import styles from './TraineeListToolbar.module.css';

type TraineeListToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  sort: SortKey;
  onSortChange: (value: SortKey) => void;
  attentionOnly: boolean;
  attentionCount: number;
  onAttentionChange: (value: boolean) => void;
};

function SearchIcon() {
  return (
    <svg
      className={styles.searchIcon}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4.75" />
      <path d="M10.5 10.5 14 14" />
    </svg>
  );
}

/** Search box, sort menu and "Needs attention" chip above the trainee table. Holds no state. */
export default function TraineeListToolbar({
  query,
  onQueryChange,
  sort,
  onSortChange,
  attentionOnly,
  attentionCount,
  onAttentionChange,
}: TraineeListToolbarProps) {
  return (
    <div className={styles.toolbar} role="search">
      <div className={styles.searchWrap}>
        <SearchIcon />
        <input
          type="search"
          className={styles.search}
          aria-label="Search trainees"
          placeholder="Search by name or email"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>

      <label className={styles.sortLabel}>
        Sort by
        <span className={styles.selectBox}>
          <select
            className={styles.sortSelect}
            value={sort}
            onChange={(event) => onSortChange(parseSortKey(event.target.value))}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </span>
      </label>

      <button
        type="button"
        className={styles.chip}
        aria-pressed={attentionOnly}
        aria-label={`Needs attention (${attentionCount})`}
        onClick={() => onAttentionChange(!attentionOnly)}
      >
        Needs attention
        <span className={styles.chipCount} aria-hidden="true">
          {attentionCount}
        </span>
      </button>
    </div>
  );
}
