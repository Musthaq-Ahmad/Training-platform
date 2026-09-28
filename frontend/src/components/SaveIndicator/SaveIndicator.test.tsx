import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { SaveState } from '../../pages/TaskPage/hooks/useAutosave';
import SaveIndicator from './SaveIndicator';

const noop = () => {};

function renderIndicator(state: SaveState, onRetry: () => void = noop) {
  return render(<SaveIndicator state={state} onRetry={onRetry} />);
}

describe('SaveIndicator', () => {
  it('shows "Saved"', () => {
    renderIndicator({ status: 'saved', lastSavedAt: new Date(), message: null });
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('shows "Unsaved"', () => {
    renderIndicator({ status: 'dirty', lastSavedAt: null, message: null });
    expect(screen.getByText('Unsaved')).toBeInTheDocument();
  });

  it('shows "Saving…"', () => {
    renderIndicator({ status: 'saving', lastSavedAt: null, message: null });
    expect(screen.getByText('Saving…')).toBeInTheDocument();
  });

  it('shows "Offline"', () => {
    renderIndicator({ status: 'offline', lastSavedAt: null, message: null });
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('shows "Save failed" with a Retry button that calls onRetry', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    renderIndicator({ status: 'error', lastSavedAt: null, message: null }, onRetry);

    expect(screen.getByText('Save failed')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('shows the blocked message', () => {
    renderIndicator({
      status: 'blocked',
      lastSavedAt: null,
      message: 'a.txt is too large to save.',
    });
    expect(screen.getAllByText('a.txt is too large to save.')).toHaveLength(2);
  });

  it('announces offline, error, blocked and the return to saved, but not dirty/saving', () => {
    const { rerender } = renderIndicator({ status: 'dirty', lastSavedAt: null, message: null });
    const getLive = () => document.querySelector('[aria-live="polite"]');
    expect(getLive()?.textContent).toBe('');

    rerender(
      <SaveIndicator
        state={{ status: 'saving', lastSavedAt: null, message: null }}
        onRetry={noop}
      />
    );
    expect(getLive()?.textContent).toBe('');

    rerender(
      <SaveIndicator
        state={{ status: 'offline', lastSavedAt: null, message: null }}
        onRetry={noop}
      />
    );
    expect(getLive()?.textContent).not.toBe('');
    const offlineText = getLive()?.textContent;

    rerender(
      <SaveIndicator
        state={{ status: 'saving', lastSavedAt: null, message: null }}
        onRetry={noop}
      />
    );
    expect(getLive()?.textContent).toBe(offlineText);

    rerender(
      <SaveIndicator
        state={{ status: 'saved', lastSavedAt: new Date(), message: null }}
        onRetry={noop}
      />
    );
    expect(getLive()?.textContent).not.toBe(offlineText);
    expect(getLive()?.textContent).not.toBe('');
  });
});
