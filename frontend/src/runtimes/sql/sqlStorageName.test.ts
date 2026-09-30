import { describe, it, expect } from 'vitest';
import { sqlStorageName } from './sqlStorageName';

describe('sqlStorageName', () => {
  it('combines the trainee and the task', () => {
    expect(sqlStorageName('u1', 'html-day-01-t-4')).toBe('itp-sql-u1-html-day-01-t-4');
  });

  it('replaces characters that are not letters, digits, - or _', () => {
    expect(sqlStorageName('user 1/x', 't1')).toBe('itp-sql-user_1_x-t1');
  });

  it('gives different names to different trainees on the same task', () => {
    expect(sqlStorageName('u1', 't1')).not.toBe(sqlStorageName('u2', 't1'));
  });
});
