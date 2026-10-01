import { describe, expect, it } from 'vitest';
import { buildPassage } from './typingStats';

describe('buildPassage', () => {
  it('builds enough text for the chosen duration', () => {
    expect(buildPassage(30).length).toBeGreaterThanOrEqual(30 * 10);
    expect(buildPassage(120).length).toBeGreaterThanOrEqual(120 * 10);
  });

  it('uses only lowercase words when both options are off', () => {
    const passage = buildPassage(60, { punctuation: false, numbers: false });

    expect(passage).toMatch(/^[a-z]+( [a-z]+)*$/);
  });

  it('adds capitals and full stops when punctuation is on', () => {
    // A constant "random" value picks the last word and never adds commas or brackets
    const passage = buildPassage(60, { punctuation: true, numbers: false }, () => 0.99);

    expect(passage).toMatch(/^[A-Z]/);
    expect(passage).toContain('.');
  });

  it('adds no digits when numbers are off', () => {
    const passage = buildPassage(60, { punctuation: true, numbers: false });

    expect(passage).not.toMatch(/\d/);
  });

  it('adds numbers when numbers are on', () => {
    // A "random" value of 0 always picks the number branch
    const passage = buildPassage(30, { punctuation: false, numbers: true }, () => 0);

    expect(passage).toMatch(/^\d+( \d+)*$/);
  });

  it('adds no punctuation when punctuation is off', () => {
    const passage = buildPassage(60, { punctuation: false, numbers: true });

    expect(passage).not.toMatch(/[.,()A-Z]/);
  });
});
