import { useEffect, useState } from 'react';
import { getProfile } from '../../api/profile';
import { type ProfileData } from '@itp/types';
import ProfileHeader from '../../components/ProfileHeader';
import StatsSummary from '../../components/StatsSummary';
import DailyActivityTable from '../../components/DailyActivityTable';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const data = await getProfile();

        if (isMounted) {
          setProfile(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <main className={styles.page}>
        <div className={styles.loading} role="status" aria-label="Loading profile">
          Loading profile...
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className={styles.page}>
        <div className={styles.error} role="alert">
          Unable to load profile.
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <ProfileHeader trainee={profile.trainee} />

      <section className={styles.card}>
        <StatsSummary total={profile.total} typing={profile.typing} />

        <DailyActivityTable days={profile.dailyActivity} />
      </section>
    </main>
  );
}
