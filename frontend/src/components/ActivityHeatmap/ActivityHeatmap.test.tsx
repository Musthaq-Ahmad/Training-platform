import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { describe, expect, it } from 'vitest';
import ActivityHeatmap from './ActivityHeatmap';

const TODAY = '2026-10-08'; // Thursday
const DAYS = [
  { date: '2026-10-06', activeSeconds: 6300, codingSeconds: 4200 },
  { date: '2026-10-08', activeSeconds: 900, codingSeconds: 0 },
];

describe('ActivityHeatmap', () => {
  it('draws a square for every day up to today and none for future days', () => {
    render(<ActivityHeatmap days={DAYS} today={TODAY} />);
    // 51 full weeks + Monday to Thursday of the current week.
    expect(screen.getAllByRole('img')).toHaveLength(51 * 7 + 4);
  });

  it('ends with today', () => {
    render(<ActivityHeatmap days={DAYS} today={TODAY} />);
    const squares = screen.getAllByRole('img');
    expect(squares.at(-1)).toHaveAccessibleName('Thu 8 Oct · 15m active · 0m coding');
  });

  it('puts the date, active time and coding time in each square label', () => {
    render(<ActivityHeatmap days={DAYS} today={TODAY} />);
    expect(
      screen.getByRole('img', { name: 'Tue 6 Oct · 1h 45m active · 1h 10m coding' })
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Wed 7 Oct · No activity' })).toBeInTheDocument();
  });

  it('shows a tooltip on hover and on keyboard focus', async () => {
    const user = userEvent.setup();
    render(<ActivityHeatmap days={DAYS} today={TODAY} />);
    const square = screen.getByRole('img', { name: /^Tue 6 Oct/ });

    await user.hover(square);
    expect(screen.getByRole('tooltip')).toHaveTextContent(
      'Tue 6 Oct · 1h 45m active · 1h 10m coding'
    );
    await user.unhover(square);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    act(() => square.focus());
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tue 6 Oct');
  });

  it('labels the months and the Mon / Wed / Fri rows', () => {
    const { container } = render(<ActivityHeatmap days={[]} today={TODAY} />);
    const labels = Array.from(container.querySelectorAll('text')).map((t) => t.textContent);
    expect(labels).toEqual(
      expect.arrayContaining(['Oct', 'Jan', 'Apr', 'Jul', 'Mon', 'Wed', 'Fri'])
    );
  });
});
