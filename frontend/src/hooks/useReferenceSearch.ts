import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

const MIN_QUERY_LENGTH = 2;
const MAX_MATCHES = 500;
const DEBOUNCE_MS = 200;
const ALL_HIGHLIGHT = 'reference-search';
const CURRENT_HIGHLIGHT = 'reference-search-current';

type HighlightRegistry = {
  set(name: string, highlight: unknown): void;
  delete(name: string): void;
};

type HighlightConstructor = new (...ranges: Range[]) => unknown;

function getRegistry(): HighlightRegistry | null {
  const registry = (CSS as unknown as { highlights?: HighlightRegistry }).highlights;
  return registry ?? null;
}

function getHighlightConstructor(): HighlightConstructor | null {
  const ctor = (window as unknown as { Highlight?: HighlightConstructor }).Highlight;
  return ctor ?? null;
}

/** Finds every case-insensitive match, including matches that cross inline element boundaries. */
function findRanges(root: HTMLElement, query: string): Range[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: { node: Text; start: number }[] = [];
  let fullText = '';

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    nodes.push({ node: node as Text, start: fullText.length });
    fullText += node.nodeValue ?? '';
  }

  const haystack = fullText.toLowerCase();
  const needle = query.toLowerCase();
  const ranges: Range[] = [];
  let from = 0;
  let startIdx = 0;

  while (ranges.length < MAX_MATCHES) {
    const hit = haystack.indexOf(needle, from);

    if (hit === -1) break;

    const end = hit + needle.length;

    while (startIdx < nodes.length - 1 && nodes[startIdx + 1].start <= hit) {
      startIdx++;
    }

    let endIdx = startIdx;

    while (endIdx < nodes.length - 1 && nodes[endIdx + 1].start < end) {
      endIdx++;
    }

    const range = document.createRange();

    range.setStart(nodes[startIdx].node, hit - nodes[startIdx].start);

    range.setEnd(nodes[endIdx].node, end - nodes[endIdx].start);

    ranges.push(range);

    from = end;
  }

  return ranges;
}

function revealRange(range: Range) {
  const element = range.startContainer.parentElement;

  if (!element) return;

  // Open any accordion the match is inside.
  let details = element.closest('details');

  while (details) {
    details.open = true;
    details = details.parentElement?.closest('details') ?? null;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  element.scrollIntoView({
    block: 'center',
    behavior: reduceMotion ? 'auto' : 'smooth',
  });
}

export function useReferenceSearch(
  containerRef: RefObject<HTMLElement | null>,
  query: string,
  contentKey: string
) {
  const rangesRef = useRef<Range[]>([]);

  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [matchCount, setMatchCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const isSupported = getRegistry() !== null && getHighlightConstructor() !== null;

  // Debounce typing.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query]);

  // Find matches.
  useEffect(() => {
    const registry = getRegistry();
    const Highlight = getHighlightConstructor();
    const root = containerRef.current;

    registry?.delete(ALL_HIGHLIGHT);
    registry?.delete(CURRENT_HIGHLIGHT);

    rangesRef.current = [];

    if (!registry || !Highlight || !root || debouncedQuery.length < MIN_QUERY_LENGTH) {
      setMatchCount(0);
      return;
    }

    const ranges = findRanges(root, debouncedQuery);

    rangesRef.current = ranges;

    if (ranges.length > 0) {
      registry.set(ALL_HIGHLIGHT, new Highlight(...ranges));
    }

    setMatchCount(ranges.length);

    return () => {
      registry.delete(ALL_HIGHLIGHT);
      registry.delete(CURRENT_HIGHLIGHT);
    };
  }, [debouncedQuery, contentKey, containerRef]);

  // Keep the active index valid when the number of matches changes.
  const safeActiveIndex = matchCount > 0 ? activeIndex % matchCount : 0;

  // Highlight + scroll to the current match.
  useEffect(() => {
    const registry = getRegistry();
    const Highlight = getHighlightConstructor();
    const range = rangesRef.current[safeActiveIndex];

    if (!registry || !Highlight || !range) {
      registry?.delete(CURRENT_HIGHLIGHT);
      return;
    }

    registry.set(CURRENT_HIGHLIGHT, new Highlight(range));

    revealRange(range);
  }, [safeActiveIndex, matchCount]);

  const next = useCallback(() => {
    if (matchCount > 0) {
      setActiveIndex((index) => (index + 1) % matchCount);
    }
  }, [matchCount]);

  const previous = useCallback(() => {
    if (matchCount > 0) {
      setActiveIndex((index) => (index - 1 + matchCount) % matchCount);
    }
  }, [matchCount]);

  return {
    isSupported,
    isSearching: debouncedQuery.length >= MIN_QUERY_LENGTH,
    matchCount,
    activeIndex: safeActiveIndex,
    next,
    previous,
  };
}
