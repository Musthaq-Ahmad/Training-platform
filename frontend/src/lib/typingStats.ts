import type { SaveTypingResultRequest } from '@itp/types';
import { TYPING_WORDS } from '../constants/typingWords';

export type PassageOptions = {
  punctuation: boolean;
  numbers: boolean;
};

export const DEFAULT_PASSAGE_OPTIONS: PassageOptions = { punctuation: false, numbers: false };

const CHARS_PER_SECOND = 10; // enough text that a fast typist doesn't run out
const NUMBER_CHANCE = 0.15;
const COMMA_CHANCE = 0.12;
const WRAP_CHANCE = 0.06; // wraps a word in (parentheses)
const SENTENCE_MIN_WORDS = 5;
const SENTENCE_MAX_WORDS = 12;

function pick<T>(items: readonly T[], random: () => number): T {
  return items[Math.floor(random() * items.length)];
}

/**
 * Builds random text for the chosen duration.
 * `random` can be replaced in tests to get predictable text.
 */
export function buildPassage(
  durationSeconds: number,
  options: PassageOptions = DEFAULT_PASSAGE_OPTIONS,
  random: () => number = Math.random
): string {
  const targetLength = durationSeconds * CHARS_PER_SECOND;
  const tokens: string[] = [];
  let length = 0;
  let wordsLeftInSentence = 0;

  while (length < targetLength) {
    let token =
      options.numbers && random() < NUMBER_CHANCE
        ? String(Math.floor(random() * 10000))
        : pick(TYPING_WORDS, random);

    if (options.punctuation) {
      if (wordsLeftInSentence === 0) {
        // A new sentence starts with a capital letter
        wordsLeftInSentence =
          SENTENCE_MIN_WORDS + Math.floor(random() * (SENTENCE_MAX_WORDS - SENTENCE_MIN_WORDS + 1));
        token = token.charAt(0).toUpperCase() + token.slice(1);
      }

      if (random() < WRAP_CHANCE) token = `(${token})`;

      wordsLeftInSentence -= 1;
      if (wordsLeftInSentence === 0) token += '.';
      else if (random() < COMMA_CHANCE) token += ',';
    }

    tokens.push(token);
    length += token.length + 1;
  }

  return tokens.join(' ');
}

/** WPM counts correct characters only (5 characters = 1 word). */
export function calculateTypingStats(
  passage: string,
  typed: string,
  elapsedSeconds: number
): SaveTypingResultRequest {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === passage[i]) correct += 1;
  }

  const minutes = Math.max(elapsedSeconds, 1) / 60;

  return {
    wpm: Math.round(correct / 5 / minutes),
    accuracy: typed.length === 0 ? 0 : Math.round((correct / typed.length) * 100),
    durationSeconds: Math.max(1, Math.round(elapsedSeconds)),
  };
}

/** 45 -> "00:45" */
export function formatTimer(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/** ISO string -> "02:20 PM" */
export function formatClockTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
