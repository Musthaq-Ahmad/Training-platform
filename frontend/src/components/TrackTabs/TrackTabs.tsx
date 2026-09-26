import styles from './TrackTabs.module.css';

export type Track = {
  id: string;
  label: string; // e.g. "JavaScript", "Node.js"
};

type TrackTabsProps = {
  tracks: Track[];
  activeTrackId: string;
  onSelect: (trackId: string) => void;
};

export default function TrackTabs({ tracks, activeTrackId, onSelect }: TrackTabsProps) {
  return (
    <div className={styles.row} role="tablist">
      {tracks.map((track) => {
        const isActive = track.id === activeTrackId;
        return (
          <button
            key={track.id}
            role="tab"
            aria-selected={isActive}
            className={isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => onSelect(track.id)}
          >
            {track.label}
          </button>
        );
      })}
    </div>
  );
}
