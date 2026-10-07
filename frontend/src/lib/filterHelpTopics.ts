import type { HelpTopic } from '../content/help';

/**
 * Keeps only the questions that match every word of the query (question or answer text,
 * case-insensitive). Topics left with no questions are dropped. An empty query returns
 * the topics unchanged.
 */
export function filterHelpTopics(topics: HelpTopic[], query: string): HelpTopic[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return topics;

  return topics
    .map((topic) => ({
      ...topic,
      questions: topic.questions.filter((item) => {
        const text = `${item.question} ${item.answer}`.toLowerCase();
        return words.every((word) => text.includes(word));
      }),
    }))
    .filter((topic) => topic.questions.length > 0);
}
