import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import DayCelebration from './DayCelebration';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function mockReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList);
}

function mockCanvas() {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    save: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    scale: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    fillRect: vi.fn(),
    restore: vi.fn(),
  } as unknown as CanvasRenderingContext2D);
  vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(1);
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
}

describe('DayCelebration', () => {
  it('announces success and shows full-screen confetti', () => {
    mockReducedMotion(false);
    mockCanvas();
    const onDismiss = vi.fn();
    render(<DayCelebration onDismiss={onDismiss} />);

    expect(screen.getByRole('status')).toHaveTextContent('Nice work. Your progress is saved.');
    expect(screen.getByTestId('day-celebration-confetti')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Day submitted!' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Continue' })).not.toBeInTheDocument();
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('shows a static confirmation when reduced motion is preferred', () => {
    mockReducedMotion(true);
    render(<DayCelebration onDismiss={vi.fn()} />);

    expect(screen.getByRole('status')).toHaveTextContent('Nice work. Your progress is saved.');
    expect(screen.queryByTestId('day-celebration-confetti')).not.toBeInTheDocument();
  });

  it('dismisses automatically after a brief celebration', () => {
    vi.useFakeTimers();
    mockReducedMotion(false);
    mockCanvas();
    const onDismiss = vi.fn();
    render(<DayCelebration onDismiss={onDismiss} />);

    vi.advanceTimersByTime(2600);

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
