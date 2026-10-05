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
  window.sessionStorage.clear();
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
    let finishLogout: (() => void) | undefined;
    vi.mocked(logout).mockReturnValue(
      new Promise<void>((resolve) => {
        finishLogout = resolve;
      })
    );
    window.sessionStorage.setItem('itp:greeting-shown', 'true');

    renderProvider();
    await waitFor(() => expect(status()).toBe('authenticated'));

    fireEvent.click(screen.getByText('logout'));
    expect(window.sessionStorage.getItem('itp:greeting-shown')).toBe('true');
    act(() => finishLogout?.());

    await waitFor(() => expect(status()).toBe('unauthenticated'));
    expect(logout).toHaveBeenCalledTimes(1);
    expect(email()).toBe('none');
    expect(window.sessionStorage.getItem('itp:greeting-shown')).toBeNull();
  });

  it('AC-07: logout() still clears the local session when the API request fails', async () => {
    vi.mocked(getMe).mockResolvedValue(trainee);
    vi.mocked(logout).mockRejectedValue(httpError(500));
    window.sessionStorage.setItem('itp:greeting-shown', 'true');

    renderProvider();
    await waitFor(() => expect(status()).toBe('authenticated'));

    fireEvent.click(screen.getByText('logout'));

    await waitFor(() => expect(status()).toBe('unauthenticated'));
    expect(email()).toBe('none');
    expect(window.sessionStorage.getItem('itp:greeting-shown')).toBe('true');
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
