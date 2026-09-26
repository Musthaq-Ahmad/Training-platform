import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import TrackTabs, { type Track } from './TrackTabs';

const mockTracks: Track[] = [
  {
    id: 'javascript',
    label: 'JavaScript',
  },
  {
    id: 'node',
    label: 'Node.js',
  },
  {
    id: 'react',
    label: 'React',
  },
];

describe('TrackTabs', () => {
  it('renders all track tabs', () => {
    render(<TrackTabs tracks={mockTracks} activeTrackId="javascript" onSelect={vi.fn()} />);

    expect(screen.getByRole('tab', { name: 'JavaScript' })).toBeInTheDocument();

    expect(screen.getByRole('tab', { name: 'Node.js' })).toBeInTheDocument();

    expect(screen.getByRole('tab', { name: 'React' })).toBeInTheDocument();
  });

  it('renders the tablist', () => {
    render(<TrackTabs tracks={mockTracks} activeTrackId="javascript" onSelect={vi.fn()} />);

    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('marks the active track with aria-selected=true', () => {
    render(<TrackTabs tracks={mockTracks} activeTrackId="javascript" onSelect={vi.fn()} />);

    const activeTab = screen.getByRole('tab', {
      name: 'JavaScript',
    });

    expect(activeTab).toHaveAttribute('aria-selected', 'true');
  });

  it('marks inactive tracks with aria-selected=false', () => {
    render(<TrackTabs tracks={mockTracks} activeTrackId="javascript" onSelect={vi.fn()} />);

    expect(screen.getByRole('tab', { name: 'Node.js' })).toHaveAttribute('aria-selected', 'false');

    expect(screen.getByRole('tab', { name: 'React' })).toHaveAttribute('aria-selected', 'false');
  });

  it('applies the active class to the active tab', () => {
    render(<TrackTabs tracks={mockTracks} activeTrackId="javascript" onSelect={vi.fn()} />);

    const activeTab = screen.getByRole('tab', {
      name: 'JavaScript',
    });

    expect(activeTab.className).toContain('tabActive');
  });

  it('does not apply the active class to inactive tabs', () => {
    render(<TrackTabs tracks={mockTracks} activeTrackId="javascript" onSelect={vi.fn()} />);

    const nodeTab = screen.getByRole('tab', {
      name: 'Node.js',
    });

    const reactTab = screen.getByRole('tab', {
      name: 'React',
    });

    expect(nodeTab.className).not.toContain('tabActive');
    expect(reactTab.className).not.toContain('tabActive');
  });

  it('calls onSelect with the selected track id', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<TrackTabs tracks={mockTracks} activeTrackId="javascript" onSelect={onSelect} />);

    await user.click(screen.getByRole('tab', { name: 'Node.js' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('node');
  });

  it('calls onSelect with the correct id when another tab is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<TrackTabs tracks={mockTracks} activeTrackId="javascript" onSelect={onSelect} />);

    await user.click(screen.getByRole('tab', { name: 'React' }));

    expect(onSelect).toHaveBeenCalledWith('react');
  });

  it('allows clicking the currently active tab', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<TrackTabs tracks={mockTracks} activeTrackId="javascript" onSelect={onSelect} />);

    await user.click(screen.getByRole('tab', { name: 'JavaScript' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('javascript');
  });

  it('renders no tabs when the tracks array is empty', () => {
    render(<TrackTabs tracks={[]} activeTrackId="" onSelect={vi.fn()} />);

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
  });
});
