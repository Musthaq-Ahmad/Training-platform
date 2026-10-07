// frontend/src/pages/JournalPage/JournalPage.tsx
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { JournalEntry } from '@itp/types';
import { getJournalEntries } from '../../api/journal';
import type { ApiError } from '../../api/errors';
import JournalEntryCard from '../../components/JournalEntryCard';
import JournalMessage from '../../components/JournalMessage';
import JournalSearchBar from '../../components/JournalSearchBar';
import JournalSkeleton from './JournalSkeleton';
import Header from '../../components/Header';
import styles from './JournalPage.module.css';

function hasWrittenText(entry: JournalEntry): boolean {
  return entry.responseText.trim() !== '';
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [expandedDayId, setExpandedDayId] = useState<string | null>(null);

  const applyEntries = useCallback((loadedEntries: JournalEntry[]) => {
    setEntries(loadedEntries);
    // Start with the latest past entry open
    const latestPast = loadedEntries.find((entry) => !entry.isEditable && hasWrittenText(entry));
    setExpandedDayId(latestPast?.dayId ?? null);
  }, []);

  useEffect(() => {
    let cancelled = false;

    getJournalEntries()
      .then(({ entries: loadedEntries }) => {
        if (!cancelled) applyEntries(loadedEntries);
      })
      .catch((err: ApiError) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [applyEntries]);

  const loadEntries = useCallback(() => {
    setIsLoading(true);
    setError(null);

    getJournalEntries()
      .then(({ entries: loadedEntries }) => applyEntries(loadedEntries))
      .catch((err: ApiError) => setError(err))
      .finally(() => setIsLoading(false));
  }, [applyEntries]);

  const visibleEntries = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (query === '') return entries;

    return entries.filter((entry) =>
      [entry.title, entry.trackLabel, entry.responseText, ...entry.prompts].some((text) =>
        text.toLowerCase().includes(query)
      )
    );
  }, [entries, searchText]);

  function handleToggle(dayId: string) {
    setExpandedDayId((current) => (current === dayId ? null : dayId));
  }

  // Keeps the list in sync with what the trainee is typing in today's editor
  function handleChangeText(dayId: string, responseText: string) {
    setEntries((current) =>
      current.map((entry) => (entry.dayId === dayId ? { ...entry, responseText } : entry))
    );
  }

  function renderContent() {
    if (isLoading) return <JournalSkeleton />;

    if (error) {
      return <JournalMessage variant="error" description={error.message} onAction={loadEntries} />;
    }

    if (entries.length === 0) return <JournalMessage variant="empty" />;

    if (visibleEntries.length === 0) {
      return (
        <JournalMessage
          variant="noResults"
          description={`Nothing matched “${searchText.trim()}”. Try a different keyword.`}
          onAction={() => setSearchText('')}
        />
      );
    }

    return (
      <ul className={styles.list}>
        {visibleEntries.map((entry) => (
          <JournalEntryCard
            key={entry.dayId}
            entry={entry}
            isExpanded={expandedDayId === entry.dayId}
            onToggle={handleToggle}
            onChangeText={handleChangeText}
          />
        ))}
      </ul>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Journal</h1>
          <p className={styles.subtitle}>Your daily reflections and notes.</p>
        </header>

        <JournalSearchBar
          value={searchText}
          onChange={setSearchText}
          entryCount={isLoading || error ? null : visibleEntries.length}
          isDisabled={isLoading || error !== null}
        />

        {renderContent()}
      </main>
    </>
  );
}
