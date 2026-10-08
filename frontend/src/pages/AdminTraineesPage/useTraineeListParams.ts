import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { DEFAULT_SORT, parseSortKey, type SortKey } from '../../lib/traineeListState';

/**
 * The trainee list's search, sort and filter, mirrored in the URL:
 * `?q=priya&sort=flags&attention=1`.
 * The URL is read once on load (so refresh and shared links work); after that the URL is
 * updated with `replace`, so typing doesn't fill the browser history.
 * Values that equal the default are left out, which keeps the URL short.
 */
export function useTraineeListParams() {
  const [params, setParams] = useSearchParams();

  // The search box keeps its own copy so typing never waits for a navigation.
  const [query, setQueryState] = useState(() => params.get('q') ?? '');
  const sort = parseSortKey(params.get('sort'));
  const attentionOnly = params.get('attention') === '1';

  const update = (changes: Record<string, string | null>) => {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        for (const [key, value] of Object.entries(changes)) {
          if (value) next.set(key, value);
          else next.delete(key);
        }
        return next;
      },
      { replace: true }
    );
  };

  const setQuery = (value: string) => {
    setQueryState(value);
    update({ q: value.trim() ? value : null });
  };

  const setSort = (value: SortKey) => {
    update({ sort: value === DEFAULT_SORT ? null : value });
  };

  const setAttentionOnly = (value: boolean) => {
    update({ attention: value ? '1' : null });
  };

  return { query, sort, attentionOnly, setQuery, setSort, setAttentionOnly };
}
