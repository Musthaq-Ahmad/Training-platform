import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import DailyJournal from './DailyJournal';

afterEach(() => {
  cleanup();
});

describe('DailyJournal', () => {
  const defaultProps = {
    prompt: 'What did you learn today?',
    initialResponse: 'I learned about React hooks.',
    isSaving: false,
    isSaved: false,
    onSave: vi.fn(),
  };

  it('renders the journal section', () => {
    render(<DailyJournal {...defaultProps} />);

    expect(screen.getByText('DAILY JOURNAL')).toBeInTheDocument();
  });

  it('renders the journal prompt', () => {
    render(<DailyJournal {...defaultProps} />);

    expect(screen.getByText('What did you learn today?')).toBeInTheDocument();
  });

  it('renders the optional badge', () => {
    render(<DailyJournal {...defaultProps} />);

    expect(screen.getByText('OPTIONAL')).toBeInTheDocument();
  });

  it('renders the initial response in the textarea', () => {
    render(<DailyJournal {...defaultProps} />);

    expect(
      screen.getByRole('textbox', {
        name: '',
      })
    ).toHaveValue('I learned about React hooks.');
  });

  it('renders an empty textarea when initialResponse is null', () => {
    render(<DailyJournal {...defaultProps} initialResponse={null} />);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('renders the textarea placeholder', () => {
    render(<DailyJournal {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(
        'Document technical takeaways, quirks encountered, or architectural notes...'
      )
    ).toBeInTheDocument();
  });

  it('updates the response when the user types', () => {
    render(<DailyJournal {...defaultProps} />);

    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, {
      target: { value: 'Today I learned TypeScript.' },
    });

    expect(textarea).toHaveValue('Today I learned TypeScript.');
  });

  it('renders the optional journal footnote when not saved', () => {
    render(<DailyJournal {...defaultProps} />);

    expect(
      screen.getByText('Journal is optional and does not affect day completion')
    ).toBeInTheDocument();
  });

  it('calls onSave with the current response when the save button is clicked', () => {
    const onSave = vi.fn();

    render(<DailyJournal {...defaultProps} onSave={onSave} />);

    fireEvent.click(screen.getByRole('button', { name: 'Save Journal' }));

    expect(onSave).toHaveBeenCalledWith('I learned about React hooks.');
  });

  it('calls onSave with the updated response', () => {
    const onSave = vi.fn();

    render(<DailyJournal {...defaultProps} onSave={onSave} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'I learned about CSS Modules.' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Save Journal' }));

    expect(onSave).toHaveBeenCalledWith('I learned about CSS Modules.');
  });

  it('disables the save button and displays Saving when isSaving is true', () => {
    render(<DailyJournal {...defaultProps} isSaving={true} />);

    const saveButton = screen.getByRole('button', { name: 'Saving...' });

    expect(saveButton).toBeDisabled();
    expect(saveButton).toHaveTextContent('Saving...');
  });

  it('displays the success message when isSaved is true', () => {
    render(<DailyJournal {...defaultProps} isSaved={true} />);

    expect(screen.getByText('Saved successfully')).toBeInTheDocument();
  });

  it('does not display the optional footnote when saved', () => {
    render(<DailyJournal {...defaultProps} isSaved={true} />);

    expect(
      screen.queryByText('Journal is optional and does not affect day completion')
    ).not.toBeInTheDocument();
  });
});
