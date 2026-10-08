import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { AdminTraineeDetail } from '@itp/types';
import AdminDayGrid from './AdminDayGrid';

const courses: AdminTraineeDetail['courses'] = [
  {
    id: 'html',
    title: 'HTML',
    days: [
      {
        id: 'html-1',
        dayNumber: 1,
        title: 'Structure',
        status: 'COMPLETED',
        completedAt: '2026-10-01T10:00:00.000Z',
      },
      { id: 'html-2', dayNumber: 2, title: 'Forms', status: 'UNLOCKED', completedAt: null },
      { id: 'html-3', dayNumber: 3, title: 'Media', status: 'LOCKED', completedAt: null },
    ],
  },
  { id: 'css', title: 'CSS', days: [] },
];

describe('AdminDayGrid', () => {
  it('shows each course with how many of its days are completed', () => {
    render(<AdminDayGrid courses={courses} />);

    expect(screen.getByRole('heading', { name: 'HTML' })).toBeInTheDocument();
    expect(screen.getByText('1/3 days')).toBeInTheDocument();
    expect(screen.getByText('0/0 days')).toBeInTheDocument();
  });

  it('writes the status out for every day, not only with colour', () => {
    render(<AdminDayGrid courses={courses} />);

    const items = within(screen.getByRole('list')).getAllByRole('listitem');

    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('Structure, Completed');
    expect(items[1]).toHaveTextContent('Forms, Current');
    expect(items[2]).toHaveTextContent('Media, Locked');
  });
});
