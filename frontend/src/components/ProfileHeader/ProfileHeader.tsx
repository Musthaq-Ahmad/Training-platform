import styles from './ProfileHeader.module.css';
import { type ProfileData } from '@itp/types';

type ProfileHeaderProps = {
  trainee: ProfileData['trainee'];
};

export default function ProfileHeader({ trainee }: ProfileHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.identity}>
        <strong>{trainee.name}</strong>

        <span className={styles.dash}>—</span>

        <span>{trainee.email}</span>

        <span className={styles.dash}>—</span>

        <span className={styles.progress}>
          {trainee.track}, Day {trainee.currentDay} of {trainee.totalDays}
        </span>
      </div>
    </header>
  );
}
