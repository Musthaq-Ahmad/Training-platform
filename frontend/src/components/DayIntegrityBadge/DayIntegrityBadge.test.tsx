import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { DayIntegrityResponse } from '@itp/types';
import { getIntegrityBand } from '../../lib/Integrityband';
import DayIntegrityBadge from './DayIntegrityBadge';
import styles from './DayIntegrityBadge.module.css';
// import type { IntegrityBand } from '../../lib/Integrityband';

vi.mock('../../lib/Integrityband', () => ({
  getIntegrityBand: vi.fn(),
}));

vi.mock('lucide-react', () => ({
  ShieldCheck: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="shield-check" {...props} />
  ),
}));

const mockedGetIntegrityBand = vi.mocked(getIntegrityBand);

const createIntegrity = (overrides: Partial<DayIntegrityResponse> = {}): DayIntegrityResponse => ({
  score: 94,
  state: 'completed',
  tasksCounted: 2,
  breakdown: { pasteAttempts: 0, tabSwitches: 3, fullscreenExits: 1, windowBlurs: 0 },
  ...overrides,
});

describe('DayIntegrityBadge', () => {
  describe('loading state', () => {
    it('renders loading state', () => {
      render(<DayIntegrityBadge integrity={null} isLoading={true} hasError={false} />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Integrity')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('sets aria-busy to true while loading', () => {
      render(<DayIntegrityBadge integrity={null} isLoading={true} hasError={false} />);

      expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    });

    it('renders the shield icon while loading', () => {
      render(<DayIntegrityBadge integrity={null} isLoading={true} hasError={false} />);

      expect(screen.getByTestId('shield-check')).toBeInTheDocument();
    });

    it('does not render a score while loading', () => {
      render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: 94 })}
          isLoading={true}
          hasError={false}
        />
      );

      expect(screen.queryByText('94')).not.toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('renders unavailable when hasError is true', () => {
      render(<DayIntegrityBadge integrity={createIntegrity()} isLoading={false} hasError={true} />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Integrity')).toBeInTheDocument();
      expect(screen.getByText('Unavailable')).toBeInTheDocument();
    });

    it('renders unavailable when integrity is null', () => {
      render(<DayIntegrityBadge integrity={null} isLoading={false} hasError={false} />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Unavailable')).toBeInTheDocument();
    });

    it('does not render the score in error state', () => {
      render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: 94 })}
          isLoading={false}
          hasError={true}
        />
      );

      expect(screen.queryByText('94')).not.toBeInTheDocument();
      expect(screen.getByText('Unavailable')).toBeInTheDocument();
    });
  });

  describe('score rendering', () => {
    it('renders the score and maximum score', () => {
      mockedGetIntegrityBand.mockReturnValue('high');

      render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: 94 })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(screen.getByText('94')).toBeInTheDocument();
      expect(screen.getByText('/100')).toBeInTheDocument();
    });

    it('renders zero correctly', () => {
      mockedGetIntegrityBand.mockReturnValue('low');

      render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: 0 })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('/100')).toBeInTheDocument();
    });

    it('renders 100 correctly', () => {
      mockedGetIntegrityBand.mockReturnValue('high');

      render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: 100 })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('/100')).toBeInTheDocument();
    });

    it('renders an em dash when score is null', () => {
      mockedGetIntegrityBand.mockReturnValue(null);

      render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: null })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(screen.getByText('—')).toBeInTheDocument();
      expect(screen.queryByText('/100')).not.toBeInTheDocument();
    });
  });

  describe('integrity band', () => {
    it('applies the high band class', () => {
      mockedGetIntegrityBand.mockReturnValue('high');

      const { container } = render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: 94 })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(container.firstElementChild).toHaveClass(styles.badge);
      expect(container.firstElementChild).toHaveClass(styles.high);
    });

    it('applies the medium band class', () => {
      mockedGetIntegrityBand.mockReturnValue('mid');

      const { container } = render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: 75 })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(container.firstElementChild).toHaveClass(styles.badge);
      expect(container.firstElementChild).toHaveClass(styles.mid);
    });

    it('applies the low band class', () => {
      mockedGetIntegrityBand.mockReturnValue('low');

      const { container } = render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: 50 })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(container.firstElementChild).toHaveClass(styles.badge);
      expect(container.firstElementChild).toHaveClass(styles.low);
    });

    it('does not apply a band class when getIntegrityBand returns null', () => {
      mockedGetIntegrityBand.mockReturnValue(null);

      const { container } = render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: null })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(container.firstElementChild).toHaveClass(styles.badge);
      expect(container.firstElementChild).not.toHaveClass(styles.high);
      expect(container.firstElementChild).not.toHaveClass(styles.medium);
      expect(container.firstElementChild).not.toHaveClass(styles.low);
    });

    it('calls getIntegrityBand with the score', () => {
      mockedGetIntegrityBand.mockReturnValue('high');

      render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: 94 })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(mockedGetIntegrityBand).toHaveBeenCalledWith(94);
    });

    it('calls getIntegrityBand with null when score is unavailable', () => {
      mockedGetIntegrityBand.mockReturnValue(null);

      render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: null })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(mockedGetIntegrityBand).toHaveBeenCalledWith(null);
    });
  });

  describe('accessibility', () => {
    it('renders the correct aria-label for a completed score', () => {
      mockedGetIntegrityBand.mockReturnValue('high');

      render(
        <DayIntegrityBadge
          integrity={createIntegrity({
            score: 94,
            state: 'completed',
          })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(screen.getByLabelText('Integrity score 94 out of 100, Completed')).toBeInTheDocument();
    });

    it('renders the correct aria-label for an in-progress score', () => {
      mockedGetIntegrityBand.mockReturnValue('mid');

      render(
        <DayIntegrityBadge
          integrity={createIntegrity({
            score: 75,
            state: 'in_progress',
          })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(
        screen.getByLabelText('Integrity score 75 out of 100, In progress')
      ).toBeInTheDocument();
    });

    it('renders the correct aria-label for a not-started state', () => {
      mockedGetIntegrityBand.mockReturnValue(null);

      render(
        <DayIntegrityBadge
          integrity={createIntegrity({
            score: null,
            state: 'not_started',
          })}
          isLoading={false}
          hasError={false}
        />
      );

      expect(
        screen.getByLabelText('Integrity score not available yet, Not started')
      ).toBeInTheDocument();
    });

    it('hides the shield icon from screen readers', () => {
      render(
        <DayIntegrityBadge integrity={createIntegrity()} isLoading={false} hasError={false} />
      );

      expect(screen.getByTestId('shield-check')).toHaveAttribute('aria-hidden', 'true');
    });

    it('provides the explanation as a title', () => {
      render(
        <DayIntegrityBadge integrity={createIntegrity()} isLoading={false} hasError={false} />
      );

      expect(screen.getByLabelText('Integrity score 94 out of 100, Completed')).toHaveAttribute(
        'title',
        'Based on recorded workspace activity and integrity-related events.'
      );
    });
  });

  describe('state precedence', () => {
    it('prioritizes loading over error and integrity data', () => {
      render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: 94 })}
          isLoading={true}
          hasError={true}
        />
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('94')).not.toBeInTheDocument();
      expect(screen.queryByText('Unavailable')).not.toBeInTheDocument();
    });

    it('prioritizes error over integrity data when not loading', () => {
      render(
        <DayIntegrityBadge
          integrity={createIntegrity({ score: 94 })}
          isLoading={false}
          hasError={true}
        />
      );

      expect(screen.getByText('Unavailable')).toBeInTheDocument();
      expect(screen.queryByText('94')).not.toBeInTheDocument();
    });
  });
});
