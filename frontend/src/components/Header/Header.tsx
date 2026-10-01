import type { ReactNode } from 'react';
import { useState } from 'react';
import { useAuth } from '../../context/Useauth';
import styles from './Header.module.css';
import { useActivity } from '../../context/useActivity';
import { NavLink } from 'react-router';

type HeaderProps = {
  /** Replaces the app name on the left. The task page puts its breadcrumb here. */
  leading?: ReactNode;
  /** Shown just before the nav links. The task page's session timer goes here later. */
  status?: ReactNode;
};

export default function Header({ leading, status }: HeaderProps) {
  const activity = useActivity();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    // TODO: replace with useAuth().logout() once AuthContext exists
    await activity?.flushNow();
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
            <NavLink
              to="/"
              end
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              Dashboard
            </NavLink>

            <span className={styles.divider}>/</span>

            <NavLink
              to="/profile"
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              {user?.name}
            </NavLink>
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
