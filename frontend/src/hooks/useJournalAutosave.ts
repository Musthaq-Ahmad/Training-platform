import { useCallback, useEffect, useRef, useState } from 'react';
import { saveJournal } from '../api/journal';

const AUTOSAVE_DELAY_MS = 1500;

export type AutosaveStatus = 'idle' | 'unsaved' | 'saving' | 'saved' | 'error';

/**
 * Saves the journal text a moment after the trainee stops typing.
 * Also saves any unsaved text when the editor closes.
 * After a failed save, the trainee retries with `saveNow`.
 */
export function useJournalAutosave(dayId: string, responseText: string) {
  const [savedText, setSavedText] = useState(responseText);
  const [hasSaved, setHasSaved] = useState(false);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'error'>('idle');

  const saveNow = useCallback(async () => {
    const textToSave = responseText;
    setSaveState('saving');
    try {
      await saveJournal(dayId, { responseText: textToSave });
      setSavedText(textToSave);
      setHasSaved(true);
      setSaveState('idle');
    } catch {
      setSaveState('error');
    }
  }, [dayId, responseText]);

  // Debounced autosave. Waits while a save is running, and after an error.
  useEffect(() => {
    if (saveState !== 'idle' || responseText === savedText) return;
    const timerId = window.setTimeout(() => {
      void saveNow();
    }, AUTOSAVE_DELAY_MS);
    return () => window.clearTimeout(timerId);
  }, [saveState, responseText, savedText, saveNow]);

  // Flush unsaved text when the editor unmounts (card collapsed, page left)
  const latestRef = useRef({ responseText, savedText });
  useEffect(() => {
    latestRef.current = { responseText, savedText };
  });
  useEffect(() => {
    return () => {
      const { responseText: text, savedText: saved } = latestRef.current;
      if (text !== saved) {
        void saveJournal(dayId, { responseText: text }).catch(() => undefined);
      }
    };
  }, [dayId]);

  let status: AutosaveStatus = 'idle';
  if (saveState === 'saving') status = 'saving';
  else if (saveState === 'error') status = 'error';
  else if (responseText !== savedText) status = 'unsaved';
  else if (hasSaved) status = 'saved';

  return { status, saveNow };
}
