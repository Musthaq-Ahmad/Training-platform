import { useCallback, useEffect, useRef, useState } from 'react';
import type { SaveTypingResultRequest } from '@itp/types';
import {
  buildPassage,
  calculateTypingStats,
  DEFAULT_PASSAGE_OPTIONS,
  type PassageOptions,
} from '../lib/typingStats';

export type TypingStatus = 'idle' | 'running' | 'finished';

const TICK_MS = 200;

export function useTypingTest(
  initialDuration: number,
  onFinish: (stats: SaveTypingResultRequest) => void
) {
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
  useEffect(() => {
    if (status !== 'running') return;

    const timer = setInterval(() => {
      const left = durationSeconds - (Date.now() - startedAtRef.current) / 1000;
      if (left <= 0) {
        clearInterval(timer);
        finish(typedRef.current);
      } else {
        setSecondsLeft(Math.ceil(left));
      }
    }, TICK_MS);

    return () => clearInterval(timer);
  }, [status, durationSeconds, finish]);

  function handleInput(value: string) {
    if (status === 'finished') return;

    if (status === 'idle' && value.length > 0) {
      startedAtRef.current = Date.now();
      setStatus('running');
    }

    const next = value.slice(0, passage.length);
    typedRef.current = next;
    setTyped(next);

    if (next.length >= passage.length) finish(next); // ran out of text before the time
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
  }, []);

  const restart = useCallback(
    (nextDuration: number = durationSeconds) => reset(nextDuration, options),
    [durationSeconds, options, reset]
  );

  const toggleOption = useCallback(
    (key: keyof PassageOptions) => reset(durationSeconds, { ...options, [key]: !options[key] }),
    [durationSeconds, options, reset]
  );

  // Esc restarts the test
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') restart();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [restart]);

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
  };
}
