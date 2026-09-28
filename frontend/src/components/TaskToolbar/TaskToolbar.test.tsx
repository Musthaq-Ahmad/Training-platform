import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskToolbar from './TaskToolbar';

const visiblePanes = { sidebar: true, code: true, result: false };

describe('TaskToolbar', () => {
  it('formats an estimate under an hour', () => {
    render(
      <TaskToolbar
        estimatedMinutes={50}
        visiblePanes={visiblePanes}
        onTogglePane={vi.fn()}
        onBack={vi.fn()}
        onRun={vi.fn()}
        canRun
        saveIndicator={null}
        submitSlot={null}
      />
    );
    expect(screen.getByText('Est: 50 min')).toBeInTheDocument();
  });

  it('formats an estimate over an hour', () => {
    render(
      <TaskToolbar
        estimatedMinutes={90}
        visiblePanes={visiblePanes}
        onTogglePane={vi.fn()}
        onBack={vi.fn()}
        onRun={vi.fn()}
        canRun
        saveIndicator={null}
        submitSlot={null}
      />
    );
    expect(screen.getByText('Est: 1 h 30 min')).toBeInTheDocument();
  });

  it('hides the estimate pill when null', () => {
    render(
      <TaskToolbar
        estimatedMinutes={null}
        visiblePanes={visiblePanes}
        onTogglePane={vi.fn()}
        onBack={vi.fn()}
        onRun={vi.fn()}
        canRun
        saveIndicator={null}
        submitSlot={null}
      />
    );
    expect(screen.queryByText(/^Est:/)).not.toBeInTheDocument();
  });

  it('calls onBack and onRun', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    const onRun = vi.fn();
    render(
      <TaskToolbar
        estimatedMinutes={50}
        visiblePanes={visiblePanes}
        onTogglePane={vi.fn()}
        onBack={onBack}
        onRun={onRun}
        canRun
        saveIndicator={null}
        submitSlot={null}
      />
    );

    await user.click(screen.getByRole('button', { name: /back to tasks/i }));
    expect(onBack).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: /run/i }));
    expect(onRun).toHaveBeenCalledTimes(1);
  });

  it('disables Run when canRun is false', () => {
    render(
      <TaskToolbar
        estimatedMinutes={50}
        visiblePanes={visiblePanes}
        onTogglePane={vi.fn()}
        onBack={vi.fn()}
        onRun={vi.fn()}
        canRun={false}
        saveIndicator={null}
        submitSlot={null}
      />
    );
    expect(screen.getByRole('button', { name: /run/i })).toBeDisabled();
  });
});
