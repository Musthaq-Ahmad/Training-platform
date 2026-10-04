import { describe, expect, it } from 'vitest';
import { getInitials } from './initials';

describe('getInitials', () => {
  it('uses the first letters of the first and last names', () => {
    expect(getInitials('Fathima Fadwah', 'f@x.com')).toBe('FF');
    expect(getInitials('Ana Maria de Souza', 'a@x.com')).toBe('AS');
  });

  it('uses one letter for a single name', () => {
    expect(getInitials('Ameesha', 'a@x.com')).toBe('A');
  });

  it('falls back to the email when the name is empty', () => {
    expect(getInitials('  ', 'hawas@vonnue.com')).toBe('H');
  });
});
