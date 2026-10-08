import { describe, expect, it } from 'vitest';
import { formatFlagDuration } from './adminLabels';

describe('formatFlagDuration', () => {
  it.each([
    [null, '—'],
    [0, '<1 s'],
    [999, '<1 s'],
    [1000, '1 s'],
    [12_400, '12 s'],
    [59_400, '59 s'],
    [125_000, '2 m 05 s'],
    [3_600_000, '60 m 00 s'],
  ])('formats %s as %s', (input, expected) => {
    expect(formatFlagDuration(input)).toBe(expected);
  });
});
