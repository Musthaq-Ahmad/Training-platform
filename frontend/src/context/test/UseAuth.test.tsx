import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { useAuth } from '../Useauth';

function Probe() {
  useAuth();
  return null;
}

describe('useAuth', () => {
  it('AC-11: throws a clear error when used outside an AuthProvider', () => {
    // React logs the render error to the console; keep test output clean
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => render(<Probe />)).toThrow('useAuth must be used within an AuthProvider');
  });
});
