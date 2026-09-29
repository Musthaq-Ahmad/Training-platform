import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getMe, logout, startGoogleLogin } from '../../api/auth';
import { setUnauthorizedHandler } from '../../api/client';
import { AuthProvider } from '../AuthProvider';
import { useAuth } from '../Useauth';

vi.mock('../../api/auth', () => ({
  getMe: vi.fn(),
  logout: vi.fn(),
  startGoogleLogin: vi.fn(),
}));

// Spy on handler registration so the test can simulate the interceptor reporting a 401
vi.mock('../../api/client', () => ({ setUnauthorizedHandler: vi.fn() }));

// Decouple from the real error normalizer: errors in these tests just carry a `status`
vi.mock('../../api/errors', () => {
  class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
    }
  }
  return { ApiError };
});
import { ApiError } from '../../api/errors';

const httpError = (status: number) => new ApiError(status, 'NETWORK_ERROR', `HTTP ${status}`);
const trainee = { id: 'u1', email: 'trainee@vonnue.com', name: 'Test Trainee' };

function Probe() {
  const { status, user, login, logout: doLogout, refresh } = useAuth();
  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="email">{user?.email ?? 'none'}</span>
      <button onClick={login}>login</button>
      <button onClick={() => void doLogout().catch(() => undefined)}>logout</button>
      <button onClick={() => void refresh()}>refresh</button>
    </div>
  );
}

function renderProvider() {
  return render(
    <AuthProvider>
      <Probe />
    </AuthProvider>
  );
}

const status = () => screen.getByTestId('status').textContent;
const email = () => screen.getByTestId('email').textContent;

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

describe('AuthProvider: session restore', () => {
  it('AC-01/02: starts loading, then authenticated with the user when /me succeeds', async () => {
    vi.mocked(getMe).mockResolvedValue(trainee);

    renderProvider();
    expect(status()).toBe('loading');

    await waitFor(() => expect(status()).toBe('authenticated'));
    expect(email()).toBe(trainee.email);
  });

  it('AC-03: becomes unauthenticated, without logging, when /me returns 401', async () => {
    vi.mocked(getMe).mockRejectedValue(httpError(401));

    renderProvider();

    await waitFor(() => expect(status()).toBe('unauthenticated'));
    expect(email()).toBe('none');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('AC-04: becomes unauthenticated and logs on a server/network error', async () => {
    vi.mocked(getMe).mockRejectedValue(httpError(500));

    renderProvider();

    await waitFor(() => expect(status()).toBe('unauthenticated'));
    expect(console.error).toHaveBeenCalled();
  });

  it('AC-10: refresh() re-reads /me and updates the state', async () => {
    vi.mocked(getMe).mockRejectedValueOnce(httpError(401)).mockResolvedValueOnce(trainee);

    renderProvider();
    await waitFor(() => expect(status()).toBe('unauthenticated'));

    fireEvent.click(screen.getByText('refresh'));

    await waitFor(() => expect(status()).toBe('authenticated'));
    expect(email()).toBe(trainee.email);
  });
});

describe('AuthProvider: login and logout', () => {
  it('AC-05: login() starts the Google flow', async () => {
    vi.mocked(getMe).mockRejectedValue(httpError(401));

    renderProvider();
    await waitFor(() => expect(status()).toBe('unauthenticated'));

    fireEvent.click(screen.getByText('login'));
    expect(startGoogleLogin).toHaveBeenCalledTimes(1);
  });

  it('AC-06: logout() calls the API and clears the user', async () => {
    vi.mocked(getMe).mockResolvedValue(trainee);
    vi.mocked(logout).mockResolvedValue(undefined);

    renderProvider();
    await waitFor(() => expect(status()).toBe('authenticated'));

    fireEvent.click(screen.getByText('logout'));

    await waitFor(() => expect(status()).toBe('unauthenticated'));
    expect(logout).toHaveBeenCalledTimes(1);
    expect(email()).toBe('none');
  });

  it('AC-07: logout() still clears the local session when the API request fails', async () => {
    vi.mocked(getMe).mockResolvedValue(trainee);
    vi.mocked(logout).mockRejectedValue(httpError(500));

    renderProvider();
    await waitFor(() => expect(status()).toBe('authenticated'));

    fireEvent.click(screen.getByText('logout'));

    await waitFor(() => expect(status()).toBe('unauthenticated'));
    expect(email()).toBe('none');
  });
});

describe('AuthProvider: expired session handler', () => {
  it('AC-08: signs the user out when the API layer reports a 401', async () => {
    vi.mocked(getMe).mockResolvedValue(trainee);

    renderProvider();
    await waitFor(() => expect(status()).toBe('authenticated'));

    const handler = vi
      .mocked(setUnauthorizedHandler)
      .mock.calls.map(([registered]) => registered)
      .find((registered) => registered !== null);

    act(() => handler?.());

    expect(status()).toBe('unauthenticated');
    expect(email()).toBe('none');
  });

  it('AC-09: unregisters the handler when the provider unmounts', async () => {
    vi.mocked(getMe).mockResolvedValue(trainee);

    const { unmount } = renderProvider();
    await waitFor(() => expect(status()).toBe('authenticated'));

    unmount();

    const calls = vi.mocked(setUnauthorizedHandler).mock.calls;
    expect(calls[calls.length - 1]?.[0]).toBeNull();
  });
});
