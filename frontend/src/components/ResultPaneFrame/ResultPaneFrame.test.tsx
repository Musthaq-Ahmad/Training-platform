import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Terminal, MonitorPlay } from 'lucide-react';
import ResultPaneFrame from './ResultPaneFrame';

const tabs = [
  { id: 'result', label: 'Result', icon: MonitorPlay },
  { id: 'console', label: 'Console', icon: Terminal, badge: { text: '2', tone: 'error' as const } },
];

describe('ResultPaneFrame', () => {
  it('renders every tab', () => {
    render(
      <ResultPaneFrame tabs={tabs} activeTab="result" onTabChange={vi.fn()}>
        content
      </ResultPaneFrame>
    );
    expect(screen.getByRole('tab', { name: /result/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /console/i })).toBeInTheDocument();
  });

  it('marks the active tab with aria-selected', () => {
    render(
      <ResultPaneFrame tabs={tabs} activeTab="console" onTabChange={vi.fn()}>
        content
      </ResultPaneFrame>
    );
    expect(screen.getByRole('tab', { name: /console/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /result/i })).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onTabChange on click', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    render(
      <ResultPaneFrame tabs={tabs} activeTab="result" onTabChange={onTabChange}>
        content
      </ResultPaneFrame>
    );

    await user.click(screen.getByRole('tab', { name: /console/i }));
    expect(onTabChange).toHaveBeenCalledWith('console');
  });

  it('calls onTabChange with the arrow keys', () => {
    const onTabChange = vi.fn();
    render(
      <ResultPaneFrame tabs={tabs} activeTab="result" onTabChange={onTabChange}>
        content
      </ResultPaneFrame>
    );

    fireEvent.keyDown(screen.getByRole('tab', { name: /result/i }), { key: 'ArrowRight' });
    expect(onTabChange).toHaveBeenCalledWith('console');
  });

  it('gives an error-toned badge the error class', () => {
    render(
      <ResultPaneFrame tabs={tabs} activeTab="result" onTabChange={vi.fn()}>
        content
      </ResultPaneFrame>
    );
    expect(screen.getByText('2').className).toMatch(/badgeError/);
  });

  it('shows the footer only when given', () => {
    const { rerender } = render(
      <ResultPaneFrame tabs={tabs} activeTab="result" onTabChange={vi.fn()}>
        content
      </ResultPaneFrame>
    );
    expect(screen.queryByText('footer text')).not.toBeInTheDocument();

    rerender(
      <ResultPaneFrame
        tabs={tabs}
        activeTab="result"
        onTabChange={vi.fn()}
        footer={<span>footer text</span>}
      >
        content
      </ResultPaneFrame>
    );
    expect(screen.getByText('footer text')).toBeInTheDocument();
  });
});
