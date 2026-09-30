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
  it('links the course title and padded day label to its day page', () => {
    renderBreadcrumb();

    expect(screen.getByRole('link', { name: 'CSSDay 01' })).toHaveAttribute('href', '/days/d1');
  });

  it('shows the course title as part of the day link', () => {
    renderBreadcrumb();

    const courseLink = screen.getByRole('link', { name: 'CSSDay 01' });

    expect(courseLink).toHaveTextContent('CSS');
  });

  it('marks the task as the current page', () => {
    renderBreadcrumb();

    expect(screen.getByText('Task 7')).toHaveAttribute('aria-current', 'page');
  });

  it('renders a navigation landmark named Breadcrumb', () => {
    renderBreadcrumb();

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });
});
