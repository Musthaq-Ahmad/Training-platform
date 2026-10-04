import styles from './ProfileHeader.module.css';
import { type ProfileData } from '@itp/types';
import { getInitials } from '../../lib/initials';

type ProfileHeaderProps = {
  trainee: ProfileData['trainee'];
};

function splitEmail(email: string): [string, string | null] {
  const at = email.lastIndexOf('@');
  return at > 0 ? [email.slice(0, at), email.slice(at + 1)] : [email, null];
}

export default function ProfileHeader({ trainee }: ProfileHeaderProps) {
  const { name, email, track, currentDay, totalDays } = trainee;
  const [emailUser, emailDomain] = splitEmail(email);
  const percent = totalDays > 0 ? Math.min(100, Math.round((currentDay / totalDays) * 100)) : 0;

  return (
    <header className={styles.header}>
      <div className={styles.identity}>
        <span className={styles.avatar} aria-hidden="true">
          {getInitials(name, email)}
        </span>

        <div className={styles.nameBlock}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.email}>
            {/* Lets a long address wrap before the @ instead of mid-word. */}
            {emailUser}
            {emailDomain && (
              <>
                <wbr />@{emailDomain}
              </>
            )}
          </p>
        </div>
      </div>

      <div className={styles.course}>
        <span className={styles.courseLabel}>CURRENT COURSE</span>

        <div className={styles.courseLine}>
          <span className={styles.track}>{track}</span>
          <span className={styles.day}>
            Day {currentDay} of {totalDays}
          </span>
        </div>

        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-label={`${track} progress`}
          aria-valuemin={0}
          aria-valuemax={totalDays}
          aria-valuenow={currentDay}
          aria-valuetext={`Day ${currentDay} of ${totalDays}`}
        >
          <span className={styles.progressFill} style={{ width: `${percent}%` }} />
        </div>
      </div>
    </header>
  );
}
