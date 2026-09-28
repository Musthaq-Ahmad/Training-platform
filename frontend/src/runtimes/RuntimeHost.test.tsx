import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { taskFixture, nodeTaskFixture, sqlTaskFixture } from '../test/fixtures/task';
import { ToastProvider } from '../components/Toast';
import { RunnerProvider } from './runnerContext';
import RuntimeHost from './RuntimeHost';

function renderHost(task: typeof taskFixture) {
  return render(
    <ToastProvider>
      <RunnerProvider>
        <RuntimeHost task={task} />
      </RunnerProvider>
    </ToastProvider>
  );
}

describe('RuntimeHost', () => {
  it('renders the Result tab for a browser task', () => {
    renderHost(taskFixture);
    expect(screen.getByRole('tab', { name: /result/i })).toBeInTheDocument();
  });

  it('renders the Terminal tab for a node task', () => {
    renderHost(nodeTaskFixture);
    expect(screen.getByRole('tab', { name: /terminal/i })).toBeInTheDocument();
  });

  it('renders the Results tab for a sql task', () => {
    renderHost(sqlTaskFixture);
    expect(screen.getByRole('tab', { name: /results/i })).toBeInTheDocument();
  });
});
