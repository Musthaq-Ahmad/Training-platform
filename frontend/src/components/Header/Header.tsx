import type { ReactNode } from 'react';
import { useState } from 'react';
import { useAuth } from '../../context/Useauth';
import styles from './Header.module.css';

type HeaderProps = {
  /** Replaces the app name on the left. The task page puts its breadcrumb here. */
  leading?: ReactNode;
  /** Shown just before the nav links. The task page's session timer goes here later. */
  status?: ReactNode;
};

export default function Header({ leading, status }: HeaderProps) {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleProfileClick = () => {
    // TODO: replace with <NavLink to="/profile"> once routing exists
    console.log('profile clicked');
  };

  const handleDashboardClick = () => {
    // TODO: replace with <NavLink to="/"> once routing exists
    console.log('dashboard clicked');
  };

  const handleLogout = async () => {
    // TODO: replace with useAuth().logout() once AuthContext exists
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout request failed', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {leading ?? (
          <span className={styles.appName}>
            Vink<span className={styles.up}>Up</span>
          </span>
        )}

        <div className={styles.end}>
          {status}
          <nav className={styles.nav}>
            <button className={styles.pageLabel} onClick={handleDashboardClick}>
              Dashboard
            </button>
            <span className={styles.divider}>/</span>
            <button className={styles.userName} onClick={handleProfileClick}>
              {user?.name}
            </button>
            <span className={styles.divider}>/</span>
            <button
              className={styles.logoutButton}
              disabled={isLoggingOut}
              onClick={() => {
                void handleLogout();
              }}
            >
              {isLoggingOut ? 'Logging out…' : 'Log out'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
