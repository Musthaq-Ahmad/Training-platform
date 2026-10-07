// src/hooks/useSelfCheckProgress.ts
import { useCallback, useEffect, useState } from 'react';
import { get, set } from 'idb-keyval';
import { useAuth } from '../context/Useauth';

async function readChecked(key: string): Promise<string[]> {
  try {
    const saved = await get<string[]>(key);
    return Array.isArray(saved) ? saved : [];
  } catch {
    return []; // storage unavailable: behave as "nothing saved"
  }
}

async function writeChecked(key: string, ids: string[]): Promise<void> {
  try {
    await set(key, ids);
  } catch {
    /* persistence is best-effort */
  }
}

/** The ticked ids, tagged with the storage key they were loaded for. */
type LoadedState = { key: string; ids: string[] };

/** Remembers which self-check items a trainee ticked, per day, in this browser. */
export function useSelfCheckProgress(dayId: string) {
  const { user } = useAuth();
  const storageKey = user ? `selfcheck:${user.id}:${dayId}` : null;

  const [loaded, setLoaded] = useState<LoadedState | null>(null);

  useEffect(() => {
    if (!storageKey) return;
    let isCancelled = false; // ignore late results after the day/user changes

    void readChecked(storageKey).then((ids) => {
      if (!isCancelled) setLoaded({ key: storageKey, ids });
    });

    return () => {
      isCancelled = true;
    };
  }, [storageKey]);

  // Data that belongs to a previous day/user counts as "not loaded yet".
  const isLoaded = storageKey !== null && loaded?.key === storageKey;
  const checkedIds = isLoaded ? loaded.ids : [];

  const toggle = useCallback(
    (itemId: string) => {
      if (!storageKey || !isLoaded) return;
      const next = checkedIds.includes(itemId)
        ? checkedIds.filter((id) => id !== itemId)
        : [...checkedIds, itemId];

      setLoaded({ key: storageKey, ids: next });
      void writeChecked(storageKey, next);
    },
    [checkedIds, isLoaded, storageKey]
  );

  return { checkedIds, isLoaded, toggle };
}
