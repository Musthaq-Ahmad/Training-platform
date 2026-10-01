import { describe, expect, it } from 'vitest';
import { getDayReference } from './getDayReference';

describe('getDayReference', () => {
  it('returns null for an invalid day ID', () => {
    const result = getDayReference('invalid-day-id');

    expect(result).toBeNull();
  });

  it('returns the correct reference content for a valid day', () => {
    const result = getDayReference('react-day-01');

    expect(result).not.toBeNull();
    expect(result?.courseId).toBe('react');
    expect(result?.dayNumber).toBe(1);
  });

  it('resolves the topics configured for the day', () => {
    const result = getDayReference('react-day-01');

    expect(result?.sections).toHaveLength(4);

    expect(result?.sections.map((section) => section.id)).toEqual([
      'reactfirstcomponent',
      'reactimportexport',
      'reactjsx',
      'viteguide',
    ]);
  });

  it('assigns section numbers in order', () => {
    const result = getDayReference('react-day-01');

    expect(result?.sections.map((section) => section.number)).toEqual([1, 2, 3, 4]);
  });

  it('preserves the topic content', () => {
    const result = getDayReference('react-day-01');

    const firstSection = result?.sections[0];

    expect(firstSection?.id).toBe('reactfirstcomponent');
    expect(firstSection?.heading).toBe('Your First Component');
    expect(firstSection?.blocks.length).toBeGreaterThan(0);
  });

  it('resolves a day with no topics', () => {
    const result = getDayReference('node-day-05');

    expect(result).not.toBeNull();
    expect(result?.courseId).toBe('node');
    expect(result?.dayNumber).toBe(5);
    expect(result?.sections).toEqual([]);
  });

  it('preserves prerequisite links for a day with no topics', () => {
    const result = getDayReference('node-day-05');

    expect(result?.prerequisiteLinks).toEqual([
      {
        label: 'Node.js Day 1 — Fundamentals',
        dayId: 'node-day-01',
      },
      {
        label: 'Node.js Day 4 — API Development',
        dayId: 'node-day-04',
      },
    ]);
  });

  it('preserves prerequisite links', () => {
    const result = getDayReference('node-day-05');

    expect(result?.prerequisiteLinks).toEqual([
      {
        label: 'Node.js Day 1 — Fundamentals',
        dayId: 'node-day-01',
      },
      {
        label: 'Node.js Day 4 — API Development',
        dayId: 'node-day-04',
      },
    ]);
  });

  it('can resolve topics reused from another course', () => {
    const result = getDayReference('prisma-day-02');

    expect(result?.sections.map((section) => section.id)).toEqual([
      'nodeexpressrouting',
      'prismafilterpagination',
    ]);
  });

  it('preserves video configuration', () => {
    const result = getDayReference('html-day-01');

    expect(result?.videoAtStart).toBe(true);
    expect(result?.videos).toEqual([
      {
        title: 'HTML Tutorial',
        embedUrl: 'https://www.youtube.com/embed/salY_Sm6mv4',
      },
    ]);
  });

  it('preserves videoAfterTopicId configuration', () => {
    const result = getDayReference('css-day-01');

    expect(result?.videoAfterTopicId).toBe('cssBasicSelectors-summary');
    expect(result?.videos).toEqual([
      {
        title: 'CSS Basic Selectors',
        embedUrl: 'https://www.youtube.com/embed/PHO6TBq_auI',
      },
    ]);
  });
});
