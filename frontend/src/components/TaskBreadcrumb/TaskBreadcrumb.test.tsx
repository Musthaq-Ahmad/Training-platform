import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import TaskBreadcrumb from './TaskBreadcrumb';

function renderBreadcrumb() {
  return render(
    <MemoryRouter>
      <TaskBreadcrumb courseTitle="CSS" dayId="d1" dayNumber={1} taskNumber={7} />
    </MemoryRouter>
  );
}

describe('TaskBreadcrumb', () => {
  it('links Dashboard to the dashboard route', () => {
    renderBreadcrumb();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/');
  });

  it('links the padded day label to its day page', () => {
    renderBreadcrumb();
    expect(screen.getByRole('link', { name: 'Day 01' })).toHaveAttribute('href', '/days/d1');
  });

  it('shows the course title as plain text', () => {
    renderBreadcrumb();
    expect(screen.getByText('CSS').closest('a')).toBeNull();
  });

  it('marks the task as the current page', () => {
    renderBreadcrumb();
    expect(screen.getByText('Task 7')).toHaveAttribute('aria-current', 'page');
  });
});
