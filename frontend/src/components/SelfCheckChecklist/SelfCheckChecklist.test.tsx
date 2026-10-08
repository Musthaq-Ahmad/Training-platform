import 'fake-indexeddb/auto';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { clear } from 'idb-keyval';
import type { SelfCheckItem } from '@itp/types';
import SelfCheckChecklist from './SelfCheckChecklist';

const mockAuth = vi.hoisted(() => ({
  user: { id: 'user-1', email: 'a@vonnue.com', name: 'A' },
}));

vi.mock('../../context/Useauth', () => ({
  useAuth: () => ({ user: mockAuth.user, isLoading: false }),
}));

const mockItems: SelfCheckItem[] = [
  {
    id: '1',
    label: 'Understand CSS selectors',
    code: 'CSS-01',
    description: 'Learn how to target HTML elements using selectors.',
    isRequired: true,
  },
  {
    id: '2',
    label: 'Understand the box model',
    code: 'CSS-02',
    description: 'Learn about margins, padding, borders, and content.',
    isRequired: true,
  },
  {
    id: '3',
    label: 'Explore advanced styling',
    code: 'CSS-03',
    description: 'Explore additional CSS styling techniques.',
    isRequired: false,
  },
];

function renderChecklist(props: { dayId?: string; description?: string } = {}) {
  return render(<SelfCheckChecklist dayId={props.dayId ?? 'day-1'} items={mockItems} {...props} />);
}

/** Renders, then waits until the saved state has loaded (checkboxes enabled). */
async function renderLoaded(props: { dayId?: string } = {}) {
  const utils = renderChecklist(props);
  await waitFor(() => {
    screen.getAllByRole('checkbox').forEach((checkbox) => expect(checkbox).toBeEnabled());
  });
  return utils;
}

afterEach(async () => {
  cleanup();
  await clear(); // ticks from one test must not leak into the next
  mockAuth.user = { id: 'user-1', email: 'a@vonnue.com', name: 'A' };
});

describe('SelfCheckChecklist', () => {
  it('renders the checklist heading', () => {
    renderChecklist();
    expect(screen.getByText('END OF THE DAY CHECKLIST')).toBeInTheDocument();
  });

  it('renders the default description', () => {
    renderChecklist();
    expect(
      screen.getByText('Self-check verification criteria separate from the practical coding tasks.')
    ).toBeInTheDocument();
  });

  it('renders a custom description when provided', () => {
    renderChecklist({ description: 'Complete your daily checklist.' });
    expect(screen.getByText('Complete your daily checklist.')).toBeInTheDocument();
  });

  it('renders all checklist items', () => {
    renderChecklist();
    expect(screen.getByText('1. Understand CSS selectors')).toBeInTheDocument();
    expect(screen.getByText('2. Understand the box model')).toBeInTheDocument();
    expect(screen.getByText('3. Explore advanced styling')).toBeInTheDocument();
  });

  it("renders each item's code and description", () => {
    renderChecklist();

    expect(screen.getByText('CSS-01')).toBeInTheDocument();
    expect(screen.getByText('CSS-02')).toBeInTheDocument();
    expect(screen.getByText('CSS-03')).toBeInTheDocument();

    expect(
      screen.getByText('Learn how to target HTML elements using selectors.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Learn about margins, padding, borders, and content.')
    ).toBeInTheDocument();
    expect(screen.getByText('Explore additional CSS styling techniques.')).toBeInTheDocument();
  });

  it('shows zero completed items initially', async () => {
    await renderLoaded();
    expect(screen.getByText('0 of 3 completed')).toBeInTheDocument();
  });

  it('starts with every checkbox unchecked', async () => {
    await renderLoaded();
    screen.getAllByRole('checkbox').forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it('checks an item when its checkbox is clicked', async () => {
    await renderLoaded();
    const checkboxes = screen.getAllByRole('checkbox');

    fireEvent.click(checkboxes[0]);

    expect(checkboxes[0]).toBeChecked();
    expect(screen.getByText('1 of 3 completed')).toBeInTheDocument();
  });

  it('unchecks an item when its checkbox is clicked again', async () => {
    await renderLoaded();
    const checkbox = screen.getAllByRole('checkbox')[0];

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    expect(screen.getByText('0 of 3 completed')).toBeInTheDocument();
  });

  it('allows multiple items to be checked', async () => {
    await renderLoaded();
    const checkboxes = screen.getAllByRole('checkbox');

    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
    expect(screen.getByText('2 of 3 completed')).toBeInTheDocument();
  });

  it('renders the correct progress when all items are checked', async () => {
    await renderLoaded();

    screen.getAllByRole('checkbox').forEach((checkbox) => {
      fireEvent.click(checkbox);
    });

    expect(screen.getByText('3 of 3 completed')).toBeInTheDocument();
  });

  it('renders no checkboxes and "0 of 0 completed" for an empty list', () => {
    render(<SelfCheckChecklist dayId="day-1" items={[]} />);

    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
    expect(screen.getByText('0 of 0 completed')).toBeInTheDocument();
  });
});

describe('SelfCheckChecklist: persistence', () => {
  it('restores ticked items after leaving and coming back', async () => {
    const first = await renderLoaded();
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    first.unmount();

    await renderLoaded();

    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    expect(screen.getByText('1 of 3 completed')).toBeInTheDocument();
  });

  it('remembers unticking too', async () => {
    const first = await renderLoaded();
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    first.unmount();

    await renderLoaded();

    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
  });

  it('keeps each day separate', async () => {
    const first = await renderLoaded({ dayId: 'day-1' });
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    first.unmount();

    await renderLoaded({ dayId: 'day-2' });

    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
  });

  it('keeps each trainee separate', async () => {
    const first = await renderLoaded();
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    first.unmount();

    mockAuth.user = { id: 'user-2', email: 'b@vonnue.com', name: 'B' };
    await renderLoaded();

    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
  });

  it('ignores saved ids that are no longer in the curriculum', async () => {
    const first = await renderLoaded();
    fireEvent.click(screen.getAllByRole('checkbox')[2]); // item "3"
    first.unmount();

    // Same day, but item "3" has been removed since.
    render(<SelfCheckChecklist dayId="day-1" items={mockItems.slice(0, 2)} />);
    await waitFor(() => expect(screen.getAllByRole('checkbox')[0]).toBeEnabled());

    expect(screen.getByText('0 of 2 completed')).toBeInTheDocument();
  });
});
