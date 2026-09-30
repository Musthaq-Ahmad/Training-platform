import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Runner } from '../../runtimes/runnerContext';
import TaskToolbar from './TaskToolbar';

const visiblePanes = { sidebar: true, code: true, result: false };

function makeRunner(overrides: Partial<Runner> = {}): Runner {
  return {
    canRun: true,
    label: 'Run',
    title: 'Run (Ctrl+Enter)',
    isRunning: false,
    run: vi.fn(),
    ...overrides,
  };
}

describe('TaskToolbar', () => {
  it('formats an estimate under an hour', () => {
    render(
      <TaskToolbar
        estimatedMinutes={50}
        visiblePanes={visiblePanes}
        onTogglePane={vi.fn()}
        onBack={vi.fn()}
        onRun={vi.fn()}
        runner={makeRunner()}
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
        runner={makeRunner()}
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
        runner={makeRunner()}
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
        runner={makeRunner()}
        saveIndicator={null}
        submitSlot={null}
      />
    );

    await user.click(screen.getByRole('button', { name: /back to tasks/i }));
    expect(onBack).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: /run/i }));
    expect(onRun).toHaveBeenCalledTimes(1);
  });

  it('shows the runner label and title', () => {
    render(
      <TaskToolbar
        estimatedMinutes={50}
        visiblePanes={visiblePanes}
        onTogglePane={vi.fn()}
        onBack={vi.fn()}
        onRun={vi.fn()}
        runner={makeRunner({ label: 'Run: npm test', title: 'Run npm test (Ctrl+Enter)' })}
        saveIndicator={null}
        submitSlot={null}
      />
    );
    const button = screen.getByRole('button', { name: /run: npm test/i });
    expect(button).toHaveAttribute('title', 'Run npm test (Ctrl+Enter)');
  });

  it('disables Run when the runner cannot run', () => {
    render(
      <TaskToolbar
        estimatedMinutes={50}
        visiblePanes={visiblePanes}
        onTogglePane={vi.fn()}
        onBack={vi.fn()}
        onRun={vi.fn()}
        runner={makeRunner({ canRun: false })}
        saveIndicator={null}
        submitSlot={null}
      />
    );
    expect(screen.getByRole('button', { name: /run/i })).toBeDisabled();
  });

  it('shows a spinner while the runner is running', () => {
    render(
      <TaskToolbar
        estimatedMinutes={50}
        visiblePanes={visiblePanes}
        onTogglePane={vi.fn()}
        onBack={vi.fn()}
        onRun={vi.fn()}
        runner={makeRunner({ isRunning: true })}
        saveIndicator={null}
        submitSlot={null}
      />
    );
    expect(
      screen.getByRole('button', { name: /run/i }).querySelector('svg')
    ).not.toBeInTheDocument();
  });

  it('shows the submitted pill only when hasSubmitted, with the time when given', () => {
    const props = {
      estimatedMinutes: 50,
      visiblePanes,
      onTogglePane: vi.fn(),
      onBack: vi.fn(),
      onRun: vi.fn(),
      runner: makeRunner(),
      saveIndicator: null,
      submitSlot: null,
    };
    const { rerender } = render(<TaskToolbar {...props} />);
    expect(screen.queryByText(/^Submitted/)).not.toBeInTheDocument();

    rerender(<TaskToolbar {...props} hasSubmitted />);
    expect(screen.getByText('Submitted')).toBeInTheDocument();

    rerender(
      <TaskToolbar {...props} hasSubmitted submittedAt={new Date(2026, 8, 28, 14, 32, 5)} />
    );
    expect(screen.getByText('Submitted 14:32')).toBeInTheDocument();
  });
});
