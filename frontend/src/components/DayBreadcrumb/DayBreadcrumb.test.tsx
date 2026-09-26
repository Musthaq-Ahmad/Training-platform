import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { MemoryRouter } from 'react-router';
import DayBreadcrumb from './DayBreadcrumb';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

afterEach(() => {
  cleanup();
});

function renderWithRouterContext(ui: React.ReactElement) {
  return render(ui, { wrapper: MemoryRouter });
}

describe('DayBreadcrumb', () => {
  it('renders the Dashboard link', () => {
    renderWithRouterContext(<DayBreadcrumb courseTitle="React Fundamentals" dayNumber={1} />);

    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });

    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink.getAttribute('href')).toBe('/');
  });

  it('renders the course title', () => {
    renderWithRouterContext(<DayBreadcrumb courseTitle="React Fundamentals" dayNumber={1} />);
    expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
  });

  it('formats a single-digit day number with a leading zero', () => {
    renderWithRouterContext(<DayBreadcrumb courseTitle="React Fundamentals" dayNumber={1} />);
    expect(screen.getByText('Day 01')).toBeInTheDocument();
  });

  it('renders a two-digit day number without changing it', () => {
    renderWithRouterContext(<DayBreadcrumb courseTitle="React Fundamentals" dayNumber={12} />);
    expect(screen.getByText('Day 12')).toBeInTheDocument();
  });

  it('renders the breadcrumb navigation with the correct accessible label', () => {
    renderWithRouterContext(<DayBreadcrumb courseTitle="React Fundamentals" dayNumber={1} />);
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });

  it('marks the current day as the current page', () => {
    renderWithRouterContext(<DayBreadcrumb courseTitle="React Fundamentals" dayNumber={3} />);

    const activeDayNode = screen.getByText('Day 03');
    expect(activeDayNode).toBeInTheDocument();
    expect(activeDayNode.getAttribute('aria-current')).toBe('page');
  });

  it('renders the breadcrumb separators', () => {
    renderWithRouterContext(<DayBreadcrumb courseTitle="React Fundamentals" dayNumber={1} />);

    const separators = screen.queryAllByText((content) => content.trim() === '/');
    expect(separators.length).toBeGreaterThanOrEqual(1);
  });
});
