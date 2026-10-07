import type { ReactNode } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { useAuth } from '../../context/Useauth';
import { ConfirmPopover } from '../Common/ConfirmDialog';
import styles from './AdminHeader.module.css';

type AdminHeaderProps = {
  /** Replaces the app name on the left (for example a breadcrumb on the detail page). */
  leading?: ReactNode;
};

function UsersIcon() {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6.5" cy="4.5" r="2.75" />
      <path d="M1 14.5c.4-2.5 2.5-4 5.5-4s5.1 1.5 5.5 4" />
      <path d="M12 2.2a2.75 2.75 0 0 1 0 5.2M13.5 10.7c1.9.4 3 1.6 3.4 3.8" />
    </svg>
  );
}

function PowerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15.3 5.53a7.5 7.5 0 1 1-10.61 0" />
      <path d="M10 1.67V10" />
    </svg>
  );
}

/**
 * Header for the mentor area. The trainee Header links to Home, Typing Test and Profile,
 * which admins cannot open, and it flushes trainee activity time on logout (admins have none).
 */
export default function AdminHeader({ leading }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const openConfirm = () => {
    setLogoutError(null);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    if (isLoggingOut) return;
    setConfirmOpen(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError(null);
    try {
      await logout();
      // On success the auth state clears and the app leaves this page.
      setConfirmOpen(false);
    } catch (error) {
      console.error('Logout failed', error);
      setLogoutError('Could not log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          {leading ?? (
            <span className={styles.appName}>
              Vink<span className={styles.up}>Up</span>
            </span>
          )}
          <span className={styles.badge}>Mentor view</span>
        </div>

        <div className={styles.end}>
          <nav className={styles.nav} aria-label="Mentor navigation">
            <NavLink
              to="/admin"
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              <UsersIcon />
              <span className={styles.label} data-text="Trainees">
                Trainees
              </span>
            </NavLink>
          </nav>

          {user && <span className={styles.userName}>{user.name}</span>}
          <span className={styles.divider} aria-hidden="true" />

          <ConfirmPopover
            open={confirmOpen}
            message="Log out?"
            confirmLabel="Log out"
            busyLabel="Logging out…"
            isBusy={isLoggingOut}
            error={logoutError}
            onConfirm={() => {
              void handleLogout();
            }}
            onCancel={closeConfirm}
          >
            <button
              type="button"
              className={styles.logoutButton}
              aria-label="Log out"
              aria-haspopup="dialog"
              aria-expanded={confirmOpen}
              title="Log out"
              onClick={openConfirm}
            >
              <PowerIcon className={styles.logoutIcon} />
            </button>
          </ConfirmPopover>
        </div>
      </div>
    </header>
  );
}
