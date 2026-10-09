import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import PrintReportButton from './PrintReportButton';

function renderButton(disabled = false) {
  const onPrint = vi.fn();
  render(
    <>
      <PrintReportButton onPrint={onPrint} disabled={disabled} />
      <p>Outside</p>
    </>
  );
  return { onPrint, trigger: screen.getByRole('button', { name: 'Print report' }) };
}

describe('PrintReportButton', () => {
  it('opens the options with the journal and flags both ticked', async () => {
    const user = userEvent.setup();
    const { trigger } = renderButton();

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Print report' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(within(dialog).getByRole('checkbox', { name: 'Journal entries' })).toBeChecked();
    expect(within(dialog).getByRole('checkbox', { name: 'Flagged events' })).toBeChecked();
  });

  it('prints with the default options and closes', async () => {
    const user = userEvent.setup();
    const { onPrint, trigger } = renderButton();

    await user.click(trigger);
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Print' }));

    expect(onPrint).toHaveBeenCalledWith({ includeJournal: true, includeFlags: true });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('passes the unticked sections on', async () => {
    const user = userEvent.setup();
    const { onPrint, trigger } = renderButton();

    await user.click(trigger);
    const dialog = screen.getByRole('dialog');
    await user.click(within(dialog).getByRole('checkbox', { name: 'Journal entries' }));
    await user.click(within(dialog).getByRole('button', { name: 'Print' }));

    expect(onPrint).toHaveBeenCalledWith({ includeJournal: false, includeFlags: true });
  });

  it('closes without printing on Cancel', async () => {
    const user = userEvent.setup();
    const { onPrint, trigger } = renderButton();

    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onPrint).not.toHaveBeenCalled();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    const { trigger } = renderButton();

    await user.click(trigger);
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on a click outside', async () => {
    const user = userEvent.setup();
    const { trigger } = renderButton();

    await user.click(trigger);
    await user.click(screen.getByText('Outside'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('cannot be opened when disabled', async () => {
    const user = userEvent.setup();
    const { trigger } = renderButton(true);

    expect(trigger).toBeDisabled();
    await user.click(trigger);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
