import { useCallback, useEffect, useRef, useState } from 'react';
import type { TaskFile } from '@itp/types';
import { ApiError } from '../../../api/errors';

export type SaveStatus = 'saved' | 'dirty' | 'saving' | 'offline' | 'error' | 'blocked';
export type SaveState = { status: SaveStatus; lastSavedAt: Date | null; message: string | null };

type UseAutosaveOptions = {
  isDirty: boolean;
  changeKey: unknown;
  getSnapshot: () => TaskFile[];
  save: (files: TaskFile[]) => Promise<void>;
  onSaved: (files: TaskFile[]) => void;
  validate?: (files: TaskFile[]) => string | null;
  debounceMs?: number;
  maxWaitMs?: number;
};

type UseAutosaveResult = {
  state: SaveState;
  flush: () => Promise<boolean>;
  retry: () => void;
};

type Failure = { status: 'offline' | 'error' | 'blocked'; message: string | null };

const SHOW_SAVING_DELAY_MS = 300;
const RETRY_DELAY_MS = 5000;
const DEFAULT_DEBOUNCE_MS = 2000;
const DEFAULT_MAX_WAIT_MS = 8000;
const GENERIC_ERROR_MESSAGE = 'Something went wrong. Please try again.';

export function useAutosave(options: UseAutosaveOptions): UseAutosaveResult {
  const { isDirty, changeKey } = options;

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  const isMountedRef = useRef(true);

  // These three drive the returned `state` and must be read during render,
  // so they're real state (not refs — react-hooks/refs disallows reading a
  // ref's `.current` in the render body).
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [isSavingVisible, setIsSavingVisible] = useState(false);
  const [failure, setFailure] = useState<Failure | null>(null);

  // Everything else is purely internal bookkeeping, only ever touched from
  // timers/promise callbacks — never read during render — so refs are fine.
  const savingRef = useRef(false);
  const saveAgainRef = useRef(false);
  const inFlightRef = useRef<Promise<void> | null>(null);
  const lastFailureFlagRef = useRef<Failure | null>(null);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxWaitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showSavingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSaveRef = useRef<() => Promise<void>>(() => Promise.resolve());

  function setFailureSafely(next: Failure | null) {
    lastFailureFlagRef.current = next;
    if (isMountedRef.current) setFailure(next);
  }

  const clearDebounceAndMaxWait = useCallback(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (maxWaitTimerRef.current) clearTimeout(maxWaitTimerRef.current);
    debounceTimerRef.current = null;
    maxWaitTimerRef.current = null;
  }, []);

  const runSave = useCallback((): Promise<void> => {
    if (savingRef.current) {
      saveAgainRef.current = true;
      return inFlightRef.current ?? Promise.resolve();
    }

    clearDebounceAndMaxWait();
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }

    const files = optionsRef.current.getSnapshot();
    const validationMessage = optionsRef.current.validate?.(files) ?? null;

    if (validationMessage) {
      setFailureSafely({ status: 'blocked', message: validationMessage });
      return Promise.resolve();
    }

    savingRef.current = true;
    showSavingTimerRef.current = setTimeout(() => {
      if (isMountedRef.current) setIsSavingVisible(true);
    }, SHOW_SAVING_DELAY_MS);

    const promise = optionsRef.current
      .save(files)
      .then(() => {
        optionsRef.current.onSaved(files);
        if (isMountedRef.current) setLastSavedAt(new Date());
        setFailureSafely(null);
      })
      .catch((error: unknown) => {
        const apiError = error instanceof ApiError ? error : null;
        const code = apiError?.code;

        if (code === 'NETWORK_ERROR' || navigator.onLine === false) {
          setFailureSafely({ status: 'offline', message: null });
          return;
        }
        if (code === 'VALIDATION_FAILED' || code === 'FORBIDDEN' || code === 'DAY_LOCKED') {
          setFailureSafely({
            status: 'blocked',
            message: apiError?.message ?? GENERIC_ERROR_MESSAGE,
          });
          return;
        }

        setFailureSafely({ status: 'error', message: apiError?.message ?? GENERIC_ERROR_MESSAGE });
        retryTimerRef.current = setTimeout(() => {
          retryTimerRef.current = null;
          void runSaveRef.current();
        }, RETRY_DELAY_MS);
      })
      .finally(() => {
        savingRef.current = false;
        inFlightRef.current = null;
        if (showSavingTimerRef.current) clearTimeout(showSavingTimerRef.current);
        showSavingTimerRef.current = null;
        if (isMountedRef.current) setIsSavingVisible(false);

        if (saveAgainRef.current) {
          saveAgainRef.current = false;
          if (optionsRef.current.isDirty) {
            void runSaveRef.current();
          }
        }
      });

    inFlightRef.current = promise;
    return promise;
  }, [clearDebounceAndMaxWait]);

  useEffect(() => {
    runSaveRef.current = runSave;
  }, [runSave]);

  const flush = useCallback(async (): Promise<boolean> => {
    clearDebounceAndMaxWait();
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }

    if (inFlightRef.current) {
      await inFlightRef.current;
    }

    if (optionsRef.current.isDirty) {
      await runSaveRef.current();
    }

    // Read from what the save itself just recorded, not `optionsRef.current.isDirty`:
    // that prop only updates via an effect after a render, which can lag behind
    // the save's own promise chain resolving (onSaved's dispatch hasn't
    // re-rendered the caller yet). The ref mirror of `failure` is set
    // synchronously by runSave itself, so it's never stale at this point.
    return lastFailureFlagRef.current === null;
  }, [clearDebounceAndMaxWait]);

  const retry = useCallback(() => {
    void runSaveRef.current();
  }, []);

  // Debounce (2s) restarts on every change; a max-wait (8s) timer starts once
  // per dirty streak, so a trainee typing non-stop still saves by second 8.
  useEffect(() => {
    if (!isDirty) {
      clearDebounceAndMaxWait();
      return;
    }

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = null;
      void runSaveRef.current();
    }, optionsRef.current.debounceMs ?? DEFAULT_DEBOUNCE_MS);

    if (!maxWaitTimerRef.current) {
      maxWaitTimerRef.current = setTimeout(() => {
        maxWaitTimerRef.current = null;
        void runSaveRef.current();
      }, optionsRef.current.maxWaitMs ?? DEFAULT_MAX_WAIT_MS);
    }
  }, [changeKey, isDirty, clearDebounceAndMaxWait]);

  // Back online after an offline failure: try again.
  useEffect(() => {
    function handleOnline() {
      if (lastFailureFlagRef.current?.status === 'offline') {
        setFailureSafely(null);
        void runSaveRef.current();
      }
    }
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  // Leaving: flush on tab hide; warn the browser's own way if a normal unload
  // would lose work; fire-and-forget a save on unmount (in-app navigation).
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        void flush();
      }
    }
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (optionsRef.current.isDirty) {
        event.preventDefault();
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [flush]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      const { isDirty, getSnapshot, validate, save } = optionsRef.current;
      if (!isDirty) return;
      // Same check as a normal save: a save the server would reject isn't sent.
      const files = getSnapshot();
      if (validate?.(files)) return;
      save(files).catch(() => {}); // the page is gone, so there is no one to show an error to
    };
  }, []);

  const state: SaveState = isSavingVisible
    ? { status: 'saving', lastSavedAt, message: null }
    : failure
      ? { status: failure.status, lastSavedAt, message: failure.message }
      : { status: isDirty ? 'dirty' : 'saved', lastSavedAt, message: null };

  return { state, flush, retry };
}
