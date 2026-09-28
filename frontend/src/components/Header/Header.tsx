import type { ReactNode } from 'react';
import styles from './Header.module.css';

const userName = 'Rahul Sharma';

type HeaderProps = {
  /** Replaces the app name on the left. The task page puts its breadcrumb here. */
  leading?: ReactNode;
  /** Shown just before the nav links. The task page's session timer goes here later. */
  status?: ReactNode;
};

export default function Header({ leading, status }: HeaderProps) {
  const handleProfileClick = () => {
    // TODO: replace with <NavLink to="/profile"> once routing exists
    console.log('profile clicked');
  };

  const handleDashboardClick = () => {
    // TODO: replace with <NavLink to="/"> once routing exists
    console.log('dashboard clicked');
  };

  const handleLogout = () => {
    // TODO: replace with useAuth().logout() once AuthContext exists
    console.log('logout clicked');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {leading ?? <span className={styles.appName}>In-House Trainee Training Platform</span>}

        <div className={styles.end}>
          {status}
          <nav className={styles.nav}>
            <button className={styles.pageLabel} onClick={handleDashboardClick}>
              Dashboard
            </button>
            <span className={styles.divider}>/</span>
            <button className={styles.userName} onClick={handleProfileClick}>
              {userName}
            </button>
            <span className={styles.divider}>/</span>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Log out
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
