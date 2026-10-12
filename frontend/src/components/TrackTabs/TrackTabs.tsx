import { Link } from 'react-router';
import { Award } from 'lucide-react';
import styles from './TrackTabs.module.css';

export type Track = {
  id: string;
  label: string; // e.g. "JavaScript", "Node.js"
};

type TrackTabsProps = {
  tracks: Track[];
  activeTrackId: string;
  onSelect: (trackId: string) => void;
  /** Courses the trainee has finished; each gets a "Certificate" badge. */
  completedTrackIds?: string[];
};

export default function TrackTabs({
  tracks,
  activeTrackId,
  onSelect,
  completedTrackIds = [],
}: TrackTabsProps) {
  return (
    <div className={styles.row} role="tablist">
      {tracks.map((track) => {
        const isActive = track.id === activeTrackId;
        return (
          <div key={track.id} className={styles.item}>
            <button
              role="tab"
              aria-selected={isActive}
              className={isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              onClick={() => onSelect(track.id)}
            >
              {track.label}
            </button>
            {completedTrackIds.includes(track.id) && (
              <Link
                to={`/certificates/${track.id}`}
                className={styles.badge}
                aria-label={`${track.label} certificate`}
              >
                <Award size={11} aria-hidden="true" />
                Certificate
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
