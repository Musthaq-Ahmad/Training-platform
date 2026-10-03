import { useCallback, useEffect, useRef, useState } from 'react';
import type { TypingTestStats } from '@itp/types';
import {
  buildPassage,
  calculateTypingStats,
  DEFAULT_PASSAGE_OPTIONS,
  type PassageOptions,
} from '../lib/typingStats';

export type TypingStatus = 'idle' | 'running' | 'finished';

const TICK_MS = 200;
const EXTEND_THRESHOLD = 300; // characters of text to keep ahead of the cursor
const INACTIVITY_MS = 5000;

export function useTypingTest(initialDuration: number, onFinish: (stats: TypingTestStats) => void) {
  const [durationSeconds, setDurationSeconds] = useState(initialDuration);
  const [options, setOptions] = useState<PassageOptions>(DEFAULT_PASSAGE_OPTIONS);
  const [passage, setPassage] = useState(() =>
    buildPassage(initialDuration, DEFAULT_PASSAGE_OPTIONS)
  );
  const [typed, setTyped] = useState('');
  const [status, setStatus] = useState<TypingStatus>('idle');
  const [secondsLeft, setSecondsLeft] = useState(initialDuration);

  const typedRef = useRef('');
  const startedAtRef = useRef(0);
  const onFinishRef = useRef(onFinish);

  const [isPaused, setIsPaused] = useState(false);

  const lastInputAtRef = useRef(0);
  const pausedAtRef = useRef(0);

  useEffect(() => {
    onFinishRef.current = onFinish;
  });

  const finish = useCallback(
    (finalTyped: string) => {
      const elapsed = Math.min((Date.now() - startedAtRef.current) / 1000, durationSeconds);
      setStatus('finished');
      setSecondsLeft(0);
      onFinishRef.current(calculateTypingStats(passage, finalTyped, elapsed));
    },
    [passage, durationSeconds]
  );

  // Countdown: starts on the first key press
  // Countdown: starts on the first key press, stops while paused
  useEffect(() => {
    if (status !== 'running' || isPaused) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const left = durationSeconds - (now - startedAtRef.current) / 1000;

      if (left <= 0) {
        clearInterval(timer);
        finish(typedRef.current);
        return;
      }

      // No typing for 5 seconds: pause until a key is pressed
      if (now - lastInputAtRef.current > INACTIVITY_MS) {
        clearInterval(timer);
        pausedAtRef.current = now;
        setIsPaused(true);
        return;
      }

      setSecondsLeft(Math.ceil(left));
    }, TICK_MS);

    return () => clearInterval(timer);
  }, [status, isPaused, durationSeconds, finish]);

  function handleInput(value: string) {
    if (status === 'finished' || isPaused) return;

    lastInputAtRef.current = Date.now();

    if (status === 'idle' && value.length > 0) {
      startedAtRef.current = Date.now();
      setStatus('running');
    }
    const next = value.slice(0, passage.length);
    typedRef.current = next;
    setTyped(next);

    // Keep the text flowing: append a fresh chunk before the trainee runs out
    if (passage.length - next.length <= EXTEND_THRESHOLD) {
      const chunk = buildPassage(durationSeconds, options);
      setPassage((current) => `${current} ${chunk}`);
    }
  }

  // Starts a fresh test with new text
  const reset = useCallback((nextDuration: number, nextOptions: PassageOptions) => {
    typedRef.current = '';
    setDurationSeconds(nextDuration);
    setOptions(nextOptions);
    setPassage(buildPassage(nextDuration, nextOptions));
    setTyped('');
    setStatus('idle');
    setSecondsLeft(nextDuration);
    setIsPaused(false);
  }, []);

  const restart = useCallback(
    (nextDuration: number = durationSeconds) => reset(nextDuration, options),
    [durationSeconds, options, reset]
  );

  const toggleOption = useCallback(
    (key: keyof PassageOptions) => reset(durationSeconds, { ...options, [key]: !options[key] }),
    [durationSeconds, options, reset]
  );
  // Any key resumes a paused test; that key is not typed into the passage
  useEffect(() => {
    if (!isPaused) return;

    function onKeyDown(event: KeyboardEvent) {
      event.preventDefault();
      const now = Date.now();
      startedAtRef.current += now - pausedAtRef.current; // don't count the pause
      lastInputAtRef.current = now;
      setIsPaused(false);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isPaused]);
  // Enter restarts the test (Esc is reserved for exiting fullscreen)
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Enter' || event.repeat) return;
      if (isPaused) return; // Enter resumes the test; it should not restart it too.

      // A focused button already restarts via its own click on Enter
      if (event.target instanceof HTMLButtonElement) return;

      event.preventDefault();
      restart();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [restart, isPaused]);

  return {
    passage,
    typed,
    status,
    secondsLeft,
    durationSeconds,
    options,
    handleInput,
    restart,
    toggleOption,
    isPaused,
  };
}
