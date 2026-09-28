import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from './Toast';

function Harness() {
  const { show } = useToast();
  return (
    <div>
      <button onClick={() => show({ message: 'Hello' })}>show one</button>
      <button onClick={() => show({ message: 'Quick', durationMs: 100 })}>show quick</button>
      <button
        onClick={() => {
          show({ message: 'A' });
          show({ message: 'B' });
          show({ message: 'C' });
          show({ message: 'D' });
        }}
      >
        show four
      </button>
    </div>
  );
}

function renderHarness() {
  return render(
    <ToastProvider>
      <Harness />
    </ToastProvider>
  );
}

describe('Toast', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the message', async () => {
    const user = userEvent.setup();
    renderHarness();

    await user.click(screen.getByText('show one'));
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('dismiss removes the toast', async () => {
    const user = userEvent.setup();
    renderHarness();

    await user.click(screen.getByText('show one'));
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('auto-removes after durationMs', () => {
    vi.useFakeTimers();
    renderHarness();

    fireEvent.click(screen.getByText('show quick'));
    expect(screen.getByText('Quick')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.queryByText('Quick')).not.toBeInTheDocument();
  });

  it('shows at most 3 toasts at once', async () => {
    const user = userEvent.setup();
    renderHarness();

    await user.click(screen.getByText('show four'));
    expect(screen.getAllByText(/^[ABCD]$/)).toHaveLength(3);
  });
});
