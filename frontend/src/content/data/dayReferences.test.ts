import { describe, expect, it } from 'vitest';
import { dayReferences } from './dayReferences';

describe('dayReferences', () => {
  it('contains the expected courses', () => {
    const courses = new Set(dayReferences.map((day) => day.courseId));

    expect(courses).toEqual(
      new Set(['html', 'css', 'js', 'ts', 'node', 'postgres', 'prisma', 'react'])
    );
  });

  it('contains React Days 1 to 10', () => {
    const reactDays = dayReferences
      .filter((day) => day.courseId === 'react')
      .map((day) => day.dayNumber);

    expect(reactDays).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('maps React Day 1 to the correct topics', () => {
    const day = dayReferences.find((item) => item.id === 'react-day-01');

    expect(day?.topicIds).toEqual([
      'reactfirstcomponent',
      'reactimportexport',
      'reactjsx',
      'viteguide',
    ]);
  });

  it('maps React Day 10 to React Testing Library topics', () => {
    const day = dayReferences.find((item) => item.id === 'react-day-10');

    expect(day?.topicIds).toEqual([
      'reacttestinglibraryexample',
      'reacttestinglibraryintro',
      'reacttestinglibraryqueries',
      'reacttestinglibrarysetup',
    ]);
  });

  it('contains Prisma Day 8', () => {
    const day = dayReferences.find((item) => item.id === 'prisma-day-08');

    expect(day).toBeDefined();
    expect(day?.courseId).toBe('prisma');
    expect(day?.dayNumber).toBe(8);
  });

  it('maps Prisma Day 8 to the correct topic', () => {
    const day = dayReferences.find((item) => item.id === 'prisma-day-08');

    expect(day?.topicIds).toEqual(['prismaexpressdebugging']);
  });

  it('contains Node Day 5 with prerequisite references', () => {
    const day = dayReferences.find((item) => item.id === 'node-day-05');

    expect(day?.topicIds).toEqual([]);

    expect(day?.prerequisiteLinks).toEqual([
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

  it('contains PostgreSQL Day 5 with prerequisite references', () => {
    const day = dayReferences.find((item) => item.id === 'postgresql-day-05');

    expect(day?.topicIds).toEqual([]);

    expect(day?.prerequisiteLinks).toHaveLength(4);
  });

  it('contains video configuration for HTML Day 1', () => {
    const day = dayReferences.find((item) => item.id === 'html-day-01');

    expect(day?.videoAtStart).toBe(true);
    expect(day?.videos).toEqual([
      {
        title: 'HTML Tutorial',
        embedUrl: 'https://www.youtube.com/embed/salY_Sm6mv4',
      },
    ]);
  });

  it('contains video-after-topic configuration for CSS Day 1', () => {
    const day = dayReferences.find((item) => item.id === 'css-day-01');

    expect(day?.videoAfterTopicId).toBe('cssBasicSelectors-summary');

    expect(day?.videos).toEqual([
      {
        title: 'CSS Basic Selectors',
        embedUrl: 'https://www.youtube.com/embed/PHO6TBq_auI',
      },
    ]);
  });

  it('has unique day IDs', () => {
    const ids = dayReferences.map((day) => day.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique day numbers within each course', () => {
    const grouped = new Map<string, number[]>();

    for (const day of dayReferences) {
      const days = grouped.get(day.courseId) ?? [];
      days.push(day.dayNumber);
      grouped.set(day.courseId, days);
    }

    for (const days of grouped.values()) {
      expect(new Set(days).size).toBe(days.length);
    }
  });
});
