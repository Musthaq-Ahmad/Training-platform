import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import SelfCheckChecklist from '../SelfCheckChecklist';
import type { SelfCheckItem } from '@itp/types';

afterEach(() => {
  cleanup();
});

describe('SelfCheckChecklist', () => {
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

  it('renders the checklist heading', () => {
    render(<SelfCheckChecklist items={mockItems} />);

    expect(screen.getByText('END OF THE DAY CHECKLIST')).toBeInTheDocument();
  });

  it('renders the default description', () => {
    render(<SelfCheckChecklist items={mockItems} />);

    expect(
      screen.getByText('Self-check verification criteria separate from the practical coding tasks.')
    ).toBeInTheDocument();
  });

  it('renders a custom description when provided', () => {
    render(<SelfCheckChecklist items={mockItems} description="Complete your daily checklist." />);

    expect(screen.getByText('Complete your daily checklist.')).toBeInTheDocument();
  });

  it('renders all checklist items', () => {
    render(<SelfCheckChecklist items={mockItems} />);

    expect(screen.getByText('1. Understand CSS selectors')).toBeInTheDocument();

    expect(screen.getByText('2. Understand the box model')).toBeInTheDocument();

    expect(screen.getByText('3. Explore advanced styling')).toBeInTheDocument();
  });

  it("renders each item's code and description", () => {
    render(<SelfCheckChecklist items={mockItems} />);

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

  it('shows zero completed items initially', () => {
    render(<SelfCheckChecklist items={mockItems} />);

    expect(screen.getByText('0 of 3 completed')).toBeInTheDocument();
  });

  it('checks an item when its checkbox is clicked', () => {
    render(<SelfCheckChecklist items={mockItems} />);

    const checkboxes = screen.getAllByRole('checkbox');

    fireEvent.click(checkboxes[0]);

    expect(checkboxes[0]).toBeChecked();
    expect(screen.getByText('1 of 3 completed')).toBeInTheDocument();
  });

  it('unchecks an item when its checkbox is clicked again', () => {
    render(<SelfCheckChecklist items={mockItems} />);

    const checkbox = screen.getAllByRole('checkbox')[0];

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    expect(screen.getByText('0 of 3 completed')).toBeInTheDocument();
  });

  it('allows multiple items to be checked', () => {
    render(<SelfCheckChecklist items={mockItems} />);

    const checkboxes = screen.getAllByRole('checkbox');

    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(screen.getByText('2 of 3 completed')).toBeInTheDocument();
  });

  it('displays the correct number of required checklist items in the footnote', () => {
    render(<SelfCheckChecklist items={mockItems} />);

    expect(
      screen.getByText(
        'The day is considered complete when all 2 required checklist items are verified and tasks are completed.'
      )
    ).toBeInTheDocument();
  });

  it('renders zero completed items and zero required items for an empty list', () => {
    render(<SelfCheckChecklist items={[]} />);

    expect(screen.getByText('0 of 0 completed')).toBeInTheDocument();

    expect(
      screen.getByText(
        'The day is considered complete when all 0 required checklist items are verified and tasks are completed.'
      )
    ).toBeInTheDocument();
  });

  it('renders the correct progress when all items are checked', () => {
    render(<SelfCheckChecklist items={mockItems} />);

    const checkboxes = screen.getAllByRole('checkbox');

    checkboxes.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });

    expect(screen.getByText('3 of 3 completed')).toBeInTheDocument();
  });
});
