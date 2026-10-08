import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AdminJournalList from './AdminJournalList';

describe('AdminJournalList', () => {
  it('shows each entry with its day and text', () => {
    render(
      <AdminJournalList
        entries={[
          {
            dayId: 'html-1',
            courseTitle: 'HTML',
            dayNumber: 1,
            dayTitle: 'HTML5 Document Structure',
            responseText: 'Learned the boilerplate.',
            updatedAt: '2026-10-01T12:12:00.000Z',
          },
        ]}
      />
    );

    expect(screen.getByRole('heading', { name: /HTML · Day 1/ })).toBeInTheDocument();
    expect(screen.getByText(/HTML5 Document Structure/)).toBeInTheDocument();
    expect(screen.getByText('Learned the boilerplate.')).toBeInTheDocument();
    expect(screen.getByText('01 Oct 2026, 17:42')).toBeInTheDocument();
  });

  it('has an empty state', () => {
    render(<AdminJournalList entries={[]} />);

    expect(screen.getByText(/hasn.t written any journal entries/)).toBeInTheDocument();
  });
});
