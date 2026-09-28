import { describe, it, expect, vi } from 'vitest';
import { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RunnerProvider, useRegisterRunner, useRunner } from './runnerContext';

function Consumer() {
  const runner = useRunner();
  return (
    <div>
      <span data-testid="label">{runner.label}</span>
      <button onClick={runner.run}>invoke</button>
    </div>
  );
}

function Registrar({ run }: { run: () => void }) {
  useRegisterRunner({ canRun: true, label: 'Run: npm test', title: 'Run', isRunning: false, run });
  return null;
}

describe('runnerContext', () => {
  it('publishes a registered runner, and reverts to idle on unmount', () => {
    const { rerender } = render(
      <RunnerProvider>
        <Registrar run={() => {}} />
        <Consumer />
      </RunnerProvider>
    );

    expect(screen.getByTestId('label')).toHaveTextContent('Run: npm test');

    rerender(
      <RunnerProvider>
        <Consumer />
      </RunnerProvider>
    );

    expect(screen.getByTestId('label')).toHaveTextContent('Run');
  });

  it('run() always calls the latest function, even after a re-render with a new one', async () => {
    const user = userEvent.setup();
    const first = vi.fn();
    const second = vi.fn();

    function Harness() {
      const [fn, setFn] = useState(() => first);
      return (
        <RunnerProvider>
          <Registrar run={fn} />
          <Consumer />
          <button onClick={() => setFn(() => second)}>swap</button>
        </RunnerProvider>
      );
    }

    render(<Harness />);

    await user.click(screen.getByRole('button', { name: 'swap' }));
    await user.click(screen.getByRole('button', { name: 'invoke' }));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('re-rendering with the same values does not cause runaway re-renders', () => {
    // Incremented in an effect (after render/commit), not the render body
    // itself, which this repo's react-hooks lint rules disallow mutating.
    let renderCount = 0;

    function CountingConsumer() {
      useRunner();
      useEffect(() => {
        renderCount += 1;
      });
      return null;
    }

    const { rerender } = render(
      <RunnerProvider>
        <Registrar run={() => {}} />
        <CountingConsumer />
      </RunnerProvider>
    );

    const afterFirst = renderCount;

    rerender(
      <RunnerProvider>
        <Registrar run={() => {}} />
        <CountingConsumer />
      </RunnerProvider>
    );

    // A couple of extra renders from context settling is fine; unbounded
    // growth (a render loop) is not.
    expect(renderCount - afterFirst).toBeLessThan(5);
  });
});
