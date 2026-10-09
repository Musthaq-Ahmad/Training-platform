import { describe, expect, it } from 'vitest';
import { describeElapsed, formatElapsed } from './formatElapsed';

describe('formatElapsed', () => {
  it.each([
    [0, '0:00'],
    [5, '0:05'],
    [59, '0:59'],
    [60, '1:00'],
    [754, '12:34'],
    [3599, '59:59'],
    [3600, '1:00:00'],
    [3723, '1:02:03'],
  ])('%i seconds → %s', (seconds, expected) => {
    expect(formatElapsed(seconds)).toBe(expected);
  });

  it('clamps negatives and drops fractions', () => {
    expect(formatElapsed(-4)).toBe('0:00');
    expect(formatElapsed(61.9)).toBe('1:01');
  });
});

describe('describeElapsed', () => {
  it.each([
    [0, '0 seconds'],
    [1, '1 second'],
    [45, '45 seconds'],
    [61, '1 minute 1 second'],
    [754, '12 minutes 34 seconds'],
    [3600, '1 hour 0 minutes'],
    [7380, '2 hours 3 minutes'],
  ])('%i seconds → %s', (seconds, expected) => {
    expect(describeElapsed(seconds)).toBe(expected);
  });
});
