import { describe, expect, it } from 'vitest';
import type { HelpTopic } from '../content/help';
import { filterHelpTopics } from './filterHelpTopics';

const topics: HelpTopic[] = [
  {
    id: 'tasks',
    title: 'Tasks & Editor',
    summary: 'Saving and pasting.',
    questions: [
      { id: 'no-paste', question: "Why can't I paste?", answer: 'Pasting is blocked on purpose.' },
      { id: 'autosave', question: 'Does my code save?', answer: 'Yes, automatically.' },
    ],
  },
  {
    id: 'days',
    title: 'Courses & Days',
    summary: 'Unlocking.',
    questions: [
      { id: 'day-locked', question: 'Why is my day locked?', answer: 'Submit the previous day.' },
    ],
  },
];

describe('filterHelpTopics', () => {
  it('returns every topic for an empty or blank query', () => {
    expect(filterHelpTopics(topics, '')).toBe(topics);
    expect(filterHelpTopics(topics, '   ')).toBe(topics);
  });

  it('keeps only matching questions, ignoring case', () => {
    const result = filterHelpTopics(topics, 'PASTE');

    expect(result).toHaveLength(1);
    expect(result[0].questions.map((q) => q.id)).toEqual(['no-paste']);
  });

  it('matches words found in the answer text', () => {
    const result = filterHelpTopics(topics, 'previous');

    expect(result.map((t) => t.id)).toEqual(['days']);
  });

  it('requires every word to match', () => {
    expect(filterHelpTopics(topics, 'day locked')).toHaveLength(1);
    expect(filterHelpTopics(topics, 'day paste')).toEqual([]);
  });
});
