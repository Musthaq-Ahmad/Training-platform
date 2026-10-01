import { useCallback, useEffect, useRef, useState } from 'react';
import type { SaveTypingResultRequest, TypingTodayResponse } from '@itp/types';
import { getTypingToday, saveTypingResult } from '../../api/typingTest';
import { ApiError } from '../../api/errors';
import { TYPING_DURATIONS } from '../../constants/typingWords';
import { formatTimer, type PassageOptions } from '../../lib/typingStats';
import { useTypingTest } from '../../hooks/useTypingTest';
import Header from '../../components/Header';
import PassageDisplay from '../../components/PassageDisplay';
import TestHistory from '../../components/TestHistory';
import styles from './TypingTestPage.module.css';

const DEFAULT_DURATION = 60;

const OPTION_LABELS: { key: keyof PassageOptions; label: string }[] = [
  { key: 'punctuation', label: 'punctuation' },
  { key: 'numbers', label: 'numbers' },
];

export default function TypingTestPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [today, setToday] = useState<TypingTodayResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<ApiError | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<ApiError | null>(null);
  const [lastResult, setLastResult] = useState<SaveTypingResultRequest | null>(null);

  useEffect(() => {
    getTypingToday()
      .then(setToday)
      .catch((err: ApiError) => setLoadError(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Save the finished test, then reload today's history from the server
  const handleFinish = useCallback((stats: SaveTypingResultRequest) => {
    setLastResult(stats);
    setSaveError(null);
    setIsSaving(true);

    saveTypingResult(stats)
      .then(() => getTypingToday())
      .then(setToday)
      .catch((err: ApiError) => setSaveError(err))
      .finally(() => setIsSaving(false));
  }, []);

  const {
    passage,
    typed,
    status,
    secondsLeft,
    durationSeconds,
    options,
    handleInput,
    restart,
    toggleOption,
  } = useTypingTest(DEFAULT_DURATION, handleFinish);

  function clearMessages() {
    setLastResult(null);
    setSaveError(null);
  }

  function handleRestart(nextDuration?: number) {
    clearMessages();
    restart(nextDuration);
    inputRef.current?.focus();
  }

  function handleToggleOption(key: keyof PassageOptions) {
    clearMessages();
    toggleOption(key);
    inputRef.current?.focus();
  }

  return (
    <>
      <Header />

      <div className={styles.page}>
        <div>
          <h1 className={styles.title}>Typing Test</h1>
          <p className={styles.subtitle}>
            Test your typing speed and accuracy against internal enterprise codebases and
            engineering passages.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.toolbar}>
            <div className={styles.timerGroup}>
              <span className={styles.timerLabel}>TIMER</span>
              <span className={styles.timer} role="timer" aria-live="off">
                {formatTimer(secondsLeft)}
              </span>
            </div>

            <div className={styles.controls}>
              <div className={styles.modes}>
                <span className={styles.modeLabel}>Mode:</span>
                {TYPING_DURATIONS.map((seconds) => (
                  <button
                    key={seconds}
                    type="button"
                    className={seconds === durationSeconds ? styles.modeActive : styles.mode}
                    aria-pressed={seconds === durationSeconds}
                    disabled={isSaving}
                    onClick={() => handleRestart(seconds)}
                  >
                    {seconds}s
                  </button>
                ))}
              </div>

              <div className={styles.modes}>
                <span className={styles.modeLabel}>Include:</span>
                {OPTION_LABELS.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    className={options[key] ? styles.modeActive : styles.mode}
                    aria-pressed={options[key]}
                    disabled={isSaving}
                    onClick={() => handleToggleOption(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clicking the passage refocuses the hidden input that receives the keystrokes */}
          <div
            className={styles.arena}
            onClick={() => inputRef.current?.focus()}
            role="presentation"
          >
            <PassageDisplay passage={passage} typed={typed} />
            <input
              ref={inputRef}
              className={styles.hiddenInput}
              value={typed}
              onChange={(event) => handleInput(event.target.value)}
              onPaste={(event) => event.preventDefault()}
              onDrop={(event) => event.preventDefault()}
              aria-label="Type the text shown above"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>

          {status === 'finished' && lastResult && (
            <p className={styles.result} role="status">
              Test complete: <strong>{lastResult.wpm} WPM</strong> at{' '}
              <strong>{lastResult.accuracy}%</strong> accuracy.
              {isSaving ? ' Saving...' : ''}
            </p>
          )}
          {saveError && (
            <p className={styles.error} role="alert">
              Your result could not be saved: {saveError.message}
            </p>
          )}

          <div className={styles.footer}>
            <p className={styles.hint}>
              Press <kbd>Esc</kbd> to restart test
            </p>
            <button
              type="button"
              className={styles.restart}
              disabled={isSaving}
              onClick={() => handleRestart()}
            >
              Restart Test
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className={styles.status}>Loading history...</p>
        ) : loadError ? (
          <p className={styles.status}>{loadError.message}</p>
        ) : today ? (
          <TestHistory
            results={today.results}
            averageWpm={today.averageWpm}
            averageAccuracy={today.averageAccuracy}
          />
        ) : null}
      </div>
    </>
  );
}
